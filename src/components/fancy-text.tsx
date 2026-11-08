import styles from "./fancy-text.module.css";
export function FancyText({
  children,
  prefix = 1,
}: {
  children: string;
  prefix: number;
}) {
  return (
    <>
      {children.split("").map((letter, index) => (
        <span
          className={index < prefix ? styles.fancy : styles.normal}
          key={index}
        >
          {letter}
        </span>
      ))}
    </>
  );
}
