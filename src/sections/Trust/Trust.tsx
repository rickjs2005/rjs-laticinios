"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GiFactory } from "react-icons/gi";
import { PiSealCheckFill, PiDropFill } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import { SEALS, BRAND } from "@/constants/data";
import styles from "./Trust.module.scss";

const ICONS: Record<string, React.ReactNode> = {
  factory: <GiFactory />,
  seal: <PiSealCheckFill />,
  drop: <PiDropFill />,
  truck: <FiTruck />,
};

export function Trust() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Selos de confiança">
      <div className={styles.inner}>
        <ul className={styles.grid}>
          {SEALS.map((s, i) => (
            <motion.li
              key={s.title}
              className={styles.item}
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.icon} aria-hidden>
                {ICONS[s.icon]}
              </span>
              <div className={styles.text}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.p
          className={styles.credit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className={styles.dot} aria-hidden />
          Indústria própria desde {BRAND.since} — inspeção e rastreabilidade de lote.
        </motion.p>
      </div>
    </section>
  );
}
