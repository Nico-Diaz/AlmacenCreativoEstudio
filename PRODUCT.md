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
- Colores de la marca: celeste `#AFC8DE` y rojo `#8C2E21`. Desde el rediseño minimalista (octubre 2026) el fondo es un papel frío claro `#F1F4F7`; el rojo es la tinta del texto y las acciones, y el celeste queda para bloques (la sección Proceso, la planta de Quiénes somos).
- Tipografía: Zodiak (titulares, serif fina) y Hanken Grotesk (texto), servidas desde `public/fonts/`.
- Idioma: español rioplatense, trato de "vos".

## Evidence on Hand

- Proyectos reales: stand de Altiér beauty en feria (3 fotos) y Stand Trombetta para Óptica Luis Trombetta en el torneo Máximo Navesi (render, croquis y configuraciones, extraídos del entregable en PDF). Originales en `material/` (fuera de `public/`, no se publican).
- Todavía usan fotos temporales de Unsplash: la sala (copia chica del hero) y el café (primer paso de Proceso).
- Imágenes de archivos abiertos, con crédito en el footer (`creditos` en `src/data/contenido.ts`): almacén de ramos generales, grabados de Sheraton y de la Encyclopédie, taller de carpintería, acequia y cordillera. Muestran el mundo del oficio, nunca se presentan como trabajos del estudio.
- No hay testimonios, prensa, clientes ni cifras: no se inventan.

## Product Principles

1. Lo existente primero: mostrar cómo se reaprovecha antes que lo nuevo que se compra.
2. Claridad para decidir: qué hacen, cómo, cuánto tarda y cómo empezar, sin vueltas.
3. Contactar tiene que ser fácil y estar a mano en toda la página.
4. Nada de prueba inventada.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, foco visible, navegación por teclado, texto alternativo, `prefers-reduced-motion`.
