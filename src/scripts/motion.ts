function reveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-img]');
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

reveal();
indice();
menu();
