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
};

// Cada item = um render 3D transparente solto em /public/hero/.
const FLOATS: FloatDef[] = [
  { src: "/hero/milk.png", alt: "Copo de leite", emoji: "🥛", label: "leite", pos: { top: "2%", left: "0%" }, size: 150, depth: 40, delay: 0, splash: "/hero/splash-milk.png" },
  { src: "/hero/yogurt.png", alt: "Iogurte", emoji: "🍦", label: "iogurte", pos: { top: "6%", right: "2%" }, size: 140, depth: 30, delay: 0.5, splash: "/hero/splash-yogurt.png" },
  { src: "/hero/cheese.png", alt: "Queijo", emoji: "🧀", label: "queijo", pos: { top: "46%", left: "-4%" }, size: 130, depth: 34, delay: 0.9 },
  { src: "/hero/butter.png", alt: "Manteiga", emoji: "🧈", label: "manteiga", pos: { top: "42%", right: "-3%" }, size: 124, depth: 24, delay: 0.3 },
  { src: "/hero/strawberry.png", alt: "Morango", emoji: "🍓", label: "morango", pos: { bottom: "10%", left: "6%" }, size: 92, depth: 46, delay: 0.7 },
  { src: "/hero/blueberry.png", alt: "Mirtilos", emoji: "🫐", label: "mirtilo", pos: { bottom: "4%", right: "10%" }, size: 78, depth: 52, delay: 1.1 },
  { src: "/hero/leaf.png", alt: "Folha", emoji: "🍃", label: "folha", pos: { top: "24%", right: "20%" }, size: 64, depth: 60, delay: 0.2 },
];

// posições fixas das partículas (determinístico — sem hydration mismatch)
const PARTICLES = [
  { l: "8%", t: "20%", s: 7, d: 0 }, { l: "18%", t: "62%", s: 5, d: 1.4 },
  { l: "30%", t: "30%", s: 9, d: 0.6 }, { l: "44%", t: "72%", s: 6, d: 2.1 },
  { l: "56%", t: "18%", s: 8, d: 1.1 }, { l: "66%", t: "54%", s: 5, d: 0.3 },
  { l: "74%", t: "28%", s: 10, d: 1.8 }, { l: "84%", t: "66%", s: 6, d: 0.9 },
  { l: "92%", t: "38%", s: 7, d: 2.4 }, { l: "38%", t: "48%", s: 5, d: 1.6 },
  { l: "12%", t: "44%", s: 6, d: 0.5 }, { l: "62%", t: "78%", s: 8, d: 2.0 },
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
      className={styles.float}
      style={{ ...def.pos, width: def.size, x, y }}
    >
      <motion.div
        className={styles.floatInner}
        animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 4, -3, 0] }}
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
        />
      </motion.div>
    </motion.div>
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

  // parallax do fundo no scroll (profundidade)
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
      {/* FUNDO — foto de fazenda (depth of field, luz dourada) */}
      <div ref={bgRef} className={styles.bg}>
        <AssetImage
          src="/hero/farm.jpg"
          alt="Fazenda ao amanhecer"
          className={styles.farmPhoto}
          variant="photo"
          emoji="🌄"
          label="foto da fazenda (farm.jpg)"
        />
        <div className={styles.bgTint} />
      </div>

      {/* partículas / brilhos */}
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
            <a href="#produtos" className={styles.primary}>
              Conheça nossos produtos →
            </a>
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
                <AssetImage
                  src="/hero/panda.png"
                  alt="Mascote panda RJS"
                  className={styles.pandaImg}
                  variant="free"
                  emoji="🐼"
                  label="render do panda 3D (panda.png)"
                />
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
