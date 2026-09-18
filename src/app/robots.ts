import type { MetadataRoute } from 'next'
import { SITE } from '@/data/site'

/**
 * Robôs.
 *
 * Buscadores E assistentes de IA são liberados explicitamente: quem quer ser
 * citado pelo ChatGPT, Claude, Perplexity e Gemini precisa deixar os robôs
 * deles lerem o site. Só o orçamento (estado do visitante) fica de fora.
 */
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'meta-externalagent',
  'DuckAssistBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/orcamento'] },
      { userAgent: AI_BOTS, allow: '/', disallow: ['/orcamento'] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
