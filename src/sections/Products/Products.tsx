"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { PRODUCTS, CATEGORIES, waLink, type Product } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AssetImage } from "@/components/media/AssetImage";
import styles from "./Products.module.scss";

// O 3D (three.js) só entra quando uma ficha abre — fora do bundle inicial.
const Product3D = dynamic(
  () => import("@/components/three/Product3D").then((m) => m.Product3D),
  { ssr: false, loading: () => <div className={styles.canvasLoading}><span /></div> },
);

// cor de acento (hex) por produto p/ os materiais 3D (tampas/rótulos)
const ACCENT_HEX: Record<Product["color"], string> = {
  blue: "#2e7df6",
  yellow: "#ffc828",
  green: "#3fbf6a",
  orange: "#ff8a3d",
};

const EMOJI: Record<string, string> = {
  "leite-integral": "🥛",
  "queijo-minas": "🧀",
  "manteiga-extra": "🧈",
  "iogurte-natural": "🍦",
  "requeijao-cremoso": "🫙",
  "doce-de-leite": "🍮",
};

// dimensões intrínsecas dos PNGs → next/image (WebP/srcset) + proporção correta
const DIMS: Record<string, { w: number; h: number }> = {
  "leite-integral": { w: 158, h: 439 },
  "queijo-minas": { w: 200, h: 141 },
  "manteiga-extra": { w: 208, h: 178 },
  "iogurte-natural": { w: 169, h: 196 },
  "requeijao-cremoso": { w: 143, h: 204 },
  "doce-de-leite": { w: 152, h: 207 },
};

/* ── Card com tilt 3D premium (segue o cursor) ─────────────────────── */
function ProductCard({
  p,
  i,
  onOpen,
}: {
  p: Product;
  i: number;
  onOpen: (p: Product) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    // desliga em reduced-motion ou ponteiro grosso (touch)
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(py * -9); // rotateX (inverte p/ seguir o cursor)
    ry.set(px * 11); // rotateY
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
      className={`${styles.card} ${styles[p.color]}`}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Ver ficha de ${p.name}`}
      onClick={() => onOpen(p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p);
        }
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.div className={styles.tilt} style={{ rotateX: srx, rotateY: sry }}>
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
              width={DIMS[p.id]?.w}
              height={DIMS[p.id]?.h}
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
      </motion.div>
    </motion.article>
  );
}

/* ── Modal de ficha do produto (acessível) ─────────────────────────── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // trava scroll do body
    dialogRef.current?.focus(); // foca o modal ao abrir

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        // focus-trap básico
        const f = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.(); // devolve o foco ao fechar
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="prod-modal-title"
        tabIndex={-1}
        className={`${styles.modal} ${styles[product.color]}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.95 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: reduce ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Fechar ficha">
          <FiX />
        </button>

        <div className={styles.modalMedia}>
          <span className={styles.modalGlow} aria-hidden />
          <Product3D kind={product.id} accent={ACCENT_HEX[product.color]} />
          <span className={styles.view3d} aria-hidden>
            ↻ arraste para girar
          </span>
        </div>

        <div className={styles.modalInfo}>
          <span className={styles.modalCat}>{product.category}</span>
          <h3 id="prod-modal-title">{product.name}</h3>
          <span className={styles.modalWeight}>{product.weight}</span>
          <p>{product.long}</p>

          <ul className={styles.tags}>
            {product.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <a
            className={styles.cta}
            href={waLink(`Olá! Tenho interesse no produto: ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp aria-hidden /> Pedir no WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Products() {
  const [cat, setCat] = useState<string>("Todos");
  const [active, setActive] = useState<Product | null>(null);
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
            <ProductCard key={p.id} p={p} i={i} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <ProductModal
            key={active.id}
            product={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
