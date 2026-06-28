"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./ScrollProgress.module.scss";

/** Progresso de leitura como uma GOTA DE LEITE que desce na lateral direita. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const y = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const top = useTransform(y, (v) => `${v * 100}%`);
  const fill = useTransform(y, (v) => `${v * 100}%`);

  return (
    <div className={styles.track} aria-hidden>
      <motion.span className={styles.fill} style={{ height: fill }} />
      <motion.span className={styles.drop} style={{ top }} />
    </div>
  );
}
