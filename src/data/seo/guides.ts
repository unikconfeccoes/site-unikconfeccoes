import type { Guide } from '@/data/seo/types'

/**
 * Guias editoriais (SEO).
 *
 * Um guia por slug de GUIDE_SLUGS, na mesma ordem. Regras do texto:
 * primeira frase de cada seção responde o título; nada de travessão;
 * nenhum preço escrito à mão (a tabela `priceTable` vem da planilha);
 * nenhum prazo, pedido mínimo ou número de clientes que a UNIK não confirmou.
 */

const UPDATED = '2026-09-18'

export const GUIDES: readonly Guide[] = [
  /* ------------------------------------------------ 1. como escolher */
  {
    slug: 'como-escolher-uniforme-para-empresa',
    title: 'Como escolher uniforme para empresa: o guia passo a passo',
    seoTitle: 'Como escolher uniforme para empresa: guia completo',
    description:
      'Passo a passo para escolher o uniforme da sua empresa: função, ambiente, tecido, modelo, personalização, grade de tamanhos e orçamento.',
    kicker: 'Guia',
    readingMinutes: 6,
    updated: UPDATED,
    lead:
      'Escolher uniforme para empresa é decidir, nesta ordem, **para que a peça serve, onde ela vai ser usada e como ela representa a marca**. Este guia organiza a decisão em seis passos, pensados para quem compra para equipes grandes: compras, RH, marketing e gestores de operação.',
    sections: [
      {
        id: 'funcao-e-ambiente',
        title: 'Passo 1: comece pela função e pelo ambiente de trabalho',
        blocks: [
          {
            kind: 'p',
            text: 'O primeiro critério para escolher um uniforme é a rotina de quem vai vesti-lo: o que a pessoa faz, quanto se movimenta e em que ambiente passa o dia. Uma recepcionista em ambiente climatizado, um cozinheiro diante do fogão e uma equipe de campo sob o sol têm necessidades opostas.',
          },
          {
            kind: 'ul',
            items: [
              '**Atendimento e escritório:** peças que transmitem cuidado e amassam pouco, como polo piquet e camisa social.',
              '**Cozinha e produção:** tecidos que aguentam calor e lavagem frequente, como o two way da dólmã e o pied de poule da calça.',
              '**Campo, sol e esporte:** malhas técnicas que respiram e secam rápido, como o dry e o UV fluid.',
              '**Eventos e ações pontuais:** camisetas com boa relação custo-volume.',
            ],
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Liste os cargos da empresa e agrupe por ambiente. Em geral saem de dois a quatro "kits" diferentes, e cada kit vira um modelo no orçamento. Veja exemplos por setor em [uniformes corporativos](/uniformes/uniformes-corporativos).',
          },
        ],
      },
      {
        id: 'tecido',
        title: 'Passo 2: escolha o tecido pelo uso, não só pelo preço',
        blocks: [
          {
            kind: 'p',
            text: 'O tecido certo é o que combina conforto no clima local com resistência às lavagens da rotina. É ele que define como a peça veste, quanto ela dura e se a equipe vai querer usá-la.',
          },
          {
            kind: 'ul',
            items: [
              '[Malha PV](/tecidos/malha-pv): leve e fácil de lavar, a escolha mais versátil para polos e camisetas.',
              '[Piquet](/tecidos/piquet): trama em colmeia que dá estrutura à gola e aceita muito bem o bordado.',
              '[Algodão](/tecidos/algodao): toque natural, preferido por quem valoriza conforto.',
              '[Dry fit](/tecidos/dry-fit): para quem transpira, trabalha ao ar livre ou pratica esporte.',
            ],
          },
          {
            kind: 'p',
            text: 'Para comparar todos os tecidos lado a lado, leia o guia de [tecidos para uniforme](/guias/tecidos-para-uniforme).',
          },
        ],
      },
      {
        id: 'modelo',
        title: 'Passo 3: defina o modelo de cada função',
        blocks: [
          {
            kind: 'p',
            text: 'O modelo é a peça em si: polo, camiseta, camisa social, dólmã, jaleco, moletom ou calça. A regra prática é usar o modelo mais formal para quem atende o cliente de perto e o mais funcional para quem trabalha com esforço físico.',
          },
          { kind: 'products', slugs: ['polo-piquet', 'polo-malha', 'camisa-social', 'camiseta-basica'] },
        ],
      },
      {
        id: 'personalizacao',
        title: 'Passo 4: escolha a técnica de personalização',
        blocks: [
          {
            kind: 'p',
            text: 'A técnica de personalização deve seguir a arte e o tecido: bordado para logos pequenos em polos e sociais, serigrafia para grandes tiragens com poucas cores, DTF para artes coloridas e sublimação para a linha dry.',
          },
          {
            kind: 'ul',
            items: [
              '[Bordado](/personalizacao/bordado): acabamento nobre, ideal no peito esquerdo.',
              '[Serigrafia](/personalizacao/serigrafia): cor chapada e alta cobertura, compensa no volume.',
              '[DTF](/personalizacao/dtf): cores ilimitadas e degradês, em qualquer cor de tecido.',
              '[Sublimação](/personalizacao/sublimacao): a estampa entra na fibra e pode cobrir a peça inteira.',
            ],
          },
          {
            kind: 'p',
            text: 'O comparativo completo está em [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao).',
          },
        ],
      },
      {
        id: 'grade',
        title: 'Passo 5: monte a grade de tamanhos',
        blocks: [
          {
            kind: 'p',
            text: 'A grade de tamanhos é a lista de quantas peças de cada tamanho você vai pedir, e ela deve sair de uma coleta real com os colaboradores. A UNIK trabalha com tamanhos adultos do PP ao G3.',
          },
          {
            kind: 'p',
            text: 'Colete o tamanho de cada pessoa em uma planilha e reserve algumas peças para novas contratações. O passo a passo está em [como montar a grade de tamanhos](/guias/como-montar-grade-de-tamanhos).',
          },
        ],
      },
      {
        id: 'orcamento',
        title: 'Passo 6: peça o orçamento com tudo definido',
        blocks: [
          {
            kind: 'p',
            text: 'Um orçamento preciso sai quando você informa modelo, tecido, grade, técnica, número de cores e posições da arte. Com esses dados, o valor por peça deixa de ser estimativa.',
          },
          {
            kind: 'ol',
            items: [
              'Escolha os modelos no [catálogo](/catalogo).',
              'Defina tecido, grade e personalização de cada um.',
              'Adicione tudo ao [orçamento](/orcamento) e envie pelo WhatsApp com um clique.',
              'Aprove o mockup da arte, que é enviado antes de qualquer peça entrar em produção.',
            ],
          },
          {
            kind: 'note',
            title: 'Atacado',
            text: 'O preço de atacado vale a partir de 60 peças do mesmo modelo, somando todos os tamanhos. Entenda o que muda no preço em [quanto custa uniforme personalizado](/guias/quanto-custa-uniforme-personalizado).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é o melhor uniforme para empresa?',
        a: 'Não existe um único melhor: para atendimento, a polo piquet e a camisa social passam mais formalidade; para operação e campo, camisetas em malha PV ou dry são mais práticas. O ideal é definir um modelo por função e ambiente.',
      },
      {
        q: 'Qual tecido de uniforme amassa menos?',
        a: 'Entre os tecidos do catálogo da UNIK, a malha PV, o piquet, o tricoline com elastano e o two way são os que amassam pouco e mantêm boa aparência ao longo do dia.',
      },
      {
        q: 'Onde colocar o logo no uniforme da empresa?',
        a: 'A posição mais comum é o peito esquerdo, geralmente bordado. Costas, mangas e nuca são usadas para frases, sites ou identificação de setor. Cada posição adicional entra no cálculo do orçamento.',
      },
      {
        q: 'Posso ver a arte antes da produção?',
        a: 'Sim. A UNIK prepara a arte para a técnica escolhida e envia um mockup para aprovação antes de qualquer peça entrar em produção.',
      },
      {
        q: 'Como peço o orçamento de uniformes para a empresa?',
        a: 'Pelo site: escolha os modelos no catálogo, defina tecido, tamanhos e personalização, adicione ao orçamento e envie a lista organizada para o WhatsApp da UNIK com um clique.',
      },
    ],
    related: ['/empresas', '/uniformes/uniformes-corporativos', '/catalogo/linha/camisas-polo', '/guias/tecidos-para-uniforme', '/orcamento'],
  },

  /* --------------------------------------------- 2. técnicas comparadas */
  {
    slug: 'serigrafia-bordado-dtf-ou-sublimacao',
    title: 'Serigrafia, bordado, DTF ou sublimação: qual técnica escolher',
    seoTitle: 'Serigrafia, bordado, DTF ou sublimação: qual escolher',
    description:
      'Compare serigrafia, bordado, DTF e sublimação em durabilidade, número de cores, quantidade ideal, tecidos e toque. Saiba qual usar no uniforme.',
    kicker: 'Comparativo',
    readingMinutes: 6,
    updated: UPDATED,
    lead:
      'A técnica certa depende de três fatores: **a arte, o tecido e a quantidade**. Bordado é o mais nobre para logos pequenos, serigrafia é a que mais compensa em grandes tiragens, DTF resolve artes coloridas e sublimação é a escolha da linha dry. Veja abaixo a comparação completa.',
    sections: [
      {
        id: 'resposta-rapida',
        title: 'Resposta rápida: qual técnica usar em cada caso',
        blocks: [
          {
            kind: 'p',
            text: 'Para uniforme corporativo com logo no peito, use bordado; para camisetas em grande volume com poucas cores, serigrafia; para artes com muitas cores ou fotografia, DTF; para uniformes esportivos em dry com estampa total, sublimação.',
          },
          {
            kind: 'ul',
            items: [
              '**Polo, camisa social, dólmã e jaleco:** [bordado](/personalizacao/bordado).',
              '**Camiseta de evento e moletom de turma:** [serigrafia](/personalizacao/serigrafia).',
              '**Arte colorida, degradê, tecido escuro:** [DTF](/personalizacao/dtf).',
              '**Linha dry e uniforme esportivo:** [sublimação](/personalizacao/sublimacao).',
              '**Marca própria que quer textura:** [alto relevo](/personalizacao/alto-relevo).',
            ],
          },
        ],
      },
      {
        id: 'tabela-comparativa',
        title: 'Tabela comparativa das técnicas de personalização',
        blocks: [
          {
            kind: 'p',
            text: 'A tabela resume como cada técnica se comporta nos critérios que mais pesam para uma empresa: durabilidade, cores, volume, tecido e toque.',
          },
          {
            kind: 'table',
            caption: 'Comparativo entre serigrafia, bordado, DTF e sublimação',
            head: ['Critério', 'Serigrafia', 'Bordado', 'DTF', 'Sublimação'],
            rows: [
              ['Durabilidade', 'Alta, dura anos com cuidado na lavagem', 'Muito alta, não desbota nem descasca', 'Boa, com lavagem do avesso', 'Muito alta, a tinta faz parte da fibra'],
              ['Número de cores', 'Poucas cores, cada cor é uma tela', 'Algumas cores de linha, sem degradê fino', 'Ilimitadas, com degradê e foto', 'Ilimitadas, com degradê e foto'],
              ['Melhor quantidade', 'Grandes tiragens', 'Qualquer volume, ideal para logos pequenos', 'Tiragens menores e artes variadas', 'Médias e grandes tiragens da linha dry'],
              ['Tecidos', 'Algodão, PV, PP, moletom, tactel', 'Piquet, tricoline, two way, brim, linho', 'Quase todos, claros ou escuros', 'Poliéster claro, como o dry'],
              ['Toque', 'Leve camada de tinta', 'Relevo da linha', 'Película fina e flexível', 'Sem toque, não se sente'],
            ],
          },
          {
            kind: 'note',
            title: 'Alto relevo',
            text: 'O alto relevo é uma estampa com volume que se sente com a mão. Não é a técnica de uniforme do dia a dia, e sim o acabamento preferido das marcas autorais do [UNIK Lab](/lab).',
          },
        ],
      },
      {
        id: 'bordado',
        title: 'Bordado: o acabamento mais nobre para o logo',
        blocks: [
          {
            kind: 'p',
            text: 'O bordado é a técnica mais indicada para logos pequenos e nomes, porque não desbota, não descasca e envelhece junto com a peça. Por isso é o padrão em polos, camisas sociais, dólmãs e jalecos.',
          },
          {
            kind: 'p',
            text: 'O limite do bordado está em detalhes muito finos e degradês: letras muito pequenas perdem leitura. Nesses casos a equipe ajusta a arte antes de enviar o mockup para aprovação.',
          },
          { kind: 'products', slugs: ['polo-piquet', 'dolma', 'jaleco-brim'] },
        ],
      },
      {
        id: 'serigrafia',
        title: 'Serigrafia: a técnica que mais compensa no volume',
        blocks: [
          {
            kind: 'p',
            text: 'A serigrafia é a técnica que mais compensa em grandes tiragens, porque a tela é preparada uma vez e depois reaproveitada em todas as peças. O resultado é cor chapada, alta cobertura e durabilidade de anos.',
          },
          {
            kind: 'p',
            text: 'Cada cor da arte exige uma tela própria, então artes com muitas cores encarecem. Para logos de uma a três cores em camisetas e moletons, é normalmente a opção mais econômica.',
          },
        ],
      },
      {
        id: 'dtf',
        title: 'DTF: cores ilimitadas em qualquer tecido',
        blocks: [
          {
            kind: 'p',
            text: 'O DTF é a melhor escolha quando a arte tem muitas cores, degradês ou fotografia. A impressão é digital, feita em filme e transferida por calor, então não há custo extra por cor.',
          },
          {
            kind: 'p',
            text: 'Funciona em tecido claro ou escuro e em quase todas as malhas, o que faz dele uma solução prática para tiragens menores e artes variadas, como nomes diferentes por colaborador.',
          },
        ],
      },
      {
        id: 'sublimacao',
        title: 'Sublimação: a estampa que vira parte do tecido',
        blocks: [
          {
            kind: 'p',
            text: 'A sublimação é a técnica ideal para uniformes esportivos em dry, porque a tinta vira gás e entra na fibra: a estampa não pesa, não racha e não sai na lavagem.',
          },
          {
            kind: 'p',
            text: 'Ela exige tecido de poliéster claro, por isso aparece na linha [dry e esportiva](/catalogo/linha/camisetas-dry-fit) e não em algodão ou em peças escuras.',
          },
          { kind: 'products', slugs: ['camiseta-dry', 'polo-dry', 'camiseta-uv'] },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual técnica de personalização dura mais?',
        a: 'Bordado e sublimação são as mais duráveis: o bordado não desbota nem descasca, e na sublimação a tinta passa a fazer parte da fibra. A serigrafia bem aplicada também dura anos.',
      },
      {
        q: 'Qual é a diferença entre DTF e serigrafia?',
        a: 'A serigrafia aplica tinta com uma tela por cor e compensa em grandes tiragens com poucas cores. O DTF é impressão digital transferida por calor, com cores ilimitadas e sem custo por cor, e compensa em artes coloridas e tiragens menores.',
      },
      {
        q: 'Dá para sublimar camiseta de algodão?',
        a: 'Não com bom resultado. A sublimação precisa de poliéster e de tecido claro, por isso é usada na linha dry. Para algodão, as opções são serigrafia, DTF e bordado.',
      },
      {
        q: 'Qual técnica usar em polo de uniforme?',
        a: 'O bordado no peito esquerdo é o padrão para polos corporativas, por durabilidade e aparência. Para estampas grandes nas costas, a serigrafia ou o DTF complementam.',
      },
      {
        q: 'Posso usar mais de uma técnica na mesma peça?',
        a: 'Sim. É comum bordar o logo no peito e estampar as costas em serigrafia ou DTF. Cada técnica e cada posição entram no cálculo do orçamento.',
      },
    ],
    related: ['/personalizacao/bordado', '/personalizacao/serigrafia', '/personalizacao/dtf', '/personalizacao/sublimacao', '/guias/quanto-custa-uniforme-personalizado'],
  },

  /* ------------------------------------------------------- 3. preços */
  {
    slug: 'quanto-custa-uniforme-personalizado',
    title: 'Quanto custa uniforme personalizado: o que define o preço',
    seoTitle: 'Quanto custa uniforme personalizado: preços e fatores',
    description:
      'Veja o preço "a partir de" dos uniformes personalizados da UNIK e entenda o que muda o valor: tecido, modelo, técnica, cores, posições e quantidade.',
    kicker: 'Preços',
    readingMinutes: 6,
    updated: UPDATED,
    lead:
      'O preço de um uniforme personalizado depende de **tecido, modelo, técnica, número de cores, posições da arte e quantidade**. A tabela abaixo mostra os valores de referência da UNIK, e o restante do guia explica como cada fator move o valor final.',
    sections: [
      {
        id: 'tabela-de-precos',
        title: 'Tabela de preços de uniforme personalizado',
        blocks: [
          {
            kind: 'p',
            text: 'Os valores abaixo são preços "a partir de", por peça, na condição de atacado e já com uma personalização simples. São gerados direto da planilha de preços da UNIK, então refletem a tabela vigente.',
          },
          { kind: 'priceTable' },
          {
            kind: 'note',
            title: 'Como ler a tabela',
            text: '"A partir de" é o menor valor de atacado entre os tecidos de cada modelo. O valor final sai no [orçamento](/orcamento), depois que técnica, cores, posições e quantidade estão definidas.',
          },
        ],
      },
      {
        id: 'tecido-e-modelo',
        title: 'Tecido e modelo: a base do preço',
        blocks: [
          {
            kind: 'p',
            text: 'O tecido e o modelo formam a maior parte do preço da peça. Uma camiseta em malha PP custa menos que a mesma camiseta em algodão pima, e uma dólmã exige mais tecido e mais etapas de costura que uma camiseta.',
          },
          {
            kind: 'ul',
            items: [
              '**Malhas de entrada:** [malha PP](/tecidos/malha-pp) e [malha PV](/tecidos/malha-pv), ideais para volume.',
              '**Intermediárias:** algodão, piquet e dry.',
              '**Nobres:** [algodão pima](/tecidos/algodao-pima), suedine, piquet conforto e linho.',
            ],
          },
          {
            kind: 'p',
            text: 'Veja por exemplo como o preço de partida varia só dentro da linha de polos:',
          },
          { kind: 'priceTable', category: 'polos' },
        ],
      },
      {
        id: 'personalizacao',
        title: 'Técnica, cores e posições da arte',
        blocks: [
          {
            kind: 'p',
            text: 'A personalização muda o preço pela técnica escolhida, pelo número de cores e pela quantidade de posições estampadas ou bordadas. O valor da tabela já inclui uma personalização simples, por exemplo o logo em uma posição.',
          },
          {
            kind: 'ul',
            items: [
              '**Técnica:** cada uma tem um custo de preparação diferente. Compare em [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao).',
              '**Cores:** na serigrafia, cada cor é uma tela a mais; no DTF e na sublimação, o número de cores não muda o custo.',
              '**Posições:** peito, costas, mangas e nuca. Cada posição adicional soma ao valor da peça.',
              '**Tamanho da arte:** um bordado grande tem mais pontos que um logo de peito.',
            ],
          },
        ],
      },
      {
        id: 'quantidade',
        title: 'Quantidade e atacado a partir de 60 peças',
        blocks: [
          {
            kind: 'p',
            text: 'A quantidade reduz o preço por peça, e na UNIK o preço de atacado vale a partir de 60 peças do mesmo modelo, somando todos os tamanhos da grade. Abaixo disso, vale o preço de varejo.',
          },
          {
            kind: 'p',
            text: 'Em técnicas com preparação, como a serigrafia, o custo fixo da tela se dilui entre mais peças, o que torna o volume ainda mais vantajoso. Detalhes em [uniformes no atacado](/guias/uniformes-no-atacado).',
          },
          {
            kind: 'note',
            title: 'Dica para compras',
            text: 'Padronizar um mesmo modelo para vários setores, mudando só a cor ou a arte das costas, ajuda a somar volume e alcançar o atacado.',
          },
        ],
      },
      {
        id: 'como-pedir',
        title: 'Como receber o preço exato do seu pedido',
        blocks: [
          {
            kind: 'p',
            text: 'O preço exato sai do orçamento montado no site, com modelo, tecido, grade e personalização definidos. A lista é enviada organizada para o WhatsApp da UNIK com um clique.',
          },
          {
            kind: 'ol',
            items: [
              'Escolha os modelos no [catálogo](/catalogo).',
              'Defina tecido, grade de tamanhos, técnica e posições.',
              'Envie o [orçamento](/orcamento) e receba o valor final.',
              'Aprove o mockup da arte antes da produção.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Os preços do catálogo são finais?',
        a: 'Não. São valores de referência "a partir de", por peça, no atacado e com uma personalização simples. Técnica, número de cores, posições da arte e quantidade definem o valor final do orçamento.',
      },
      {
        q: 'A partir de quantas peças vale o preço de atacado?',
        a: 'A partir de 60 peças do mesmo modelo, somando todos os tamanhos da grade. Abaixo disso vale o preço de varejo.',
      },
      {
        q: 'O que mais encarece um uniforme personalizado?',
        a: 'Tecidos nobres, modelos com mais costura (como dólmã e camisa social), muitas cores em serigrafia e várias posições de personalização são os fatores que mais elevam o valor por peça.',
      },
      {
        q: 'Qual é o uniforme mais barato?',
        a: 'Em geral, a camiseta básica em malha PP ou PV com personalização em uma posição é a opção de menor custo por peça, especialmente no atacado.',
      },
      {
        q: 'Como faço para saber o preço exato?',
        a: 'Monte o orçamento no site da UNIK com modelo, tecido, tamanhos e personalização, e envie pelo WhatsApp. O valor final é informado com base nessas escolhas.',
      },
    ],
    related: ['/orcamento', '/catalogo', '/guias/uniformes-no-atacado', '/guias/serigrafia-bordado-dtf-ou-sublimacao', '/perguntas-frequentes'],
  },

  /* ------------------------------------------------------ 4. grade */
  {
    slug: 'como-montar-grade-de-tamanhos',
    title: 'Como montar a grade de tamanhos do uniforme da empresa',
    seoTitle: 'Grade de tamanhos de uniforme: como montar sem erro',
    description:
      'Aprenda a coletar os tamanhos da equipe, organizar a planilha e reservar peças para reposição. Grade de uniforme do PP ao G3.',
    kicker: 'Guia',
    readingMinutes: 5,
    updated: UPDATED,
    lead:
      'A grade de tamanhos é a lista de quantas peças de cada tamanho entram no pedido, e ela deve nascer de uma **coleta real com os colaboradores**, não de estimativa. Este guia mostra como coletar, organizar em planilha e reservar peças para novas contratações.',
    sections: [
      {
        id: 'o-que-e',
        title: 'O que é a grade de tamanhos',
        blocks: [
          {
            kind: 'p',
            text: 'Grade de tamanhos é a distribuição do pedido por tamanho, por exemplo: 10 P, 25 M, 20 G e 5 GG. Cada modelo do pedido tem a sua própria grade.',
          },
          {
            kind: 'p',
            text: 'Na UNIK os tamanhos adultos vão do PP ao G3: PP, P, M, G, GG, XG, G1, G2 e G3. Aventais são em tamanho único ajustável, então não precisam de grade.',
          },
        ],
      },
      {
        id: 'como-coletar',
        title: 'Como coletar os tamanhos dos colaboradores',
        blocks: [
          {
            kind: 'p',
            text: 'A forma mais segura de coletar tamanhos é pedir que cada colaborador informe o próprio tamanho depois de comparar com uma peça que já usa e veste bem.',
          },
          {
            kind: 'ol',
            items: [
              'Defina um responsável pela coleta, normalmente no RH ou em cada setor.',
              'Envie um formulário ou planilha com nome, setor, modelo e tamanho.',
              'Oriente a pessoa a medir uma camiseta ou polo que já veste bem (largura do peito e comprimento).',
              'Dê um prazo interno curto e cobre os que faltarem.',
              'Revise casos de dúvida antes de fechar o pedido.',
            ],
          },
          {
            kind: 'note',
            title: 'Atenção',
            text: 'Modelagens diferentes vestem diferente. Um G de camiseta oversized não é igual a um G de polo. Por isso a coleta deve ser feita por modelo, não uma vez só para tudo.',
          },
        ],
      },
      {
        id: 'planilha',
        title: 'Como organizar a planilha da grade',
        blocks: [
          {
            kind: 'p',
            text: 'A planilha ideal tem uma linha por colaborador e uma coluna por modelo, e no final uma tabela-resumo que soma as peças de cada tamanho.',
          },
          {
            kind: 'table',
            caption: 'Exemplo de resumo da grade por modelo',
            head: ['Modelo', 'P', 'M', 'G', 'GG', 'Reserva', 'Total'],
            rows: [
              ['Polo piquet (atendimento)', '8', '14', '12', '4', '4', '42'],
              ['Camiseta básica (operação)', '6', '18', '20', '8', '6', '58'],
            ],
          },
          {
            kind: 'p',
            text: 'Com o resumo pronto, basta preencher a grade de cada modelo no configurador do [catálogo](/catalogo) e adicionar ao [orçamento](/orcamento).',
          },
        ],
      },
      {
        id: 'reserva',
        title: 'Reserva para novas contratações e reposição',
        blocks: [
          {
            kind: 'p',
            text: 'Vale incluir no pedido uma reserva de peças para novos colaboradores e para trocas, concentrada nos tamanhos mais pedidos da grade. Assim a empresa não fica sem uniforme entre um pedido e outro.',
          },
          {
            kind: 'ul',
            items: [
              'Olhe a rotatividade da equipe nos últimos meses para dimensionar a reserva.',
              'Distribua a reserva nos tamanhos centrais (M e G costumam concentrar a maior parte).',
              'Registre a arte e a especificação aprovadas para repetir o padrão na reposição.',
            ],
          },
        ],
      },
      {
        id: 'atacado',
        title: 'A grade soma para o atacado',
        blocks: [
          {
            kind: 'p',
            text: 'Todos os tamanhos do mesmo modelo somam para o preço de atacado, que vale a partir de 60 peças. Uma grade com 15 P, 25 M e 20 G, por exemplo, totaliza 60 peças do mesmo modelo.',
          },
          {
            kind: 'p',
            text: 'Se um modelo ficar perto das 60 peças, vale revisar a reserva de reposição ou incluir outro setor que use a mesma peça. No configurador, uma barra mostra quanto falta para chegar ao atacado. Entenda o cálculo completo em [uniformes no atacado](/guias/uniformes-no-atacado).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quais tamanhos de uniforme a UNIK oferece?',
        a: 'Os tamanhos adultos vão do PP ao G3: PP, P, M, G, GG, XG, G1, G2 e G3. Os aventais são em tamanho único ajustável.',
      },
      {
        q: 'Como saber o tamanho certo de cada colaborador?',
        a: 'Peça que cada pessoa meça uma peça que já veste bem, comparando largura do peito e comprimento, e informe o tamanho por modelo, já que modelagens diferentes vestem de forma diferente.',
      },
      {
        q: 'Quantas peças reservar para novos funcionários?',
        a: 'Depende da rotatividade da equipe. Uma boa prática é olhar as contratações dos últimos meses e concentrar a reserva nos tamanhos mais pedidos da grade.',
      },
      {
        q: 'Tamanhos diferentes contam juntos para o atacado?',
        a: 'Sim. O atacado vale a partir de 60 peças do mesmo modelo, somando todos os tamanhos da grade.',
      },
    ],
    related: ['/guias/uniformes-no-atacado', '/guias/como-escolher-uniforme-para-empresa', '/catalogo', '/orcamento'],
  },

  /* ------------------------------------------------- 5. restaurante */
  {
    slug: 'uniforme-para-restaurante',
    title: 'Uniforme para restaurante: cozinha e salão',
    seoTitle: 'Uniforme para restaurante: cozinha e salão',
    description:
      'Como escolher o uniforme do restaurante: dólmã, avental e calça pied de poule na cozinha, camisa social ou linho e avental no salão.',
    kicker: 'Segmento',
    readingMinutes: 5,
    updated: UPDATED,
    lead:
      'O uniforme de restaurante se divide em dois kits: **cozinha**, que precisa aguentar calor e lavagem, e **salão**, que precisa representar a marca diante do cliente. Veja o que compõe cada um e como personalizar.',
    sections: [
      {
        id: 'cozinha-vs-salao',
        title: 'Cozinha e salão pedem uniformes diferentes',
        blocks: [
          {
            kind: 'p',
            text: 'A cozinha pede peças funcionais e resistentes; o salão pede peças que transmitam o estilo da casa. Tratar os dois ambientes como um só costuma gerar uniforme desconfortável atrás do balcão ou sem presença na frente dele.',
          },
          {
            kind: 'table',
            caption: 'Kit de cozinha e kit de salão',
            head: ['Ambiente', 'Parte de cima', 'Parte de baixo', 'Avental', 'Personalização'],
            rows: [
              ['Cozinha', 'Dólmã em two way', 'Calça pied de poule', 'Avental two way largo', 'Nome e logo bordados'],
              ['Salão', 'Camisa social, linho ou polo', 'Calça da casa', 'Avental gabardine ou jeans', 'Logo bordado no peito'],
            ],
          },
        ],
      },
      {
        id: 'cozinha',
        title: 'Uniforme de cozinha: dólmã, calça e avental',
        blocks: [
          {
            kind: 'p',
            text: 'O uniforme de cozinha profissional é formado por dólmã, calça pied de poule e avental. A [dólmã](/catalogo/dolma) da UNIK é feita em [two way](/tecidos/two-way), que transpira e não amassa, em duas gramaturas: 220 g, mais leve para cozinha quente, e 247 g, mais encorpada.',
          },
          {
            kind: 'p',
            text: 'A [calça pied de poule](/catalogo/calca-pied-de-poule) é o padrão da cozinha, com cós de elástico e cordão, em linha clássica ou premium. O avental two way largo, com bolso, completa o kit.',
          },
          { kind: 'products', slugs: ['dolma', 'calca-pied-de-poule', 'avental-twoway'] },
        ],
      },
      {
        id: 'salao',
        title: 'Uniforme de salão: camisa, linho e avental',
        blocks: [
          {
            kind: 'p',
            text: 'O uniforme de salão deve seguir a proposta do restaurante: camisa social para casas mais formais, linho para ambientes quentes e descontraídos, polo para operações de ritmo rápido.',
          },
          {
            kind: 'ul',
            items: [
              '[Camisa social](/catalogo/camisa-social) em tricoline com elastano ou fustão: amassa pouco e veste bem o dia todo.',
              '[Camisa linho](/catalogo/camisa-linho): fresca e elegante, em manga longa ou curta.',
              '[Avental gabardine](/catalogo/avental-gabardine): com friso e bolso, o clássico do salão.',
              '[Avental jeans e couro](/catalogo/avental-jeans): a cara de cervejarias, hamburguerias e casas autorais.',
            ],
          },
          { kind: 'products', slugs: ['camisa-social', 'camisa-linho', 'avental-gabardine', 'avental-jeans'] },
        ],
      },
      {
        id: 'personalizacao',
        title: 'Bordado do nome e do logo',
        blocks: [
          {
            kind: 'p',
            text: 'O bordado é a personalização mais usada em restaurantes, porque resiste às lavagens frequentes e dá acabamento nobre. É comum bordar o logo da casa e o nome do chef ou do garçom no peito.',
          },
          {
            kind: 'p',
            text: 'Em aventais, a serigrafia e o DTF também funcionam bem para logos maiores. Saiba mais sobre [bordado](/personalizacao/bordado).',
          },
          {
            kind: 'note',
            title: 'Nomes individuais',
            text: 'Para bordar o nome de cada pessoa, envie a lista de nomes junto com a grade de tamanhos. Tudo aparece no mockup de aprovação antes da produção.',
          },
        ],
      },
      {
        id: 'como-pedir',
        title: 'Como montar o pedido do restaurante',
        blocks: [
          {
            kind: 'p',
            text: 'O pedido do restaurante fica mais simples quando cada kit é montado separadamente: um para a cozinha e um para o salão, cada um com sua grade.',
          },
          {
            kind: 'p',
            text: 'Veja a linha completa de [dólmãs e aventais](/catalogo/linha/dolmas-e-aventais), a página de [uniformes para restaurantes](/uniformes/uniformes-para-restaurantes) e monte o [orçamento](/orcamento).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é o uniforme de cozinha profissional?',
        a: 'Dólmã, calça pied de poule e avental. Na UNIK a dólmã é em two way (220 g ou 247 g), a calça pied de poule tem linha clássica e premium, e o avental two way é largo e com bolso.',
      },
      {
        q: 'Qual tecido é melhor para dólmã?',
        a: 'O two way é indicado para dólmã porque transpira e não amassa. A gramatura 220 g é mais leve para cozinhas quentes, e a 247 g é mais encorpada, com caimento estruturado.',
      },
      {
        q: 'Qual uniforme usar no salão do restaurante?',
        a: 'Camisa social para casas formais, camisa de linho para ambientes quentes e polo para operações rápidas, combinadas com avental de gabardine ou jeans.',
      },
      {
        q: 'Dá para bordar o nome de cada funcionário?',
        a: 'Sim. Envie a lista de nomes junto com a grade de tamanhos, e os nomes aparecem no mockup enviado para aprovação antes da produção.',
      },
    ],
    related: ['/uniformes/uniformes-para-restaurantes', '/catalogo/linha/dolmas-e-aventais', '/catalogo/dolma', '/tecidos/two-way', '/tecidos/pied-de-poule'],
  },

  /* ----------------------------------------------- 6. private label */
  {
    slug: 'como-criar-marca-de-roupa-private-label',
    title: 'Como criar uma marca de roupa com private label',
    seoTitle: 'Como criar marca de roupa com private label',
    description:
      'Passo a passo para criar sua marca de roupa com private label: conceito, tecido, modelagem, peça-piloto e produção com o UNIK Lab.',
    kicker: 'Marca própria',
    readingMinutes: 5,
    updated: UPDATED,
    lead:
      'Private label é quando uma confecção produz as peças com a **sua marca, a sua modelagem e o seu acabamento**. O caminho tem cinco etapas: conceito, tecido, modelagem, peça-piloto e produção. É o trabalho do [UNIK Lab](/lab).',
    sections: [
      {
        id: 'o-que-e',
        title: 'O que é private label de roupas',
        blocks: [
          {
            kind: 'p',
            text: 'Private label de roupas é a produção terceirizada de peças que saem com a etiqueta e a identidade da sua marca. A confecção cuida de tecido, corte, costura e estampa; a marca cuida do conceito, da venda e do público.',
          },
          {
            kind: 'p',
            text: 'A diferença para o uniforme é o objetivo: o uniforme veste uma equipe, a peça de private label vai para a arara ou para o e-commerce. Por isso tecido, modelagem e acabamento pesam ainda mais.',
          },
        ],
      },
      {
        id: 'conceito',
        title: 'Etapa 1: defina o conceito e o público',
        blocks: [
          {
            kind: 'p',
            text: 'Toda marca começa por uma resposta clara a "para quem" e "por quê". O conceito define o preço de venda, o tecido, a modelagem e até a técnica de estampa.',
          },
          {
            kind: 'ul',
            items: [
              'Quem é o público e onde ele compra.',
              'Quais peças abrem a coleção: camiseta, oversized, polo, moletom, short, compressão, corta-vento ou camisa.',
              'Referências visuais de cores, estampas e caimento.',
            ],
          },
          {
            kind: 'p',
            text: 'Começar com poucas peças bem resolvidas costuma funcionar melhor do que lançar muitas de uma vez. Uma camiseta ou oversized com estampa forte já comunica a proposta da marca e ajuda a testar a aceitação do público.',
          },
        ],
      },
      {
        id: 'tecido-e-modelagem',
        title: 'Etapas 2 e 3: tecido e modelagem',
        blocks: [
          {
            kind: 'p',
            text: 'Tecido e modelagem são o que o cliente sente quando veste a peça, e por isso são as decisões que mais diferenciam uma marca. No UNIK Lab a modelagem é própria, do caimento ao comprimento da manga.',
          },
          {
            kind: 'p',
            text: 'Além das malhas nobres, como [algodão pima](/tecidos/algodao-pima) e [suedine](/tecidos/suedine), o Lab trabalha com tecidos técnicos de alta performance para linhas esportivas e de compressão.',
          },
          { kind: 'products', slugs: ['camiseta-oversized', 'camiseta-pima', 'moletom-capuz'] },
        ],
      },
      {
        id: 'estampa',
        title: 'Estampa e acabamento: a assinatura da coleção',
        blocks: [
          {
            kind: 'p',
            text: 'A técnica de estampa é o que dá assinatura à coleção. Serigrafia, DTF, bordado e [alto relevo](/personalizacao/alto-relevo) estão disponíveis, e o alto relevo é o acabamento preferido das marcas autorais.',
          },
          {
            kind: 'p',
            text: 'A peça sai com etiqueta e acabamento para ir direto da produção para a arara ou para o e-commerce.',
          },
        ],
      },
      {
        id: 'piloto-e-producao',
        title: 'Etapas 4 e 5: peça-piloto e produção',
        blocks: [
          {
            kind: 'p',
            text: 'A peça-piloto é a primeira peça produzida para você vestir, aprovar ou ajustar antes da coleção entrar em produção. É o momento de conferir caimento, toque e estampa.',
          },
          {
            kind: 'ol',
            items: [
              '**Ideia:** envie conceito, referências e público pelo [formulário do Lab](/lab#ideia).',
              '**Desenvolvimento:** tecido, modelagem, cores e técnica definidos em conjunto.',
              '**Peça-piloto:** a primeira peça para vestir e aprovar.',
              '**Produção:** com a piloto aprovada, a coleção é produzida no padrão UNIK.',
            ],
          },
          {
            kind: 'note',
            title: 'Para começar',
            text: 'Você não precisa ter tudo definido. O formulário do [UNIK Lab](/lab#ideia) aceita desde "estou criando minha marca" até "quero testar uma ideia".',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'O que é private label de roupas?',
        a: 'É a produção de peças por uma confecção com a marca, a modelagem e o acabamento de outra empresa. A confecção produz, e a marca cuida do conceito e da venda.',
      },
      {
        q: 'Preciso ter a modelagem pronta para começar?',
        a: 'Não. No UNIK Lab a modelagem é desenvolvida em conjunto, do caimento ao comprimento da manga, a partir das referências que você envia.',
      },
      {
        q: 'O que é peça-piloto?',
        a: 'É a primeira peça produzida para você vestir, aprovar ou ajustar. Só depois da piloto aprovada a coleção entra em produção.',
      },
      {
        q: 'Quais peças o UNIK Lab produz?',
        a: 'Camiseta, oversized, polo, moletom, short, compressão, corta-vento e camisa, além de outras peças que podem ser avaliadas pelo formulário do Lab.',
      },
      {
        q: 'Como começo minha marca com o UNIK Lab?',
        a: 'Pelo formulário da página do UNIK Lab, informando o estágio da marca, as peças, a quantidade estimada e a técnica de estampa desejada.',
      },
    ],
    related: ['/lab', '/lab#ideia', '/personalizacao/alto-relevo', '/tecidos/algodao-pima', '/catalogo/camiseta-oversized'],
  },

  /* ----------------------------------------------------- 7. atacado */
  {
    slug: 'uniformes-no-atacado',
    title: 'Uniformes no atacado: como funciona a compra em volume',
    seoTitle: 'Uniformes no atacado: como funciona a partir de 60 peças',
    description:
      'Entenda o atacado a partir de 60 peças do mesmo modelo, como a grade soma, como planejar volume e padronizar uniformes em empresas grandes.',
    kicker: 'Atacado',
    readingMinutes: 5,
    updated: UPDATED,
    lead:
      'Na UNIK, o preço de atacado vale **a partir de 60 peças do mesmo modelo, somando todos os tamanhos**. Este guia explica como a conta funciona e como empresas com equipes grandes planejam volume, padronização e reposição.',
    sections: [
      {
        id: 'o-que-significa',
        title: 'O que significa "atacado a partir de 60 peças do mesmo modelo"',
        blocks: [
          {
            kind: 'p',
            text: 'Significa que, quando o pedido de um mesmo modelo soma 60 peças ou mais, o preço por peça passa a ser o de atacado. "Mesmo modelo" é a mesma peça do catálogo, por exemplo a Polo Piquet ou a Camiseta Básica.',
          },
          {
            kind: 'p',
            text: 'Os preços "a partir de" mostrados no site já são valores de atacado. Abaixo de 60 peças do modelo, vale o preço de varejo. No configurador de cada peça, uma barra mostra quanto falta para chegar ao atacado.',
          },
        ],
      },
      {
        id: 'como-a-grade-soma',
        title: 'Como a grade de tamanhos soma para o atacado',
        blocks: [
          {
            kind: 'p',
            text: 'Todos os tamanhos do mesmo modelo entram na mesma conta. Não é preciso ter 60 peças de um único tamanho.',
          },
          {
            kind: 'table',
            caption: 'Exemplos de contagem para o atacado',
            head: ['Pedido', 'Soma', 'Atacado?'],
            rows: [
              ['Polo Piquet: 10 P, 20 M, 20 G, 10 GG', '60 peças do mesmo modelo', 'Sim'],
              ['Camiseta Básica: 5 P, 15 M, 15 G, 5 GG', '40 peças do mesmo modelo', 'Não, faltam 20'],
              ['30 Polos Piquet e 30 Camisetas Básicas', '30 de cada modelo', 'Não, cada modelo conta separado'],
            ],
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Monte a grade com base na coleta real da equipe. O passo a passo está em [como montar a grade de tamanhos](/guias/como-montar-grade-de-tamanhos).',
          },
        ],
      },
      {
        id: 'planejar-volume',
        title: 'Como planejar volume em empresas grandes',
        blocks: [
          {
            kind: 'p',
            text: 'Planejar volume é somar a necessidade de todos os setores e unidades em poucos modelos, com antecedência. Isso aumenta as chances de cada modelo passar das 60 peças e dá tempo para aprovar arte e grade com calma.',
          },
          {
            kind: 'ol',
            items: [
              'Levante quantas pessoas usam uniforme em cada setor e unidade.',
              'Defina quantas peças cada pessoa recebe (troca de dias, turnos).',
              'Agrupe funções parecidas no mesmo modelo.',
              'Some a reserva para reposição e novas contratações.',
              'Planeje o pedido com antecedência, sem depender de urgência.',
            ],
          },
        ],
      },
      {
        id: 'padronizacao',
        title: 'Padronização: um padrão visual para toda a empresa',
        blocks: [
          {
            kind: 'p',
            text: 'Padronizar é usar os mesmos modelos, tecidos, cores e posições de arte em todas as unidades, para que a equipe seja reconhecida em qualquer lugar. Além da imagem, a padronização concentra o volume em menos modelos.',
          },
          {
            kind: 'ul',
            items: [
              'Mesmo modelo para vários setores, diferenciando por cor ou por arte nas costas.',
              'Arte aprovada em mockup e registrada como padrão.',
              'Especificação de tecido e técnica documentada para repetir nos próximos pedidos.',
            ],
          },
          { kind: 'products', slugs: ['polo-piquet', 'polo-malha', 'camiseta-basica', 'camisa-social'] },
        ],
      },
      {
        id: 'reposicao',
        title: 'Reposição: manter o padrão ao longo do tempo',
        blocks: [
          {
            kind: 'p',
            text: 'Reposição é o pedido que repõe peças desgastadas e veste novos colaboradores mantendo o mesmo padrão. Com a especificação do pedido anterior em mãos, basta informar os modelos e a nova grade.',
          },
          {
            kind: 'p',
            text: 'Empresas que preferem organizar reposições periódicas podem juntar a demanda de várias unidades para somar volume. Veja mais em [uniformes para empresas](/empresas) e [uniformes corporativos](/uniformes/uniformes-corporativos), ou monte o [orçamento](/orcamento).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'A partir de quantas peças é atacado?',
        a: 'A partir de 60 peças do mesmo modelo, somando todos os tamanhos da grade. Abaixo disso vale o preço de varejo.',
      },
      {
        q: 'Modelos diferentes somam para o atacado?',
        a: 'Não. A conta é por modelo: 30 polos e 30 camisetas são dois pedidos de 30 peças, e nenhum deles chega ao atacado sozinho.',
      },
      {
        q: 'Tamanhos diferentes somam para o atacado?',
        a: 'Sim. Todos os tamanhos do mesmo modelo, do PP ao G3, entram na mesma soma.',
      },
      {
        q: 'Os preços do site já são de atacado?',
        a: 'Sim. Os valores "a partir de" exibidos são preços de atacado por peça, com uma personalização simples. O valor final sai no orçamento.',
      },
      {
        q: 'Como garantir o mesmo padrão na reposição?',
        a: 'Guarde a especificação do pedido (modelo, tecido, cor, técnica e arte aprovada) e informe esses dados no novo orçamento, junto com a grade da reposição.',
      },
    ],
    related: ['/empresas', '/guias/como-montar-grade-de-tamanhos', '/guias/quanto-custa-uniforme-personalizado', '/uniformes/uniformes-corporativos', '/orcamento'],
  },

  /* ----------------------------------------------------- 8. tecidos */
  {
    slug: 'tecidos-para-uniforme',
    title: 'Tecidos para uniforme: qual escolher para cada uso',
    seoTitle: 'Tecidos para uniforme: qual escolher para cada uso',
    description:
      'Compare os tecidos para uniforme: malha PV, PP, algodão, piquet, dry fit, tricoline, linho, two way, brim e mais. Saiba qual usar em cada função.',
    kicker: 'Tecidos',
    readingMinutes: 6,
    updated: UPDATED,
    lead:
      'O melhor tecido para uniforme é o que combina **o ambiente de trabalho, o esforço físico e a imagem que a empresa quer passar**. Este guia compara os tecidos usados pela UNIK e indica onde cada um funciona melhor.',
    sections: [
      {
        id: 'como-escolher',
        title: 'Como escolher o tecido do uniforme',
        blocks: [
          {
            kind: 'p',
            text: 'Escolha o tecido respondendo a três perguntas: a pessoa transpira muito, trabalha em ambiente quente ou ao sol, e atende o cliente de perto? As respostas apontam para malhas leves, malhas técnicas ou tecidos planos mais formais.',
          },
          {
            kind: 'ul',
            items: [
              '**Malhas** (PV, PP, algodão, piquet, suedine): confortáveis e práticas para polos e camisetas.',
              '**Malhas técnicas** (dry fit, UV fluid): respiram e secam rápido.',
              '**Tecidos planos** (tricoline, fustão, linho, two way, brim, gabardine): mais estrutura, para camisas, dólmãs, jalecos e aventais.',
            ],
          },
        ],
      },
      {
        id: 'tabela',
        title: 'Tabela comparativa de tecidos para uniforme',
        blocks: [
          {
            kind: 'p',
            text: 'A tabela resume o uso ideal de cada tecido e os modelos do catálogo em que ele aparece.',
          },
          {
            kind: 'table',
            caption: 'Tecidos para uniforme por uso',
            head: ['Tecido', 'Destaque', 'Uso ideal', 'Peças'],
            rows: [
              ['Malha PV', 'Leve, fácil de lavar', 'Uniforme do dia a dia', 'Polo, camiseta'],
              ['Malha PP', 'A mais econômica', 'Eventos e grandes volumes', 'Camiseta'],
              ['Algodão', 'Toque natural', 'Conforto no uso diário', 'Polo, camiseta, oversized'],
              ['Algodão pima', 'Fibra extralonga, toque sedoso', 'Marcas e peças premium', 'Camiseta'],
              ['Suedine', 'Toque aveludado', 'Acabamento premium', 'Polo, camiseta'],
              ['Piquet', 'Trama estruturada', 'Atendimento e corporativo', 'Polo'],
              ['Dry fit', 'Seca rápido, respira', 'Esporte e equipes de campo', 'Camiseta, polo'],
              ['UV fluid', 'Proteção UV', 'Trabalho ao sol', 'Manga longa'],
              ['Tricoline e fustão', 'Amassa pouco, aspecto nobre', 'Recepção e salão', 'Camisa social'],
              ['Linho', 'Fresco e elegante', 'Salão e eventos em clima quente', 'Camisa'],
              ['Two way', 'Transpira, não amassa', 'Cozinha profissional', 'Dólmã, avental'],
              ['Pied de poule', 'Padrão da cozinha', 'Cozinha profissional', 'Calça'],
              ['Brim', 'Resistente, fácil de passar', 'Saúde e serviços', 'Jaleco'],
              ['Gabardine', 'Estruturado', 'Salão', 'Avental'],
              ['Tactel', 'Leve, seca rápido', 'Equipes esportivas', 'Calça'],
              ['Moletom', 'Flanelado e quente', 'Turmas e dias frios', 'Moletom com capuz'],
            ],
          },
        ],
      },
      {
        id: 'malhas',
        title: 'Malhas para polos e camisetas',
        blocks: [
          {
            kind: 'p',
            text: 'Para polos e camisetas de uniforme, a [malha PV](/tecidos/malha-pv) é a escolha mais versátil: leve, fácil de lavar e com bom custo. A [malha PP](/tecidos/malha-pp) é a mais econômica, indicada para eventos e grandes tiragens.',
          },
          {
            kind: 'p',
            text: 'O [algodão](/tecidos/algodao) oferece toque natural, e o [piquet](/tecidos/piquet) dá estrutura à gola da polo e recebe muito bem o bordado. Para uma linha mais nobre, há [suedine](/tecidos/suedine) e [algodão pima](/tecidos/algodao-pima).',
          },
          { kind: 'products', slugs: ['polo-piquet', 'polo-malha', 'camiseta-basica', 'camiseta-pima'] },
        ],
      },
      {
        id: 'tecnicos',
        title: 'Malhas técnicas para calor, sol e esporte',
        blocks: [
          {
            kind: 'p',
            text: 'Para quem transpira ou trabalha ao ar livre, as malhas técnicas são as mais indicadas. O [dry fit](/tecidos/dry-fit) expulsa o suor e seca rápido, e o [UV fluid](/tecidos/uv-fluid) acrescenta proteção UV em manga longa.',
          },
          {
            kind: 'p',
            text: 'Por serem de fibra sintética, essas malhas aceitam sublimação total, o que permite uniformes esportivos com estampa na peça inteira.',
          },
        ],
      },
      {
        id: 'planos',
        title: 'Tecidos planos para camisas, cozinha e saúde',
        blocks: [
          {
            kind: 'p',
            text: 'Os tecidos planos são usados quando o uniforme precisa de mais estrutura ou formalidade. O [tricoline](/tecidos/tricoline) e o [fustão](/tecidos/fustao) vestem camisas sociais, e o [linho](/tecidos/linho) é a opção fresca para salão e eventos.',
          },
          {
            kind: 'p',
            text: 'Na cozinha, o [two way](/tecidos/two-way) é o tecido da dólmã e do avental, e o [pied de poule](/tecidos/pied-de-poule) é o padrão da calça. Na saúde, o [brim](/tecidos/brim) dá ao jaleco caimento limpo e resistência.',
          },
        ],
      },
      {
        id: 'cuidados',
        title: 'Tecido e personalização andam juntos',
        blocks: [
          {
            kind: 'p',
            text: 'O tecido define quais técnicas de personalização funcionam melhor: bordado em piquet, tricoline, two way e brim; serigrafia e DTF em malhas; sublimação só em poliéster claro, como o dry.',
          },
          {
            kind: 'p',
            text: 'Veja o comparativo em [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao) e consulte termos técnicos no [glossário](/glossario).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é o melhor tecido para uniforme?',
        a: 'Depende do uso: malha PV para o dia a dia, piquet para atendimento, dry fit para calor e esporte, two way para cozinha e brim para jalecos. O melhor é o que combina com o ambiente e a função.',
      },
      {
        q: 'Qual tecido de uniforme é mais fresco?',
        a: 'Entre os tecidos do catálogo, o linho, o dry fit e o UV fluid são os mais frescos. Para malhas do dia a dia, a PV é leve e confortável.',
      },
      {
        q: 'Qual a diferença entre malha PV e PP?',
        a: 'A malha PV mistura poliéster e viscose, é leve e tem toque mais agradável. A malha PP é de poliéster e é a mais econômica, indicada para eventos e grandes volumes.',
      },
      {
        q: 'Qual tecido é melhor para polo de uniforme?',
        a: 'O piquet é o mais tradicional, porque dá estrutura à gola e recebe bem o bordado. A malha PV é uma alternativa mais leve, e o suedine oferece toque premium.',
      },
      {
        q: 'Qual tecido usar em uniforme de cozinha?',
        a: 'Two way para dólmã e avental, porque transpira e não amassa, e pied de poule para a calça, que é o padrão da cozinha profissional.',
      },
    ],
    related: ['/guias/como-escolher-uniforme-para-empresa', '/tecidos/malha-pv', '/tecidos/piquet', '/tecidos/dry-fit', '/catalogo'],
  },
]
