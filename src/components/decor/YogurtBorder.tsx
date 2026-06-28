"use client";

import { useEffect, useState } from "react";
import styles from "./YogurtBorder.module.scss";

/**
 * Borda de IOGURTE DERRAMADO — não "gotas".
 * A massa é uma lâmina cremosa contínua que escorre da borda da tela formando
 * LÓBULOS LARGOS e LÍNGUAS amplas (como creme/leite condensado escorrendo numa
 * superfície), com aresta inferior arredondada e brilhante (tensão superficial),
 * volume (gradiente + SSS + brilho especular) e ondulação viscosa muito lenta.
 */

const W = 1200;
const VH = 190;
const TOP = -4; // sangra pra fora pra não mostrar costura
const BASE = 60; // espessura mínima da lâmina

// âncoras da aresta inferior — espaçamento largo, profundidades variadas.
// As línguas profundas são LARGAS (vizinhas também fundas) → lóbulo amplo, não bico.
type A = { x: number; d: number };
const ANCHORS: A[] = [
  { x: 0, d: 10 },
  { x: 78, d: 40 },
  { x: 156, d: 72 },
  { x: 234, d: 50 },
  { x: 312, d: 30 },
  { x: 392, d: 66 },
  { x: 470, d: 104 }, // língua larga
  { x: 548, d: 74 },
  { x: 626, d: 40 },
  { x: 706, d: 70 },
  { x: 786, d: 116 }, // língua larga e funda
  { x: 864, d: 80 },
  { x: 942, d: 44 },
  { x: 1020, d: 72 },
  { x: 1098, d: 98 }, // língua larga
  { x: 1158, d: 56 },
  { x: 1200, d: 18 },
];

// ondulação viscosa lenta: cada âncora respira com fase própria, amplitude pequena
function depth(i: number, ph: number) {
  const a = 3 + (i % 4); // 3–6px
  return ANCHORS[i].d + Math.sin(ph * Math.PI * 2 + i * 0.9) * a;
}

// Catmull-Rom → cubic bézier (aresta inferior suave e orgânica)
function catmull(pts: { x: number; y: number }[]) {
  let s = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    s += `C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return s;
}

function edgePoints(ph: number) {
  return ANCHORS.map((a, i) => ({ x: a.x, y: BASE + depth(i, ph) }));
}

// preenchimento da lâmina (fechado): topo reto + aresta inferior curva
function buildBody(ph: number) {
  const pts = edgePoints(ph);
  return `M0 ${TOP} L0 ${pts[0].y.toFixed(2)} ${catmull(pts)} L${W} ${TOP} Z`;
}

// só a aresta inferior (linha) — pra rim-light / brilho do "bead"
function buildEdge(ph: number) {
  const pts = edgePoints(ph);
  return `M0 ${pts[0].y.toFixed(2)} ${catmull(pts)}`;
}

const PHASES = [0, 0.25, 0.5, 0.75];
const BODY_MORPH = [...PHASES, 0].map(buildBody).join(";");
const EDGE_MORPH = [...PHASES, 0].map(buildEdge).join(";");
const KEYTIMES = "0;0.25;0.5;0.75;1";
const SPL = ["0.45 0 0.55 1", "0.45 0 0.55 1", "0.45 0 0.55 1", "0.45 0 0.55 1"].join(";");
const BODY0 = buildBody(0);
const EDGE0 = buildEdge(0);

// microbolhas presas na superfície (surgem e somem bem devagar)
const BUBBLES = [
  { x: 120, y: 22, r: 3.4, dur: 11, delay: 0 },
  { x: 300, y: 30, r: 2.2, dur: 13, delay: 3 },
  { x: 470, y: 40, r: 4.2, dur: 12, delay: 1.5 },
  { x: 700, y: 30, r: 2.8, dur: 14, delay: 4.5 },
  { x: 786, y: 52, r: 3.6, dur: 12.5, delay: 2 },
  { x: 1020, y: 34, r: 2.4, dur: 13.5, delay: 0.8 },
  { x: 1098, y: 46, r: 3.2, dur: 11.5, delay: 3.6 },
];

export default function YogurtBorder({
  position = "top",
}: {
  position?: "top" | "bottom";
}) {
  const uid = position;
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAnim(false);
  }, []);

  const morph = (values: string) =>
    anim ? (
      <animate
        attributeName="d"
        dur="16s"
        repeatCount="indefinite"
        calcMode="spline"
        values={values}
        keyTimes={KEYTIMES}
        keySplines={SPL}
      />
    ) : null;

  return (
    <div className={`${styles.frame} ${styles[position]}`} aria-hidden>
      <svg viewBox={`0 0 ${W} ${VH}`} preserveAspectRatio="none">
        <defs>
          {/* corpo: branco no topo → creme quente embaixo (iogurte grego / leite condensado) */}
          <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fffdf8" />
            <stop offset="72%" stopColor="#f6ead2" />
            <stop offset="100%" stopColor="#ead9b6" />
          </linearGradient>
          {/* subsurface scattering: glow quente translúcido na barriga das línguas */}
          <linearGradient id={`sss-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="45%" stopColor="#ffe6b0" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffcf7d" stopOpacity="0.55" />
          </linearGradient>
          {/* brilho especular do topo (lâmina molhada) */}
          <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* sombra interna sob o lábio superior → dá volume/espessura */}
          <linearGradient id={`lip-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2c10" stopOpacity="0.18" />
            <stop offset="26%" stopColor="#3a2c10" stopOpacity="0" />
          </linearGradient>
          {/* camada de fundo (espessura): creme um tom mais escuro, levemente deslocada */}
          <linearGradient id={`back-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0e3c6" />
            <stop offset="100%" stopColor="#dcc596" />
          </linearGradient>
          <filter id={`soft-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id={`hair-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
          <clipPath id={`clip-${uid}`}>
            <path d={BODY0}>{morph(BODY_MORPH)}</path>
          </clipPath>
        </defs>

        {/* camada de fundo (espessura 3D) — levemente abaixo e mais escura */}
        <g transform="translate(6 9)">
          <path d={BODY0} fill={`url(#back-${uid})`} opacity="0.85">
            {morph(BODY_MORPH)}
          </path>
        </g>

        {/* ── lâmina principal de iogurte ── */}
        <path d={BODY0} fill={`url(#body-${uid})`}>{morph(BODY_MORPH)}</path>

        {/* tudo abaixo recortado na silhueta da lâmina */}
        <g clipPath={`url(#clip-${uid})`}>
          {/* SSS quente na barriga das línguas */}
          <rect x="0" y="0" width={W} height={VH} fill={`url(#sss-${uid})`} />
          {/* sombra interna do lábio + brilho molhado do topo */}
          <rect x="0" y="0" width={W} height={BASE} fill={`url(#lip-${uid})`} />
          <rect x="0" y="0" width={W} height={BASE * 0.62} fill={`url(#sheen-${uid})`} />

          {/* reflexos especulares que viajam lentamente pela superfície molhada */}
          <ellipse cx="0" cy={BASE * 0.4} rx="200" ry="16" fill="#ffffff" opacity="0.42" filter={`url(#soft-${uid})`}>
            {anim && <animateTransform attributeName="transform" type="translate" from="-260 0" to="1500 0" dur="15s" repeatCount="indefinite" />}
          </ellipse>
          <ellipse cx="0" cy={BASE * 0.52} rx="120" ry="11" fill="#ffffff" opacity="0.3" filter={`url(#soft-${uid})`}>
            {anim && <animateTransform attributeName="transform" type="translate" from="-560 0" to="1820 0" dur="23s" repeatCount="indefinite" />}
          </ellipse>

          {/* microbolhas */}
          {BUBBLES.map((b) => (
            <circle key={b.x} cx={b.x} cy={b.y} r={b.r} fill="#ffffff" opacity="0">
              {anim && <animate attributeName="opacity" values="0;0.5;0.5;0" dur={`${b.dur}s`} begin={`${b.delay}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </g>

        {/* rim-light do "bead": aresta inferior molhada e brilhante (volume) */}
        <path d={EDGE0} fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" opacity="0.7" filter={`url(#hair-${uid})`}>
          {morph(EDGE_MORPH)}
        </path>
        {/* fio de sombra logo acima do bead → arredonda a aresta */}
        <path d={EDGE0} fill="none" stroke="#caa86a" strokeWidth="2" strokeLinecap="round" opacity="0.35" filter={`url(#hair-${uid})`} transform="translate(0 -5)">
          {morph(EDGE_MORPH)}
        </path>
      </svg>
    </div>
  );
}
