// Plain-JS versions of the transforms used in the DCT post.
// Matrices are row-major: m[y][x].

export type Matrix = number[][];

export const QUANT_TABLE: Matrix = [
  [16, 11, 10, 16, 24, 40, 51, 61],
  [12, 12, 14, 19, 26, 58, 60, 55],
  [14, 13, 16, 24, 40, 57, 69, 56],
  [14, 17, 22, 29, 51, 87, 80, 62],
  [18, 22, 37, 56, 68, 109, 103, 77],
  [24, 35, 55, 64, 81, 104, 113, 92],
  [49, 64, 78, 87, 103, 121, 120, 101],
  [72, 92, 95, 98, 112, 100, 103, 99],
];

const alpha = (z: number) => (z === 0 ? Math.SQRT1_2 : 1);

/** Unnormalized DCT-II of each row of length N. */
function dct2(m: Matrix): Matrix {
  return m.map((row) => {
    const n = row.length;
    return row.map((_, k) =>
      row.reduce(
        (sum, x, i) => sum + x * Math.cos((Math.PI / n) * (i + 0.5) * k),
        0,
      ),
    );
  });
}

/** DCT-III of each row, X_k = x_0/2 + Σ x_n cos[π/N (k + 1/2) n]. */
function dct3(m: Matrix): Matrix {
  return m.map((row) => {
    const n = row.length;
    return row.map(
      (_, k) =>
        row[0] / 2 +
        row.reduce(
          (sum, x, i) => sum + x * Math.cos((Math.PI / n) * (k + 0.5) * i),
          0,
        ),
    );
  });
}

function quant(m: Matrix): Matrix {
  return m.map((row, y) =>
    row.map((v, x) => Math.round(v / QUANT_TABLE[y][x])),
  );
}

function unquant(m: Matrix): Matrix {
  return m.map((row, y) => row.map((v, x) => v * QUANT_TABLE[y][x]));
}

/** JPEG forward DCT on one 8x8 block of values in [0, 255]. */
export function dct8x8(block: Matrix): Matrix {
  const out: Matrix = [];
  for (let v = 0; v < 8; v++) {
    out.push([]);
    for (let u = 0; u < 8; u++) {
      let sum = 0;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          sum +=
            (block[y][x] - 128) *
            Math.cos(((2 * x + 1) * u * Math.PI) / 16) *
            Math.cos(((2 * y + 1) * v * Math.PI) / 16);
        }
      }
      out[v].push(Math.round((sum * alpha(u) * alpha(v)) / 4));
    }
  }
  return out;
}

/** JPEG inverse DCT on one 8x8 block, clamped back to [0, 255]. */
export function idct8x8(block: Matrix): Matrix {
  const out: Matrix = [];
  for (let y = 0; y < 8; y++) {
    out.push([]);
    for (let x = 0; x < 8; x++) {
      let sum = 0;
      for (let v = 0; v < 8; v++) {
        for (let u = 0; u < 8; u++) {
          sum +=
            alpha(u) *
            alpha(v) *
            block[v][u] *
            Math.cos(((2 * x + 1) * u * Math.PI) / 16) *
            Math.cos(((2 * y + 1) * v * Math.PI) / 16);
        }
      }
      out[y].push(Math.min(Math.max(Math.round(sum / 4 + 128), 0), 255));
    }
  }
  return out;
}

const STEPS = { dct2, dct3, quant, unquant, dct: dct8x8, idct: idct8x8 };
export type Step = keyof typeof STEPS;

/** Runs the matrix through the named steps, in order. */
export function pipeline(steps: Step[], m: Matrix): Matrix {
  return steps.reduce((acc, step) => STEPS[step](acc), m);
}

export type Cell = number | "EOB" | null;

/**
 * Reads an 8x8 block in JPEG zigzag order, one diagonal per row. Trailing
 * zeros are blanked (null) and the first of them becomes "EOB".
 */
export function zigzag(m: Matrix): Cell[][] {
  const diagonals: Cell[][] = [];
  for (let d = 0; d < 15; d++) {
    const diag: Cell[] = [];
    for (let i = 0; i <= d; i++) {
      // Even diagonals run bottom-left → top-right, odd ones the other way.
      const y = d % 2 === 0 ? d - i : i;
      const x = d - y;
      if (x < 8 && y < 8) diag.push(m[y][x]);
    }
    diagonals.push(diag);
  }
  let last: [number, number] | null = null;
  outer: for (let i = diagonals.length - 1; i >= 0; i--) {
    for (let j = diagonals[i].length - 1; j >= 0; j--) {
      if (diagonals[i][j] !== 0) break outer;
      diagonals[i][j] = null;
      last = [i, j];
    }
  }
  if (last) diagonals[last[0]][last[1]] = "EOB";
  return diagonals;
}

/** Counts how often each non-blank symbol appears, most common first. */
export function symbolCounts(cells: Cell[][]) {
  const counts = new Map<string, number>();
  for (const cell of cells.flat()) {
    if (cell !== null)
      counts.set(String(cell), (counts.get(String(cell)) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([symbol, count]) => ({ symbol, count }))
    .sort((a, b) => b.count - a.count);
}

/** Gray cell style for a value, scaled so `max` is white. */
export function gray(value: number, max = 255) {
  const n = Math.min(Math.max(Math.round((value / max) * 255), 0), 255);
  const hex = n.toString(16).padStart(2, "0");
  return {
    background: `#${hex}${hex}${hex}`,
    color: n > 128 ? "#000" : "#fff",
  };
}
