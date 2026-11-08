import { ReactNode } from "react";
import { FancyText } from "./fancy-text";
import styles from "./CVSection.module.css";

export function CVSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className={styles.title}>
        <span>
          <FancyText prefix={3}>{title}</FancyText>
        </span>
        <span className={styles.ruler}></span>
      </h2>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}
