/**
 * Dado estruturado. Server Component: vai no HTML inicial, onde o rastreador
 * lê. `<` é escapado para o JSON nunca fechar a tag <script> por acidente.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
