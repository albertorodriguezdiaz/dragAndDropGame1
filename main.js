const objArrastrables = document.querySelectorAll(".objArrastrable");
const objColocables = document.querySelectorAll(".objColocable");

// Agregamos a cada elemento arrastrable el evento de ser escuchado para manipularlo
objArrastrables.forEach(elem => {
  elem.addEventListener("dragstart", iniciarObjArrastrable); 
});

// Agregamos a cada elemento colocable los eventos
objColocables.forEach(elem => {
  elem.addEventListener("dragenter", entradaValidaObjArrastrable); // Se ejecuta cuando entra a la caja valida
  elem.addEventListener("dragover", pasandoObjArrastrable); // Se ejecuta cuenta es arrastrado y pasa por las cajas
  elem.addEventListener("dragleave", dejandoObjArrastrable); // Se ejecuta cuando sale de la caja valida
  elem.addEventListener("drop", soltandoObjArrastrable); // Se ejecuta cuando se deja caer en la caja valida
});

// Funciones para el Drag and Drop / Arrastrar y colocar

//Eventos ejecutados sobre el objetivo arrastrable 
function iniciarObjArrastrable(event) {
  event.dataTransfer.setData("text", event.target.id); // "text/plain", recibimos el texto del objeto  
}


//Eventos ejejcutados en el objeto colocable

// Si no ha entrado el objeto valido en la caja valida entonces agregamos la clase hover para tener un efecto al pasar por el objeto
function entradaValidaObjArrastrable(event) {
  if(!event.target.classList.contains("objColocableValido")) {
    event.target.classList.add("objColocable-Hover");
  }
}

// Quitamos el evento por defecto para agregar la nueva clase si es objeto es valido
function pasandoObjArrastrable(event) {
  if(!event.target.classList.contains("objColocableValido")) {
    event.preventDefault();
  }
}

// Quitamos la clase hover para que vuelva el objeto colocable como esta al inicio
function dejandoObjArrastrable(event) {
  if(!event.target.classList.contains("objColocableValido")) {
    event.target.classList.remove("objColocable-Hover");
  }
}



// PUNTAJE JUEGO /////////////////////////////////////////////////////////////////
    let total = 0;
    const puntaje = document.querySelector(".puntaje");
    const correctas = puntaje.querySelector(".correctas");
    const infoPuntaje = document.querySelector(".infoPuntaje");
// PUNTAJE FIN /////////////////////////////////////////////////////////////////


function soltandoObjArrastrable(event) {
  // Esto es para evitar que el navegador ejecute el evento por defecto
  event.preventDefault(); 
  
  // Eliminamos la clase hover si el objeto que solamos no es valido, para que vuelva la caja como estaba al inicio   
  event.target.classList.remove("objColocable-Hover");

  // ( gato, perro, sapo... ) Obteniendo los datos del objeto arrastrable. Este método devolverá los datos que se establecieron en el mismo tipo en el método setData () 
  const draggableElementData = event.dataTransfer.getData("text"); 


  const droppableElementData = event.target.getAttribute("idObjColocable");


  setTimeout(() => {
    correctas.textContent = total;
    
    if(total===5) {infoPuntaje.classList.add("ganaste"); infoPuntaje.textContent = 'Ganaste :)';}

  }, 200);

  if(draggableElementData === droppableElementData) {
    total++;
    console.log(total);
    const draggableElement = document.getElementById(draggableElementData);

    event.target.classList.add("objColocableValido");

    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;

    draggableElement.classList.add("objArrastrableValido");
    draggableElement.setAttribute("draggable", "false");

    event.target.insertAdjacentHTML("afterbegin", `<i class="bg100 ${draggableElement.className}"></i>`);
  }
}