"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./FlavorPicker.module.scss";

type Flavor = { id: string; name: string; emoji: string; dot: string };

const FLAVORS: Flavor[] = [
  { id: "leite", name: "Leite", emoji: "🥛", dot: "#2e7df6" },
  { id: "flocos", name: "Flocos", emoji: "🍫", dot: "linear-gradient(135deg,#fff 50%,#7a5234 50%)" },
  { id: "morango", name: "Morango", emoji: "🍓", dot: "#ff5d8f" },
  { id: "uva", name: "Uva", emoji: "🍇", dot: "#8b5cf6" },
  { id: "banana", name: "Banana", emoji: "🍌", dot: "#ffc220" },
  { id: "coco", name: "Coco", emoji: "🥥", dot: "linear-gradient(135deg,#fff 50%,#b98e5e 50%)" },
  { id: "salada", name: "Salada de frutas", emoji: "🥗", dot: "linear-gradient(120deg,#ff8a3d,#ffc220,#ff5d8f)" },
];

export function FlavorPicker() {
  const [open, setOpen] = useState(false);
  const [flavor, setFlavor] = useState("leite");
  const ref = useRef<HTMLDivElement>(null);

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
    </div>
  );
}
