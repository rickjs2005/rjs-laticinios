"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { Reveal } from "@/components/anim/Reveal";
import { AssetImage } from "@/components/media/AssetImage";
import styles from "./PandaPlay.module.scss";

export function PandaPlay() {
  const reduce = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sy = useSpring(ry, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, (v) => v * 16);
  const rotateX = useTransform(sy, (v) => v * -12);
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      rx.set((e.clientX / window.innerWidth - 0.5) * 2);
      ry.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, rx, ry]);

  const playful = () => {
    if (reduce) return;
    controls.start({
      rotate: [0, -6, 5, -3, 0],
      scale: [1, 1.06, 0.97, 1.02, 1],
      transition: { duration: 0.7, ease: "easeInOut" },
    });
  };

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
              Sou a carinha da RJS e adoro queijo. Passa o cursor pela tela que
              eu giro pra te seguir, e <strong>clica em mim</strong> pra ver uma graça!
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <span className={styles.hint}>👆 Clique no panda</span>
          </Reveal>
        </div>

        <div className={styles.pandaArea}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={controls}
            onClick={playful}
          >
            <AssetImage
              src="/hero/panda-cheese.png"
              alt="Pandito oferecendo um queijo"
              className={styles.pandaImg}
              variant="free"
              emoji="🐼"
              label="render do Pandito (panda-cheese.png)"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
