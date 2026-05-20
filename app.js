/* ============================================
   RC INNOVATIONS — Premium Demo · app.js
   Stack: GSAP + ScrollTrigger + Lenis (vanilla)
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------
   LOADER
-------------------------------------------- */
const loader = document.getElementById('loader');
const loaderCount = document.getElementById('loaderCount');
const loaderFill = document.querySelector('.loader__fill');

let progress = 0;
const loaderTick = setInterval(() => {
  progress += Math.random() * 9 + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderTick);
    finishLoader();
  }
  loaderCount.textContent = Math.floor(progress);
  loaderFill.style.width = progress + '%';
}, 80);

function finishLoader() {
  const tl = gsap.timeline({ onComplete: initSite });
  tl.to('.loader__inner', { opacity: 0, duration: 0.4, delay: 0.2 })
    .to(loader, {
      yPercent: -100,
      duration: 1.1,
      ease: 'expo.inOut'
    });
}

/* --------------------------------------------
   LENIS — Smooth scroll
-------------------------------------------- */
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* --------------------------------------------
   CUSTOM CURSOR
-------------------------------------------- */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor) return;

  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'power2.out' });
  });
  gsap.ticker.add(() => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll('a, button, .magnetic, .cat-card, .prod').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}

/* --------------------------------------------
   NAV — scrolled state + smooth anchor
-------------------------------------------- */
function initNav() {
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top top-=80',
    end: 'max',
    onUpdate: (self) => {
      if (self.scroll() > 80) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
  });
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target && lenis) lenis.scrollTo(target, { offset: -20, duration: 1.2 });
    });
  });
}

/* --------------------------------------------
   HERO — entrance animation
-------------------------------------------- */
function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('.hero__corner', { opacity: 0, y: 10, stagger: 0.08, duration: 0.6 }, 0)
    .from('.hero__meta > *', { opacity: 0, y: 14, stagger: 0.1, duration: 0.7 }, 0.05)
    .to('.hero__title .word', {
      y: 0,
      duration: 1.1,
      stagger: 0.07,
    }, 0.2)
    .to('.hero__sub', { opacity: 1, y: 0, duration: 0.8 }, 0.7)
    .from('.hero__sub', { y: 20, duration: 0.8 }, 0.7)
    .to('.hero__actions', { opacity: 1, duration: 0.7 }, 0.85)
    .from('.hero__actions > *', { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.85)
    .from('.hero__scroll', { opacity: 0, y: 20, duration: 0.6 }, 1);

  // Parallax al hacer scroll
  gsap.to('.hero__video', {
    yPercent: 25,
    scale: 1.08,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to('.hero__content', {
    yPercent: -20,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* --------------------------------------------
   SPLIT TEXT REVEAL
-------------------------------------------- */
function initSplitReveals() {
  document.querySelectorAll('[data-split]').forEach((el) => {
    const text = el.textContent.trim();
    el.textContent = '';
    el.classList.add('is-split-ready');
    const inner = document.createElement('span');
    inner.textContent = text;
    inner.style.display = 'inline-block';
    inner.style.transform = 'translateY(110%)';
    el.appendChild(inner);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => gsap.to(inner, { y: 0, duration: 1.1, ease: 'expo.out' })
    });
  });

  // Quote split — letra a letra
  const quote = document.querySelector('[data-split-quote]');
  if (quote) {
    const words = quote.textContent.trim().split(' ');
    quote.innerHTML = words.map(w => `<span class="qw" style="display:inline-block; opacity:.18">${w}&nbsp;</span>`).join('');
    ScrollTrigger.create({
      trigger: quote,
      start: 'top 75%',
      end: 'top 30%',
      scrub: 0.6,
      onUpdate: (self) => {
        const total = quote.children.length;
        const idx = Math.floor(self.progress * total);
        Array.from(quote.children).forEach((w, i) => {
          w.style.opacity = i <= idx ? 1 : 0.18;
        });
      }
    });
  }
}

/* --------------------------------------------
   REVEAL ON SCROLL
-------------------------------------------- */
function initReveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });
  });
}

/* --------------------------------------------
   COUNTERS
-------------------------------------------- */
function initCounters() {
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'expo.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString('es-ES');
          }
        });
      }
    });
  });
}

/* --------------------------------------------
   ABOUT — parallax visuals
-------------------------------------------- */
function initAboutParallax() {
  gsap.to('.about__image--1', {
    yPercent: -10,
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to('.about__image--2', {
    yPercent: 14,
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to('.about__image--3', {
    yPercent: -22,
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.to('.about__circle', {
    rotate: 360,
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2
    }
  });
}

/* --------------------------------------------
   CATEGORY CARDS — bg image init + tilt
-------------------------------------------- */
function initCatCards() {
  document.querySelectorAll('.cat-card').forEach((card) => {
    const bg = getComputedStyle(card).getPropertyValue('--bg').trim();
    if (bg) {
      const before = card; // pseudo-elements get bg via inline style trick:
      // Use background-image directly on a real element rather than pseudo
      const layer = document.createElement('div');
      layer.style.position = 'absolute';
      layer.style.inset = '0';
      layer.style.backgroundImage = bg;
      layer.style.backgroundSize = 'cover';
      layer.style.backgroundPosition = 'center';
      layer.style.filter = 'brightness(.55) saturate(.9)';
      layer.style.transform = 'scale(1.08)';
      layer.style.transition = 'transform 1s cubic-bezier(.2,.8,.2,1), filter .6s ease';
      layer.style.zIndex = '0';
      card.insertBefore(layer, card.firstChild);
      card.addEventListener('mouseenter', () => {
        layer.style.transform = 'scale(1.16)';
        layer.style.filter = 'brightness(.75) saturate(1.1)';
      });
      card.addEventListener('mouseleave', () => {
        layer.style.transform = 'scale(1.08)';
        layer.style.filter = 'brightness(.55) saturate(.9)';
      });
    }
  });
}

/* --------------------------------------------
   HORIZONTAL SHOWCASE — pin + scroll + counter + progress
-------------------------------------------- */
function initHorizontalShowcase() {
  const track = document.getElementById('showcaseTrack');
  if (!track) return;
  if (window.innerWidth < 1024) return;

  const cards = gsap.utils.toArray('.prod', track);
  const totalCards = cards.length;
  const currentEl = document.getElementById('showcaseCurrent');
  const totalEl = document.getElementById('showcaseTotal');
  const progressFill = document.getElementById('showcaseProgress');
  if (totalEl) totalEl.textContent = String(totalCards).padStart(2, '0');

  const distance = () => track.scrollWidth - window.innerWidth;

  const st = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.showcase__pin',
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(totalCards - 1, Math.floor(self.progress * totalCards));
        if (currentEl) currentEl.textContent = String(idx + 1).padStart(2, '0');
        if (progressFill) progressFill.style.width = (self.progress * 100) + '%';
      }
    }
  });
}

/* --------------------------------------------
   PROCESS LINE
-------------------------------------------- */
function initProcessLine() {
  const fill = document.getElementById('processLine');
  if (!fill) return;
  gsap.to(fill, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.process',
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.6
    }
  });
}

/* --------------------------------------------
   MAGNETIC BUTTONS
-------------------------------------------- */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.4, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* --------------------------------------------
   BIG FOOTER WORD — slight parallax/skew on scroll
-------------------------------------------- */
function initFooterBig() {
  gsap.from('.footer__big', {
    yPercent: 30,
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true
    }
  });
}

/* --------------------------------------------
   INIT
-------------------------------------------- */
function initSite() {
  initLenis();
  initCursor();
  initNav();
  initHero();
  initSplitReveals();
  initReveals();
  initCounters();
  initAboutParallax();
  initCatCards();
  initHorizontalShowcase();
  initProcessLine();
  initMagnetic();
  initFooterBig();

  // recalcular tras carga de fonts/imgs
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
