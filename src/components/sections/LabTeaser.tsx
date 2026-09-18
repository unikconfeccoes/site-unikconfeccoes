import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Cta } from '@/components/primitives/Cta'
import { Eyebrow, Label, Prose } from '@/components/primitives/Typography'
import { LAB_PILLARS } from '@/data/lab'
import styles from './LabTeaser.module.css'

/**
 * UNIK LAB na home — a porta para a página do Lab. A sub-marca troca a voz:
 * o "Lab" entra na didone itálica, como a assinatura manuscrita do logo do
 * @uniklab_, sobre o "UNIK" pesado.
 */
export function LabTeaser() {
  return (
    <Section id="lab" atmosphere="noite" labelledBy="lab-title">
      <div className={`u-container ${styles.grid}`}>
        <div className={styles.text}>
          <Eyebrow index="07">Private label</Eyebrow>
          <h2 id="lab-title" className={styles.wordmark}>
            <span className={styles.unik}>UNIK</span>
            <span className={styles.lab}>Lab</span>
          </h2>
          <Prose size="xl">
            Para quem quer lançar a própria marca de roupa: tecido premium, modelagem exclusiva e estampa com
            assinatura. Você traz a ideia e a gente desenvolve até a peça-piloto.
          </Prose>
          <ul className={styles.pillars}>
            {LAB_PILLARS.map((p) => (
              <li key={p.id} className={styles.pillar}>
                <Label size="xs" numeric className={styles.pillarNum}>
                  {p.id}
                </Label>
                <span>{p.title}</span>
              </li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <Cta href="/lab" size="lg">
              Conhecer o Lab
            </Cta>
            <Cta href="/lab#ideia" variant="line" size="lg">
              Enviar minha ideia
            </Cta>
          </div>
        </div>

        <figure className={styles.figure}>
          <Media
            photoId="lab-serigrafia"
            garment="oversized"
            alt="Camisetas bege com estampa vermelha em serigrafia, produção UNIK Lab"
            sizes="(min-width: 1024px) 30vw, 90vw"
            parallax={10}
          />
          <figcaption>
            <Label size="xs" muted>
              @uniklab_ · serigrafia em malha bege
            </Label>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
