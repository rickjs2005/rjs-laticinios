"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { Panda, type PandaItem } from "./Panda";

type Props = { item?: PandaItem; className?: string };

const IDLE_MS = 8000; // tempo parado até o panda cochilar

/** Panda que acompanha o cursor com a cabeça/olhos e faz graças ao clicar. */
export function InteractivePanda({ item = "none", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [sleepy, setSleepy] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  // throttle por requestAnimationFrame (atualiza no máx 1x/frame = bom INP)
  const rafRef = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);
  const lastLook = useRef({ x: 0, y: 0 });
  // visibilidade e ociosidade
  const inView = useRef(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // easter egg: contagem de cliques
  const clicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // (re)arma o cochilo após IDLE_MS sem movimento
  const armIdle = useCallback(() => {
    if (reduce) return;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setSleepy(true), IDLE_MS);
  }, [reduce]);

  // pausa o processamento quando a seção sai da viewport (poupa CPU)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    armIdle();

    const flush = () => {
      rafRef.current = null;
      const p = pending.current;
      if (!p) return;
      // só re-renderiza se o delta for relevante (evita renders à toa)
      if (
        Math.abs(p.x - lastLook.current.x) < 0.02 &&
        Math.abs(p.y - lastLook.current.y) < 0.02
      )
        return;
      lastLook.current = p;
      setLook(p);
    };

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el || !inView.current) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.38; // mira na cabeça
      pending.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))),
      };
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(flush);
      if (sleepy) setSleepy(false);
      armIdle();
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [reduce, sleepy, armIdle]);

  const burst = () => {
    const ids = Array.from({ length: 8 }, (_, i) => Date.now() + i);
    setHearts((h) => [...h, ...ids]);
    setTimeout(() => setHearts((h) => h.filter((id) => !ids.includes(id))), 1500);
  };

  const playful = () => {
    if (!reduce) {
      controls.start({
        rotate: [0, -7, 6, -4, 0],
        scale: [1, 1.07, 0.97, 1.02, 1],
        transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
      });
    }
    setSleepy(false);
    armIdle();

    // easter egg: 5 cliques seguidos → chuva de coraçõezinhos
    clicks.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => (clicks.current = 0), 1200);
    if (clicks.current >= 5) {
      clicks.current = 0;
      if (!reduce) burst();
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={controls}
      onClick={playful}
      style={{ cursor: "pointer", display: "inline-block", position: "relative" }}
      title="Clique em mim!"
    >
      {/* respiração — mais lenta e profunda quando cochila */}
      <motion.div
        animate={reduce ? undefined : sleepy ? { scale: [1, 1.025, 1] } : { scale: 1 }}
        transition={
          sleepy
            ? { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        <Panda look={reduce || sleepy ? undefined : look} item={item} sleepy={sleepy} />
      </motion.div>

      {/* Zzz do cochilo */}
      <AnimatePresence>
        {sleepy && !reduce && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 0], y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            style={{ position: "absolute", top: "4%", right: "16%", fontSize: 30 }}
          >
            💤
          </motion.span>
        )}
      </AnimatePresence>

      {/* easter egg: coraçõezinhos / pandas subindo */}
      <AnimatePresence>
        {hearts.map((id, i) => (
          <motion.span
            key={id}
            aria-hidden
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], x: (i - 3.5) * 24, y: -150 - (i % 4) * 28, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "42%",
              fontSize: 26,
              pointerEvents: "none",
            }}
          >
            {i % 2 ? "💛" : "🐼"}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
