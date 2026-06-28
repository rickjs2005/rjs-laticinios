import type { CSSProperties } from "react";

export type PandaItem =
  | "none"
  | "milk"
  | "cheese"
  | "butter"
  | "yogurt"
  | "cart"
  | "sign";

const BLACK = "#232a36";
const NOSE = "#3a4150";

type Props = {
  /** direção do olhar (-1..1) — para o panda interativo */
  look?: { x: number; y: number };
  item?: PandaItem;
  signText?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function Panda({
  look,
  item = "none",
  signText = "Vamos crescer juntos?",
  className,
  style,
  title = "Mascote RJS",
}: Props) {
  const hx = look ? look.x * 6 : 0;
  const hy = look ? look.y * 5 : 0;
  const px = look ? look.x * 5 : 0;
  const py = look ? look.y * 4 : 0;

  return (
    <svg
      viewBox="0 0 320 360"
      className={className}
      style={style}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* volume do pelo branco (esfera iluminada do alto-esquerda) */}
        <radialGradient id="furW" cx="0.4" cy="0.32" r="0.78">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="68%" stopColor="#fbfcff" />
          <stop offset="100%" stopColor="#e4ecf6" />
        </radialGradient>
        {/* volume do pelo preto */}
        <radialGradient id="furB" cx="0.38" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#3a4350" />
          <stop offset="100%" stopColor="#1e2530" />
        </radialGradient>
        {/* brilho dos olhos */}
        <radialGradient id="eyeG" cx="0.4" cy="0.34" r="0.72">
          <stop offset="0%" stopColor="#4a5466" />
          <stop offset="58%" stopColor="#232a36" />
          <stop offset="100%" stopColor="#161b24" />
        </radialGradient>
        {/* blush suave */}
        <radialGradient id="cheekG" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffb0c0" />
          <stop offset="100%" stopColor="#ff97aa" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sombra de chão */}
      <ellipse cx="160" cy="342" rx="92" ry="14" fill="rgba(33,48,74,0.12)" />

      {/* ── pernas / pés ── */}
      <ellipse cx="120" cy="322" rx="30" ry="22" fill="url(#furB)" />
      <ellipse cx="200" cy="322" rx="30" ry="22" fill="url(#furB)" />
      <ellipse cx="120" cy="320" rx="14" ry="9" fill="#454f5e" />
      <ellipse cx="200" cy="320" rx="14" ry="9" fill="#454f5e" />

      {/* ── corpo (barriga branca) ── */}
      <path
        d="M160 188 C212 188 236 224 236 268 C236 312 206 330 160 330 C114 330 84 312 84 268 C84 224 108 188 160 188 Z"
        fill="url(#furW)"
      />
      {/* costas/ombros pretos */}
      <path
        d="M160 196 C120 196 96 220 92 252 C112 236 140 230 160 230 C180 230 208 236 228 252 C224 220 200 196 160 196 Z"
        fill="url(#furB)"
      />

      {/* ── braços (vão segurar o item) ── */}
      <Arms item={item} />

      {/* item segurado atrás dos braços frontais quando aplicável */}
      <HeldItem item={item} signText={signText} />

      {/* ── cabeça ── */}
      <g transform={`translate(${hx} ${hy})`}>
        {/* sombra de contato do queixo (separa cabeça do corpo) */}
        <ellipse cx="160" cy="214" rx="74" ry="20" fill="rgba(33,48,74,0.10)" />

        {/* orelhas */}
        <circle cx="96" cy="64" r="30" fill="url(#furB)" />
        <circle cx="224" cy="64" r="30" fill="url(#furB)" />
        <circle cx="96" cy="64" r="14" fill="#454f5e" />
        <circle cx="224" cy="64" r="14" fill="#454f5e" />

        {/* rosto */}
        <circle cx="160" cy="132" r="92" fill="url(#furW)" />
        {/* luz de borda (rim light) no alto-esquerda */}
        <path
          d="M96 96 A92 92 0 0 1 168 42"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* manchas dos olhos */}
        <ellipse cx="124" cy="128" rx="26" ry="32" fill={BLACK} transform="rotate(-16 124 128)" />
        <ellipse cx="196" cy="128" rx="26" ry="32" fill={BLACK} transform="rotate(16 196 128)" />

        {/* bochechas */}
        <circle cx="95" cy="160" r="17" fill="url(#cheekG)" />
        <circle cx="225" cy="160" r="17" fill="url(#cheekG)" />

        {/* olhos — grandes e brilhantes */}
        <circle cx="128" cy="134" r="18" fill="#fff" />
        <circle cx="192" cy="134" r="18" fill="#fff" />
        <g transform={`translate(${px} ${py})`}>
          <circle cx="130" cy="136" r="11" fill="url(#eyeG)" />
          <circle cx="190" cy="136" r="11" fill="url(#eyeG)" />
          {/* catchlight grande */}
          <circle cx="134" cy="131" r="4.2" fill="#fff" />
          <circle cx="194" cy="131" r="4.2" fill="#fff" />
          {/* reflexo inferior */}
          <circle cx="126" cy="140" r="2" fill="#fff" opacity="0.7" />
          <circle cx="186" cy="140" r="2" fill="#fff" opacity="0.7" />
        </g>

        {/* nariz glossy */}
        <ellipse cx="160" cy="162" rx="13" ry="9" fill={NOSE} />
        <ellipse cx="156" cy="159" rx="4.5" ry="2.6" fill="#fff" opacity="0.55" />
        {/* boca sorridente */}
        <path
          d="M160 171 C160 182 150 188 142 184 M160 171 C160 182 170 188 178 184"
          fill="none"
          stroke={NOSE}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function Arms({ item }: { item: PandaItem }) {
  // braços para frente quando segura algo; relaxados quando "none"
  const holding = item !== "none";
  if (holding) {
    return (
      <>
        <path d="M96 232 C80 250 86 286 112 292 L132 264 Z" fill="url(#furB)" />
        <path d="M224 232 C240 250 234 286 208 292 L188 264 Z" fill="url(#furB)" />
        <circle cx="118" cy="284" r="16" fill="url(#furB)" />
        <circle cx="202" cy="284" r="16" fill="url(#furB)" />
      </>
    );
  }
  return (
    <>
      <path d="M96 230 C74 246 70 286 92 300 C104 282 110 256 116 240 Z" fill="url(#furB)" />
      <path d="M224 230 C246 246 250 286 228 300 C216 282 210 256 204 240 Z" fill="url(#furB)" />
    </>
  );
}

function HeldItem({ item, signText }: { item: PandaItem; signText: string }) {
  switch (item) {
    case "milk":
      return (
        <g>
          <path d="M142 244 h36 v44 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 Z" fill="#fff" stroke="#cfe0ff" strokeWidth="2" />
          <path d="M142 244 l8 -14 h20 l8 14 Z" fill="#2e7df6" />
          <rect x="148" y="262" width="24" height="18" rx="3" fill="#2e7df6" />
        </g>
      );
    case "cheese":
      return (
        <g>
          <path d="M138 292 L182 292 L182 262 Z" fill="#ffc828" stroke="#e6ad12" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="160" cy="280" r="3" fill="#fff" />
          <circle cx="170" cy="284" r="2.5" fill="#fff" />
          <circle cx="152" cy="286" r="2" fill="#fff" />
        </g>
      );
    case "butter":
      return (
        <g>
          <rect x="138" y="262" width="44" height="28" rx="5" fill="#ffe07a" stroke="#e6ad12" strokeWidth="2" />
          <rect x="138" y="262" width="44" height="10" rx="5" fill="#fff3cc" />
        </g>
      );
    case "yogurt":
      return (
        <g>
          <path d="M140 262 h40 l-4 32 a6 6 0 0 1 -6 5 h-20 a6 6 0 0 1 -6 -5 Z" fill="#fff" stroke="#e2f7e8" strokeWidth="2" />
          <rect x="138" y="256" width="44" height="9" rx="4" fill="#3fbf6a" />
        </g>
      );
    case "cart":
      return (
        <g stroke="#2e7df6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M132 250 h10 l8 34 h34 l8 -22 h-46" />
          <circle cx="152" cy="296" r="6" fill="#2e7df6" />
          <circle cx="182" cy="296" r="6" fill="#2e7df6" />
        </g>
      );
    case "sign":
      return (
        <g>
          <rect x="78" y="236" width="164" height="74" rx="14" fill="#fff" stroke="#ffc828" strokeWidth="6" />
          <text
            x="160"
            y="268"
            textAnchor="middle"
            fontFamily="var(--font-display), sans-serif"
            fontWeight="700"
            fontSize="17"
            fill="#21304a"
          >
            {signText.length > 18 ? "Vamos crescer" : signText}
          </text>
          <text
            x="160"
            y="292"
            textAnchor="middle"
            fontFamily="var(--font-display), sans-serif"
            fontWeight="700"
            fontSize="17"
            fill="#2e7df6"
          >
            juntos?
          </text>
        </g>
      );
    default:
      return null;
  }
}
