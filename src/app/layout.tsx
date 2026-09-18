import type { Metadata, Viewport } from 'next'
import { fontVariables } from '@/lib/fonts'
import { SITE, SOCIAL, WHATSAPP } from '@/data/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AtmosphereObserver } from '@/components/layout/AtmosphereObserver'
import { Preloader } from '@/components/layout/Preloader'
import { MobileBar } from '@/components/layout/MobileBar'
import { CursorLabel } from '@/components/ui/CursorLabel'
import { Toaster } from '@/components/ui/Toaster'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Uniformes premium em Brasília`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'uniformes Brasília',
    'uniformes personalizados',
    'camisa polo personalizada',
    'dólmã personalizada',
    'serigrafia Brasília',
    'bordado em uniforme',
    'DTF',
    'sublimação',
    'private label',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Uniformes premium em Brasília`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0b0b0b',
}

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  foundingDate: String(SITE.founded),
  telephone: WHATSAPP.display,
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.state, addressCountry: 'BR' },
  sameAs: [SOCIAL.instagram.url, SOCIAL.instagramLab.url],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* A classe `js` é o que faz o CSS confiar no GSAP para revelar
            conteúdo. Sem JS ela nunca é escrita e tudo fica visível. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      </head>
      <body data-atmosphere="noite">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Preloader />
        <AtmosphereObserver />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <MobileBar />
        <CursorLabel />
        <Toaster />
      </body>
    </html>
  )
}
