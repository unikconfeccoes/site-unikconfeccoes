'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Cta } from '@/components/primitives/Cta'
import { Label } from '@/components/primitives/Typography'
import { Chip } from '@/components/ui/Chip'
import { LAB_PIECES, LAB_QUANTITIES, LAB_STAGES, LAB_TECHNIQUES } from '@/data/lab'
import { whatsappUrl } from '@/data/site'
import { saveLabBriefing } from '@/lib/leads'
import styles from './LabForm.module.css'

type Form = {
  nome: string
  marca: string
  instagram: string
  whatsapp: string
  email: string
  estagio: string
  pecas: string[]
  quantidade: string
  tecnicas: string[]
  prazo: string
  ideia: string
}

const EMPTY: Form = {
  nome: '',
  marca: '',
  instagram: '',
  whatsapp: '',
  email: '',
  estagio: '',
  pecas: [],
  quantidade: '',
  tecnicas: [],
  prazo: '',
  ideia: '',
}

type Errors = Partial<Record<keyof Form, string>>

const MAX_REFS = 6

function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(f: Form): Errors {
  const e: Errors = {}
  if (f.nome.trim().length < 2) e.nome = 'Informe seu nome.'
  if (f.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp com DDD.'
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'E-mail inválido.'
  if (!f.estagio) e.estagio = 'Escolha em que momento a marca está.'
  if (f.pecas.length === 0) e.pecas = 'Escolha ao menos uma peça.'
  if (f.ideia.trim().length < 20) e.ideia = 'Conte um pouco mais da ideia (mínimo 20 caracteres).'
  return e
}

function labCode() {
  return `LAB-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 4).toUpperCase()}`
}

function message(code: string, f: Form, refs: number): string {
  // `null` some da mensagem; string vazia é linha em branco de propósito.
  const lines: (string | null)[] = [
    `*UNIK Lab: nova ideia ${code}*`,
    '',
    `*Nome:* ${f.nome}`,
    f.marca ? `*Marca/projeto:* ${f.marca}` : null,
    f.instagram ? `*Instagram:* ${f.instagram}` : null,
    `*WhatsApp:* ${f.whatsapp}`,
    f.email ? `*E-mail:* ${f.email}` : null,
    '',
    `*Momento:* ${f.estagio}`,
    `*Peças:* ${f.pecas.join(', ')}`,
    f.quantidade ? `*Quantidade estimada:* ${f.quantidade}` : null,
    f.tecnicas.length ? `*Acabamento:* ${f.tecnicas.join(', ')}` : null,
    f.prazo ? `*Prazo desejado:* ${f.prazo}` : null,
    '',
    '*A ideia:*',
    f.ideia.trim(),
    refs ? `\n(Tenho ${refs} ${refs === 1 ? 'imagem' : 'imagens'} de referência. Envio aqui na conversa.)` : null,
  ]
  return lines.filter((l) => l !== null).join('\n').replace(/\n{3,}/g, '\n\n')
}

/**
 * "Envie sua ideia" — o briefing do private label.
 *
 * Sem backend nesta fase, o envio vai pelo WhatsApp (o canal que a UNIK já
 * atende). As imagens de referência são mostradas aqui só como prévia local
 * (blob:), sem upload: o formulário lembra o cliente de anexá-las na conversa.
 * Quando houver um endpoint (e-mail/CRM), só a função `submit` muda.
 */
export function LabForm() {
  const uid = useId().replace(/:/g, '')
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [refs, setRefs] = useState<{ name: string; url: string }[]>([])
  const [sent, setSent] = useState<{ code: string; url: string } | null>(null)

  // Cada blob é liberado ao ser removido; os que sobrarem, ao sair da página.
  const liveRefs = useRef(refs)
  useEffect(() => {
    liveRefs.current = refs
  }, [refs])
  useEffect(() => () => liveRefs.current.forEach((r) => URL.revokeObjectURL(r.url)), [])

  const removeRef = (url: string) => {
    URL.revokeObjectURL(url)
    setRefs((list) => list.filter((x) => x.url !== url))
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggle = (key: 'pecas' | 'tecnicas', value: string) =>
    set(key, form[key].includes(value) ? form[key].filter((v) => v !== value) : [...form[key], value])

  const onFiles = (files: FileList | null) => {
    if (!files) return
    const next = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, MAX_REFS - refs.length)
      .map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))
    setRefs((r) => [...r, ...next])
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    const code = labCode()
    const url = whatsappUrl(message(code, form, refs.length))
    saveLabBriefing(code, form, refs.length)
    setSent({ code, url })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (sent) {
    return (
      <div className={styles.sent} role="status">
        <Label size="xs" muted>
          Protocolo
        </Label>
        <p className={styles.code}>{sent.code}</p>
        <h3 className={styles.sentTitle}>Sua ideia está a caminho</h3>
        <p className={styles.sentText}>
          A conversa com o Lab abriu no WhatsApp com o briefing pronto.{' '}
          {refs.length ? 'Anexe lá as imagens de referência que você escolheu. ' : ''}A gente responde com os próximos
          passos para chegar à peça-piloto.
        </p>
        <div className={styles.sentActions}>
          <Cta href={sent.url} external icon="whatsapp">
            Abrir o WhatsApp de novo
          </Cta>
          <Cta
            variant="line"
            icon="none"
            onClick={() => {
              setSent(null)
              setForm(EMPTY)
              refs.forEach((r) => URL.revokeObjectURL(r.url))
              setRefs([])
            }}
          >
            Enviar outra ideia
          </Cta>
        </div>
      </div>
    )
  }

  const err = (key: keyof Form) =>
    errors[key] ? (
      <span id={`${uid}-${key}-erro`} className={styles.error} role="alert">
        {errors[key]}
      </span>
    ) : null

  const text = (key: 'nome' | 'marca' | 'instagram' | 'whatsapp' | 'email' | 'prazo') => ({
    id: `${uid}-${key}`,
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(key, key === 'whatsapp' ? maskPhone(e.target.value) : e.target.value),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${uid}-${key}-erro` : undefined,
    className: styles.input,
  })

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {/* ------------------------------------------------------ você */}
      <fieldset className={styles.block}>
        <legend className={styles.legend}>
          <span className={styles.num}>01</span> Você e a marca
        </legend>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label htmlFor={`${uid}-nome`} className={styles.label}>
              Nome*
            </label>
            <input type="text" autoComplete="name" {...text('nome')} />
            {err('nome')}
          </div>
          <div className={styles.field}>
            <label htmlFor={`${uid}-marca`} className={styles.label}>
              Nome da marca ou projeto
            </label>
            <input type="text" {...text('marca')} />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${uid}-whatsapp`} className={styles.label}>
              WhatsApp*
            </label>
            <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(61) 99999-9999" {...text('whatsapp')} />
            {err('whatsapp')}
          </div>
          <div className={styles.field}>
            <label htmlFor={`${uid}-instagram`} className={styles.label}>
              Instagram
            </label>
            <input type="text" placeholder="@suamarca" {...text('instagram')} />
          </div>
          <div className={`${styles.field} ${styles.span2}`}>
            <label htmlFor={`${uid}-email`} className={styles.label}>
              E-mail
            </label>
            <input type="email" autoComplete="email" {...text('email')} />
            {err('email')}
          </div>
        </div>
      </fieldset>

      {/* ------------------------------------------------------ momento */}
      <fieldset className={styles.block} aria-describedby={errors.estagio ? `${uid}-estagio-erro` : undefined}>
        <legend className={styles.legend} id={`${uid}-estagio`} tabIndex={-1}>
          <span className={styles.num}>02</span> Em que momento você está?*
        </legend>
        <div className={styles.chips}>
          {LAB_STAGES.map((s) => (
            <Chip key={s} pressed={form.estagio === s} onClick={() => set('estagio', form.estagio === s ? '' : s)}>
              {s}
            </Chip>
          ))}
        </div>
        {err('estagio')}
      </fieldset>

      {/* ------------------------------------------------------ peças */}
      <fieldset className={styles.block} aria-describedby={errors.pecas ? `${uid}-pecas-erro` : undefined}>
        <legend className={styles.legend} id={`${uid}-pecas`} tabIndex={-1}>
          <span className={styles.num}>03</span> Quais peças?*
        </legend>
        <div className={styles.chips}>
          {LAB_PIECES.map((p) => (
            <Chip key={p} size="sm" pressed={form.pecas.includes(p)} onClick={() => toggle('pecas', p)}>
              {p}
            </Chip>
          ))}
        </div>
        {err('pecas')}

        <span className={styles.label}>Quantidade estimada por modelo</span>
        <div className={styles.chips}>
          {LAB_QUANTITIES.map((q) => (
            <Chip key={q} size="sm" pressed={form.quantidade === q} onClick={() => set('quantidade', form.quantidade === q ? '' : q)}>
              {q}
            </Chip>
          ))}
        </div>

        <span className={styles.label}>Acabamento que você imagina</span>
        <div className={styles.chips}>
          {LAB_TECHNIQUES.map((t) => (
            <Chip key={t} size="sm" pressed={form.tecnicas.includes(t)} onClick={() => toggle('tecnicas', t)}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* ------------------------------------------------------ ideia */}
      <fieldset className={styles.block}>
        <legend className={styles.legend}>
          <span className={styles.num}>04</span> A ideia
        </legend>
        <div className={styles.field}>
          <label htmlFor={`${uid}-ideia`} className={styles.label}>
            Conte o conceito: público, estilo, cores, caimento, o que não pode faltar*
          </label>
          <textarea
            id={`${uid}-ideia`}
            rows={6}
            value={form.ideia}
            onChange={(e) => set('ideia', e.target.value)}
            aria-invalid={errors.ideia ? true : undefined}
            aria-describedby={errors.ideia ? `${uid}-ideia-erro` : undefined}
            className={styles.input}
            maxLength={2000}
          />
          <span className={styles.counter}>{form.ideia.length} / 2000</span>
          {err('ideia')}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${uid}-prazo`} className={styles.label}>
            Quando quer lançar?
          </label>
          <input type="text" placeholder="ex.: verão 2027, dezembro, sem pressa" {...text('prazo')} />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Referências visuais (até {MAX_REFS} imagens)</span>
          <label className={styles.drop} data-disabled={refs.length >= MAX_REFS || undefined}>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={refs.length >= MAX_REFS}
              onChange={(e) => {
                onFiles(e.target.files)
                e.target.value = ''
              }}
              className="u-visually-hidden"
            />
            <span className={styles.dropBar} aria-hidden="true" />
            <span>
              <strong>Escolher imagens</strong>
              <span className={styles.dropHint}>Elas ficam só no seu aparelho. Você anexa as imagens na conversa do WhatsApp.</span>
            </span>
          </label>
          {refs.length ? (
            <ul className={styles.refs}>
              {refs.map((r) => (
                <li key={r.url} className={styles.ref}>
                  <img src={r.url} alt={`Referência: ${r.name}`} />
                  <button type="button" onClick={() => removeRef(r.url)} aria-label={`Remover ${r.name}`}>
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </fieldset>

      <div className={styles.submit}>
        <Cta type="submit" size="lg" icon="whatsapp">
          Enviar ideia pelo WhatsApp
        </Cta>
        <p className={styles.note}>Sem compromisso. A primeira conversa é para entender a marca.</p>
      </div>
    </form>
  )
}
