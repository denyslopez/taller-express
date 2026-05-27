# CLAUDE.md — Taller Express
**SDD v3.0 · Fase 5 · Denysoft · Mayo 2026**

> Instrucciones directas para el BUILD Agent.
> Este archivo gobierna todo el proceso de construcción.
> Leerlo completo antes de escribir una sola línea de código.

---

## PROTOCOLO DE ARRANQUE — EJECUTAR PRIMERO

Antes de cualquier tarea, confirmar en voz alta:

```
✅ Fuente 1 — Referencia visual:  /mnt/c/dev/lab/magzin-react/     [SOLO LECTURA]
✅ Fuente 2 — Contenido aprobado: /mnt/c/dev/lab/taller-express/content/
✅ Fuente 3 — Design system:      /mnt/c/dev/lab/taller-express/CLAUDE.md (este archivo)
✅ Tasks activas:                  /mnt/c/dev/lab/taller-express/docs/tasks.md
```

Describir brevemente qué encontré en cada fuente.
Solo entonces ejecutar el Task 01.

---

## IDENTIDAD DEL PROYECTO

**Taller Express** — Tu Agente Automotriz en El Salvador.
No es un taller. Es el representante digital del cliente ante los talleres certificados.

**Dominio:** `tallerexpress.one`
**Operado por:** Denysoft
**Fase activa:** Stealth — contenido educativo sin revelar el servicio

---

## RUTAS ABSOLUTAS

```
/mnt/c/dev/lab/
├── magzin-react/              ← FUENTE 1 — SOLO LECTURA
│   └── src/                   ← Leer para extraer layout, ritmo, componentes
└── taller-express/            ← PROYECTO REAL — construir aquí
    ├── docs/
    │   ├── brief.md           ← Contexto del negocio
    │   ├── spec.md            ← Qué se construye
    │   ├── design.md          ← Cómo se ve
    │   ├── plan.md            ← Cómo se construye
    │   ├── tasks.md           ← Lista de tareas ordenada
    │   └── CLAUDE.md          ← Este archivo
    ├── content/blog/          ← FUENTE 2 — Copy aprobado (MDX)
    └── CLAUDE.md              ← FUENTE 3 — este archivo
```

---

## STACK — CERRADO — NO REABRIR

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js + App Router + Turbopack | 16.2 |
| Estilos | Tailwind CSS | Incluido en scaffold |
| Contenido | MDX local + gray-matter | — |
| Animaciones | GSAP + ScrollTrigger | Latest |
| Marquee | react-fast-marquee | Latest |
| Email | Brevo API vía Route Handler | — |
| Deploy | Vercel | — |

**Dependencias prohibidas en este proyecto:**
Bootstrap · WOW.js · GSAP SplitText Pro · Swiper · GSAP (en Server Components) · Framer · WordPress · Contentful

---

## CAPA 1 — REGLAS DE CONSTRUCCIÓN

### Arquitectura Next.js

```
Server Components (por defecto — todo lo que no necesite estado):
Nav · Footer · Hero (texto) · ArticlesGrid · Pillars · Intriga (texto)
SectionTitle · ArticleCard · LeadMagnet (estructura) · RelatedArticles

Client Components ('use client' — solo cuando sea necesario):
EmailCapture · CategoryFilter · CategoryMarquee · ClientEffects
```

**Regla:** Antes de agregar `'use client'` — preguntarse si realmente necesita estado o eventos del browser. La mayoría no lo necesita.

### Renderizado por página

| Página | Estrategia |
|---|---|
| `/` | SSG — estático |
| `/blog` | ISR — `revalidate: 3600` |
| `/blog/[slug]` | SSG — `generateStaticParams()` |
| `/guia` | SSG — estático |
| `/privacidad` | SSG — estático |

### Orden de ejecución

Ejecutar los tasks en orden de bloque:
**A → B → C → D → E → F → G → H**

No saltar bloques. No avanzar si el bloque anterior tiene tasks sin completar.

---

## CAPA 2 — COPY — NO MODIFICAR NI UNA PALABRA

El copy aprobado va exacto. El BUILD Agent no reescribe, no mejora, no simplifica.

### Hero — copy exacto

**Eyebrow:**
```
El Salvador · Santa Tecla · Antiguo Cuscatlán
```

**H1 (3 líneas):**
```
El mantenimiento
de tu carro no debería
ser tan complicado.
```
→ "complicado" va en `text-te-orange`. El resto en navy/negro.

**Subtítulo:**
```
Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo.
Hecho para dueños de carro en El Salvador.
```

**Línea de intriga:**
```
Algo más está en camino. Llevamos meses construyéndolo.
```

**Email capture Hero:**
- Placeholder: `Tu correo electrónico`
- Botón: `Avisame →`

---

### Sección Pilares — copy exacto

**Título:** `En qué nos enfocamos.`

| Pilar | Título | Descripción |
|---|---|---|
| 1 | Entiende tu vehículo | Mantenimiento preventivo, señales de alerta y qué revisar antes de que sea urgente. |
| 2 | Habla con confianza | Cómo comunicarte mejor, qué preguntar y cómo leer lo que te dicen. |
| 3 | Conoce los precios | Rangos reales del mercado salvadoreño. Por qué varían y qué es razonable esperar. |

---

### Lead Magnet — copy exacto

- **Eyebrow:** `Próximamente · Gratis`
- **Headline:** `Todo lo que necesitas saber antes de tu próxima visita al taller.`
- **Subhead:** `Estamos preparando una guía práctica para dueños de vehículo en El Salvador. Sin tecnicismos. Sin letra chica. Déjanos tu correo y eres el primero en recibirla.`
- **Disclaimer:** `Sin spam. Solo te escribimos cuando la guía esté lista.`

---

### Intriga — copy exacto

- **Headline:** `Llevamos meses entendiendo el problema.`
- **Subhead:** `La solución está en camino. Cuando esté lista, tú eres el primero en saberlo.`
- **Geo:** `Empezamos en Santa Tecla y Antiguo Cuscatlán.`
- **Botón:** `Quiero saber →`

---

### Footer — copy exacto

- **Tagline:** `Tu Agente Automotriz`

---

### Email capture — copy post-artículo exacto

```
¿Te fue útil? Hay más contenido como este.
```

---

### Página Guía — copy exacto

```
La guía que todo dueño de vehículo en El Salvador necesita.
```

---

## CAPA 3 — DESIGN SYSTEM

### Paleta — usar siempre CSS vars, nunca hex hardcodeados

```css
:root {
  --te-navy:        #0F2557;  /* texto autoridad · wordmark · elementos peso */
  --te-navy-deep:   #080f1f;  /* SOLO S5-Intriga y Footer */
  --te-orange:      #F5820D;  /* CTAs · badges · 1 acento tipográfico por sección */
  --te-orange-h:    #d96e0a;  /* hover del naranja */
  --te-bg:          #f7f8f9;  /* fondo principal — casi blanco, nunca blanco puro */
  --te-bg-alt:      #eaecee;  /* secciones alternas */
  --te-card:        #ffffff;  /* fondo de cards */
  --te-text:        #0e0e0f;  /* cuerpo principal */
  --te-muted:       #626568;  /* extractos · metadata · subtítulos */
  --te-border:      #e5e7eb;  /* bordes de cards y separadores */
  --te-shadow:      0px 20px 60px 0px rgba(0, 0, 0, 0.08);
}
```

**Regla crítica del naranja:**
Máximo 3–4 elementos naranja visibles simultáneamente en cualquier viewport.
Máximo 1 acento tipográfico naranja por sección.
Antes de agregar naranja — preguntar: ¿es más importante que todo lo que ya tiene color?

**Regla del navy:**
Nunca como fondo de sección principal.
Solo en texto de autoridad, wordmark, footer, y S5-Intriga.

### Tipografía

```
Display/Titulares → Syne    700 · 800
Body/UI          → DM Sans  400 · 500 · 600
```

| Token | Tamaño | Peso | Familia | Uso |
|---|---|---|---|---|
| `text-ds-1` | clamp(48px, 6vw, 80px) | 800 | Syne | Hero H1 |
| `text-ds-2` | clamp(40px, 5vw, 72px) | 800 | Syne | Titulares grandes |
| `text-ds-3` | clamp(32px, 4vw, 64px) | 700 | Syne | Subtítulares hero |
| H2 sección | 40px | 700 | Syne | Títulos de bloque |
| H3 | 28px | 600 | DM Sans | Subtítulos destacados |
| SectionTitle | 24px | 700 | Syne | Encabezado de sección |
| Body | 16px | 400 | DM Sans | Texto general |
| Cuerpo artículo | 17px | 400 | DM Sans | line-height: 1.75 |
| Labels/UI | 14px | 500 | DM Sans | Metadata · UI |
| Badges/tags | 12px | 500/700 | DM Sans | Uppercase · letter-spacing 1.5px |

**Syne nunca por debajo de 16px. Máximo font-weight: 800.**

### Espaciado — base 8px

| Tailwind | Valor | Uso |
|---|---|---|
| `p-2` | 8px | Badges mínimos |
| `p-4` | 16px | Padding card compacta |
| `p-6` | 24px | Padding card estándar |
| `p-10` | 40px | Padding card hero desktop |
| `gap-6` | 24px | Gap entre cards en grid |
| `py-16` | 64px | Padding vertical sección desktop |
| `py-10` | 40px | Padding vertical sección mobile |
| `py-20` | 80px | Hero y S5-Intriga |

### Border radius — escala fija, nunca mixta

| Valor | Tailwind | Uso |
|---|---|---|
| 4px | `rounded` | Badges · inputs |
| 8px | `rounded-lg` | Botones · UI |
| 16px | `rounded-2xl` | Cards compactas · imágenes |
| 20px | `rounded-[20px]` | Card body hero — firma de Magzin |
| 100px | `rounded-full` | Tags de categoría · botones píldora |

### Ritmo de secciones — homepage

```
Nav          →  te-bg (#f7f8f9) + blur
S1 Hero      →  te-bg (#f7f8f9)
S2 Marquee   →  te-bg-alt (#eaecee)
S3 Artículos →  te-bg (#f7f8f9)
S4 Pilares   →  te-bg-alt (#eaecee)
S5 LeadMag   →  te-bg con card te-card flotante
S6 Intriga   →  te-navy-deep (#080f1f) ← único momento oscuro
Footer       →  te-navy-deep (#080f1f) ← continuidad
```

Sin líneas divisorias entre secciones. El cambio de fondo es el separador.

---

## CAPA 4 — MAGZIN — QUÉ TOMAR Y QUÉ NO

### ✅ Extraer de Magzin (SOLO LECTURA)

| Elemento Magzin | Archivo | Qué tomar |
|---|---|---|
| Card corner + arrow-box | `ArticleCard1.tsx`, `ArticleCard3.tsx` | Estructura HTML · animación rotate(-45deg) en hover |
| View-more animado | `main.css` → `.view-more` | Cubic-bezier exacto: `0.65, 0, 0.076, 1` · estructura circle/button-text |
| Section title | `TitleWhite.tsx` | Ícono estrella SVG · layout flex space-between |
| Block-subscribe | `Section4.tsx` | Estructura de card: padding · borde · decoración top-right |
| Category marquee | `Section2.tsx` | Velocidad 50 · pauseOnHover · tag-item como base |
| GSAP text animation | `useTextAnimation2.ts` | Lógica de split + stagger 0.02 + ease back.out |
| GSAP scroll trigger | `ClientEffects.tsx` | Patrón de registro + cleanup |
| Spacing tokens | `main.css` → `:root` | `.sec-padding` = 70px → traducir a `py-16` Tailwind |

### ❌ NO copiar de Magzin

| Qué | Por qué |
|---|---|
| Class names de Bootstrap (`.navbar`, `.sec-padding`, `.fs-7`, `.bg-100`) | Usar Tailwind + CSS vars propias |
| Paleta de colores (neutros grises de Magzin) | Reemplazar con paleta TE |
| Geist font | Reemplazar con Syne + DM Sans |
| ThemeSwitcher / dark mode | TE es light mode — excepción: Intriga y Footer |
| SideBar · PopupSearch · BackToTop | Fuera de scope Fase 1 |
| Swiper · GSAP · WOW.js imports | Reimplementar GSAP limpio — sin WOW.js |
| Lógica de negocio o datos JSON | Son datos de demo del template |
| Topbar (breaking news) | No aplica en TE |
| Secciones Podcast · Authors · Portfolio | Fuera de scope |

---

## CAPA 5 — ANIMACIONES GSAP

### Clases de animación — aplicar según tabla

| Clase | Efecto | Aplicar en |
|---|---|---|
| `te-anime-text` | Chars entran x:50→0 · stagger 0.02 · back.out(1.7) | H1 Hero · SectionTitle |
| `te-anime-top` | Elemento y:40→0 · opacidad 0→1 · stagger 0.1 | Cards · Pilares · Marquee wrapper |
| `te-anime-left` | Elemento x:-40→0 · opacidad 0→1 | Bloques izquierda en 2 columnas |

### ClientEffects — reglas críticas

```typescript
'use client'
// ✅ SIEMPRE: verificar que no es SSR
if (typeof window === 'undefined') return
// ✅ SIEMPRE: cleanup en return del useEffect
return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
// ✅ SIEMPRE: respetar prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
```

### GSAP solo en Client Components

GSAP accede al DOM. Los Server Components no tienen DOM. Importar GSAP solo en archivos con `'use client'`. Si aparece error de hidratación relacionado con GSAP — es porque se importó en un Server Component.

---

## CAPA 6 — BREVO Y SEGURIDAD

### Arquitectura de email — obligatoria

```
EmailCapture (Client) → POST /api/subscribe → Route Handler (Server) → Brevo API
```

`BREVO_API_KEY` **NUNCA** en client-side. Solo en el Route Handler del servidor.

### Tags por punto de captura — exactos

| Punto | Tag |
|---|---|
| Hero homepage | `hero-home` |
| Lead Magnet homepage | `leadmagnet-home` |
| Intriga homepage | `intriga-home` |
| Final de artículo | `end-article` |
| Página /guia | `guia-page` |

### Variables de entorno

```bash
# .env.local — nunca commitear
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=1
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# .env.example — siempre presente y actualizado
BREVO_API_KEY=
BREVO_LIST_ID=
NEXT_PUBLIC_GA_ID=
```

### Medidas de seguridad — no negociables

- `.env.local` en `.gitignore` — verificar antes del primer commit
- Validación server-side del email en `/api/subscribe`
- Rate limiting en Route Handler
- Headers de seguridad en `next.config.ts`
- `strict: true` en `tsconfig.json` — sin `any` implícito

---

## CAPA 7 — ANTI-PATTERNS — LISTA NEGRA

El BUILD Agent no hace ninguna de estas cosas, sin excepción:

### Visuales
```
❌ Usar `bg-blue-*` de Tailwind — usar `--te-navy`
❌ Hardcodear hex colors — usar siempre CSS vars
❌ Mezclar border-radius en el mismo componente
❌ Agregar sombras decorativas — solo `--te-shadow` cuando sea necesario
❌ Naranja en más de 3–4 elementos visibles simultáneamente
❌ Syne en tamaños menores a 16px
❌ font-weight: 900 — máximo 800
❌ Imágenes de stock — SVG placeholders en Fase 1
❌ Dark mode toggle — el sitio es light mode
❌ Gradientes decorativos — solo planos
❌ All-caps en titulares principales
❌ Fondo de sección en navy — solo Intriga y Footer
```

### Código
```
❌ Copiar class names de Bootstrap del codebase Magzin
❌ Importar GSAP en Server Components
❌ Exponer BREVO_API_KEY en client-side
❌ Usar `any` en TypeScript
❌ Modificar el copy aprobado — ni una palabra
❌ Inventar contenido para los artículos MDX
❌ Agregar funcionalidades no especificadas en spec.md
❌ Avanzar al siguiente bloque sin completar el actual
❌ Construir secciones de Reveal (/servicios, /como-funciona) en Fase 1
```

### Marca
```
❌ Imágenes de taller mecánico tradicional
❌ Llaves inglesas · aceite · overoles
❌ Tono de lujo o exclusividad
❌ Anglicismos forzados en copy
❌ Modificar taglines o posicionamiento
```

---

## CAPA 8 — METADATA MDX REQUERIDA

Todo artículo debe tener este frontmatter completo. Si falta algún campo — lanzar error en dev:

```yaml
---
title: "Título del artículo"
slug: "url-del-articulo"
date: "2026-05-25"
category: "educacion" | "costos" | "confianza" | "comunidad"
readTime: "5 min"
excerpt: "Dos líneas máximo para la card en homepage y blog"
canal: "facebook" | "instagram" | "ambos"
segmento: "todos" | "mujer" | "joven" | "profesional"
---
```

El BUILD Agent **no escribe el body de los artículos**. Solo crea el archivo con frontmatter válido y placeholder:

```mdx
---
[frontmatter completo]
---

{/* Contenido pendiente — redactar por equipo de contenido */}
```

---

## CAPA 9 — CHECKLIST PRE-DEPLOY

Antes de considerar el build completo:

```
□ pnpm build — sin errores
□ pnpm lint  — sin warnings
□ tsc --noEmit — sin errores TypeScript
□ .env.local en .gitignore ✅
□ .env.example actualizado con todas las keys
□ BREVO_API_KEY no visible en Network tab
□ 3 artículos MDX con frontmatter válido
□ Homepage renderiza todas las secciones en orden
□ Ritmo de fondos correcto (bg → bg-alt → bg → bg-alt → bg → navy-deep)
□ Copy exacto en todas las secciones — verificar palabra por palabra
□ EmailCapture funciona en todos los puntos de captura
□ Tags de Brevo correctos por punto de captura
□ GSAP anima en scroll — sin errores de SSR
□ prefers-reduced-motion: animaciones desactivadas
□ Nav: wordmark navega a / · "Síguenos" abre Instagram
□ Footer: links sociales en nueva pestaña · wa.me/ correcto
□ /guia existe y no da 404
□ /privacidad existe y no da 404
□ /sitemap.xml accesible y válido
□ /robots.txt accesible
□ Open Graph correcto en artículos
□ Fuentes Syne + DM Sans cargan desde /public/fonts/ (no CDN)
□ Turbopack activo en dev
□ Variables de entorno configuradas en Vercel
□ Dominio tallerexpress.one apunta a Vercel
```

---

## REFERENCIA RÁPIDA — COMPONENTES

| Componente | Archivo | Tipo | Task |
|---|---|---|---|
| Nav | `components/layout/Nav.tsx` | Server | 06 |
| Footer | `components/layout/Footer.tsx` | Server | 07 |
| ClientEffects | `components/layout/ClientEffects.tsx` | Client | 23 |
| Hero | `components/sections/Hero.tsx` | Server | 09 |
| CategoryMarquee | `components/sections/CategoryMarquee.tsx` | Client | 14 |
| ArticlesGrid | `components/sections/ArticlesGrid.tsx` | Server | 13 |
| Pillars | `components/sections/Pillars.tsx` | Server | 14 |
| LeadMagnet | `components/sections/LeadMagnet.tsx` | Server | 15 |
| Intriga | `components/sections/Intriga.tsx` | Server | 15 |
| RelatedArticles | `components/sections/RelatedArticles.tsx` | Server | 19 |
| ArticleCard | `components/cards/ArticleCard.tsx` | Server | 12 |
| EmailCapture | `components/ui/EmailCapture.tsx` | Client | 10 |
| CategoryFilter | `components/ui/CategoryFilter.tsx` | Client | 18 |
| SectionTitle | `components/ui/SectionTitle.tsx` | Server | 11 |
| CategoryBadge | `components/ui/CategoryBadge.tsx` | Server | 19 |
| PDFPlaceholder | `components/pdf-placeholder/PDFPlaceholder.tsx` | Server | 15 |

---

## DOCUMENTOS DE REFERENCIA

Cuando tengas dudas — consultar en este orden:

1. `docs/spec.md` — ¿qué se construye?
2. `docs/design.md` — ¿cómo se ve?
3. `docs/plan.md` — ¿cómo se construye técnicamente?
4. `docs/tasks.md` — ¿cuál es el task activo y su criterio de done?
5. `/mnt/c/dev/lab/magzin-react/src/` — ¿cómo lo hizo Magzin? (SOLO LECTURA)

---

*Taller Express · CLAUDE.md · SDD v3.0 · Denysoft · Mayo 2026*
*Generado por BUILD Setup Agent*
*El BUILD Agent puede comenzar desde Task 01*
