import Link from "next/link";
import { ReactNode } from "react";
import { FancyText } from "./fancy-text";

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
    <div className="project-card">
      <h2>
        <FancyText prefix={prefix}>{title}</FancyText>
      </h2>
      <div className="content">{children}</div>
    </div>
  );
  return external ? (
    <a href={link} className="block">
      {card}
    </a>
  ) : (
    <Link href={link} className="block">
      {card}
    </Link>
  );
}
