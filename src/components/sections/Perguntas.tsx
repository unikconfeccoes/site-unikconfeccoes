'use client'

import { useState } from 'react'
import { Section } from '@/components/primitives/Section'
import { Display, Eyebrow, Prose, Serif } from '@/components/primitives/Typography'
import { FAQ } from '@/data/faq'
import styles from './Perguntas.module.css'

/**
 * PERGUNTAS — <details> nativo: o conteúdo está no HTML aberto ou fechado
 * (rastreador e Ctrl+F encontram), e o teclado funciona sem uma linha de JS.
 * O estado só garante uma aberta por vez.
 */
export function Perguntas() {
  const [aberta, setAberta] = useState<string | null>(FAQ[0]?.id ?? null)

  return (
    <Section id="perguntas" atmosphere="atelier" labelledBy="perguntas-title">
      <div className={`u-container ${styles.grid}`}>
        <header className={styles.head}>
          <Eyebrow index="08">Perguntas</Eyebrow>
          <Display id="perguntas-title" size="3">
            Antes de <Serif>pedir</Serif>
          </Display>
          <Prose muted>O que mais chega pelo WhatsApp, respondido aqui.</Prose>
        </header>

        <div className={styles.list}>
          {FAQ.map((item, i) => {
            const open = aberta === item.id
            return (
              <details
                key={item.id}
                className={styles.item}
                open={open}
                onToggle={(e) => {
                  if (e.currentTarget.open) setAberta(item.id)
                  else if (open) setAberta(null)
                }}
              >
                <summary className={styles.q}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.text}>{item.pergunta}</span>
                  <span className={styles.sign} aria-hidden="true" />
                </summary>
                <div className={styles.a}>
                  <Prose size="lg" muted>
                    {item.resposta}
                  </Prose>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
