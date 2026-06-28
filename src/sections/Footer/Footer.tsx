"use client";

import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";
import { BRAND, NAV, CATEGORIES } from "@/constants/data";
import { MilkDivider } from "@/components/decor/MilkDivider";
import { PandaLogo } from "@/components/panda/PandaLogo";
import styles from "./Footer.module.scss";

export function Footer() {
  const [sent, setSent] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className={styles.footer}>
      <MilkDivider />
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <PandaLogo title={BRAND.name} />
            RJS <b>Laticínios</b>
          </div>
          <p>Frescor que vem da fazenda — desde {BRAND.since}, na mesa da família brasileira.</p>
          <div className={styles.social}>
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <nav className={styles.col}>
          <h4>Produtos</h4>
          {CATEGORIES.map((c) => (
            <a key={c} href="#produtos">{c}</a>
          ))}
        </nav>

        <nav className={styles.col}>
          <h4>Navegar</h4>
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className={`${styles.col} ${styles.news}`}>
          <h4>Contato</h4>
          <a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <span>{BRAND.address}</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {!sent ? (
              <>
                <input type="email" required placeholder="Seu e-mail" aria-label="Seu e-mail" />
                <button type="submit">Receber novidades</button>
              </>
            ) : null}
          </form>
          {sent && <p className={styles.ok}>✓ Pronto! Em breve novidades fresquinhas.</p>}
          <div className={styles.map}>
            <iframe
              src="https://maps.google.com/maps?q=Governador%20Valadares%20MG&z=12&output=embed"
              title="Mapa — Governador Valadares, MG"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className={styles.tag}>📍 Governador Valadares, MG</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.row}>
          <span>© {year} {BRAND.name}. Projeto fictício de portfólio.</span>
          <span>Feito com 🐼 e muito queijo.</span>
        </div>
      </div>
    </footer>
  );
}
