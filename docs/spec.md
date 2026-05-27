# spec.md — Taller Express
**SDD v3.0 · Fase 1 · Denysoft · Mayo 2026 · Confidencial**

> Especificación funcional del sitio `tallerexpress.one` — Fase Stealth.
> El spec define QUÉ se construye y cómo se comporta — no cómo se ve.
> El tratamiento visual (colores, tipografía, espaciado, ritmo) se define en `design.md` (Fase 2).
> Prerequisito: `brief.md` aprobado ✅

---

## 01 — CONTEXTO Y ALCANCE

### Qué es este sitio

Hub central de la estrategia digital de Taller Express. No es una landing page temporal — es el sitio definitivo que evoluciona en fases. Todo lo que se construya en Fase 1 debe escalar sin migración, sin cambio de URLs, sin rehacer trabajo.

**Principio rector:** El contenido educativo del blog es el producto en la fase stealth. El diseño sirve al artículo — no al revés.

### Fases de evolución

| Fase | Período | Qué está activo |
|---|---|---|
| **Stealth** ← estamos aquí | Meses 1–3 | Home + Blog + Captura email + Intriga |
| **Reveal** | Mes 4–5 | `/servicios` · `/como-funciona` · `/contacto` · Hero cambia |
| **Operación** | Mes 6+ | `/app` · Portal del cliente · Supabase · Claude API |

### Alcance de este spec

Este documento especifica **únicamente la Fase Stealth**. Las páginas y funcionalidades de Reveal y Operación se especifican en sesiones separadas cuando corresponda.

---

## 02 — STACK TECNOLÓGICO

| Capa | Tecnología | Notas |
|---|---|---|
| **Framework** | Next.js 16.2 (App Router + Turbopack) | Scaffold con `create-next-app@latest --yes` |
| **Estilos** | Tailwind CSS | Incluido en scaffold por defecto |
| **Contenido** | MDX (archivos locales) | Sin CMS externo en Fase 1 |
| **Deploy** | Vercel | Integración nativa con Next.js |
| **Dominio** | `tallerexpress.one` | Registrado ✅ |
| **Email capture** | Brevo | API · plan gratuito hasta 300 emails/día |
| **Base de datos** | Supabase | ⬜ Fase 3 — preparar estructura desde ahora |
| **IA / Chatbot** | Claude API | ⬜ Fase 3 |
| **Mensajería** | WhatsApp Business API | ⬜ Fase 3 |

> ⚠️ El reference codebase (magzin-react) usa Bootstrap Grid + Vite + React.
> El BUILD Agent lee Magzin como referencia visual ÚNICAMENTE.
> NO copiar class names de Bootstrap. Reimplementar todo en Tailwind.

---

## 03 — ESTRUCTURA DE ARCHIVOS

```
/mnt/c/dev/lab/taller-express/
├── docs/                          ← Artifacts SDD
│   ├── brief.md                   ✅ Aprobado
│   ├── spec.md                    ✅ Este documento
│   ├── design.md                  ⬜ Fase 2
│   ├── plan.md                    ⬜ Fase 3
│   ├── tasks.md                   ⬜ Fase 4
│   └── CLAUDE.md                  ⬜ Fase 5
├── app/
│   ├── layout.tsx                 ← Nav + Footer globales
│   ├── page.tsx                   ← Homepage
│   ├── blog/
│   │   ├── page.tsx               ← Listado de artículos
│   │   └── [slug]/
│   │       └── page.tsx           ← Artículo individual
│   └── guia/
│       └── page.tsx               ← Lead magnet (placeholder Fase 1)
├── content/
│   └── blog/
│       └── *.mdx                  ← Artículos (activo madre del contenido)
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ArticlesGrid.tsx
│   │   ├── Pillars.tsx
│   │   ├── LeadMagnet.tsx
│   │   └── Intriga.tsx
│   ├── cards/
│   │   └── ArticleCard.tsx
│   └── ui/
│       └── EmailCapture.tsx
└── public/
    └── fonts/                     ← Fuentes self-hosted (definidas en design.md)
```

---

## 04 — PÁGINAS Y RUTAS

### Rutas Fase Stealth (activas desde el día 1)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `app/page.tsx` | Homepage completa |
| `/blog` | `app/blog/page.tsx` | Listado de artículos paginado |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Artículo individual |
| `/guia` | `app/guia/page.tsx` | Lead magnet — placeholder Fase 1 |
| `/privacidad` | `app/privacidad/page.tsx` | Política de privacidad — placeholder |

### Rutas bloqueadas hasta Reveal (no construir en Fase 1)

| Ruta | Estado |
|---|---|
| `/servicios` | ⬜ Fase 2 — Reveal |
| `/como-funciona` | ⬜ Fase 2 — Reveal |
| `/contacto` | ⬜ Fase 2 — Reveal |
| `/app` | ⬜ Fase 3 — Operación |

---

## 05 — ESPECIFICACIÓN DE COMPONENTES

> ⚠️ Esta sección define estructura, contenido y comportamiento.
> Tratamiento visual → `design.md`

---

### NAV — Global

**Comportamiento:**
- Fijo en la parte superior — visible en todas las páginas
- No cambia de apariencia al hacer scroll ni según la sección
- El tratamiento visual (colores, blur, borde) se define en `design.md`

**Estructura:**
- Izquierda: Wordmark "TallerExpress" — navega a `/`
- Centro (desktop): Link *"Artículos"* → `/blog` · Link *"La Guía"* → `/guia`
- Derecha: Botón CTA *"Síguenos"* → perfil Instagram (nueva pestaña)
- Mobile: Wordmark + botón CTA únicamente. Sin hamburger en Fase 1.

**Criterios de aceptación:**
- [ ] Nav visible y funcional en todas las páginas
- [ ] No cambia de apariencia al hacer scroll
- [ ] Wordmark navega a `/`
- [ ] "Síguenos" abre Instagram en nueva pestaña
- [ ] Colapsa correctamente en mobile (wordmark + CTA únicamente)

---

### HOMEPAGE `/`

#### S1 — Hero

**Propósito:** Primera impresión. Capturar email con intriga — sin revelar el servicio.

**Estructura:**
- Eyebrow de ubicación geográfica
- Titular principal (H1) — 3 líneas
- Subtítulo explicativo
- Línea de intriga discreta
- Formulario de captura de email inline

**Copy exacto (no modificar):**

Eyebrow: `"El Salvador · Santa Tecla · Antiguo Cuscatlán"`

H1:
```
"El mantenimiento
de tu carro no debería
ser tan complicado."
```

Subtítulo: `"Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador."`

Intriga: `"Algo más está en camino. Llevamos meses construyéndolo."`

Email capture: placeholder `"Tu correo electrónico"` + botón `"Avisame →"`

**Elemento visual central:** Placeholder — componente construido en código. Se reemplaza con contenido propio en sesión multimedia posterior.

**Criterios de aceptación:**
- [ ] Copy exacto sin modificaciones
- [ ] Email capture funcional — conecta con Brevo (tag: `hero-home`)
- [ ] Elemento visual placeholder no rompe el layout
- [ ] Totalmente responsive

---

#### S2 — Artículos destacados

**Propósito:** Mostrar los artículos más recientes. Dirigir tráfico al blog.

**Comportamiento:**
- Muestra los 3 artículos más recientes automáticamente
- Se actualiza con cada nuevo artículo publicado
- Ordenados por fecha descendente

**Estructura:**
- Header de sección: label izquierda + link "Ver todos →" → `/blog` derecha
- Grid de 3 ArticleCards
- Cada card: categoría + título + extracto (2 líneas) + tiempo de lectura
- Card completa es clickeable → `/blog/[slug]`

**Criterios de aceptación:**
- [ ] Muestra exactamente 3 artículos más recientes
- [ ] Cards completamente clickeables
- [ ] "Ver todos →" navega a `/blog`
- [ ] Grid responsive (3 cols → 1 col mobile)

---

#### S3 — Los tres pilares

**Propósito:** Declarar autoridad editorial. Sin conversión — solo posicionamiento.

**Comportamiento:** Sección estática. Sin botones ni CTAs.

**Copy exacto (no modificar):**

Título: `"En qué nos enfocamos."`

| # | Título del pilar | Descripción |
|---|---|---|
| 1 | Entiende tu vehículo | `"Mantenimiento preventivo, señales de alerta y qué revisar antes de que sea urgente."` |
| 2 | Habla con confianza | `"Cómo comunicarte mejor, qué preguntar y cómo leer lo que te dicen."` |
| 3 | Conoce los precios | `"Rangos reales del mercado salvadoreño. Por qué varían y qué es razonable esperar."` |

**Criterios de aceptación:**
- [ ] Copy exacto en los 3 pilares
- [ ] Sin botones ni CTAs en esta sección
- [ ] Layout: 3 columnas desktop → stack mobile

---

#### S4 — Lead magnet

**Propósito:** Capturar email con promesa de guía descargable. PDF no existe aún en Fase 1.

**Estructura:**
- 2 columnas: copy izquierda · placeholder de documento derecha
- Placeholder: componente SVG que simula un documento (construido en código, no imagen)
- Formulario: campo Nombre + campo Email + botón CTA

**Copy exacto (no modificar):**

Eyebrow: `"Próximamente · Gratis"`

Headline: `"Todo lo que necesitas saber antes de tu próxima visita al taller."`

Subhead: `"Estamos preparando una guía práctica para dueños de vehículo en El Salvador. Sin tecnicismos. Sin letra chica. Déjanos tu correo y eres el primero en recibirla."`

Disclaimer: `"Sin spam. Solo te escribimos cuando la guía esté lista."`

**Criterios de aceptación:**
- [ ] Formulario conecta con Brevo (tag: `leadmagnet-home`)
- [ ] Placeholder es SVG — no imagen de archivo
- [ ] Stack en mobile: copy arriba, placeholder abajo
- [ ] Copy exacto sin modificaciones

---

#### S5 — Intriga

**Propósito:** Cerrar el home con anticipación. Segunda captura de email. Único momento de contraste visual fuerte en el sitio.

**Estructura:**
- Sección de alto contraste visual — tratamiento definido en `design.md`
- Titular grande centrado
- Subtítulo
- Detalle geográfico pequeño
- Formulario de captura de email inline

**Copy exacto (no modificar):**

Headline: `"Llevamos meses entendiendo el problema."`

Subhead: `"La solución está en camino. Cuando esté lista, tú eres el primero en saberlo."`

Detalle geográfico: `"Empezamos en Santa Tecla y Antiguo Cuscatlán."`

Botón: `"Quiero saber →"`

**Criterios de aceptación:**
- [ ] Copy exacto
- [ ] Email capture conecta con Brevo (tag: `intriga-home`)
- [ ] Tratamiento visual de alto contraste aplicado según `design.md`

---

### FOOTER — Global

**Propósito:** Cierre del sitio. Links a redes. Sin mapa del sitio en Fase 1.

**Estructura:**
- Wordmark TallerExpress
- Tagline: `"Tu Agente Automotriz"`
- Íconos SVG: Instagram · Facebook
- Link WhatsApp (texto): formato `wa.me/...`
- Copyright + link a `/privacidad`

**Criterios de aceptación:**
- [ ] Links de redes abren en nueva pestaña
- [ ] WhatsApp usa formato correcto `wa.me/`
- [ ] `/privacidad` existe y no da 404
- [ ] Tratamiento visual consistente con S5 según `design.md`

---

### PÁGINA BLOG `/blog`

**Propósito:** Archivo completo de artículos. Navegación por categoría.

**Estructura:**
- Header de página: título + descripción breve
- Tabs de filtro por categoría: Todos · Educación · Precios · Confianza · Comunidad
- Grid de ArticleCards
- Paginación: 9 artículos por página

**Comportamiento:**
- Ordenado por fecha descendente por defecto
- Filtro por categoría sin reload de página
- Sin sidebar en Fase 1

**Criterios de aceptación:**
- [ ] Paginación funcional
- [ ] Filtro por categoría funciona client-side
- [ ] Grid responsive: 3 cols desktop · 2 cols tablet · 1 col mobile
- [ ] Ordenado por fecha desc por defecto

---

### PÁGINA ARTÍCULO `/blog/[slug]`

**Propósito:** Lectura del artículo. Componente más importante del sitio — el visitante pasa aquí la mayor parte del tiempo.

**Estructura (en orden):**
1. Badge de categoría
2. Título del artículo (H1)
3. Fecha + tiempo de lectura
4. Separador horizontal
5. Cuerpo del artículo (contenido MDX)
6. Bloque de captura de email post-artículo
7. 2 artículos relacionados (misma categoría)

**Restricciones de layout:**
- Columna central de lectura: máximo 680px — centrada en página
- Sin sidebar en Fase 1
- El copy va exacto desde el MDX — el BUILD Agent no modifica el contenido

**Copy del bloque de email (exacto):**
`"¿Te fue útil? Hay más contenido como este."`

**Metadata MDX requerida en cada artículo:**
```yaml
---
title: "Título del artículo"
slug: "url-del-articulo"
date: "2026-05-25"
category: "educacion" | "costos" | "confianza" | "comunidad"
readTime: "5 min"
excerpt: "Dos líneas para la card en homepage"
canal: "facebook" | "instagram" | "ambos"
segmento: "todos" | "mujer" | "joven" | "profesional"
---
```

**Criterios de aceptación:**
- [ ] Columna de lectura máximo 680px centrada
- [ ] Metadata MDX completa y válida en todos los artículos
- [ ] Email capture al final → Brevo (tag: `end-article`)
- [ ] 2 artículos relacionados de la misma categoría
- [ ] Open Graph tags correctos para compartir en Facebook
- [ ] El BUILD Agent no modifica el copy del MDX

---

### PÁGINA GUÍA `/guia`

**Propósito:** Captura de email con promesa de guía. URL permanente desde el inicio.

**Estructura:**
- Headline: `"La guía que todo dueño de vehículo en El Salvador necesita."`
- Descripción del contenido de la guía
- Formulario: Nombre + Email + botón CTA

**Regla crítica:** La URL `/guia` no cambia entre fases. En Fase 2 el contenido de la página se actualiza para entregar el PDF real — la ruta permanece.

**Criterios de aceptación:**
- [ ] Formulario conecta con Brevo (tag: `guia-page`)
- [ ] URL `/guia` es permanente — no cambia en Fase 2
- [ ] Página existe y no da 404

---

## 06 — SISTEMA DE CATEGORÍAS

| Slug | Nombre visible | Descripción |
|---|---|---|
| `educacion` | Educación | Mantenimiento preventivo, señales, frecuencias |
| `costos` | Precios | Rangos reales SV, comparativas, factores de costo |
| `confianza` | Confianza | Cómo evaluar, qué pedir, cómo documentar |
| `comunidad` | Comunidad | Humor, casos, encuestas, entretenimiento |

---

## 07 — FORMULARIOS Y EMAIL CAPTURE

**ESP:** Brevo — plan gratuito hasta 300 emails/día

### Puntos de captura y tags

| Punto | Página | Copy del botón | Tag Brevo |
|---|---|---|---|
| Hero | `/` | `"Avisame →"` | `hero-home` |
| Lead magnet | `/` | Botón CTA | `leadmagnet-home` |
| Intriga | `/` | `"Quiero saber →"` | `intriga-home` |
| Final de artículo | `/blog/[slug]` | Botón CTA | `end-article` |
| Página guía | `/guia` | Botón CTA | `guia-page` |

**Reglas de todos los formularios:**
- Validación de formato email antes de enviar
- Confirmación visual al enviar — sin redirect de página
- Todos envían al mismo list ID de Brevo + tag diferenciador
- Sin doble opt-in en Fase 1

**Criterios de aceptación:**
- [ ] Todos los forms validan email antes de enviar
- [ ] Confirmación visual sin redirect
- [ ] Brevo recibe el tag correcto por punto de captura
- [ ] Sin doble opt-in

---

## 08 — SEO BASE

- `<title>` único por página
- Meta description por página y por artículo (en frontmatter MDX)
- Open Graph tags para compartir — prioridad Facebook
- `sitemap.xml` generado automáticamente por Next.js
- `robots.txt` configurado correctamente
- URLs limpias, sin parámetros: `/blog/cuanto-cuesta-cambio-aceite-el-salvador`

### Keywords prioritarias fase stealth

- "cambio de aceite El Salvador"
- "cuánto cuesta mantenimiento carro El Salvador"
- "taller mecánico Santa Tecla"
- "mantenimiento preventivo carro"
- "revisión de frenos El Salvador"

---

## 09 — LO QUE NO VA EN FASE 1

| Funcionalidad | Razón | Cuándo |
|---|---|---|
| CMS externo (Contentful, Sanity) | MDX es suficiente | Evaluar en Fase 2 |
| Comentarios en artículos | Fuera de scope | Fase 2 |
| Búsqueda interna | Fuera de scope | Fase 2 |
| Múltiples idiomas | Solo español | Fase futura |
| Secciones de servicio | No revelar en stealth | Fase 2 — Reveal |
| Analytics complejos | Solo GA4 básico | Fase 2 |
| Portal del cliente | Requiere Supabase | Fase 3 |
| Sidebar en blog | Fuera de scope | Evaluar en Fase 2 |
| Hamburger menu | Sin necesidad en Fase 1 | Fase 2 |

---

## 10 — PREREQUISITOS DE DEPLOY

| Item | Responsable | Estado |
|---|---|---|
| Dominio `tallerexpress.one` registrado | Denys | ✅ Listo |
| Perfil Facebook creado y con bio | Denys | ⬜ Pendiente |
| Perfil Instagram creado y con bio | Denys | ⬜ Pendiente |
| Número WhatsApp Business activo | Denys | ⬜ Pendiente |
| ESP Brevo configurado + list ID | Denys | ⬜ Pendiente |
| Artículos 1, 2 y 3 escritos en MDX | Equipo | ⬜ En proceso |
| Dominio apuntando a Vercel | Dev | ⬜ Pendiente |
| Google Analytics 4 configurado | Dev | ⬜ Pendiente |
| `design.md` aprobado | Master | ⬜ Pendiente — Fase 2 |

---

## 11 — GATE CRITERIA — FASE 1 COMPLETA

- [x] Stack definido y actualizado (Next.js 16.2)
- [x] Todas las páginas Fase 1 especificadas
- [x] Copy exacto documentado por sección — separado de decisiones visuales
- [x] Criterios de aceptación definidos por componente
- [x] Sistema de categorías MDX definido
- [x] Puntos de captura de email y tags Brevo documentados
- [x] SEO base especificado
- [x] Lo que NO va en Fase 1 documentado explícitamente
- [x] Prerequisitos de deploy listados con responsables
- [x] Decisiones visuales removidas del spec → delegadas a `design.md`
- [ ] **Aprobación de Master** → avanzar a Fase 2 (design.md)

---

*Taller Express · spec.md · SDD v3.0 · Denysoft · Mayo 2026*
*Generado por SPEC Agent — v2 limpia de decisiones visuales*
*Próximo artifact: design.md (Fase 2) — basado en Magzin como Fuente 1*
