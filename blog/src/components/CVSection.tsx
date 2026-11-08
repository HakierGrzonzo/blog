import { ReactNode } from "react";
import { FancyText } from "./fancy-text";

export function CVSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="cvsection">
      <h2>
        <span>
          <FancyText prefix={3}>{title}</FancyText>
        </span>
        <span className="ruler"></span>
      </h2>
      <ul>{children}</ul>
    </div>
  );
}
