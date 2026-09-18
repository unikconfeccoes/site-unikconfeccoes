/**
 * UNIK LAB — private label.
 *
 * Os tecidos técnicos vêm da aba "Planilha2" da planilha de precificação, com
 * a grafia normalizada (a planilha tem "POLIAMIA", "SHOIRT", "CAMISTA"). A
 * composição é publicada como está na fonte: onde a planilha só traz a
 * proporção ("90/10"), o site também só traz a proporção.
 */

export type LabFabric = {
  name: string
  use: string
  composition: string
  weight: number
}

export const LAB_FABRICS: readonly LabFabric[] = [
  { name: 'Milan', use: 'Camisa social', composition: '86/14 poliamida', weight: 115 },
  { name: 'Treek', use: 'Corta-vento e short', composition: '86 poliamida / 14 elastano', weight: 140 },
  { name: 'Air Skin', use: 'Camiseta', composition: '90/10', weight: 130 },
  { name: 'Fitty', use: 'Compressão', composition: '72/28', weight: 250 },
  { name: 'Grafix Pro', use: 'Camiseta', composition: '90/10 poliamida', weight: 170 },
  { name: 'Ride Pro', use: 'Short compressão', composition: '76/24', weight: 270 },
  { name: 'Activity', use: 'Short compressão', composition: '86/14', weight: 290 },
  { name: 'Viva Plus', use: 'Short', composition: '88/12', weight: 280 },
  { name: 'Coast', use: 'Short', composition: '84/16', weight: 220 },
  { name: 'Move R Green', use: 'Short compressão', composition: '84/16', weight: 290 },
  { name: 'Italy', use: 'Short compressão', composition: '75/25', weight: 240 },
  { name: 'Speed', use: 'Camiseta', composition: '91/9', weight: 125 },
  { name: 'Airfit', use: 'Camiseta', composition: '100 poliamida', weight: 100 },
  { name: 'Cozy Green', use: 'Camiseta', composition: '100 poliamida', weight: 150 },
  { name: 'Valley', use: 'Camisa social', composition: '78/22', weight: 160 },
  { name: 'Acqua Light', use: 'Camiseta', composition: '90/10', weight: 140 },
  { name: 'Zurich', use: 'Polo social', composition: '80/20', weight: 160 },
  { name: 'Soft Line', use: 'Camiseta', composition: '100 poliamida', weight: 150 },
  { name: 'Spin', use: 'Polo social', composition: '87/13', weight: 170 },
  { name: 'Smash', use: 'Polo social', composition: '93 poliamida / 8 elastano', weight: 161 },
]

export const LAB_PILLARS = [
  { id: '01', title: 'Tecidos premium', body: 'Malhas nobres e tecidos técnicos de alta performance, escolhidos para a proposta da sua marca.' },
  { id: '02', title: 'Modelagem personalizada', body: 'Molde próprio, do caimento ao comprimento da manga. A peça é da sua marca, não de catálogo.' },
  { id: '03', title: 'Estampa & relevo', body: 'Serigrafia, DTF, bordado e alto relevo: o acabamento que dá assinatura à coleção.' },
  { id: '04', title: 'Pronta para vender', body: 'Etiqueta e acabamento para a peça sair da produção direto para a arara ou para o e-commerce.' },
] as const

export const LAB_STEPS = [
  { id: '01', title: 'Ideia', body: 'Você envia o conceito, referências e o público da marca pelo formulário abaixo.' },
  { id: '02', title: 'Desenvolvimento', body: 'Definimos juntos tecido, modelagem, cores e técnica de estampa.' },
  { id: '03', title: 'Peça-piloto', body: 'A primeira peça é produzida para você vestir, aprovar ou ajustar.' },
  { id: '04', title: 'Produção', body: 'Com a piloto aprovada, a coleção entra em produção com o padrão UNIK.' },
] as const

export const LAB_PIECES = ['Camiseta', 'Oversized', 'Polo', 'Moletom', 'Short', 'Compressão', 'Corta-vento', 'Camisa', 'Outra'] as const
export const LAB_STAGES = ['Estou criando minha marca', 'Já tenho uma marca', 'Quero lançar uma coleção', 'Quero testar uma ideia'] as const
export const LAB_QUANTITIES = ['Até 50 peças', '50 a 150 peças', '150 a 500 peças', 'Mais de 500 peças', 'Ainda não sei'] as const
export const LAB_TECHNIQUES = ['Serigrafia', 'DTF', 'Bordado', 'Alto relevo', 'Sublimação', 'Não sei ainda'] as const
