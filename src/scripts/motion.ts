function reveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-img], [data-draw]');
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      if (!c.style.getPropertyValue('--i')) c.style.setProperty('--i', String(i));
    });
  });

  // Se abre todo lo que ya asomó por el borde inferior, también lo que un salto de scroll dejó atrás.
  // Con un umbral más alto, lo que está al final de la página podría no abrirse nunca.
  let pendientes = Array.from(targets);
  let ticking = false;
  const revisar = () => {
    ticking = false;
    const limite = window.innerHeight - 24;
    pendientes = pendientes.filter((el) => {
      if (el.getBoundingClientRect().top < limite) {
        el.classList.add('is-in');
        return false;
      }
      return true;
    });
    if (pendientes.length === 0) {
      window.removeEventListener('scroll', alScroll);
      window.removeEventListener('resize', alScroll);
    }
  };
  const alScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(revisar);
    }
  };
  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', alScroll);
  revisar();
}

// Índice de servicios: el nombre que se señala muestra su descripción en la columna libre.
function indice() {
  const root = document.querySelector<HTMLElement>('[data-indice]');
  const panel = root?.querySelector<HTMLElement>('[data-panel]');
  const nombre = panel?.querySelector<HTMLElement>('[data-panel-nombre]');
  const desc = panel?.querySelector<HTMLElement>('[data-panel-desc]');
  if (!root || !panel || !nombre || !desc) return;

  const items = Array.from(root.querySelectorAll<HTMLButtonElement>('.item'));
  let actual: HTMLButtonElement | null = null;
  let timer = 0;

  const mostrar = (item: HTMLButtonElement) => {
    if (item === actual) return;
    actual?.classList.remove('is-on');
    item.classList.add('is-on');
    actual = item;
    window.clearTimeout(timer);
    panel.classList.add('is-swapping');
    timer = window.setTimeout(() => {
      nombre.textContent = item.dataset.nombre ?? '';
      desc.textContent = item.dataset.desc ?? '';
      panel.classList.remove('is-swapping');
    }, 140);
  };

  items.forEach((item) => {
    item.addEventListener('pointerenter', () => mostrar(item));
    item.addEventListener('focus', () => mostrar(item));
    item.addEventListener('click', () => mostrar(item));
  });
  if (items[0]) {
    items[0].classList.add('is-on');
    actual = items[0];
  }
}

// Menú de celular: se cierra al elegir una sección o con Escape.
function menu() {
  const det = document.querySelector<HTMLDetailsElement>('details.menu');
  if (!det) return;
  det.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => det.removeAttribute('open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && det.open) {
      det.removeAttribute('open');
      det.querySelector('summary')?.focus();
    }
  });
}

// Barra fija: toma el tema del capítulo que tiene debajo de su borde inferior.
function barra() {
  const bar = document.querySelector<HTMLElement>('[data-barra]');
  if (!bar) return;
  const capitulos = Array.from(
    document.querySelectorAll<HTMLElement>('[data-tema]:not([data-barra]), [data-barra-tema]'),
  );
  let queued = false;
  const update = () => {
    queued = false;
    const y = bar.offsetHeight;
    const actual = capitulos.find((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= y && r.bottom > y;
    });
    const tema = actual?.dataset.barraTema ?? actual?.dataset.tema ?? 'papel';
    if (bar.dataset.tema !== tema) bar.dataset.tema = tema;
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();
}

// Frase que se entinta: cada palabra en su span, el CSS la tiñe según su posición.
function entintar() {
  if (!CSS.supports('animation-timeline: view()') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-fill]').forEach((el) => {
    const words = (el.textContent ?? '').trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const s = document.createElement('span');
      s.textContent = word;
      el.append(s, i < words.length - 1 ? ' ' : '');
    });
    el.classList.add('is-filling');
  });
}

// Galería de proyectos: en pantallas anchas la escena se fija y el scroll vertical corre la fila 1:1.
function galeria() {
  const root = document.querySelector<HTMLElement>('[data-galeria]');
  const track = root?.querySelector<HTMLElement>('.pista');
  if (!root || !track) return;
  const wide = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
  let dx = 0;
  let queued = false;

  const place = () => {
    queued = false;
    if (!root.classList.contains('is-pinned')) return;
    // La escena se fija debajo de la barra, así que el recorrido empieza cuando la sección llega ahí.
    const bar = document.querySelector<HTMLElement>('[data-barra]')?.offsetHeight ?? 0;
    const p = Math.min(1, Math.max(0, (bar - root.getBoundingClientRect().top) / dx));
    track.style.transform = `translate3d(${(-p * dx).toFixed(1)}px, 0, 0)`;
  };
  const measure = () => {
    root.classList.add('is-pinned');
    track.style.transform = '';
    dx = track.scrollWidth - track.clientWidth;
    const pin = wide.matches && dx > 0 && dx < innerHeight * 3.5;
    root.classList.toggle('is-pinned', pin);
    track.tabIndex = pin ? -1 : 0;
    root.style.height = pin ? `${innerHeight + dx}px` : '';
    place();
  };

  addEventListener('scroll', () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(place);
    }
  }, { passive: true });
  addEventListener('resize', measure);
  addEventListener('load', measure);
  wide.addEventListener('change', measure);
  measure();
}

// Proceso: el paso que cruza el centro de la pantalla se enciende y cambia la foto sostenida.
function pasos() {
  const root = document.querySelector<HTMLElement>('[data-pasos]');
  if (!root) return;
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-paso]'));
  const fotos = Array.from(root.querySelectorAll<HTMLElement>('[data-foto-paso]'));
  const cuenta = root.querySelector<HTMLElement>('[data-cuenta]');
  const show = (i: number) => {
    items.forEach((el, k) => el.classList.toggle('is-active', k === i));
    fotos.forEach((el, k) => el.classList.toggle('is-on', k === i));
    if (cuenta) cuenta.textContent = `Paso ${i + 1} de ${items.length}`;
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) show(items.indexOf(e.target as HTMLElement));
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  items.forEach((el) => io.observe(el));
  show(0);
}

entintar();
reveal();
indice();
menu();
barra();
galeria();
pasos();
