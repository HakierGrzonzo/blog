import Link from "next/link";
import { FancyText } from "./fancy-text";
import { JSX } from "react/jsx-runtime";

interface Props {
  link: string;
  title: string;
  prefix: number;
  children: JSX.Element;
}

export function Project({ link, title, prefix, children }: Props) {
  return (
    <Link href={link} className="block">
      <div className="project-card">
        <h2>
          <FancyText prefix={prefix}>{title}</FancyText>
        </h2>
        <div className="content">{children}</div>
      </div>
    </Link>
  );
}
