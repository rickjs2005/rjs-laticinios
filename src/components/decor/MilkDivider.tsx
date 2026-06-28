import styles from "./MilkDivider.module.scss";

/**
 * Transição de "leite escorrendo" entre seções — uma lâmina cremosa com a borda
 * inferior pingando, mais algumas gotas soltas. Brilha em fronteiras claro→escuro
 * (ex.: topo do Stats/Footer navy): parece leite derramando na seção de baixo.
 * Posiciona-se absoluto no topo da seção-mãe (que deve ser position:relative).
 */
export function MilkDivider({
  color = "#fffbf2",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`} aria-hidden>
      <svg viewBox="0 0 1200 140" preserveAspectRatio="none" className={styles.svg}>
        <path
          fill={color}
          d="M0 0 H1200 V60
             C1140 60 1150 72 1095 72
             C1040 72 1060 116 1010 116
             C968 116 986 64 930 64
             C862 64 882 92 815 92
             C758 92 770 62 705 62
             C638 62 660 124 600 124
             C543 124 560 70 500 70
             C438 70 456 98 390 98
             C328 98 346 62 285 62
             C223 62 242 110 180 110
             C128 110 140 66 80 66
             C42 66 30 60 0 60 Z"
        />
        {/* gotas soltas que pingaram na seção de baixo */}
        <circle className={styles.drop} cx="600" cy="134" r="5" fill={color} />
        <circle className={styles.drop} cx="1010" cy="128" r="3.4" fill={color} />
        <circle className={styles.drop} cx="180" cy="124" r="3" fill={color} />
      </svg>
    </div>
  );
}
