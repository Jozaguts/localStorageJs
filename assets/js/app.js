//variables

const listaTareas = document.getElementById('lista-tareas')


//event Listeners

eventListeners();
function eventListeners(){

     //detecto lo escrito en el texarea y empiezo a procesar
     document.getElementById('formulario').addEventListener('submit',agregarTarea);

     // eliminar tarea solo detecta click solobre la lista de tareas despues con delegarion se detecta 
     // exactamente donde si lo hace en el boton eliminar o no
     listaTareas.addEventListener('click', eliminarTarea);

     //documnet ready 
     document.addEventListener('DOMContentLoaded',cargarTareas);

}



//funciones

//añadir tarea del formulario


function agregarTarea(e){
e.preventDefault();
const tarea= document.getElementById('tarea').value;

//crear el elemento li para la lista de tareas
const li = document.createElement('li');
// agrega el texto de la tarea al li
li.innerText = tarea;
// crear boton elimiar para cada tarea
const botonEliminar = document.createElement('a')
// inserto clases para el boton eliminar
botonEliminar.classList = 'borrar-tarea';
// agrego texto al boton eliminar
botonEliminar.innerText = 'X';
// inserto boton eliminar a la tarea
li.appendChild(botonEliminar);
listaTareas.appendChild(li);



//agreagar a local storage
agregarTareaLocalStorage(tarea);

}

//eliminar tarea

function eliminarTarea(e){
e.preventDefault();
//delegation si da click exactamete en el boton eliminar se elimina el parent li
e.target.className === 'borrar-tarea'?e.target.parentElement.remove():null;

eliminarTareaDeLocalStorage(e.target.parentElement.innerText);

}

//funcion de agragar a local storage

function agregarTareaLocalStorage(tarea){
     let tareas;
     tareas = getTareasLocalStorage();
     //añadir la nueva tarea
     tareas.push(tarea);
     // converti de string a arreglo
     localStorage.setItem('tareas',JSON.stringify(tareas));

}


//function obtener tareas de LS retorna un arreglo
function getTareasLocalStorage(){
     let tareas;
     if(localStorage.getItem('tareas')===null){
          tareas=[];

     }else{
          tareas = JSON.parse(localStorage.getItem('tareas'));
     }
     return tareas;
}

//mostrar datos de local storage cuando la pagina termine de cargar

function cargarTareas(){
     let tareas;
     tareas = getTareasLocalStorage();
     tareas.forEach(tarea => {
     //crear el elemento li para la lista de tareas
     const li = document.createElement('li');
     // agrega el texto de la tarea al li
     li.innerText = tarea;
     // crear boton elimiar para cada tarea
     const botonEliminar = document.createElement('a')
     // inserto clases para el boton eliminar
     botonEliminar.classList = "borrar-tarea";
     // agrego texto al boton eliminar
     botonEliminar.innerText = "X";
     // inserto boton eliminar a la tarea
     li.appendChild(botonEliminar);
     listaTareas.appendChild(li);
     });
}

//eliminar tarea de local storage
function eliminarTareaDeLocalStorage (tarea){
     let tareas, borrarTarea;

     borrarTarea = tarea.substring(0,tarea.length -1);
     tareas = getTareasLocalStorage();
     tareas.forEach(function(tarea,index){
          borrarTarea===tarea?tareas.splice(index,1):null
     });
     localStorage.setItem('tareas',JSON.stringify(tareas))

}