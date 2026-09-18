import { Archivo, Bodoni_Moda, IBM_Plex_Mono } from 'next/font/google'

/**
 * As três vozes do site.
 *
 * Archivo variável com eixo de largura (wdth 62–125): os títulos usam a
 * versão expandida e pesada, que conversa com o "UNK" geométrico do logo; o
 * texto corrido usa a largura normal. Um arquivo só serve os dois usos.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

/**
 * Bodoni Moda — só itálico. É a didone do "CONFECÇÕES" do logo, e no site ela
 * entra apenas para inflexão ("sua marca", "sonho"): nunca como texto corrido.
 */
export const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['italic'],
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
})

/** IBM Plex Mono — a ficha técnica: rótulos, gramaturas, preços. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const fontVariables = [archivo.variable, bodoni.variable, plexMono.variable].join(' ')
