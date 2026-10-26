import type { ImageMetadata } from 'astro';
import altierPared from '../assets/fotos/altier-pared.jpg';
import altierRuleta from '../assets/fotos/altier-ruleta.jpg';
import altierMarca from '../assets/fotos/altier-marca.jpg';
import trombettaStand from '../assets/fotos/trombetta-stand.jpg';
import trombettaCroquis from '../assets/fotos/trombetta-croquis.jpg';
import trombettaConfig from '../assets/fotos/trombetta-configuraciones.jpg';

export const contacto = {
  email: 'almacencreativo.dis@gmail.com',
  telefonos: ['+54 9 261 604-6734', '+54 9 264 530-1413'],
  whatsapp: '5492616046734',
  ciudad: 'Mendoza',
  horario: 'Lunes a viernes, de 10 a 18 h',
  // Usuarios de muestra: reemplazar por las cuentas reales.
  redes: [
    { nombre: 'Instagram', url: 'https://instagram.com/almacencreativo' },
    { nombre: 'Pinterest', url: 'https://pinterest.com/almacencreativo' },
  ],
};

export const nav = [
  { label: 'Nosotras', href: '#nosotras' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Preguntas', href: '#preguntas' },
];

export const datos = [
  { label: 'Desde', valor: '2025' },
  { label: 'Estudio', valor: 'Mendoza' },
  { label: 'Equipo', valor: 'Tres diseñadoras' },
  { label: 'Respuesta', valor: 'Dos días hábiles' },
];

export const teDamos = [
  { nombre: 'Presupuesto claro', nota: 'antes de empezar' },
  { nombre: 'Renders', nota: 'antes de comprar' },
  { nombre: 'Planos', nota: 'listos para obra' },
  { nombre: 'Seguimiento', nota: 'por WhatsApp' },
  { nombre: 'Proveedores', nota: 'de Mendoza' },
  { nombre: 'Entrega', nota: 'con planos y fotos' },
];

export const herramientas = [
  { nombre: 'SketchUp', nota: 'modelado 3D' },
  { nombre: 'AutoCAD', nota: 'planos técnicos' },
  { nombre: 'Enscape, Lumion y V-Ray', nota: 'renders' },
  { nombre: 'Photoshop', nota: 'postproducción' },
  { nombre: 'Canva', nota: 'presentaciones' },
];

export type Servicio = { nombre: string; detalle: string };

export const servicios: Servicio[] = [
  {
    nombre: 'Diseño de interiores',
    detalle:
      'Proyectamos casas, departamentos y locales, completos o por ambientes: distribución, materiales, iluminación y mobiliario, partiendo de lo que ya tenés.',
  },
  {
    nombre: 'Diseño inmobiliario',
    detalle:
      'Preparamos propiedades para vender o alquilar. Ponemos en valor cada ambiente para que se vea en su mejor versión en las fotos y en las visitas.',
  },
  {
    nombre: 'Ambientación de eventos',
    detalle:
      'Diseñamos el espacio de casamientos, lanzamientos y encuentros corporativos: mobiliario, luz, textiles y recorrido, con piezas que después se reutilizan.',
  },
  {
    nombre: 'Diseño de vidrieras',
    detalle:
      'Armamos vidrieras de temporada que cuentan qué vendés y hacen frenar a quien pasa por la vereda, con elementos que se guardan para la próxima.',
  },
  {
    nombre: 'Renderizado',
    detalle:
      'Imágenes 3D realistas del espacio antes de construir, para elegir materiales y colores con seguridad y mostrar el proyecto a quien haga falta.',
  },
  {
    nombre: 'Asesoramiento',
    detalle:
      'Una visita o una consulta online para resolver dudas puntuales: colores, distribución, qué conservar y dónde comprar.',
  },
];

export type Foto = { src: ImageMetadata; alt: string; contain?: boolean };

export type Proyecto = {
  titulo: string;
  detalle: string;
  resumen: string;
  fotos: Foto[];
};

export const proyectos: Proyecto[] = [
  {
    titulo: 'Altiér beauty',
    detalle: 'Stand de marca en feria',
    resumen:
      'Pared de exhibición con la marca, podios espejados y una ruleta de premios para que la gente se acerque y participe.',
    fotos: [
      { src: altierPared, alt: 'Stand de Altiér beauty: pared blanca con estantes de productos y podios espejados' },
      { src: altierRuleta, alt: 'Visitante frente a la ruleta de premios de Altiér beauty' },
      { src: altierMarca, alt: 'Cartel de Altiér sobre cortinado negro y sillón capitoné' },
    ],
  },
  {
    titulo: 'Stand Trombetta',
    detalle: 'Óptica Luis Trombetta',
    resumen:
      'Para el torneo Máximo Navesi: stand modular de siete módulos configurables para ferias y conferencias, en caño, chapa pintada al horno, MDF y acrílico.',
    fotos: [
      { src: trombettaStand, alt: 'Render del stand rojo y blanco de Óptica Trombetta bajo una carpa negra en el torneo Máximo Navesi' },
      { src: trombettaCroquis, alt: 'Croquis del stand con sus materiales: acrílico, MDF, chapa, aglomerado y caño estructural', contain: true },
      { src: trombettaConfig, alt: 'Tres configuraciones del stand modular para ferias', contain: true },
    ],
  },
];

export const pasos = [
  {
    linea: 'Nos conocemos.',
    detalle: 'Visitamos el espacio, escuchamos qué necesitás y anotamos qué se queda, qué se restaura y qué se va.',
  },
  {
    linea: 'Diseñamos.',
    detalle: 'Te presentamos la propuesta con planos, materiales y renders, y la ajustamos con vos hasta que cierre.',
  },
  {
    linea: 'Proyectamos la ejecución.',
    detalle: 'Armamos la documentación, el presupuesto por etapas y el cronograma con cada oficio.',
  },
  {
    linea: 'Supervisamos la obra.',
    detalle: 'Dirigimos los trabajos y coordinamos compras y armado hasta entregarte el espacio terminado.',
  },
];

// Piezas para el inventario del pedido: el cliente marca qué hace con cada una.
export const piezas = ['Sillones', 'Mesas', 'Sillas', 'Estanterías', 'Lámparas', 'Cortinas y textiles'];
export const destinos = ['Se queda', 'Restaurar', 'Se va'];

// Imágenes de archivos abiertos: muestran el mundo del oficio, no trabajos del estudio.
export const creditos = [
  {
    titulo: 'Almacén de ramos generales',
    autor: 'Museo y Archivo Histórico Municipal Don Santos Tosticarelli',
    licencia: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:MAHM_-_Sector_%22Trabajos_y_costumbres%22_-_Almac%C3%A9n_de_Ramos_Generales.tif',
  },
  {
    titulo: 'Plan and Section of a Drawing Room (1793)',
    autor: 'Thomas Sheraton, The Met',
    licencia: 'CC0',
    url: 'https://www.metmuseum.org/art/collection/search/357159',
  },
  {
    titulo: 'Layetier, lámina de la Encyclopédie',
    autor: 'Wellcome Collection',
    licencia: 'CC BY 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Joinery;_a_box-making_workshop,_with_men_at_work_(top),_tool_Wellcome_V0023897.jpg',
  },
  {
    titulo: 'Taller de carpintería, Stará Ľubovňa',
    autor: 'Georges Jansoone',
    licencia: 'CC BY 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Spisska_Lubovna_045.jpg',
  },
  {
    titulo: 'Acequias en Mendoza',
    autor: 'Veronica Johansen',
    licencia: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Acequias_en_Mendoza_-_panoramio.jpg',
  },
  {
    titulo: 'Cordillera de los Andes, Mendoza',
    autor: 'María Belén Sica',
    licencia: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Cordillera_de_los_Andes,_Mendoza.JPG',
  },
];

export const preguntas = [
  {
    q: '¿Trabajan solo en Mendoza?',
    a: 'Hacemos obra en Mendoza. El asesoramiento, el renderizado y los proyectos sin obra los hacemos a distancia, en todo el país.',
  },
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Depende del tamaño y de cuánto se reutiliza. Después de la primera visita te pasamos un presupuesto por etapas, así podés avanzar de a una.',
  },
  {
    q: '¿Tengo que deshacerme de mis muebles?',
    a: 'No. Empezamos por un inventario de lo que tenés y decidimos juntos qué se restaura, qué se transforma y qué se va.',
  },
  {
    q: '¿Hacen la obra o solo el diseño?',
    a: 'Las dos cosas. Proyectamos la ejecución y supervisamos la obra con nuestros oficios, o te entregamos la documentación para que la haga tu equipo.',
  },
  {
    q: '¿Trabajan en locales que siguen abiertos?',
    a: 'Sí. Planificamos la obra por sectores y horarios para que el local cierre lo menos posible.',
  },
  {
    q: '¿Cómo empezamos?',
    a: 'Armá tu pedido acá abajo y mandalo por email o WhatsApp. Te respondemos en dos días hábiles para coordinar una visita.',
  },
];
