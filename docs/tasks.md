# tasks.md — Taller Express
**SDD v3.0 · Fase 4 · Denysoft · Mayo 2026 · Confidencial**

> Lista de tareas ordenada y priorizada para el BUILD Agent.
> Cada tarea es atómica, verificable y tiene criterio de done explícito.
> Prerequisitos: `brief.md` ✅ · `spec.md` ✅ · `design.md` ✅ · `plan.md` ✅
>
> ⚠️ REGLA CRÍTICA: El BUILD Agent lee las 3 fuentes antes de ejecutar cualquier tarea.
> Fuente 1: `/mnt/c/dev/lab/magzin-react/` · Fuente 2: `content/` · Fuente 3: `CLAUDE.md`

---

## PROTOCOLO DE ARRANQUE — OBLIGATORIO

Antes de escribir una línea de código el BUILD Agent debe:

1. Leer `docs/CLAUDE.md` completo
2. Confirmar acceso a las 3 fuentes con sus rutas absolutas
3. Describir brevemente qué encontró en cada una
4. Solo entonces ejecutar el Task 01

Si el BUILD Agent no ejecuta este protocolo — detenerlo.

---

## BLOQUES DE TRABAJO

```
BLOQUE A — Setup y configuración        Tasks 01–05
BLOQUE B — Layout global                Tasks 06–08
BLOQUE C — Homepage                     Tasks 09–15
BLOQUE D — Blog                         Tasks 16–19
BLOQUE E — Páginas secundarias          Tasks 20–22
BLOQUE F — Animaciones GSAP             Tasks 23–25
BLOQUE G — Integración Brevo            Tasks 26–27
BLOQUE H — SEO y deploy                 Tasks 28–30
```

Ejecutar en orden. No avanzar al siguiente bloque sin completar el anterior.

---

## BLOQUE A — SETUP Y CONFIGURACIÓN

---

### TASK 01 — Scaffold del proyecto

**Prioridad:** Crítica · **Bloque:** A

```bash
cd /mnt/c/dev/lab
pnpm create next-app@latest taller-express --yes
cd taller-express
```

**Verificar que el scaffold incluye:**
- `app/` con App Router
- `tailwind.config.ts`
- `tsconfig.json` con `@/*` alias
- `CLAUDE.md` generado por Next.js (extender en Fase 5, no modificar aún)

**Done cuando:**
- [ ] `pnpm dev` corre sin errores en `localhost:3000`
- [ ] No hay errores de TypeScript en consola
- [ ] Turbopack activo (mensaje en consola: "▲ Next.js 16.x.x (Turbopack)")

---

### TASK 02 — Instalar dependencias

**Prioridad:** Crítica · **Bloque:** A

```bash
# Animaciones
pnpm add gsap

# Contenido MDX
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add next-mdx-remote
pnpm add gray-matter

# Marquee
pnpm add react-fast-marquee

# Utilidades
pnpm add clsx
pnpm add date-fns
```

**Done cuando:**
- [ ] `pnpm dev` sigue corriendo sin errores post-install
- [ ] `node_modules/gsap` existe
- [ ] `node_modules/gray-matter` existe

---

### TASK 03 — Configurar tailwind.config.ts

**Prioridad:** Crítica · **Bloque:** A

Reemplazar el `tailwind.config.ts` del scaffold con los tokens de marca de Taller Express según `docs/design.md` Sección 04 y 07.

**Tokens a incluir:**
- Colores: `te-navy`, `te-navy-deep`, `te-orange`, `te-orange-h`, `te-bg`, `te-bg-alt`, `te-card`, `te-text`, `te-muted`, `te-border`
- Fuentes: `display` (Syne), `body` (DM Sans)
- Font sizes: `ds-1`, `ds-2`, `ds-3` con clamp()
- Border radius: `card` (20px)
- Max width: `reading` (680px), `site` (1280px)
- Box shadow: `te`

**Done cuando:**
- [ ] `className="text-te-orange"` renderiza `#F5820D` en el browser
- [ ] `className="font-display"` renderiza Syne
- [ ] `className="text-ds-1"` renderiza con clamp correcto
- [ ] No hay warnings de Tailwind en consola

---

### TASK 04 — Configurar next.config.ts y globals.css

**Prioridad:** Crítica · **Bloque:** A

**next.config.ts:** Según `docs/plan.md` Sección 07:
- Integrar `@next/mdx` con `createMDX`
- Agregar `pageExtensions: ['ts', 'tsx', 'mdx']`
- Habilitar `mdxRs: true`
- Agregar headers de seguridad

**globals.css:** Según `docs/plan.md` Sección 08:
- CSS Custom Properties de marca (`--te-navy`, `--te-orange`, etc.)
- Clase `.view-more` con animación cubic-bezier extraída de Magzin
- Clase `.arrow-box` con hover rotate(−45deg)
- `prefers-reduced-motion` para `.te-split-char`, `.te-anime-top`, `.te-anime-left`

**Done cuando:**
- [ ] `next.config.ts` compila sin errores
- [ ] Variables CSS disponibles en devtools bajo `:root`
- [ ] `.view-more:hover .circle` expande correctamente en browser

---

### TASK 05 — Estructura de carpetas y fuentes

**Prioridad:** Crítica · **Bloque:** A

**Crear estructura según `docs/plan.md` Sección 03:**

```bash
mkdir -p components/layout
mkdir -p components/sections
mkdir -p components/cards
mkdir -p components/ui
mkdir -p components/pdf-placeholder
mkdir -p content/blog
mkdir -p lib
mkdir -p public/fonts
```

**Fuentes self-hosted:**
- Descargar de Google Fonts: Syne 700 y 800, DM Sans 400/500/600 en `.woff2`
- Guardar en `public/fonts/`
- Configurar `next/font/local` en `app/layout.tsx`

**Crear archivos placeholder vacíos:**
```bash
touch lib/mdx.ts
touch lib/articles.ts
touch lib/brevo.ts
touch .env.example
```

**Contenido mínimo de `.env.example`:**
```bash
BREVO_API_KEY=
BREVO_LIST_ID=
```

**Done cuando:**
- [ ] Estructura de carpetas completa
- [ ] `.woff2` de Syne y DM Sans en `public/fonts/`
- [ ] `pnpm dev` sigue funcionando
- [ ] `.env.local` en `.gitignore` ✅ (scaffold lo incluye por defecto)

---

## BLOQUE B — LAYOUT GLOBAL

---

### TASK 06 — Componente Nav

**Prioridad:** Alta · **Bloque:** B
**Referencia visual:** `magzin-react/src/components/layout/header/Header1.tsx`

**Especificación funcional:** `docs/spec.md` → NAV
**Especificación visual:** `docs/design.md` → Sección 08 → Nav

**Estructura:**
- Server Component — sin `'use client'`
- Fixed top con backdrop-filter blur(16px)
- Izquierda: wordmark "Taller**Express**" — "Taller" en `te-navy`, "Express" en `te-orange` · font-display 800
- Centro desktop: links "Artículos" → `/blog` · "La Guía" → `/guia`
- Derecha: botón píldora naranja "Síguenos" → Instagram (nueva pestaña) · `href` como prop desde env var o config
- Mobile: wordmark + botón únicamente — sin hamburger

**Anti-patterns a evitar:**
- ❌ No copiar clases `.navbar`, `.topbar` de Magzin
- ❌ No incluir ThemeSwitcher — sin dark mode
- ❌ No incluir SideBar ni PopupSearch

**Done cuando:**
- [ ] Nav visible en todas las páginas
- [ ] Wordmark "Express" en naranja correctamente
- [ ] No cambia apariencia al hacer scroll
- [ ] Mobile: solo wordmark + botón
- [ ] "Síguenos" abre nueva pestaña

---

### TASK 07 — Componente Footer

**Prioridad:** Alta · **Bloque:** B
**Referencia visual:** `magzin-react/src/components/layout/footer/Footer1.tsx`

**Especificación funcional:** `docs/spec.md` → FOOTER
**Especificación visual:** `docs/design.md` → Sección 08 → Footer

**Estructura:**
- Server Component
- Fondo `--te-navy-deep` (#080f1f)
- Wordmark "TallerExpress" · Syne 800 · blanco
- Tagline: `"Tu Agente Automotriz"` · DM Sans · rgba(255,255,255,0.6)
- Íconos SVG: Instagram + Facebook — outline, rgba(255,255,255,0.6) → hover blanco
- Link WhatsApp formato `wa.me/503XXXXXXXX` (número desde env var)
- Copyright + link `/privacidad`

**Done cuando:**
- [ ] Fondo navy-deep correcto
- [ ] Todos los links funcionales
- [ ] WhatsApp usa formato `wa.me/`
- [ ] Íconos SVG renderizados correctamente

---

### TASK 08 — RootLayout con ClientEffects

**Prioridad:** Alta · **Bloque:** B

**Archivo:** `app/layout.tsx`

**Responsabilidades:**
- Cargar fuentes self-hosted con `next/font/local`
- Variables CSS de fuentes como CSS vars (`--font-syne`, `--font-dm-sans`)
- Metadata global (ver `docs/plan.md` Sección 09)
- Montar `<Nav />` y `<Footer />`
- Montar `<ClientEffects />` (Client Component — se construye en Task 23)
- `lang="es"` en `<html>`

**Done cuando:**
- [ ] Fuentes Syne y DM Sans cargan correctamente (verificar en Network tab)
- [ ] Metadata global visible en `<head>`
- [ ] Nav y Footer presentes en todas las rutas
- [ ] Sin errores de hidratación en consola

---

## BLOQUE C — HOMEPAGE

---

### TASK 09 — Sección Hero (S1)

**Prioridad:** Alta · **Bloque:** C
**Referencia visual:** `magzin-react/src/components/sections/home/Section1.tsx` — tomar composición centrada y espaciado generoso. NO el Swiper.

**Especificación funcional:** `docs/spec.md` → S1 Hero
**Especificación visual:** `docs/design.md` → Sección 09 ritmo + Sección 08 componentes

**Estructura:**
- Server Component — `EmailCapture` embebido como Client Component
- Fondo `--te-bg` (#f7f8f9)
- Padding vertical: `py-20` desktop · `py-14` mobile
- Eyebrow: copy exacto `"El Salvador · Santa Tecla · Antiguo Cuscatlán"` → clase `te-anime-top`
- H1: copy exacto 3 líneas → clase `te-anime-text` — "complicado" con `<span className="text-te-orange">`
- Subtítulo: copy exacto → DM Sans 17px · `te-muted`
- Línea de intriga: copy exacto → separada visualmente, DM Sans · `te-muted` · tamaño menor
- `<EmailCapture tag="hero-home" placeholder="Tu correo electrónico" cta="Avisame →" />`
- Placeholder visual central: `<PDFPlaceholder />` estilo abstracto — construido en SVG

**Copy exacto (no modificar una palabra):**
- Eyebrow: `"El Salvador · Santa Tecla · Antiguo Cuscatlán"`
- H1: `"El mantenimiento / de tu carro no debería / ser tan complicado."`
- Subtítulo: `"Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador."`
- Intriga: `"Algo más está en camino. Llevamos meses construyéndolo."`

**Done cuando:**
- [ ] Copy exacto — sin modificaciones
- [ ] "complicado" en `te-orange`
- [ ] `te-anime-text` aplicado al H1
- [ ] EmailCapture visible y funcional (conectar en Task 26)
- [ ] Responsive — H1 escala con clamp()

---

### TASK 10 — Componente EmailCapture

**Prioridad:** Alta · **Bloque:** C

**Archivo:** `components/ui/EmailCapture.tsx`

```typescript
'use client'

interface EmailCaptureProps {
  tag: string           // 'hero-home' | 'leadmagnet-home' | 'intriga-home' | 'end-article' | 'guia-page'
  placeholder?: string
  cta?: string
  variant?: 'light' | 'dark'  // light = fondo claro, dark = S5-Intriga
  showName?: boolean    // true solo en S4-LeadMagnet y /guia
}
```

**Comportamiento:**
- Estado: `email`, `name` (si showName), `status: 'idle' | 'loading' | 'success' | 'error'`
- Validación client-side: formato email antes de enviar
- `POST /api/subscribe` con `{ email, name, tag }`
- En `success`: mensaje de confirmación inline — sin redirect
- En `error`: mensaje de error inline
- Sin double opt-in

**Variante light:** input con borde `te-border` + botón `te-orange`
**Variante dark:** input con fondo `rgba(255,255,255,0.08)` + botón `te-orange` + texto blanco

**Done cuando:**
- [ ] Validación de email funciona client-side
- [ ] Estado de loading visible durante el POST
- [ ] Confirmación inline al enviar exitosamente
- [ ] Error inline si falla
- [ ] Ambas variantes (light/dark) renderizan correctamente

---

### TASK 11 — Componente SectionTitle

**Prioridad:** Media · **Bloque:** C
**Referencia visual:** `magzin-react/src/components/elements/TitleWhite.tsx`

**Archivo:** `components/ui/SectionTitle.tsx`

```typescript
interface SectionTitleProps {
  title: string
  description?: string
  viewMoreHref?: string
  viewMoreLabel?: string
}
```

**Estructura:**
- Ícono estrella 4 puntas SVG en `te-orange` (reemplaza negro de Magzin)
- Título: Syne 700 · 24px · `te-text` · clase `te-anime-text`
- Descripción inline: DM Sans 400 · 14px · `te-muted`
- Si `viewMoreHref`: componente `.view-more` a la derecha

**Done cuando:**
- [ ] Ícono estrella SVG en naranja
- [ ] Animación `te-anime-text` en título
- [ ] `.view-more` funciona con animación cubic-bezier
- [ ] Responsive: descripción oculta en mobile

---

### TASK 12 — Componente ArticleCard

**Prioridad:** Alta · **Bloque:** C
**Referencia visual:** `magzin-react/src/components/cards/ArticleCard3.tsx` — versión compacta horizontal como base, adaptada a vertical sin imagen

**Archivo:** `components/cards/ArticleCard.tsx`

```typescript
interface ArticleCardProps {
  article: {
    slug: string
    title: string
    excerpt: string
    category: string
    readTime: string
    date: string
  }
}
```

**Estructura:**
- Server Component
- Sin imagen en Fase 1
- Fondo `te-card` (#ffffff) · borde `1px solid te-border` · `border-radius: 16px`
- Badge de categoría: `te-orange` bg · blanco · 12px · uppercase · `border-radius: 4px` · `letter-spacing: 1.5px`
- Título: Syne 700 · 18px · `te-text` · máximo 2 líneas
- Extracto: DM Sans 400 · 14px · `te-muted` · máximo 2 líneas · `line-clamp-2`
- Metadata: DM Sans 400 · 12px · `te-muted` · fecha + tiempo de lectura
- Arrow-box en esquina: borde `te-border` → hover fill `te-navy` + flecha blanca + rotate(−45deg)
- Card completa clickeable → `/blog/[slug]`
- Clase `te-anime-top` en el wrapper

**Done cuando:**
- [ ] Card renderiza correctamente con datos reales de MDX
- [ ] Badge de categoría en naranja con texto correcto
- [ ] Arrow-box anima en hover (rotate −45deg)
- [ ] Card completa es clickeable
- [ ] `te-anime-top` aplicado

---

### TASK 13 — Sección ArticlesGrid (S2)

**Prioridad:** Alta · **Bloque:** C

**Archivo:** `components/sections/ArticlesGrid.tsx`

**Estructura:**
- Server Component — recibe `articles: Article[]` como prop
- `<SectionTitle title="Lo último" viewMoreHref="/blog" viewMoreLabel="Ver todos" />`
- Grid: 3 cols desktop · 1 col mobile · `gap-6`
- Mapea los 3 artículos más recientes a `<ArticleCard />`
- Los artículos vienen de `lib/articles.ts → getLatestArticles(3)`

**Done cuando:**
- [ ] Muestra exactamente 3 artículos
- [ ] "Ver todos →" navega a `/blog`
- [ ] Grid: 3 cols → 1 col mobile
- [ ] Se actualiza con nuevos artículos sin rebuild (ISR)

---

### TASK 14 — Sección Pillars (S3) y CategoryMarquee (S2)

**Prioridad:** Media · **Bloque:** C

**CategoryMarquee** — `components/sections/CategoryMarquee.tsx`
- Client Component (`'use client'`) — usa `react-fast-marquee`
- Fondo `--te-bg-alt` (#eaecee)
- Categorías: Educación · Precios · Confianza · Comunidad (en loop)
- Cada tag: DM Sans 500 · 14px · borde `te-border` · `border-radius: 100px` · padding `10px 19px`
- Speed: 50 · pauseOnHover: true
- Clase `te-anime-top` en el wrapper externo

**Pillars** — `components/sections/Pillars.tsx`
- Server Component
- Fondo `--te-bg-alt` (#eaecee)
- Título: copy exacto `"En qué nos enfocamos."` · `<SectionTitle>` sin viewMore
- 3 columnas desktop · stack mobile · `gap-6`
- Cada pillar: ícono SVG 32px `te-orange` + título Syne 700 18px + descripción DM Sans 14px `te-muted`
- Copy exacto de cada pillar — ver `docs/spec.md` S3
- Sin botones ni CTAs
- Clase `te-anime-top` en cada pillar card

**Done cuando:**
- [ ] Marquee corre en loop sin saltos
- [ ] Marquee pausa en hover
- [ ] Pillars: copy exacto en los 3 bloques
- [ ] Sin botones en Pillars
- [ ] Responsive correcto en ambas secciones

---

### TASK 15 — Sección LeadMagnet (S4) e Intriga (S5)

**Prioridad:** Alta · **Bloque:** C
**Referencia visual S4:** `magzin-react/src/components/sections/home/Section4.tsx` → `block-subscribe`

**LeadMagnet** — `components/sections/LeadMagnet.tsx`
- Server Component + `EmailCapture` embebido
- Fondo `--te-bg` con card flotante: fondo `te-card` · borde `te-border` · `border-radius: 16px`
- Padding interno: `40px 34px` base · `50px 40px` desktop
- Layout 2 cols: copy izquierda · `<PDFPlaceholder />` derecha · stack mobile
- Copy exacto — ver `docs/spec.md` S4
- `<EmailCapture tag="leadmagnet-home" showName={true} cta="Quiero la guía" />`
- Decoración: elemento SVG posicionado top-right (líneas abstractas en `te-border`)

**PDFPlaceholder** — `components/pdf-placeholder/PDFPlaceholder.tsx`
- SVG construido en código — NO imagen
- Simula documento: fondo `te-navy` · wordmark "TallerExpress" · líneas horizontales · badge "Guía"
- Proporciones: ~210×297px (A4 ratio)
- Sombra sutil debajo

**Intriga** — `components/sections/Intriga.tsx`
- Server Component + `EmailCapture` variante dark embebido
- Fondo `--te-navy-deep` (#080f1f)
- Grain atmosférico: `noise.svg` tileado con `opacity: 0.04` como pseudo-elemento
- Headline: copy exacto · Syne 800 · `ds-2` · blanco · centrado · clase `te-anime-text`
- Subhead: copy exacto · DM Sans · rgba(255,255,255,0.7) · centrado
- Detalle geográfico: copy exacto · DM Sans 500 · 12px · `te-orange` · uppercase · letter-spacing
- `<EmailCapture tag="intriga-home" variant="dark" cta="Quiero saber →" />`

**Copy exacto Intriga:**
- Headline: `"Llevamos meses entendiendo el problema."`
- Subhead: `"La solución está en camino. Cuando esté lista, tú eres el primero en saberlo."`
- Geo: `"Empezamos en Santa Tecla y Antiguo Cuscatlán."`

**Done cuando:**
- [ ] LeadMagnet: PDFPlaceholder es SVG — no imagen
- [ ] LeadMagnet: copy exacto
- [ ] LeadMagnet: stack correcto en mobile
- [ ] Intriga: fondo navy-deep
- [ ] Intriga: grain atmosférico visible pero sutil
- [ ] Intriga: copy exacto
- [ ] Intriga: EmailCapture variante dark funciona

---

### TASK 16 — Homepage orquestador

**Prioridad:** Alta · **Bloque:** C

**Archivo:** `app/page.tsx`

```typescript
import Hero            from '@/components/sections/Hero'
import CategoryMarquee from '@/components/sections/CategoryMarquee'
import ArticlesGrid    from '@/components/sections/ArticlesGrid'
import Pillars         from '@/components/sections/Pillars'
import LeadMagnet      from '@/components/sections/LeadMagnet'
import Intriga         from '@/components/sections/Intriga'
import { getLatestArticles } from '@/lib/articles'

export default async function HomePage() {
  const articles = await getLatestArticles(3)
  return (
    <>
      <Hero />
      <CategoryMarquee />
      <ArticlesGrid articles={articles} />
      <Pillars />
      <LeadMagnet />
      <Intriga />
    </>
  )
}
```

**Done cuando:**
- [ ] Todas las secciones renderizan en orden correcto
- [ ] Sin errores de hidratación
- [ ] Ritmo de fondos correcto: bg → bg-alt → bg → bg-alt → bg (card) → navy-deep
- [ ] `pnpm build` sin errores

---

## BLOQUE D — BLOG

---

### TASK 17 — Capa de datos MDX

**Prioridad:** Alta · **Bloque:** D

**Archivo:** `lib/articles.ts`

Implementar según `docs/plan.md` Sección 04:

```typescript
// Funciones requeridas
getAllArticles(): Promise<Article[]>
getArticleBySlug(slug: string): Promise<Article>
getArticlesByCategory(category: string): Promise<Article[]>
getRelatedArticles(slug: string, category: string, limit?: number): Promise<Article[]>
getLatestArticles(limit: number): Promise<Article[]>
```

**Archivo:** `lib/mdx.ts`
- Leer archivos `.mdx` desde `content/blog/`
- Parsear frontmatter con `gray-matter`
- Compilar contenido MDX con `next-mdx-remote`
- Validar metadata requerida — lanzar error claro si falta algún campo

**Done cuando:**
- [ ] `getLatestArticles(3)` retorna los 3 más recientes ordenados por fecha
- [ ] `getArticleBySlug('slug-inexistente')` retorna 404 (notFound())
- [ ] `getRelatedArticles` retorna artículos de la misma categoría excluyendo el actual
- [ ] Frontmatter incompleto lanza error descriptivo en dev

---

### TASK 18 — Página Blog `/blog`

**Prioridad:** Alta · **Bloque:** D

**Archivo:** `app/blog/page.tsx`

```typescript
export const revalidate = 3600 // ISR — revalidar cada hora
```

**Estructura:**
- Header de página: título "Artículos" · descripción breve
- `<CategoryFilter />` — Client Component con tabs
- Grid de `<ArticleCard />` — 3 cols desktop · 2 cols tablet · 1 col mobile
- 9 artículos por página — paginación
- Ordenado por fecha desc por defecto

**CategoryFilter** — `components/ui/CategoryFilter.tsx`
- Client Component
- Tabs: Todos · Educación · Precios · Confianza · Comunidad
- Filtra client-side — sin reload de página
- URL params opcionales para compartir categoría seleccionada (`?cat=educacion`)

**Done cuando:**
- [ ] Listado muestra todos los artículos ordenados por fecha
- [ ] Filtro por categoría funciona sin reload
- [ ] Paginación: 9 artículos por página
- [ ] Grid responsive: 3 → 2 → 1 cols
- [ ] ISR activo (`revalidate = 3600`)

---

### TASK 19 — Página Artículo `/blog/[slug]`

**Prioridad:** Alta · **Bloque:** D

**Archivo:** `app/blog/[slug]/page.tsx`

**Estructura según `docs/spec.md`:**
1. Badge de categoría — `<CategoryBadge />`
2. H1 del artículo — Syne 800 · grande · clase `te-anime-text`
3. Fecha + tiempo de lectura — DM Sans · `te-muted` · 12px
4. `<hr>` sutil — `te-border`
5. Cuerpo MDX — DM Sans 17px · line-height 1.75 · `te-text` · max-width `reading` (680px) · centrado
6. EmailCapture post-artículo: copy `"¿Te fue útil? Hay más contenido como este."` · tag `end-article`
7. `<RelatedArticles slug={slug} category={article.category} />`

**Metadata dinámica:**
```typescript
export async function generateMetadata({ params }): Promise<Metadata>
export async function generateStaticParams()
```

**Estilos del cuerpo MDX en globals.css:**
```css
.prose h2 { font-family: var(--font-syne); font-weight: 700; }
.prose h3 { font-family: var(--font-syne); font-weight: 600; }
.prose p  { font-family: var(--font-dm-sans); font-size: 17px; line-height: 1.75; }
.prose a  { color: var(--te-orange); text-decoration: underline; }
```

**Done cuando:**
- [ ] Columna de lectura máx 680px centrada
- [ ] Tipografía de cuerpo: DM Sans 17px · line-height 1.75
- [ ] Open Graph tags correctos para Facebook
- [ ] `generateStaticParams` genera rutas para todos los slugs existentes
- [ ] `notFound()` para slugs inexistentes
- [ ] 2 artículos relacionados de la misma categoría al final

---

## BLOQUE E — PÁGINAS SECUNDARIAS

---

### TASK 20 — Página Guía `/guia`

**Prioridad:** Media · **Bloque:** E

**Archivo:** `app/guia/page.tsx`

**Fase 1 — placeholder:**
- Headline: `"La guía que todo dueño de vehículo en El Salvador necesita."`
- Descripción del contenido prometido
- `<EmailCapture tag="guia-page" showName={true} cta="Recibir la guía" />`
- URL `/guia` es permanente — no cambia en Fase 2

**Done cuando:**
- [ ] Página existe y no da 404
- [ ] EmailCapture funcional con tag correcto
- [ ] Copy correcto

---

### TASK 21 — Página Privacidad `/privacidad`

**Prioridad:** Baja · **Bloque:** E

**Archivo:** `app/privacidad/page.tsx`
- Placeholder mínimo con texto estándar de privacidad
- Sin diseño complejo — contenido en columna de lectura 680px

**Done cuando:**
- [ ] Página existe y no da 404
- [ ] Footer link `/privacidad` funciona

---

### TASK 22 — Artículos MDX iniciales

**Prioridad:** Alta · **Bloque:** E

Crear los 3 artículos iniciales requeridos para el deploy según `docs/te-calendario-contenidos-v1.md`:

**Artículo 1** — `content/blog/cada-cuanto-cambiar-aceite-carro.mdx`
```yaml
---
title: "¿Cada cuánto tiempo debo cambiar el aceite de mi carro?"
slug: "cada-cuanto-cambiar-aceite-carro"
date: "2026-05-25"
category: "educacion"
readTime: "5 min"
excerpt: "La respuesta depende del tipo de aceite y tu vehículo. Aquí la guía definitiva para dueños en El Salvador."
canal: "ambos"
segmento: "todos"
---
```

**Artículo 2** — `content/blog/cuanto-cuesta-cambio-aceite-el-salvador.mdx`
```yaml
---
title: "¿Cuánto cuesta un cambio de aceite en El Salvador? La guía honesta"
slug: "cuanto-cuesta-cambio-aceite-el-salvador"
date: "2026-05-29"
category: "costos"
readTime: "4 min"
excerpt: "Los rangos reales de precios en el mercado salvadoreño. Por qué varían y cuánto es razonable pagar."
canal: "facebook"
segmento: "mujer"
---
```

**Artículo 3** — `content/blog/senales-frenos-necesitan-revision.mdx`
```yaml
---
title: "5 señales de que tus frenos necesitan revisión (y no puedes ignorarlas)"
slug: "senales-frenos-necesitan-revision"
date: "2026-06-01"
category: "educacion"
readTime: "4 min"
excerpt: "Señales físicas y auditivas que cualquier persona puede identificar. Sin conocimiento técnico."
canal: "ambos"
segmento: "todos"
---
```

> ⚠️ El contenido (body) de cada artículo lo escribe el equipo de contenido — no el BUILD Agent.
> El BUILD Agent solo crea los archivos con el frontmatter correcto y un placeholder de cuerpo.

**Done cuando:**
- [ ] 3 archivos MDX existen con frontmatter válido completo
- [ ] `getLatestArticles(3)` los retorna correctamente
- [ ] Homepage muestra las 3 cards
- [ ] Cada artículo tiene su propia página en `/blog/[slug]`

---

## BLOQUE F — ANIMACIONES GSAP

---

### TASK 23 — ClientEffects global

**Prioridad:** Alta · **Bloque:** F

**Archivo:** `components/layout/ClientEffects.tsx`

Implementar según `docs/plan.md` Sección 13:
- `'use client'`
- Registrar `ScrollTrigger` con `gsap.registerPlugin(ScrollTrigger)`
- Animar `.te-anime-text` — split por caracteres + stagger 0.02 + ease `back.out(1.7)`
- Animar `.te-anime-top` — fromTo y:40→0 · opacidad 0→1 · stagger 0.1
- Animar `.te-anime-left` — fromTo x:-40→0 · opacidad 0→1
- Cleanup: `ScrollTrigger.getAll().forEach(t => t.kill())` en return
- Respetar `prefers-reduced-motion` — verificar antes de inicializar

**Done cuando:**
- [ ] `.te-anime-text` en H1 del Hero anima al cargar la página
- [ ] `.te-anime-top` en cards anima al hacer scroll
- [ ] `.te-anime-left` funciona en bloques de 2 columnas
- [ ] Sin memory leaks — cleanup funciona al desmontar
- [ ] Sin errores SSR (`typeof window === 'undefined'` check presente)
- [ ] Con `prefers-reduced-motion: reduce` — sin animaciones

---

### TASK 24 — Aplicar clases de animación a componentes

**Prioridad:** Media · **Bloque:** F

Según tabla en `docs/plan.md` Sección 13:

| Componente | Agregar clase |
|---|---|
| `Hero.tsx` — H1 | `te-anime-text` |
| `SectionTitle.tsx` — título | `te-anime-text` |
| `ArticleCard.tsx` — wrapper | `te-anime-top` |
| `Pillars.tsx` — cada pillar | `te-anime-top` |
| `CategoryMarquee.tsx` — wrapper | `te-anime-top` |
| `LeadMagnet.tsx` — bloque izq | `te-anime-left` · bloque der: `te-anime-top` |
| `Intriga.tsx` — headline | `te-anime-text` |

**Done cuando:**
- [ ] Todas las clases aplicadas
- [ ] Animaciones visibles en scroll en el browser
- [ ] Sin conflictos entre animaciones simultáneas

---

### TASK 25 — Noise SVG para Intriga

**Prioridad:** Baja · **Bloque:** F

**Archivo:** `public/noise.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4"/>
</svg>
```

**En `Intriga.tsx`:**
```css
.intriga-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/noise.svg');
  background-repeat: repeat;
  opacity: 0.04;
  pointer-events: none;
}
```

**Done cuando:**
- [ ] Grain visible pero sutil sobre fondo navy-deep
- [ ] No afecta legibilidad del texto
- [ ] `pointer-events: none` — no interfiere con EmailCapture

---

## BLOQUE G — INTEGRACIÓN BREVO

---

### TASK 26 — Route Handler `/api/subscribe`

**Prioridad:** Alta · **Bloque:** G

**Archivo:** `app/api/subscribe/route.ts`

Implementar según `docs/plan.md` Sección 05:
- `POST` únicamente
- Validar email server-side — retornar 400 si inválido
- `BREVO_API_KEY` solo en server — nunca expuesta al cliente
- `BREVO_LIST_ID` desde env var
- Tag diferenciador desde el body del request
- Rate limiting básico — prevenir spam

**Variables de entorno requeridas en `.env.local`:**
```
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=1
```

**Done cuando:**
- [ ] POST a `/api/subscribe` con email válido retorna 200
- [ ] POST con email inválido retorna 400
- [ ] El contacto aparece en Brevo con el tag correcto
- [ ] `BREVO_API_KEY` no visible en Network tab del browser
- [ ] `.env.local` en `.gitignore` ✅

---

### TASK 27 — Conectar EmailCapture con API

**Prioridad:** Alta · **Bloque:** G

Actualizar `components/ui/EmailCapture.tsx` para hacer el POST real a `/api/subscribe`.

**Verificar en cada punto de captura:**
- Hero: tag `hero-home`
- LeadMagnet: tag `leadmagnet-home`
- Intriga: tag `intriga-home`
- Final de artículo: tag `end-article`
- Página Guía: tag `guia-page`

**Done cuando:**
- [ ] Cada formulario envía con su tag correcto
- [ ] Brevo recibe el contacto en el list correcto con el tag correcto
- [ ] Mensaje de éxito visible al usuario
- [ ] Mensaje de error visible si falla la API

---

## BLOQUE H — SEO Y DEPLOY

---

### TASK 28 — SEO técnico

**Prioridad:** Alta · **Bloque:** H

**Sitemap** — `app/sitemap.ts`:
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const articleRoutes = articles.map(a => ({
    url: `https://tallerexpress.one/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  return [
    { url: 'https://tallerexpress.one', priority: 1.0 },
    { url: 'https://tallerexpress.one/blog', priority: 0.9 },
    { url: 'https://tallerexpress.one/guia', priority: 0.7 },
    ...articleRoutes,
  ]
}
```

**robots.txt** — `app/robots.ts`:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://tallerexpress.one/sitemap.xml',
  }
}
```

**Open Graph** — verificar en cada artículo:
- `og:title`, `og:description`, `og:type: article`, `og:locale: es_SV`
- `og:image` placeholder — 1200×630px

**Done cuando:**
- [ ] `/sitemap.xml` accesible y válido
- [ ] `/robots.txt` accesible
- [ ] Open Graph correcto en artículos (verificar con og:debugger de Facebook)
- [ ] `<html lang="es">` en el layout

---

### TASK 29 — Google Analytics 4

**Prioridad:** Media · **Bloque:** H

**Archivo:** `components/ui/Analytics.tsx`
- Client Component con `'use client'` y `next/script`
- GA4 Measurement ID desde env var `NEXT_PUBLIC_GA_ID`
- Solo cargar en producción (`process.env.NODE_ENV === 'production'`)
- Strategy: `afterInteractive`

**Done cuando:**
- [ ] GA4 recibe pageviews en producción
- [ ] No carga en desarrollo
- [ ] `NEXT_PUBLIC_GA_ID` en `.env.example` documentado

---

### TASK 30 — Checklist de deploy

**Prioridad:** Crítica · **Bloque:** H

**Prerequisitos de deploy según `docs/brief.md` Sección 08:**

| Item | Verificación |
|---|---|
| `pnpm build` sin errores | `✓ Compiled successfully` |
| `pnpm lint` sin errores | Sin warnings de ESLint |
| TypeScript sin errores | `tsc --noEmit` limpio |
| Variables de entorno en Vercel | `BREVO_API_KEY`, `BREVO_LIST_ID`, `NEXT_PUBLIC_GA_ID` |
| Dominio `tallerexpress.one` apuntando a Vercel | DNS propagado |
| Perfil Instagram creado | Link en Nav funcional |
| Perfil Facebook creado | Link en Footer funcional |
| WhatsApp Business activo | Link `wa.me/` funcional |
| Brevo list ID confirmado | Formularios envían correctamente |
| 3 artículos MDX con contenido real | No placeholders en producción |
| Open Graph verificado | Facebook Sharing Debugger ✅ |
| Sitemap verificado | Google Search Console ✅ |

**Done cuando:**
- [ ] Todos los items del checklist en verde
- [ ] Sitio accesible en `tallerexpress.one`
- [ ] Sin errores en Vercel deployment logs
- [ ] Formulario de email funciona en producción

---

## RESUMEN DE TASKS

| Bloque | Tasks | Prioridad crítica | Estimado |
|---|---|---|---|
| A — Setup | 01–05 | 01, 02, 03, 04 | 2–3h |
| B — Layout | 06–08 | 08 | 2–3h |
| C — Homepage | 09–16 | 09, 10, 12, 13, 15, 16 | 4–6h |
| D — Blog | 17–19 | 17, 18, 19 | 3–4h |
| E — Secundarias | 20–22 | 22 | 2–3h |
| F — Animaciones | 23–25 | 23 | 1–2h |
| G — Brevo | 26–27 | 26, 27 | 1–2h |
| H — Deploy | 28–30 | 30 | 1–2h |
| **Total** | **30 tasks** | | **~18–25h** |

---

## GATE CRITERIA — FASE 4 COMPLETA

- [x] 30 tasks definidas en 8 bloques ordenados
- [x] Cada task tiene criterio de done explícito y verificable
- [x] Protocolo de arranque del BUILD Agent documentado
- [x] Referencias a Fuentes 1, 2 y 3 en tasks relevantes
- [x] GSAP integrado en Tasks 23–25
- [x] Brevo integrado en Tasks 26–27
- [x] Checklist de deploy completo en Task 30
- [x] Estimado de tiempo por bloque
- [ ] **Aprobación de Master** → avanzar a Fase 5 (CLAUDE.md)

---

*Taller Express · tasks.md · SDD v3.0 · Denysoft · Mayo 2026*
*Generado por TASKS Agent*
*Próximo artifact: CLAUDE.md (Fase 5) — instrucciones directas para el BUILD Agent*
