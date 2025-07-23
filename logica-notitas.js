const frases = [
    "Negra, tu amor me hace bailar la canción más feliz. 💃🎶❤️",
    "Eres esa calma mágica que llena mi mundo de felicidad. 🌟🧸✨",
    "Eres mi mundo entero, mi negra. 🌍💜",
    "Mi hermosa salerosa. 🌹😊",
    "'Tú eres hermoso'. Sí, pero no más por fuera. 😜💕",
    "Eres mi Evangeline, la estrella que ilumina mi vida. ⭐🌙💖",
    "Te voy a amar hasta que el río se seque. 💧❤️♾️",
    "Como Totoro cuida el bosque, yo cuido de ti con todo mi corazón. 💚🍃🌲",
    "Eres mi única luz. 💡🌙✨",
    "Quiero que sepas que te amo. 💕🎶😍",
    "Eres mi ritmo, mi latido, mi baile. 💓💃🎵",
    "No importa cuántas vidas tengamos, siempre elegiría esta, contigo. 🐾💜🌟",
    "No importa cuántas veces caiga, siempre me levantaré por ti. 🥊💞💪",
    "Ser tu héroe es el mejor papel que he tenido en la vida. 🦸‍♂️💘🎬",
    "Deseo tener una vida contigo. 🌍❤️🤗",
    "Eres la razón por la que creo en el amor verdadero. 💞✨",
    "Desde que llegaste, todo es más bonito. 🌸😊🌈",
    "Gracias por ser tú, por estar y por quedarte. 💫🙏❤️",
    "Hoy y siempre, eres mi persona favorita. 🥰🌟💖"
];

// Variables para el sistema de frases
let frasesHoy = [];
let indiceActual = 0;

function fechaHoy() {
  return new Date().toISOString().slice(0, 10);
}

function cargarEstado() {
  const hoy = fechaHoy();
  const data = localStorage.getItem('estadoNotitas');
  if (data) {
    const estado = JSON.parse(data);
    if (estado.fecha === hoy) {
      frasesHoy = estado.frasesHoy || [];
      indiceActual = estado.indiceActual || 0;
    } else {
      frasesHoy = [];
      indiceActual = 0;
    }
  } else {
    frasesHoy = [];
    indiceActual = 0;
  }
}

function guardarEstado() {
  const estado = {
    fecha: fechaHoy(),
    frasesHoy,
    indiceActual
  };
  localStorage.setItem('estadoNotitas', JSON.stringify(estado));
}

function cargarFavoritos() {
  const favs = localStorage.getItem('favoritosNotitas');
  return favs ? JSON.parse(favs) : [];
}
function guardarFavoritos(favs) {
  localStorage.setItem('favoritosNotitas', JSON.stringify(favs));
}

function extraerEmojis(texto) {
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
  return texto.match(emojiRegex) || [];
}

function lluviaDeEmojis(emojiList, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    const span = document.createElement('span');
    span.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    span.classList.add('emoji');
    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDuration = (Math.random() * 3 + 3) + 's';
    span.style.fontSize = (Math.random() * 24 + 20) + 'px';
    span.style.animationDelay = (Math.random() * 5) + 's';
    document.body.appendChild(span);

    setTimeout(() => {
      span.remove();
    }, 8000);
  }
}

// NUEVO: Animación burbujas al click
function crearBurbuja(x, y) {
  const emojis = ['💜', '✨', '🌸', '🌟', '💫', '🎶', '🧸', '💖'];
  for (let i = 0; i < 7; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.classList.add('burbuja');
    span.style.left = (x + (Math.random() * 40 - 20)) + 'px';
    span.style.top = (y + (Math.random() * 40 - 20)) + 'px';
    span.style.fontSize = (Math.random() * 18 + 14) + 'px';
    document.body.appendChild(span);
    // Remover después de animación
    setTimeout(() => {
      span.remove();
    }, 1800);
  }
}

function mostrarFrase() {
  const contenedorFrase = document.getElementById('frase');
  if (indiceActual >= frasesHoy.length) {
    let disponibles = frases.filter((_, i) => !frasesHoy.includes(i));
    if (disponibles.length === 0) disponibles = frases;
    const nuevaFrase = disponibles[Math.floor(Math.random() * disponibles.length)];
    const nuevaIndice = frases.indexOf(nuevaFrase);
    frasesHoy.push(nuevaIndice);
  }
  const indice = frasesHoy[indiceActual];
  contenedorFrase.textContent = frases[indice];

  actualizarBotonFavorito(indice);

  const emojis = extraerEmojis(frases[indice]);
  if (emojis.length > 0) {
    lluviaDeEmojis(emojis, 15);
  }
  guardarEstado();
}

function mostrarContador() {
  const totalLeidas = frasesHoy.length;
  const contador = document.getElementById('contador');
  contador.textContent = `Has leído ${totalLeidas} notita${totalLeidas !== 1 ? 's' : ''} hoy 💜`;
}

function manejarSiguiente() {
  if (indiceActual < 1) {
    indiceActual++;
    mostrarFrase();
    mostrarContador();
    limpiarMensaje();
  } else {
    mostrarMensaje('Deja para más tardeee 😜');
  }
}

function mostrarMensaje(texto) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = '';
  }, 3500);
}

function limpiarMensaje() {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = '';
}

function actualizarBotonFavorito(indice) {
  const btnFav = document.getElementById('btnFavorito');
  const favoritos = cargarFavoritos();
  if (favoritos.includes(indice)) {
    btnFav.classList.add('active');
    btnFav.textContent = '💜 Favorito';
  } else {
    btnFav.classList.remove('active');
    btnFav.textContent = '💜 Marcar favorito';
  }
}

function manejarFavorito() {
  const indice = frasesHoy[indiceActual];
  let favoritos = cargarFavoritos();
  if (favoritos.includes(indice)) {
    favoritos = favoritos.filter(i => i !== indice);
  } else {
    favoritos.push(indice);
  }
  guardarFavoritos(favoritos);
  actualizarBotonFavorito(indice);
}

function mostrarProximoReset() {
  const ahora = new Date();
  const mañana = new Date(ahora);
  mañana.setHours(24, 0, 0, 0);
  const diffMs = mañana - ahora;
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diffMs % (1000 * 60)) / 1000);
  const texto = `Siguiente notita a las 12:00 AM (en ${horas}h ${minutos}m ${segundos}s)`;
  document.getElementById('proximoReset').textContent = texto;
}

function reiniciarSiCambioDia() {
  const ultimaFecha = localStorage.getItem('ultimaFechaLeida') || '';
  const hoy = fechaHoy();
  if (ultimaFecha !== hoy) {
    localStorage.removeItem('estadoNotitas');
    localStorage.setItem('ultimaFechaLeida', hoy);
    frasesHoy = [];
    indiceActual = 0;
  }
}

window.onload = () => {
  reiniciarSiCambioDia();
  cargarEstado();
  mostrarFrase();
  mostrarContador();
  mostrarProximoReset();

  document.getElementById('btnSiguiente').addEventListener('click', manejarSiguiente);
  document.getElementById('btnFavorito').addEventListener('click', manejarFavorito);

  // Evento click para animación burbujas
  document.getElementById('frase').addEventListener('click', (e) => {
    crearBurbuja(e.clientX, e.clientY);
  });

  // También en el fondo (contenedor)
  document.getElementById('contenedor').addEventListener('click', (e) => {
    // Evitar que se duplique si clic en frase
    if(e.target.id !== 'frase') {
      crearBurbuja(e.clientX, e.clientY);
    }
  });

  setInterval(mostrarProximoReset, 1000);
};
