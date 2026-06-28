"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AssetImage } from "@/components/media/AssetImage";
import styles from "./Products.module.scss";

const EMOJI: Record<string, string> = {
  "leite-integral": "🥛",
  "queijo-minas": "🧀",
  "manteiga-extra": "🧈",
  "iogurte-natural": "🍦",
  "requeijao-cremoso": "🫙",
  "doce-de-leite": "🍮",
};

export function Products() {
  const [cat, setCat] = useState<string>("Todos");
  const filtered = useMemo(
    () => (cat === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <section id="produtos" className={`section ${styles.section}`}>
      <SectionHeading
        eyebrow="🧀 Nosso catálogo"
        title="Produtos"
        accentWord="fresquinhos"
        color="orange"
        text="Da fazenda para a sua mesa — escolha por categoria."
        center
      />

      <div className={styles.filters}>
        {["Todos", ...CATEGORIES].map((c) => (
          <button
            key={c}
            className={`${styles.chip} ${cat === c ? styles.active : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className={`${styles.card} ${styles[p.color]}`}
            >
              <div className={styles.stage}>
                {/* splash do produto (some sozinho se faltar) */}
                <AssetImage
                  src={`/products/splash-${p.color}.png`}
                  alt=""
                  className={styles.splash}
                  variant="free"
                  emoji=""
                />
                <span className={styles.glow} aria-hidden />
                {/* render gigante flutuando */}
                <div className={styles.floatY} style={{ animationDelay: `${(i % 3) * 0.5}s` }}>
                  <AssetImage
                    src={`/products/${p.id}.png`}
                    alt={p.name}
                    className={styles.render}
                    variant="chip"
                    emoji={EMOJI[p.id] ?? "🧺"}
                    label="render"
                  />
                </div>
                <span className={styles.shadow} aria-hidden />
                <span className={styles.cat}>{p.category}</span>
              </div>

              <div className={styles.body}>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className={styles.foot}>
                  <span className={styles.weight}>{p.weight}</span>
                  <span className={styles.add} aria-hidden>
                    +
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
