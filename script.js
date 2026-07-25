const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const botonAbrir = document.getElementById("botonAbrir");

const fotos = document.querySelectorAll(".foto");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");
const contenedorIndicadores = document.getElementById("indicadores");

let fotoActual = 0;
let intervaloCarrusel = null;

/* Crear los puntos indicadores */

fotos.forEach((foto, indice) => {
  const punto = document.createElement("button");

  punto.classList.add("punto");
  punto.setAttribute("aria-label", `Ver foto ${indice + 1}`);

  if (indice === 0) {
    punto.classList.add("activo");
  }

  punto.addEventListener("click", () => {
    mostrarFoto(indice);
    reiniciarCarruselAutomatico();
  });

  contenedorIndicadores.appendChild(punto);
});

const puntos = document.querySelectorAll(".punto");

/* Abrir la invitación */

botonAbrir.addEventListener("click", () => {
  portada.style.display = "none";
  invitacion.classList.remove("oculto");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  iniciarCarruselAutomatico();
});

/* Mostrar una foto */

function mostrarFoto(indice) {
  fotos[fotoActual].classList.remove("activa");
  puntos[fotoActual].classList.remove("activo");

  fotoActual = indice;

  if (fotoActual >= fotos.length) {
    fotoActual = 0;
  }

  if (fotoActual < 0) {
    fotoActual = fotos.length - 1;
  }

  fotos[fotoActual].classList.add("activa");
  puntos[fotoActual].classList.add("activo");
}

/* Botón siguiente */

botonSiguiente.addEventListener("click", () => {
  mostrarFoto(fotoActual + 1);
  reiniciarCarruselAutomatico();
});

/* Botón anterior */

botonAnterior.addEventListener("click", () => {
  mostrarFoto(fotoActual - 1);
  reiniciarCarruselAutomatico();
});

/* Iniciar movimiento automático */

function iniciarCarruselAutomatico() {
  clearInterval(intervaloCarrusel);

  intervaloCarrusel = setInterval(() => {
    mostrarFoto(fotoActual + 1);
  }, 5000);
}

/* Reiniciar después de tocar un botón */

function reiniciarCarruselAutomatico() {
  iniciarCarruselAutomatico();
}