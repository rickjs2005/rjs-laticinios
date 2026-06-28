"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, BRAND } from "@/constants/data";
import { FlavorPicker } from "@/components/FlavorPicker/FlavorPicker";
import styles from "./Navbar.module.scss";

function LogoMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden xmlns="http://www.w3.org/2000/svg">
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
          <LogoMark />
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
          <a href="#contato" className={styles.cta}>
            Solicitar Orçamento
          </a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
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
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{
        position: "fixed",
        inset: "70px 14px auto 14px",
        background: "#fff",
        borderRadius: 24,
        padding: 18,
        boxShadow: "0 30px 60px -30px rgba(33,48,74,0.5)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {NAV.map((l) => (
        <a
          key={l.href}
          href={l.href}
          onClick={onClose}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 20,
            padding: "12px 10px",
            borderRadius: 14,
          }}
        >
          {l.label}
        </a>
      ))}
      <a
        href="#contato"
        onClick={onClose}
        style={{
          marginTop: 8,
          textAlign: "center",
          background: "#2e7df6",
          color: "#fff",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          padding: "14px",
          borderRadius: 999,
        }}
      >
        Solicitar Orçamento
      </a>
    </motion.div>
  );
}
