import type { ReactNode } from "react";
import "katex/dist/katex.min.css";
import styles from "./Layout.module.css";

/** Row of demo pieces that wraps on narrow screens. */
export function Panels({ children }: { children: ReactNode }) {
  return <div className={styles.panels}>{children}</div>;
}

/** Formula box with a bold caption. */
export function TitledEq({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.titledEq}>
      {title && <strong>{title}</strong>}
      {children}
    </div>
  );
}

export function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden>
      ⇒
    </span>
  );
}

/** Matrix brackets drawn around the content. */
export function Brackets({ children }: { children: ReactNode }) {
  return (
    <div className={styles.brackets}>
      <div className={`${styles.bracket} ${styles.left}`} />
      <div className={styles.bracketContent}>{children}</div>
      <div className={`${styles.bracket} ${styles.right}`} />
    </div>
  );
}

export function Figure({ children }: { children: ReactNode }) {
  return <figure className={styles.figure}>{children}</figure>;
}
