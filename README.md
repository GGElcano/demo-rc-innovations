# Demo · RC Innovations

Demo de propuesta web para **RC Innovations / Unmanned Technology S.L.** — distribuidor profesional de drones y UAV en Barakaldo (Bizkaia).

Sustituto premium de su web actual (Odoo) con estética corporativa, scroll dinámico y animaciones tipo Awwwards.

## Stack

- **HTML + CSS + JS vanilla** (sin build step, sin `npm install`)
- [GSAP 3.12](https://greensock.com/gsap/) + ScrollTrigger — animaciones declarativas
- [Lenis 1.1](https://github.com/darkroomengineering/lenis) — smooth scroll
- Tipografías: Space Grotesk + Inter + JetBrains Mono (Google Fonts)
- Imágenes: Unsplash (URLs públicas, sin descarga local)

Todos los assets externos vienen de CDN oficiales (cdnjs, unpkg, fonts.googleapis.com, images.unsplash.com). Cero superficie de malware.

## Lo que tiene

- Loader con contador 0→100 %
- Cursor custom con `mix-blend-mode`
- Hero con grid técnico, coordenadas GPS y reveal palabra a palabra
- Marquee infinito de marcas distribuidas
- Contadores animados al entrar en viewport
- Sticky parallax en "Quiénes somos"
- Grid bento de 7 categorías con zoom-on-hover
- **Horizontal scroll** con pin para showcase de plataformas
- Timeline animada del proceso "We Build Your Drone"
- Wall de 12 marcas oficiales
- Quote del cliente con reveal por palabras
- CTA con halo radial y footer con palabra gigante en parallax

## Cómo se ve

```bash
# Levantar servidor local
python3 -m http.server 8782

# Abrir en navegador
xdg-open http://localhost:8782/
```

## Deploy (próximos pasos)

- [ ] Cloudflare Pages — `gg-demo-rc.pages.dev`
- [ ] Dominio custom temporal para enseñar a RC Innovations

## Estructura

```
.
├── index.html      Markup semántico + secciones
├── styles.css      Estilos (variables CSS, sin frameworks)
├── app.js          GSAP + Lenis + interacciones
└── README.md       Este archivo
```

## Cliente

| Campo | Valor |
|---|---|
| Razón social | Unmanned Technology S.L. |
| CIF | ESB95789889 |
| Dirección | Susunaga, 17 · 48903 Barakaldo · Bizkaia |
| Teléfono | +34 946 022 490 |
| Email | info@rc-innovations.es |
| Web actual | https://rc-innovations.es/ (Odoo) |
| Sector | Drones profesionales · UAV · FPV |

---

© 2026 G&G Elcano. Demo comercial — no publicar sin autorización del cliente.
