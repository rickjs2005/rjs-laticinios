"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { InteractivePanda } from "@/components/panda/InteractivePanda";
import { Confetti } from "@/components/anim/Confetti";
import { Reveal } from "@/components/anim/Reveal";
import { waLink, CTA_COPY } from "@/constants/data";
import styles from "./CTA.module.scss";

// Botão com efeito MAGNÉTICO — atrai levemente o cursor (spring).
function MagneticBtn({ href, reduce }: { href: string; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const x = useSpring(mvx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(mvy, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvx.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    mvy.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={styles.magnetic}
      style={reduce ? undefined : { x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.btn}>
        {CTA_COPY.distributor} →
      </a>
    </motion.span>
  );
}

export function CTA() {
  const reduce = useReducedMotion() ?? false;
  const wa = waLink("Olá! Quero ser um distribuidor RJS Laticínios.");

  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.box}>
        <Confetti />
        <div className={styles.copy}>
          <Reveal>
            <h2>Vamos crescer juntos?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Seja um distribuidor RJS e leve frescor de verdade para a sua
              região. Condições especiais para parceiros.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticBtn href={wa} reduce={reduce} />
          </Reveal>
        </div>

        <motion.div
          className={styles.panda}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            {/* mascote vetorial unificado segurando a placa */}
            <InteractivePanda item="sign" className={styles.pandaImg} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
