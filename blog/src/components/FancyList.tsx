import { Fragment } from "react";
import styles from "./fancy-text.module.css";

/** Renders a list of items separated by commas, each one hoverable. */
export function FancyList({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <Fragment key={index}>
          <span className={styles.normal}>{item}</span>
          {index < items.length - 1 ? ", " : ""}
        </Fragment>
      ))}
    </div>
  );
}
