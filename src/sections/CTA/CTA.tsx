"use client";

import { motion } from "framer-motion";
import { AssetImage } from "@/components/media/AssetImage";
import { Confetti } from "@/components/anim/Confetti";
import { Reveal } from "@/components/anim/Reveal";
import { BRAND } from "@/constants/data";
import styles from "./CTA.module.scss";

export function CTA() {
  const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    "Olá! Quero ser um distribuidor RJS Laticínios.",
  )}`;
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
            <a href={wa} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              Seja um Distribuidor →
            </a>
          </Reveal>
        </div>

        <motion.div
          className={styles.panda}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <AssetImage
              src="/hero/panda-sign.png"
              alt="Panda RJS segurando uma placa: Vamos crescer juntos?"
              className={styles.pandaImg}
              variant="free"
              emoji="🐼"
              label="render do panda com placa (panda-sign.png)"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
