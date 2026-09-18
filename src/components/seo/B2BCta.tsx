import { Cta } from '@/components/primitives/Cta'
import { ATACADO_MIN, PEDIDO_MINIMO, WHATSAPP, whatsappUrl } from '@/data/site'
import styles from './Content.module.css'

/**
 * A caixa de conversão das páginas de conteúdo. Quem chega por uma busca
 * ("uniforme para restaurante") precisa de uma saída clara a qualquer altura
 * da leitura: por isso ela fica presa na coluna lateral.
 */
export function B2BCta({ context }: { context?: string }) {
  const msg = context
    ? `Olá! Vim pelo site da UNIK (${context}) e quero um orçamento de uniformes para a minha empresa.`
    : 'Olá! Vim pelo site da UNIK e quero um orçamento de uniformes para a minha empresa.'
  return (
    <aside className={styles.cta} data-atmosphere="noite" aria-label="Orçamento para empresas">
      <span className={styles.ctaBar} aria-hidden="true" />
      <p className={styles.ctaKicker}>Para empresas</p>
      <p className={styles.ctaTitle}>Uniformes para a sua equipe, em volume</p>
      <ul className={styles.ctaList}>
        <li>Pedido mínimo de {PEDIDO_MINIMO.total} peças</li>
        <li>Atacado a partir de {ATACADO_MIN} peças do mesmo modelo</li>
        <li>50% de entrada e o restante na entrega</li>
        <li>Reunião presencial para ver as peças</li>
        <li>Mockup da arte para aprovar antes da produção</li>
        <li>Grade de tamanhos do PP ao G3</li>
      </ul>
      <div className={styles.ctaActions}>
        <Cta href="/catalogo" icon="plus">
          Montar orçamento
        </Cta>
        <Cta href={whatsappUrl(msg)} external variant="line" icon="whatsapp">
          {WHATSAPP.display}
        </Cta>
      </div>
    </aside>
  )
}
