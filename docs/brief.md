# brief.md — Taller Express
**SDD v3.0 · Fase 0 · Denysoft · Mayo 2026 · Confidencial**

> Fuente de verdad unificada para el proyecto Taller Express.
> Consolida: brief-v3.md · brand-guide-v2.md · fase1-awareness-plan-v2.md · calendario-contenidos-v1.md · homeblog-spec-v2.md
> Todo agente que trabaje en este proyecto debe leer este documento antes de ejecutar cualquier tarea.

---

## 01 — CLASIFICACIÓN SDD

| Campo | Valor |
|---|---|
| **Nombre del proyecto** | Taller Express |
| **Tipo** | Cliente comisionado (operado por Denysoft) |
| **Carril activo** | 🏗️ Build + 📣 Content (sesiones separadas) |
| **Tipo de build** | Greenfield + Reference Source |
| **Estado** | Documentación aprobada — listo para build |
| **Dominio** | `tallerexpress.one` (registrado) |
| **Urgencia** | MVP en 3 meses · Fase 1 web/content: inmediata |

### Rutas absolutas — Las 3 Fuentes

| Fuente | Ruta | Rol |
|---|---|---|
| **Fuente 1 — Visual** | `/mnt/c/dev/lab/magzin-react/` | Layout, grid, cards, ritmo · SOLO LECTURA |
| **Fuente 2 — Contenido** | `/mnt/c/dev/lab/taller-express/content/` | Copy MDX aprobado · va EXACTO |
| **Fuente 3 — Marca** | `/mnt/c/dev/lab/taller-express/CLAUDE.md` | Design system, paleta, tipografía, anti-patterns |

### Carpeta del proyecto

```
/mnt/c/dev/lab/
├── magzin-react/              ← SOLO LECTURA — referencia visual
└── taller-express/            ← BUILD aquí desde cero
    ├── docs/                  ← Artifacts SDD (brief.md, spec.md, design.md, plan.md, tasks.md, CLAUDE.md)
    └── content/               ← Artículos MDX aprobados
```

---

## 02 — CONTEXTO DEL NEGOCIO

### Qué es Taller Express

**Tu Agente Automotriz** en El Salvador. Representante personal del cliente ante talleres certificados. Recoge el vehículo, gestiona el servicio con total transparencia, y lo devuelve listo. El cliente nunca interactúa directamente con el taller.

> *"Nosotros negociamos mejor por ti."*

### El problema real que resuelve

- Cobros abusivos a mujeres y dueños sin experiencia mecánica
- Perder medio día esperando en un taller
- Falta de transparencia en diagnósticos y precios
- Desconfianza crónica en talleres tradicionales
- Sin tiempo para gestionar el mantenimiento del vehículo

### Propuesta de valor

| Para el cliente | Para los talleres socios |
|---|---|
| Cotizaciones claras sin sorpresas | Flujo constante de clientes verificados |
| Recogida y entrega a domicilio (gratis) | Gestión digital integrada |
| Seguimiento en tiempo real | Pagos garantizados y a tiempo |
| Garantía de calidad respaldada | Certificación y credibilidad aumentada |

### Posicionamiento

**"Tu Agente Automotriz"** — Calidad certificada, precio honesto, sin sorpresas.

Referentes de posicionamiento: Rappi · inDrive · Kavak · Pedidos Ya
Referentes de estética visual: Linear.app · Stripe · PandaDoc *(no confundir — son referencias distintas)*

> ⚠️ La marca NO debe parecer cara ni exclusiva (restricción del inversor).
> Referente correcto: *"Pedidos Ya"* — NO *"Uber Black"*.

---

## 03 — MERCADO Y AUDIENCIA

### Datos de mercado (fuentes verificadas)

| Dato | Cifra | Fuente |
|---|---|---|
| Vehículos registrados en El Salvador | 1,919,813 | ONASEVI 2024–2025 |
| Vehículos ligeros particulares estimados | ~1.15–1.20M | Estimado sobre ONASEVI |
| Share de Facebook en SV | 63.88% | StatCounter / Statista ago 2024 |
| Share de Instagram en SV | 13.48% | StatCounter / Statista ago 2024 |
| Usuarios sociales mayores de 18 años en SV | 3.90M | DataReportal ene 2025 |
| Adopción WhatsApp en El Salvador | ~95% | Estimado de mercado |

### Zona geográfica inicial

**Santa Tecla y Antiguo Cuscatlán** — Gran San Salvador. No dispersar hasta validar el modelo operativo.

### Segmentos objetivo

#### Segmento A — La Mujer Propietaria *(Primario · Alto volumen)*
- Edad: 25–50 · Profesional independiente · Toma decisiones propias
- Vehículos: Toyota RAV4, Honda CR-V, Kia Sportage, Hyundai Tucson
- Dolor: *"No confío en los mecánicos. ¿Me van a cobrar de más por ser mujer?"*
- Promesa: *"Que no te cobren de más. Tu agente te representa."*

#### Segmento B — El Joven del Primer Carro *(Primario · Alto potencial referral)*
- Edad: 20–32 · Digital nativo · Primer vehículo propio
- Vehículos: Toyota Corolla, Nissan Sentra, Kia Rio, Honda Civic
- Dolor: *"No sé nada de carros. ¿Cómo sé si me están estafando?"*
- Promesa: *"Tu carro listo sin aprender mecánica. Todo claro, nada oculto."*

#### Segmento C — El Profesional con Agenda *(Secundario · Alto valor por ticket)*
- Edad: 35–55 · Ejecutivo o empresario
- Vehículos: BMW, Mercedes, Lexus, Toyota Fortuner
- Dolor: *"El taller me roba horas de trabajo productivo."*
- Promesa: *"Tu tiempo vale demasiado para perderlo en un taller."*

#### Segmento D — Flotillas Corporativas *(Futuro · B2B)*
- 5+ vehículos · Contratos a largo plazo · Mayor ticket promedio

---

## 04 — PERSONALIDAD Y VOZ DE MARCA

### Los 5 atributos clave

| Atributo | Descripción |
|---|---|
| 🛡️ **Protector** | Atributo central. Tu aliado, no un mecánico. |
| 💡 **Transparente** | Sin sorpresas. Cotización clara antes de actuar. |
| ⚡ **Eficiente** | Express. Rápido. Sin perder tu tiempo. |
| 🤝 **Humano** | Atención real, no solo bots ni automatización. |
| 📱 **Moderno** | Tech-forward. App, IA, gestión digital. |

### Arquetipo
La marca se siente como **un ejecutivo de confianza** — no como un mecánico. Concierge de hotel 5 estrellas aplicado al mundo automotriz: accesible, profesional, discreto.

### Tono — Autoridad cómplice

✅ Habla como vecino, no como empresa
✅ Directo, empático, confiado sin arrogancia
✅ Natural salvadoreño — sin anglicismos forzados
✅ Hazlos sentir inteligentes por leer el contenido

❌ Sin tecnicismos mecánicos
❌ Sin tono caro o exclusivo
❌ Sin atacar a los talleres — el enemigo es la falta de información, no el mecánico

---

## 05 — MODELO DE NEGOCIO

### Flujo del servicio

```
Solicitud (app/WA) → Cotización Transparente → Recogida a Domicilio
        ↓
  Servicio en Taller Certificado → Entrega con Garantía
```

### Servicios MVP (4 servicios de lanzamiento)

1. **Cambio de aceite** — Alta frecuencia, entrada de clientes
2. **Revisión de frenos** — Seguridad crítica, alta percepción de valor
3. **Verificación de llantas** — Rápido, visible, fácil de comunicar
4. **Estado de batería** — Digital-friendly, diagnóstico inmediato

### Canal vertebral

**WhatsApp Business (~95% adopción en SV)** — columna vertebral operativa. Todo el flujo de cotización, seguimiento y entrega pasa por WhatsApp. No es canal secundario.

---

## 06 — STACK TECNOLÓGICO (CERRADO — NO REABRIR)

| Capa | Tecnología | Estado |
|---|---|---|
| Framework | Next.js 16.2 (App Router + Turbopack) | ✅ Cerrado |
| Estilos | Tailwind CSS | ✅ Cerrado |
| Contenido | MDX (archivos locales) | ✅ Cerrado |
| Deploy | Vercel | ✅ Cerrado |
| Email capture | Brevo | ✅ Cerrado |
| Base de datos | Supabase | ⬜ Fase 3 |
| IA / Chatbot | Claude API (Anthropic) | ⬜ Fase 3 |
| Comunicación | WhatsApp Business API | ⬜ Fase 3 |
| Desarrollo asistido | Cursor IDE · v0.dev | ✅ Activo |

> ⚠️ Framer, Carrd, WordPress descartados. Next.js 16 desde el día 1 para evitar migración al conectar el MVP.
> ⚠️ Next.js 16.2 incluye Turbopack por defecto, TypeScript, Tailwind CSS y App Router en el scaffold inicial. El CLAUDE.md generado por `create-next-app` incluye guías para agentes — usar como base del CLAUDE.md del proyecto.

> ⚠️ El reference codebase (magzin-react) usa Bootstrap Grid + Vite + React. El BUILD Agent lee Magzin como referencia visual ÚNICAMENTE. No copiar class names. Reimplementar en Tailwind.

---

## 07 — FASES DEL PROYECTO

### Fases del sitio web

| Fase | Período | Qué está activo |
|---|---|---|
| **Stealth** | Meses 1–3 | Home + Blog + Captura email + Intriga |
| **Reveal** | Mes 4–5 | Se activan `/servicios`, `/como-funciona`, `/contacto` |
| **Operación** | Mes 6+ | MVP conectado: `/app`, Supabase, Claude API |

### Fases de contenido (canal 📣)

| Fase | Período | Enfoque |
|---|---|---|
| Mes 1 | Mayo–Junio | Educación pura · 8 artículos · Cero mención de servicio |
| Mes 2 | Junio–Julio | Profundidad y segmentación · 8 artículos |
| Mes 3 | Julio–Agosto | Anticipación · Artículos 23 y 24 = pre-reveal |
| Reveal | Fin Mes 3 | Anuncio oficial + apertura de waitlist |

### Decisiones cerradas — no reabrir

| Decisión | Resolución |
|---|---|
| Nombre del canal stealth | Taller Express desde el día 1 |
| Qué se oculta | La oferta de servicio, no la marca |
| Modelo de lanzamiento | Waitlist launch |
| Momento del reveal | Fin Mes 3 / inicio Mes 4 |
| Plataformas prioritarias | Facebook · Instagram · WhatsApp Business |
| Plataformas excluidas | Twitter/X · LinkedIn · Pinterest · YouTube |

---

## 08 — PREREQUISITOS DE DEPLOY

| Item | Responsable | Estado |
|---|---|---|
| Dominio `tallerexpress.one` | Denys | ✅ Listo |
| Perfil Facebook con bio | Denys | ⬜ Pendiente |
| Perfil Instagram con bio | Denys | ⬜ Pendiente |
| Número WhatsApp Business | Denys | ⬜ Pendiente |
| ESP configurado (Brevo) | Denys | ⬜ Pendiente |
| Artículos 1, 2 y 3 en MDX | Equipo | ⬜ En proceso |
| Dominio apuntando a Vercel | Dev | ⬜ Pendiente |

---

## 09 — MÉTRICAS DE ÉXITO FASE 1

| Métrica | Meta Mes 1 | Meta Mes 2 | Meta Mes 3 |
|---|---|---|---|
| Sesiones blog (mensual) | 500 | 1,500 | 3,000 |
| Seguidores Facebook | 500 | 2,000 | 5,000 |
| Seguidores Instagram | 300 | 1,200 | 3,000 |
| Emails capturados (acumulado) | 200 | 800 | 1,800 |
| Engagement rate Instagram | 4% | 4–5% | 5%+ |
| Artículos publicados | 8 | 16 | 24 |
| Registros en waitlist (reveal) | — | — | 200+ |

---

## 10 — REGLA EDITORIAL FUNDAMENTAL

**El contenido NO ataca a talleres. Nunca.**

Los talleres son aliados futuros del modelo de negocio. El enemigo en el copy es **la falta de información** — no el mecánico.

| ❌ Incorrecto | ✅ Correcto |
|---|---|
| "Tu taller te cobra de más" | "Llega al taller con más contexto" |
| "Señales de un taller deshonesto" | "Señales de un servicio bien hecho" |
| "Lo que los mecánicos no te dicen" | "Lo que vale la pena preguntar" |

---

## 11 — GATE CRITERIA — FASE 0 COMPLETA

- [x] Proyecto clasificado y carril definido
- [x] Las 3 fuentes documentadas con rutas absolutas
- [x] Tipo de build declarado: Greenfield + Reference Source
- [x] Stack cerrado y documentado
- [x] Segmentos, posicionamiento y voz de marca consolidados
- [x] Prerequisitos de deploy listados con responsables
- [x] Source Review de magzin-react completado
- [ ] **Aprobación de Master** → avanzar a Fase 1 (spec.md)

---

*Taller Express · brief.md · SDD v3.0 · Denysoft · Mayo 2026*
*Generado por BRIEF Agent — consolidado desde 5 documentos fuente*
*Próximo artifact: spec.md (Fase 1)*
