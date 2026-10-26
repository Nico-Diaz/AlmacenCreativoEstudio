import { useId, useState, type FormEvent } from 'react';
import './Pedido.css';

type Props = { email: string; whatsapp: string; piezas: string[]; destinos: string[] };

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

export default function Pedido({ email, whatsapp, piezas, destinos }: Props) {
  const [espacio, setEspacio] = useState<string | null>(null);
  const [necesidades, setNecesidades] = useState<string[]>([]);
  const [inventario, setInventario] = useState<Record<string, string>>({});
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const id = useId();

  const marcar = (pieza: string, destino: string) =>
    setInventario((inv) => {
      const sig = { ...inv };
      if (sig[pieza] === destino) delete sig[pieza];
      else sig[pieza] = destino;
      return sig;
    });

  const porDestino = destinos
    .map((d) => ({ destino: d, piezas: piezas.filter((p) => inventario[p] === d) }))
    .filter((g) => g.piezas.length > 0);

  const renglones = [
    espacio && `Espacio: ${espacio}`,
    ...necesidades.map((n) => `Necesito: ${n}`),
    ...porDestino.map((g) => `${g.destino}: ${g.piezas.join(', ')}`),
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

  const marcadas = Object.keys(inventario).length;
  const resumen = [
    espacio,
    ...necesidades,
    marcadas > 0 && `${marcadas} ${marcadas === 1 ? 'pieza' : 'piezas'} en el inventario`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <form className="pedido" onSubmit={enviar} aria-labelledby="contacto-t">
      <div className="pedido__intro">
        <h2 id="contacto-t">Armá tu pedido</h2>
        <p>
          Contanos qué espacio es, qué necesitás y qué querés hacer con lo que ya tenés. Lo mandás por email o
          WhatsApp y te respondemos en dos días hábiles.
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

        <fieldset className="inventario">
          <legend>Tu inventario</legend>
          <p className="inventario__ayuda">Marcá qué hacemos con cada cosa que ya tenés. Podés dejar filas sin marcar.</p>
          <ul>
            {piezas.map((p) => (
              <li key={p} className="pieza">
                <span className="pieza__nombre" id={`${id}-${p}`}>
                  {p}
                </span>
                <div className="pieza__destinos" role="group" aria-labelledby={`${id}-${p}`}>
                  {destinos.map((d) => (
                    <button
                      type="button"
                      key={d}
                      className="destino"
                      aria-pressed={inventario[p] === d}
                      onClick={() => marcar(p, d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
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
