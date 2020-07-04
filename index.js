//variables
const textAnotado = document.querySelector(".js-text-anotado");
const add = document.querySelector(".js-add");
const anotar = document.querySelector(".js-anotar");
const borrarTodo = document.querySelector(".js-delete");
const list = document.querySelector(".js-list");
const textAnotar = document.querySelector(".js-text-anotar");

 eventListener();
function eventListener() {
  //cuando se envia al anotado
  add.addEventListener("click", agregar);
  anotar.addEventListener("keyup", function(e){
    if(e.keyCode == 13) {
      return agregar(e);
    }
  })
  
  //borrar con la cruz
  textAnotado.addEventListener("click", borrarAnotacion);
  
  //borrar todo
  borrarTodo.addEventListener("click", deleteAll)
  
  //contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}



function agregar(e) {
  e.preventDefault();
  
  let text = textAnotar.value;
  if(text == "") {
    return;
  } else {
    //crear elementos y agregarlos a mis anotaciones
    const li = document.createElement("li");
    list.appendChild(li);
    li.innerText = text; 
    textAnotar.value = "";
    
    //crear x para borrar
    const cruz = document.createElement("a");
    cruz.innerText = "x";
    cruz.classList = "borrar-anotacion";
    li.appendChild(cruz);
    
    //agregar local storage
    agregarLocalStorage(text);
  }
 }

//borra la anotación elegida con la cruz
function borrarAnotacion(e) {
  e.preventDefault();
  
  if(e.target.className == "borrar-anotacion") {
    e.target.parentElement.remove();
    borrarLocalStorage(e.target.parentElement.innerText);
  } 

}

//borra todas las anotaciones
function deleteAll () {
  list.innerText = null; 
  localStorage.clear();
}

//mostrar datos de local storage
function localStorageListo() {
  let anotacion;
  
  anotacion = obtenerAnotacion();
  
  anotacion.forEach(function(text) {
    //crear elementos y agregarlos a mis anotaciones
  const li = document.createElement("li");
  list.appendChild(li);
  li.innerText = text; 
  textAnotar.value = "";
  
  //crear x para borrar
  const cruz = document.createElement("a");
  cruz.innerText = "x";
  cruz.classList = "borrar-anotacion";
  li.appendChild(cruz);
  })
}

//agregar anotación a local storage
function agregarLocalStorage(text) {
  let anotacion;
  anotacion = obtenerAnotacion();
  
  //agregar la nueva anotacion
  anotacion.push(text);
  
  //convertir de string a arreglo para local storage
  localStorage.setItem("anotacion", JSON.stringify(anotacion));
}


function obtenerAnotacion() {
  let anotacion;
  
  //revisamos los valores de local storage
  if(localStorage.getItem("anotacion") == null) {
    anotacion = [];
  }else {
    anotacion = JSON.parse(localStorage.getItem("anotacion"));
  }
  
  return anotacion;
}

//eliminar anotaciones de local storage
function borrarLocalStorage(text) {
  let anotacion;
  let borrarAnotacion;

  //elimina la x 
  borrarAnotacion = text.substring(0, text.length -1);

  anotacion = obtenerAnotacion();

  anotacion.forEach(function(text, index) {
    if(borrarAnotacion == text) {
      anotacion.splice(index, 1);
    }
  })
  localStorage.setItem("anotacion", JSON.stringify(anotacion));
}

