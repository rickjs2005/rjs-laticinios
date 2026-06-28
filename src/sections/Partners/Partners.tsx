import { PARTNERS } from "@/constants/data";
import styles from "./Partners.module.scss";

const DOTS = ["#2e7df6", "#3fbf6a", "#ff8a3d", "#ffc828"];

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {PARTNERS.map((name, i) => (
        <li className={styles.brand} key={`${name}-${i}`}>
          <span style={{ background: DOTS[i % DOTS.length] }} aria-hidden />
          {name}
        </li>
      ))}
    </ul>
  );
}

export function Partners() {
  return (
    <section id="distribuidores" className={styles.section}>
      <p className={styles.label}>Marcas e mercados que confiam na RJS</p>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {/* primeira via é lida por leitores de tela; a cópia é decorativa */}
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
