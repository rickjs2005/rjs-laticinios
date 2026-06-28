"use client";

import { useEffect, useState } from "react";
import styles from "./ClickFX.module.scss";

type Drop = { dx: number; dy: number; s: number };
type Burst = { id: number; x: number; y: number; drops: Drop[] };

let counter = 0;

export function ClickFX() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      const n = 7;
      const drops: Drop[] = Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 26 + Math.random() * 46;
        return {
          dx: Math.cos(a) * dist,
          dy: Math.sin(a) * dist * 0.7 + 22 + Math.random() * 18, // viés de gravidade
          s: 0.5 + Math.random() * 0.7,
        };
      });
      const id = ++counter;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, drops }]);
      window.setTimeout(() => setBursts((b) => b.filter((z) => z.id !== id)), 720);
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className={styles.layer} aria-hidden>
      {bursts.map((b) => (
        <div key={b.id} className={styles.burst} style={{ left: b.x, top: b.y }}>
          {b.drops.map((d, i) => (
            <span
              key={i}
              className={styles.drop}
              style={
                {
                  "--dx": `${d.dx}px`,
                  "--dy": `${d.dy}px`,
                  "--s": d.s,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
