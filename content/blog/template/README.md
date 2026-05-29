# Carpeta de Plantilla de Referencia para Blog Posts

Copia tu archivo HTML de referencia en esta carpeta (`content/blog/template/`). Una vez copiado, adaptaremos su estructura y diseño al pipeline de Next.js y MDX de Taller Express, asegurando que sea:
1. **Totalmente responsive** (adaptado de forma fluida a dispositivos móviles, tablets y desktops).
2. **Compatible con Light Mode y Dark Mode** (utilizando las variables de marca y tokens del sistema de diseño de Taller Express).
3. **Fiel al branding oficial** (tipografías Geist e Inter, paleta de colores con el naranja de alta visibilidad `#ff8c1a` y el azul pizarra oscuro `#0b1329`).

---

## Arquitectura de Medios y Multimedia para los Artículos

Para mantener un proyecto ordenado, escalable y limpio, cada artículo del blog tendrá su propia subcarpeta estructurada dentro del directorio público. 

Sigue esta estructura para tus recursos multimedia (imágenes, infografías, capturas o videos):

```text
public/
└── images/
    └── blog/
        └── [slug-del-articulo]/
            ├── og.png                 # Imagen de portada / SEO (4:3 o 1200x630px)
            ├── cover.jpg              # Alternativa o portada del artículo
            ├── infografias/           # Diagramas o esquemas técnicos ilustrativos
            ├── ilustraciones/         # Imágenes que acompañan a los pasos/secciones
            └── videos/                # Videos cortos o clips embebidos (si aplica)
```

### Ejemplo de uso práctico:
Para el artículo `cada-cuanto-cambiar-aceite-carro`, guardarías los archivos en:
- `public/images/blog/cada-cuanto-cambiar-aceite-carro/og.png`
- `public/images/blog/cada-cuanto-cambiar-aceite-carro/ilustraciones/filtro-aceite.jpg`

Y en el archivo MDX del artículo (`content/blog/cada-cuanto-cambiar-aceite-carro.mdx`), los llamarías de forma limpia:
```markdown
---
title: "¿Cada cuánto tiempo debo cambiar el aceite de mi carro?"
slug: "cada-cuanto-cambiar-aceite-carro"
category: "educacion"
readTime: "5 min"
excerpt: "Te explicamos de forma sencilla los intervalos recomendados..."
ogImage: "/images/blog/cada-cuanto-cambiar-aceite-carro/og.png"
---

Aquí va el contenido...

![Filtro de aceite](/images/blog/cada-cuanto-cambiar-aceite-carro/ilustraciones/filtro-aceite.jpg)
```
