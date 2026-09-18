import type { TechniquePage } from '@/data/seo/types'

/**
 * Páginas de técnica (/personalizacao/<TECHNIQUE_URL>).
 *
 * Uma por TechniqueSlug. `compare` sempre com os mesmos rótulos, na mesma
 * ordem, para a tabela comparativa entre técnicas:
 * Durabilidade, Número de cores, Quantidade ideal, Tecidos indicados, Toque na peça.
 */
export const TECHNIQUE_PAGES: readonly TechniquePage[] = [
  /* -------------------------------------------------------- serigrafia */
  {
    technique: 'serigrafia',
    h1: 'Serigrafia em camiseta e uniforme: o que é e quando usar',
    seoTitle: 'Serigrafia em camiseta: o que é e quando compensa',
    description:
      'Serigrafia é a estampa feita com tinta aplicada por tela, uma cor por vez. Cor chapada, alta cobertura e durabilidade de anos em uniformes e camisetas.',
    lead:
      'Serigrafia (ou silk screen) é a técnica de estampa em que a tinta passa por uma tela vazada e é aplicada sobre o tecido, uma cor de cada vez. O resultado é cor chapada, alta cobertura e durabilidade de anos. É a técnica que mais compensa em tiragens grandes, como camisetas de evento e moletons de turma.',
    howItWorks: [
      'A arte é separada em cores: cada cor da estampa vira uma tela diferente.',
      'Cada tela é gravada, deixando abertas só as áreas por onde a tinta vai passar.',
      'A peça é posicionada na mesa e a tinta é puxada com um rodo através da tela, uma cor por vez.',
      'A estampa passa pela cura com calor, que fixa a tinta no tecido.',
      'As peças são conferidas e seguem para dobra e embalagem.',
    ],
    pros: [
      '**Durabilidade de anos**: a tinta curada resiste a muitas lavagens.',
      '**Cor chapada e viva**, com ótima cobertura inclusive em tecidos escuros.',
      '**Custo por peça cai com o volume**: a tela é feita uma vez e serve para o lote todo.',
      '**Estampas grandes**, como costas inteiras de moletom, ficam uniformes e bem definidas.',
    ],
    limits: [
      'Cada cor exige uma tela, então artes com muitas cores encarecem o pedido.',
      'Degradês e fotografias não ficam tão fiéis quanto no [DTF](/personalizacao/dtf).',
      'Em tiragens pequenas, o custo da tela pesa mais no valor de cada peça.',
    ],
    compare: [
      { label: 'Durabilidade', value: 'Alta, anos de uso' },
      { label: 'Número de cores', value: 'Poucas cores, cada uma com sua tela' },
      { label: 'Quantidade ideal', value: 'Médias e grandes tiragens' },
      { label: 'Tecidos indicados', value: 'Algodão, malhas PV e PP, moletom, tactel' },
      { label: 'Toque na peça', value: 'Leve camada de tinta, perceptível ao toque' },
    ],
    sections: [
      {
        id: 'quando-escolher-serigrafia',
        title: 'Quando escolher a serigrafia',
        blocks: [
          {
            kind: 'p',
            text: 'Escolha serigrafia quando a arte tem poucas cores e o pedido tem volume: logo de empresa em uma ou duas cores, camiseta de evento, moletom de formatura com nomes nas costas. Se a arte tem degradê, foto ou muitas cores, o DTF tende a ser mais indicado; se é um logo pequeno no peito de uma polo, o [bordado](/personalizacao/bordado) costuma ficar mais elegante.',
          },
          {
            kind: 'note',
            title: 'Resumo',
            text: 'Poucas cores e muitas peças: serigrafia. Veja a comparação completa em [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao).',
          },
        ],
      },
      {
        id: 'pecas-com-serigrafia',
        title: 'Em quais peças usamos serigrafia',
        blocks: [
          {
            kind: 'p',
            text: 'A serigrafia é a técnica dos [casacos e moletons](/catalogo/linha/casacos-e-moletons) e das [camisetas para eventos](/uniformes/camisetas-para-eventos). O Instituto Federal, do nosso portfólio, é um exemplo de moletom estampado em serigrafia.',
          },
          {
            kind: 'products',
            slugs: ['camiseta-basica', 'moletom-capuz', 'camiseta-oversized', 'polo-malha', 'calca-tactel', 'avental-gabardine'],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Serigrafia e silk screen são a mesma coisa?',
        a: 'Sim. Serigrafia e silk screen são nomes diferentes para a mesma técnica: a tinta é aplicada sobre o tecido através de uma tela vazada, uma cor por vez.',
      },
      {
        q: 'A estampa em serigrafia sai na lavagem?',
        a: 'Não, quando a tinta é curada corretamente. A serigrafia é uma das estampas mais duráveis e aguenta anos de uso e lavagem.',
      },
      {
        q: 'Por que a serigrafia fica mais cara com mais cores?',
        a: 'Porque cada cor da arte precisa de uma tela própria e de uma passada de tinta separada. Por isso a serigrafia é mais vantajosa em artes com poucas cores.',
      },
      {
        q: 'Dá para fazer serigrafia em camiseta preta?',
        a: 'Sim. A serigrafia tem ótima cobertura e funciona bem em tecidos escuros, com cores vivas e opacas.',
      },
    ],
  },

  /* ----------------------------------------------------------- bordado */
  {
    technique: 'bordado',
    h1: 'Bordado em uniforme: logo e nome bordados na peça',
    seoTitle: 'Bordado em uniforme: logo e nome bordados',
    description:
      'Bordado em uniforme é o logo ou nome feito com linha, ponto a ponto, sobre o tecido. Não desbota, não descasca e dá acabamento nobre a polos e dólmãs.',
    lead:
      'Bordado é a personalização feita com linha costurada diretamente no tecido, ponto a ponto, por máquina. É o acabamento mais nobre para logos pequenos e nomes em uniformes: não desbota, não descasca e envelhece junto com a peça. É a escolha padrão para polos, camisas sociais, dólmãs e jalecos.',
    howItWorks: [
      'O logo é convertido em uma matriz de bordado, que define o tipo de ponto, a direção e a ordem de cada cor de linha.',
      'As cores de linha são escolhidas para ficar o mais perto possível da identidade da marca.',
      'A peça é presa em um bastidor, com entretela por trás para dar firmeza.',
      'A máquina borda o desenho ponto a ponto, trocando de linha a cada cor.',
      'O excesso de entretela e as pontas de linha são retirados no acabamento.',
    ],
    pros: [
      '**Durabilidade máxima**: a linha não desbota nem descasca com a lavagem.',
      '**Aparência de alto padrão**, ideal para imagem corporativa.',
      '**Resiste a lavagem frequente**, por isso é o padrão em cozinha e saúde.',
      '**Nome por peça**: dá para bordar o nome de cada colaborador.',
    ],
    limits: [
      'Detalhes muito finos, textos minúsculos e degradês não são reproduzidos com fidelidade.',
      'Não é indicado para áreas grandes, como as costas inteiras de uma camiseta.',
      'Em malhas muito finas, o bordado pesa e pode repuxar o tecido.',
    ],
    compare: [
      { label: 'Durabilidade', value: 'Máxima, dura tanto quanto a peça' },
      { label: 'Número de cores', value: 'Algumas cores de linha por logo' },
      { label: 'Quantidade ideal', value: 'Qualquer quantidade' },
      { label: 'Tecidos indicados', value: 'Piquet, tricoline, two way, brim, gabardine, moletom' },
      { label: 'Toque na peça', value: 'Relevo de linha, textura nobre' },
    ],
    sections: [
      {
        id: 'quando-escolher-bordado',
        title: 'Quando escolher o bordado',
        blocks: [
          {
            kind: 'p',
            text: 'Escolha bordado para logos pequenos no peito, nomes de colaboradores e peças que passam por lavagem frequente. É a técnica padrão em [uniformes corporativos](/uniformes/uniformes-corporativos), [uniformes para restaurantes](/uniformes/uniformes-para-restaurantes) e [uniformes para clínicas](/uniformes/uniformes-para-clinicas-e-saude). Se o logo tem degradê ou detalhes muito finos, vale considerar o [DTF](/personalizacao/dtf).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Um logo bordado no peito esquerdo costuma ter entre 7 e 10 cm de largura. Enviamos o mockup com a posição e o tamanho para aprovação antes de produzir.',
          },
        ],
      },
      {
        id: 'pecas-com-bordado',
        title: 'Em quais peças usamos bordado',
        blocks: [
          {
            kind: 'p',
            text: 'O bordado aparece em quase toda a linha profissional. O Restaurante Versá, do nosso portfólio, tem dólmãs com o logo e os nomes bordados.',
          },
          {
            kind: 'products',
            slugs: ['polo-piquet', 'polo-malha', 'camisa-social', 'dolma', 'jaleco-brim', 'calca-pied-de-poule'],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Bordado desbota com a lavagem?',
        a: 'Não. O bordado é feito com linha costurada no tecido, por isso não desbota nem descasca e resiste a lavagens frequentes.',
      },
      {
        q: 'Qual o tamanho ideal de um logo bordado no peito?',
        a: 'Um logo bordado no peito costuma ter entre 7 e 10 cm de largura. Logos com textos muito pequenos podem precisar de ajuste para ficarem legíveis.',
      },
      {
        q: 'Dá para bordar um nome diferente em cada peça?',
        a: 'Sim. O bordado de nome por peça é comum em dólmãs, jalecos e uniformes de atendimento. Basta enviar a lista de nomes com os tamanhos.',
      },
      {
        q: 'Bordado ou serigrafia: qual escolher?',
        a: 'Bordado para logos pequenos, nomes e imagem mais formal; serigrafia para estampas grandes, poucas cores e grandes volumes.',
      },
    ],
  },

  /* --------------------------------------------------------------- dtf */
  {
    technique: 'dtf',
    h1: 'O que é DTF: estampa digital para camisetas e uniformes',
    seoTitle: 'O que é DTF: estampa digital em camiseta e uniforme',
    description:
      'DTF é a estampa impressa digitalmente em filme e transferida para o tecido por calor. Cores ilimitadas, degradê e foto em qualquer cor de tecido.',
    lead:
      'DTF (Direct to Film) é a técnica em que a arte é impressa digitalmente em um filme especial e depois transferida para o tecido com calor e pressão. Aceita cores ilimitadas, degradês e fotografia com nitidez, em qualquer cor de tecido, sem custo extra por cor. É indicada para artes coloridas e tiragens menores.',
    howItWorks: [
      'A arte é impressa em cores sobre um filme especial, com uma camada de tinta branca por baixo.',
      'Um pó adesivo é aplicado sobre a impressão ainda úmida.',
      'O filme passa por aquecimento, que fixa o adesivo na tinta.',
      'O filme é prensado sobre a peça com calor e pressão, e depois retirado, deixando a estampa no tecido.',
    ],
    pros: [
      '**Cores ilimitadas**, sem custo extra por cor.',
      '**Degradê e foto** com nitidez e detalhes finos.',
      '**Qualquer cor de tecido**, inclusive preto, graças à base branca.',
      '**Funciona em vários tecidos**: algodão, poliéster, misturas.',
      '**Bom para tiragens menores**, porque não exige tela.',
    ],
    limits: [
      'A estampa forma uma película sobre o tecido, com toque diferente do da malha.',
      'Em áreas muito grandes, a película pode deixar a peça menos respirável.',
      'Em grandes volumes de artes com poucas cores, a [serigrafia](/personalizacao/serigrafia) costuma ter custo por peça menor.',
    ],
    compare: [
      { label: 'Durabilidade', value: 'Boa, seguindo os cuidados de lavagem' },
      { label: 'Número de cores', value: 'Ilimitadas, com degradê e foto' },
      { label: 'Quantidade ideal', value: 'Pequenas e médias tiragens' },
      { label: 'Tecidos indicados', value: 'Algodão, poliéster, PV, dry, tactel' },
      { label: 'Toque na peça', value: 'Película fina e flexível' },
    ],
    sections: [
      {
        id: 'quando-escolher-dtf',
        title: 'Quando escolher o DTF',
        blocks: [
          {
            kind: 'p',
            text: 'Escolha DTF quando a arte tem muitas cores, degradê, foto ou detalhes finos, quando a peça é escura e a arte é colorida, ou quando o pedido é menor e não compensa gravar telas. Em malha de poliéster clara, a [sublimação](/personalizacao/sublimacao) também reproduz artes coloridas, sem película.',
          },
          {
            kind: 'note',
            title: 'Cuidados de lavagem',
            text: 'Lave a peça do avesso, em água fria, e não passe ferro diretamente sobre a estampa. Mais dicas em [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao).',
          },
        ],
      },
      {
        id: 'pecas-com-dtf',
        title: 'Em quais peças usamos DTF',
        blocks: [
          {
            kind: 'p',
            text: 'O DTF funciona em quase todo o [catálogo](/catalogo), das camisetas às dólmãs. É comum em [camisetas para eventos](/uniformes/camisetas-para-eventos) com logos de patrocinadores.',
          },
          {
            kind: 'products',
            slugs: ['camiseta-basica', 'camiseta-oversized', 'camiseta-dry', 'polo-malha', 'moletom-capuz', 'dolma'],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'O que significa DTF?',
        a: 'DTF significa Direct to Film. A arte é impressa digitalmente em um filme e depois transferida para o tecido com calor e pressão.',
      },
      {
        q: 'Estampa DTF sai na lavagem?',
        a: 'Não, quando aplicada corretamente e lavada com cuidado: do avesso, em água fria e sem ferro direto sobre a estampa.',
      },
      {
        q: 'DTF ou serigrafia: qual é melhor?',
        a: 'DTF é melhor para artes coloridas, com degradê ou foto, e para tiragens menores. Serigrafia é melhor para artes com poucas cores em grandes volumes.',
      },
      {
        q: 'Dá para fazer DTF em camiseta preta?',
        a: 'Sim. O DTF leva uma camada de tinta branca por baixo da arte, o que garante cores vivas em qualquer cor de tecido, inclusive preto.',
      },
    ],
  },

  /* -------------------------------------------------------- sublimacao */
  {
    technique: 'sublimacao',
    h1: 'Sublimação em tecido: estampa total em malha de poliéster',
    seoTitle: 'Sublimação em tecido: o que é e onde funciona',
    description:
      'Sublimação é a estampa em que a tinta vira gás com o calor e entra na fibra de poliéster. Cobre a peça inteira, não pesa e não sai na lavagem.',
    lead:
      'Sublimação é a técnica em que a tinta, com calor e pressão, passa do estado sólido para gás e se fixa dentro da fibra do tecido. A estampa passa a fazer parte da peça: cobre toda a área, não pesa, não racha e não sai na lavagem. Funciona apenas em tecidos de poliéster e dá o melhor resultado em peças claras, de preferência brancas.',
    howItWorks: [
      'A arte é impressa em papel especial com tinta de sublimação.',
      'O papel é posicionado sobre a peça ou sobre o tecido de poliéster.',
      'A prensa térmica aplica calor e pressão, e a tinta vira gás.',
      'O gás penetra na fibra de poliéster e, ao esfriar, fica preso dentro dela.',
      'O papel é retirado e a estampa já está pronta, sem camada sobre o tecido.',
    ],
    pros: [
      '**Estampa total**: cobre a peça inteira, de costura a costura.',
      '**Não pesa e não esquenta**: a tinta fica dentro da fibra, sem película.',
      '**Não racha e não sai na lavagem**.',
      '**Cores ilimitadas**, degradês e fotos.',
      '**Mantém a respirabilidade** das malhas dry.',
    ],
    limits: [
      'Funciona apenas em poliéster: não serve para algodão nem para poliamida.',
      'Não imprime branco, então o resultado é melhor em peças claras. Em tecido escuro, as cores não aparecem.',
      'Em algumas peças podem aparecer pequenas áreas sem cor nas dobras e costuras.',
    ],
    compare: [
      { label: 'Durabilidade', value: 'Máxima, a tinta fica dentro da fibra' },
      { label: 'Número de cores', value: 'Ilimitadas, com degradê e foto' },
      { label: 'Quantidade ideal', value: 'Pequenas a grandes tiragens' },
      { label: 'Tecidos indicados', value: 'Somente poliéster claro (dry, UV Fluid poliéster)' },
      { label: 'Toque na peça', value: 'Nenhum, igual ao tecido' },
    ],
    sections: [
      {
        id: 'quando-escolher-sublimacao',
        title: 'Quando escolher a sublimação',
        blocks: [
          {
            kind: 'p',
            text: 'Escolha sublimação para [uniformes esportivos](/uniformes/uniformes-esportivos), camisetas de corrida, abadás e peças com arte na peça inteira. A malha precisa ser de poliéster e, de preferência, branca ou clara. Para algodão ou peças escuras, use [DTF](/personalizacao/dtf) ou [serigrafia](/personalizacao/serigrafia).',
          },
          {
            kind: 'note',
            title: 'Atenção à malha',
            text: 'Na linha esportiva, as malhas de poliamida (dry poliamida e UV Fluid poliamida) não aceitam sublimação. Para estampa total, escolha as versões em poliéster. Saiba mais no guia de [dry fit](/tecidos/dry-fit).',
          },
        ],
      },
      {
        id: 'pecas-com-sublimacao',
        title: 'Em quais peças usamos sublimação',
        blocks: [
          {
            kind: 'p',
            text: 'A sublimação é a técnica da linha de [camisetas dry fit](/catalogo/linha/camisetas-dry-fit).',
          },
          {
            kind: 'products',
            slugs: ['camiseta-dry', 'camiseta-dry-manga-longa', 'camiseta-uv', 'camiseta-pesca', 'polo-dry'],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Dá para fazer sublimação em algodão?',
        a: 'Não. A sublimação só se fixa em fibras de poliéster. Em algodão, a tinta sai na primeira lavagem. Para algodão, use serigrafia, DTF ou bordado.',
      },
      {
        q: 'Dá para sublimar em camiseta preta?',
        a: 'Não com bom resultado. A sublimação não imprime branco e as cores são transparentes, então só aparecem bem em tecidos brancos ou claros.',
      },
      {
        q: 'A sublimação sai com a lavagem?',
        a: 'Não. A tinta fica dentro da fibra do poliéster, por isso a estampa não sai, não racha e não descasca com a lavagem.',
      },
      {
        q: 'Qual a diferença entre sublimação e DTF?',
        a: 'Na sublimação a tinta entra na fibra e não tem toque, mas só funciona em poliéster claro. No DTF a estampa fica sobre o tecido como uma película fina e funciona em qualquer tecido e cor.',
      },
    ],
  },

  /* -------------------------------------------------------- alto-relevo */
  {
    technique: 'alto-relevo',
    h1: 'Estampa em alto relevo: volume e textura na peça',
    seoTitle: 'Estampa alto relevo: volume e textura na camiseta',
    description:
      'Estampa em alto relevo é a arte com volume, que se sente com a mão. O acabamento assinatura do UNIK Lab para marcas próprias e coleções em Brasília.',
    lead:
      'Estampa em alto relevo é a arte aplicada com uma tinta ou efeito que ganha volume sobre o tecido, como o puff ou o silicone, e pode ser sentida com a mão. É o acabamento assinatura do [UNIK Lab](/lab), a frente da UNIK para marcas autorais: dá à peça uma identidade tátil que uma estampa comum não tem.',
    howItWorks: [
      'A arte é avaliada para definir quais áreas ganham volume e quais ficam lisas.',
      'A base da estampa é aplicada na peça, geralmente por tela, como na serigrafia.',
      'A camada de tinta com efeito de volume é aplicada sobre as áreas escolhidas.',
      'A peça passa pelo calor, que forma e fixa o relevo.',
      'O resultado é conferido ao toque e visualmente antes da embalagem.',
    ],
    pros: [
      '**Identidade tátil**: a estampa é sentida com a mão, não só vista.',
      '**Aparência de peça de coleção**, ideal para marcas próprias.',
      '**Destaca logos e tipografia** com profundidade e sombra natural.',
      '**Combina com outras técnicas** na mesma peça, como relevo no logo e estampa lisa no restante.',
    ],
    limits: [
      'Não é indicado para detalhes muito finos, textos pequenos ou degradês.',
      'O volume deixa a área estampada menos flexível e menos respirável.',
      'Exige mais cuidado na lavagem: do avesso e sem ferro sobre a estampa.',
    ],
    compare: [
      { label: 'Durabilidade', value: 'Boa, com os cuidados de lavagem' },
      { label: 'Número de cores', value: 'Poucas cores, com áreas de volume' },
      { label: 'Quantidade ideal', value: 'Coleções e lotes de marca' },
      { label: 'Tecidos indicados', value: 'Algodão encorpado, suedine, moletom' },
      { label: 'Toque na peça', value: 'Volume marcado, sentido com a mão' },
    ],
    sections: [
      {
        id: 'quando-escolher-alto-relevo',
        title: 'Quando escolher o alto relevo',
        blocks: [
          {
            kind: 'p',
            text: 'Escolha alto relevo quando a peça é produto, não só uniforme: coleções de marca própria, drops, peças-assinatura e kits premium. Para uniformes de rotina e grandes volumes, a [serigrafia](/personalizacao/serigrafia) comum é mais prática. Se você está criando uma marca, o guia [como criar marca de roupa private label](/guias/como-criar-marca-de-roupa-private-label) explica o caminho.',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'O relevo funciona melhor em logos e tipografias de traço grosso. O mockup para aprovação mostra quais áreas ganham volume antes da produção.',
          },
        ],
      },
      {
        id: 'pecas-com-alto-relevo',
        title: 'Em quais peças usamos alto relevo',
        blocks: [
          {
            kind: 'p',
            text: 'O alto relevo pede malha encorpada, que sustenta o volume sem repuxar. Por isso aparece principalmente nas peças do UNIK Lab em algodão encorpado, suedine e [moletom](/tecidos/moletom).',
          },
          { kind: 'products', slugs: ['camiseta-oversized', 'moletom-capuz', 'camiseta-pima'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é estampa em alto relevo?',
        a: 'É uma estampa feita com tinta ou efeito que ganha volume sobre o tecido, como puff ou silicone, e que pode ser sentida com a mão, criando textura e profundidade.',
      },
      {
        q: 'Estampa em alto relevo sai na lavagem?',
        a: 'Não, quando a peça é lavada com cuidado: do avesso, em água fria e sem passar ferro sobre a estampa, para preservar o volume.',
      },
      {
        q: 'Em quais peças o alto relevo fica melhor?',
        a: 'Em malhas encorpadas, como camisetas oversized de algodão, peças em suedine e moletons, que sustentam o volume da estampa sem repuxar.',
      },
      {
        q: 'O que é o UNIK Lab?',
        a: 'O UNIK Lab é a frente da UNIK dedicada a marcas autorais e coleções próprias, e o alto relevo é o acabamento assinatura do Lab.',
      },
    ],
  },
]
