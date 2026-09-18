import { Section } from '@/components/primitives/Section'
import { Cta } from '@/components/primitives/Cta'
import { Display, Eyebrow, Prose, Serif } from '@/components/primitives/Typography'
import { ATACADO_MIN, COMMERCIAL, PEDIDO_MINIMO, whatsappUrl } from '@/data/site'
import { ROUTES } from '@/data/seo/routes'
import styles from './ParaEmpresas.module.css'

const TERMS = [
  { value: `${PEDIDO_MINIMO.total}`, unit: 'peças', title: 'Pedido mínimo', text: `Dá para combinar ${PEDIDO_MINIMO.produtos} produtos, com pelo menos ${PEDIDO_MINIMO.porProduto} peças iguais de cada.` },
  { value: `${ATACADO_MIN}+`, unit: 'peças', title: 'Preço de atacado', text: 'A partir de 60 peças do mesmo modelo, somando todos os tamanhos.' },
  { value: '50%', unit: 'entrada', title: 'Pagamento', text: 'Metade do valor total de entrada e o restante no ato da entrega.' },
  { value: '1:1', unit: 'reunião', title: 'Atendimento presencial', text: 'Recebemos a sua equipe para ver tecidos e peças de perto e tirar todas as dúvidas.' },
] as const

/**
 * PARA EMPRESAS — deixa explícito, logo no início da home, que a UNIK é B2B.
 * As quatro regras comerciais em números grandes: é o que o comprador de uma
 * empresa procura antes de pedir orçamento.
 */
export function ParaEmpresas() {
  return (
    <Section id="empresas" atmosphere="noite" labelledBy="empresas-title">
      <div className={`u-container ${styles.grid}`}>
        <header className={styles.head}>
          <Eyebrow>Para empresas</Eyebrow>
          <Display id="empresas-title" size="2">
            Feito para quem uniformiza <Serif>equipes</Serif>
          </Display>
          <Prose size="lg" muted>
            {COMMERCIAL.especialidade} Atendemos empresas que precisam vestir equipes inteiras, com peças diferentes por setor
            e o mesmo padrão em todo o lote. As regras são poucas e claras:
          </Prose>
          <div className={styles.ctas}>
            <Cta href={ROUTES.empresas} size="lg">
              Como atendemos empresas
            </Cta>
            <Cta href={whatsappUrl('Olá! Quero agendar uma reunião para conhecer os uniformes da UNIK.')} external variant="line" size="lg" icon="whatsapp">
              Agendar reunião
            </Cta>
          </div>
        </header>

        <dl className={styles.terms}>
          {TERMS.map((t) => (
            <div key={t.title} className={styles.term}>
              <dt className={styles.termTitle}>{t.title}</dt>
              <dd className={styles.termValue}>
                <strong>{t.value}</strong> <span>{t.unit}</span>
              </dd>
              <dd className={styles.termText}>{t.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
