import { Section } from '@/components/primitives/Section'
import { Cta } from '@/components/primitives/Cta'
import { Label } from '@/components/primitives/Typography'
import { WHATSAPP, whatsappUrl } from '@/data/site'
import styles from './CtaFinal.module.css'

const TAPE = ['Serigrafia', 'Bordado', 'DTF', 'Sublimação', 'Alto relevo', 'Polos', 'Dólmãs', 'Moletons', 'Dry fit', 'Aventais']

/**
 * A decisão. Única seção em bronze no site inteiro: quando a cor muda, o
 * visitante sabe que chegou a hora. A fita de técnicas corre por CSS (não por
 * scroll) porque aqui ela é textura, não conteúdo — e para sob reduced-motion.
 */
export function CtaFinal() {
  return (
    <Section atmosphere="bronze" bleed labelledBy="cta-title">
      <div className={styles.tape} aria-hidden="true">
        <div className={styles.tapeTrack}>
          {[...TAPE, ...TAPE].map((t, i) => (
            <span key={i} className={styles.tapeItem}>
              {t}
              <span className={styles.tapeBar} />
            </span>
          ))}
        </div>
      </div>

      <div className={`u-container ${styles.body}`}>
        <h2 id="cta-title" className={styles.title}>
          Vamos vestir a <em>sua marca?</em>
        </h2>
        <div className={styles.side}>
          <p className={styles.text}>
            Monte a lista com modelo, tecido, tamanhos e personalização. Com um clique ela chega organizada no nosso
            WhatsApp, e a resposta vem com valores e prazo para a sua empresa.
          </p>
          <div className={styles.ctas}>
            <Cta href="/catalogo" size="lg" icon="plus">
              Montar orçamento
            </Cta>
            <Cta href={whatsappUrl('Olá! Vim pelo site da UNIK e quero um orçamento de uniformes.')} external variant="line" size="lg" icon="whatsapp">
              WhatsApp
            </Cta>
          </div>
          <Label size="xs" muted>
            {WHATSAPP.display}
          </Label>
        </div>
      </div>
    </Section>
  )
}
