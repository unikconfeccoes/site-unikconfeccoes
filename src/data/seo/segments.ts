import type { SegmentPage } from '@/data/seo/types'

/**
 * Páginas de segmento (/uniformes/<SEGMENT_URL>).
 *
 * Uma por SegmentSlug. Produtos citados em `kit` e em blocos `products`
 * são slugs reais de src/data/catalog.ts. Sem prazos em dias e sem preços.
 * Regras comerciais confirmadas pelo cliente (set/2026): pedido mínimo de 20
 * unidades (até dois produtos, pelo menos 10 iguais de cada), atacado a
 * partir de 60 peças do mesmo modelo, 50% de entrada e o restante na entrega,
 * prazo conforme a produção de cada cliente, reunião presencial.
 */
export const SEGMENT_PAGES: readonly SegmentPage[] = [
  /* ------------------------------------------------------ corporativo */
  {
    segment: 'corporativo',
    h1: 'Uniformes corporativos para empresas em Brasília',
    seoTitle: 'Uniformes corporativos em Brasília para empresas',
    description:
      'Uniformes corporativos em Brasília: polos, camisas sociais e camisetas com logo bordado ou estampado, padronizados para equipes de qualquer tamanho.',
    lead:
      'Uniforme corporativo é a peça que identifica a sua equipe e comunica a marca antes da primeira palavra. A UNIK é especializada em uniformes profissionais e produz em Brasília-DF, desde 2016, polos, camisas sociais, camisetas, jaquetas e jalecos com o logo da empresa, com o mesmo padrão de cor e modelagem do primeiro ao último lote. Você monta o pedido pelo site e recebe o orçamento pelo WhatsApp.',
    needs: [
      {
        title: 'Padronização entre unidades e lotes',
        body: 'A cor da malha, o tom do logo e a modelagem precisam ser iguais na matriz e na filial, hoje e na próxima reposição. Por isso registramos tecido, cor e arte de cada pedido.',
      },
      {
        title: 'Reposição simples para novos funcionários',
        body: 'Quem entra na empresa precisa vestir o mesmo uniforme de quem já está. Com o modelo definido, repor é só informar peças e tamanhos.',
      },
      {
        title: 'Conforto para o dia inteiro',
        body: 'Em Brasília o calor e o tempo seco pesam. Malhas leves como a [malha PV](/tecidos/malha-pv) e o piquet respiram e mantêm a aparência depois de muitas lavagens.',
      },
      {
        title: 'Imagem alinhada ao cargo',
        body: 'Equipe de campo, atendimento e diretoria não precisam vestir a mesma peça, mas precisam parecer a mesma empresa. O kit pode combinar polo, camisa social e camiseta.',
      },
    ],
    kit: [
      {
        role: 'Administrativo e escritório',
        products: ['polo-piquet', 'polo-malha'],
        note: 'A polo com logo bordado no peito é o uniforme corporativo mais pedido: formal o bastante para reunião, confortável para o dia todo.',
      },
      {
        role: 'Atendimento e recepção',
        products: ['camisa-social', 'camisa-linho'],
        note: 'Camisa de botão em tricoline ou linho, com bordado discreto, para quem recebe clientes de perto.',
      },
      {
        role: 'Equipe de campo e operação',
        products: ['camiseta-manga-longa', 'camiseta-uv', 'calca-brim', 'jaqueta-corta-vento'],
        note: 'Para quem trabalha na rua: manga longa e malha com proteção UV para o sol do DF, calça de brim resistente e corta-vento para as manhãs frias.',
      },
      {
        role: 'Ações internas e endomarketing',
        products: ['moletom-capuz', 'jaqueta-poliamida', 'camiseta-pima'],
        note: 'Moletom de time, jaqueta de poliamida e camiseta de algodão premium para kits de boas-vindas, convenções e brindes de fim de ano.',
      },
    ],
    sections: [
      {
        id: 'como-escolher-o-tecido',
        title: 'Como escolher o tecido do uniforme corporativo',
        blocks: [
          {
            kind: 'p',
            text: 'O tecido define como o uniforme vai estar depois de seis meses de uso. Para escritório e atendimento, a regra prática é equilibrar toque, durabilidade e facilidade de lavar em casa, já que na maioria das empresas cada colaborador cuida da própria peça.',
          },
          {
            kind: 'ul',
            items: [
              '**Piquet**: trama em colmeia que dá estrutura à gola e aceita muito bem o bordado.',
              '**Malha PV**: leve, seca rápido e amassa pouco. Boa escolha para equipes grandes.',
              '**Tricoline com elastano**: para camisa social que precisa estar alinhada o dia inteiro.',
              '**Algodão premium (pima)**: para peças de brinde e kits em que o toque é o recado.',
            ],
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Se a dúvida é entre polo e camisa social, pense em quem o colaborador atende. O guia [como escolher uniforme para empresa](/guias/como-escolher-uniforme-para-empresa) detalha essa decisão por cargo.',
          },
        ],
      },
      {
        id: 'personalizacao-recomendada',
        title: 'Personalização recomendada para empresas',
        blocks: [
          {
            kind: 'p',
            text: 'Logo pequeno no peito pede [bordado](/personalizacao/bordado): não desbota, não descasca e passa uma imagem mais sólida. Artes grandes nas costas, campanhas e camisetas de evento interno ficam melhores em [serigrafia](/personalizacao/serigrafia), que compensa nas tiragens maiores. Logos com degradê ou muitas cores vão bem em [DTF](/personalizacao/dtf).',
          },
          { kind: 'products', slugs: ['polo-piquet', 'polo-malha', 'camisa-social', 'camiseta-basica'] },
        ],
      },
      {
        id: 'como-funciona-o-pedido',
        title: 'Como funciona o pedido para empresas',
        blocks: [
          {
            kind: 'ol',
            items: [
              'Você escolhe os modelos no [catálogo](/catalogo) e monta o pedido no [orçamento online](/orcamento).',
              'O orçamento chega pelo WhatsApp, com tecido, técnica e posições de personalização definidos.',
              'Antes da produção, enviamos o mockup da peça com o logo para aprovação.',
              'Com o mockup aprovado e a entrada de 50% paga, o lote entra em produção com a grade de tamanhos da equipe, de PP a G3. O restante é pago na entrega.',
            ],
          },
          {
            kind: 'p',
            text: 'O pedido mínimo é de 20 unidades, e dá para mesclar dois tipos de produto, com pelo menos 10 unidades iguais de cada (por exemplo, 10 polos e 10 camisas sociais). O preço de atacado vale a partir de 60 peças do mesmo modelo. O prazo varia conforme a produção de cada pedido e é alinhado na conversa do orçamento.',
          },
          {
            kind: 'note',
            title: 'Reunião presencial',
            text: 'Para empresas com equipes grandes, recebemos compras, RH e marketing para uma reunião presencial em Brasília: dá para ver tecidos e peças de perto e tirar dúvidas antes de fechar. Veja a página [para empresas](/empresas).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual o melhor uniforme corporativo para escritório?',
        a: 'Para a maioria dos escritórios, a polo em piquet ou malha PV com o logo bordado no peito é a melhor combinação de aparência e conforto. Para recepção e cargos de atendimento próximo, a camisa social em tricoline costuma funcionar melhor.',
      },
      {
        q: 'A UNIK faz uniforme corporativo em Brasília?',
        a: 'Sim. A UNIK é uma confecção especializada em uniformes profissionais em Brasília-DF, em atividade desde 2016, e produz polos, camisas sociais, camisetas, jaquetas, moletons e jalecos para empresas. Também recebe clientes para reuniões presenciais, para ver as peças de perto.',
      },
      {
        q: 'Qual o pedido mínimo de uniformes para empresa?',
        a: 'O pedido mínimo é de 20 unidades, podendo mesclar dois tipos de produto, com pelo menos 10 unidades iguais de cada. O preço de atacado vale a partir de 60 peças do mesmo modelo. O pagamento é 50% de entrada e o restante na entrega.',
      },
      {
        q: 'Vejo a peça com o logo antes de produzir?',
        a: 'Sim. Todo pedido passa por um mockup digital com o logo aplicado na posição escolhida, e a produção só começa depois da sua aprovação.',
      },
    ],
  },

  /* ------------------------------------------------------ gastronomia */
  {
    segment: 'gastronomia',
    h1: 'Uniformes para restaurantes e cozinhas profissionais',
    seoTitle: 'Uniforme para restaurante: dólmã, avental e calça',
    description:
      'Uniforme para restaurante em Brasília: dólmã, avental, calça pied de poule e camisa de salão, com nome e logo bordados. Orçamento pelo WhatsApp.',
    lead:
      'Uniforme para restaurante precisa aguentar calor, gordura e lavagem frequente sem perder a cor nem a forma. A UNIK produz em Brasília-DF dólmãs em two way, aventais, calças pied de poule e camisas de salão com o logo e o nome da equipe bordados. Cozinha e salão saem com o mesmo padrão visual, prontos para o serviço.',
    needs: [
      {
        title: 'Resistência a lavagem pesada',
        body: 'Na cozinha, a peça é lavada quase todo dia e muitas vezes em lavanderia. Tecidos como o [two way](/tecidos/two-way) e a [gabardine](/tecidos/gabardine) seguram a cor e não deformam.',
      },
      {
        title: 'Conforto perto do fogão',
        body: 'Calor constante pede tecido que transpira e não gruda no corpo. O two way 220 g é a versão mais leve da dólmã, pensada para cozinha quente.',
      },
      {
        title: 'Diferença visual entre cozinha e salão',
        body: 'O cliente precisa reconhecer quem atende. Cozinha usa dólmã e calça pied de poule; salão usa camisa ou avental, todos com a mesma identidade.',
      },
      {
        title: 'Reposição rápida de peças',
        body: 'Avental mancha, funcionário novo chega. Com o modelo aprovado, repor é só pedir as quantidades.',
      },
    ],
    kit: [
      {
        role: 'Cozinha',
        products: ['dolma', 'calca-pied-de-poule', 'avental-twoway'],
        note: 'Dólmã com o nome do chef bordado, calça pied de poule com cós de elástico e avental largo para o dia a dia da praça.',
      },
      {
        role: 'Salão',
        products: ['camisa-social', 'camisa-linho', 'avental-gabardine'],
        note: 'Camisa social ou de linho com avental de gabardine com friso: elegante e prático para quem serve à mesa.',
      },
      {
        role: 'Bar, hamburgueria e cervejaria',
        products: ['avental-jeans', 'polo-piquet'],
        note: 'O avental de jeans com detalhes em couro dá personalidade à casa; a polo em piquet resolve o atendimento de balcão.',
      },
    ],
    sections: [
      {
        id: 'como-escolher-o-tecido',
        title: 'Como escolher o tecido do uniforme de cozinha',
        blocks: [
          {
            kind: 'p',
            text: 'O two way é o tecido padrão da dólmã porque transpira, amassa pouco e aguenta a rotina de lavagem. A versão de 220 g é mais leve e fresca; a de 247 g tem caimento mais estruturado, bom para o chef que também aparece no salão.',
          },
          {
            kind: 'ul',
            items: [
              '**Dólmã**: two way 220 g ou 247 g, transpassada com botões. Veja a [Dólmã](/catalogo/dolma).',
              '**Calça**: pied de poule, o padrão clássico da cozinha, em linha clássica ou premium.',
              '**Avental de cozinha**: two way largo, com bolso.',
              '**Avental de salão**: gabardine com friso contrastante e bolso frontal.',
            ],
          },
          {
            kind: 'note',
            title: 'Resumo',
            text: 'Todas as peças da linha estão em [dólmãs e aventais](/catalogo/linha/dolmas-e-aventais). O guia [uniforme para restaurante](/guias/uniforme-para-restaurante) explica peça por peça.',
          },
        ],
      },
      {
        id: 'personalizacao-recomendada',
        title: 'Personalização recomendada para restaurantes',
        blocks: [
          {
            kind: 'p',
            text: 'Na cozinha, o [bordado](/personalizacao/bordado) é a escolha natural: resiste a lavagens frequentes e deixa o nome do chef e o logo da casa com acabamento de alto padrão. Em aventais, a serigrafia também funciona para artes maiores. O Restaurante Versá, do nosso portfólio, é um exemplo de cozinha uniformizada com bordado.',
          },
          { kind: 'products', slugs: ['dolma', 'calca-pied-de-poule', 'avental-gabardine', 'avental-twoway'] },
        ],
      },
      {
        id: 'como-funciona-o-pedido',
        title: 'Como funciona o pedido para restaurantes',
        blocks: [
          {
            kind: 'p',
            text: 'Você escolhe as peças de cozinha e salão, informa os tamanhos (PP a G3 nas peças vestidas, tamanho único ajustável nos aventais) e monta o pedido no [orçamento online](/orcamento). O orçamento chega pelo WhatsApp e, antes de produzir, você aprova o mockup com o logo e os nomes.',
          },
          {
            kind: 'ul',
            items: [
              '**Pedido mínimo**: 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada (por exemplo, 10 dólmãs e 10 aventais).',
              '**Atacado**: a partir de 60 peças do mesmo modelo.',
              '**Pagamento**: 50% de entrada e o restante na entrega.',
              '**Prazo**: varia conforme a produção de cada pedido e é alinhado na conversa do orçamento.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual o melhor tecido para dólmã?',
        a: 'O two way é o tecido mais indicado para dólmã porque transpira, amassa pouco e resiste à lavagem frequente. A gramatura de 220 g é mais fresca para cozinhas quentes; a de 247 g tem caimento mais encorpado.',
      },
      {
        q: 'Dá para bordar o nome de cada cozinheiro na dólmã?',
        a: 'Sim. O bordado do nome no peito é o acabamento mais comum em dólmã. Basta enviar a lista de nomes junto com os tamanhos na hora do pedido.',
      },
      {
        q: 'Qual uniforme usar no salão do restaurante?',
        a: 'Camisa social ou de linho com avental de gabardine é a combinação mais usada no salão. Para casas mais descontraídas, polo em piquet ou avental de jeans com couro também funcionam bem.',
      },
      {
        q: 'Vocês atendem restaurantes em Brasília?',
        a: 'Sim. A UNIK é uma confecção de Brasília-DF especializada em uniformes profissionais e produz uniformes completos para restaurantes, bares, hamburguerias e cozinhas profissionais. O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada.',
      },
    ],
  },

  /* -------------------------------------------------------- hotelaria */
  {
    segment: 'hotelaria',
    h1: 'Uniformes para hotel, pousada e hotelaria',
    seoTitle: 'Uniforme para hotel: recepção, governança e salão',
    description:
      'Uniformes para hotelaria em Brasília: camisas sociais, polos em piquet e aventais com logo bordado para recepção, governança e restaurante do hotel.',
    lead:
      'Uniforme de hotel precisa transmitir hospitalidade e organização em todos os setores, da recepção à governança. A UNIK produz em Brasília-DF camisas sociais, camisas de linho, polos em piquet e aventais com o logo bordado, mantendo o mesmo padrão visual em toda a equipe. Cada setor recebe a peça certa para a sua rotina.',
    needs: [
      {
        title: 'Padrão visual em todos os setores',
        body: 'O hóspede vê a recepção, o restaurante e a camareira. Todos precisam parecer parte do mesmo hotel, com as mesmas cores e o mesmo logo.',
      },
      {
        title: 'Aparência impecável na recepção',
        body: 'Quem recebe o hóspede precisa estar alinhado o dia inteiro. A [tricoline](/tecidos/tricoline) com elastano amassa pouco e veste bem por muitas horas.',
      },
      {
        title: 'Liberdade de movimento na governança',
        body: 'Arrumar quartos exige peça que acompanha o corpo e aguenta lavagem frequente. A polo em piquet atende bem esse ritmo.',
      },
      {
        title: 'Frescor em ambientes quentes',
        body: 'Áreas externas, piscina e restaurante pedem tecidos naturais e leves, como o [linho](/tecidos/linho).',
      },
    ],
    kit: [
      {
        role: 'Recepção e concierge',
        products: ['camisa-social', 'camisa-linho'],
        note: 'Camisa de botão com bordado discreto no peito: a primeira impressão do hotel.',
      },
      {
        role: 'Governança e manutenção',
        products: ['polo-piquet'],
        note: 'Polo em piquet com logo bordado, confortável para quem passa o dia em movimento.',
      },
      {
        role: 'Restaurante e bar do hotel',
        products: ['avental-gabardine', 'camisa-linho', 'short-linho'],
        note: 'Avental de gabardine com friso e camisa de linho, alinhados com a recepção. Em resorts e áreas de piscina, o short de linho completa o conjunto.',
      },
    ],
    sections: [
      {
        id: 'como-escolher-o-tecido',
        title: 'Como escolher o tecido para uniforme de hotelaria',
        blocks: [
          {
            kind: 'p',
            text: 'Cada setor do hotel tem uma rotina diferente, e o tecido deve acompanhar essa rotina. A recepção pede tecido plano e alinhado; a governança pede malha com elasticidade e resistência; áreas de lazer pedem frescor.',
          },
          {
            kind: 'ul',
            items: [
              '**Tricoline com elastano**: camisa social que amassa pouco. Veja a [Camisa Social](/catalogo/camisa-social).',
              '**Fustão**: textura em relevo e aparência mais nobre para recepção.',
              '**Linho**: fresco e elegante para salão, eventos e áreas externas.',
              '**Piquet**: malha estruturada para governança e manutenção.',
            ],
          },
        ],
      },
      {
        id: 'personalizacao-recomendada',
        title: 'Personalização recomendada para hotéis',
        blocks: [
          {
            kind: 'p',
            text: 'Em hotelaria, o [bordado](/personalizacao/bordado) é praticamente a única escolha: é discreto, elegante e dura tanto quanto a peça. O logo costuma ir no peito esquerdo e, se o hotel quiser, o nome do colaborador pode ser bordado logo abaixo.',
          },
          { kind: 'products', slugs: ['camisa-social', 'camisa-linho', 'polo-piquet', 'avental-gabardine'] },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Defina uma cor base para o hotel inteiro e varie a peça por setor. Assim a equipe fica coesa sem que todos vistam a mesma roupa. Veja mais em [como escolher uniforme para empresa](/guias/como-escolher-uniforme-para-empresa).',
          },
        ],
      },
      {
        id: 'como-funciona-o-pedido',
        title: 'Como funciona o pedido para hotéis e pousadas',
        blocks: [
          {
            kind: 'p',
            text: 'Monte o pedido por setor no [orçamento online](/orcamento), com modelos, cores e grade de tamanhos de PP a G3. O orçamento chega pelo WhatsApp e o mockup com o bordado é enviado para aprovação antes da produção. O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada; o preço de atacado vale a partir de 60 peças do mesmo modelo. O pagamento é 50% de entrada e o restante na entrega, e o prazo varia conforme a produção de cada pedido.',
          },
          {
            kind: 'note',
            title: 'Reunião presencial',
            text: 'Hotéis e redes podem agendar uma reunião presencial em Brasília para ver tecidos e peças de perto antes de definir o uniforme de cada setor. Saiba mais na página [para empresas](/empresas).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual uniforme usar na recepção do hotel?',
        a: 'Camisa social em tricoline com elastano ou em fustão, com o logo bordado no peito, é a opção mais usada na recepção. Em hotéis de clima quente ou de lazer, a camisa de linho é uma alternativa fresca e elegante.',
      },
      {
        q: 'Qual uniforme é indicado para camareira e governança?',
        a: 'A polo em piquet é indicada para governança porque tem elasticidade para o trabalho físico, resiste a lavagens frequentes e mantém a gola estruturada.',
      },
      {
        q: 'Posso ter o mesmo padrão visual em todos os setores?',
        a: 'Sim. O ideal é definir uma cor base e o mesmo bordado do logo para todo o hotel, variando apenas o modelo da peça conforme o setor.',
      },
      {
        q: 'A UNIK atende hotéis em Brasília?',
        a: 'Sim. A UNIK é uma confecção especializada em uniformes profissionais em Brasília-DF e produz uniformes para hotéis, pousadas e resorts, com orçamento pelo WhatsApp a partir do site e reunião presencial para ver as peças de perto.',
      },
    ],
  },

  /* ----------------------------------------------------------- varejo */
  {
    segment: 'varejo',
    h1: 'Uniformes para lojas e equipes de varejo',
    seoTitle: 'Uniforme para loja: polos e camisetas personalizadas',
    description:
      'Uniforme para loja e varejo em Brasília: polos, camisetas e aventais com a marca, fáceis de repor e confortáveis para o dia inteiro de atendimento.',
    lead:
      'Uniforme para loja serve para o cliente encontrar quem atende e para a equipe carregar a marca no salão de vendas. A UNIK produz em Brasília-DF polos, camisetas e aventais personalizados para lojas, redes e franquias, com padrão igual entre unidades e reposição simples para a rotatividade do varejo.',
    needs: [
      {
        title: 'Identificação imediata',
        body: 'O cliente precisa achar o vendedor em segundos. Cor forte e logo bem posicionado resolvem isso.',
      },
      {
        title: 'Reposição constante',
        body: 'O varejo tem rotatividade alta e picos de contratação em datas sazonais. Com o modelo definido, repor tamanhos é simples.',
      },
      {
        title: 'Padronização entre lojas',
        body: 'Rede e franquia precisam do mesmo uniforme em todas as unidades, com a mesma cor e o mesmo logo.',
      },
      {
        title: 'Conforto para horas em pé',
        body: 'Quem atende passa o dia se movimentando. Malhas leves como a [malha PV](/tecidos/malha-pv) respiram e amassam pouco.',
      },
    ],
    kit: [
      {
        role: 'Vendedores e atendimento',
        products: ['polo-malha', 'polo-piquet'],
        note: 'Polo com logo no peito: a peça mais comum no varejo, com cara de marca e conforto para o dia todo.',
      },
      {
        role: 'Estoque, caixa e apoio',
        products: ['camiseta-basica'],
        note: 'Camiseta básica em cinco malhas, a melhor relação entre custo e volume para equipes grandes.',
      },
      {
        role: 'Lojas conceito e marcas de moda',
        products: ['camiseta-pima', 'avental-jeans', 'calca-jeans'],
        note: 'Camiseta de algodão premium, avental de jeans com couro e calça jeans para lojas em que o uniforme também é vitrine.',
      },
    ],
    sections: [
      {
        id: 'como-escolher-o-modelo',
        title: 'Polo ou camiseta: como escolher o uniforme da loja',
        blocks: [
          {
            kind: 'p',
            text: 'A polo passa uma imagem mais profissional e combina com lojas de ticket médio mais alto, óticas, farmácias e concessionárias. A camiseta é mais descontraída e econômica, boa para equipes grandes, supermercados e lojas de moda jovem.',
          },
          {
            kind: 'ul',
            items: [
              '**Polo Malha**: três malhas (PV, algodão e suedine).',
              '**Polo Piquet**: trama estruturada, ideal para bordado.',
              '**Camiseta Básica**: de PP a suedine, para qualquer orçamento.',
              '**Camiseta Algodão Premium**: em algodão pima, para marcas que querem que o uniforme seja tocado.',
            ],
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Compare as opções na linha de [camisas polo](/catalogo/linha/camisas-polo) e na de [camisetas personalizadas](/catalogo/linha/camisetas-personalizadas).',
          },
        ],
      },
      {
        id: 'personalizacao-recomendada',
        title: 'Personalização recomendada para varejo',
        blocks: [
          {
            kind: 'p',
            text: 'Logo no peito fica melhor em [bordado](/personalizacao/bordado). Frases, campanhas sazonais e artes nas costas ("Posso ajudar?", por exemplo) costumam ser feitas em [serigrafia](/personalizacao/serigrafia), que compensa em volume, ou em [DTF](/personalizacao/dtf), quando a arte tem muitas cores.',
          },
          { kind: 'products', slugs: ['polo-malha', 'polo-piquet', 'camiseta-basica', 'camiseta-pima'] },
        ],
      },
      {
        id: 'como-funciona-o-pedido',
        title: 'Como funciona o pedido para lojas e redes',
        blocks: [
          {
            kind: 'p',
            text: 'Você monta o pedido no [orçamento online](/orcamento), com a grade de tamanhos de cada loja (PP a G3). O orçamento chega pelo WhatsApp e o mockup é aprovado antes da produção. O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada (por exemplo, 10 polos e 10 camisetas). O preço de atacado vale a partir de 60 peças do mesmo modelo, o que costuma ser atingido somando a equipe de várias unidades. O pagamento é 50% de entrada e o restante na entrega. Veja também [uniformes no atacado](/guias/uniformes-no-atacado).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual o melhor uniforme para vendedor de loja?',
        a: 'A polo com logo bordado no peito é o uniforme mais usado por vendedores, porque equilibra imagem profissional e conforto. Em lojas de perfil jovem ou equipes muito grandes, a camiseta personalizada é uma alternativa mais econômica.',
      },
      {
        q: 'Como manter o mesmo uniforme em várias lojas da rede?',
        a: 'Definindo um único modelo, tecido, cor e arte, e repetindo esse padrão em todos os pedidos. Assim as unidades e as reposições ficam iguais.',
      },
      {
        q: 'Dá para fazer camiseta de campanha sazonal para a equipe?',
        a: 'Sim. Camisetas de campanha costumam ser estampadas em serigrafia, quando a arte tem poucas cores, ou em DTF, quando tem degradê ou muitas cores.',
      },
      {
        q: 'Qual o pedido mínimo para uniforme de loja?',
        a: 'O pedido mínimo é de 20 unidades, podendo mesclar dois tipos de produto, com pelo menos 10 unidades iguais de cada. As polos e camisetas são produzidas de PP a G3, e o preço de atacado vale a partir de 60 peças do mesmo modelo.',
      },
    ],
  },

  /* --------------------------------------------------------- educacao */
  {
    segment: 'educacao',
    h1: 'Uniformes escolares, moletom de formatura e camisetas de turma',
    seoTitle: 'Moletom de formatura e uniforme escolar personalizado',
    description:
      'Moletom de formatura, camiseta de turma e uniforme escolar personalizado em Brasília, com serigrafia, bordado ou DTF e mockup antes de produzir.',
    lead:
      'Moletom de formatura e camiseta de turma são as peças que o aluno guarda por anos, por isso a estampa e o tecido precisam durar. A UNIK produz em Brasília-DF moletons com capuz, camisetas, polos e calças de tactel para escolas, cursos, terceirões e turmas universitárias. O Instituto Federal está entre os trabalhos do nosso portfólio.',
    needs: [
      {
        title: 'Estampa que aguenta anos de uso',
        body: 'O moletom da turma é lavado muitas vezes. A [serigrafia](/personalizacao/serigrafia) oferece cor chapada e durabilidade de anos, ideal para a arte grande nas costas.',
      },
      {
        title: 'Grade com muitos tamanhos',
        body: 'Uma turma tem alunos de todos os biotipos. Produzimos de PP a G3 na mesma modelagem, e o guia de [grade de tamanhos](/guias/como-montar-grade-de-tamanhos) ajuda a organizar.',
      },
      {
        title: 'Aprovação coletiva da arte',
        body: 'Comissão, turma e escola querem ver a peça antes. O mockup digital facilita a votação e evita surpresas.',
      },
      {
        title: 'Conforto no clima de Brasília',
        body: 'Para o uniforme do dia a dia, malhas leves; para as manhãs frias da seca, o [moletom](/tecidos/moletom) flanelado.',
      },
    ],
    kit: [
      {
        role: 'Formatura e terceirão',
        products: ['moletom-capuz', 'camiseta-oversized'],
        note: 'Moletom com capuz e bolso canguru, estampa grande nas costas com os nomes da turma.',
      },
      {
        role: 'Uniforme do dia a dia',
        products: ['camiseta-basica', 'polo-malha', 'jaqueta-tactel'],
        note: 'Camiseta ou polo com o brasão da escola, em malha leve e fácil de lavar, e jaqueta de tactel para os dias mais frios.',
      },
      {
        role: 'Educação física e jogos',
        products: ['calca-tactel', 'calca-moletom', 'short-moletom'],
        note: 'Calça de tactel ou de moletom e short de moletom para aula de educação física, interclasse e passeios.',
      },
    ],
    sections: [
      {
        id: 'como-fazer-moletom-de-formatura',
        title: 'Como fazer o moletom de formatura da turma',
        blocks: [
          {
            kind: 'ol',
            items: [
              'A comissão define a cor do moletom (cores base ou cores especiais) e a arte da frente e das costas. Se quiser, a turma pode agendar uma reunião presencial para ver as peças de perto.',
              'A turma levanta os tamanhos de cada aluno, de PP a G3.',
              'O pedido é montado no [orçamento online](/orcamento) e o orçamento chega pelo WhatsApp.',
              'O mockup com a arte aplicada é enviado para a turma aprovar antes da produção.',
              'Com a entrada de 50% paga, o lote entra em produção. O restante é pago na entrega, e o prazo varia conforme a produção de cada pedido.',
            ],
          },
          { kind: 'products', slugs: ['moletom-capuz', 'camiseta-oversized', 'camiseta-basica'] },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Nomes dos alunos nas costas funcionam muito bem em serigrafia. Se a arte tiver foto ou degradê, o [DTF](/personalizacao/dtf) reproduz cada detalhe sem custo extra por cor.',
          },
        ],
      },
      {
        id: 'uniforme-escolar',
        title: 'Uniforme escolar: o que considerar',
        blocks: [
          {
            kind: 'p',
            text: 'Para o uso diário, o uniforme escolar precisa ser resistente, fácil de lavar e confortável no calor. A camiseta em [malha PV](/tecidos/malha-pv) ou em algodão resolve a maior parte dos casos; a polo dá um visual mais formal para colégios que preferem esse padrão.',
          },
          {
            kind: 'ul',
            items: [
              '**Brasão pequeno no peito**: bordado ou serigrafia.',
              '**Arte grande nas costas**: serigrafia.',
              '**Arte muito colorida**: DTF.',
            ],
          },
          {
            kind: 'p',
            text: 'O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada (por exemplo, 10 moletons e 10 camisetas). O preço de atacado vale a partir de 60 peças do mesmo modelo, o que costuma ser atingido somando as turmas da escola. Veja toda a linha de [casacos e moletons](/catalogo/linha/casacos-e-moletons).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual a melhor estampa para moletom de formatura?',
        a: 'A serigrafia é a técnica mais indicada para moletom de formatura, porque oferece cor chapada, boa cobertura e durabilidade de anos. Para artes com foto ou degradê, o DTF é a alternativa.',
      },
      {
        q: 'Dá para colocar o nome de todos os alunos nas costas?',
        a: 'Sim. A lista de nomes nas costas é um dos formatos mais pedidos em moletons de terceirão e de formatura, e aparece no mockup para a turma aprovar antes da produção.',
      },
      {
        q: 'Qual o pedido mínimo para moletom de turma?',
        a: 'O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada. Os moletons e camisetas são produzidos de PP a G3, e o preço de atacado vale a partir de 60 peças do mesmo modelo.',
      },
      {
        q: 'A turma consegue ver o moletom antes de fechar?',
        a: 'Sim. Enviamos um mockup digital com a arte aplicada na peça, e a produção só começa depois da aprovação.',
      },
    ],
  },

  /* ----------------------------------------------------------- esporte */
  {
    segment: 'esporte',
    h1: 'Uniformes esportivos personalizados em dry e sublimação',
    seoTitle: 'Uniforme esportivo personalizado em dry e sublimação',
    description:
      'Uniforme esportivo personalizado em Brasília: camisetas dry, proteção UV, polos e calças de tactel com sublimação total para times, assessorias e torneios.',
    lead:
      'Uniforme esportivo personalizado precisa respirar, secar rápido e carregar a arte do time sem pesar. A UNIK produz em Brasília-DF camisetas dry, UV Fluid, camisetas de pesca, polos dry, shorts, calças e jaquetas esportivas, com [sublimação](/personalizacao/sublimacao) total, serigrafia ou DTF. Serve para times, assessorias de corrida, academias e torneios.',
    needs: [
      {
        title: 'Secagem rápida',
        body: 'Malha técnica em poliéster ou poliamida afasta o suor da pele e seca rápido. Veja o guia de [dry fit](/tecidos/dry-fit).',
      },
      {
        title: 'Proteção contra o sol',
        body: 'Para treino ao ar livre, pesca e equipe de campo, a malha [UV Fluid](/tecidos/uv-fluid) de manga longa protege os braços.',
      },
      {
        title: 'Arte que não pesa',
        body: 'Na sublimação a tinta entra na fibra: a estampa cobre a peça inteira, não racha e não esquenta.',
      },
      {
        title: 'Numeração e nomes',
        body: 'Times precisam de número e nome por atleta. A lista entra no pedido junto com a grade de tamanhos.',
      },
    ],
    kit: [
      {
        role: 'Time e treino',
        products: ['camiseta-dry', 'short-futebol', 'short-futevolei'],
        note: 'Camiseta dry em quatro malhas técnicas com short de futebol ou de futevôlei: o uniforme de jogo completo.',
      },
      {
        role: 'Corrida e ar livre',
        products: ['camiseta-dry-manga-longa', 'camiseta-uv'],
        note: 'Manga longa para proteger o braço e malha UV Fluid para quem treina sob o sol.',
      },
      {
        role: 'Pesca e esporte náutico',
        products: ['camiseta-pesca'],
        note: 'Dry com elastano, manga longa e gola com zíper, com sublimação total para torneios.',
      },
      {
        role: 'Comissão técnica e staff',
        products: ['polo-dry', 'jaqueta-esportiva', 'calca-esportiva', 'jaqueta-corta-vento'],
        note: 'Polo em dry de seleção, jaqueta e calça esportivas para técnicos, organizadores e viagens da delegação; corta-vento para dias de vento e frio.',
      },
    ],
    sections: [
      {
        id: 'como-escolher-a-malha',
        title: 'Como escolher a malha do uniforme esportivo',
        blocks: [
          {
            kind: 'ul',
            items: [
              '**Dry**: poliéster técnico leve, o mais versátil para treino e jogo.',
              '**Dry com elastano**: veste junto ao corpo e acompanha o movimento.',
              '**Dry texturizado**: trama com relevo e visual esportivo.',
              '**Dry poliamida**: toque gelado, alta performance.',
              '**UV Fluid**: malha fluida com proteção UV, em poliamida ou poliéster.',
            ],
          },
          {
            kind: 'note',
            title: 'Atenção à sublimação',
            text: 'A sublimação só funciona em poliéster. Nas malhas de poliamida (dry poliamida e UV Fluid poliamida), a personalização é feita por serigrafia ou DTF. Se a ideia é estampa total, escolha as versões em poliéster.',
          },
        ],
      },
      {
        id: 'personalizacao-recomendada',
        title: 'Personalização recomendada para esporte',
        blocks: [
          {
            kind: 'p',
            text: 'Para arte cobrindo a peça inteira, com degradês e patrocinadores, a sublimação total é a melhor escolha, sempre em malha de poliéster e de preferência em fundo claro. Para escudo e número em poucas cores, a [serigrafia](/personalizacao/serigrafia) resolve bem; para logos coloridos de patrocinadores, o [DTF](/personalizacao/dtf).',
          },
          { kind: 'products', slugs: ['camiseta-dry', 'camiseta-uv', 'camiseta-pesca', 'polo-dry'] },
          {
            kind: 'p',
            text: 'Veja toda a linha de [camisetas dry fit](/catalogo/linha/camisetas-dry-fit) e peça seu [orçamento](/orcamento). O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada (por exemplo, 10 camisetas e 10 shorts). O preço de atacado vale a partir de 60 peças do mesmo modelo, e o mockup é aprovado antes da produção. Veja também a linha de [shorts](/catalogo/linha/shorts).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual o melhor tecido para uniforme esportivo?',
        a: 'O dry, uma malha técnica de poliéster, é o tecido mais usado em uniforme esportivo porque é leve, respira e seca rápido. Para quem treina sob o sol, a malha UV Fluid de manga longa adiciona proteção aos braços.',
      },
      {
        q: 'O que é sublimação total em uniforme esportivo?',
        a: 'É a estampa que cobre a peça inteira: a tinta vira gás com o calor e se fixa dentro da fibra de poliéster. Por isso não pesa, não racha e não sai na lavagem.',
      },
      {
        q: 'Dá para sublimar em qualquer malha dry?',
        a: 'Não. A sublimação só funciona em poliéster. Malhas de poliamida, como o dry poliamida e o UV Fluid poliamida, recebem serigrafia ou DTF.',
      },
      {
        q: 'Dá para colocar nome e número de cada atleta?',
        a: 'Sim. Basta enviar a lista com nome, número e tamanho de cada atleta junto com o pedido. Tudo aparece no mockup para aprovação.',
      },
    ],
  },

  /* ----------------------------------------------------------- eventos */
  {
    segment: 'eventos',
    h1: 'Camisetas para eventos, abadás e kits personalizados',
    seoTitle: 'Camisetas para eventos personalizadas em Brasília',
    description:
      'Camisetas para eventos em Brasília: corridas, congressos, feiras, festas e ações de marca, com serigrafia, DTF ou sublimação e preço de atacado.',
    lead:
      'Camiseta para evento é a forma mais direta de identificar a equipe, vestir participantes e espalhar a marca depois que o evento acaba. A UNIK produz em Brasília-DF camisetas básicas, dry, polos e moletons personalizados para corridas, congressos, feiras, festas e ações promocionais, com preço de atacado a partir de 60 peças do mesmo modelo.',
    needs: [
      {
        title: 'Custo por peça em grande volume',
        body: 'Evento costuma pedir muitas peças iguais. A [Camiseta Básica](/catalogo/camiseta-basica) em malha PP ou PV e a serigrafia formam a combinação mais econômica.',
      },
      {
        title: 'Diferenciar equipe e público',
        body: 'Staff, organização e participantes precisam ser reconhecidos de longe. Cores diferentes para cada grupo resolvem isso.',
      },
      {
        title: 'Arte com a cara do evento',
        body: 'Logos de patrocinadores, degradês e fotos pedem [DTF](/personalizacao/dtf) ou sublimação; artes chapadas pedem serigrafia.',
      },
      {
        title: 'Planejamento com antecedência',
        body: 'Arte, grade de tamanhos e aprovação do mockup levam tempo. Quanto antes o pedido começa, mais tranquila é a entrega.',
      },
    ],
    kit: [
      {
        role: 'Participantes e público',
        products: ['camiseta-basica', 'camiseta-oversized'],
        note: 'A camiseta básica tem a melhor relação entre custo e volume; a oversized é para eventos com pegada de marca.',
      },
      {
        role: 'Corridas e eventos esportivos',
        products: ['camiseta-dry', 'camiseta-pesca'],
        note: 'Dry que seca rápido e aceita sublimação total, para kit de corrida e torneios.',
      },
      {
        role: 'Staff e organização',
        products: ['polo-piquet', 'polo-dry'],
        note: 'Polo para quem coordena, recebe convidados e representa a marca no evento.',
      },
      {
        role: 'Brindes e kits premium',
        products: ['moletom-capuz', 'camiseta-pima'],
        note: 'Moletom e camiseta de algodão premium para palestrantes, patrocinadores e convidados especiais.',
      },
    ],
    sections: [
      {
        id: 'qual-tecnica-escolher',
        title: 'Qual técnica escolher para camisetas de evento',
        blocks: [
          {
            kind: 'table',
            caption: 'Técnica de estampa por tipo de arte',
            head: ['Tipo de arte', 'Técnica indicada'],
            rows: [
              ['Logo em 1 a 3 cores, grande volume', 'Serigrafia'],
              ['Arte colorida, degradê ou foto', 'DTF'],
              ['Estampa na peça inteira, malha de poliéster', 'Sublimação'],
              ['Logo pequeno para staff e convidados', 'Bordado'],
            ],
          },
          {
            kind: 'p',
            text: 'Para entender as diferenças em detalhe, leia [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao).',
          },
        ],
      },
      {
        id: 'como-funciona-o-pedido',
        title: 'Como funciona o pedido de camisetas para eventos',
        blocks: [
          {
            kind: 'ol',
            items: [
              'Defina quantos grupos (público, staff, patrocinadores) e a cor de cada um.',
              'Escolha os modelos no [catálogo](/catalogo) e monte o pedido no [orçamento online](/orcamento).',
              'Receba o orçamento pelo WhatsApp e aprove o mockup com a arte aplicada.',
              'Com a aprovação e a entrada de 50% paga, o lote entra em produção com a grade de PP a G3. O restante é pago na entrega.',
            ],
          },
          { kind: 'products', slugs: ['camiseta-basica', 'camiseta-dry', 'polo-piquet', 'moletom-capuz'] },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'O prazo varia conforme a produção de cada pedido (volume, técnica e arte). Por isso, peça o orçamento assim que a data do evento estiver definida e informe essa data na conversa.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual a camiseta mais econômica para evento?',
        a: 'A camiseta básica em malha PP, de poliéster, é a opção mais econômica. Com estampa em serigrafia de poucas cores, é a combinação de menor custo por peça em grandes volumes.',
      },
      {
        q: 'Qual técnica usar em camiseta de evento com logo de patrocinadores?',
        a: 'Quando há muitos logos coloridos, o DTF é a melhor escolha, porque reproduz qualquer número de cores sem custo extra por cor. Em malha de poliéster clara, a sublimação também é uma opção.',
      },
      {
        q: 'Qual o pedido mínimo de camisetas para evento?',
        a: 'O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada. O preço de atacado vale a partir de 60 peças do mesmo modelo, e o valor final depende também da técnica, das cores e das posições de estampa.',
      },
      {
        q: 'Vocês fazem camisetas para eventos em Brasília?',
        a: 'Sim. A UNIK é uma confecção de Brasília-DF e produz camisetas, polos e moletons personalizados para corridas, congressos, feiras, festas e ações de marca.',
      },
    ],
  },

  /* ------------------------------------------------------------- saude */
  {
    segment: 'saude',
    h1: 'Uniformes para clínicas, consultórios e saúde',
    seoTitle: 'Uniforme para clínica: jaleco, polo e camisa social',
    description:
      'Uniforme para clínica em Brasília: jaleco em brim com nome bordado, polo em piquet e camisa social para consultórios, estética e serviços.',
    lead:
      'Uniforme para clínica precisa transmitir cuidado, limpeza e confiança logo no primeiro contato com o paciente. A UNIK produz em Brasília-DF jalecos em brim, gabardine e oxford com nome bordado, polos em piquet e camisas sociais para clínicas, consultórios, laboratórios, estética e serviços. Recepção e equipe técnica saem com o mesmo padrão visual.',
    needs: [
      {
        title: 'Aparência limpa e profissional',
        body: 'O jaleco é a primeira coisa que o paciente vê. O brim leve tem caimento limpo e é fácil de passar.',
      },
      {
        title: 'Identificação do profissional',
        body: 'Nome, função e registro bordados no peito ajudam o paciente a saber com quem está falando.',
      },
      {
        title: 'Lavagem frequente',
        body: 'Peças de saúde são lavadas com muita frequência. Bordado não desbota nem descasca, e o brim é resistente.',
      },
      {
        title: 'Coerência entre recepção e equipe técnica',
        body: 'Recepção de polo ou camisa social e equipe de jaleco, com a mesma cor e o mesmo logo, reforçam a marca da clínica.',
      },
    ],
    kit: [
      {
        role: 'Médicos, dentistas e equipe técnica',
        products: ['jaleco-brim'],
        note: 'Jaleco Profissional em brim, gabardine ou oxford, com bolsos funcionais e nome bordado no peito.',
      },
      {
        role: 'Recepção e atendimento',
        products: ['polo-piquet', 'camisa-social'],
        note: 'Polo em piquet ou camisa social em tricoline, com o logo da clínica bordado.',
      },
      {
        role: 'Estética e bem-estar',
        products: ['jaleco-brim', 'polo-piquet'],
        note: 'Jaleco para procedimentos e polo para a equipe de apoio, na mesma paleta da marca.',
      },
    ],
    sections: [
      {
        id: 'como-escolher-o-jaleco',
        title: 'Como escolher o jaleco da clínica',
        blocks: [
          {
            kind: 'p',
            text: 'O [Jaleco Profissional](/catalogo/jaleco-brim) é produzido em três tecidos: [brim](/tecidos/brim), resistente e fácil de passar; [gabardine](/tecidos/gabardine), de caimento mais fluido; e oxford, de trama firme. A personalização mais comum é o nome do profissional bordado no peito, com o logo da clínica ao lado ou na manga.',
          },
          {
            kind: 'ul',
            items: [
              '**Nome e especialidade**: bordado no peito, abaixo ou ao lado do logo.',
              '**Logo da clínica**: bordado no peito ou na manga.',
              '**Bolsos funcionais**: para caneta, crachá e objetos de uso diário.',
            ],
          },
          {
            kind: 'note',
            title: 'Na prática',
            text: 'Defina uma posição única para o nome e o logo e mantenha em todos os jalecos. Assim cada novo profissional recebe a peça igual à da equipe. Veja a linha de [jalecos personalizados](/catalogo/linha/jalecos-personalizados).',
          },
        ],
      },
      {
        id: 'personalizacao-recomendada',
        title: 'Personalização recomendada para saúde',
        blocks: [
          {
            kind: 'p',
            text: 'Em saúde, o [bordado](/personalizacao/bordado) é o padrão: discreto, durável e com aparência de alto padrão. O [DTF](/personalizacao/dtf) é uma alternativa para logos muito detalhados ou com degradê.',
          },
          { kind: 'products', slugs: ['jaleco-brim', 'polo-piquet', 'camisa-social'] },
          {
            kind: 'p',
            text: 'Monte o pedido no [orçamento online](/orcamento), com a lista de nomes e tamanhos de PP a G3. O orçamento chega pelo WhatsApp e o mockup é aprovado antes da produção. O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada (por exemplo, 10 jalecos e 10 polos); o pagamento é 50% de entrada e o restante na entrega. Clínicas também podem agendar uma reunião presencial para ver os tecidos de perto. Veja a página [para empresas](/empresas).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Qual o melhor tecido para jaleco?',
        a: 'Depende da rotina. O brim é resistente e fácil de passar, a gabardine tem caimento mais fluido e o oxford tem trama firme. A UNIK produz o jaleco nos três tecidos, e o brim é o mais indicado para quem lava a peça com muita frequência.',
      },
      {
        q: 'Dá para bordar o nome de cada profissional no jaleco?',
        a: 'Sim. O nome bordado no peito é o acabamento mais pedido em jaleco. Basta enviar a lista de nomes com os tamanhos no pedido.',
      },
      {
        q: 'Qual uniforme usar na recepção da clínica?',
        a: 'Polo em piquet ou camisa social em tricoline, com o logo bordado, são as opções mais usadas na recepção de clínicas e consultórios.',
      },
      {
        q: 'A UNIK faz uniformes para clínicas em Brasília?',
        a: 'Sim. A UNIK é uma confecção especializada em uniformes profissionais em Brasília-DF e produz jalecos, polos e camisas sociais para clínicas, consultórios, laboratórios e estética. O pedido mínimo é de 20 unidades, podendo mesclar dois produtos com pelo menos 10 iguais de cada.',
      },
    ],
  },
]
