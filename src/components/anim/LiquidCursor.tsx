"use client";

import { useEffect, useRef } from "react";
import styles from "./LiquidCursor.module.scss";

/**
 * Cursor de "leite" — uma gota branca com rastro elástico que segue o ponteiro.
 * Assina o tema da marca em todo o site. Desliga em touch / reduced-motion /
 * telas pequenas. Usa rAF + transform (sem re-render React) p/ não custar INP.
 */
export function LiquidCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || reduce || !wide) return;

    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx;
    let ty = my;
    let dx = mx;
    let dy = my;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        trail.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      trail.style.opacity = "0";
    };

    // engrossa o blob sobre elementos interativos (feedback de "líquido grudando")
    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest("a,button,[role='button'],input");
      trail.dataset.hot = t ? "1" : "";
    };

    const tick = () => {
      // gota: segue rápido | rastro: segue lento (elástico viscoso)
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      tx += (mx - tx) * 0.14;
      ty += (my - ty) * 0.14;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className={styles.layer} aria-hidden>
      <svg width="0" height="0" className={styles.defs}>
        <filter id="milk-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
          <feColorMatrix
            in="b"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
          />
        </filter>
      </svg>
      <div className={styles.goo}>
        <div ref={trailRef} className={styles.trail} />
        <div ref={dotRef} className={styles.dot} />
      </div>
    </div>
  );
}
