"use client";

import type { CSSProperties } from "react";
import { gray, pipeline, type Matrix, type Step } from "./dct";
import styles from "./Matrix.module.css";

/** Editable grid of 0–255 values, each cell shaded by its value. */
export function MatrixInput({
  value,
  onChange,
}: {
  value: Matrix;
  onChange: (m: Matrix) => void;
}) {
  const set = (y: number, x: number, v: number) =>
    onChange(
      value.map((row, i) => row.map((c, j) => (i === y && j === x ? v : c))),
    );
  return (
    <div
      className={styles.grid}
      style={{ "--cols": value[0].length } as CSSProperties}
    >
      {value.map((row, y) =>
        row.map((cell, x) => (
          <input
            key={`${y}-${x}`}
            className={styles.cell}
            style={gray(cell)}
            type="number"
            min={0}
            max={255}
            value={cell}
            aria-label={`Wiersz ${y + 1}, kolumna ${x + 1}`}
            onChange={(e) => set(y, x, Number(e.target.value))}
          />
        )),
      )}
    </div>
  );
}

/** Read-only grid showing `value` after running it through `steps`. */
export function MatrixOutput({
  value,
  steps = ["dct"],
  max = 1024,
}: {
  value: Matrix;
  steps?: Step[];
  max?: number;
}) {
  const result = pipeline(steps, value);
  return (
    <div
      className={styles.grid}
      style={{ "--cols": result[0].length } as CSSProperties}
    >
      {result.map((row, y) =>
        row.map((cell, x) => (
          <span
            key={`${y}-${x}`}
            className={styles.cell}
            style={gray(cell, max)}
          >
            {Math.round(cell * 100) / 100}
          </span>
        )),
      )}
    </div>
  );
}

/** Plain table of numbers. */
export function ArrToTable({ array }: { array: Matrix }) {
  return (
    <table className={styles.table}>
      <tbody>
        {array.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <td key={x}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
