export default function ExistenciaDeLaNota({redirect, params}){
    // Siempre que ocurra algún error, redireccionará al inicio.

    try {
        let notas = JSON.parse(localStorage.getItem('notas'));
        let parametro = atob(params.id); // Parametro = id de la nota
            
        if(notas == null || isNaN(parametro) || parametro == null){
            // Redireccionara al inicio si:
            // Si la variable "notas" no contiene un valor (el arreglo de objetos).
            // Si el parametro no es un numero
            // Si la variable "parametro" es null

            redirect('/')
        }

        else {
            // Y si todo sale bien, se comprueba si el arreglo de objetos que contiene la variable "notas", tiene el indice de esa nota la cual queremos editar/ver/eliminar. De no ser asi, se redireccionara al inicio.
            if(notas[parametro] == null){
                redirect('/') 
            }      
        }
    }
    
    catch {
        redirect('/')
    }

}