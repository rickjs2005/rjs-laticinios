"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, BRAND, waLink, CTA_COPY } from "@/constants/data";
import { FlavorPicker } from "@/components/FlavorPicker/FlavorPicker";
import { PandaLogo } from "@/components/panda/PandaLogo";
import styles from "./Navbar.module.scss";

const QUOTE_WA = waLink("Olá! Gostaria de solicitar um orçamento RJS Laticínios.");

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={`${styles.header} ${solid ? styles.solid : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.inner}>
        <a href="#top" className={styles.logo} aria-label={`${BRAND.name} — início`}>
          <PandaLogo title={BRAND.name} />
          RJS <b>Laticínios</b>
        </a>

        <nav className={styles.links} aria-label="Navegação principal">
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <FlavorPicker />
          <a
            href={QUOTE_WA}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            {CTA_COPY.quote}
          </a>
        </div>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC para fechar + focus-trap dentro do painel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        )
      );

    // foca o primeiro item ao abrir
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
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
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {NAV.map((l, i) => (
          <motion.a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className={styles.panelLink}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {l.label}
          </motion.a>
        ))}
        <motion.a
          href={QUOTE_WA}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={styles.panelCta}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06 + NAV.length * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {CTA_COPY.quote}
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
