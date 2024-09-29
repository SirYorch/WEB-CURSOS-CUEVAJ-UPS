// variables

//formulario de agregar curso
let formulario = document.querySelector(".formulario"); // pestaña de formulario para que se genere
let stage = document.querySelector(".contenedor"); // espacio para generar cursos
let agregar = document.querySelector("#agregar");/// boton para desplegar formulario agregar cursos
let iniciar = document.querySelector("#iniciar");//boton para desplegar inicio
let cursos = document.querySelector("#cursos");//boton para despejar la pantalla y mostrar la ventana de cursos
let contactos = document.querySelector("#contactos");//boton para desplegar infor de contacto
let agregarCurso = document.querySelector("#agregar-curso");//boton dentro de formulario de agregar para agregar cursos
//console.log(agregarCurso);
let inicio = document.querySelector(".inicio");//infomación de  inicio
let contacto = document.querySelector(".contacto");//infomación de  contacto

//conjunto de botones de ver más
let ver = document.querySelectorAll(".boton");

//conjunto de botones para eliminar
let borrar= document.querySelectorAll(".borrar");

////////////Funciones

//funcion para desplegar la ventana de formulario
agregar.addEventListener("click",()=>{
    inicio.classList.remove("desplegado");
    contacto.classList.remove("desplegado");
    formulario.classList.toggle("desplegar")});

//funcion para ver desplegar pantalla de inicio
iniciar.addEventListener("click",()=>{
    formulario.classList.remove("desplegar");
    contacto.classList.remove("desplegado");
    inicio.classList.toggle("desplegado")})

//funcion para desplegar pantalla de contacto
contactos.addEventListener("click",()=>{
    formulario.classList.remove("desplegar");
    inicio.classList.remove("desplegado");
    contacto.classList.toggle("desplegado")})

//funcion para el funcionamiento del botón de cursos
cursos.addEventListener("click",()=>{
    formulario.classList.remove("desplegar");
    inicio.classList.remove("desplegado");
    contacto.classList.remove("desplegado");
})

//funcion para activar pulsador de ver más
ver.forEach(boton => boton.addEventListener("click",function(){
    const contenedor = this.parentElement;
    contenedor.classList.toggle("abierto");
}))

//agregado de cursos
let listaCursos = JSON.parse(localStorage.getItem('listaCursos')) || [];

//funcion para eliminar los cursos con su animacion
borrar.forEach(boton => boton.addEventListener("click",function () {
    const contenedor = this.parentElement;
    contenedor.classList.add("visible");
    setTimeout(()=>contenedor.remove(),"1000");
    listaCursos.pop(contenedor);
    localStorage.setItem('listaCursos', JSON.stringify(listaCursos));
}))

//funcionalidad de agregado de cursos
function agregarCursos(){
    formulario.classList.remove("desplegar");
    let cuadros = document.createDocumentFragment();

    const nombre = document.getElementById('nombre').value;
    const docente = document.getElementById('docente').value;
    const fecha = document.getElementById('fecha').value;
    const duracion = document.getElementById('duracion').value;
    const descripcion = document.getElementById('descripcion').value;

    if(nombre.length  == 0 || docente.length == 0 || fecha.length == 0 ||duracion.length == 0 || descripcion.length == 0 ){
        alert("Los campos no pueden encontrarse vacíos para poder enviar el formulario")
    } else {
    
        let curso = [nombre, docente, fecha, duracion, descripcion];
        listaCursos.push(curso);

        // Guardar la lista de cursos en localStorage
        localStorage.setItem('listaCursos', JSON.stringify(listaCursos));

        // Renderizar la lista de cursos
        renderizarCursos();
        limpiarCampos();
    }
}

function limpiarCampos() {
    document.getElementById('nombre').value = "";
    document.getElementById('docente').value = "";
    document.getElementById('fecha').value = "";
    document.getElementById('duracion').value = "";
    document.getElementById('descripcion').value = "";
}

function renderizarCursos() {
    let cuadros = document.createDocumentFragment();
    stage.innerHTML = ''; // Limpiar el contenido previo

    for(let cur of listaCursos){
        let carta = document.createElement("section");
        carta.classList.add("curso");

        let eliminar = document.createElement("p");
        eliminar.innerHTML = "X";
        eliminar.classList.add("borrar");
        eliminar.addEventListener("click", function () {
            const contenedor = this.parentElement;
            contenedor.classList.add("visible");
            setTimeout(() => contenedor.remove(), 1000);
            
            const index = listaCursos.indexOf(cur);
            listaCursos.splice(index, 1);
            localStorage.setItem('listaCursos', JSON.stringify(listaCursos));
        })

        let mas = document.createElement("button");
        mas.classList.add("boton");
        mas.innerHTML = "Ver más";
        mas.addEventListener("click", function () {
            const contenedor = this.parentElement;
            contenedor.classList.toggle("abierto");
        });

        carta.innerHTML = `
            <h2 class="titulo">${cur[0]}</h2>
            <p class="contenido">${cur[1]}</p>
            <p class="contenido">${cur[2]}</p>
            <p class="contenido">${cur[3]}</p>
            <p class="contenido">${cur[4]}</p>
        `;

        carta.appendChild(mas);
        carta.appendChild(eliminar);
        cuadros.appendChild(carta);
    }

    stage.appendChild(cuadros);
}

// Asociar el evento click al botón para agregar cursos
agregarCurso.addEventListener("click", function(e) {
    e.preventDefault(); // Evitar recarga de la página
    agregarCursos();
});

// Cargar los cursos guardados al cargar la página
document.addEventListener("DOMContentLoaded", renderizarCursos);
