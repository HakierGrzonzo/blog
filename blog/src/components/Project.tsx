import Link from "next/link";
import { ReactNode } from "react";
import { FancyText } from "./fancy-text";
import styles from "./Project.module.css";

interface Props {
  link: string;
  title: string;
  prefix: number;
  /** Use a plain <a> for pages Next.js doesn't own (other sites, standalone HTML). */
  external?: boolean;
  children?: ReactNode;
}

export function Project({ link, title, prefix, external, children }: Props) {
  const card = (
    <div className={styles.card}>
      <h2>
        <FancyText prefix={prefix}>{title}</FancyText>
      </h2>
      <div>{children}</div>
    </div>
  );
  return external ? (
    <a href={link} className={styles.link}>
      {card}
    </a>
  ) : (
    <Link href={link} className={styles.link}>
      {card}
    </Link>
  );
}
