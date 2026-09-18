# UNIK — Plano do site (catálogo + orçamento)

> **Status (18/09/2026):** fases 0–7 implementadas. O projeto usa a arquitetura do Novo-Site-Wine-Garden (CSS Modules + tokens, sem Tailwind, sem Lenis) no lugar da stack proposta abaixo. Decisões do cliente:
> - Preço "a partir de".
> - Silhuetas no lugar das fotos.
> - Lab como página própria, com formulário.
> - Cores, mínimo, prazo e números ficam em aberto.
>
> A documentação atual está no README.md. Os arquivos brutos foram movidos para `_fontes/`.

## 1. O que existe na pasta

| Arquivo | Conteúdo | Uso no site |
|---|---|---|
| `LOGOS UNIK CONFECÇÕES VETOR.pdf` / `.cdr.zip` | Logo vetorial: "UNK" com o "i" em barra vazada + "CONFECÇÕES" em serifa espaçada | Converter para SVG (logo, favicon, animação do hero) |
| `nova-Planilha de precificação (1).xlsx` | Versão **mais recente**: custo de tecidos, fornecedores, aviamentos, costura, corte e preço final por peça (varejo e atacado) | Fonte do catálogo (produtos × tecidos) |
| `Planilha de precificação.xlsx` | Versão antiga (arte a R$10, sem avental/dolmã/pima) | Ignorar, usar a nova |
| `Planilha2` (nas duas) | 20 tecidos técnicos (Milan, Treek, Air Skin, Fitty…) com composição e gramatura | Guia de tecidos / linha UNIK LAB |
| `1–4.png` | Instagram @unik.confeccoes, @uniklab_ e WhatsApp +55 61 99551-0564 | Identidade, tom de voz, portfólio, contato |

### Leitura da marca
- **Duas marcas:** *UNIK Confecções*, que faz uniformes premium desde 2016 (B2B), e *UNIK LAB*, que faz private label com modelagem personalizada e alto relevo (marcas próprias).
- **Paleta:** preto profundo, dourado/bronze do logo (aprox. `#9C8757`) e branco-gelo. Cores de apoio vêm das próprias peças (azul royal, marinho).
- **Tipografia:** o logo mistura uma sans geométrica pesada com uma serifa clássica espaçada. Proposta: *General Sans* ou *Satoshi* (Fontshare) nos títulos e *Cormorant Garamond* nos detalhes e rótulos em caixa alta espaçada.
- **Slogan:** "Transformando o seu sonho em realidade."
- **Técnicas:** Serigrafia, Bordado, DTF, Sublimação e Alto relevo.
- **Segmentos visíveis no portfólio:** gastronomia (Versá: dólmã, avental), educação (Instituto Federal, terceirão), corporativo (polos), esportivo e pesca (dry UV), eventos (abadá).

### Catálogo extraído da planilha (9 categorias, cerca de 45 variações)
- **Camisas Polo:** PV, Algodão, Suedine, Piquet PV, Piquet PA, Piquet Conforto e Dry Seleção
- **Camisetas:** PP, PV, Suedine, Algodão, Algodão c/ elastano, Algodão Pima, Oversized (algodão/suedine) e Manga longa
- **Dry Fit / Esportivo:** com e sem elastano, texturizado, poliamida, UV Fluid (poliamida/poliéster), ML e pesca
- **Camisas Sociais:** Tricoline, Fustão (Doptex), Linho MC e ML
- **Moletons:** capuz, tecido Patrick ou Simão Malhas (outras cores)
- **Calças:** Tactel, Pied de poule
- **Jalecos:** Brim leve
- **Dólmãs:** Two-way 220g e 247g
- **Aventais:** Gabardine, Two-way 220g e 247g, Jeans com couro

Regra comercial encontrada: **o preço de atacado começa em 60 peças.**

> ⚠️ **A planilha tem custos, fornecedores e margem.** Nada disso vai para o site. Vamos gerar um `products.ts` só com nome, categoria, tecido, composição, cores e, se o cliente aprovar, uma faixa de preço "a partir de".

---

## 2. Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSG/SEO, rotas por categoria e produto, deploy simples |
| Estilo | **Tailwind CSS v4** + tokens de marca | Velocidade e consistência |
| Animação | **GSAP 3.13+** (ScrollTrigger, SplitText, Flip), agora 100% gratuito | Rolagem cinematográfica, pin, scrub |
| Smooth scroll | **Lenis** integrado ao ticker do GSAP | Rolagem suave e premium |
| Estado do orçamento | **Zustand** + `persist` (localStorage) | A lista de cotação sobrevive ao reload |
| Dados | Arquivos TS/JSON no repo (fase 1), CMS opcional (fase 2: Sanity ou Payload) | Front-only agora, editável depois |
| Envio do orçamento | **WhatsApp deep link** com mensagem montada (fase 1) + e-mail via Resend/Formspree (fase 2) | Sem backend no MVP |
| Imagens | `next/image`, AVIF/WebP | Performance |
| Deploy | Vercel | Preview por branch para o cliente aprovar |

---

## 3. Arquitetura de páginas

```
/                        Home (experiência GSAP completa)
/catalogo                Catálogo com filtros (categoria, tecido, técnica, segmento)
/catalogo/[categoria]    Ex.: /catalogo/polos
/produto/[slug]          Página do produto + configurador de orçamento
/orcamento               Lista de cotação (carrinho) + envio
/segmentos/[slug]        Gastronomia, Empresas, Escolas/Formaturas, Esporte, Eventos
/lab                     UNIK LAB: private label (sub-marca, visual mais escuro)
/sobre                   História desde 2016, processo, produção
/contato                 WhatsApp, Instagram, localização (Brasília-DF)
```

---

## 4. A Home, seção por seção (roteiro de rolagem)

1. **Hero imponente (pinned, cerca de 200vh de scroll)**
   - Fundo preto. As letras **U N K** entram gigantes (SplitText, stagger de baixo para cima) e a barra do **"i"** do logo cai em seguida como uma linha dourada.
   - Ao rolar (scrub), a barra do "i" se expande até virar uma **janela** que revela um vídeo em loop da produção (bordado, serigrafia, prensa de DTF). O logo afasta e o vídeo ocupa a tela.
   - Headline em SplitText: *"Uniformes que vestem a sua marca."* Linha de apoio: "Transformando o seu sonho em realidade · Desde 2016 · Brasília-DF".
   - Dois CTAs: **Ver catálogo** e **Montar orçamento**. O cursor é customizado com um anel dourado magnético.
2. **Marquee de clientes/segmentos:** faixa infinita com logos e nomes (Versá, Instituto Federal…) que muda de velocidade conforme a rolagem.
3. **Manifesto:** um parágrafo grande que "acende" palavra por palavra enquanto rola (opacidade de 0.15 para 1).
4. **Categorias em scroll horizontal (pinned):** cards grandes com foto da peça, nome e contador ("07 tecidos"). O parallax interno usa `containerAnimation`.
5. **Técnicas de personalização:** cards empilhados (sticky stack) para Serigrafia, Bordado, DTF, Sublimação e Alto relevo, cada um com macrofoto, descrição e "indicado para".
6. **Como funciona (processo):** uma linha do tempo vertical que se desenha com o scroll (SVG stroke-dashoffset). Etapas: Briefing, Arte/mockup, Aprovação, Produção, Entrega.
7. **Segmentos:** grid com hover que expande (Flip) em Gastronomia, Corporativo, Educação, Esporte e Eventos.
8. **Números:** contadores animados (desde 2016, peças entregues, clientes atendidos). Os números vêm do cliente.
9. **Portfólio:** galeria masonry com parallax, usando os posts do Instagram. Link para o perfil.
10. **UNIK LAB teaser:** a seção fica escura e dourada e o logo "Lab" aparece em assinatura. Leva a `/lab`.
11. **FAQ:** pedido mínimo, prazo, atacado a partir de 60 peças, envio da arte, tabela de tamanhos.
12. **CTA final + footer:** "Vamos criar o uniforme da sua marca?", com botão WhatsApp gigante e magnético.

**Regras de motion:** respeitar `prefers-reduced-motion` (desliga pin e scrub e mantém só fades), usar `gsap.matchMedia()` para ter versões desktop e mobile, animar só `transform` e `opacity`, e fazer lazy-load do vídeo do hero com poster.

---

## 5. Catálogo e orçamento (o coração do site)

### Catálogo `/catalogo`
- Filtros em chips: categoria, tecido, técnica, segmento e manga (curta/longa). A URL guarda os filtros (`?cat=polos&tecido=piquet`).
- A grade reorganiza com animação **GSAP Flip** ao filtrar.
- O card mostra foto, nome, tecidos disponíveis (bolinhas), badge "Atacado a partir de 60 pç" e botão rápido **+ Orçamento**.

### Produto `/produto/[slug]`
- Galeria com zoom e ficha técnica: composição, gramatura, toque e indicação de uso.
- **Configurador em etapas:**
  1. Tecido (lista vinda da planilha para aquele modelo)
  2. Cor
  3. **Grade de tamanhos** (PP, P, M, G, GG, XG, G1–G3) com quantidade por tamanho e total automático
  4. Personalização: técnica e posições (peito esquerdo, costas, manga, nuca) com mockup clicável
  5. Upload do logo/arte (opcional; na fase 1 só mostra preview local, porque o arquivo vai pelo WhatsApp)
  6. Observações
- **Barra de progresso de atacado:** "Faltam 14 peças para o preço de atacado". A regra de 60 peças vem da planilha e é um gatilho de conversão.

### Lista de orçamento `/orcamento`
- Vários itens (ex.: 40 polos + 20 aventais + 10 dólmãs), cada um editável e removível.
- Dados do cliente: nome, empresa, CNPJ (opcional), cidade, prazo desejado.
- **Enviar pelo WhatsApp:** gera uma mensagem formatada com número de pedido (`UNK-2026-0042`) para `wa.me/5561995510564`.
- Também oferece **Baixar PDF do orçamento** e envio por e-mail (fase 2).
- O ícone do orçamento no header mostra contador animado e abre um drawer lateral.

---

## 6. Design system

- **Tokens:** `--black #0B0B0B`, `--ink #161616`, `--gold #9C8757` (validar no vetor), `--gold-light #C8B68A`, `--bone #F4F1EA`, `--line rgba(255,255,255,.12)`
- Grid de 12 colunas, títulos com `clamp()` (hero com até cerca de 18vw), muito respiro.
- Componentes: Button (primário dourado, ghost, magnético), Chip, ProductCard, SizeGrid, QuoteDrawer, SectionTitle (SplitText), Marquee, StickyStack, HorizontalScroller.
- Detalhe de marca: a **barra do "i"** vira elemento gráfico recorrente (divisores, cursor, loaders, indicador de seção ativa).

---

## 7. Estrutura do código

```
src/
  app/(site)/page.tsx, catalogo/, produto/[slug]/, orcamento/, lab/, sobre/, segmentos/[slug]/
  components/ui/          Button, Chip, Drawer, Input…
  components/sections/    Hero, Manifesto, CategoriesScroller, Techniques, Process…
  components/catalog/     ProductCard, Filters, ProductGallery, Configurator, SizeGrid
  components/motion/      SmoothScroll (Lenis), SplitReveal, Magnetic, useGsap hooks
  data/                   products.ts, categories.ts, fabrics.ts, techniques.ts, segments.ts
  store/quote.ts          Zustand (itens, cliente, persistência)
  lib/whatsapp.ts         montagem da mensagem
  lib/pdf.ts              orçamento em PDF (fase 2)
scripts/import-planilha.ts  xlsx → data/*.ts (remove custo e fornecedor)
public/brand/             logo.svg, logo-lab.svg, favicon
```

---

## 8. Fases de execução

| # | Fase | Entregas |
|---|---|---|
| 0 | **Setup** | Next + TS + Tailwind + GSAP + Lenis; converter o logo PDF para SVG; tokens; fontes; deploy Vercel |
| 1 | **Dados** | Script que lê a planilha nova e gera `products/fabrics/categories` sem custos; slugs; imagens placeholder |
| 2 | **Design system** | Componentes base, header com drawer de orçamento, footer, cursor, smooth scroll |
| 3 | **Home** | Hero pinned com a animação do "i", marquee, manifesto, categorias horizontais, técnicas, processo, segmentos, números, portfólio, LAB, FAQ, CTA |
| 4 | **Catálogo** | Listagem com filtros + Flip, páginas de categoria |
| 5 | **Produto + configurador** | Galeria, ficha técnica, etapas, grade de tamanhos, barra de atacado |
| 6 | **Orçamento** | Store, página, drawer, mensagem WhatsApp, número de pedido |
| 7 | **Páginas institucionais** | /lab, /sobre, /segmentos, /contato |
| 8 | **Polimento** | Mobile, reduced-motion, Lighthouse (meta 90+), SEO local (schema `LocalBusiness`, Brasília-DF), OG images, analytics |
| 9 | **Fase 2 (opcional)** | CMS para o cliente editar produtos, e-mail/PDF do orçamento, painel de pedidos |

---

## 9. Pendências com o cliente (bloqueiam partes do trabalho)

1. **Mostrar preço?** Três opções: sem preço, "a partir de R$ X" ou estimativa automática no configurador. A planilha permite as três.
2. **Fotos:** hoje só temos prints do Instagram. É preciso ter fotos das peças em fundo neutro e um vídeo curto da produção para o hero. Até lá, usamos placeholders e mockups.
3. **Pedido mínimo e prazo médio** de produção.
4. **UNIK LAB:** fica como seção ou página dentro deste site, ou vira um site separado?
5. **Cores disponíveis** por tecido (não estão na planilha).
6. **Números** para a seção de contadores, **depoimentos** e **logos de clientes** com autorização de uso.
7. Domínio, e-mail que recebe orçamentos e se o link do Linktree continua.
8. Os tecidos técnicos da Planilha2 (Milan, Treek…) entram no catálogo ou são só da linha LAB?
