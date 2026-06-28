"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import styles from "./Intro.module.scss";

function PandaLogo() {
  return (
    <svg viewBox="0 0 48 48" className={styles.logo} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="26" r="18" fill="#fff" stroke="#232a36" strokeWidth="2" />
      <circle cx="11" cy="11" r="7" fill="#232a36" />
      <circle cx="37" cy="11" r="7" fill="#232a36" />
      <ellipse cx="18" cy="25" rx="5" ry="6" fill="#232a36" />
      <ellipse cx="30" cy="25" rx="5" ry="6" fill="#232a36" />
      <circle cx="18" cy="26" r="2" fill="#fff" />
      <circle cx="30" cy="26" r="2" fill="#fff" />
      <ellipse cx="24" cy="32" rx="3" ry="2" fill="#3a4150" />
    </svg>
  );
}

/**
 * Abertura cinematográfica: o leite enche a tela, o logo surge e a cortina de
 * leite sobe revelando o Hero. Toca só 1x por sessão, é pulável (clique/Esc) e
 * pula sozinha em prefers-reduced-motion (sem flash, via script inline no layout).
 */
export function Intro() {
  const [show, setShow] = useState(true);
  const [scope, animate] = useAnimate();
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("rjs-intro-seen");
      sessionStorage.setItem("rjs-intro-seen", "1");
    } catch {}

    if (reduce || seen) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";
    let cancelled = false;
    const done = () => {
      document.body.style.overflow = "";
      if (!cancelled) setShow(false);
    };

    const leave = async (duration: number) => {
      try {
        await animate(scope.current, { y: "-110%" }, { duration, ease: [0.76, 0, 0.24, 1] });
      } catch {}
      done();
    };

    // botão "Pular" e Esc usam este atalho p/ a cortina subir rápido
    let leaving = false;
    skipRef.current = () => {
      if (leaving || cancelled) return;
      leaving = true;
      leave(0.45);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipRef.current();
    };
    document.addEventListener("keydown", onKey);

    const run = async () => {
      try {
        await animate(".fill", { height: ["16%", "100%"] }, { duration: 0.9, ease: [0.65, 0, 0.35, 1] });
        if (cancelled || leaving) return;
        await animate(
          ".content",
          { opacity: 1, y: 0, scale: 1 },
          { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
        );
        if (cancelled || leaving) return;
        await new Promise((r) => setTimeout(r, 600));
        if (cancelled || leaving) return;
        leaving = true;
        await leave(0.85);
      } catch {
        done();
      }
    };
    run();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div
      id="rjs-intro"
      ref={scope}
      className={styles.overlay}
      role="dialog"
      aria-label="Abertura RJS Laticínios"
    >
      <div className={styles.fill}>
        <svg className={styles.crest} viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden>
          <path
            fill="#fffdf8"
            d="M0 60 V28 C160 8 300 8 460 24 C640 42 760 42 940 22 C1060 10 1140 14 1200 28 V60 Z"
          />
        </svg>
        <span className={styles.bubble} style={{ left: "32%", animationDelay: "0.2s" }} />
        <span className={styles.bubble} style={{ left: "60%", animationDelay: "0.9s" }} />
        <span className={styles.bubble} style={{ left: "47%", animationDelay: "1.4s" }} />
      </div>

      <div className={styles.content}>
        <PandaLogo />
        <h1 className={styles.word}>
          RJS <span>Laticínios</span>
        </h1>
        <p className={styles.tag}>Frescor que vem da fazenda</p>
      </div>

      <button className={styles.skip} onClick={() => skipRef.current()}>
        Pular intro →
      </button>
    </div>
  );
}
