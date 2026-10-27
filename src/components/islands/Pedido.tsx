import { useId, useState, type FormEvent } from 'react';
import './Pedido.css';

type Props = { email: string; whatsapp: string };

const ESPACIOS = [
  'Casa o departamento',
  'Local u oficina',
  'Propiedad en venta o alquiler',
  'Evento',
];
// Círculo de marcador que encierra la opción elegida.
function Circulo() {
  return (
    <svg className="chip__circulo" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength={1} d="M34 9 C92 1 168 4 191 25 C201 45 152 58 92 56 C32 54 4 45 8 27 C12 13 44 6 76 5" />
    </svg>
  );
}

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

  const resumen = [espacio, ...necesidades].filter(Boolean).join(', ');

  return (
    <form className="pedido" onSubmit={enviar} aria-labelledby="contacto-t">
      <div className="pedido__intro">
        <h2 id="contacto-t">Armá tu pedido</h2>
        <p className="pedido__mano">marcá lo que va</p>
        <p>
          Contanos qué espacio es y qué necesitás. Lo mandás por email o WhatsApp y te respondemos en dos días
          hábiles.
        </p>
      </div>

      <div className="pedido__campos">
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
                <span>{e}</span>
                <Circulo />
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
                <span>{n}</span>
                <Circulo />
              </button>
            ))}
          </div>
        </fieldset>

        <div className="pedido__datos">
          <label htmlFor={`${id}-nombre`}>Tu nombre</label>
          <input
            id={`${id}-nombre`}
            className="campo"
            type="text"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor={`${id}-nota`}>¿Qué te gustaría cambiar?</label>
          <input
            id={`${id}-nota`}
            className="campo"
            type="text"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </div>

        <p className="pedido__resumen" aria-live="polite">
          {resumen ? `Tu pedido: ${resumen}.` : 'Tu pedido todavía está vacío. Podés mandarlo igual.'}
        </p>

        <div className="pedido__envio">
          <button type="submit" className="btn">
            Enviar por email
          </button>
          <a className="btn btn--claro" href={wa} target="_blank" rel="noopener noreferrer">
            Enviar por WhatsApp
          </a>
        </div>
      </div>
    </form>
  );
}
