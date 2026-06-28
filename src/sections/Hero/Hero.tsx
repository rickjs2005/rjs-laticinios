"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AssetImage } from "@/components/media/AssetImage";
import { InteractivePanda } from "@/components/panda/InteractivePanda";
import FarmBackground from "@/components/decor/FarmBackground";
import styles from "./Hero.module.scss";

type FloatDef = {
  src: string;
  alt: string;
  emoji: string;
  label: string;
  pos: CSSProperties;
  size: number;
  depth: number;
  delay: number;
  splash?: string;
  back?: boolean; // float de fundo (mais suave, parallax menor)
  w: number; // dimensão intrínseca (next/image + anti-CLS)
  h: number;
};

// Só assets que existem de verdade em /public/hero/ (sem placeholders quebrados).
// "back" = profundidade: opacidade menor + blur leve + parallax reduzido.
const FLOATS: FloatDef[] = [
  { src: "/hero/milk.png", alt: "Copo de leite", emoji: "🥛", label: "leite", pos: { top: "4%", left: "1%" }, size: 150, depth: 42, delay: 0, splash: "/hero/splash-milk.png", w: 158, h: 439 },
  { src: "/hero/yogurt.png", alt: "Iogurte", emoji: "🍦", label: "iogurte", pos: { top: "8%", right: "1%" }, size: 138, depth: 34, delay: 0.5, splash: "/hero/splash-yogurt.png", w: 169, h: 196 },
  { src: "/hero/cheese.png", alt: "Queijo", emoji: "🧀", label: "queijo", pos: { bottom: "10%", left: "-2%" }, size: 120, depth: 20, delay: 0.9, back: true, w: 200, h: 141 },
  { src: "/hero/butter.png", alt: "Manteiga", emoji: "🧈", label: "manteiga", pos: { bottom: "5%", right: "-1%" }, size: 112, depth: 18, delay: 0.3, back: true, w: 208, h: 178 },
];

// posições fixas das partículas (determinístico — sem hydration mismatch).
// Reduzidas a 6 e mais suaves p/ não competir com panda/CTA.
const PARTICLES = [
  { l: "10%", t: "22%", s: 6, d: 0 }, { l: "28%", t: "64%", s: 5, d: 1.4 },
  { l: "52%", t: "16%", s: 7, d: 0.8 }, { l: "70%", t: "58%", s: 5, d: 2.1 },
  { l: "84%", t: "30%", s: 6, d: 1.2 }, { l: "40%", t: "44%", s: 5, d: 1.7 },
];

function FloatItem({
  def,
  mx,
  my,
  reduce,
}: {
  def: FloatDef;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(mx, (v) => v * def.depth);
  const y = useTransform(my, (v) => v * def.depth);

  return (
    <motion.div
      className={`${styles.float} ${def.back ? styles.floatBack : ""}`}
      style={{ ...def.pos, x, y, "--fsize": `${def.size}px` } as unknown as CSSProperties}
    >
      <motion.div
        className={styles.floatInner}
        animate={reduce ? undefined : { y: [0, def.back ? -9 : -15, 0], rotate: [0, 4, -3, 0] }}
        transition={{ duration: 5 + def.delay, repeat: Infinity, ease: "easeInOut", delay: def.delay }}
      >
        {def.splash && (
          <AssetImage src={def.splash} alt="" className={styles.miniSplash} variant="free" emoji="" />
        )}
        <AssetImage
          src={def.src}
          alt={def.alt}
          className={styles.floatImg}
          variant="chip"
          emoji={def.emoji}
          label={def.label}
          width={def.w}
          height={def.h}
          eager
        />
      </motion.div>
    </motion.div>
  );
}

// CTA primário com efeito MAGNÉTICO — atrai levemente o cursor (spring).
function MagneticCta({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const x = useSpring(mvx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(mvy, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvx.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    mvy.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={styles.magnetic}
      style={reduce ? undefined : { x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <a href="#produtos" className={styles.primary}>
        Conheça nossos produtos →
      </a>
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 120, damping: 22 });
  const my = useSpring(rawY, { stiffness: 120, damping: 22 });

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // parallax do fundo (cena de fazenda) no scroll (profundidade)
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  // parallax do panda (leve, em sentido oposto = profundidade)
  const pandaX = useTransform(mx, (v) => v * -12);
  const pandaY = useTransform(my, (v) => v * -8);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    rawY.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  };

  return (
    <section id="top" ref={sectionRef} className={styles.hero} onMouseMove={onMove}>
      {/* FUNDO — cena de fazenda em camadas (céu, sol, nuvens, colinas, celeiro) */}
      <div ref={bgRef} className={styles.bg}>
        <FarmBackground />
        <div className={styles.bgTint} />
      </div>

      {/* scrim p/ contraste do texto (WCAG) — escurece o lado da copy */}
      <div className={styles.scrim} aria-hidden />

      {/* partículas / brilhos (suaves) */}
      <div className={styles.particles} aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}>🐼 Frescor que vem da fazenda</span>
          <h1>
            <span className={styles.line}>Sabor que</span>{" "}
            <span className={`${styles.line} ${styles.pop}`}>abraça!</span>
          </h1>
          <p>
            Leite, queijos, manteigas, iogurtes e doces com produção própria e
            aquele sabor de comida de vó — entregues em todo o Brasil.
          </p>
          <div className={styles.actions}>
            <MagneticCta reduce={reduce} />
            <a href="#quem-somos" className={styles.ghost}>
              Nossa história
            </a>
          </div>
        </motion.div>

        <div className={styles.stage}>
          {/* splash de leite atravessando atrás do panda */}
          <AssetImage src="/hero/splash-hero.png" alt="" className={styles.heroSplash} variant="free" emoji="" />

          {FLOATS.map((def) => (
            <FloatItem key={def.src} def={def} mx={mx} my={my} reduce={reduce} />
          ))}

          {/* PANDA — render 3D cinematográfico (~45% da tela) */}
          {/* parallax (MotionValue) e entrada (animate) ficam em divs separadas:
              animar `y` na mesma div que recebe um MotionValue de `y` gera conflito
              no framer-motion e trava o panda em opacity:0. */}
          <motion.div className={styles.pandaWrap} style={{ x: pandaX, y: pandaY }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 70 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -16, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* mascote vetorial unificado — olhos/cabeça seguem o cursor */}
                <InteractivePanda item="none" className={styles.pandaImg} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        Role
        <i />
      </div>
    </section>
  );
}
