"""
Planilha de precificação → tabela de preços públicos.

A planilha é o documento interno da UNIK: custo de tecido, fornecedor,
rendimento, aviamento, costura, corte e margem. NADA disso pode chegar ao
navegador. Este script lê só a coluna "Valor a cobrar" dos blocos de
precificação por peça (colunas H em diante) e descarta todo o resto.

Cada peça aparece duas vezes: preço unitário (varejo) e "ATACADO" (60+ peças).
A grafia do sufixo varia na planilha ("X ATACADO", "X - ATACADO", espaços
duplos, "two way" vs "twoway"), então o pareamento é feito por uma chave
normalizada — e a chave publicada é o nome original da linha de varejo.

Saída: src/data/generated/prices.ts
Uso:   python3 scripts/build-prices.py
"""

import json
import re
import unicodedata
from pathlib import Path

import openpyxl

SRC = Path('_fontes/nova-Planilha de precificação (1).xlsx')
OUT = Path('src/data/generated/prices.ts')
FIRST_PRICE_COLUMN = 7  # H — tudo antes disso é custo de insumo

# Algumas linhas levam o nome do FORNECEDOR no rótulo da peça. A chave publicada
# vai para o bundle do navegador, então esses nomes são trocados aqui, na fonte.
ALIASES = {
    'Calça pied de poule - Luthima': 'Calça pied de poule clássica',
    'Calça pied de poule - 4 Malhas': 'Calça pied de poule premium',
    'Moletom com capuz - tecido patrick': 'Moletom com capuz - cores base',
    'Moletom com capuz - tecido simão malhas': 'Moletom com capuz - cores especiais',
}
FORNECEDORES = ['triangulo', 'triângulo', 'luthima', 'carlim', 'simão', 'simao', '4 malhas',
                'valdeliço', 'valdelico', 'tex malhas', 'jefrei', 'fernanda', 'patrick']


def clean(name: str) -> str:
    return re.sub(r'\s+', ' ', name).strip()


def key(name: str) -> str:
    base = unicodedata.normalize('NFKD', name.lower())
    base = ''.join(ch for ch in base if not unicodedata.combining(ch))
    base = re.sub(r'atacado', '', base)
    return re.sub(r'[^a-z0-9]', '', base)


def is_num(value) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb['Planilha1']

varejo: dict[str, tuple[str, float]] = {}
atacado: dict[str, float] = {}

for row in ws.iter_rows(values_only=True):
    for col in range(FIRST_PRICE_COLUMN, len(row) - 2):
        name, _custo, cobrar = row[col], row[col + 1], row[col + 2]
        if not isinstance(name, str) or not is_num(_custo) or not is_num(cobrar):
            continue
        label = clean(name)
        if label.lower().startswith('precificação'):
            continue
        price = round(float(cobrar), 2)
        if 'ATACADO' in label.upper():
            atacado[key(label)] = price
        else:
            varejo[key(label)] = (label, price)

table = {}
for k, (label, price) in varejo.items():
    label = ALIASES.get(label, label)
    if any(f in label.lower() for f in FORNECEDORES):
        raise SystemExit(f'Nome de fornecedor no rótulo publicado: {label!r} — acrescente um alias.')
    table[label] = {
        'varejo': price,
        # Algumas peças não têm linha de atacado: vale o preço unitário.
        'atacado': atacado.get(k, price),
    }

orfas = sorted(k for k in atacado if k not in varejo)
if orfas:
    raise SystemExit(f'Linhas de atacado sem par de varejo: {orfas}')

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(
    '/* Gerado por scripts/build-prices.py a partir da planilha de precificação.\n'
    ' * Só o "Valor a cobrar" — custos, fornecedores e margens ficam fora. Não editar à mão. */\n\n'
    f'export const PRICE_TABLE = {json.dumps(table, ensure_ascii=False, indent=2)} as const\n\n'
    'export type PriceKey = keyof typeof PRICE_TABLE\n',
    encoding='utf-8',
)
print(f'prices ok — {len(table)} peças, {len(atacado)} com preço de atacado')
