import type { FabricGuide } from '@/data/seo/types'

/**
 * Guia de tecidos: uma entrada por slug de FABRIC_SLUGS, na mesma ordem.
 * Texto didático para quem compra uniforme (compras, RH, marketing),
 * não para especialista têxtil.
 */
export const FABRIC_GUIDES: readonly FabricGuide[] = [
  /* ------------------------------------------------------------ malha PV */
  {
    slug: 'malha-pv',
    name: 'Malha PV',
    aka: ['tecido PV', 'poliviscose', 'malha poliviscose', 'PV poliéster viscose'],
    summary: 'Malha PV é a mistura de poliéster e viscose: leve, macia, amassa pouco e aguenta lavagem frequente. Uma das mais usadas em uniformes.',
    definition:
      'Malha PV é uma malha feita da mistura de fios de **poliéster** e **viscose**. O poliéster traz resistência e ajuda a peça a manter a forma; a viscose traz maciez e frescor. O resultado é uma malha leve, com bom caimento e fácil de cuidar, por isso ela aparece em tantas [polos](/catalogo/polo-malha) e [camisetas](/catalogo/camiseta-basica) de uniforme.',
    composition: 'Poliéster e viscose (PV), em proporções que variam conforme o fornecedor.',
    traits: [
      { label: 'Toque', value: 'Macio e leve' },
      { label: 'Caimento', value: 'Fluido' },
      { label: 'Respirabilidade', value: 'Boa' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Uniforme de dia a dia para equipes de escritório, loja e atendimento',
      'Polos e camisetas que vão para a máquina toda semana',
      'Empresas que querem conforto sem pagar o preço do algodão nobre',
      'Equipes de campo que precisam de [manga longa](/catalogo/camiseta-manga-longa) leve',
    ],
    avoidFor: [
      'Sublimação: a parte de viscose não fixa a tinta, e a cor sai fraca',
      'Quem busca o toque 100% natural do algodão',
    ],
    care: [
      'Lavar do avesso, em água fria ou morna',
      'Evitar alvejante com cloro',
      'Secar à sombra para preservar a cor',
      'Passar em temperatura baixa a média, se necessário',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'A malha PV é mais lisa e mais fria ao toque que o algodão, com um leve brilho. Ela estica pouco, volta ao lugar e quase não amassa ao sair da máquina.',
          },
          {
            kind: 'ul',
            items: [
              '**Peso**: leve a médio, confortável em clima quente',
              '**Superfície**: lisa, sem pelos aparentes',
              '**Depois de lavar**: seca mais rápido que o algodão e encolhe menos',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: uniforme de empresa',
        blocks: [
          {
            kind: 'p',
            text: 'Para a maioria das empresas, a PV é o ponto de equilíbrio: fica bem no corpo, dura muitas lavagens e mantém o custo por peça sob controle. Recebe bem o [bordado](/personalizacao/bordado) do logo no peito e a [serigrafia](/personalizacao/serigrafia) em tiragens maiores.',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Se a dúvida é entre PV e algodão, pense no uso: para lavar toda semana e manter a equipe padronizada por mais tempo, a PV costuma render mais. Veja a comparação completa no [guia de tecidos para uniforme](/guias/tecidos-para-uniforme).',
          },
          { kind: 'products', slugs: ['polo-malha', 'camiseta-basica', 'camiseta-manga-longa'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que significa PV no tecido?',
        a: 'PV é a sigla de poliéster e viscose, as duas fibras que formam a malha. O poliéster dá resistência e a viscose dá maciez, por isso a PV é tão comum em uniformes.',
      },
      {
        q: 'Malha PV esquenta?',
        a: 'A malha PV é leve e tem boa respirabilidade, graças à viscose. Ela esquenta menos que uma malha 100% poliéster comum e é confortável para uso diário em clima quente.',
      },
      {
        q: 'Dá para sublimar em malha PV?',
        a: 'Não é o indicado. A sublimação só se fixa no poliéster, então a parte de viscose fica sem cor e a estampa sai desbotada. Para PV, prefira bordado, serigrafia ou DTF.',
      },
    ],
  },

  /* ------------------------------------------------------------ malha PP */
  {
    slug: 'malha-pp',
    name: 'Malha PP',
    aka: ['tecido PP', 'malha 100% poliéster', 'malha poliéster'],
    summary: 'Malha PP é a malha 100% poliéster: a opção mais econômica para camisetas de evento e grandes volumes, resistente e fácil de lavar.',
    definition:
      'Malha PP é uma malha feita **100% de poliéster**. É leve, resistente, seca rápido e quase não encolhe. Por ter o menor custo entre as malhas, é a escolha comum para [camisetas de evento](/uniformes/camisetas-para-eventos), ações promocionais e pedidos de grande volume.',
    composition: '100% poliéster.',
    traits: [
      { label: 'Toque', value: 'Liso, sintético' },
      { label: 'Caimento', value: 'Médio' },
      { label: 'Respirabilidade', value: 'Média' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Baixo' },
    ],
    idealFor: [
      'Camisetas de evento, campanha e ação promocional',
      'Pedidos de grande volume em que o custo por peça pesa',
      'Estampas por sublimação em peças claras',
      'Uso curto ou esporádico, como corridas e feiras',
    ],
    avoidFor: [
      'Uniforme de uso diário e longo em ambiente muito quente',
      'Quem espera o toque macio do algodão',
    ],
    care: [
      'Lavar em água fria, do avesso',
      'Não usar ferro quente diretamente sobre a estampa',
      'Evitar secadora em temperatura alta',
    ],
    techniques: ['serigrafia', 'dtf', 'bordado', 'sublimacao'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'A malha PP tem toque liso e um pouco mais sintético que a PV ou o algodão. É leve, quase não amassa e seca muito rápido depois de lavada.',
          },
          {
            kind: 'ul',
            items: [
              '**Cor**: mantém bem a cor com o tempo',
              '**Encolhimento**: praticamente nenhum',
              '**Estampa**: aceita sublimação, que não aparece em malhas com algodão ou viscose',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: camiseta de evento e volume',
        blocks: [
          {
            kind: 'p',
            text: 'Quando a meta é vestir muita gente com o mesmo visual, a PP entrega o menor custo por peça. Com [serigrafia](/personalizacao/serigrafia) em tiragem grande, o valor unitário cai ainda mais.',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Se a peça for clara e a arte cobrir a camiseta inteira, a [sublimação](/personalizacao/sublimacao) é uma opção. Em peça escura, use serigrafia ou DTF.',
          },
          { kind: 'products', slugs: ['camiseta-basica'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é malha PP?',
        a: 'Malha PP é uma malha 100% poliéster. É a opção mais econômica para camisetas, muito usada em eventos e pedidos de grande volume.',
      },
      {
        q: 'Malha PP é boa para uniforme do dia a dia?',
        a: 'Ela é resistente e fácil de lavar, mas respira menos que PV e algodão. Para uso diário e prolongado, principalmente em lugares quentes, a PV ou o algodão costumam ser mais confortáveis.',
      },
      {
        q: 'Qual a diferença entre malha PP e PV?',
        a: 'A PP é 100% poliéster, mais barata e ideal para sublimação em peças claras. A PV mistura poliéster com viscose, fica mais macia e fresca, e é mais indicada para uniforme de uso diário.',
      },
    ],
  },

  /* ------------------------------------------------------------- algodão */
  {
    slug: 'algodao',
    name: 'Algodão',
    aka: ['malha de algodão', 'malha 100% algodão', 'algodão penteado', 'camiseta de algodão'],
    summary: 'Malha de algodão é feita de fibra natural: macia, respira bem e tem toque confortável. Ótima para camisetas, polos e oversized.',
    definition:
      'Malha de algodão é uma malha feita com fio de **algodão**, uma fibra natural. Ela é macia, absorve umidade e deixa a pele respirar, por isso é a referência de conforto em camisetas. No uniforme, o algodão passa sensação de qualidade e combina com marcas que valorizam o toque natural.',
    composition: '100% algodão, em fio 30.1 ou algodão premium; também disponível com elastano, para peças que vestem mais junto ao corpo.',
    traits: [
      { label: 'Toque', value: 'Natural e macio' },
      { label: 'Caimento', value: 'Encorpado' },
      { label: 'Respirabilidade', value: 'Alta' },
      { label: 'Durabilidade', value: 'Média a alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Camisetas de equipe e de marca que valorizam o toque natural',
      '[Camisetas oversized](/catalogo/camiseta-oversized) com estampa grande',
      'Polos para ambientes internos e clima quente',
      'Peças com alto relevo e serigrafia',
    ],
    avoidFor: [
      'Sublimação: a tinta não se fixa no algodão',
      'Atividades com muito suor, em que a malha dry seca mais rápido',
    ],
    care: [
      'Lavar do avesso em água fria para reduzir encolhimento',
      'Separar cores claras e escuras',
      'Secar à sombra',
      'Passar do avesso quando houver estampa',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf', 'alto-relevo'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O algodão tem toque seco e macio, sem o brilho das fibras sintéticas. Ele absorve água com facilidade e demora um pouco mais para secar.',
          },
          {
            kind: 'ul',
            items: [
              '**Fio 30.1**: fio fino e penteado, que deixa a malha leve e com toque liso',
              '**Com elastano**: estica e volta, veste mais junto ao corpo (em camisetas e polos)',
              '**Algodão premium**: fibras mais longas e toque mais nobre, como o pima, o egípcio e o peruano',
              '**Encolhimento**: pode encolher um pouco se lavado em água quente',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: uniforme de empresa',
        blocks: [
          {
            kind: 'p',
            text: 'O algodão é ótimo para uniformes que precisam passar conforto e qualidade na primeira vestida. Recebe muito bem [serigrafia](/personalizacao/serigrafia) e [alto relevo](/personalizacao/alto-relevo), técnicas que ganham contraste e textura na fibra natural.',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Para lavagem muito frequente e equipe grande, compare com a [malha PV](/tecidos/malha-pv), que amassa e encolhe menos. Para um toque ainda mais nobre, veja o [algodão pima](/tecidos/algodao-pima).',
          },
          { kind: 'products', slugs: ['camiseta-basica', 'polo-malha', 'camiseta-oversized'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Camiseta de algodão encolhe?',
        a: 'Pode encolher um pouco, principalmente se lavada em água quente ou seca em secadora. Lavar em água fria e secar à sombra ajuda a manter o tamanho original.',
      },
      {
        q: 'Algodão ou PV: qual é melhor para uniforme?',
        a: 'O algodão tem toque mais natural e respira melhor. A PV amassa menos, seca mais rápido e aguenta lavagem frequente com menos desgaste, por isso depende do uso que a equipe vai fazer da peça.',
      },
      {
        q: 'Dá para sublimar em camiseta de algodão?',
        a: 'Não. A sublimação só se fixa em fibras de poliéster. Em algodão, as opções indicadas são serigrafia, DTF, bordado e alto relevo.',
      },
    ],
  },

  /* ------------------------------------------------------- algodão pima */
  {
    slug: 'algodao-pima',
    name: 'Algodão Pima',
    aka: ['malha pima', 'camiseta pima', 'algodão premium', 'algodão peruano'],
    summary: 'Algodão pima é um algodão de fibra extralonga: toque sedoso, brilho natural e menos bolinhas. A malha mais nobre para camisetas.',
    definition:
      'Algodão pima é um tipo de algodão de **fibra extralonga**, mais comprida que a do algodão comum. Fibras longas formam um fio mais liso e resistente, o que dá à malha toque sedoso, brilho natural e menor tendência a formar bolinhas. É a escolha de marcas e empresas que querem uma camiseta de padrão premium.',
    composition: 'Algodão pima (fibra extralonga).',
    traits: [
      { label: 'Toque', value: 'Sedoso' },
      { label: 'Caimento', value: 'Fluido e nobre' },
      { label: 'Respirabilidade', value: 'Alta' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Alto' },
    ],
    idealFor: [
      'Camisetas de marca própria e coleções premium',
      'Uniforme de equipes de atendimento em lojas de alto padrão',
      'Kits de boas-vindas e brindes corporativos especiais',
    ],
    avoidFor: [
      'Camisetas de evento de uso único, em que o custo por peça pesa mais',
      'Sublimação, que não funciona em algodão',
    ],
    care: [
      'Lavar do avesso em água fria',
      'Usar sabão neutro e evitar alvejante',
      'Secar à sombra, de preferência estendida',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf', 'alto-relevo'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'Ao tocar, a diferença aparece logo: a malha pima é mais lisa, mais fria e tem um brilho discreto que o algodão comum não tem. Depois de várias lavagens, ela continua com a superfície limpa.',
          },
          {
            kind: 'ul',
            items: [
              '**Fio**: mais longo e uniforme',
              '**Superfície**: lisa, com poucos pelos soltos',
              '**Envelhecimento**: resiste melhor ao aspecto gasto',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: quando vale o investimento',
        blocks: [
          {
            kind: 'p',
            text: 'A pima vale quando a peça é vitrine da marca: quem veste sente a diferença. Na [camiseta algodão premium](/catalogo/camiseta-pima), ela divide a linha com outros algodões nobres, como o egípcio e o peruano. É muito procurada por quem está criando uma marca de roupa, tema do nosso [guia de private label](/guias/como-criar-marca-de-roupa-private-label) e do [UNIK Lab](/lab).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Combine a pima com um [bordado](/personalizacao/bordado) pequeno ou um alto relevo discreto: o acabamento sutil valoriza o tecido.',
          },
          { kind: 'products', slugs: ['camiseta-pima'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual a diferença entre algodão pima e algodão comum?',
        a: 'O algodão pima tem fibras mais longas, que formam um fio mais liso e resistente. Isso deixa a malha mais macia, com brilho natural e menos bolinhas que o algodão comum.',
      },
      {
        q: 'Camiseta pima faz bolinha?',
        a: 'Tende a fazer bem menos que o algodão comum, porque a fibra longa solta menos pontas. Lavar do avesso e evitar atrito com peças ásperas ajuda a manter a superfície lisa.',
      },
      {
        q: 'Algodão pima vale a pena para uniforme?',
        a: 'Vale quando a camiseta representa a marca de perto, como em lojas de alto padrão, kits especiais ou marca própria. Para eventos de uso único, malhas como PV ou PP costumam ter melhor custo por peça.',
      },
    ],
  },

  /* ------------------------------------------------------------- suedine */
  {
    slug: 'suedine',
    name: 'Suedine',
    aka: ['malha suedine', 'camiseta suedine', 'malha peletizada'],
    summary: 'Suedine é uma malha com acabamento aveludado, de toque de pêssego. Dá cara premium a camisetas e polos sem sair do uso diário.',
    definition:
      'Suedine é uma malha com um **acabamento que deixa a superfície levemente aveludada**, com toque parecido com casca de pêssego. O nome vem de "suede", camurça em inglês. Na prática, é uma camiseta ou polo com sensação mais sofisticada que a malha comum, muito usada em uniformes de marca e coleções.',
    composition: 'Malha de algodão ou algodão com poliéster, com acabamento de superfície aveludada (a composição varia conforme o fornecedor).',
    traits: [
      { label: 'Toque', value: 'Aveludado' },
      { label: 'Caimento', value: 'Encorpado' },
      { label: 'Respirabilidade', value: 'Boa' },
      { label: 'Durabilidade', value: 'Média a alta' },
      { label: 'Custo', value: 'Médio a alto' },
    ],
    idealFor: [
      'Polos e camisetas de atendimento com visual premium',
      'Camisetas oversized de marcas autorais',
      'Uniformes de varejo de moda e lojas de conceito',
    ],
    avoidFor: [
      'Sublimação, que não se fixa bem nesse tipo de malha',
      'Pedidos em que o menor custo por peça é a prioridade',
    ],
    care: [
      'Lavar do avesso em água fria',
      'Evitar amaciante em excesso e alvejante',
      'Secar à sombra, sem secadora quente',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'Passe a mão na malha: a suedine tem uma leve penugem, macia e fosca, sem o brilho das sintéticas. As cores ficam com aspecto mais suave e aveludado.',
          },
          {
            kind: 'ul',
            items: [
              '**Superfície**: fosca e aveludada',
              '**Cor**: tom mais suave, levemente "lavado"',
              '**Peso**: encorpado, com bom caimento',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: uniforme com cara de coleção',
        blocks: [
          {
            kind: 'p',
            text: 'A suedine é uma forma de subir o padrão do uniforme sem mudar de modelo. Uma [polo em suedine](/catalogo/polo-malha) com logo bordado passa uma imagem mais cuidadosa que a malha lisa comum.',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Em estampas grandes, a [serigrafia](/personalizacao/serigrafia) e o [DTF](/personalizacao/dtf) funcionam bem. Para logo pequeno no peito, o bordado combina com o toque aveludado.',
          },
          { kind: 'products', slugs: ['polo-malha', 'camiseta-basica', 'camiseta-oversized'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é malha suedine?',
        a: 'Suedine é uma malha com acabamento que deixa a superfície aveludada, com toque de pêssego. É usada em camisetas e polos que querem uma sensação mais premium.',
      },
      {
        q: 'Suedine é quente?',
        a: 'A suedine é um pouco mais encorpada que uma malha lisa comum, mas continua sendo confortável para o dia a dia. Em ambientes muito quentes e com muito movimento, malhas mais leves como PV ou dry podem ser mais frescas.',
      },
      {
        q: 'Qual a diferença entre suedine e algodão comum?',
        a: 'A diferença está no acabamento: a suedine passa por um processo que deixa a superfície aveludada e fosca. O algodão comum tem toque mais seco e liso.',
      },
    ],
  },

  /* -------------------------------------------------------------- piquet */
  {
    slug: 'piquet',
    name: 'Piquet',
    aka: ['malha piquet', 'piquê', 'polo piquet', 'tecido piquet'],
    summary: 'Piquet é a malha de trama em colmeia da camisa polo clássica: estruturada, respira bem e é ótima para bordado. O padrão do uniforme corporativo.',
    definition:
      'Piquet é uma malha com **trama em colmeia**, que forma pequenos relevos na superfície do tecido. Essa textura deixa a malha mais estruturada e cheia de microespaços por onde o ar circula. É o tecido da [camisa polo](/catalogo/polo-piquet) clássica e um dos mais usados em [uniformes corporativos](/uniformes/uniformes-corporativos).',
    composition: 'Varia por linha: piquet PV (poliéster e viscose), piquet PA (poliéster e algodão) e piquet conforto (linha de toque mais macio).',
    traits: [
      { label: 'Toque', value: 'Texturizado' },
      { label: 'Caimento', value: 'Estruturado' },
      { label: 'Respirabilidade', value: 'Alta' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Polos de equipes de escritório, comercial e atendimento',
      'Uniformes de hotelaria, saúde e varejo',
      'Logo bordado no peito, que fica firme e bem definido',
      'Empresas que querem visual arrumado sem camisa social',
    ],
    avoidFor: [
      'Estampas grandes com detalhes finos, que perdem definição na textura',
      'Sublimação, por causa das fibras naturais ou artificiais da mistura',
    ],
    care: [
      'Lavar do avesso para preservar o bordado',
      'Abotoar a gola antes de lavar para manter o formato',
      'Secar à sombra, no cabide',
      'Evitar alvejante com cloro',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'Olhe de perto: o piquet tem pequenos quadradinhos ou favos em relevo, como uma colmeia. A malha é mais firme que a de uma camiseta e segura a forma da gola.',
          },
          {
            kind: 'ul',
            items: [
              '**Piquet PV**: o mais versátil, leve e fácil de lavar',
              '**Piquet PA**: poliéster com algodão, mais encorpado',
              '**Piquet conforto**: linha nobre, toque macio e caimento de alfaiataria',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: a polo da equipe',
        blocks: [
          {
            kind: 'p',
            text: 'O piquet é a escolha segura para padronizar a equipe: fica bem em todos os biotipos, aguenta lavagem frequente e leva o logo [bordado](/personalizacao/bordado) com ótimo acabamento. Veja todas as opções na [linha de camisas polo](/catalogo/linha/camisas-polo).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Para equipes de rua ou esporte, compare com a [polo dry](/catalogo/polo-dry), que seca mais rápido. Para escritório e atendimento, o piquet passa mais formalidade.',
          },
          { kind: 'products', slugs: ['polo-piquet'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual a diferença entre polo piquet e polo de malha comum?',
        a: 'O piquet tem trama em colmeia, que deixa o tecido mais estruturado e respirável. A malha comum é lisa, mais leve e tem caimento mais solto.',
      },
      {
        q: 'Piquet PV ou piquet PA: qual escolher?',
        a: 'O piquet PV (poliéster e viscose) é leve, macio e fácil de lavar. O piquet PA (poliéster e algodão) é mais encorpado e tem toque mais próximo do algodão, então a escolha depende do clima e da formalidade desejada.',
      },
      {
        q: 'Piquet é bom para bordado?',
        a: 'Sim, é um dos melhores tecidos para bordado. A trama firme segura os pontos, e o logo fica bem definido mesmo depois de muitas lavagens.',
      },
    ],
  },

  /* ------------------------------------------------------------- dry fit */
  {
    slug: 'dry-fit',
    name: 'Dry fit',
    aka: ['malha dry', 'dry fit', 'tecido dry', 'dryfit'],
    summary: 'Dry fit é a malha técnica que afasta o suor da pele e seca rápido. Base de uniformes esportivos, aceita sublimação total em cores claras.',
    definition:
      'Dry fit é o nome popular das **malhas técnicas de secagem rápida**, feitas de poliéster ou poliamida. A construção do fio puxa o suor da pele para a superfície do tecido, onde ele evapora rápido. Por isso a peça fica mais leve e seca durante o esforço, o que faz do dry a base dos [uniformes esportivos](/uniformes/uniformes-esportivos).',
    composition: 'Poliéster técnico ou poliamida, com versões com elastano e texturizadas.',
    traits: [
      { label: 'Toque', value: 'Leve e liso' },
      { label: 'Caimento', value: 'Leve' },
      { label: 'Respirabilidade', value: 'Muito alta' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Uniformes de corrida, academia, torneio e equipes esportivas',
      'Equipes de campo e de rua que trabalham em movimento',
      'Estampa total por sublimação em peças claras de poliéster',
      'Pesca e esportes ao ar livre, na versão manga longa',
    ],
    avoidFor: [
      'Ambientes formais, em que o visual esportivo destoa',
      'Quem prefere o toque natural do algodão',
    ],
    care: [
      'Lavar em água fria, sem amaciante (ele reduz a capacidade de secagem)',
      'Não passar ferro quente sobre a malha',
      'Secar à sombra; a malha seca rápido naturalmente',
    ],
    techniques: ['sublimacao', 'serigrafia', 'dtf', 'bordado'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'A malha dry é leve, lisa e muitas vezes tem uma trama furadinha ou texturizada. Molhe um canto: a água se espalha e seca bem mais rápido do que no algodão.',
          },
          {
            kind: 'ul',
            items: [
              '**Dry de poliéster**: leve, o mais versátil e o que aceita sublimação',
              '**Dry com elastano**: estica e acompanha o movimento; existe também a versão respirável, com trama mais aberta',
              '**Dry texturizado**: trama com relevo e visual esportivo',
              '**Dry de poliamida**: toque gelado e alta performance, com ou sem elastano (não aceita sublimação)',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: uniforme esportivo e de campo',
        blocks: [
          {
            kind: 'p',
            text: 'O dry de poliéster claro é o parceiro ideal da [sublimação](/personalizacao/sublimacao): a arte pode cobrir a peça inteira, não pesa e não sai na lavagem. Em peças escuras, use serigrafia ou DTF. Veja a [linha dry fit completa](/catalogo/linha/camisetas-dry-fit).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Para quem trabalha no sol, considere a manga longa ou o [UV fluid](/tecidos/uv-fluid), que protege os braços da radiação.',
          },
          { kind: 'products', slugs: ['camiseta-dry', 'polo-dry', 'camiseta-dry-manga-longa', 'camiseta-pesca'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é tecido dry fit?',
        a: 'Dry fit é uma malha técnica de poliéster ou poliamida que afasta o suor da pele e seca rápido. É muito usada em uniformes esportivos e em equipes que trabalham em movimento.',
      },
      {
        q: 'Todo dry aceita sublimação?',
        a: 'Não. A sublimação só se fixa no poliéster e funciona bem em cores claras. O dry de poliamida, por exemplo, precisa de outras técnicas, como serigrafia, DTF ou bordado.',
      },
      {
        q: 'Pode usar amaciante em camiseta dry?',
        a: 'O ideal é não usar. O amaciante cria uma película no fio que atrapalha a secagem rápida, justamente a principal vantagem da malha dry.',
      },
    ],
  },

  /* ------------------------------------------------------------ UV fluid */
  {
    slug: 'uv-fluid',
    name: 'UV Fluid',
    aka: ['malha com proteção UV', 'camiseta proteção UV', 'dry UV', 'tecido UV'],
    summary: 'UV Fluid é uma malha fluida com proteção contra raios UV, em poliamida ou poliéster. Para quem trabalha ou treina sob o sol.',
    definition:
      'UV Fluid é uma **malha leve e fluida com proteção contra a radiação ultravioleta**. O tecido bloqueia parte dos raios do sol antes que eles cheguem à pele, e o caimento solto deixa a peça fresca. Em manga longa, é o uniforme indicado para equipes que passam o dia ao ar livre.',
    composition: 'Poliamida ou poliéster, com tratamento de proteção UV.',
    traits: [
      { label: 'Toque', value: 'Gelado e fluido' },
      { label: 'Caimento', value: 'Fluido' },
      { label: 'Respirabilidade', value: 'Alta' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio a alto' },
    ],
    idealFor: [
      'Equipes de campo, obras, agro e serviços externos',
      'Esportes ao ar livre, corrida e pesca',
      'Eventos ao ar livre com a equipe exposta ao sol',
    ],
    avoidFor: [
      'Sublimação na versão de poliamida (só a versão de poliéster aceita)',
      'Ambientes internos formais',
    ],
    care: [
      'Lavar em água fria, sem amaciante',
      'Evitar alvejante e secadora quente',
      'Secar à sombra',
    ],
    techniques: ['sublimacao', 'serigrafia', 'dtf', 'bordado'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'A UV Fluid é leve, escorregadia e fresca ao toque, com caimento que acompanha o corpo sem apertar. A versão de poliamida tem toque mais gelado; a de poliéster aceita sublimação.',
          },
          {
            kind: 'ul',
            items: [
              '**UV Fluid poliamida**: toque gelado, sensação de frescor',
              '**UV Fluid poliéster**: proteção UV e estampa por sublimação em cores claras',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: equipe que trabalha no sol',
        blocks: [
          {
            kind: 'p',
            text: 'Para equipes externas, a manga longa em UV Fluid protege os braços e mantém a equipe identificada. Se a arte cobrir a peça inteira, escolha a versão de poliéster e a [sublimação](/personalizacao/sublimacao). Veja mais em [uniformes esportivos](/uniformes/uniformes-esportivos).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'A proteção UV do tecido complementa, mas não substitui, outros cuidados com o sol. Para treino e esforço intenso, compare também com o [dry fit](/tecidos/dry-fit).',
          },
          { kind: 'products', slugs: ['camiseta-uv'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Camiseta UV protege mesmo do sol?',
        a: 'Sim, o tecido com proteção UV bloqueia parte da radiação antes que ela chegue à pele. Ela funciona melhor em manga longa, cobrindo mais área do corpo, e complementa outros cuidados com o sol.',
      },
      {
        q: 'Qual a diferença entre UV Fluid de poliamida e de poliéster?',
        a: 'A poliamida tem toque mais gelado e macio. O poliéster aceita sublimação em cores claras, o que permite estampar a peça inteira.',
      },
      {
        q: 'UV Fluid serve como uniforme de trabalho?',
        a: 'Serve muito bem para equipes que trabalham ao ar livre, como campo, obras e eventos externos. A peça é leve, fresca e pode levar o logo da empresa por serigrafia, DTF, bordado ou sublimação.',
      },
    ],
  },

  /* ----------------------------------------------------------- tricoline */
  {
    slug: 'tricoline',
    name: 'Tricoline',
    aka: ['tecido tricoline', 'camisa tricoline', 'tricoline com elastano'],
    summary: 'Tricoline é o tecido plano de trama fechada das camisas sociais: liso, leve e elegante. Com elastano, amassa pouco e veste bem o dia todo.',
    definition:
      'Tricoline é um **tecido plano de trama fechada e superfície lisa**, o clássico das camisas sociais. Ele é leve, tem leve brilho e passa uma imagem arrumada. Na versão com elastano, ganha um pouco de elasticidade e amassa menos, o que ajuda quem passa o dia atendendo.',
    composition: 'Tradicionalmente algodão ou algodão com poliéster. A camisa social UNIK é feita em tricoline, tricoline com elastano ou algodão.',
    traits: [
      { label: 'Toque', value: 'Liso e leve' },
      { label: 'Caimento', value: 'Social' },
      { label: 'Respirabilidade', value: 'Boa' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Recepção, atendimento e equipes comerciais',
      'Hotelaria e salão de restaurante',
      'Clínicas e consultórios que pedem visual social',
    ],
    avoidFor: [
      'Trabalho físico pesado ou muito suor',
      'Estampas grandes por serigrafia ou sublimação',
    ],
    care: [
      'Lavar com botões abertos, em água fria ou morna',
      'Secar no cabide para reduzir vincos',
      'Passar com ferro em temperatura média',
    ],
    techniques: ['bordado', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'A tricoline tem superfície lisa e uniforme, sem textura aparente, e um brilho discreto. É o tecido que se espera de uma camisa social de botão.',
          },
          {
            kind: 'ul',
            items: [
              '**Trama**: fechada e regular',
              '**Com elastano**: mais confortável nos movimentos e amassa menos',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: camisa social de equipe',
        blocks: [
          {
            kind: 'p',
            text: 'A [camisa social](/catalogo/camisa-social) em tricoline é o uniforme de quem atende de perto. O acabamento indicado é o [bordado](/personalizacao/bordado) do logo no peito, discreto e durável. Veja também a [linha de camisas sociais](/catalogo/linha/camisas-sociais).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Quer um visual com textura? Compare com o [fustão](/tecidos/fustao). Para lugares muito quentes, o [linho](/tecidos/linho) é mais fresco.',
          },
          { kind: 'products', slugs: ['camisa-social'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é tecido tricoline?',
        a: 'Tricoline é um tecido plano de trama fechada e superfície lisa, muito usado em camisas sociais. É leve, elegante e fácil de cuidar.',
      },
      {
        q: 'Tricoline amassa?',
        a: 'Amassa pouco, principalmente na versão com elastano. Secar no cabide ajuda a camisa a ficar pronta para usar com menos ferro.',
      },
      {
        q: 'Qual personalização combina com camisa de tricoline?',
        a: 'O bordado do logo no peito é o mais indicado, por ser discreto e durável. O DTF também funciona para aplicações pequenas e coloridas.',
      },
    ],
  },

  /* -------------------------------------------------------------- fustão */
  {
    slug: 'fustao',
    name: 'Fustão',
    aka: ['tecido fustão', 'camisa fustão', 'piquê de camisa'],
    summary: 'Fustão é um tecido plano com textura em relevo, usado em camisas sociais de aparência nobre. Esconde vincos e dá presença ao uniforme.',
    definition:
      'Fustão é um **tecido plano com pequenos relevos na superfície**, formados pela própria trama. A textura dá à camisa uma aparência mais nobre e ajuda a disfarçar pequenos amassados ao longo do dia. É uma alternativa à tricoline para [camisas sociais](/catalogo/camisa-social) de uniforme.',
    composition: 'Geralmente algodão ou algodão com poliéster, com trama texturizada (a composição varia conforme o fornecedor).',
    traits: [
      { label: 'Toque', value: 'Texturizado' },
      { label: 'Caimento', value: 'Estruturado' },
      { label: 'Respirabilidade', value: 'Boa' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Recepção de hotéis e empresas',
      'Garçons e maîtres em salão de restaurante',
      'Equipes que querem camisa social com visual diferenciado',
    ],
    avoidFor: [
      'Estampas por serigrafia ou sublimação, que não combinam com a textura',
      'Trabalho físico intenso',
    ],
    care: [
      'Lavar com botões abertos, em água fria ou morna',
      'Secar no cabide',
      'Passar do avesso para não achatar o relevo',
    ],
    techniques: ['bordado', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O fustão tem uma textura visível, com pequenos desenhos em relevo, como favos ou listras finas. Ao toque, é mais encorpado que a tricoline.',
          },
          {
            kind: 'ul',
            items: [
              '**Superfície**: com relevo discreto',
              '**Vincos**: aparecem menos por causa da textura',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: hotelaria e salão',
        blocks: [
          {
            kind: 'p',
            text: 'Em [hotelaria](/uniformes/uniformes-para-hotelaria) e [restaurantes](/uniformes/uniformes-para-restaurantes), o fustão diferencia a equipe de salão e recepção. O logo [bordado](/personalizacao/bordado) no peito completa o visual.',
          },
          { kind: 'products', slugs: ['camisa-social'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é tecido fustão?',
        a: 'Fustão é um tecido plano com pequenos relevos formados pela trama. É usado em camisas sociais que querem uma aparência mais nobre e texturizada.',
      },
      {
        q: 'Qual a diferença entre fustão e tricoline?',
        a: 'A tricoline é lisa e leve, com visual clássico. O fustão tem textura em relevo, é um pouco mais encorpado e disfarça melhor os amassados.',
      },
      {
        q: 'Camisa de fustão é boa para uniforme?',
        a: 'Sim, principalmente para recepção, hotelaria e salão de restaurante. Ela passa uma imagem cuidadosa e aguenta bem o uso diário com lavagem frequente.',
      },
    ],
  },

  /* --------------------------------------------------------------- linho */
  {
    slug: 'linho',
    name: 'Linho',
    aka: ['tecido linho', 'camisa de linho', 'camisa linho uniforme'],
    summary: 'Linho é um tecido de fibra natural, fresco e elegante, com o amassado típico. Ideal para camisas de salão, hotelaria e eventos no calor.',
    definition:
      'Linho é um **tecido feito da fibra natural da planta do linho**, conhecido por ser fresco e por deixar o calor sair do corpo. Tem aparência elegante e um amassado natural que faz parte do seu charme. Em uniformes, é a escolha para quem recebe clientes em lugares quentes.',
    composition: 'Fibra de linho, pura ou misturada com outras fibras (a composição varia conforme o fornecedor).',
    traits: [
      { label: 'Toque', value: 'Seco e natural' },
      { label: 'Caimento', value: 'Solto' },
      { label: 'Respirabilidade', value: 'Muito alta' },
      { label: 'Durabilidade', value: 'Média' },
      { label: 'Custo', value: 'Alto' },
    ],
    idealFor: [
      'Salão de restaurante e bar em clima quente',
      'Hotelaria, pousadas e resorts',
      'Eventos, casamentos e recepções',
      '[Shorts de linho](/catalogo/short-linho) para equipes de praia, resort e lazer',
    ],
    avoidFor: [
      'Quem precisa de camisa sempre sem vincos',
      'Trabalho físico pesado ou lavagem industrial',
    ],
    care: [
      'Lavar à mão ou em ciclo delicado, em água fria',
      'Secar no cabide, à sombra',
      'Passar ainda levemente úmido, se quiser menos vincos',
    ],
    techniques: ['bordado'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O linho tem fios um pouco irregulares, que dão ao tecido uma textura rústica e elegante. Amassa com facilidade e é fresco ao toque.',
          },
          {
            kind: 'ul',
            items: [
              '**Fio**: com pequenas irregularidades naturais',
              '**Amassado**: faz parte do visual do tecido',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: salão e hotelaria',
        blocks: [
          {
            kind: 'p',
            text: 'A [camisa de linho](/catalogo/camisa-linho) combina com restaurantes, bares e hotéis que querem uma imagem leve e sofisticada. O acabamento indicado é um [bordado](/personalizacao/bordado) discreto no peito. Veja mais em [uniformes para hotelaria](/uniformes/uniformes-para-hotelaria).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Se a equipe precisa de camisa sempre alinhada, a [tricoline](/tecidos/tricoline) com elastano amassa bem menos.',
          },
          { kind: 'products', slugs: ['camisa-linho', 'short-linho'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Linho é bom para uniforme?',
        a: 'É ótimo para quem trabalha em lugares quentes e quer uma imagem elegante, como salão de restaurante e hotelaria. Ele amassa com facilidade, e isso deve fazer parte do visual escolhido.',
      },
      {
        q: 'Por que o linho amassa tanto?',
        a: 'A fibra do linho é pouco elástica, então marca facilmente as dobras. Secar no cabide e passar ainda úmido reduz os vincos.',
      },
      {
        q: 'Dá para estampar camisa de linho?',
        a: 'O acabamento mais indicado é o bordado, que valoriza a textura natural do tecido. Estampas por serigrafia ou sublimação não combinam com o linho.',
      },
    ],
  },

  /* ------------------------------------------------------------- moletom */
  {
    slug: 'moletom',
    name: 'Moletom',
    aka: ['moletom flanelado', 'tecido moletom', 'moletom personalizado'],
    summary: 'Moletom é uma malha grossa com o lado de dentro flanelado, quente e macio. A base de moletons de turma, formatura e equipe.',
    definition:
      'Moletom é uma **malha grossa e quente, com o lado de dentro felpudo ou flanelado**. O lado de fora é liso, ótimo para receber estampa, e o de dentro é macio, o que segura o calor do corpo. É o tecido dos casacos com capuz de turma, formatura e equipe, e também de calças e shorts de moletom.',
    composition: 'Geralmente algodão com poliéster, com o avesso flanelado.',
    traits: [
      { label: 'Toque', value: 'Macio e quente' },
      { label: 'Caimento', value: 'Encorpado' },
      { label: 'Respirabilidade', value: 'Baixa' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio a alto' },
    ],
    idealFor: [
      'Moletons de turma, terceirão e formatura',
      'Uniforme de inverno para equipes, com casaco e [calça de moletom](/catalogo/calca-moletom)',
      'Estampas grandes na frente e nas costas',
      'Brindes e kits de fim de ano',
    ],
    avoidFor: [
      'Ambientes quentes ou trabalho com esforço físico',
      'Sublimação, que não se fixa bem nesse tipo de malha',
    ],
    care: [
      'Lavar do avesso em água fria',
      'Evitar secadora quente para não encolher',
      'Secar à sombra, estendido',
      'Não passar ferro sobre a estampa',
    ],
    techniques: ['serigrafia', 'bordado', 'dtf', 'alto-relevo'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'Vire a peça do avesso: o moletom flanelado tem uma camada felpuda e macia por dentro. Por fora, a superfície é lisa e firme.',
          },
          {
            kind: 'ul',
            items: [
              '**Cores base**: as cores de linha, mais fáceis de repor',
              '**Cores especiais**: paleta ampliada para combinar com a marca ou turma',
              '**Acabamentos**: punho e barra em ribana, capuz e bolso canguru',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: turma, formatura e equipe',
        blocks: [
          {
            kind: 'p',
            text: 'O moletom é a peça que a turma veste até gastar. A [serigrafia](/personalizacao/serigrafia) é a técnica que mais compensa em volume, e o [alto relevo](/personalizacao/alto-relevo) dá acabamento especial. Veja mais em [uniformes escolares e formatura](/uniformes/uniformes-escolares-e-formatura).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Para montar o pedido da turma sem sobra de tamanho, use nosso [guia de grade de tamanhos](/guias/como-montar-grade-de-tamanhos).',
          },
          { kind: 'products', slugs: ['moletom-capuz', 'calca-moletom', 'short-moletom'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é moletom flanelado?',
        a: 'É o moletom com o lado de dentro felpudo e macio, que segura mais o calor. O lado de fora é liso, o que facilita a estampa.',
      },
      {
        q: 'Qual a melhor estampa para moletom de formatura?',
        a: 'A serigrafia é a mais usada em volume, com cor viva e boa durabilidade. O bordado e o alto relevo dão um acabamento mais especial, e o DTF resolve artes muito coloridas.',
      },
      {
        q: 'Moletom encolhe?',
        a: 'Pode encolher um pouco se lavado em água quente ou seco em secadora. Lavar em água fria, do avesso, e secar à sombra ajuda a manter o tamanho.',
      },
    ],
  },

  /* -------------------------------------------------------------- tactel */
  {
    slug: 'tactel',
    name: 'Tactel',
    aka: ['tecido tactel', 'calça tactel', 'microfibra tactel'],
    summary: 'Tactel é um tecido sintético leve, fresco e de secagem rápida, muito usado em calças e shorts de equipe. Resistente e fácil de lavar.',
    definition:
      'Tactel é um **tecido sintético leve, de toque macio e secagem rápida**. O nome vem de uma marca de fio de poliamida, mas no Brasil passou a designar esse tipo de tecido de forma geral. É resistente, amassa pouco e é muito usado em calças e jaquetas de equipes esportivas, escolares e de eventos.',
    composition: 'Fibra sintética, geralmente poliamida ou poliéster (varia conforme o fornecedor).',
    traits: [
      { label: 'Toque', value: 'Macio e leve' },
      { label: 'Caimento', value: 'Leve' },
      { label: 'Respirabilidade', value: 'Boa' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Calças de equipes esportivas e escolares',
      'Agasalhos de time, como a [jaqueta de tactel](/catalogo/jaqueta-tactel)',
      'Quem precisa de peça leve que seca rápido',
    ],
    avoidFor: [
      'Ambientes formais',
      'Cozinha profissional, em que o tecido fica perto do calor',
    ],
    care: [
      'Lavar em água fria',
      'Não passar ferro quente',
      'Secar à sombra; seca rápido naturalmente',
    ],
    techniques: ['serigrafia', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O tactel é leve, liso e faz um leve barulho ao movimentar, típico de tecidos sintéticos finos. Seca muito rápido depois de molhado.',
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: calça de equipe',
        blocks: [
          {
            kind: 'p',
            text: 'A [calça tactel](/catalogo/calca-tactel) completa o uniforme de times, escolas e eventos. A estampa na perna pode ser feita por [serigrafia](/personalizacao/serigrafia) ou [DTF](/personalizacao/dtf). Veja também a [linha de calças profissionais](/catalogo/linha/calcas-profissionais).',
          },
          { kind: 'products', slugs: ['calca-tactel', 'jaqueta-tactel'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é tecido tactel?',
        a: 'Tactel é um tecido sintético leve, macio e de secagem rápida. É muito usado em calças e shorts esportivos e de equipe.',
      },
      {
        q: 'Calça tactel esquenta?',
        a: 'Não costuma esquentar, porque o tecido é leve e seca rápido. É confortável para atividades com movimento e clima quente.',
      },
      {
        q: 'Como personalizar calça tactel?',
        a: 'As técnicas mais indicadas são serigrafia e DTF, aplicadas geralmente na perna. O tecido é sensível a calor alto, então a aplicação precisa ser feita com cuidado.',
      },
    ],
  },

  /* ------------------------------------------------------- pied de poule */
  {
    slug: 'pied-de-poule',
    name: 'Pied de poule',
    aka: ['calça pied de poule', 'tecido pied de poule', 'pé de galinha', 'calça xadrez de cozinha'],
    summary: 'Pied de poule é a padronagem xadrez miúda da calça de cozinha profissional. Disfarça manchas e aguenta lavagem frequente.',
    definition:
      'Pied de poule é uma **padronagem xadrez miúda, com desenho que lembra pegadas de galinha** ("pé de galinha", em francês). Em uniformes, é a estampa clássica da calça do cozinheiro, feita em tecido plano resistente. O desenho ajuda a disfarçar pequenas manchas do dia a dia na cozinha.',
    composition: 'Tecido plano, geralmente poliéster com algodão, na padronagem pied de poule (varia conforme a linha).',
    traits: [
      { label: 'Toque', value: 'Firme' },
      { label: 'Caimento', value: 'Reto' },
      { label: 'Respirabilidade', value: 'Média' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Cozinheiros, auxiliares e chefs',
      'Padarias, confeitarias e cozinhas industriais',
      'Equipes de cozinha que lavam o uniforme com frequência',
    ],
    avoidFor: [
      'Salão e atendimento, em que o visual de cozinha destoa',
    ],
    care: [
      'Lavar em água morna para remover gordura',
      'Tratar manchas antes da lavagem',
      'Evitar alvejante com cloro para preservar o desenho',
    ],
    techniques: ['bordado'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O pied de poule tem um xadrez pequeno, geralmente preto e branco, com pontas que parecem pequenas estrelas quebradas. De longe, o tecido parece cinza.',
          },
          {
            kind: 'ul',
            items: [
              '**Linha clássica**: o padrão da cozinha profissional',
              '**Linha premium**: tecido mais encorpado',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: uniforme de cozinha',
        blocks: [
          {
            kind: 'p',
            text: 'A [calça pied de poule](/catalogo/calca-pied-de-poule) forma o kit clássico da cozinha com a [dólmã](/catalogo/dolma) e o avental. Veja como montar o uniforme completo em [uniformes para restaurantes](/uniformes/uniformes-para-restaurantes) e no [guia de uniforme para restaurante](/guias/uniforme-para-restaurante).',
          },
          { kind: 'products', slugs: ['calca-pied-de-poule', 'dolma'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Por que a calça de cozinheiro é pied de poule?',
        a: 'É uma tradição da cozinha profissional, e também uma escolha prática. O xadrez miúdo disfarça pequenas manchas de comida e gordura ao longo do serviço.',
      },
      {
        q: 'Pied de poule é um tecido?',
        a: 'Na verdade, pied de poule é uma padronagem, ou seja, um desenho xadrez. Ele é aplicado em tecidos planos resistentes, próprios para uniforme de cozinha.',
      },
      {
        q: 'Qual a diferença entre a linha clássica e a premium?',
        a: 'As duas têm o mesmo padrão pied de poule. A premium usa um tecido mais encorpado, com sensação de mais robustez no dia a dia.',
      },
    ],
  },

  /* ------------------------------------------------------------- two way */
  {
    slug: 'two-way',
    name: 'Two way',
    aka: ['tecido two way', 'dólmã two way', 'avental two way', 'twoway'],
    summary: 'Two way é um tecido plano sintético, leve e resistente, que amassa pouco e seca rápido. O preferido para dólmãs e aventais de cozinha.',
    definition:
      'Two way é um **tecido plano sintético, leve e muito resistente**, que amassa pouco e seca rápido. Ele aguenta bem a rotina de lavagem da cozinha e mantém o aspecto arrumado durante o serviço. Por isso é o tecido preferido para [dólmãs](/catalogo/dolma) e aventais de gastronomia.',
    composition: 'Fibra sintética, geralmente poliéster (a composição exata varia conforme o fornecedor). Disponível em 220 g e 247 g.',
    traits: [
      { label: 'Toque', value: 'Liso e leve' },
      { label: 'Caimento', value: 'Estruturado' },
      { label: 'Respirabilidade', value: 'Média a boa' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Dólmãs de chefs e cozinheiros',
      'Aventais de cozinha e de lavanderia',
      'Restaurantes que lavam o uniforme todos os dias',
      'Equipes que precisam de visual arrumado sem passar ferro',
    ],
    avoidFor: [
      'Quem prefere o toque natural do algodão',
      'Sublimação, pouco usada em uniforme de cozinha',
    ],
    care: [
      'Lavar em água morna para remover gordura',
      'Tratar manchas antes da lavagem',
      'Secar no cabide; quase dispensa ferro',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O two way é liso, leve e firme, com leve brilho. Amassado na mão, ele volta rápido ao normal, sem marcar vincos.',
          },
          {
            kind: 'ul',
            items: [
              '**220 g**: mais leve, indicado para cozinha quente',
              '**247 g**: mais encorpado, com caimento estruturado',
            ],
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: cozinha profissional',
        blocks: [
          {
            kind: 'p',
            text: 'Na cozinha, o uniforme é lavado quase todo dia. O two way aguenta essa rotina e mantém o visual. O nome do chef [bordado](/personalizacao/bordado) no peito é o acabamento clássico. Veja o kit completo em [dólmãs e aventais](/catalogo/linha/dolmas-e-aventais).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Para cozinha muito quente, prefira o 220 g. Para chef e equipe que aparecem para o cliente, o 247 g passa mais estrutura.',
          },
          { kind: 'products', slugs: ['dolma', 'avental-twoway'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é tecido two way?',
        a: 'Two way é um tecido plano sintético, leve e resistente, que amassa pouco e seca rápido. É muito usado em dólmãs e aventais de cozinha.',
      },
      {
        q: 'Two way 220 g ou 247 g: qual escolher?',
        a: 'O 220 g é mais leve e fresco, bom para cozinhas quentes. O 247 g é mais encorpado e tem caimento mais estruturado, ideal para quem aparece para o cliente.',
      },
      {
        q: 'Dólmã de two way esquenta?',
        a: 'O two way é leve e seca rápido, o que ajuda no conforto. Em cozinhas muito quentes, a versão de 220 g é a mais indicada.',
      },
    ],
  },

  /* ----------------------------------------------------------- gabardine */
  {
    slug: 'gabardine',
    name: 'Gabardine',
    aka: ['tecido gabardine', 'avental gabardine', 'gabardina'],
    summary: 'Gabardine é um tecido plano de trama diagonal, firme e com bom caimento. Muito usado em aventais de salão e uniformes de serviço.',
    definition:
      'Gabardine é um **tecido plano firme, de trama em diagonal (sarja) bem fechada**. Tem superfície lisa, bom caimento e resiste bem ao uso diário. Em uniformes, aparece principalmente em aventais de salão e peças de serviço que precisam de visual arrumado.',
    composition: 'Geralmente poliéster, algodão ou mistura dos dois (varia conforme o fornecedor).',
    traits: [
      { label: 'Toque', value: 'Firme e liso' },
      { label: 'Caimento', value: 'Estruturado' },
      { label: 'Respirabilidade', value: 'Média' },
      { label: 'Durabilidade', value: 'Alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Aventais de salão, bar e cafeteria',
      'Equipes de atendimento em restaurantes e hotéis',
      '[Jalecos](/catalogo/jaleco-brim) com caimento mais fino',
      'Peças com friso e bolso que precisam manter a forma',
    ],
    avoidFor: [
      'Peças que precisam de elasticidade',
      'Sublimação',
    ],
    care: [
      'Lavar em água fria ou morna',
      'Tratar manchas antes da lavagem',
      'Passar em temperatura média',
    ],
    techniques: ['bordado', 'serigrafia', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'Olhe de perto: a gabardine tem linhas finas em diagonal na superfície. O tecido é firme, liso e cai reto.',
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: avental de salão',
        blocks: [
          {
            kind: 'p',
            text: 'O [avental de gabardine](/catalogo/avental-gabardine) com friso contrastante identifica garçons e atendentes com um visual limpo. O logo pode ser [bordado](/personalizacao/bordado) ou estampado. Veja mais em [uniformes para restaurantes](/uniformes/uniformes-para-restaurantes).',
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Para cozinha, onde a lavagem é mais pesada, compare com o [two way](/tecidos/two-way).',
          },
          { kind: 'products', slugs: ['avental-gabardine', 'jaleco-brim'] },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é gabardine?',
        a: 'Gabardine é um tecido plano firme, de trama diagonal bem fechada. Tem bom caimento e é muito usado em aventais e uniformes de serviço.',
      },
      {
        q: 'Gabardine é bom para avental?',
        a: 'Sim, principalmente para salão e atendimento. O tecido mantém a forma, aceita friso e bolso e passa uma imagem arrumada.',
      },
      {
        q: 'Qual a diferença entre gabardine e brim?',
        a: 'Os dois são tecidos planos de trama diagonal. A gabardine é mais lisa e tem caimento mais fino; o brim é mais rústico e pesado, pensado para resistência.',
      },
    ],
  },

  /* ---------------------------------------------------------------- brim */
  {
    slug: 'brim',
    name: 'Brim',
    aka: ['tecido brim', 'brim leve', 'jaleco de brim'],
    summary: 'Brim é um tecido plano resistente de trama diagonal. Na versão leve, é usado em jalecos e uniformes de serviço com caimento limpo.',
    definition:
      'Brim é um **tecido plano resistente, de trama em diagonal (sarja)**, feito de algodão ou algodão com poliéster. É conhecido pela durabilidade e pela facilidade de lavar. Na versão leve, ganha caimento mais limpo e é usado em [jalecos](/catalogo/jaleco-brim) para saúde, estética e serviços.',
    composition: 'Algodão ou algodão com poliéster, em trama sarja. No jaleco UNIK, a versão usada é o brim leve.',
    traits: [
      { label: 'Toque', value: 'Firme' },
      { label: 'Caimento', value: 'Reto e limpo' },
      { label: 'Respirabilidade', value: 'Média' },
      { label: 'Durabilidade', value: 'Muito alta' },
      { label: 'Custo', value: 'Médio' },
    ],
    idealFor: [
      'Jalecos para clínicas, consultórios e laboratórios',
      'Estética, salões e serviços técnicos',
      '[Calças de brim](/catalogo/calca-brim) para manutenção, logística e serviços',
      'Uniformes que passam por lavagem frequente',
    ],
    avoidFor: [
      'Peças que precisam de elasticidade e movimento amplo',
      'Sublimação',
    ],
    care: [
      'Lavar em água morna',
      'Tratar manchas antes da lavagem',
      'Passar em temperatura média a alta, conforme a etiqueta',
    ],
    techniques: ['bordado', 'dtf'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O brim tem linhas em diagonal bem visíveis e toque firme. É parente próximo do jeans, mas geralmente em cor lisa e sem o tingimento índigo.',
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: jaleco de equipe',
        blocks: [
          {
            kind: 'p',
            text: 'O jaleco em brim leve fica bem passado, aguenta muitas lavagens e leva o nome do profissional [bordado](/personalizacao/bordado) no peito. Veja mais em [uniformes para clínicas e saúde](/uniformes/uniformes-para-clinicas-e-saude) e na [linha de jalecos](/catalogo/linha/jalecos-personalizados).',
          },
          { kind: 'products', slugs: ['jaleco-brim', 'calca-brim'] },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'O jaleco profissional também pode ser feito em [gabardine](/tecidos/gabardine), de caimento mais fino, ou em oxford, um tecido plano leve e fácil de lavar.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é tecido brim?',
        a: 'Brim é um tecido plano resistente, de trama diagonal, feito de algodão ou algodão com poliéster. É muito usado em jalecos, calças e uniformes de serviço.',
      },
      {
        q: 'Brim leve é bom para jaleco?',
        a: 'Sim. O brim leve é resistente, fácil de passar e tem caimento limpo, o que deixa o jaleco com aparência profissional mesmo depois de muitas lavagens.',
      },
      {
        q: 'Qual a diferença entre brim e jeans?',
        a: 'Os dois são tecidos de trama diagonal. O jeans é tingido com índigo e tem visual mais casual; o brim geralmente tem cor lisa e é usado em uniformes de trabalho.',
      },
    ],
  },

  /* --------------------------------------------------------------- jeans */
  {
    slug: 'jeans',
    name: 'Jeans',
    aka: ['tecido jeans', 'denim', 'avental jeans'],
    summary: 'Jeans é um tecido de algodão resistente, de trama diagonal e tingido em índigo. Em aventais, dá visual autoral a barbearias e cervejarias.',
    definition:
      'Jeans (ou denim) é um **tecido plano de algodão, de trama diagonal, tradicionalmente tingido em azul índigo**. É grosso, muito resistente e ganha personalidade com o uso. Em uniformes, aparece em aventais de barbearias, cervejarias e hamburguerias que querem um visual autoral, e em calças de trabalho.',
    composition: 'Algodão (podendo ter mistura com outras fibras), em trama sarja. No avental UNIK, jeans grosso com detalhes em couro.',
    traits: [
      { label: 'Toque', value: 'Firme e rústico' },
      { label: 'Caimento', value: 'Pesado' },
      { label: 'Respirabilidade', value: 'Média' },
      { label: 'Durabilidade', value: 'Muito alta' },
      { label: 'Custo', value: 'Médio a alto' },
    ],
    idealFor: [
      'Barbearias e cervejarias artesanais',
      'Hamburguerias e restaurantes de conceito',
      'Lojas e eventos com identidade rústica',
      '[Calças jeans](/catalogo/calca-jeans) para equipes de loja, oficina e serviços',
    ],
    avoidFor: [
      'Cozinhas muito quentes, em que o tecido grosso pesa',
      'Estampas por sublimação ou DTF colorido em grande área',
    ],
    care: [
      'Lavar do avesso em água fria para preservar a cor',
      'Evitar molhar as partes em couro',
      'Secar à sombra',
    ],
    techniques: ['bordado', 'serigrafia'],
    sections: [
      {
        id: 'como-reconhecer',
        title: 'Como reconhecer',
        blocks: [
          {
            kind: 'p',
            text: 'O jeans tem o lado de fora azul e o avesso mais claro, com linhas em diagonal. É grosso, firme e ganha um desbotado natural com o tempo.',
          },
        ],
      },
      {
        id: 'na-pratica',
        title: 'Na prática: avental com personalidade',
        blocks: [
          {
            kind: 'p',
            text: 'O [avental jeans com couro](/catalogo/avental-jeans) veste a equipe com identidade e aguenta o uso pesado. O logo pode ser [bordado](/personalizacao/bordado) ou aplicado por [serigrafia](/personalizacao/serigrafia). Veja outras peças em [dólmãs e aventais](/catalogo/linha/dolmas-e-aventais).',
          },
          { kind: 'products', slugs: ['avental-jeans', 'calca-jeans'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Avental jeans é bom para cozinha?',
        a: 'Ele funciona bem em balcões, bares, barbearias e hamburguerias de conceito. Em cozinhas muito quentes, tecidos mais leves como o two way costumam ser mais confortáveis.',
      },
      {
        q: 'Como lavar avental jeans com couro?',
        a: 'Lave do avesso, em água fria, evitando molhar as partes em couro sempre que possível. Secar à sombra ajuda a preservar a cor do jeans e o couro.',
      },
      {
        q: 'Qual personalização combina com avental jeans?',
        a: 'O bordado é o acabamento mais indicado, porque valoriza a textura do tecido. A serigrafia também funciona bem para logos em uma ou poucas cores.',
      },
    ],
  },
]
