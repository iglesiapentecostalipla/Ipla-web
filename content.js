/* =========================================================================
   CONTENIDO DEL SITIO — IPLA
   -------------------------------------------------------------------------
   Edita este archivo para publicar contenido nuevo. No necesitas tocar
   el HTML ni el CSS. Guarda los cambios y vuelve a subir el proyecto
   a Vercel (o conecta un repositorio de GitHub para que se actualice
   automáticamente).

   Formatos de fecha: "AAAA-MM-DD" (ej: "2026-08-01")
   Para imágenes: coloca el archivo en la carpeta /images y escribe
   la ruta, ej: "images/mi-foto.jpg"
   ========================================================================= */

const SITE_CONTENT = {

  /* ---------------------------------------------------------------------
     NOTICIAS — anuncios y novedades de la iglesia
     "destacado: true" muestra la noticia en grande en Inicio
  --------------------------------------------------------------------- */
  noticias: [
    {
      id: "n1",
      titulo: " "GRAN CULTO DE 'RE-APERTURA' ",
      categoria: "Vida de iglesia",
      fecha: "2026-08-16",
      resumen: "Iniciamos un caminar en la senda del SEÑOR, festeja con nosotros la apertura estás invitad a celebrar con nosotros.",
      contenido: "Por este medio les hacemos la cordial  invitación a acompañarnos, a estar en la presencia de nuestro DIOS dando Culto de inauguración de Casa para adorar su nombre. Este próximo 16 de agosto del presente año 2026. Dirección: C/ Fernandez  Dominguez #52, Los Frailes II. Santo Domingo Este."
.",
      imagen: "",
      destacado: true
    },
    {
      id: "n2",
      titulo: "Jornada de servicio comunitario",
      categoria: "Comunidad",
      fecha: "2026-07-20",
      resumen: "Un equipo de voluntarios llevó ayuda y palabra de aliento a familias del sector. Así vivimos la fe en acción.",
      contenido: "Texto de ejemplo. Cuenta aquí cómo se desarrolló la actividad, quiénes participaron y los resultados obtenidos.",
      imagen: "",
      destacado: false
    },
    {
      id: "n3",
      titulo: "Convocatoria: coro y ministerio de alabanza",
      categoria: "Anuncios",
      fecha: "2026-07-10",
      resumen: "Se abren nuevos cupos para quienes deseen servir en el ministerio de alabanza. Ensayos todos los jueves.",
      contenido: "Texto de ejemplo. Añade requisitos, horarios de ensayo y datos de contacto para quienes deseen inscribirse.",
      imagen: "",
      destacado: false
    }
  ],

  /* ---------------------------------------------------------------------
     ARTÍCULOS
     tipo: "interno"  -> el contenido se muestra dentro de esta página
     tipo: "externo"  -> la tarjeta enlaza a un artículo en otro sitio
  --------------------------------------------------------------------- */
  articulos: [
    {
      id: "a1",
      titulo: "Salmos 119: la lámpara que guía nuestros pasos",
      tipo: "interno",
      autor: "Equipo editorial IPLA",
      fecha: "2026-07-28",
      resumen: "Un recorrido devocional por el salmo que da nombre a nuestra congregación y su llamado a vivir a la luz de la Palabra.",
      contenido: "Texto de ejemplo para un artículo interno. Aquí puedes escribir el artículo completo con varios párrafos. Simplemente reemplaza este texto por el contenido real; el sitio respeta saltos de línea dobles como párrafos nuevos.\n\nPuedes agregar tantos párrafos como necesites.",
      imagen: "",
      fuenteNombre: ""
    },
    {
      id: "a2",
      titulo: "Ejemplo de artículo enlazado a un sitio externo",
      tipo: "externo",
      autor: "Fuente externa",
      fecha: "2026-07-15",
      resumen: "Así se ve una tarjeta que enlaza a un artículo publicado en otra página web. Cambia el título, resumen y el enlace 'url' por los reales.",
      url: "https://example.com",
      fuenteNombre: "Nombre del sitio externo",
      imagen: ""
    }
  ],

  /* ---------------------------------------------------------------------
     VIDEOS — deben estar subidos (o programados) en YouTube.
     Copia solo el ID del video, no la URL completa.
     Ej: en https://youtu.be/dQw4w9WgXcQ  el ID es  dQw4w9WgXcQ
  --------------------------------------------------------------------- */
  videos: [
    {
      id: "v1",
      titulo: "Video de ejemplo — reemplaza por tu prédica o mensaje",
      categoria: "Prédicas",
      fecha: "2026-07-27",
      descripcion: "Descripción breve del video. Cuéntale a la audiencia de qué trata antes de que le den play.",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: "v2",
      titulo: "Video de ejemplo — alabanza y adoración",
      categoria: "Alabanza",
      fecha: "2026-07-13",
      descripcion: "Descripción breve del segundo video de ejemplo.",
      youtubeId: "dQw4w9WgXcQ"
    }
  ]
};
