export const state = () => ({
    notas: null, // Todas las notas guardadas en el localStorage
    modoOscuro: false // True para que sea modo oscuro.
})

export const mutations = {

    CargarNotasAlStore(state, notasGuardadas){
        state.notas = notasGuardadas; // Esta mutacion es usada en la vista inicial, para guardar todas las notas. Y asi, a traves de una propiedad computada, poder mostrar cuando una nota se elimine, ya que la mutacion "EliminarNota" elimina una nota, y modifica el state "notas"
    },

    CambiarModo(state){
        state.modoOscuro = !state.modoOscuro;
        localStorage.setItem('notas-modo-oscuro', state.modoOscuro);
    },

    EliminarNota(state, indice) {
        // Se extraen las notas y se utiliza JSON.parse para poder manipular el arreglo de objetos
        let localNotas = localStorage.getItem('notas');
        let notas = JSON.parse(localNotas);

        // Gracias al parametro "indice", se puede eliminar la posicion donde estan los datos de la nota (recordar que lo que se guarda es un arreglo de objetos)
        notas.splice(indice, 1);

        if (notas.length == 0) {
            // Si el arreglo esta vacio, quiere decir que no contiene notas... por lo tanto, se elimina del localStorage
            localStorage.removeItem('notas');
            state.notas = null; // Y se modifica el state "notas"
        } 
        
        else {
            // Se utiliza JSON.stringify para convertir todo el arreglo de objetos, a cadena de texto
            let notaEliminada = JSON.stringify(notas);

            // Se guarda en el localStorage
            localStorage.setItem('notas', notaEliminada);

            state.notas = notas; // Y se modifica el state "notas"
        }
    }
    
}
