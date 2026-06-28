"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Panda, type PandaItem } from "./Panda";

type Props = { item?: PandaItem; className?: string };

/** Panda que acompanha o cursor com a cabeça/olhos e faz uma graça ao clicar. */
export function InteractivePanda({ item = "none", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.38; // mira na cabeça
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      setLook({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const playful = () =>
    controls.start({
      rotate: [0, -7, 6, -4, 0],
      scale: [1, 1.07, 0.97, 1.02, 1],
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
    });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={controls}
      onClick={playful}
      style={{ cursor: "pointer", display: "inline-block" }}
      title="Clique em mim!"
    >
      <Panda look={reduce ? undefined : look} item={item} />
    </motion.div>
  );
}
