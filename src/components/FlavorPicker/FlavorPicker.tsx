"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./FlavorPicker.module.scss";

type Flavor = { id: string; name: string; emoji: string; dot: string; wipe: string };

// `wipe` = cor sólida da onda de tinta ao trocar de sabor (= valor de --flavor)
const FLAVORS: Flavor[] = [
  { id: "leite", name: "Leite", emoji: "🥛", dot: "#2e7df6", wipe: "#2e7df6" },
  { id: "flocos", name: "Flocos", emoji: "🍫", dot: "linear-gradient(135deg,#fff 50%,#7a5234 50%)", wipe: "#7a5234" },
  { id: "morango", name: "Morango", emoji: "🍓", dot: "#ff5d8f", wipe: "#ff5d8f" },
  { id: "uva", name: "Uva", emoji: "🍇", dot: "#8b5cf6", wipe: "#8b5cf6" },
  { id: "banana", name: "Banana", emoji: "🍌", dot: "#ffc220", wipe: "#ffc220" },
  { id: "coco", name: "Coco", emoji: "🥥", dot: "linear-gradient(135deg,#fff 50%,#b98e5e 50%)", wipe: "#b98e5e" },
  { id: "salada", name: "Salada de frutas", emoji: "🥗", dot: "linear-gradient(120deg,#ff8a3d,#ffc220,#ff5d8f)", wipe: "#ff8a3d" },
];

type Wipe = { x: number; y: number; color: string; id: number };

export function FlavorPicker() {
  const [open, setOpen] = useState(false);
  const [flavor, setFlavor] = useState("leite");
  const [wipe, setWipe] = useState<Wipe | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setFlavor(document.documentElement.getAttribute("data-flavor") || "leite");
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const pick = (id: string) => {
    if (id === flavor) {
      setOpen(false);
      return;
    }
    // onda de tinta a partir do botão (delight ao trocar o tema)
    if (!reduce) {
      const f = FLAVORS.find((x) => x.id === id);
      const r = ref.current?.getBoundingClientRect();
      if (f && r) {
        setWipe({ x: r.left + r.width / 2, y: r.top + r.height / 2, color: f.wipe, id: Date.now() });
      }
    }
    setFlavor(id);
    if (id === "leite") document.documentElement.removeAttribute("data-flavor");
    else document.documentElement.setAttribute("data-flavor", id);
    try {
      localStorage.setItem("rjs-flavor", id);
    } catch {}
    setOpen(false);
  };

  const current = FLAVORS.find((f) => f.id === flavor) ?? FLAVORS[0];

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Sabor atual: ${current.name}. Escolher sabor.`}
      >
        <span className={styles.dot} style={{ background: current.dot }} />
        Sabor
        <span className={styles.chev}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.menu}
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <p className={styles.title}>🍦 Escolha seu sabor</p>
            {FLAVORS.map((f) => (
              <button
                key={f.id}
                role="menuitemradio"
                aria-checked={flavor === f.id}
                className={`${styles.opt} ${flavor === f.id ? styles.active : ""}`}
                onClick={() => pick(f.id)}
              >
                <span className={styles.swatch} style={{ background: f.dot }} />
                {f.name}
                {flavor === f.id ? (
                  <span className={styles.check}>✓</span>
                ) : (
                  <span className={styles.emoji}>{f.emoji}</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* onda de tinta full-screen ao trocar de sabor */}
      <AnimatePresence>
        {wipe && (
          <motion.span
            key={wipe.id}
            aria-hidden
            className={styles.wipe}
            style={{ left: wipe.x, top: wipe.y, background: wipe.color }}
            initial={{ scale: 0, opacity: 0.92 }}
            animate={{ scale: 1, opacity: [0.92, 0.92, 0] }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
            onAnimationComplete={() => setWipe(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
