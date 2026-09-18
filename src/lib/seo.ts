import type { Metadata } from 'next'
import { SITE, SOCIAL, WHATSAPP } from '@/data/site'
import type { Faq } from '@/data/seo/types'

/**
 * SEO em um lugar só.
 *
 * Toda página monta a sua metadata com `pageMeta()` e o seu JSON-LD com os
 * construtores abaixo. As entidades se referenciam por `@id` (#organizacao,
 * #site), então o Google e os assistentes de IA entendem que todas as páginas
 * falam da MESMA empresa, e não de ilhas soltas.
 */

export const ORG_ID = `${SITE.url}/#organizacao`
export const SITE_ID = `${SITE.url}/#site`
export const LAB_ID = `${SITE.url}/lab#unik-lab`

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString()
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  /** Título absoluto (sem o sufixo da marca). */
  absolute?: boolean
  noindex?: boolean
  type?: 'website' | 'article'
  keywords?: string[]
}

export function pageMeta({ title, description, path, absolute, noindex, type = 'website', keywords }: PageMetaInput): Metadata {
  const fullTitle = absolute ? title : `${title} | ${SITE.name}`
  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'pt_BR',
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

/* ------------------------------------------------------------ entidades */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: ['UNIK', 'Unik Confecções', 'UNIK Uniformes'],
    description: SITE.description,
    url: SITE.url,
    logo: absoluteUrl('/brand/unik.svg'),
    image: absoluteUrl('/opengraph-image'),
    foundingDate: String(SITE.founded),
    slogan: SITE.tagline,
    telephone: `+${WHATSAPP.number}`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      addressCountry: 'BR',
    },
    areaServed: SERVICE_AREA.map((name) => ({ '@type': 'AdministrativeArea', name })),
    knowsAbout: [
      'Confecção de uniformes',
      'Uniformes corporativos',
      'Uniformes profissionais',
      'Camisa polo personalizada',
      'Dólmã e avental para restaurante',
      'Jaleco personalizado',
      'Serigrafia',
      'Bordado computadorizado',
      'DTF',
      'Sublimação',
      'Estampa em alto relevo',
      'Private label',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: `+${WHATSAPP.number}`,
      availableLanguage: 'Portuguese',
      areaServed: 'BR',
    },
    sameAs: [SOCIAL.instagram.url, SOCIAL.instagramLab.url, SOCIAL.linktree.url],
    subOrganization: {
      '@type': 'Organization',
      '@id': LAB_ID,
      name: 'UNIK Lab',
      description: 'Private label: desenvolvimento e produção de roupas para marcas próprias.',
      url: absoluteUrl('/lab'),
      sameAs: [SOCIAL.instagramLab.url],
    },
  }
}

/**
 * Onde a UNIK atende. Só Brasília e DF são confirmados; o atendimento
 * nacional depende de confirmação do cliente (ver README, pendências).
 */
export const SERVICE_AREA = ['Brasília', 'Distrito Federal'] as const

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/catalogo?busca={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export type Crumb = { name: string; path: string }

export function breadcrumbJsonLd(crumbs: readonly Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export function faqJsonLd(faq: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripMarkup(f.a) },
    })),
  }
}

export function itemListJsonLd(name: string, items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  }
}

export function articleJsonLd(input: { title: string; description: string; path: string; updated: string; section?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    inLanguage: 'pt-BR',
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.updated,
    dateModified: input.updated,
    articleSection: input.section,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(`${input.path}/opengraph-image`),
  }
}

export function serviceJsonLd(input: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: absoluteUrl(input.path),
    provider: { '@id': ORG_ID },
    areaServed: SERVICE_AREA.map((name) => ({ '@type': 'AdministrativeArea', name })),
    audience: { '@type': 'BusinessAudience', name: 'Empresas' },
  }
}

/** Texto limpo para JSON-LD e llms.txt: tira [links](/x) e **negrito**. */
export function stripMarkup(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1')
}
