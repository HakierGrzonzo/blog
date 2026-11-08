"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import katex from "katex";
import type { Matrix, Step } from "./dct";
import { MatrixInput, MatrixOutput } from "./Matrix";
import styles from "./Controls.module.css";

function wave(m1: number, m2: number): Matrix {
  const row = [];
  for (let x = 0; x < 8; x++) {
    row.push(
      Math.round(Math.cos((m1 / 50) * x) * 128 + Math.cos((m2 / 50) * x) * 64),
    );
  }
  return [row];
}

type State = {
  factors: [number, number];
  setFactors: (f: [number, number]) => void;
  vals: Matrix;
  setVals: (m: Matrix) => void;
};

const Ctx = createContext<State | null>(null);
const useDctII = () => useContext(Ctx)!;

/** Holds the 1x8 vector shared by every DCT-II/III panel inside it. */
export function DctIIDemo({ children }: { children: ReactNode }) {
  const [factors, setFactorsState] = useState<[number, number]>([0, 25]);
  const [vals, setVals] = useState(() => wave(0, 25));
  const setFactors = (f: [number, number]) => {
    setFactorsState(f);
    setVals(wave(...f));
  };
  return <Ctx value={{ factors, setFactors, vals, setVals }}>{children}</Ctx>;
}

function Tex({ children }: { children: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: katex.renderToString(children) }}
    />
  );
}

/** Two sliders that generate the input vector from a sum of cosines. */
export function FactorSliders() {
  const { factors, setFactors } = useDctII();
  const [m1, m2] = factors;
  return (
    <div className={styles.sliders}>
      {factors.map((f, i) => (
        <label key={i}>
          <Tex>{`m_${i + 1}`}</Tex>
          <input
            type="range"
            min={0}
            max={100}
            value={f}
            onChange={(e) => {
              const next: [number, number] = [m1, m2];
              next[i] = Number(e.target.value);
              setFactors(next);
            }}
          />
        </label>
      ))}
      <Tex>
        {`128 \\cdot \\cos \\left( ${(m1 / 50).toFixed(2)} x \\right) + 64 \\cdot \\cos \\left( ${(m2 / 50).toFixed(2)} x \\right)`}
      </Tex>
    </div>
  );
}

export function DctIIInput() {
  const { vals, setVals } = useDctII();
  return <MatrixInput value={vals} onChange={setVals} />;
}

export function DctIIOutput({ steps }: { steps: Step[] }) {
  const { vals } = useDctII();
  return <MatrixOutput value={vals} steps={steps} />;
}
