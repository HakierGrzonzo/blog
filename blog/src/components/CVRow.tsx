import { ReactNode } from "react";
import styles from "./CVRow.module.css";

/** One row of a CVSection: a bold label on the left, content on the right. */
export function CVRow({
  label,
  children,
}: {
  label: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li className={styles.row}>
      <div className={styles.label}>{label}</div>
      <div className={styles.content}>{children}</div>
    </li>
  );
}
