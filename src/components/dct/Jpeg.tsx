"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { symbolCounts, zigzag, pipeline, type Matrix, type Step } from "./dct";
import { MatrixInput, MatrixOutput } from "./Matrix";
import { Arrow, Brackets } from "./Layout";
import styles from "./Controls.module.css";

const sq = (a: number) => a * a;
const inCircle = (x: number, y: number, r: number) =>
  sq(x - 3.5) + sq(y - 3.5) < r;

const PRESETS: { name: string; gen: (x: number, y: number) => number }[] = [
  { name: "Pusty", gen: () => 0 },
  { name: "Paski pionowe", gen: (x) => (x % 2 === 0 ? 255 : 0) },
  { name: "Paski poziome", gen: (_, y) => (y % 2 === 0 ? 255 : 0) },
  {
    name: "Paski skośne",
    gen: (x, y) => ([y - 6, y - 3, y, y + 3, y + 6].includes(x) ? 255 : 0),
  },
  { name: "sinus", gen: (x) => Math.round(Math.sin(x) * 128 + 128) },
  { name: "cosinus", gen: (x) => Math.round(Math.cos(x) * 128 + 128) },
  { name: "Szachownica", gen: (x, y) => (y % 2 === x % 2 ? 255 : 0) },
  {
    name: "Kołopodobne",
    gen: (x, y) => (inCircle(x, y, 7) ? 255 : inCircle(x, y, 9) ? 128 : 0),
  },
  {
    name: "Okręgopodobne",
    gen: (x, y) => (inCircle(x, y, 9) && !inCircle(x, y, 4) ? 255 : 0),
  },
  { name: "Parabolka", gen: (x, y) => (sq(x - 3.5) < y ? 255 : 0) },
  { name: "Gradient x + y", gen: (x, y) => Math.round(255 - (x + y) * 18.21) },
];

function generate(preset: number): Matrix {
  return Array.from({ length: 8 }, (_, y) =>
    Array.from({ length: 8 }, (_, x) => PRESETS[preset].gen(x, y)),
  );
}

type State = {
  preset: number;
  setPreset: (p: number) => void;
  vals: Matrix;
  setVals: (m: Matrix) => void;
};

const Ctx = createContext<State | null>(null);
const useJpeg = () => useContext(Ctx)!;

/** Holds the 8x8 block shared by every JPEG panel inside it. */
export function JpegDemo({ children }: { children: ReactNode }) {
  const [preset, setPresetState] = useState(0);
  const [vals, setVals] = useState(() => generate(0));
  const setPreset = (p: number) => {
    setPresetState(p);
    setVals(generate(p));
  };
  return <Ctx value={{ preset, setPreset, vals, setVals }}>{children}</Ctx>;
}

export function PresetSelect() {
  const { preset, setPreset } = useJpeg();
  const id = useId();
  return (
    <div className={styles.preset}>
      <label htmlFor={id}>Przykład:</label>
      <select
        id={id}
        value={preset}
        onChange={(e) => setPreset(Number(e.target.value))}
      >
        {PRESETS.map((p, i) => (
          <option key={p.name} value={i}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function JpegInput() {
  const { vals, setVals } = useJpeg();
  return <MatrixInput value={vals} onChange={setVals} />;
}

export function JpegOutput({ steps, max }: { steps: Step[]; max?: number }) {
  const { vals } = useJpeg();
  return <MatrixOutput value={vals} steps={steps} max={max} />;
}

/** Quantized block → zigzag read-out → symbol frequencies. */
export function EntropyEncoding({ children }: { children?: ReactNode }) {
  const { vals } = useJpeg();
  const quantized = pipeline(["dct", "quant"], vals);
  const encoded = zigzag(quantized);
  const counts = symbolCounts(encoded);
  const total = counts.reduce((s, c) => s + c.count, 0);
  return (
    <div className={styles.entropy}>
      <Brackets>
        <table className={styles.plain}>
          <tbody>
            {quantized.map((row, y) => (
              <tr key={y}>
                {row.map((c, x) => (
                  <td key={x}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Brackets>
      <Arrow />
      <table className={styles.plain}>
        <tbody>
          {encoded.map((row, y) => (
            <tr key={y}>
              {row.map((c, x) => (
                <td key={x}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.probabilities}>
        {children}
        <table className={styles.prob}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Prawdopodobieństwo</th>
            </tr>
          </thead>
          <tbody>
            {counts.map(({ symbol, count }) => (
              <tr key={symbol}>
                <td>{symbol}</td>
                <td>
                  {count} / {total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
