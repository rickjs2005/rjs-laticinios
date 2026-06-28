"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiClock, FiUsers, FiBarChart2, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { RECIPES, waLink, type Recipe } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import styles from "./Recipes.module.scss";

/* ── Modal da receita completa (acessível) ─────────────────────────── */
function RecipeModal({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
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
        aria-labelledby="recipe-modal-title"
        tabIndex={-1}
        className={styles.modal}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.95 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: reduce ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Fechar receita">
          <FiX />
        </button>

        <div className={styles.modalMedia}>
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width:920px) 100vw, 440px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.modalInfo}>
          <h3 id="recipe-modal-title">{recipe.name}</h3>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <FiClock aria-hidden /> {recipe.time}
            </span>
            <span className={styles.metaItem}>
              <FiUsers aria-hidden /> {recipe.yield}
            </span>
            <span className={styles.metaItem}>
              <FiBarChart2 aria-hidden /> {recipe.difficulty}
            </span>
          </div>

          <h4 className={styles.blockTitle}>
            Ingredientes <em>frescos</em>
          </h4>
          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <h4 className={styles.blockTitle}>
            Modo de <em>preparo</em>
          </h4>
          <ol className={styles.steps}>
            {recipe.steps.map((s, i) => (
              <li key={i}>
                <span className={styles.stepNum} aria-hidden>
                  {i + 1}
                </span>
                <p>{s}</p>
              </li>
            ))}
          </ol>

          <a
            className={styles.cta}
            href={waLink(`Olá! Tenho uma dúvida sobre a receita "${recipe.name}".`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp aria-hidden /> Mandar dúvida no WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Recipes() {
  const [active, setActive] = useState<Recipe | null>(null);

  return (
    <section id="receitas" className={`section ${styles.section}`}>
      <SectionHeading
        eyebrow="👩‍🍳 Receita da semana"
        title="Cozinhe com a"
        accentWord="RJS"
        color="green"
        text="Receitas simples e gostosas para usar nossos produtos."
        center
      />
      <div className={styles.grid}>
        {RECIPES.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <article className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width:920px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className={styles.time}>
                  <FiClock /> {r.time}
                </span>
              </div>
              <div className={styles.body}>
                <h3>{r.name}</h3>
                <ul className={styles.chips}>
                  {r.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
                <button
                  className={styles.btn}
                  onClick={() => setActive(r)}
                  aria-haspopup="dialog"
                  aria-label={`Ver receita: ${r.name}`}
                >
                  Ver Receita →
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <RecipeModal key={active.name} recipe={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
