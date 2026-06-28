"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { STATS, type Stat } from "@/constants/data";
import { MilkDivider } from "@/components/decor/MilkDivider";
import styles from "./Stats.module.scss";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(stat.value);
      return;
    }
    const start = performance.now();
    const DUR = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * stat.value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, stat.value]);

  return (
    <span ref={ref} className={styles.value}>
      {n.toLocaleString("pt-BR")}
      {stat.suffix && <em>{stat.suffix}</em>}
    </span>
  );
}

export function Stats() {
  return (
    <section className={styles.section}>
      <MilkDivider />
      <div className={styles.inner}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.cell}>
            <Counter stat={s} />
            <p className={styles.label}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
