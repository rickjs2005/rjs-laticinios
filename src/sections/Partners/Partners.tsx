import { PARTNERS } from "@/constants/data";
import styles from "./Partners.module.scss";

const DOTS = ["#2e7df6", "#3fbf6a", "#ff8a3d", "#ffc828"];

export function Partners() {
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section id="distribuidores" className={styles.section}>
      <p className={styles.label}>Marcas e mercados que confiam na RJS</p>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {loop.map((name, i) => (
            <div className={styles.brand} key={`${name}-${i}`}>
              <span style={{ background: DOTS[i % DOTS.length] }} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
