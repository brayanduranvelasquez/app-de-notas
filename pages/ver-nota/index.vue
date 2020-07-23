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
      // Ya que para poder eliminar una nota, se necesita de su indice (id), al entrar en el index de esta vista, solo redireccionara al inicio

      this.IrA('/');
    }
  }

</script>