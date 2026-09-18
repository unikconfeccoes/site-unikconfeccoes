/* Gerado por scripts/build-prices.py a partir da planilha de precificação.
 * Só o "Valor a cobrar" — custos, fornecedores e margens ficam fora. Não editar à mão. */

export const PRICE_TABLE = {
  "Polo PV": {
    "varejo": 49.41,
    "atacado": 47.64
  },
  "Camiseta PP": {
    "varejo": 34.79,
    "atacado": 32.84
  },
  "Camisa Social Tricoline": {
    "varejo": 142.14,
    "atacado": 128.54
  },
  "Moletom com capuz - cores base": {
    "varejo": 88.68,
    "atacado": 86.33
  },
  "Polo em algodão": {
    "varejo": 59.64,
    "atacado": 58.3
  },
  "Camiseta PV": {
    "varejo": 37.01,
    "atacado": 35.24
  },
  "Camisa Social Fausto": {
    "varejo": 152.34,
    "atacado": 135.34
  },
  "Moletom com capuz - cores especiais": {
    "varejo": 99.27,
    "atacado": 99.27
  },
  "Polo em suedine": {
    "varejo": 81.91,
    "atacado": 79.62
  },
  "Camiseta Suedine": {
    "varejo": 69.51,
    "atacado": 67.22
  },
  "Social linho manga longa": {
    "varejo": 99.98,
    "atacado": 99.98
  },
  "Social linho manga curta": {
    "varejo": 81.48,
    "atacado": 81.48
  },
  "Polo Piquet PV": {
    "varejo": 50.75,
    "atacado": 48.52
  },
  "Camiseta Algodão": {
    "varejo": 47.24,
    "atacado": 45.9
  },
  "Polo Piquet PA": {
    "varejo": 54.13,
    "atacado": 53.13
  },
  "Camiseta Oversized Algodão": {
    "varejo": 61.21,
    "atacado": 59.21
  },
  "Polo Piquet Conforto": {
    "varejo": 72.9,
    "atacado": 69.79
  },
  "Camiseta Oversized Suedine": {
    "varejo": 77.88,
    "atacado": 75.21
  },
  "Camiseta PV manga longa": {
    "varejo": 47.88,
    "atacado": 45.21
  },
  "Camiseta Algodão com elastano": {
    "varejo": 66.63,
    "atacado": 61.63
  },
  "Camiseta Algodão Pima": {
    "varejo": 98.23,
    "atacado": 93.79
  },
  "Jaleco de Brim leve": {
    "varejo": 101.4,
    "atacado": 98.6
  },
  "Avental de gabardine com friso e bolso": {
    "varejo": 47.48,
    "atacado": 41.48
  },
  "Avental de twoway 220gr largo com bolso": {
    "varejo": 57.04,
    "atacado": 54.64
  },
  "Camisa polo de Dry seleção": {
    "varejo": 49.48,
    "atacado": 49.48
  },
  "Camiseta de dry sem elastano": {
    "varejo": 32.44,
    "atacado": 32.04
  },
  "Avental de twoway 247gr largo com bolso": {
    "varejo": 67.6,
    "atacado": 61.84
  },
  "Calça de tactel": {
    "varejo": 54.64,
    "atacado": 45.18
  },
  "Camiseta de dry elastano": {
    "varejo": 33.64,
    "atacado": 32.84
  },
  "Dolmã de two way 220gr": {
    "varejo": 91.94,
    "atacado": 88.54
  },
  "Avental grande jeans com detalhes em couro e bolso": {
    "varejo": 92.4,
    "atacado": 85.2
  },
  "Calça pied de poule clássica": {
    "varejo": 69.04,
    "atacado": 64.46
  },
  "Camiseta de dry texturizado": {
    "varejo": 36.84,
    "atacado": 35.24
  },
  "Dolmã de two way 247gr": {
    "varejo": 106.9,
    "atacado": 98.74
  },
  "Calça pied de poule premium": {
    "varejo": 76.24,
    "atacado": 71.44
  },
  "Camiseta de dry de poliamida": {
    "varejo": 59.24,
    "atacado": 59.24
  },
  "Camiseta de dry UV fluid de poliamida manga longa": {
    "varejo": 71.97,
    "atacado": 62.82
  },
  "Camiseta de dry UV fluid de poliester manga longa": {
    "varejo": 57.05,
    "atacado": 51.57
  },
  "Camiseta de dry sem elastano manga longa": {
    "varejo": 43.21,
    "atacado": 42.55
  },
  "Camiseta de dry elastano manga longa": {
    "varejo": 47.21,
    "atacado": 46.55
  },
  "Camiseta de dry elastano manga longa pesca": {
    "varejo": 62.21,
    "atacado": 60.88
  }
} as const

export type PriceKey = keyof typeof PRICE_TABLE
