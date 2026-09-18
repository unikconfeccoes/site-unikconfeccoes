import { ImageResponse } from 'next/og'
import { LOGO } from '@/data/generated/logo'

export const OG_SIZE = { width: 1200, height: 630 }

/**
 * Imagem de compartilhamento (WhatsApp, LinkedIn, Google Discover). Preta,
 * com o logo em bronze, o título da página em caixa alta e a barra do "i"
 * como assinatura na borda. Gerada no build para cada página.
 */
export function renderOg({ kicker, title }: { kicker: string; title: string }) {
  const [, , w, h] = LOGO.mark.viewBox.split(' ').map(Number)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#0b0b0b',
          color: '#f3efe7',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', right: 96, top: 0, width: 26, height: 250, background: '#f3efe7' }} />
        <svg width={w! * 0.55} height={h! * 0.55} viewBox={LOGO.mark.viewBox}>
          <g fill="#b39b68">
            <path d={LOGO.parts.u} />
            <path d={LOGO.parts.n} />
            <path d={LOGO.parts.k} />
          </g>
          <rect x={LOGO.bar.x0} y={LOGO.bar.y0} width={LOGO.bar.x1 - LOGO.bar.x0} height={LOGO.bar.y1 - LOGO.bar.y0} fill="#f3efe7" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: 'uppercase', color: '#b39b68' }}>{kicker}</div>
          <div style={{ fontSize: title.length > 48 ? 58 : 70, fontWeight: 800, lineHeight: 1, letterSpacing: -2, textTransform: 'uppercase', maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ fontSize: 24, color: '#b3aea4' }}>UNIK Confecções · Uniformes profissionais para empresas · Brasília desde 2016</div>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
