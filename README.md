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
| SVG a mano | Todos los dibujos (anotaciones, íconos, marcos, el camino del proceso) son SVG escritos en el código, no imágenes. |
| TypeScript | Datos y scripts tipados. |

No hay librerías de animación. El movimiento usa CSS (incluidas las *scroll-driven animations*) y un script chico.

## Estructura

```
src/
  pages/index.astro          Orden de las secciones
  layouts/BaseLayout.astro   <head>, fuentes, filtro SVG "lápiz", script de movimiento
  components/
    Logo.astro               Monograma "ac" vectorizado del logo original (toma el color del texto)
    Header.astro             Barra fija con el logo; cambia de color con cada sección
    Hero.astro               Titular + foto del almacén con las anotaciones dibujadas encima
    Franja.astro             Marquesina bordó con letra manuscrita y estrellas
    QuienesSomos.astro       Presentación, sello con el logo y datos
    Servicios.astro          Qué hacemos: seis servicios con íconos dibujados y checklist
    Proyectos.astro          Galería horizontal con marcos a mano, cinta y notas
    Proceso.astro            Cómo trabajamos: foto fija, pasos y camino dibujado
    FAQ.astro                Preguntas frecuentes con <details> y un "+" dibujado
    Contacto.astro           Pedido + contacto directo
    Footer.astro             Logo, nombre a todo el ancho y créditos
    islands/Pedido.tsx/.css  Formulario del pedido (arma el mailto: y el link de WhatsApp)
  data/contenido.ts          TODO el texto: servicios, proyectos, pasos, preguntas, contacto, créditos
  styles/
    tokens.css               Paleta, fuentes, escala tipográfica, márgenes
    base.css                 Reset, temas por sección, botones y el sistema de dibujos
    motion.css               Animaciones de carga, reveals y escenas de scroll
  scripts/motion.ts          Reveals y dibujos, menú, barra, galería, pasos
  assets/
    fotos/                   Fotos propias del estudio (y una temporal de Unsplash)
    archivo/                 Imágenes de archivos abiertos, con licencia y crédito
public/
  fonts/                     Hanken Grotesk y Caveat (woff2, servidas desde el sitio)
  favicon.svg                El logo sobre su celeste
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
| `design-taste-frontend` | leonxlnx/taste-skill | Dirección de arte, búsqueda de imágenes en archivos abiertos y un inspector que mide la página en un navegador real. |
| `impeccable` | pbakaus/impeccable | Lee `PRODUCT.md` y audita jerarquía, tipografía y accesibilidad. |
| `emil-design-eng`, `animate`, `review-animations` | emilkowalski/skills | Criterio de movimiento: curvas, duraciones y qué animar y qué no. |
| `mobile-native` | — | Detalles de celular: alto de pantalla, áreas táctiles, menú. |

`redesign-existing-projects` (también de taste-skill) figuraba en la búsqueda, pero ya no existe como skill aparte: su autor la integró dentro de `design-taste-frontend`.

### 2. Tres versiones del diseño

1. **Minimalista.** Grilla editorial, fotos a tamaños desiguales y serif fina. Quedó prolija pero seca.
2. **Más color y movimiento.** Fondos enteros por sección y escenas de scroll. Seguía sin la identidad del estudio.
3. **Cuaderno de obra (la actual).** Rearmada a partir del logo, la paleta de la marca y una referencia de estilo: una foto de obra con muebles dibujados encima en amarillo y estrellas rojas.

### 3. El concepto actual: dibujar sobre lo que ya tenés

La referencia muestra exactamente lo que hace el estudio: pararse en un espacio que existe y dibujar encima la propuesta. Toda la página se arma así:

- **Hero:** la foto de un almacén de ramos generales con el inventario anotado a mano. Hay una lámpara colgante nueva, la mecedora encerrada con un "se queda", la vitrina remarcada con "la restauramos", un cuadro nuevo con la cordillera, una alfombra y estrellas. Los trazos se dibujan solos al cargar la página.
- **El logo como sello:** el monograma aparece en la barra, en Quiénes somos (rodeado de "guardamos / ordenamos / volvemos a usar") y en grande en el footer.
- **Íconos y marcos a mano:** los servicios tienen íconos dibujados (sillón, casa, guirnalda, vidriera, cubo, globo de diálogo). Las fotos de proyectos llevan un marco dibujado, una cinta de papel y una nota manuscrita.
- **Notas manuscritas** en Caveat donde un diseñador escribiría a mano sobre un plano.

---

## Decisiones de diseño

### Logo

El logo original (JPG) se vectorizó con `potrace` y quedó como SVG en `src/components/Logo.astro`. Toma el color del texto (`currentColor`), así que sirve sobre cualquier fondo: rojo sobre celeste en el sello, arena sobre bordó en el footer. El favicon es el mismo monograma sobre su celeste.

### Paleta

Son los colores que pasó el estudio, medidos de las imágenes originales. Se usan como **fondos enteros por capítulo**: cada sección declara `data-tema` y el resto de los colores se heredan (ver `base.css`).

| Token | Color | Uso |
| --- | --- | --- |
| `--papel` | `#F8EDD7` | Fondo general (arena aclarada): hero, Quiénes somos, Preguntas |
| `--arena` | `#EFD099` | Fondo de Proyectos y del pedido; texto sobre los fondos oscuros |
| `--marron` | `#5F2E20` | Texto principal; fondo de Qué hacemos |
| `--bordo` | `#7A113A` | Botones; fondo de la franja y del footer |
| `--rojo` | `#832F27` | Rojo del logo: trazos, estrellas, notas |
| `--celeste` | `#B3CEE1` | Celeste del logo: fondo de Cómo trabajamos, sello, preguntas abiertas |
| `--oliva` | `#937B21` | Reservado para dibujos: no alcanza contraste para texto |

Contrastes medidos (WCAG 2.2 AA): marrón sobre papel 9.6:1, arena sobre marrón 7.6:1, arena sobre bordó 7.2:1, marrón sobre celeste 6.9:1, marrón sobre arena 7.6:1.

### Tipografía

- **Hanken Grotesk** (OFL, variable): titulares muy gruesos (800–900) y apretados, como en la referencia, y también el texto corrido.
- **Caveat** (OFL): letra manuscrita, solo para notas y anotaciones.

Las dos fuentes se sirven desde `public/fonts/` y se precargan.

### El sistema de dibujos

- **Filtro de lápiz.** En el layout hay un filtro SVG (`#lapiz`: ruido + desplazamiento) que hace temblar apenas cada trazo, para que las líneas limpias del código parezcan hechas con marcador.
- **Trazos que se dibujan.** Los trazos con `pathLength="1"` dentro de un contenedor `data-draw` se dibujan solos (`stroke-dashoffset`) cuando entran en pantalla, uno detrás del otro según `--d`.
- **Coordenadas de la foto.** Las anotaciones del hero usan el mismo sistema de coordenadas que la foto (1920 × 1444) y el mismo recorte (`slice` / `object-fit: cover`), así que siempre caen sobre el objeto correcto.
- **Celular.** Las notas que quedarían fuera del recorte vertical se ocultan (`.solo-ancho`) y aparece una versión ubicada dentro del recorte (`.solo-movil`).

### El pedido

Elegís qué espacio es y qué necesitás. Cada opción elegida queda encerrada en un círculo de marcador dibujado. Como no hay backend, *Enviar por email* abre un `mailto:` con asunto y cuerpo armados, y *Enviar por WhatsApp* abre `wa.me` con el mismo texto.

---

## Animaciones

Todo se anima con `transform`, `opacity`, `clip-path` y el trazo de los SVG. Con **movimiento reducido** activado en el sistema, todo el contenido queda visible y quieto: los dibujos aparecen completos, sin escenas fijadas y sin marquesina.

| Dónde | Qué pasa |
| --- | --- |
| Carga | El titular sube línea por línea y las anotaciones del hero se dibujan sobre la foto, una detrás de otra. |
| Barra superior | Queda fija y toma el color de la sección que tiene debajo. El logo gira un poco al pasar el mouse. |
| Hero | Al bajar, el titular sube y se desvanece. |
| Franja | Marquesina bordó con letra manuscrita. Las estrellas laten y giran; se pausa al pasar el mouse. |
| Quiénes somos | La bajada se entinta palabra por palabra mientras la leés. El sello del logo gira con el scroll y sus tres notas se escriben alrededor. |
| Qué hacemos | Cada ícono se dibuja al aparecer y se inclina al pasar el mouse. Los tildes del checklist se trazan uno por uno. |
| Proyectos | En escritorio la sección se fija y el scroll mueve la fila de fotos de lado. Los marcos se dibujan y las fotos se inclinan al pasar el mouse. En celular es una fila con swipe. |
| Cómo trabajamos | La foto queda fija y el paso que cruza el centro de la pantalla se enciende y la cambia ("Paso N de 4"). Un camino punteado se va trazando con el scroll. En celular cada paso lleva su foto. |
| Preguntas | El "+" dibujado gira y pierde su trazo vertical al abrir; la fila se vuelve celeste. |
| Pedido | Las opciones elegidas quedan encerradas en un círculo de marcador que se dibuja. |
| Botones | El hover rellena el botón desde la izquierda; al apretarlo se achica apenas. |

Las escenas de scroll usan `animation-timeline: view()`. En navegadores que todavía no lo soportan, la página se ve completa y estática.

## Accesibilidad

- Objetivo **WCAG 2.2 AA**: contraste verificado, foco visible en todo y navegación completa con teclado.
- Los dibujos son decorativos (`aria-hidden`). Lo que anotan está dicho también en el texto o en el pie de la foto.
- El menú de celular es un `<details>` con el texto "Menú" para lectores de pantalla, y se cierra con Escape o al elegir una sección.
- Todas las fotos tienen texto alternativo que dice qué muestran.
- Respeta `prefers-reduced-motion`.

## Imágenes

- **Propias del estudio:** stand de Altiér beauty (3 fotos) y Stand Trombetta (render, croquis y configuraciones). Los originales están en `material/`, que no se publica.
- **Temporal de Unsplash (reemplazar):** el café del primer paso de "Cómo trabajamos".
- **Archivos abiertos**, con licencia que permite uso comercial y crédito en el footer:

| Imagen | Autor / fuente | Licencia |
| --- | --- | --- |
| Almacén de ramos generales | Museo y Archivo Histórico Municipal Don Santos Tosticarelli (Wikimedia Commons) | CC BY-SA 4.0 |
| Plan and Section of a Drawing Room (1793) | Thomas Sheraton, The Met | CC0 |
| Layetier, lámina de la Encyclopédie | Wellcome Collection | CC BY 4.0 |
| Taller de carpintería, Stará Ľubovňa | Georges Jansoone (Wikimedia Commons) | CC BY 3.0 |
| Acequias en Mendoza | Veronica Johansen (Wikimedia Commons) | CC BY-SA 3.0 |

Estas imágenes muestran el mundo del oficio y de Mendoza. **Nunca se presentan como trabajos del estudio.** El hero lo aclara en su pie: es un almacén de museo con las notas del estudio encima. Los créditos se editan en `creditos` dentro de `src/data/contenido.ts`.

## Pendientes antes de publicar

- [ ] Reemplazar la foto temporal de Unsplash (el café) por una foto propia.
- [ ] Cuando haya una foto propia de un espacio "antes", usarla en el hero. Habría que volver a ubicar las anotaciones sobre ella: las coordenadas están en `Hero.astro`.
- [ ] Confirmar los usuarios reales de Instagram y Pinterest (hoy son de muestra, en `contacto.redes`).
- [ ] Confirmar los textos de servicios y preguntas frecuentes con el estudio.
- [ ] No se inventan proyectos, testimonios ni cifras.

## Cómo verificar cambios

```bash
npm run build
node .claude/skills/design-taste-frontend/scripts/lint.mjs src
node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4321/ --allow palette-claude
```

El inspector abre la página en Chrome a 1440, 768 y 390 px, mide titulares, contraste, márgenes, huecos y movimiento, y guarda capturas en `.taste-skill/`.

Usamos `--allow palette-claude` porque el inspector marca "crema + terracota" como cliché genérico, pero acá es la paleta real de la marca.

La última pasada dio **0 fallas** y 75 elementos en movimiento. Los avisos que quedan son decisiones tomadas:

- No hay video porque el estudio todavía no tiene filmaciones propias.
- La franja es más ancha que la pantalla.
- La galería queda fijada unas pantallas.
- En celular la fila de proyectos se desliza de lado.
- Hay varios tamaños de letra por la mezcla de titulares y notas manuscritas.
