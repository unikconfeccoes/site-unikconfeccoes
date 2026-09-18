import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

/**
 * Presets do eslint-config-next importados direto, sem FlatCompat: a partir do
 * Next 16 eles já são flat config, e o FlatCompat morre serializando o objeto
 * de plugins (referência circular).
 */
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'scripts/**', '_fontes/**', 'src/data/generated/**'],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // Todo <img> cru do projeto é SVG estático de /brand ou preview local de
      // upload (blob:) — casos que o otimizador do Next não processa.
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
