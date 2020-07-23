<template>
  <div>
  </div>
</template>


<script>
  import navegacion from "@/mixins/navegacion.js";

  export default {
    mixins: [navegacion],
    head: {
      title: ''
    },

    mounted() {
      // Se extraen las notas y se utiliza JSON.parse para poder manipular el arreglo de objetos
      let localNotas = localStorage.getItem('notas');
      let notas = JSON.parse(localNotas);

      // Gracias al parametro, se puede eliminar la posicion donde estan los datos de la nota
      notas.splice(this.$route.params.id, 1);

      if(notas.length == 0){
        // Si el arreglo esta vacio, quiere decir que no contiene notas... por lo tanto, se elimina del localStorage
        localStorage.removeItem('notas');
      } 

      else {
        // Se utiliza JSON.stringify para convertir todo el arreglo de objetos, a cadena de texto
        let notaEliminada = JSON.stringify(notas);

        // Se guarda en el localStorage
        localStorage.setItem('notas', notaEliminada);
      }

      // Y ahora, solo se redirecciona
      this.IrA('/');
    }
  }

</script>