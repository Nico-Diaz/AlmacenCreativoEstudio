function reveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-img]');
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      if (!c.style.getPropertyValue('--i')) c.style.setProperty('--i', String(i));
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  targets.forEach((el) => io.observe(el));
}

function obras() {
  const root = document.querySelector<HTMLElement>('[data-obras]');
  if (!root) return;
  const filas = Array.from(root.querySelectorAll<HTMLElement>('[data-fila]'));
  const fotos = Array.from(root.querySelectorAll<HTMLElement>('[data-foto]'));
  const rescate = root.querySelector<HTMLElement>('[data-rescate]');
  const n = fotos.length;
  let actual = -1;
  let proyectoActual = -1;

  const mostrar = (idx: number) => {
    if (idx === actual) return;
    actual = idx;
    fotos.forEach((f, i) => {
      f.classList.toggle('is-on', i === idx);
      f.classList.toggle('is-past', i < idx);
    });
    const p = Number(fotos[idx].dataset.proyecto ?? 0);
    if (p === proyectoActual) return;
    proyectoActual = p;
    filas.forEach((f, i) => f.classList.toggle('is-on', i === p));
    if (rescate) rescate.textContent = filas[p].dataset.rescateTexto ?? '';
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const r = root.getBoundingClientRect();
    const vh = window.innerHeight;
    const t = Math.max(0, Math.min(0.999, -r.top / Math.max(1, r.height - vh)));
    const idx = Math.floor(t * n);
    mostrar(idx);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

reveal();
obras();
