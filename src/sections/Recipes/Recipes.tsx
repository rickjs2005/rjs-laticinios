import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { RECIPES } from "@/constants/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import styles from "./Recipes.module.scss";

export function Recipes() {
  return (
    <section id="receitas" className={`section ${styles.section}`}>
      <SectionHeading
        eyebrow="👩‍🍳 Receita da semana"
        title="Cozinhe com a"
        accentWord="RJS"
        color="green"
        text="Receitas simples e gostosas para usar nossos produtos."
        center
      />
      <div className={styles.grid}>
        {RECIPES.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <article className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width:920px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className={styles.time}>
                  <FiClock /> {r.time}
                </span>
              </div>
              <div className={styles.body}>
                <h3>{r.name}</h3>
                <ul>
                  {r.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
                <button className={styles.btn}>Ver Receita →</button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
