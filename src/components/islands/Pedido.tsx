import { useId, useState, type FormEvent } from 'react';
import './Pedido.css';

type Props = { email: string; whatsapp: string };

const ESPACIOS = [
  'Casa o departamento',
  'Local u oficina',
  'Propiedad en venta o alquiler',
  'Evento',
];
const NECESIDADES = [
  'Diseño de interiores',
  'Diseño inmobiliario',
  'Ambientación de eventos',
  'Diseño de vidrieras',
  'Renderizado',
  'Asesoramiento',
];

function alternar(lista: string[], valor: string) {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
}

export default function Pedido({ email, whatsapp }: Props) {
  const [espacio, setEspacio] = useState<string | null>(null);
  const [necesidades, setNecesidades] = useState<string[]>([]);
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const id = useId();

  const renglones = [
    espacio && `Espacio: ${espacio}`,
    ...necesidades.map((n) => `Necesito: ${n}`),
    nota.trim() && `Nota: ${nota.trim()}`,
  ].filter(Boolean) as string[];

  const cuerpo = ['Hola, Almacen Creativo.', '', ...renglones, '', nombre.trim() ? `Soy ${nombre.trim()}.` : '']
    .join('\n')
    .trim();

  const asunto = `Pedido${espacio ? ` · ${espacio}` : ''}${nombre.trim() ? ` · ${nombre.trim()}` : ''}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(cuerpo)}`;

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = mailto;
  };

  const resumen = [espacio, ...necesidades].filter(Boolean).join(' · ');

  return (
    <form className="cupon" onSubmit={enviar} aria-labelledby={`${id}-t`}>
      <div className="cupon__izq">
        <h2 id={`${id}-t`}>
          Recortá y mandanos
          <br />
          tu pedido
        </h2>
        <p>
          Elegí qué espacio es y qué necesitás. Te respondemos en dos días hábiles para coordinar una visita.
        </p>
      </div>

      <div className="cupon__der">
        <fieldset>
          <legend>¿Qué espacio?</legend>
          <div className="chips">
            {ESPACIOS.map((e) => (
              <button
                type="button"
                key={e}
                className="chip"
                aria-pressed={espacio === e}
                onClick={() => setEspacio(espacio === e ? null : e)}
              >
                {e}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>¿Qué necesitás?</legend>
          <div className="chips">
            {NECESIDADES.map((n) => (
              <button
                type="button"
                key={n}
                className="chip"
                aria-pressed={necesidades.includes(n)}
                onClick={() => setNecesidades(alternar(necesidades, n))}
              >
                {n}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="sr-only" htmlFor={`${id}-nombre`}>
          Tu nombre
        </label>
        <input
          id={`${id}-nombre`}
          className="campo"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label className="sr-only" htmlFor={`${id}-nota`}>
          Contanos en una línea
        </label>
        <input
          id={`${id}-nota`}
          className="campo"
          type="text"
          placeholder="¿Qué te gustaría cambiar?"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />

        <p className="cupon__resumen" aria-live="polite">
          {resumen ? `Tu pedido: ${resumen}` : 'Tu pedido todavía está vacío.'}
        </p>

        <button type="submit" className="enviar">
          Enviar por email
        </button>
        <a className="enviar enviar--wa" href={wa} target="_blank" rel="noopener noreferrer">
          Enviar por WhatsApp
        </a>
      </div>
    </form>
  );
}
