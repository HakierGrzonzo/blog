import { ReactNode } from "react";

export function CVEntry({
  employer,
  dates,
  position,
  children,
}: {
  employer: string;
  dates?: string;
  position: string;
  children?: ReactNode;
}) {
  return (
    <li>
      <div className="category">
        <div>{employer}</div>
        <div className="subtitle">{dates}</div>
      </div>
      <div className="values">
        <span className="job-title">{position}</span>
        <ul>{children}</ul>
      </div>
    </li>
  );
}
