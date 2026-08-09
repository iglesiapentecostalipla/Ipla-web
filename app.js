/* =========================================================================
   IPLA — LÓGICA DE LA APLICACIÓN
   No es necesario editar este archivo para publicar contenido.
   Para publicar, edita content.js
   ========================================================================= */

const app = document.getElementById("app");
const mainNav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- helpers ---------- */
function fmtDate(iso){
  try{
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-ES", { day:"numeric", month:"long", year:"numeric" });
  }catch(e){ return iso; }
}
function byDateDesc(a,b){ return new Date(b.fecha) - new Date(a.fecha); }
function escapeHtml(str){
  return (str || "").replace(/[&<>"']/g, s => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[s]));
}
function paragraphs(text){
  return (text || "").split(/\n\s*\n/).map(p => `<p>${escapeHtml(p)}</p>`).join("");
}

/* ---------- routing ---------- */
function currentRoute(){
  const hash = window.location.hash.replace("#/", "").replace("#", "");
  if(!hash) return { view:"inicio" };
  const parts = hash.split("/");
  return { view: parts[0] || "inicio", id: parts[1] || null };
}

function navigateTo(view, id){
  window.location.hash = id ? `/${view}/${id}` : `/${view}`;
}

window.addEventListener("hashchange", render);
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-view]");
  if(link){
    e.preventDefault();
    navigateTo(link.getAttribute("data-view"));
    mainNav.classList.remove("is-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", open);
});

/* ---------- view templates ---------- */
function viewInicio(){
  const noticias = [...SITE_CONTENT.noticias].sort(byDateDesc);
  const destacada = noticias.find(n => n.destacado) || noticias[0];
  const resto = noticias.filter(n => n.id !== destacada?.id).slice(0,4);
  const articulos = [...SITE_CONTENT.articulos].sort(byDateDesc).slice(0,3);
  const videos = [...SITE_CONTENT.videos].sort(byDateDesc).slice(0,2);

  return `
  <section class="hero">
    <div class="hero-inner">
      <div>
        <span class="hero-eyebrow">Iglesia Pentecostal Lámpara Es A Mis Pies Tú Palabra</span>
        <h1>Predicación, revelación, enseñanza, noticias y <em>testimonio</em> a la luz de las Escrituras</h1>
        <p class="lead">Un espacio digital para exaltar a Dios y conocer lo que está haciendo en nuestra congregación: Mensajes en video, artículos, noticias todo en un mismo lugar.</p>
        <div class="hero-actions">
          <a href="#" data-view="noticias" class="btn btn-gold">Ver noticias</a>
          <a href="#" data-view="videos" class="btn btn-outline">Ver videos</a>
        </div>
      </div>
      <div class="hero-lamp">
        <img src="images/logo-red.jpeg" alt="Logo IPLA">
      </div>
    </div>
  </section>

  <div class="lamp-divider"><span class="dot"></span></div>

  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div><span class="eyebrow">Actualidad</span><h2>Últimas noticias</h2></div>
        <a href="#" data-view="noticias" class="see-all">Ver todas</a>
      </div>
      ${destacada ? `
      <div class="featured-news">
        <article class="featured-card is-clickable" data-view="noticias" data-id="${destacada.id}">
          <span class="tag">${escapeHtml(destacada.categoria)}</span>
          <h3>${escapeHtml(destacada.titulo)}</h3>
          <p>${escapeHtml(destacada.resumen)}</p>
          <span class="date">${fmtDate(destacada.fecha)}</span>
        </article>
        <div class="news-list">
          ${resto.map(n => `
            <div class="news-row is-clickable" data-view="noticias" data-id="${n.id}">
              <span class="date-badge">${fmtDate(n.fecha)}</span>
              <div class="body">
                <h4>${escapeHtml(n.titulo)}</h4>
                <p>${escapeHtml(n.resumen)}</p>
              </div>
            </div>`).join("")}
        </div>
      </div>` : `<div class="empty-state">Aún no hay noticias publicadas. Edita content.js para añadir la primera.</div>`}
    </div>
  </section>

  <div class="lamp-divider"><span class="dot"></span></div>

  <section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div><span class="eyebrow">Reflexión escrita</span><h2>Artículos</h2></div>
        <a href="#" data-view="articulos" class="see-all">Ver todos</a>
      </div>
      <div class="card-grid">
        ${articulos.map(cardArticulo).join("") || `<div class="empty-state">Aún no hay artículos publicados.</div>`}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div><span class="eyebrow">Mensajes</span><h2>Videos recientes</h2></div>
        <a href="#" data-view="videos" class="see-all">Ver todos</a>
      </div>
      <div class="video-grid">
        ${videos.map(cardVideo).join("") || `<div class="empty-state">Aún no hay videos publicados.</div>`}
      </div>
    </div>
  </section>
  `;
}

function viewNoticiasList(){
  const noticias = [...SITE_CONTENT.noticias].sort(byDateDesc);
  return `
  <section class="section">
    <div class="section-inner">
      <div class="section-head"><div><span class="eyebrow">Iglesia</span><h2>Noticias</h2></div></div>
      <div class="card-grid">
        ${noticias.map(n => `
          <article class="card is-clickable" data-view="noticias" data-id="${n.id}">
            <span class="cat">${escapeHtml(n.categoria)}</span>
            <h3>${escapeHtml(n.titulo)}</h3>
            <p>${escapeHtml(n.resumen)}</p>
            <div class="meta"><span>${fmtDate(n.fecha)}</span><span>Leer más →</span></div>
          </article>`).join("") || `<div class="empty-state">Aún no hay noticias.</div>`}
      </div>
    </div>
  </section>`;
}

function viewNoticiaDetail(id){
  const n = SITE_CONTENT.noticias.find(x => x.id === id);
  if(!n) return notFound("noticias");
  return `
  <div class="detail-wrap">
    <a href="#" data-view="noticias" class="detail-back">← Volver a noticias</a>
    <span class="eyebrow">${escapeHtml(n.categoria)}</span>
    <h1>${escapeHtml(n.titulo)}</h1>
    <div class="detail-meta"><span>${fmtDate(n.fecha)}</span></div>
    ${n.imagen ? `<img src="${n.imagen}" alt="" style="border-radius:4px;margin-bottom:28px;">` : ""}
    <div class="detail-body">${paragraphs(n.contenido)}</div>
  </div>`;
}

function cardArticulo(a){
  const isExterno = a.tipo === "externo";
  return `
    <article class="card is-clickable" ${isExterno ? "" : `data-view="articulos" data-id="${a.id}"`}>
      <span class="cat">${isExterno ? "Enlace externo" : "Artículo"}</span>
      <h3>${escapeHtml(a.titulo)}</h3>
      <p>${escapeHtml(a.resumen)}</p>
      <div class="meta">
        <span>${fmtDate(a.fecha)}${a.autor ? " · " + escapeHtml(a.autor) : ""}</span>
        ${isExterno
          ? `<a class="link-out" href="${a.url}" target="_blank" rel="noopener">Ver original ↗</a>`
          : `<span class="link-out" onclick="navigateTo('articulos','${a.id}')">Leer más →</span>`}
      </div>
    </article>`;
}

function viewArticulosList(){
  const articulos = [...SITE_CONTENT.articulos].sort(byDateDesc);
  return `
  <section class="section">
    <div class="section-inner">
      <div class="section-head"><div><span class="eyebrow">Reflexión escrita</span><h2>Artículos</h2></div></div>
      <div class="card-grid">
        ${articulos.map(cardArticulo).join("") || `<div class="empty-state">Aún no hay artículos.</div>`}
      </div>
    </div>
  </section>`;
}

function viewArticuloDetail(id){
  const a = SITE_CONTENT.articulos.find(x => x.id === id);
  if(!a) return notFound("articulos");
  if(a.tipo === "externo"){
    return `
    <div class="detail-wrap">
      <a href="#" data-view="articulos" class="detail-back">← Volver a artículos</a>
      <span class="eyebrow">Enlace externo</span>
      <h1>${escapeHtml(a.titulo)}</h1>
      <div class="detail-meta"><span>${fmtDate(a.fecha)}</span>${a.autor ? `<span>${escapeHtml(a.autor)}</span>`:""}</div>
      <div class="detail-body"><p>${escapeHtml(a.resumen)}</p></div>
      <div class="external-box">
        Este artículo fue publicado originalmente en ${escapeHtml(a.fuenteNombre || "un sitio externo")}.
        <br><a class="btn btn-gold" href="${a.url}" target="_blank" rel="noopener">Leer artículo completo ↗</a>
      </div>
    </div>`;
  }
  return `
  <div class="detail-wrap">
    <a href="#" data-view="articulos" class="detail-back">← Volver a artículos</a>
    <span class="eyebrow">Artículo</span>
    <h1>${escapeHtml(a.titulo)}</h1>
    <div class="detail-meta"><span>${fmtDate(a.fecha)}</span>${a.autor ? `<span>${escapeHtml(a.autor)}</span>`:""}</div>
    ${a.imagen ? `<img src="${a.imagen}" alt="" style="border-radius:4px;margin-bottom:28px;">` : ""}
    <div class="detail-body">${paragraphs(a.contenido)}</div>
  </div>`;
}

function cardVideo(v){
  return `
    <article class="video-card">
      <div class="video-frame-wrap">
        <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtubeId)}"
          title="${escapeHtml(v.titulo)}" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="video-info">
        <span class="cat">${escapeHtml(v.categoria)}</span>
        <h3>${escapeHtml(v.titulo)}</h3>
        <p>${escapeHtml(v.descripcion)} · ${fmtDate(v.fecha)}</p>
      </div>
    </article>`;
}

function viewVideos(){
  const videos = [...SITE_CONTENT.videos].sort(byDateDesc);
  return `
  <section class="section">
    <div class="section-inner">
      <div class="section-head"><div><span class="eyebrow">Mensajes</span><h2>Videos</h2></div></div>
      <div class="video-grid">
        ${videos.map(cardVideo).join("") || `<div class="empty-state">Aún no hay videos publicados.</div>`}
      </div>
    </div>
  </section>`;
}

function viewAcerca(){
  return `
  <div class="detail-wrap">
    <span class="eyebrow">Nuestra iglesia</span>
    <h1>Iglesia Pentecostal Lámpara Es A Mis Pies Tu Palabra</h1>
    <p class="about-lede"> Salmos 119:105 — «Lámpara es a mis pies tu Palabra, y lumbrera a mi camino»</p>
    <div class="detail-body">
      <p><strong>Misión:</strong> La iglesia Lámpara es a mis pies tu Palabra busca las almas al predicar y esparcir el evangelio de Cristo, "la buena nueva de salvación", y dirigir a un pueblo a la salvación compartiendo un evangelio limpio, no adulterado, agradable al SEÑOR y a SU CORDERO. Es tiempo de prepararse: la venida del SEÑOR está más cerca que nunca.</p>
      <p><strong>Visión:</strong> Que seamos un pueblo, "un cuerpo" preparado, apto para la venida del SEÑOR JESUCRISTO, haciendo la obra del SEÑOR y estando listos para vivir eternamente con Él. Entregar al Cordero, en aquel día postrero, una iglesia sin manchas ni arrugas — siendo todos ovejas de su prado, en "koinonía" los unos con los otros.</p>
      <p><strong>Valores:</strong> La Iglesia Lámpara Es A Mis Pies Tu Palabra tiene como fundamento creer que la Biblia es Palabra de Dios, y que esta es nuestra ley de fe, doctrina y manual de vida. Ser una iglesia que testifique la grandeza de Dios, el poder de su evangelio y el milagro del cambio en la vida del creyente.</p>
      <p><strong>Paz y santidad</strong> — Hebreos 12:14: "Seguid la paz con todos, y la santidad, sin la cual nadie verá al Señor."</p>
      <p><strong>Vivir la sana doctrina</strong> — 2 Timoteo 4:3: "Porque vendrá tiempo cuando no sufrirán la sana doctrina, sino que teniendo comezón de oír, se amontonarán maestros conforme a sus propias concupiscencias."</p>
      <p><strong>En amor</strong> — 1 Corintios 13:8-10: "El amor nunca deja de ser; pero las profecías se acabarán, y cesarán las lenguas, y la ciencia acabará. Porque en parte conocemos, y en parte profetizamos; mas cuando venga lo perfecto, entonces lo que es en parte se acabará."</p>
      <p><strong>Hablando el lenguaje del cielo y el terrenal</strong> — Marcos 16:17: "Y estas señales seguirán a los que creen: en mi nombre echarán fuera demonios; hablarán nuevas lenguas."</p>
      <p>Hechos 2:1-4: "Cuando llegó el día de Pentecostés, estaban todos unánimes juntos. Y de repente vino del cielo un estruendo como de un viento recio que soplaba, el cual llenó toda la casa donde estaban sentados; y se les aparecieron lenguas repartidas, como de fuego, asentándose sobre cada uno de ellos. Y fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen."</p>
      <p>1 Corintios 13:1: "Si yo hablase lenguas humanas y angélicas, y no tengo amor, vengo a ser como metal que resuena, o címbalo que retiñe."</p>
      <p>1 Corintios 14:39-40: "Así que, hermanos, procurad profetizar, y no impidáis el hablar lenguas; pero hágase todo decentemente y con orden."</p>
      <p><strong>Con señales, milagros y prodigios</strong> — Marcos 16:17 y Hechos 2:43: "Y sobrevino temor a toda persona; y muchas maravillas y señales eran hechas por los apóstoles."</p>
      <p><strong>Una boda, un esposo, una esposa</strong> — Mateo 19:9-12: "Y yo os digo que cualquiera que repudia a su mujer, salvo por causa de fornicación, y se casa con otra, adultera; y el que se casa con la repudiada, adultera. Le dijeron sus discípulos: Si así es la condición del hombre con su mujer, no conviene casarse. Entonces él les dijo: No todos son capaces de recibir esto, sino aquellos a quienes es dado."</p>
     <p><strong>Horarios de servicio:</strong> martes, jueves y sábado a partir de las 7:00 PM. Estamos ubicados en la calle Fernández Domínguez #52, Los Frailes II, Santo Domingo Este.</p>
      <p><strong>Redes sociales:</strong> Facebook: iglesiapentecostalipla · Instagram: iglesiapentecostalipla · YouTube: iglesiapentecostalipla · TikTok: ipla iglesia pentecostal.</p>
      <p><strong>Contacto y oración:</strong> Tel. 849-525-1871.</p>
    </div>
  </div>`;
}

function notFound(back){
  return `<div class="detail-wrap"><div class="empty-state">Contenido no encontrado. <br><a href="#" data-view="${back}" style="color:var(--wine)">← Volver</a></div></div>`;
}

/* ---------- render ---------- */
function render(){
  const { view, id } = currentRoute();

  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("is-active", a.getAttribute("data-view") === view);
  });

  let html = "";
  if(view === "inicio") html = viewInicio();
  else if(view === "noticias" && id) html = viewNoticiaDetail(id);
  else if(view === "noticias") html = viewNoticiasList();
  else if(view === "articulos" && id) html = viewArticuloDetail(id);
  else if(view === "articulos") html = viewArticulosList();
  else if(view === "videos") html = viewVideos();
  else if(view === "acerca") html = viewAcerca();
  else html = viewInicio();

  app.innerHTML = html;
}

/* clickable cards/rows without an explicit <a> */
document.addEventListener("click", (e) => {
  const el = e.target.closest(".is-clickable[data-id]");
  if(el && !e.target.closest("a")){
    navigateTo(el.getAttribute("data-view"), el.getAttribute("data-id"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

render();
