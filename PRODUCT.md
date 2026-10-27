# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro + React (islas solo donde hay interacción), CSS propio con tokens. Elegido por la usuaria.

## Users

- Particulares que reforman, amueblan o reordenan su casa o departamento.
- Comercios y profesionales que abren o renuevan un local: cafés, tiendas, oficinas, consultorios.

Llegan a la landing para decidir si este equipo es para ellos y escribirles.

## Product Purpose

Landing de Almacen Creativo, un equipo de diseñadoras de interiores. Tiene que mostrar quiénes son, qué hacen, cómo trabajan y sus proyectos, y llevar a la visita a contactarlas (email o WhatsApp). Éxito = consultas iniciadas.

## Positioning

Reutilizan lo que el cliente ya tiene (muebles, piezas, materiales) y trabajan con materiales y artesanos locales. El nombre lo resume: un almacén guarda, ordena y vuelve a poner en uso.

## Operating Context

Primer contacto por email o WhatsApp; luego visita, propuesta, proyecto y obra. Sin backend: el formulario arma un `mailto:` y hay enlace directo a WhatsApp.

## Capabilities and Constraints

- Secciones: Quiénes somos, Servicios, Proyectos, Proceso, Preguntas frecuentes, Contacto.
- Servicios (confirmados): diseño de interiores, diseño inmobiliario, ambientación de eventos, diseño de vidrieras, renderizado y asesoramiento.
- Proceso (confirmado, 4 pasos): Nos conocemos, Diseñamos, Proyectamos la ejecución, Supervisamos la obra.
- Datos confirmados: estudio en Mendoza, desde 2025, equipo de tres diseñadoras. Email almacencreativo.dis@gmail.com; teléfonos +54 9 261 604-6734 (principal y WhatsApp) y +54 9 264 530-1413.
- Herramientas: SketchUp, AutoCAD, Enscape/Lumion/V-Ray, Photoshop, Canva.
- **Pendiente de confirmar:** usuarios de Instagram y Pinterest; textos de explicación de servicios y de FAQ.

## Brand Commitments

- Nombre: Almacen Creativo.
- Logo: monograma "ac" escrito a mano dentro de un círculo dibujado, rojo `#832F27` sobre celeste `#B3CEE1`. Vectorizado en `src/components/Logo.astro` (toma el color del texto) y en `public/favicon.svg`.
- Paleta de la guía de marca: marrón `#5F2E20`, oliva `#937B21`, bordó `#7A113A` y arena `#EFD099`, más el rojo y el celeste del logo. Fondo general papel `#F8EDD7` (arena aclarada). Cada sección declara `data-tema` (papel, arena, marrón, bordó, celeste) y la barra fija toma ese color. El oliva no alcanza contraste para texto: solo dibujos.
- Estilo visual (octubre 2026): "cuaderno de obra". Trazos hechos a mano sobre fotos reales, con notas manuscritas, como quien dibuja una propuesta encima del espacio que existe. Referencia: fotos de obra con muebles dibujados encima y estrellas rojas.
- Tipografía: Hanken Grotesk muy gruesa y apretada para titulares y texto; Caveat (manuscrita) solo para notas y anotaciones. Servidas desde `public/fonts/`.
- Idioma: español rioplatense, trato de "vos".

## Evidence on Hand

- Proyectos reales: stand de Altiér beauty en feria (3 fotos) y Stand Trombetta para Óptica Luis Trombetta en el torneo Máximo Navesi (render, croquis y configuraciones, extraídos del entregable en PDF). Originales en `material/` (fuera de `public/`, no se publican).
- Todavía usan una foto temporal de Unsplash: el café del primer paso de Proceso.
- Imágenes de archivos abiertos, con crédito en el footer (`creditos` en `src/data/contenido.ts`): almacén de ramos generales, grabados de Sheraton y de la Encyclopédie, taller de carpintería y acequia. Muestran el mundo del oficio, nunca se presentan como trabajos del estudio.
- No hay testimonios, prensa, clientes ni cifras: no se inventan.

## Product Principles

1. Lo existente primero: mostrar cómo se reaprovecha antes que lo nuevo que se compra.
2. Claridad para decidir: qué hacen, cómo, cuánto tarda y cómo empezar, sin vueltas.
3. Contactar tiene que ser fácil y estar a mano en toda la página.
4. Nada de prueba inventada.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, foco visible, navegación por teclado, texto alternativo, `prefers-reduced-motion`.
