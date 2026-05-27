# plan.md — Taller Express
**SDD v3.0 · Fase 3 · Denysoft · Mayo 2026 · Confidencial**

> Arquitectura técnica del proyecto. Define cómo se construye — no qué ni cómo se ve.
> Prerequisitos: `brief.md` ✅ · `spec.md` ✅ · `design.md` ✅

---

## 01 — ARQUITECTURA GENERAL

### Tipo de proyecto
**Greenfield + Reference Source**

```
/mnt/c/dev/lab/
├── magzin-react/          ← SOLO LECTURA — referencia visual
└── taller-express/        ← BUILD aquí
    ├── docs/              ← Artifacts SDD
    ├── app/               ← Next.js App Router
    ├── components/        ← Componentes reutilizables
    ├── content/           ← Artículos MDX
    ├── lib/               ← Utilidades y helpers
    ├── public/            ← Assets estáticos y fuentes
    └── CLAUDE.md          ← Fuente 3 — design system para el BUILD Agent
```

### Patrón arquitectónico

**Server-first con islands de interactividad.** Next.js 16.2 App Router por defecto renderiza en servidor. Solo se marca como Client Component (`'use client'`) lo que requiere interactividad real: formularios con estado, filtros de categoría, marquee animado.

```
Server Components (por defecto):
├── Layout · Nav · Footer
├── HomePage (orquestador)
├── BlogPage (listado)
├── ArticlePage (lectura)
└── Secciones estáticas (Hero texto, Pilares, Intriga texto)

Client Components ('use client'):
├── EmailCapture (estado del formulario)
├── CategoryFilter (filtro sin reload)
├── CategoryMarquee (animación)
└── ArticleCard arrow-box (hover effect)
```

---

## 02 — STACK TÉCNICO DETALLADO

### Scaffold inicial

```bash
cd /mnt/c/dev/lab
pnpm create next-app@latest taller-express --yes
cd taller-express
```

El flag `--yes` activa por defecto:
- TypeScript ✅
- Tailwind CSS ✅
- App Router ✅
- Turbopack ✅
- ESLint ✅
- Import alias `@/*` ✅
- `AGENTS.md` + `CLAUDE.md` base ✅ — el BUILD Agent extiende este CLAUDE.md con la Fuente 3

### Dependencias adicionales a instalar

```bash
# Animaciones scroll-triggered
pnpm add gsap                 # GSAP + ScrollTrigger — mismo que Magzin

# Contenido MDX
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add next-mdx-remote
pnpm add gray-matter          # parsear frontmatter YAML

# Fuentes self-hosted
pnpm add next/font            # incluido en Next.js — no requiere install adicional

# Marquee
pnpm add react-fast-marquee   # mismo que usa Magzin

# Email
pnpm add @brevo-sdk/react     # integración Brevo

# Utilidades
pnpm add clsx                 # classnames condicionales
pnpm add date-fns             # formateo de fechas
```

### Dependencias que NO se instalan

| Dependencia de Magzin | Razón de exclusión |
|---|---|
| Bootstrap | Reemplazado por Tailwind |
| WOW.js | Reemplazado por GSAP ScrollTrigger — misma función, una sola librería |
| Howler | Sin audio en Fase 1 |
| Isotope | Sin filtros isotope — filtro propio |
| Swiper | Sin carousels en Fase 1 — evaluar en Fase 2 |
| split-text | Reemplazado por implementación manual en useTextAnimation (igual que Magzin fallback) |

---

## 03 — ARQUITECTURA DE ARCHIVOS COMPLETA

```
taller-express/
│
├── app/
│   ├── layout.tsx              ← RootLayout: fuentes, metadata global, Nav, Footer
│   ├── page.tsx                ← HomePage — orquesta secciones
│   ├── blog/
│   │   ├── page.tsx            ← BlogPage — listado + filtro categoría
│   │   └── [slug]/
│   │       └── page.tsx        ← ArticlePage — lectura individual
│   ├── guia/
│   │   └── page.tsx            ← GuiaPage — lead magnet placeholder
│   ├── privacidad/
│   │   └── page.tsx            ← PrivacidadPage — placeholder
│   ├── globals.css             ← CSS vars de marca + Tailwind base
│   └── sitemap.ts              ← Generación automática sitemap.xml
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             ← Server Component
│   │   └── Footer.tsx          ← Server Component
│   │
│   ├── sections/               ← Una sección = un componente
│   │   ├── Hero.tsx            ← Server — texto + EmailCapture client
│   │   ├── CategoryMarquee.tsx ← Client — animación loop
│   │   ├── ArticlesGrid.tsx    ← Server — recibe articles como prop
│   │   ├── Pillars.tsx         ← Server — estático
│   │   ├── LeadMagnet.tsx      ← Server — EmailCapture client embebido
│   │   ├── Intriga.tsx         ← Server — EmailCapture client embebido
│   │   └── RelatedArticles.tsx ← Server — 2 artículos relacionados
│   │
│   ├── cards/
│   │   └── ArticleCard.tsx     ← Server + arrow-box client hover
│   │
│   ├── ui/
│   │   ├── EmailCapture.tsx    ← Client — formulario + estado + Brevo
│   │   ├── CategoryFilter.tsx  ← Client — tabs filtro sin reload
│   │   ├── SectionTitle.tsx    ← Server — ícono + título + descripción
│   │   ├── CategoryBadge.tsx   ← Server — badge de categoría
│   │   └── ViewMore.tsx        ← Server + CSS hover animation
│   │
│   └── pdf-placeholder/
│       └── PDFPlaceholder.tsx  ← Server — SVG documento simulado
│
├── content/
│   └── blog/
│       ├── cada-cuanto-cambiar-aceite-carro.mdx
│       ├── cuanto-cuesta-cambio-aceite-el-salvador.mdx
│       └── senales-frenos-necesitan-revision.mdx
│
├── lib/
│   ├── mdx.ts                  ← Leer y parsear archivos MDX
│   ├── articles.ts             ← getArticles() · getArticleBySlug() · getRelated()
│   └── brevo.ts                ← submitEmail() con tag diferenciador
│
├── public/
│   ├── fonts/
│   │   ├── Syne-Bold.woff2
│   │   ├── Syne-ExtraBold.woff2
│   │   ├── DMSans-Regular.woff2
│   │   ├── DMSans-Medium.woff2
│   │   └── DMSans-SemiBold.woff2
│   ├── noise.svg               ← Grain para S5-Intriga
│   └── favicon.ico
│
├── docs/                       ← Artifacts SDD
│   ├── brief.md               ✅
│   ├── spec.md                ✅
│   ├── design.md              ✅
│   ├── plan.md                ← Este documento
│   ├── tasks.md               ⬜ Fase 4
│   └── CLAUDE.md              ⬜ Fase 5
│
├── CLAUDE.md                   ← Fuente 3 — design system completo para BUILD Agent
├── next.config.ts              ← Config MDX + headers de seguridad
├── tailwind.config.ts          ← Tokens de marca + extend
├── tsconfig.json               ← Paths alias @/*
└── .env.local                  ← BREVO_API_KEY (nunca en client-side)
```

---

## 04 — CAPA DE DATOS

### Estrategia MDX

Sin CMS. Los artículos son archivos `.mdx` en `/content/blog/`. Next.js los lee en build time — cero latencia en runtime.

```typescript
// lib/articles.ts — interfaz de datos

export interface Article {
  slug: string
  title: string
  date: string
  category: 'educacion' | 'costos' | 'confianza' | 'comunidad'
  readTime: string
  excerpt: string
  canal: 'facebook' | 'instagram' | 'ambos'
  segmento: 'todos' | 'mujer' | 'joven' | 'profesional'
  content: string // MDX compilado
}

// Funciones principales
export async function getAllArticles(): Promise<Article[]>
export async function getArticleBySlug(slug: string): Promise<Article>
export async function getArticlesByCategory(category: string): Promise<Article[]>
export async function getRelatedArticles(slug: string, category: string, limit: number): Promise<Article[]>
export async function getLatestArticles(limit: number): Promise<Article[]>
```

### Estrategia de renderizado por página

| Página | Estrategia | Justificación |
|---|---|---|
| `/` | SSG (Static) | Contenido no cambia en runtime |
| `/blog` | ISR — revalidate: 3600 | Nuevo artículo cada 3–4 días |
| `/blog/[slug]` | SSG + generateStaticParams | Todos los slugs conocidos en build |
| `/guia` | SSG | Placeholder estático |
| `/privacidad` | SSG | Estático |

```typescript
// app/blog/page.tsx
export const revalidate = 3600 // ISR: revalidar cada hora

// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map(a => ({ slug: a.slug }))
}
```

---

## 05 — INTEGRACIÓN BREVO

### Arquitectura del formulario

El email nunca toca el cliente con credenciales. Flujo:

```
EmailCapture (Client)
    → POST /api/subscribe
        → Server Action o Route Handler
            → Brevo API (server-side con BREVO_API_KEY)
                → Lista + tag diferenciador
```

### Route Handler

```typescript
// app/api/subscribe/route.ts

export async function POST(request: Request) {
  const { email, name, tag } = await request.json()

  // Validación server-side
  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Email inválido' }, { status: 400 })
  }

  // Llamada a Brevo API
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      attributes: { FNAME: name || '' },
      listIds: [Number(process.env.BREVO_LIST_ID)],
      updateEnabled: true,
      tags: [tag], // 'hero-home' | 'leadmagnet-home' | etc.
    }),
  })

  if (!res.ok) {
    return Response.json({ error: 'Error al suscribir' }, { status: 500 })
  }

  return Response.json({ success: true })
}
```

### Variables de entorno

```bash
# .env.local — NUNCA exponer al cliente
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=1

# .env.example — documentar sin valores
BREVO_API_KEY=
BREVO_LIST_ID=
```

---

## 06 — TAILWIND CONFIG

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'te-navy':      '#0F2557',
        'te-navy-deep': '#080f1f',
        'te-orange':    '#F5820D',
        'te-orange-h':  '#d96e0a',
        'te-bg':        '#f7f8f9',
        'te-bg-alt':    '#eaecee',
        'te-card':      '#ffffff',
        'te-text':      '#0e0e0f',
        'te-muted':     '#626568',
        'te-border':    '#e5e7eb',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'ds-1': ['clamp(48px, 6vw, 80px)', { lineHeight: '1.1', fontWeight: '800' }],
        'ds-2': ['clamp(40px, 5vw, 72px)', { lineHeight: '1.1', fontWeight: '800' }],
        'ds-3': ['clamp(32px, 4vw, 64px)', { lineHeight: '1.2', fontWeight: '700' }],
      },
      borderRadius: {
        'card': '20px',  // card-1 de Magzin
      },
      maxWidth: {
        'reading': '680px',
        'site':    '1280px',
      },
      boxShadow: {
        'te': '0px 20px 60px 0px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 07 — NEXT.CONFIG

```typescript
// next.config.ts

import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true, // Rust-based MDX compiler — más rápido
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
```

---

## 08 — GLOBALS.CSS

```css
/* app/globals.css */

@import 'tailwindcss';

@layer base {
  :root {
    --te-navy:      #0F2557;
    --te-navy-deep: #080f1f;
    --te-orange:    #F5820D;
    --te-orange-h:  #d96e0a;
    --te-bg:        #f7f8f9;
    --te-bg-alt:    #eaecee;
    --te-card:      #ffffff;
    --te-text:      #0e0e0f;
    --te-muted:     #626568;
    --te-border:    #e5e7eb;
    --te-shadow:    0px 20px 60px 0px rgba(0, 0, 0, 0.08);

    --te-ff-display: 'Syne', sans-serif;
    --te-ff-body:    'DM Sans', sans-serif;
  }

  html {
    font-family: var(--te-ff-body);
    background-color: var(--te-bg);
    color: var(--te-text);
  }

  /* View-more animado — extraído de Magzin */
  .view-more {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .view-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
    background-color: var(--te-navy);
  }

  .view-more:hover .circle {
    width: 100%;
    background-color: var(--te-navy);
  }

  .view-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    padding-left: 3.75rem;
    font-family: var(--te-ff-body);
    font-weight: 600;
    color: var(--te-navy);
  }

  .view-more:hover .button-text {
    color: #ffffff;
  }

  /* Arrow-box hover */
  .arrow-box {
    transition: all 0.3s ease-in-out;
    border: 1px solid var(--te-border);
    border-radius: 8px;
  }

  .arrow-box:hover,
  .article:hover .arrow-box {
    background-color: var(--te-navy);
    border-color: var(--te-navy);
    transform: rotate(-45deg);
  }

  /* prefers-reduced-motion — accesibilidad */
  @media (prefers-reduced-motion: reduce) {
    .te-split-char,
    .te-anime-top,
    .te-anime-left {
      opacity: 1 !important;
      transform: none !important;
    }
  }
}
```

---

## 09 — SEO Y METADATA

```typescript
// app/layout.tsx — metadata global

export const metadata: Metadata = {
  metadataBase: new URL('https://tallerexpress.one'),
  title: {
    default: 'Taller Express — Tu Agente Automotriz en El Salvador',
    template: '%s | Taller Express',
  },
  description: 'Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador.',
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    siteName: 'Taller Express',
  },
}

// app/blog/[slug]/page.tsx — metadata dinámica por artículo

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  }
}
```

---

## 10 — SEGURIDAD (NO OPCIONAL)

Aplicando los estándares de Denysoft SDD:

| Medida | Implementación |
|---|---|
| ENV vars nunca en cliente | `BREVO_API_KEY` solo en Route Handler server-side |
| `.env.local` en `.gitignore` | Verificar en primer commit |
| `.env.example` documentado | Con todas las keys necesarias, sin valores |
| Sanitización de inputs | Validación server-side en `/api/subscribe` |
| Rate limiting | `next-rate-limit` en Route Handler de suscripción |
| Headers de seguridad | X-Frame-Options · X-Content-Type-Options · Referrer-Policy |
| TypeScript estricto | `strict: true` en tsconfig — sin `any` implícito |

---

## 11 — FUENTES SELF-HOSTED

```typescript
// app/layout.tsx — carga de fuentes con next/font

import localFont from 'next/font/local'

const syne = localFont({
  src: [
    { path: '../public/fonts/Syne-Bold.woff2',      weight: '700' },
    { path: '../public/fonts/Syne-ExtraBold.woff2', weight: '800' },
  ],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = localFont({
  src: [
    { path: '../public/fonts/DMSans-Regular.woff2',  weight: '400' },
    { path: '../public/fonts/DMSans-Medium.woff2',   weight: '500' },
    { path: '../public/fonts/DMSans-SemiBold.woff2', weight: '600' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
})
```

> ⚠️ Descargar los archivos `.woff2` de Google Fonts antes del build.
> No usar Google Fonts CDN — self-hosted para performance y privacidad.

---

## 12 — DECISIONES DE ARQUITECTURA

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| App Router | Pages Router | Futuro del framework — Fase 3 requiere Server Actions |
| MDX local | Contentful / Sanity | Sin costo · sin latencia · Denys escribe en Markdown |
| ISR en `/blog` | Full SSG | Nuevo artículo no requiere rebuild completo |
| Route Handler para Brevo | Client-side fetch | BREVO_API_KEY nunca expuesta al cliente |
| next/font local | Google Fonts CDN | Performance + privacidad |
| react-fast-marquee | CSS animation | Mismo que Magzin — comportamiento comprobado |
| Turbopack (default 16.2) | Webpack | 50% más rápido en dev — ya incluido |

---

## 13 — ARQUITECTURA DE ANIMACIONES — GSAP

### Estrategia

Magzin usa dos mecanismos de animación que se unifican en Taller Express bajo GSAP:
- **GSAP + ScrollTrigger** → animaciones de texto al scroll (`.text-anime-style-2` y `.text-anime-style-3`)
- **WOW.js** → animaciones de entrada de elementos (`wow img-custom-anim-top`, `wow img-custom-anim-left`)

En TE se consolidan ambos bajo un solo sistema GSAP + ScrollTrigger. WOW.js no se instala.

### Componente ClientEffects — Next.js

En Magzin, `ClientEffects.tsx` se monta en el layout y activa los hooks globalmente. En Next.js 16.2 App Router el equivalente es un Client Component montado en `RootLayout`:

```typescript
// components/layout/ClientEffects.tsx
'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ClientEffects() {
  useEffect(() => {
    // Animación de texto — equivalente a text-anime-style-2 de Magzin
    // Caracteres entran con slide desde x:50 + stagger 0.02
    const textElements = document.querySelectorAll('.te-anime-text')

    textElements.forEach((element) => {
      const text = element.textContent || ''
      element.innerHTML = text
        .split('')
        .map(char => char === ' '
          ? '<span style="display:inline-block">&nbsp;</span>'
          : `<span class="te-split-char" style="display:inline-block">${char}</span>`
        )
        .join('')

      const chars = element.querySelectorAll('.te-split-char')

      gsap.set(chars, { opacity: 0, x: 50 })

      gsap.to(chars, {
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.02,
      })
    })

    // Animación de entrada desde abajo — equivalente a wow img-custom-anim-top
    const animTopElements = document.querySelectorAll('.te-anime-top')

    gsap.fromTo(animTopElements,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: animTopElements[0],
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
      }
    )

    // Animación de entrada desde la izquierda — equivalente a wow img-custom-anim-left
    const animLeftElements = document.querySelectorAll('.te-anime-left')

    animLeftElements.forEach((element) => {
      gsap.fromTo(element,
        { opacity: 0, x: -40 },
        {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return null
}
```

### Integración en RootLayout

```typescript
// app/layout.tsx

import ClientEffects from '@/components/layout/ClientEffects'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${syne.variable} ${dmSans.variable}`}>
        <ClientEffects />   {/* ← monta las animaciones globalmente */}
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Clases de animación — uso en componentes

| Clase CSS | Efecto | Equivalente Magzin | Usar en |
|---|---|---|---|
| `te-anime-text` | Caracteres entran desde x:50 + stagger | `text-anime-style-2` | H1 Hero · Section titles |
| `te-anime-top` | Elemento entra desde y:40 | `wow img-custom-anim-top` | Cards · Pilares · Marquee |
| `te-anime-left` | Elemento entra desde x:-40 | `wow img-custom-anim-left` | Bloques de 2 columnas |

### Componentes que reciben animación

| Componente | Clase | Elementos animados |
|---|---|---|
| `Hero.tsx` | `te-anime-text` | H1 completo — cada carácter |
| `SectionTitle.tsx` | `te-anime-text` | Título de cada sección |
| `ArticleCard.tsx` | `te-anime-top` | Cards del grid — stagger entre cards |
| `Pillars.tsx` | `te-anime-top` | Las 3 pillar cards |
| `CategoryMarquee.tsx` | `te-anime-top` | El bloque completo |
| `LeadMagnet.tsx` | `te-anime-left` | Bloque izquierda · `te-anime-top` bloque derecha |
| `Intriga.tsx` | `te-anime-text` | Headline de intriga |

### Consideraciones de accesibilidad

```css
/* globals.css — respetar prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .te-split-char,
  .te-anime-top,
  .te-anime-left {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
}
```

### Consideraciones de performance

- GSAP se carga solo en cliente (`'use client'`) — no bloquea SSR
- `ScrollTrigger.getAll().forEach(t => t.kill())` en cleanup previene memory leaks
- En mobile se mantienen las animaciones pero con duración reducida: `duration: 0.6` en viewport < 768px
- `split-text` de GSAP Pro no se instala — la implementación manual de Magzin (split por caracteres con spans) es suficiente y está comprobada

---

## 14 — GATE CRITERIA — FASE 3 COMPLETA

- [x] Arquitectura de archivos completa definida
- [x] Stack de dependencias declarado (instalar vs. excluir)
- [x] GSAP + ScrollTrigger integrado — equivalente a Magzin (text-anime + wow)
- [x] Clases de animación definidas por componente
- [x] Accesibilidad: prefers-reduced-motion documentado
- [x] Estrategia de renderizado por página (SSG / ISR)
- [x] Capa de datos MDX especificada con interfaces TypeScript
- [x] Integración Brevo: Route Handler + env vars + seguridad
- [x] tailwind.config.ts con tokens de marca
- [x] next.config.ts con MDX y headers de seguridad
- [x] globals.css con CSS vars + animaciones de Magzin
- [x] SEO y metadata dinámica especificados
- [x] Medidas de seguridad SDD documentadas
- [x] Fuentes self-hosted con next/font
- [x] Decisiones de arquitectura documentadas con justificación
- [ ] **Aprobación de Master** → avanzar a Fase 4 (tasks.md)

---

*Taller Express · plan.md · SDD v3.0 · Denysoft · Mayo 2026*
*Generado por PLAN Agent*
*Próximo artifact: tasks.md (Fase 4)*
