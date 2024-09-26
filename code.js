// variables

//formulario de agregar curso
let formulario = document.querySelector(".formulario"); // pestaña de formulario para que se genere
let nombreCurso = document.querySelector(".nombre"); //datos de formulario
let nombreDocente = document.querySelector(".docente");
let fecha = document.querySelector(".fecha");
let duracion = document.querySelector(".duracion");
let descripcion = document.querySelector(".descripcion")
let stage = document.querySelector(".principal"); // espacio para generar cursos
let curso = document.createDocumentFragment(); // contenido que se genera en cada curso
let agregar = document.querySelector("#agregar");/// boton para desplegar formulario agregar cursos

//conjunto de botones de ver más
let ver = document.querySelectorAll(".boton");

//conjunto de botones para eliminar
let borrar= document.querySelectorAll(".borrar");

////////////Funciones


//funcion para desplegar la ventana de formulario
agregar.addEventListener("click",()=>{formulario.classList.toggle("desplegar")});

//funcion para activar pulsador de ver más
ver.forEach(boton => boton.addEventListener("click",function(){
    const contenedor = this.parentElement;
    contenedor.classList.toggle("abierto");
}))

//funcion para eliminar los cursos con su animacion
borrar.forEach(boton => boton.addEventListener("click",function () {
    const contenedor = this.parentElement;
    contenedor.classList.add("visible");
    setTimeout(()=>contenedor.remove(),"1000");
}))