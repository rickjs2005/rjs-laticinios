"use client";

import { useEffect, useRef } from "react";
import styles from "./LiquidCursor.module.scss";

/**
 * Cursor personalizado: uma GOTA DE LEITE substitui o ponteiro (com volume,
 * brilho e um rastro cremoso atrás). Esconde o cursor nativo. Desliga em touch /
 * reduced-motion / telas pequenas (mantém o cursor do sistema). rAF + transform
 * (sem re-render React) p/ não custar INP.
 */
export function LiquidCursor() {
  const dropRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || reduce || !wide) return;

    const drop = dropRef.current;
    const trail = trailRef.current;
    if (!drop || !trail) return;

    // só esconde o cursor nativo quando a gota está ativa
    document.documentElement.classList.add("milk-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let tx = mx;
    let ty = my;
    let raf = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      drop.style.opacity = "1";
      trail.style.opacity = "1";
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
    };
    const onLeave = () => {
      visible = false;
      drop.style.opacity = "0";
      trail.style.opacity = "0";
    };
    const onDown = () => (drop.dataset.press = "1");
    const onUp = () => (drop.dataset.press = "");
    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.(
        "a,button,[role='button'],input,select,textarea,label",
      );
      drop.dataset.hot = t ? "1" : "";
    };

    const tick = () => {
      // gota: segue rápido | rastro: segue lento (leite escorrendo)
      dx += (mx - dx) * 0.32;
      dy += (my - dy) * 0.32;
      tx += (mx - tx) * 0.16;
      ty += (my - ty) * 0.16;
      drop.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("milk-cursor");
    };
  }, []);

  return (
    <div className={styles.layer} aria-hidden>
      <div ref={trailRef} className={styles.trail} />
      <div ref={dropRef} className={styles.drop}>
        <svg viewBox="0 0 24 32" className={styles.dropSvg}>
          <defs>
            <linearGradient id="milkDrop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e9f1ff" />
            </linearGradient>
          </defs>
          {/* corpo da gota (ponta em cima = hotspot) */}
          <path
            d="M12 1.5 C12 1.5 4 13 4 20.5 a8 8 0 0 0 16 0 C20 13 12 1.5 12 1.5 Z"
            fill="url(#milkDrop)"
            stroke="rgba(33,48,74,0.14)"
            strokeWidth="0.8"
          />
          {/* brilho especular */}
          <ellipse cx="9" cy="19" rx="2.3" ry="3.3" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}
