"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { TESTIMONIALS } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Testimonials.module.scss";

const ACCENTS: Record<string, string> = {
  blue: "#2e7df6",
  yellow: "#ffc828",
  green: "#3fbf6a",
  orange: "#ff8a3d",
};

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="💬 Quem confia"
        title="O que dizem"
        accentWord="sobre a RJS"
        color="blue"
        center
      />

      <div className={styles.grid}>
        {TESTIMONIALS.map((t, i) => {
          const accent = ACCENTS[t.accent] ?? ACCENTS.blue;
          return (
            <motion.figure
              key={t.name}
              className={styles.card}
              style={{ "--accent": accent } as React.CSSProperties}
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>

              <div className={styles.stars} role="img" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <FaStar key={s} aria-hidden />
                ))}
              </div>

              <blockquote className={styles.quote}>{t.quote}</blockquote>

              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden>
                  {t.initials}
                </span>
                <span className={styles.who}>
                  <strong>{t.name}</strong>
                  <span className={styles.meta}>
                    {t.role} • {t.city}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
