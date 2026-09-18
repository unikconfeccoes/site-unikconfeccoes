# UNIK Confecções — site

> Transformando o seu sonho em realidade.

Catálogo e orçamento online da UNIK Confecções (uniformes premium, Brasília-DF, desde 2016) e página do UNIK Lab (private label).

A arquitetura segue a do projeto **Novo-Site-Wine-Garden**: Next.js 16 (App Router), React 19, TypeScript estrito, CSS Modules com tokens e GSAP. A rolagem é nativa, sem Lenis.

## Começando

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
```

### Scripts de assets

Os arquivos brutos ficam em `_fontes/` e não são lidos em runtime. As saídas geradas **são versionadas**, porque a Vercel não tem o Python nem os originais.

| Script | Entrada | Saída |
|---|---|---|
| `npm run assets:logo` | `_fontes/LOGOS … VETOR.pdf` | `src/data/generated/logo.ts`, `public/brand/*.svg`, `src/app/icon.svg` |
| `npm run assets:prices` | `_fontes/nova-Planilha de precificação (1).xlsx` | `src/data/generated/prices.ts` |
| `npm run assets:images` | `_fontes/2.png`, `3.png` (prints do Instagram) | `public/img/portfolio/*.jpg` e `src/data/generated/photos.ts` |

`assets:prices` precisa de Python 3 com `openpyxl`. Ele lê **só** a coluna "Valor a cobrar": custo, fornecedor e margem nunca entram no bundle. O script falha se um nome de fornecedor aparecer em algum rótulo publicado.

## Arquitetura

```
src/
├── app/                   /, /catalogo, /catalogo/[slug], /orcamento, /lab, sitemap, robots
├── components/
│   ├── brand/             Logo (paths do PDF, animável letra a letra), Garment (silhuetas)
│   ├── primitives/        Section, Typography, Cta, Media, PageHero
│   ├── layout/            Header, Footer, Preloader, AtmosphereObserver, MobileBar
│   ├── sections/          seções da home
│   ├── catalog/           CatalogExplorer (Flip), ProductCard, ProductView, SizeGrid
│   ├── quote/             QuoteView
│   ├── lab/               LabHero, LabFabrics, LabForm
│   └── ui/                Chip, CursorLabel, Toaster
├── data/                  catalog.ts (curadoria), site.ts, faq.ts, lab.ts, generated/
├── hooks/                 useGsap (gsap.context + cleanup), useMediaQuery
├── lib/                   quote-store (useSyncExternalStore + localStorage), whatsapp, format, motion/
└── styles/                tokens.css (atmosferas), globals.css
```

### Design

- **Paleta:** preto `#0B0B0B`, bronze do logo `#715D35` (usado para formas) e ouro `#B39B68`, a mesma matiz clareada para texto sobre escuro. O fundo claro é osso `#F3EFE7`.
- **Atmosferas:** cada seção declara `atelier`, `noite`, `grafite` ou `bronze`, e os componentes consomem só os papéis de cor (`--surface`, `--ink`, `--accent`). O header muda de tom conforme a seção que está abaixo dele.
- **Tipografia:** Archivo expandida (a voz do "UNK"), Bodoni Moda itálica (a didone do "CONFECÇÕES", só para dar inflexão) e IBM Plex Mono (ficha técnica).
- **Elemento recorrente:** a barra do "i" do logo. Ela vira janela no herói, marcador na linha do processo, separador na fita e meta na barra de atacado.

### Motion (GSAP)

| Onde | O quê |
|---|---|
| Preloader | As letras sobem e a barra do "i" cai (uma vez por aba) |
| Herói | A sequência fica presa com `sticky`. A barra do "i" vira um `clip-path` que se abre até a tela cheia sobre o portfólio |
| Manifesto | Palavras acendem com o scroll (scrub) |
| Categorias | Arara horizontal com pin e `containerAnimation` |
| Processo | Trilho que se preenche e a barra do "i" descendo |
| Técnicas | Cartões `sticky` que recuam quando o próximo cobre |
| Segmentos | Prévia que segue o cursor (`quickTo`) |
| Portfólio | Duas faixas em sentidos opostos (scrub) |
| Catálogo | Reorganização com **Flip** ao filtrar e ordenar |

A sequência presa só roda em tela ≥ 1024 px com mouse. Em toque, as mesmas narrativas aparecem empilhadas. Com `prefers-reduced-motion`, tudo fica parado e visível. Sem JS, nenhum conteúdo fica escondido.

### Orçamento

- O visitante escolhe **tecido → cor → grade de tamanhos → técnica e posição → observações**.
- Uma barra mostra quanto falta para o atacado (60 peças).
- A lista fica salva no `localStorage`.
- O envio abre o WhatsApp `+55 61 99551-0564` com a mensagem pronta e um código `UNK-AAMMDD-XXXX`. Não há backend nesta fase.

## SEO e IA

O site tem **cerca de 95 páginas indexáveis**, todas com conteúdo real e visível. Não existe página oculta: páginas escondidas do visitante e feitas só para o robô (cloaking, doorway pages) violam as diretrizes do Google e levam à remoção do índice. As páginas que não estão no menu são descobertas pelo rodapé, pelo [mapa do site](/mapa-do-site) e pelos sitemaps.

| Grupo | Rotas | Fonte dos dados |
|---|---|---|
| Linhas | `/catalogo/linha/<linha>` (9) | `catalog.ts` + `lib/catalog-seo.ts` |
| Modelos | `/catalogo/<modelo>` (33) | `catalog.ts` (FAQ e textos derivados) |
| Segmentos | `/uniformes/<segmento>` (8) | `data/seo/segments.ts` |
| Personalização | `/personalizacao/<técnica>` (5) | `data/seo/techniques.ts` |
| Tecidos | `/tecidos/<tecido>` (18) | `data/seo/fabrics.ts` |
| Guias | `/guias/<guia>` (8) | `data/seo/guides.ts` |
| Institucional | `/empresas`, `/confeccao-de-uniformes-brasilia`, `/sobre`, `/perguntas-frequentes`, `/glossario`, `/mapa-do-site` e os hubs | páginas + `data/seo/faq-full.ts`, `glossary.ts` |

**Técnico**
- `lib/seo.ts`: metadata por página (canonical, Open Graph, Twitter) e grafo JSON-LD com `Organization`, `LocalBusiness`, `WebSite` com SearchAction, `BreadcrumbList`, `Product`, `ItemList`, `FAQPage`, `Article`, `Service` e `DefinedTermSet`. As entidades se ligam por `@id`.
- `/sitemap.xml` é um **índice** que aponta para 7 sitemaps (`/sitemaps/<grupo>.xml`). No Search Console cada sitemap mostra quantas páginas do grupo foram enviadas e quantas foram indexadas.
- `robots.txt` libera buscadores e robôs de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc.).
- `/llms.txt` (resumo) e `/llms-full.txt` (catálogo com preços, FAQ, tecidos, guias e glossário) são texto para assistentes de IA, gerados dos mesmos dados.
- Imagem de compartilhamento gerada por página (`opengraph-image.tsx`).
- `lib/site-index.ts` é a lista única de páginas e alimenta sitemaps, mapa do site, llms.txt e os links relacionados.

**Passo a passo no Google Search Console**
1. Configure `NEXT_PUBLIC_SITE_URL` com o domínio final. Sem ela, os sitemaps e o llms.txt saem com `localhost`.
2. No Search Console, adicione a propriedade. Para usar o método "tag HTML", cole o código em `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` e faça o deploy. Para o Bing, use `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
3. Em **Sitemaps**, envie apenas `https://SEU-DOMINIO/sitemap.xml`. Os 7 sitemaps filhos são lidos automaticamente.
4. Em **Inspeção de URL**, peça indexação manual das páginas principais: `/`, `/empresas`, `/confeccao-de-uniformes-brasilia`, `/catalogo` e as 8 de `/uniformes/...`.
5. Crie e verifique o **Perfil da Empresa no Google** (Google Meu Negócio) com o mesmo nome, telefone e site. Para buscas locais, ele pesa tanto quanto o site.
6. Acompanhe em **Páginas** e **Desempenho** por sitemap. Um grupo com baixa indexação indica onde reforçar conteúdo ou links.

**Regras de conteúdo:** texto visível sem travessão (— ou –), respostas diretas na primeira frase e nenhum dado comercial inventado. Os preços saem só da planilha, e produtos sem preço aparecem como "sob consulta".

## Pendências (dependem do cliente)

1. **Fotos de produto e vídeo de produção.** Por enquanto os modelos mostram silhuetas técnicas (`Garment`), e o portfólio usa recortes do Instagram, que têm resolução baixa. Para trocar, adicione a foto no manifesto e passe `photoId` ao `Media`.
2. **Cores disponíveis por tecido.** Hoje a cor é campo livre com sugestões.
3. ~~Pedido mínimo e pagamento~~: confirmados em 18/09/2026 (20 peças, dois produtos com 10 iguais de cada; 50% de entrada e o restante na entrega). O prazo segue variável.
4. **Números** (clientes, peças entregues) e **depoimentos**. Estão fora do site até serem confirmados.
5. **Composição dos tecidos do Lab.** A planilha tem erros de digitação e composições só com a proporção. Por exemplo, Smash está como 93/8. Confirmar com a UNIK.
6. **Domínio.** Configurar `NEXT_PUBLIC_SITE_URL`.
7. **Endereço da reunião presencial.** Com o endereço completo, o JSON-LD `LocalBusiness` e o Perfil da Empresa no Google ficam muito mais fortes para busca local.
8. **Atendimento fora do DF.** Se a UNIK entrega para outros estados, dá para ampliar o `areaServed` e criar conteúdo sobre isso. Até lá o site só afirma Brasília/DF.
9. **Afirmações técnicas a validar com a produção:**
   - comparativos de durabilidade entre técnicas;
   - tamanho típico de bordado (7 a 10 cm);
   - etapas do DTF;
   - composição de two way, tactel, oxford e fustão;
   - bordado de nome individual por peça;
   - registro de tecido, cor e arte para reposição;
   - "10 peças iguais" poderem ter tamanhos variados.
10. **Fase 2 (opcional).** E-mail ou CRM para orçamentos e briefings do Lab (a troca fica em `submit`/`send`), CMS para o catálogo e PDF do orçamento.
