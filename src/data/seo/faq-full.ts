import type { Faq } from '@/data/seo/types'

/**
 * FAQ completo, por tema (página /perguntas-frequentes).
 * Fatos comerciais confirmados pela UNIK em 18/09/2026: pedido mínimo,
 * pagamento, prazo variável e reuniões presenciais.
 */
export const FAQ_GROUPS: readonly { id: string; title: string; items: Faq[] }[] = [
  {
    id: 'pedido',
    title: 'Pedido e orçamento',
    items: [
      {
        q: 'Qual é o pedido mínimo de uniformes na UNIK?',
        a: 'O pedido mínimo é de 20 peças. É possível combinar dois produtos diferentes, desde que cada um tenha pelo menos 10 peças iguais. Exemplo: 10 camisas polo e 10 camisetas formam um pedido válido.',
      },
      {
        q: 'Qual a diferença entre pedido mínimo e preço de atacado?',
        a: 'O pedido mínimo (20 peças) é a quantidade para produzir. O preço de atacado é um desconto que vale a partir de 60 peças do mesmo modelo, somando todos os tamanhos. O guia [uniformes no atacado](/guias/uniformes-no-atacado) explica com exemplos.',
      },
      {
        q: 'Como faço um orçamento pelo site?',
        a: 'Escolha o modelo no [catálogo](/catalogo), selecione tecido, cor, quantidade por tamanho e personalização, e clique em adicionar ao orçamento. Repita para outros modelos. Na página de [orçamento](/orcamento), preencha os dados da empresa e envie: a lista chega organizada no WhatsApp da UNIK.',
      },
      {
        q: 'Preciso ter a arte pronta para pedir o orçamento?',
        a: 'Não. Você pode enviar o logo em qualquer formato pelo WhatsApp. A equipe prepara a arte para a técnica escolhida e envia um mockup para aprovação antes da produção.',
      },
      {
        q: 'Como informo os tamanhos de cada funcionário?',
        a: 'No configurador de cada peça existe uma grade do PP ao G3: basta digitar quantas peças de cada tamanho. O guia [como montar a grade de tamanhos](/guias/como-montar-grade-de-tamanhos) mostra como levantar os tamanhos da equipe.',
      },
    ],
  },
  {
    id: 'precos',
    title: 'Preços e pagamento',
    items: [
      {
        q: 'Quanto custa um uniforme personalizado?',
        a: 'Os preços de referência aparecem em cada modelo do catálogo como "a partir de", por peça, já com personalização simples. A tabela completa está no guia [quanto custa uniforme personalizado](/guias/quanto-custa-uniforme-personalizado).',
      },
      {
        q: 'Como é feito o pagamento?',
        a: 'O pagamento é dividido em duas partes: 50% do valor total do pedido de entrada e o restante no ato da entrega.',
      },
      {
        q: 'Por que alguns modelos aparecem como "sob consulta"?',
        a: 'Alguns modelos (como shorts, casacos e algumas calças) dependem muito do tecido e do acabamento escolhidos. Nesses casos o valor é calculado no orçamento, a partir da sua lista.',
      },
      {
        q: 'O que muda o preço do uniforme?',
        a: 'Cinco fatores: o tecido, o modelo, a técnica de personalização, o número de cores e posições da arte e a quantidade. Pedidos com 60 peças ou mais do mesmo modelo têm preço de atacado.',
      },
    ],
  },
  {
    id: 'producao',
    title: 'Produção e prazo',
    items: [
      {
        q: 'Qual é o prazo de produção dos uniformes?',
        a: 'O prazo varia conforme a produção de cada cliente: quantidade, modelos e técnica de personalização. Ele é informado no orçamento, antes de você fechar o pedido.',
      },
      {
        q: 'Posso aprovar como o uniforme vai ficar antes da produção?',
        a: 'Sim. Toda arte recebe um mockup para aprovação, mostrando posição, tamanho e cores do logo na peça. A produção só começa depois da sua aprovação.',
      },
      {
        q: 'Posso ver os tecidos e as peças pessoalmente?',
        a: 'Sim. A UNIK recebe clientes para reuniões presenciais em Brasília, para mostrar tecidos e peças de perto e tirar todas as dúvidas. Combine o horário pelo WhatsApp.',
      },
    ],
  },
  {
    id: 'personalizacao',
    title: 'Tecidos e personalização',
    items: [
      {
        q: 'Qual técnica usar para aplicar o logo da empresa?',
        a: 'Bordado para logos pequenos e acabamento nobre, serigrafia para grandes volumes com poucas cores, DTF para artes coloridas e sublimação para estampa total em tecidos de poliéster. O comparativo completo está em [serigrafia, bordado, DTF ou sublimação](/guias/serigrafia-bordado-dtf-ou-sublimacao).',
      },
      {
        q: 'Qual o melhor tecido para uniforme de empresa?',
        a: 'Depende do uso. Malha PV e piquet são os mais comuns em polos e camisetas de equipe; dry fit para calor e atividade física; tricoline para camisas sociais; brim para trabalho pesado. O [guia de tecidos](/tecidos) compara todos.',
      },
      {
        q: 'Quais tamanhos vocês produzem?',
        a: 'A grade vai do PP ao G3 na maioria dos modelos. Aventais têm tamanho único ajustável.',
      },
    ],
  },
  {
    id: 'empresas',
    title: 'Para empresas',
    items: [
      {
        q: 'A UNIK atende empresas de grande porte?',
        a: 'Sim. A UNIK é especializada em uniformes profissionais e atende empresas que precisam uniformizar equipes inteiras, com padronização entre setores e unidades. Veja como funciona em [uniformes para empresas](/empresas).',
      },
      {
        q: 'Vocês fazem uniformes para vários setores da mesma empresa?',
        a: 'Sim. É comum um mesmo pedido reunir peças diferentes por setor (por exemplo, polo para o comercial, camisa social para a recepção e jaleco para a equipe técnica), com a mesma identidade visual.',
      },
      {
        q: 'Onde fica a UNIK?',
        a: 'A UNIK Confecções fica em Brasília, no Distrito Federal, e produz uniformes desde 2016. Veja a página [confecção de uniformes em Brasília](/confeccao-de-uniformes-brasilia).',
      },
    ],
  },
  {
    id: 'lab',
    title: 'UNIK Lab (marca própria)',
    items: [
      {
        q: 'O que é o UNIK Lab?',
        a: 'É a área de private label da UNIK: desenvolve e produz roupas com a etiqueta da sua marca, do tecido à peça-piloto. Saiba mais em [UNIK Lab](/lab).',
      },
      {
        q: 'Como envio a ideia da minha marca?',
        a: 'Pelo formulário da página do [UNIK Lab](/lab#ideia). Ele organiza o briefing (peças, quantidade, acabamento, referências) e envia para o WhatsApp do Lab.',
      },
    ],
  },
]

export const FAQ_ALL: readonly Faq[] = FAQ_GROUPS.flatMap((g) => g.items)
