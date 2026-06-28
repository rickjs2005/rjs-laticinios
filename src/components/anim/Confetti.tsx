"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#2e7df6", "#3fbf6a", "#ff8a3d", "#ffc828", "#ff8fa3", "#fff"];

/** Confete discreto que cai em loop (campanhas/CTA). */
export function Confetti({ count = 16 }: { count?: number }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i / count) * 100 + (i % 3) * 4,
        color: COLORS[i % COLORS.length],
        size: 8 + (i % 3) * 3,
        delay: (i % 7) * 0.5,
        dur: 3.5 + (i % 4) * 0.7,
        rot: i % 2 ? 360 : -360,
        round: i % 2 === 0,
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            top: -20,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? "50%" : 3,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: "120vh", opacity: [0, 1, 1, 0], rotate: p.rot }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
