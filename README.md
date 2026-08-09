# Sitio web IPLA

Sitio estático (HTML, CSS y JavaScript puro, sin frameworks) para publicar
noticias, artículos (propios o enlazados a sitios externos) y videos de
YouTube, con la identidad visual del logo de IPLA.

## Estructura de archivos

```
ipla-site/
├── index.html      ← estructura de la página (normalmente no se toca)
├── styles.css       ← colores, tipografía y estilos
├── app.js            ← lógica de navegación (normalmente no se toca)
├── content.js       ← AQUÍ SE EDITA EL CONTENIDO (noticias, artículos, videos)
└── images/
    ├── logo-gold.jpeg
    └── logo-red.jpeg
```

## Cómo publicar contenido nuevo

Abre **content.js** con cualquier editor de texto (Bloc de notas, VS Code,
etc.) y sigue el patrón de los ejemplos que ya están ahí:

- **Noticias**: agrega un objeto nuevo dentro de `noticias: [ ... ]`.
- **Artículos propios**: usa `tipo: "interno"` y escribe el texto en `contenido`.
- **Artículos de otras páginas**: usa `tipo: "externo"` y coloca el enlace en `url`.
- **Videos de YouTube**: copia solo el ID del video (lo que va después de
  `youtu.be/` o `v=` en la URL) en `youtubeId`.

  > Para que un video se vea "editado y preparado solo para esta página",
  > súbelo a YouTube como **oculto** o **no listado** (no público). Así solo
  > quien lo vea incrustado en tu web podrá reproducirlo; no aparecerá en
  > búsquedas ni en tu canal.

No hace falta tocar el HTML ni el CSS para publicar contenido nuevo.

## Cómo ver el sitio en tu computadora antes de publicar

No necesitas instalar nada complicado. Dos opciones:

1. Doble clic en `index.html` (funciona, pero algunos navegadores bloquean
   la carga de `content.js` por seguridad de archivos locales).
2. Recomendado: si tienes Python instalado, abre una terminal en esta
   carpeta y ejecuta:
   ```
   python -m http.server 8000
   ```
   Luego abre `http://localhost:8000` en tu navegador.

## Cómo publicar gratis en Vercel

Vercel es efectivamente una buena opción: tiene un plan gratuito (Hobby),
detecta sitios estáticos automáticamente (no necesitas configurar nada) y
te da un dominio `.vercel.app` con HTTPS incluido.

### Opción A — Arrastrar y soltar (la más rápida, sin GitHub)

1. Ve a https://vercel.com y crea una cuenta gratuita (puedes usar Google,
   GitHub o email).
2. En el panel principal, haz clic en **Add New… → Project**.
3. Busca la opción de subir una carpeta directamente ("Deploy" con
   arrastrar y soltar / *drag and drop*) y arrastra la carpeta `ipla-site`
   completa (o un .zip de ella).
4. Vercel detecta que es un sitio estático y lo publica en segundos.
5. Te entrega una URL tipo `ipla-site.vercel.app`. Puedes conectar tu
   propio dominio después desde **Settings → Domains**.

### Opción B — Conectado a GitHub (recomendado a mediano plazo)

Esta opción es mejor porque cada vez que edites `content.js` y subas el
cambio a GitHub, Vercel vuelve a publicar el sitio automáticamente.

1. Crea una cuenta gratuita en https://github.com si no tienes una.
2. Crea un repositorio nuevo (por ejemplo `ipla-web`) y sube todos los
   archivos de esta carpeta (`index.html`, `styles.css`, `app.js`,
   `content.js`, la carpeta `images/`).
3. Entra a https://vercel.com, inicia sesión con tu cuenta de GitHub.
4. **Add New… → Project → Import** y selecciona el repositorio `ipla-web`.
5. Vercel detecta automáticamente que es un sitio estático (Framework:
   "Other"). No cambies ninguna configuración de build. Haz clic en **Deploy**.
6. Listo. Cada vez que subas cambios a GitHub, Vercel republica el sitio
   solo, sin que tengas que volver a subir nada manualmente.

## Personalización rápida

- **Colores**: todos están definidos como variables al inicio de
  `styles.css`, dentro de `:root { ... }` (`--gold`, `--wine`, `--black`,
  etc.). Cambiar un valor ahí actualiza todo el sitio.
- **Textos del encabezado / pie de página**: se editan directamente en
  `index.html`.
- **Página "Acerca"**: su texto vive en la función `viewAcerca()` dentro
  de `app.js`.
