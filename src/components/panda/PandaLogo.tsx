/**
 * Marca-símbolo do mascote — versão simplificada e consistente do <Panda> vetorial
 * (mesmas proporções de rosto, manchas dos olhos, focinho e paleta). Fonte única
 * do logo, usada na Navbar, no Footer e na Intro.
 */
export function PandaLogo({
  className,
  title = "RJS Laticínios",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* orelhas */}
      <circle cx="12" cy="11" r="7" fill="#232a36" />
      <circle cx="36" cy="11" r="7" fill="#232a36" />
      <circle cx="12" cy="11" r="3.2" fill="#454f5e" />
      <circle cx="36" cy="11" r="3.2" fill="#454f5e" />
      {/* rosto */}
      <circle cx="24" cy="25" r="17" fill="#fff" stroke="#232a36" strokeWidth="1.5" />
      {/* manchas dos olhos (elipses giradas, como no Panda) */}
      <ellipse cx="17.6" cy="24" rx="5" ry="6.4" fill="#232a36" transform="rotate(-16 17.6 24)" />
      <ellipse cx="30.4" cy="24" rx="5" ry="6.4" fill="#232a36" transform="rotate(16 30.4 24)" />
      {/* olhos */}
      <circle cx="19" cy="25" r="2.4" fill="#fff" />
      <circle cx="29" cy="25" r="2.4" fill="#fff" />
      <circle cx="19" cy="25.4" r="1.3" fill="#232a36" />
      <circle cx="29" cy="25.4" r="1.3" fill="#232a36" />
      {/* focinho + sorriso */}
      <ellipse cx="24" cy="30" rx="2.4" ry="1.6" fill="#3a4150" />
      <path
        d="M24 31.6 C24 34 21.6 35 20 33.8 M24 31.6 C24 34 26.4 35 28 33.8"
        stroke="#3a4150"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
