"use client";

import { motion } from "framer-motion";
import { GiCow, GiFactory } from "react-icons/gi";
import { FiTruck, FiShoppingBag, FiHome } from "react-icons/fi";
import { PiSealCheckFill } from "react-icons/pi";
import { TIMELINE } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./About.module.scss";

const ICONS: Record<string, React.ReactNode> = {
  farm: <GiCow />,
  factory: <GiFactory />,
  quality: <PiSealCheckFill />,
  truck: <FiTruck />,
  store: <FiShoppingBag />,
  home: <FiHome />,
};

export function About() {
  return (
    <section id="quem-somos" className={`section ${styles.section}`}>
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="🐄 Quem somos"
          title="Do pasto ao seu"
          accentWord="café da manhã"
          color="green"
          text="Uma jornada de frescor — cada etapa cuidada como se fosse para a nossa própria família."
          center
        />

        <div className={styles.timeline}>
          {TIMELINE.map((s, i) => (
            <motion.div
              key={s.title}
              className={styles.step}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className={styles.node}
                whileHover={{ scale: 1.12, rotate: 6 }}
              >
                {ICONS[s.icon]}
              </motion.span>
              <div className={styles.card}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
