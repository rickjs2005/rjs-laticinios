"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { BRAND, waLink } from "@/constants/data";
import styles from "./StickyWhats.module.scss";

/** CTA de conversão fixo — aparece após o primeiro scroll. Único caminho de
 *  ação que funciona sem backend. Some quando o footer/#contato entra na tela. */
export function StickyWhats() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      const contato = document.getElementById("contato");
      const nearFooter = contato
        ? contato.getBoundingClientRect().top < window.innerHeight
        : false;
      setShow(past && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink("Olá! Vim pelo site e quero saber mais sobre os produtos RJS.")}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fab}
          aria-label={`Falar com a ${BRAND.name} no WhatsApp`}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp />
          <span className={styles.label}>Fale conosco</span>
          <span className={styles.ping} aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
