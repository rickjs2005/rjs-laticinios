import styles from "./FarmBackground.module.scss";

// Cena de fazenda em camadas (céu, sol, nuvens, colinas, celeiro) — puro SVG/CSS.
export default function FarmBackground() {
  return (
    <div className={styles.farm} aria-hidden>
      <div className={styles.sky} />
      <div className={styles.sun} />

      <div className={styles.clouds}>
        <span className={`${styles.cloud} ${styles.c1}`} />
        <span className={`${styles.cloud} ${styles.c2}`} />
        <span className={`${styles.cloud} ${styles.c3}`} />
        <span className={`${styles.cloud} ${styles.c4}`} />
      </div>

      <div className={styles.hills}>
        <svg viewBox="0 0 1440 340" preserveAspectRatio="none">
          {/* colina de trás */}
          <path
            d="M0 188 C 320 120 560 158 820 124 C 1080 92 1280 110 1440 150 L1440 340 L0 340 Z"
            fill="#d8f0d2"
          />
          {/* árvores distantes */}
          <g opacity="0.9">
            <circle cx="190" cy="176" r="26" fill="#bfe6b6" />
            <rect x="185" y="176" width="10" height="26" fill="#a98463" />
            <circle cx="250" cy="184" r="20" fill="#cdebc3" />
            <rect x="246" y="184" width="8" height="20" fill="#a98463" />
          </g>

          {/* colina do meio */}
          <path
            d="M0 244 C 360 196 700 236 1040 206 C 1240 188 1360 206 1440 214 L1440 340 L0 340 Z"
            fill="#a9e1a6"
          />

          {/* fazendinha (celeiro + silo) sobre a colina do meio */}
          <g transform="translate(1040 150)">
            {/* silo */}
            <rect x="78" y="22" width="26" height="56" rx="6" fill="#e9eef3" />
            <path d="M78 28 Q91 8 104 28 Z" fill="#cfd8e2" />
            {/* celeiro */}
            <rect x="14" y="34" width="62" height="44" rx="4" fill="#e15a4f" />
            <path d="M10 36 L45 14 L80 36 Z" fill="#b8443b" />
            <rect x="38" y="52" width="16" height="26" rx="2" fill="#fbe7c6" />
            <rect x="20" y="44" width="12" height="12" rx="2" fill="#fbe7c6" />
          </g>

          {/* colina da frente */}
          <path
            d="M0 300 C 420 262 920 304 1440 282 L1440 340 L0 340 Z"
            fill="#7ed18a"
          />
          {/* flores na colina da frente */}
          <g>
            <circle cx="120" cy="312" r="4" fill="#ffd34d" />
            <circle cx="360" cy="320" r="4" fill="#ff8fa3" />
            <circle cx="640" cy="316" r="4" fill="#ffd34d" />
            <circle cx="930" cy="322" r="4" fill="#ff8fa3" />
            <circle cx="1240" cy="314" r="4" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}
