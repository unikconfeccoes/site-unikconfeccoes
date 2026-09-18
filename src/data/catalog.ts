import { PRICE_TABLE, type PriceKey } from '@/data/generated/prices'

/**
 * O catálogo.
 *
 * Os MODELOS e a curadoria (nome, descrição, a que segmento serve) são
 * escritos aqui; os PREÇOS vêm da planilha, via src/data/generated/prices.ts.
 * Cada tecido aponta para uma chave da tabela — o tipo `PriceKey` garante em
 * tempo de compilação que nenhum modelo aponta para uma linha que não existe.
 *
 * Preço exibido: sempre "a partir de", pelo menor valor de atacado entre os
 * tecidos do modelo. O valor da planilha já inclui uma personalização simples;
 * técnica, cores, posições e quantidade definem o valor final no orçamento.
 */

/* ------------------------------------------------------------------ tipos */

export type GarmentKind =
  | 'tee'
  | 'tee-long'
  | 'oversized'
  | 'polo'
  | 'hoodie'
  | 'shirt'
  | 'pants'
  | 'apron'
  | 'dolma'
  | 'coat'

export type CategorySlug =
  | 'polos'
  | 'camisetas'
  | 'esportivo'
  | 'sociais'
  | 'moletons'
  | 'calcas'
  | 'gastronomia'
  | 'jalecos'

export type SegmentSlug =
  | 'corporativo'
  | 'gastronomia'
  | 'hotelaria'
  | 'varejo'
  | 'educacao'
  | 'esporte'
  | 'eventos'
  | 'saude'

export type TechniqueSlug = 'serigrafia' | 'bordado' | 'dtf' | 'sublimacao' | 'alto-relevo'

export type Fabric = {
  id: string
  label: string
  note: string
  price: PriceKey
}

export type Product = {
  slug: string
  name: string
  category: CategorySlug
  garment: GarmentKind
  summary: string
  fabrics: readonly Fabric[]
  segments: readonly SegmentSlug[]
  techniques: readonly TechniqueSlug[]
  sizes: readonly string[]
  highlights: readonly string[]
}

export type Category = {
  slug: CategorySlug
  name: string
  garment: GarmentKind
  description: string
}

/* ----------------------------------------------------------- vocabulário */

export const SIZES_ADULT = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'G1', 'G2', 'G3'] as const
export const SIZES_APRON = ['Único'] as const

const TEXTIL: readonly TechniqueSlug[] = ['bordado', 'serigrafia', 'dtf']
const TEXTIL_SUB: readonly TechniqueSlug[] = ['bordado', 'serigrafia', 'dtf', 'sublimacao']

export const CATEGORIES: readonly Category[] = [
  { slug: 'polos', name: 'Polos', garment: 'polo', description: 'O uniforme corporativo por excelência, de malha leve ao piquet.' },
  { slug: 'camisetas', name: 'Camisetas', garment: 'tee', description: 'Da básica de evento à algodão pima, com modelagem regular ou oversized.' },
  { slug: 'esportivo', name: 'Dry & Esportivo', garment: 'tee-long', description: 'Malhas técnicas que respiram, secam rápido e protegem do sol.' },
  { slug: 'sociais', name: 'Camisas Sociais', garment: 'shirt', description: 'Tricoline, fustão e linho para quem atende de perto.' },
  { slug: 'moletons', name: 'Moletons', garment: 'hoodie', description: 'Capuz, bolso canguru e a peça que turma de formatura veste até gastar.' },
  { slug: 'calcas', name: 'Calças', garment: 'pants', description: 'Tactel para o dia a dia e pied de poule para a cozinha.' },
  { slug: 'gastronomia', name: 'Gastronomia', garment: 'dolma', description: 'Dólmãs e aventais para cozinha e salão, feitos para aguentar o serviço.' },
  { slug: 'jalecos', name: 'Jalecos', garment: 'coat', description: 'Brim leve com caimento limpo para saúde, estética e serviços.' },
]

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  Category
>

/* --------------------------------------------------------------- modelos */

export const PRODUCTS: readonly Product[] = [
  /* ---------------------------------------------------------- polos */
  {
    slug: 'polo-malha',
    name: 'Polo Malha',
    category: 'polos',
    garment: 'polo',
    summary: 'A polo de todo dia: gola e punho em ribana, caimento reto e três malhas para escolher.',
    fabrics: [
      { id: 'pv', label: 'PV', note: 'Poliéster e viscose · leve e fácil de lavar', price: 'Polo PV' },
      { id: 'algodao', label: 'Algodão', note: '100% algodão · toque natural', price: 'Polo em algodão' },
      { id: 'suedine', label: 'Suedine', note: 'Toque aveludado · acabamento premium', price: 'Polo em suedine' },
    ],
    segments: ['corporativo', 'varejo', 'eventos', 'educacao'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Gola e punho em ribana', 'Bordado no peito incluso no orçamento', 'Atacado a partir de 60 peças'],
  },
  {
    slug: 'polo-piquet',
    name: 'Polo Piquet',
    category: 'polos',
    garment: 'polo',
    summary: 'A trama em colmeia do piquet dá estrutura à gola e presença ao uniforme.',
    fabrics: [
      { id: 'piquet-pv', label: 'Piquet PV', note: 'Poliéster e viscose · o piquet mais versátil', price: 'Polo Piquet PV' },
      { id: 'piquet-pa', label: 'Piquet PA', note: 'Poliéster e algodão · mais encorpado', price: 'Polo Piquet PA' },
      { id: 'piquet-conforto', label: 'Piquet Conforto', note: 'A linha nobre · toque macio e caimento de alfaiataria', price: 'Polo Piquet Conforto' },
    ],
    segments: ['corporativo', 'varejo', 'hotelaria', 'saude', 'eventos'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Trama piquet estruturada', 'Gola polo conforto', 'Ideal para bordado'],
  },
  {
    slug: 'polo-dry',
    name: 'Polo Dry',
    category: 'esportivo',
    garment: 'polo',
    summary: 'Polo em dry de seleção: respira, seca rápido e aceita sublimação total.',
    fabrics: [{ id: 'dry-selecao', label: 'Dry seleção', note: 'Trama furadinha · respirável', price: 'Camisa polo de Dry seleção' }],
    segments: ['esporte', 'corporativo', 'eventos'],
    techniques: TEXTIL_SUB,
    sizes: SIZES_ADULT,
    highlights: ['Kit gola seleção', 'Secagem rápida', 'Sublimação total'],
  },

  /* ------------------------------------------------------ camisetas */
  {
    slug: 'camiseta-basica',
    name: 'Camiseta Básica',
    category: 'camisetas',
    garment: 'tee',
    summary: 'A camiseta que vira uniforme de equipe, de evento ou de formatura, disponível em cinco malhas.',
    fabrics: [
      { id: 'pp', label: 'PP', note: 'Poliéster · a mais econômica', price: 'Camiseta PP' },
      { id: 'pv', label: 'PV', note: 'Poliéster e viscose · leve', price: 'Camiseta PV' },
      { id: 'algodao', label: 'Algodão', note: '100% algodão penteado', price: 'Camiseta Algodão' },
      { id: 'algodao-elastano', label: 'Algodão com elastano', note: 'Algodão com elasticidade · veste junto ao corpo', price: 'Camiseta Algodão com elastano' },
      { id: 'suedine', label: 'Suedine', note: 'Toque aveludado · acabamento premium', price: 'Camiseta Suedine' },
    ],
    segments: ['eventos', 'educacao', 'corporativo', 'varejo'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Gola em ribana', 'Cinco malhas', 'A melhor relação custo-volume'],
  },
  {
    slug: 'camiseta-pima',
    name: 'Camiseta Pima',
    category: 'camisetas',
    garment: 'tee',
    summary: 'Algodão pima de fibra extralonga: a malha mais nobre da linha, para marcas que querem ser tocadas.',
    fabrics: [{ id: 'pima', label: 'Algodão Pima', note: 'Fibra extralonga · brilho natural e toque sedoso', price: 'Camiseta Algodão Pima' }],
    segments: ['corporativo', 'varejo', 'eventos'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Ribana pima', 'Toque sedoso', 'Não forma bolinhas'],
  },
  {
    slug: 'camiseta-oversized',
    name: 'Camiseta Oversized',
    category: 'camisetas',
    garment: 'oversized',
    summary: 'Ombro caído, corpo amplo e malha encorpada. A modelagem das marcas autorais.',
    fabrics: [
      { id: 'algodao', label: 'Algodão', note: '100% algodão · encorpado', price: 'Camiseta Oversized Algodão' },
      { id: 'suedine', label: 'Suedine', note: 'Toque aveludado', price: 'Camiseta Oversized Suedine' },
    ],
    segments: ['eventos', 'educacao'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Ombro caído', 'Malha encorpada', 'Estampa grande nas costas'],
  },
  {
    slug: 'camiseta-manga-longa',
    name: 'Camiseta Manga Longa',
    category: 'camisetas',
    garment: 'tee-long',
    summary: 'A básica com manga longa, para equipes de campo e dias frios.',
    fabrics: [{ id: 'pv', label: 'PV', note: 'Poliéster e viscose · leve', price: 'Camiseta PV manga longa' }],
    segments: ['corporativo', 'eventos'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Punho em ribana', 'Protege do sol', 'Estampa na manga'],
  },

  /* ------------------------------------------------------ esportivo */
  {
    slug: 'camiseta-dry',
    name: 'Camiseta Dry',
    category: 'esportivo',
    garment: 'tee',
    summary: 'Malha técnica que expulsa o suor. Para corrida, academia, torneio e equipe de campo.',
    fabrics: [
      { id: 'dry', label: 'Dry', note: 'Poliéster técnico · leve', price: 'Camiseta de dry sem elastano' },
      { id: 'dry-elastano', label: 'Dry com elastano', note: 'Veste junto e acompanha o movimento', price: 'Camiseta de dry elastano' },
      { id: 'dry-texturizado', label: 'Dry texturizado', note: 'Trama com relevo · visual esportivo', price: 'Camiseta de dry texturizado' },
      { id: 'dry-poliamida', label: 'Dry poliamida', note: 'Toque gelado · alta performance', price: 'Camiseta de dry de poliamida' },
    ],
    segments: ['esporte', 'eventos'],
    techniques: TEXTIL_SUB,
    sizes: SIZES_ADULT,
    highlights: ['Secagem rápida', 'Sublimação total', 'Quatro malhas técnicas'],
  },
  {
    slug: 'camiseta-dry-manga-longa',
    name: 'Dry Manga Longa',
    category: 'esportivo',
    garment: 'tee-long',
    summary: 'A dry com manga longa para treino ao ar livre e proteção do braço.',
    fabrics: [
      { id: 'dry', label: 'Dry', note: 'Poliéster técnico · leve', price: 'Camiseta de dry sem elastano manga longa' },
      { id: 'dry-elastano', label: 'Dry com elastano', note: 'Veste junto e acompanha o movimento', price: 'Camiseta de dry elastano manga longa' },
    ],
    segments: ['esporte'],
    techniques: TEXTIL_SUB,
    sizes: SIZES_ADULT,
    highlights: ['Manga longa', 'Secagem rápida', 'Sublimação total'],
  },
  {
    slug: 'camiseta-uv',
    name: 'Dry UV Fluid',
    category: 'esportivo',
    garment: 'tee-long',
    summary: 'Malha fluida com proteção UV, manga longa. Para quem trabalha ou treina sob o sol.',
    fabrics: [
      { id: 'uv-poliamida', label: 'UV Fluid poliamida', note: 'Toque gelado · proteção UV', price: 'Camiseta de dry UV fluid de poliamida manga longa' },
      { id: 'uv-poliester', label: 'UV Fluid poliéster', note: 'Proteção UV · aceita sublimação', price: 'Camiseta de dry UV fluid de poliester manga longa' },
    ],
    segments: ['esporte', 'corporativo'],
    techniques: TEXTIL_SUB,
    sizes: SIZES_ADULT,
    highlights: ['Proteção UV', 'Malha fluida', 'Manga longa'],
  },
  {
    slug: 'camiseta-pesca',
    name: 'Camiseta Pesca',
    category: 'esportivo',
    garment: 'tee-long',
    summary: 'Manga longa em dry com elastano e gola com zíper, pensada para pesca e esporte náutico.',
    fabrics: [{ id: 'dry-elastano', label: 'Dry com elastano', note: 'Manga longa · gola com zíper', price: 'Camiseta de dry elastano manga longa pesca' }],
    segments: ['esporte', 'eventos'],
    techniques: TEXTIL_SUB,
    sizes: SIZES_ADULT,
    highlights: ['Gola com zíper', 'Sublimação total', 'Ideal para torneios'],
  },

  /* -------------------------------------------------------- sociais */
  {
    slug: 'camisa-social',
    name: 'Camisa Social',
    category: 'sociais',
    garment: 'shirt',
    summary: 'Camisa de botão para recepção, salão e atendimento, com o logo bordado no peito.',
    fabrics: [
      { id: 'tricoline', label: 'Tricoline com elastano', note: 'Amassa pouco · veste bem o dia inteiro', price: 'Camisa Social Tricoline' },
      { id: 'fustao', label: 'Fustão Prime', note: 'Textura em relevo · aparência nobre', price: 'Camisa Social Fausto' },
    ],
    segments: ['corporativo', 'hotelaria', 'gastronomia', 'saude'],
    techniques: ['bordado', 'dtf'],
    sizes: SIZES_ADULT,
    highlights: ['Manga longa ou curta', 'Bordado no peito', 'Modelagem social'],
  },
  {
    slug: 'camisa-linho',
    name: 'Camisa Linho',
    category: 'sociais',
    garment: 'shirt',
    summary: 'Linho para quem recebe em lugares quentes: fresca, elegante, com o amassado certo.',
    fabrics: [
      { id: 'linho-ml', label: 'Linho manga longa', note: 'Fresca · caimento solto', price: 'Social linho manga longa' },
      { id: 'linho-mc', label: 'Linho manga curta', note: 'Fresca · para salão e evento', price: 'Social linho manga curta' },
    ],
    segments: ['gastronomia', 'hotelaria', 'eventos', 'corporativo'],
    techniques: ['bordado'],
    sizes: SIZES_ADULT,
    highlights: ['Tecido natural', 'Manga longa ou curta', 'Bordado discreto'],
  },

  /* ------------------------------------------------------- moletons */
  {
    slug: 'moletom-capuz',
    name: 'Moletom com Capuz',
    category: 'moletons',
    garment: 'hoodie',
    summary: 'O moletom do terceirão, da turma e da equipe: capuz forrado, bolso canguru e estampa grande nas costas.',
    fabrics: [
      { id: 'cores-base', label: 'Cores base', note: 'Moletom flanelado · cores de linha', price: 'Moletom com capuz - cores base' },
      { id: 'cores-especiais', label: 'Cores especiais', note: 'Moletom flanelado · paleta ampliada', price: 'Moletom com capuz - cores especiais' },
    ],
    segments: ['educacao', 'eventos', 'corporativo'],
    techniques: TEXTIL,
    sizes: SIZES_ADULT,
    highlights: ['Capuz e bolso canguru', 'Estampa frente e costas', 'Punho e barra em ribana'],
  },

  /* --------------------------------------------------------- calças */
  {
    slug: 'calca-tactel',
    name: 'Calça Tactel',
    category: 'calcas',
    garment: 'pants',
    summary: 'Leve, fresca e resistente: a calça de equipe para quem não para.',
    fabrics: [{ id: 'tactel', label: 'Tactel', note: 'Leve · seca rápido', price: 'Calça de tactel' }],
    segments: ['esporte', 'eventos', 'educacao'],
    techniques: ['serigrafia', 'dtf'],
    sizes: SIZES_ADULT,
    highlights: ['Cós com elástico', 'Secagem rápida', 'Estampa na perna'],
  },
  {
    slug: 'calca-pied-de-poule',
    name: 'Calça Pied de Poule',
    category: 'calcas',
    garment: 'pants',
    summary: 'A calça clássica da cozinha profissional, no padrão pied de poule.',
    fabrics: [
      { id: 'classica', label: 'Linha clássica', note: 'O padrão da cozinha', price: 'Calça pied de poule clássica' },
      { id: 'premium', label: 'Linha premium', note: 'Tecido mais encorpado', price: 'Calça pied de poule premium' },
    ],
    segments: ['gastronomia'],
    techniques: ['bordado'],
    sizes: SIZES_ADULT,
    highlights: ['Cós com elástico e cordão', 'Padrão pied de poule', 'Resiste à lavagem industrial'],
  },

  /* ---------------------------------------------------- gastronomia */
  {
    slug: 'dolma',
    name: 'Dólmã',
    category: 'gastronomia',
    garment: 'dolma',
    summary: 'A dólmã do chef, em two way: transpira, não amassa e leva o nome bordado no peito.',
    fabrics: [
      { id: 'twoway-220', label: 'Two way 220 g', note: 'Mais leve · para cozinha quente', price: 'Dolmã de two way 220gr' },
      { id: 'twoway-247', label: 'Two way 247 g', note: 'Mais encorpado · caimento estruturado', price: 'Dolmã de two way 247gr' },
    ],
    segments: ['gastronomia'],
    techniques: ['bordado', 'dtf'],
    sizes: SIZES_ADULT,
    highlights: ['Nome do chef bordado', 'Transpassada com botões', 'Two way não amassa'],
  },
  {
    slug: 'avental-gabardine',
    name: 'Avental Gabardine',
    category: 'gastronomia',
    garment: 'apron',
    summary: 'Avental de salão em gabardine, com friso e bolso frontal.',
    fabrics: [{ id: 'gabardine', label: 'Gabardine', note: 'Com friso e bolso', price: 'Avental de gabardine com friso e bolso' }],
    segments: ['gastronomia', 'hotelaria'],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sizes: SIZES_APRON,
    highlights: ['Friso contrastante', 'Bolso frontal', 'Tamanho único ajustável'],
  },
  {
    slug: 'avental-twoway',
    name: 'Avental Two Way',
    category: 'gastronomia',
    garment: 'apron',
    summary: 'Avental largo em two way, com bolso. Aguenta o ritmo da cozinha e da lavanderia.',
    fabrics: [
      { id: 'twoway-220', label: 'Two way 220 g', note: 'Mais leve', price: 'Avental de twoway 220gr largo com bolso' },
      { id: 'twoway-247', label: 'Two way 247 g', note: 'Mais encorpado', price: 'Avental de twoway 247gr largo com bolso' },
    ],
    segments: ['gastronomia'],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sizes: SIZES_APRON,
    highlights: ['Modelo largo', 'Bolso frontal', 'Tamanho único ajustável'],
  },
  {
    slug: 'avental-jeans',
    name: 'Avental Jeans & Couro',
    category: 'gastronomia',
    garment: 'apron',
    summary: 'Jeans grosso com detalhes em couro: o avental de barbearia, cervejaria e hamburgueria autoral.',
    fabrics: [{ id: 'jeans', label: 'Jeans com couro', note: 'Jeans grosso · alças e detalhes em couro', price: 'Avental grande jeans com detalhes em couro e bolso' }],
    segments: ['gastronomia', 'varejo', 'eventos'],
    techniques: ['bordado', 'serigrafia'],
    sizes: SIZES_APRON,
    highlights: ['Detalhes em couro', 'Modelo grande', 'Bolsos frontais'],
  },

  /* -------------------------------------------------------- jalecos */
  {
    slug: 'jaleco-brim',
    name: 'Jaleco Brim',
    category: 'jalecos',
    garment: 'coat',
    summary: 'Jaleco em brim leve, com caimento limpo e o nome bordado no peito.',
    fabrics: [{ id: 'brim-leve', label: 'Brim leve', note: 'Resistente · fácil de passar', price: 'Jaleco de Brim leve' }],
    segments: ['saude', 'corporativo'],
    techniques: ['bordado', 'dtf'],
    sizes: SIZES_ADULT,
    highlights: ['Nome bordado', 'Bolsos funcionais', 'Brim resistente'],
  },
]

export const PRODUCT_BY_SLUG: Record<string, Product> = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]))

/* --------------------------------------------------------------- preços */

export type FabricPrice = { varejo: number; atacado: number }

export function fabricPrice(fabric: Fabric): FabricPrice {
  return PRICE_TABLE[fabric.price]
}

/** Menor preço de atacado do modelo — é o número do "a partir de". */
export function startingPrice(product: Product): number {
  return Math.min(...product.fabrics.map((f) => fabricPrice(f).atacado))
}

export function categoryStartingPrice(slug: CategorySlug): number | null {
  const prices = PRODUCTS.filter((p) => p.category === slug).map(startingPrice)
  return prices.length ? Math.min(...prices) : null
}

export function productsInCategory(slug: CategorySlug): readonly Product[] {
  return PRODUCTS.filter((p) => p.category === slug)
}

/* -------------------------------------------------- técnicas e segmentos */

export type Technique = {
  slug: TechniqueSlug
  name: string
  lead: string
  body: string
  ideal: string
  photoId?: string
  garment: GarmentKind
}

export const TECHNIQUES: readonly Technique[] = [
  {
    slug: 'bordado',
    name: 'Bordado',
    lead: 'Linha sobre tecido, ponto a ponto.',
    body: 'O acabamento mais nobre para logos pequenos e nomes. Não desbota, não descasca e envelhece junto com a peça.',
    ideal: 'Polos, dólmãs, camisas sociais, jalecos',
    photoId: 'versa',
    garment: 'dolma',
  },
  {
    slug: 'serigrafia',
    name: 'Serigrafia',
    lead: 'Tinta aplicada por tela, cor a cor.',
    body: 'Cor chapada, alta cobertura e durabilidade de anos. É a técnica que mais compensa nas tiragens grandes.',
    ideal: 'Moletons de turma, camisetas de evento, grandes volumes',
    photoId: 'instituto-federal',
    garment: 'hoodie',
  },
  {
    slug: 'dtf',
    name: 'DTF',
    lead: 'Impressão digital transferida por calor.',
    body: 'Cores ilimitadas, degradês e fotografia com nitidez total, em qualquer cor de tecido. Sem custo extra por cor.',
    ideal: 'Artes coloridas, tiragens menores, peças escuras',
    photoId: 'dtf',
    garment: 'tee',
  },
  {
    slug: 'sublimacao',
    name: 'Sublimação',
    lead: 'A tinta vira gás e entra na fibra.',
    body: 'A estampa passa a fazer parte do tecido: cobre a peça inteira, não pesa, não racha e não sai na lavagem.',
    ideal: 'Linha dry, uniformes esportivos, abadás',
    garment: 'tee-long',
  },
  {
    slug: 'alto-relevo',
    name: 'Alto relevo',
    lead: 'Volume e textura que se sentem com a mão.',
    body: 'Estampas em relevo que dão assinatura tátil à peça. O acabamento preferido das marcas autorais do UNIK Lab.',
    ideal: 'Marcas próprias, coleções, peças-assinatura',
    photoId: 'lab-serigrafia',
    garment: 'oversized',
  },
]

export const TECHNIQUE_BY_SLUG = Object.fromEntries(TECHNIQUES.map((t) => [t.slug, t])) as Record<
  TechniqueSlug,
  Technique
>

export type Segment = {
  slug: SegmentSlug
  name: string
  line: string
  photoId?: string
  garment: GarmentKind
}

export const SEGMENTS: readonly Segment[] = [
  { slug: 'corporativo', name: 'Empresas', line: 'Polos, sociais e camisetas que fazem a equipe parecer uma equipe.', photoId: 'polos', garment: 'polo' },
  { slug: 'gastronomia', name: 'Gastronomia', line: 'Dólmãs, aventais e calças para cozinha e salão.', photoId: 'versa', garment: 'dolma' },
  { slug: 'hotelaria', name: 'Hotelaria', line: 'Recepção, governança e salão com o mesmo padrão visual.', garment: 'shirt' },
  { slug: 'varejo', name: 'Lojas & varejo', line: 'Equipe de loja identificada, confortável e fácil de repor.', garment: 'polo' },
  { slug: 'educacao', name: 'Escolas & formaturas', line: 'O moletom do terceirão e o uniforme que a turma guarda.', photoId: 'instituto-federal', garment: 'hoodie' },
  { slug: 'esporte', name: 'Esporte & outdoor', line: 'Dry, UV e sublimação total para treino, torneio e pesca.', garment: 'tee-long' },
  { slug: 'eventos', name: 'Eventos', line: 'Camisetas, abadás e kits para quem precisa de volume no prazo.', photoId: 'criadores', garment: 'tee' },
  { slug: 'saude', name: 'Saúde & serviços', line: 'Jalecos e polos com caimento limpo e nome bordado.', garment: 'coat' },
]

export const SEGMENT_BY_SLUG = Object.fromEntries(SEGMENTS.map((s) => [s.slug, s])) as Record<SegmentSlug, Segment>

/** Posições de personalização oferecidas no configurador. */
export const POSITIONS = ['Peito esquerdo', 'Peito direito', 'Frente central', 'Costas', 'Manga esquerda', 'Manga direita', 'Nuca'] as const
