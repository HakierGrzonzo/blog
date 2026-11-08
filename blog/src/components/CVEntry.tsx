import { ReactNode } from "react";
import { CVRow } from "./CVRow";
import styles from "./CVEntry.module.css";

export function CVEntry({
  employer,
  dates,
  position,
  tech,
  children,
}: {
  employer: string;
  dates?: string;
  position: string;
  tech?: string;
  children?: ReactNode;
}) {
  return (
    <CVRow
      label={
        <>
          <div>{employer}</div>
          <div className={styles.subtitle}>{dates}</div>
        </>
      }
    >
      <span className={styles.jobTitle}>{position}</span>
      <ul className={styles.bullets}>{children}</ul>
      {tech && (
        <p className={styles.tech}>
          <b>Tech:</b> {tech}
        </p>
      )}
    </CVRow>
  );
}
