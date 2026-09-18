import type { Metadata } from 'next'
import { Logo } from '@/components/brand/Logo'
import { safeNext } from '@/lib/access'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: { absolute: 'Acesso restrito | UNIK Confecções' },
  robots: { index: false, follow: false },
}

type Props = { searchParams: Promise<{ next?: string; erro?: string }> }

/**
 * Tela de senha do pré-lançamento. Cobre a página inteira (header, rodapé e
 * barra do celular ficam por baixo) e funciona sem JavaScript: é um
 * formulário HTML comum que posta para /api/acesso.
 */
export default async function AcessoPage({ searchParams }: Props) {
  const { next, erro } = await searchParams
  return (
    <div className={styles.screen} data-atmosphere="noite" data-section="noite">
      <form method="POST" action="/api/acesso" className={styles.card}>
        <Logo variant="full" height="clamp(3.5rem, 12vw, 5.5rem)" className={styles.logo} />
        <h1 className={styles.title}>Estamos quase prontos</h1>
        <p className={styles.text}>O site da UNIK será liberado em breve. Para acessar agora, digite a senha.</p>
        <input type="hidden" name="next" value={safeNext(next)} />
        <label htmlFor="senha" className={styles.label}>
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          required
          autoFocus
          className={styles.input}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? 'senha-erro' : undefined}
        />
        {erro ? (
          <p id="senha-erro" className={styles.error} role="alert">
            Senha incorreta. Tente de novo.
          </p>
        ) : null}
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  )
}
