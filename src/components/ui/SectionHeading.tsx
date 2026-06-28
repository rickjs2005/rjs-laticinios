import { Reveal } from "@/components/anim/Reveal";
import styles from "./SectionHeading.module.scss";

const ACCENT: Record<string, string> = {
  blue: "var(--flavor-deep)", // segue o sabor escolhido
  flavor: "var(--flavor-deep)",
  green: "#3fbf6a",
  orange: "#ff8a3d",
  yellow: "#e6ad12",
};

export function SectionHeading({
  eyebrow,
  title,
  accentWord,
  color = "blue",
  text,
  center,
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
  color?: keyof typeof ACCENT | string;
  text?: string;
  center?: boolean;
}) {
  const accent = ACCENT[color] ?? color;
  return (
    <div className={`${styles.head} ${center ? styles.center : ""}`}>
      <Reveal>
        <span className={styles.pill} style={{ color: accent }}>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2>
          {title}{" "}
          {accentWord && <em style={{ color: accent }}>{accentWord}</em>}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.1}>
          <p className={center ? styles.center : ""}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
