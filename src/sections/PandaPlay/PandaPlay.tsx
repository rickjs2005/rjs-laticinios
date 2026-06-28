"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/anim/Reveal";
import { InteractivePanda } from "@/components/panda/InteractivePanda";
import styles from "./PandaPlay.module.scss";

export function PandaPlay() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Reveal>
            <span className={styles.pill}>🐼 Oi, eu sou o Pandito!</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2>
              Mexa o mouse — eu <em>te acompanho</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Sou a carinha da RJS e adoro queijo. Os meus olhos e a minha cabeça
              te seguem pela tela — <strong>clica em mim</strong> pra ver uma graça!
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <span className={styles.hint}>👆 Clique no panda (e tente 5x 😉)</span>
          </Reveal>
        </div>

        <div className={styles.pandaArea}>
          {/* sombra de chão com follow-through (atraso = peso) */}
          <motion.span
            className={styles.shadow}
            aria-hidden
            animate={reduce ? undefined : { scaleX: [1, 0.9, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          {/* bob leve — só anima dentro da viewport (poupa CPU/bateria) */}
          <motion.div
            className={styles.pandaFloat}
            initial={{ y: 0 }}
            whileInView={reduce ? undefined : { y: [0, -14, 0] }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <InteractivePanda item="cheese" className={styles.pandaSvg} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
