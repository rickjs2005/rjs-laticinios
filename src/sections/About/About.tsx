"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GiCow, GiFactory } from "react-icons/gi";
import { FiTruck, FiShoppingBag, FiHome } from "react-icons/fi";
import { PiSealCheckFill } from "react-icons/pi";
import { TIMELINE } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./About.module.scss";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ReactNode> = {
  farm: <GiCow />,
  factory: <GiFactory />,
  quality: <PiSealCheckFill />,
  truck: <FiTruck />,
  store: <FiShoppingBag />,
  home: <FiHome />,
};

export function About() {
  const reduce = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // a trilha "se desenha" conforme o scroll (scrub no scaleY da linha de progresso)
  useEffect(() => {
    if (reduce) {
      if (fillRef.current) fillRef.current.style.transform = "scaleY(1)";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 78%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        },
      );
    }, trackRef);
    return () => ctx.revert();
  }, [reduce]);

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

        <div ref={trackRef} className={styles.timeline}>
          {/* trilha conectada: trilho base + linha que se desenha no scroll */}
          <div className={styles.rail} aria-hidden>
            <div ref={fillRef} className={styles.railFill} />
          </div>

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
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-18%" }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.12, rotate: 6 }}
              >
                <i className={styles.pulse} aria-hidden />
                {ICONS[s.icon]}
              </motion.span>
              <div className={styles.card}>
                <span className={styles.stepIndex}>{`0${i + 1}`}</span>
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
