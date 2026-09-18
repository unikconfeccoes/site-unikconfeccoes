import type { Metadata, Viewport } from 'next'
import { fontVariables } from '@/lib/fonts'
import { SITE } from '@/data/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
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
    default: `Confecção de uniformes para empresas em Brasília | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'confecção de uniformes',
    'uniformes para empresas',
    'uniformes profissionais',
    'uniformes Brasília',
    'uniforme corporativo',
    'camisa polo personalizada',
    'dólmã personalizada',
    'jaleco personalizado',
    'bordado em uniforme',
    'serigrafia',
    'DTF',
    'sublimação',
    'private label',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Confecção de uniformes',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.name,
    title: `Confecção de uniformes para empresas em Brasília | ${SITE.name}`,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  // "Adicionar à Tela de Início" no iPhone abre em tela cheia, como app.
  appleWebApp: { capable: true, title: 'UNIK', statusBarStyle: 'black-translucent' },
  /*
   * Verificação de propriedade. Preencha no painel da Vercel:
   *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION  (Search Console, método "tag HTML")
   *   NEXT_PUBLIC_BING_SITE_VERIFICATION    (Bing Webmaster Tools)
   */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
}

/*
 * Experiência de app no celular, a pedido do cliente: sem zoom.
 * maximumScale 1 + userScalable false travam a pinça no Android; no iOS o
 * Safari ignora essas flags, então o bloqueio de gesto fica no script abaixo
 * e o duplo toque é desligado por `touch-action: manipulation` (globals.css).
 * Contrapartida conhecida: WCAG 1.4.4 recomenda permitir zoom. Por isso os
 * textos têm corpo mínimo de 16px nos campos e escala fluida no resto.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0b0b0b',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* A classe `js` é o que faz o CSS confiar no GSAP para revelar
            conteúdo. Sem JS ela nunca é escrita e tudo fica visível. */}
        <script
          dangerouslySetInnerHTML={{
            // `js` libera as animações; os listeners de gesture bloqueiam a
            // pinça no Safari do iPhone, que ignora user-scalable=no.
            __html: `document.documentElement.classList.add('js');['gesturestart','gesturechange','gestureend'].forEach(function(e){document.addEventListener(e,function(ev){ev.preventDefault()},{passive:false})});`,
          }}
        />
        {/* A empresa e o site, em todas as páginas: as demais entidades apontam para estes @id. */}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="Resumo do site para assistentes de IA" />
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
