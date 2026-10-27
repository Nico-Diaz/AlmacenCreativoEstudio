# Almacen Creativo

Landing de **Almacen Creativo**, un estudio de diseño de interiores de Mendoza: tres diseñadoras que trabajan desde 2025 en casas, locales, vidrieras, eventos y propiedades. La idea del estudio está en el nombre: un almacén guarda, ordena y vuelve a poner en uso. Por eso parten de lo que el cliente ya tiene.

La página tiene que mostrar quiénes son, qué hacen, cómo trabajan y sus proyectos. También tiene que llevar a la visita a escribirles. Éxito = consultas iniciadas por email o WhatsApp.

El brief completo (público, posicionamiento, datos confirmados y principios) está en [PRODUCT.md](PRODUCT.md).

---

## Cómo correrlo

Requiere Node 22 o más nuevo.

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # build de producción en dist/
npm run preview    # sirve el build para revisarlo
```

El sitio es estático y no tiene backend. Está preparado para publicarse en **Vercel**: el build genera `dist/`, que se sirve tal cual.

## Stack

| Pieza | Para qué |
| --- | --- |
| [Astro 7](https://astro.build) | Arma la página y optimiza las imágenes (`astro:assets` genera WebP en varios tamaños). |
| React 19 + `@astrojs/react` | Solo para la isla interactiva del pedido (`client:visible`). El resto es HTML estático. |
| `react-icons` | Ícono del menú de celular (Phosphor *Light*). Se renderiza como SVG en el build y no suma JavaScript. |
| CSS propio con tokens | Sin frameworks de estilos. Colores, tipografía y espacios viven en `src/styles/tokens.css`. |
| TypeScript | Datos y scripts tipados. |

No hay librerías de animación. El movimiento usa CSS (incluidas las *scroll-driven animations*) y un script chico.

## Estructura

```
src/
  pages/index.astro          Orden de las secciones
  layouts/BaseLayout.astro   <head>, fuentes precargadas, script de movimiento
  components/
    Header.astro             Barra fija que cambia de color con cada sección
    Hero.astro               Primer pantallazo: tres fotos "colgadas" y el titular
    Franja.astro             Marquesina roja con los tipos de trabajo
    QuienesSomos.astro       Presentación, foto del almacén, planta y datos
    Servicios.astro          Qué hacemos: índice de servicios con panel de descripción
    Proyectos.astro          Galería horizontal de los proyectos
    Proceso.astro            Cómo trabajamos: foto fija y pasos que pasan
    FAQ.astro                Preguntas frecuentes con <details>
    Contacto.astro           Pedido + contacto directo
    Footer.astro             Nombre sobre la foto de la cordillera y créditos
    islands/Pedido.tsx/.css  Formulario del pedido (arma el mailto: y el link de WhatsApp)
  data/contenido.ts          TODO el texto: servicios, proyectos, pasos, preguntas, contacto, créditos
  styles/
    tokens.css               Paleta, fuentes, escala tipográfica, márgenes
    base.css                 Reset, temas por sección, botones, utilidades
    motion.css               Animaciones de carga, reveals y escenas de scroll
  scripts/motion.ts          Reveals, índice de servicios, menú, barra, galería, pasos
  assets/
    fotos/                   Fotos propias (y dos temporales de Unsplash)
    archivo/                 Imágenes de archivos abiertos, con licencia y crédito
public/fonts/                Zodiak y Hanken Grotesk (woff2, servidas desde el sitio)
```

Para cambiar un texto, casi siempre alcanza con editar [src/data/contenido.ts](src/data/contenido.ts).

---

## Qué hicimos

### 1. Buscamos e instalamos skills

Trabajamos con Claude Code y *skills*: paquetes de instrucciones que le dan criterio especializado al agente. Se instalan con el CLI de [skills.sh](https://skills.sh):

```bash
npx skills add vercel-labs/skills --skill find-skills --agent claude-code -y
npx skills add anthropics/skills --skill frontend-design --agent claude-code -y
```

Quedan en `.claude/skills/` y se registran en `skills-lock.json`.

| Skill | Origen | Cómo la usamos |
| --- | --- | --- |
| `find-skills` | vercel-labs/skills | Buscar en el ecosistema las skills adecuadas para el rediseño (`npx skills find ...`). |
| `frontend-design` | anthropics/skills | Criterio estético: tomar las decisiones a partir del tema y evitar los clichés de diseño generado por IA. |
| `design-taste-frontend` | leonxlnx/taste-skill | El motor del rediseño: reparte una dirección de arte, busca imágenes de archivos abiertos y trae un inspector que mide la página en un navegador real. |
| `impeccable` | pbakaus/impeccable | Lee `PRODUCT.md` y audita jerarquía, tipografía y accesibilidad. |
| `emil-design-eng`, `animate`, `review-animations` | emilkowalski/skills | Criterio de movimiento: curvas, duraciones y qué animar y qué no. |
| `mobile-native` | — | Detalles de celular: alto de pantalla, áreas táctiles, menú. |

`redesign-existing-projects` (también de taste-skill) figuraba en la búsqueda, pero ya no existe como skill aparte: su autor la integró dentro de `design-taste-frontend`.

### 2. Rediseño minimalista

El diseño anterior era pesado: celeste en toda la página, bloques rojos grandes, un hero partido en mosaico y una columna izquierda casi siempre vacía. Seguimos el proceso de `design-taste-frontend`:

1. **Medimos el "antes"** con el inspector, a 1440, 768 y 390 px.
2. **Hicimos el inventario del tema.** Salieron el nombre (almacén), Mendoza (acequias, cordillera), el reuso de muebles y los oficios locales.
3. **Elegimos una dirección** entre tres propuestas: *Photographs at uneven sizes*. Las fotos se cuelgan a tamaños desiguales, como copias en una pared de galería, sobre una grilla de 12 columnas.
4. **Escribimos la idea:** *"lo que ya tenés se guarda, se ordena y vuelve a usarse"*. La parte interactiva de la página sale de ahí.
5. **Construimos sección por sección** y pasamos el inspector hasta tener 0 fallas.

### 3. Más vida: color y escenas de scroll

Después de la primera versión, la página se sentía "como un informe". Sumamos color por capítulo y escenas atadas al scroll.

---

## Decisiones de diseño

### Paleta

Partimos de los dos colores de la marca y los usamos como **fondos enteros por capítulo**. Cada sección declara `data-tema` y el resto de los colores se heredan (ver `base.css`).

| Token | Color | Uso |
| --- | --- | --- |
| `--ground` | `#F1F4F7` papel frío | Fondo de hero, Quiénes somos, Proyectos, Pedido |
| `--ink` | `#8C2E21` rojo | Texto y acciones; fondo de la franja y de Qué hacemos |
| `--field` | `#AFC8DE` celeste | Fondo de Cómo trabajamos, la planta, botón de WhatsApp |
| `--field-pale` | `#DCE6EF` celeste pálido | Fondo de Preguntas frecuentes, láminas de proyectos |
| `--ink-deep` | `#5E1D15` rojo oscuro | Texto sobre celeste, hover de botones |
| `--ink-soft` | `#44596B` azul gris | Pies de foto y notas secundarias |

Contrastes medidos (WCAG 2.2 AA): rojo sobre papel 7.5:1, papel sobre rojo 7.8:1, rojo oscuro sobre celeste 7.3:1, rojo sobre celeste pálido 6.6:1.

### Tipografía

- **Zodiak** (Fontshare, licencia libre): serif fina para titulares, en pesos 100 y 300.
- **Hanken Grotesk** (OFL): sans neutra para el texto.

Usamos cinco tamaños en toda la página, con escalas fluidas (`clamp`) definidas en `tokens.css`. Las dos fuentes se sirven desde `public/fonts/` y se precargan.

### Lo interactivo: "Tu inventario"

En el pedido, además de elegir el espacio y el servicio, marcás qué hacer con cada cosa que ya tenés: **Se queda / Restaurar / Se va**. Eso viaja armado en el mensaje:

```
Espacio: Local u oficina
Necesito: Diseño de vidrieras
Se queda: Mesas
Restaurar: Sillones
Se va: Estanterías
```

Como no hay backend, *Enviar por email* abre un `mailto:` con asunto y cuerpo, y *Enviar por WhatsApp* abre `wa.me` con el mismo texto.

### Reglas que seguimos

Son las reglas de la casa de `design-taste-frontend`, que el inspector verifica:

- Titulares en dos líneas como máximo.
- Un solo `h1` y un título en cada sección.
- Márgenes iguales a los dos lados.
- Sin etiquetas chiquitas en mayúsculas encima de los títulos, sin numeración 01/02/03, sin líneas finas divisorias, sin degradados, sin sombras en reposo y sin tarjetas iguales con íconos.

---

## Animaciones

Todo se anima solo con `transform`, `opacity` y `clip-path`. Con **movimiento reducido** activado en el sistema, todo el contenido queda visible y quieto: sin escenas fijadas, sin marquesina, sin texto entintándose.

| Dónde | Qué pasa |
| --- | --- |
| Carga | El titular sube línea por línea y la foto grande se abre como un obturador mientras se asienta desde una escala mayor. |
| Barra superior | Queda fija arriba y toma el color de la sección que tiene debajo (papel, rojo, celeste). |
| Hero | Al bajar, las fotos descienden y se apagan, y el titular sube más rápido: el primer pantallazo "se retira". |
| Franja | Marquesina roja con los tipos de trabajo. Se pausa al pasar el mouse. |
| Quiénes somos | La bajada se entinta palabra por palabra mientras la leés. La foto del almacén tiene un parallax suave dentro de su marco. |
| Qué hacemos | Al señalar un servicio, su descripción entra en el panel y el nombre se subraya con una barra que crece. |
| Proyectos | En escritorio la sección se fija y el scroll vertical mueve la fila de fotos de lado. En celular es una fila con swipe y *snap*. |
| Cómo trabajamos | La foto queda fija a la izquierda; el paso que cruza el centro de la pantalla se enciende, cambia la foto y actualiza "Paso N de 4". En celular cada paso lleva su foto. |
| Botones | El hover rellena el botón desde la izquierda. Al apretarlo, se achica apenas. |
| Pedido | Los chips dan un pequeño salto al marcarse; "Restaurar" y "Se va" tienen su propio color. |
| Footer | La foto de la cordillera deriva muy lento. |

Las escenas de scroll usan `animation-timeline: view()`. En navegadores que todavía no lo soportan, la página se ve completa y estática.

## Accesibilidad

- Objetivo **WCAG 2.2 AA**: contraste verificado, foco visible en todo y navegación completa con teclado.
- El menú de celular es un `<details>` con el texto "Menú" para lectores de pantalla, y se cierra con Escape o al elegir una sección.
- Todas las fotos tienen texto alternativo que dice qué muestran.
- La descripción de cada servicio está en el HTML (los lectores de pantalla la leen aunque visualmente se muestre en el panel).
- Respeta `prefers-reduced-motion`.

## Imágenes

- **Propias del estudio:** stand de Altiér beauty (3 fotos) y Stand Trombetta (render, croquis y configuraciones). Los originales están en `material/`, que no se publica.
- **Temporales de Unsplash (reemplazar):** la sala de la foto chica del hero y el café del primer paso de "Cómo trabajamos".
- **Archivos abiertos**, con licencia que permite uso comercial y crédito en el footer:

| Imagen | Autor / fuente | Licencia |
| --- | --- | --- |
| Almacén de ramos generales | Museo y Archivo Histórico Municipal Don Santos Tosticarelli (Wikimedia Commons) | CC BY-SA 4.0 |
| Plan and Section of a Drawing Room (1793) | Thomas Sheraton, The Met | CC0 |
| Layetier, lámina de la Encyclopédie | Wellcome Collection | CC BY 4.0 |
| Taller de carpintería, Stará Ľubovňa | Georges Jansoone (Wikimedia Commons) | CC BY 3.0 |
| Acequias en Mendoza | Veronica Johansen (Wikimedia Commons) | CC BY-SA 3.0 |
| Cordillera de los Andes, Mendoza | María Belén Sica (Wikimedia Commons) | CC BY-SA 4.0 |

Estas imágenes muestran el mundo del oficio y de Mendoza. **Nunca se presentan como trabajos del estudio.** Los créditos se editan en `creditos` dentro de `src/data/contenido.ts`.

## Pendientes antes de publicar

- [ ] Reemplazar las dos fotos temporales de Unsplash por fotos propias.
- [ ] Confirmar los usuarios reales de Instagram y Pinterest (hoy son de muestra, en `contacto.redes`).
- [ ] Confirmar los textos de servicios y preguntas frecuentes con el estudio.
- [ ] Sumar fotos de casas o locales terminados cuando existan. No se inventan proyectos, testimonios ni cifras.

## Cómo verificar cambios

```bash
npm run build
node .claude/skills/design-taste-frontend/scripts/lint.mjs src
node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4321/
```

El inspector abre la página en Chrome a 1440, 768 y 390 px, mide titulares, contraste, márgenes, huecos y movimiento, y guarda capturas en `.taste-skill/`. La última pasada dio **0 fallas** y 43 elementos en movimiento.

Los cuatro avisos que quedan son decisiones tomadas:

- No hay video porque el estudio todavía no tiene filmaciones propias.
- La franja es más ancha que la pantalla.
- La galería queda fijada unas tres pantallas.
- En celular la fila de proyectos se desliza de lado.
