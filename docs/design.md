# design.md — Taller Express Design System

**SDD v3.0 · Fase 2 · Denysoft · Mayo 2026 · Confidencial**

> Este documento define el sistema de diseño oficial de Taller Express, extraído directamente del archivo de Figma.
> Gobierna toda la identidad visual del proyecto. Los diseños anteriores en este directorio han sido invalidados en favor de esta versión basada en Figma.

---

## 01 — IDENTIDAD VISUAL Y TEMÁTICA

La identidad visual de Taller Express es un **tema oscuro (Dark Mode) de alta gama y estético**. Evita la estética tradicional de los talleres mecánicos (llaves inglesas, manchas de grasa, sobretodo) y se enfoca en una experiencia digital premium, moderna y protectora.

- **Fondo predominante:** Azul marino muy oscuro (`#080f1f` / `#050811`).
- **Acento principal:** Naranja vibrante y cálido (`#ff8c1a` / `#ffb14a`) para llamadas a la acción, categorías importantes y detalles de enfoque.
- **Tipografías:** Modernas y de alta legibilidad en pantallas (`Manrope` para titulares, `Inter` para texto de lectura y UI).

---

## 02 — PALETA DE COLORES (TOKENS DE DISEÑO)

Usar siempre estas variables de CSS (`:root` o Tailwind Config). Queda terminantemente prohibido hardcodear valores hexadecimales en el código de los componentes.

### Colores Base y Fondos

```css
--te-bg-primary:    #080f1f; /* Fondo general del sitio, muy oscuro */
--te-bg-alt:        #050811; /* Fondo alterno para crear ritmo en secciones */
--te-bg-container:  linear-gradient(135deg, #16243b 0%, #0f1728 100%); /* Fondo del Lead Magnet */
```

### Colores de Texto

```css
--te-text-primary:  #f8fafc; /* Catskill White: Títulos, botones primarios y texto destacado */
--te-text-muted:    #94a3b8; /* Gull Gray: Párrafos, subtítulos y UI labels */
--te-text-subtle:   #6b7280; /* Pale Sky: Notas de pie, disclaimers, deshabilitados */
```

### Acentos Naranja (Gradientes y Planos)

```css
--te-orange:        #ff8c1a; /* West Side: Color principal para acentos de texto y badges */
--te-orange-h:      #ffb14a; /* Hover y final de gradiente del naranja */
--te-orange-grad:   linear-gradient(135deg, #ff8c1a 0%, #ffb14a 100%); /* Gradiente para botones primarios y tarjetas ebook */
```

### Elementos Glassmorphism (Tarjetas, Formularios, Bordes)

```css
/* Tarjetas (Stats, Artículos) */
--te-glass-bg:      rgba(255, 255, 255, 0.03);
--te-glass-border:  rgba(255, 255, 255, 0.06);

/* Inputs de Formulario */
--te-input-bg:      rgba(255, 255, 255, 0.06);
--te-input-border:  rgba(255, 255, 255, 0.08);

/* Badges con fondo translúcido */
--te-badge-bg:      rgba(255, 255, 255, 0.04);
--te-badge-border:  rgba(255, 255, 255, 0.08);
--te-orange-badge:  rgba(255, 140, 26, 0.12); /* Fondo naranja translúcido para badges de categoría */
```

### Sombras

```css
--te-shadow-ebook:  0px 40px 40px rgba(0, 0, 0, 0.45); /* Sombra pesada para destacar elementos */
```

---

## 03 — TIPOGRAFÍA

### Familias tipográficas

- **Display / H1 / H2:** `Manrope` (pesos 700 / 800) para un impacto visual de marca fuerte y profesional.
- **Body / UI / Labels:** `Inter` (pesos 400 / 500 / 600 / 700) para lectura óptima.
- *Nota:* Evitar usar fuentes estándar como Arial para el renderizado final; mapear todos los elementos de UI a la escala de `Inter`.

### Escala tipográfica

| Token | Tamaño | Peso | Familia | Uso |
|---|---|---|---|---|
| `text-ds-1` | `clamp(48px, 6vw, 96px)` | 800 | Manrope | Hero H1 (con tracking `-5.76px`) |
| `text-ds-2` | `clamp(40px, 5vw, 80px)` | 700 | Manrope | H2 Grande (Sección Footer CTA) |
| `text-ds-3` | `clamp(32px, 4vw, 64px)` | 700 | Manrope | H2 Estándar (Sección Lead) |
| `h3` | `32px` | 700 | Manrope | Títulos de tarjeta (Stats, Pillars) |
| `body-lg` | `17.3px` | 400 | Inter | Extracto de Hero (line-height: `31.1px`) |
| `body-md` | `16px` | 400 | Inter | Texto regular (line-height: `28.8px` o `25.6px`) |
| `label-sm` | `12.8px` | 400 | Inter | UI simple y badges generales |
| `label-xs` | `11.5px` | 700 | Inter | Categorías en mayúsculas (tracking: `0.92px`) |

---

## 04 — ESPACIADO Y GRIDS (BASE 8px)

El ritmo visual se mantiene constante con múltiplos de 8px:

| Token Tailwind | Equivalente | Uso |
|---|---|---|
| `p-2` | 8px | Padding interior para pills y badges de categoría |
| `p-4` | 16px | Padding compacto |
| `p-6` | 24px | Padding estándar |
| `p-[35px]` | 35px | Padding interior para tarjetas de estadísticas / pilares |
| `p-[70px]` | 70px | Padding interior para el contenedor de Lead Magnet |
| `gap-6` | 24px | Espacio entre columnas en grids (Stats, Artículos, Pilares) |
| `py-[120px]` | 120px | Margen vertical superior/inferior en secciones principales |
| `py-[140px]` | 140px | Margen vertical en secciones de transición |
| `max-w-[1280px]` | 1280px | Ancho máximo de contenedor general |

---

## 05 — BORDER RADIUS (REDONDEADO)

Se aplican rounded corners consistentes para evitar inconsistencias geométricas:

- `rounded-[999px]` (rounded-full): Para inputs, botones en píldora y badges tipo pill.
- `rounded-[40px]`: Para el gran contenedor del Lead Magnet.
- `rounded-[28px]`: Para tarjetas de estadísticas, tarjetas de pilares y tarjetas del blog.
- `rounded-[26px]`: Para la tarjeta inclinada del Ebook (Lead Magnet).
- `rounded-[18px]`: Para inputs del formulario del Lead Magnet.
- `rounded-[8px]`: Para botones y elementos de UI secundarios rectangulares.
- `rounded-[4px]`: Para micro-badges e indicadores (como el dot de ubicación).

---

## 06 — ELEMENTOS Y COMPONENTES VISUALES

### 1. Barra de Navegación (Nav)
- **Fondo:** Translúcido con backdrop blur.
- **Logotipo:** "Taller" en blanco, "Express" en naranja (`#ff8c1a`) con tipografía `Manrope` (peso 800).
- **CTA:** Botón en píldora color naranja con texto negro "Síguenos".

### 2. Tarjetas de Estadística / Pilares
- **Fondo:** `var(--te-glass-bg)` con borde `var(--te-glass-border)`.
- **Roundness:** `rounded-[28px]`.
- **Estructura:** Título en blanco, texto de párrafo en Gull Gray.

### 3. Formularios e Inputs
- **Inputs:** Fondo `var(--te-input-bg)` con borde `var(--te-input-border)` y redondeado tipo píldora o `rounded-[18px]`. Texto de marcador de posición (placeholder) en Gris Medio (`#757575`).
- **Botón de Enviar (CTA):** Fondo con gradiente naranja (`var(--te-orange-grad)`) y texto en negro (`#111111`) en peso extra bold, tipo píldora (`rounded-full`) o rectangular redondeado (`rounded-[18px]`).

### 4. Tarjeta Ebook (Lead Magnet)
- **Estética:** Tarjeta con gradiente naranja completo (`var(--te-orange-grad)`), inclinada `-6deg` (`-rotate-6`), con una sombra profunda y difusa (`drop-shadow-[0px_40px_40px_rgba(0,0,0,0.45)]`).
- **Contenido:** Títulos y textos en color oscuro `#111111` / `#1b1b1b` para alto contraste.

---

## 07 — INTERACCIONES Y MICRO-ANIMACIONES

1. **Hover en Botones Naranja:** Transición suave de opacidad/brillo en el gradiente o cambio sutil hacia un color más claro.
2. **Hover en Tarjetas Glass:** Ligera iluminación del borde o elevación sutil de la tarjeta.
3. **Hover en Arrow Box (Tarjetas de Artículo):** Rotación de la flecha a -45° y cambio de fondo del cuadro contenedor al azul marino de la marca.
4. **Animaciones de entrada (GSAP + ScrollTrigger):**
   - `.te-anime-text`: Los caracteres de titulares principales (`h1`, `h2`) entran de derecha a izquierda con un stagger de `0.02s` y efecto rebote.
   - `.te-anime-top`: Las tarjetas y bloques de secciones se deslizan hacia arriba (`y: 40` a `y: 0`) y ganan opacidad al ingresar al viewport.
