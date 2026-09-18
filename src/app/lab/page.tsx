import type { Metadata } from 'next'
import { Section } from '@/components/primitives/Section'
import { Media } from '@/components/primitives/Media'
import { Cta } from '@/components/primitives/Cta'
import { Display, Eyebrow, Label, Prose, Serif } from '@/components/primitives/Typography'
import { LabHero } from '@/components/lab/LabHero'
import { LabFabrics } from '@/components/lab/LabFabrics'
import { LabForm } from '@/components/lab/LabForm'
import { LAB_FABRICS, LAB_PILLARS, LAB_STEPS } from '@/data/lab'
import { SOCIAL, whatsappUrl } from '@/data/site'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'UNIK Lab: private label para marcas de roupa',
  description:
    'Crie sua marca de roupa com a UNIK: tecidos premium e técnicos, modelagem personalizada, serigrafia, DTF, bordado e alto relevo. Envie sua ideia e desenvolvemos até a peça-piloto.',
  alternates: { canonical: '/lab' },
}

/**
 * UNIK LAB — a página da sub-marca.
 *
 *  1. ABERTURA   UNIK pesado + "Lab." escrito por cima
 *  2. O QUE É    os quatro pilares do private label
 *  3. PROCESSO   ideia → desenvolvimento → piloto → produção
 *  4. TECIDOS    o mostruário técnico (planilha, aba 2)
 *  5. IDEIA      o formulário, que é o motivo de a página existir
 */
export default function LabPage() {
  return (
    <>
      <LabHero />

      {/* ------------------------------------------------------------ o que é */}
      <Section atmosphere="grafite" labelledBy="lab-oque">
        <div className={`u-container ${styles.what}`}>
          <div className={styles.whatText}>
            <Eyebrow index="01">O que é</Eyebrow>
            <Display id="lab-oque" size="2">
              Sua marca, <Serif>nossa</Serif> bancada
            </Display>
            <Prose size="lg" muted>
              Private label significa produzir roupas com a etiqueta da sua marca. O Lab cuida da parte técnica
              (tecido, molde, estampa e acabamento) e você cuida da marca e das vendas.
            </Prose>
            <Cta href={SOCIAL.instagramLab.url} external variant="line">
              {SOCIAL.instagramLab.handle}
            </Cta>
          </div>
          <ul className={styles.pillars}>
            {LAB_PILLARS.map((p) => (
              <li key={p.id} className={styles.pillar}>
                <Label size="xs" numeric className={styles.accent}>
                  {p.id}
                </Label>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ------------------------------------------------------------ processo */}
      <Section atmosphere="atelier" labelledBy="lab-processo">
        <div className="u-container">
          <header className={styles.head}>
            <Eyebrow index="02">Como funciona</Eyebrow>
            <Display id="lab-processo" size="2">
              Da ideia à <Serif>piloto</Serif>
            </Display>
          </header>
          <ol className={styles.steps}>
            {LAB_STEPS.map((s) => (
              <li key={s.id} className={styles.step}>
                <span className={styles.stepBar} aria-hidden="true" />
                <Label size="xs" numeric className={styles.accent}>
                  {s.id}
                </Label>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------------- tecidos */}
      <Section atmosphere="noite" id="tecidos" labelledBy="lab-tecidos">
        <div className={`u-container ${styles.fabrics}`}>
          <header className={styles.fabricsHead}>
            <Eyebrow index="03">Mostruário</Eyebrow>
            <Display id="lab-tecidos" size="2">
              {LAB_FABRICS.length} tecidos <Serif>técnicos</Serif>
            </Display>
            <Prose muted>
              Poliamidas e malhas de performance para camisetas, shorts, compressão, polos e camisas. Além delas, todas as
              malhas da linha de uniformes, como algodão pima, suedine, piquet e dry, também estão disponíveis para o Lab.
            </Prose>
            <figure className={styles.fabricsFigure}>
              <Media
                photoId="lab-serigrafia"
                garment="oversized"
                alt="Camisetas bege com estampa vermelha em serigrafia, produção UNIK Lab"
                sizes="20rem"
              />
            </figure>
          </header>
          <LabFabrics />
        </div>
      </Section>

      {/* --------------------------------------------------------------- ideia */}
      <Section atmosphere="atelier" id="ideia" labelledBy="lab-ideia">
        <div className={`u-container ${styles.idea}`}>
          <header className={styles.ideaHead}>
            <Eyebrow index="04">Envie sua ideia</Eyebrow>
            <Display id="lab-ideia" size="2">
              Conta pra <Serif>gente</Serif>
            </Display>
            <Prose muted>
              Quanto mais você contar, mais certeira é a primeira proposta. O envio abre o WhatsApp do Lab com o
              briefing organizado. Não precisa de cadastro e não gera compromisso.
            </Prose>
            <div className={styles.ideaAside}>
              <Label size="xs" muted>
                Prefere conversar direto?
              </Label>
              <Cta href={whatsappUrl('Olá! Quero criar minha marca com o UNIK Lab.')} external variant="line" icon="whatsapp">
                Chamar no WhatsApp
              </Cta>
            </div>
          </header>
          <LabForm />
        </div>
      </Section>
    </>
  )
}
