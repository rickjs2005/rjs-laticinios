"use client";

import { motion } from "framer-motion";
import { PiDropFill, PiLeafFill, PiShieldCheckFill } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import { DIFFERENTIALS } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Differentials.module.scss";

const ICONS: Record<string, React.ReactNode> = {
  drop: <PiDropFill />,
  leaf: <PiLeafFill />,
  truck: <FiTruck />,
  shield: <PiShieldCheckFill />,
};

export function Differentials() {
  return (
    <section className={`section ${styles.section}`}>
      <SectionHeading
        eyebrow="✨ Por que a RJS"
        title="Feito com"
        accentWord="cuidado de verdade"
        color="blue"
        center
      />
      <div className={styles.grid}>
        {DIFFERENTIALS.map((d, i) => (
          <motion.div
            key={d.title}
            className={styles.card}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.span className={styles.icon} whileHover={{ rotate: 8, scale: 1.08 }}>
              {ICONS[d.icon]}
            </motion.span>
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
