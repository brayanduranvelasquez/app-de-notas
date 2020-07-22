<template>
  <div>
  </div> 
</template>

<script>

  export default {
    head: {
      title: ''
    },

    beforeCreate() {
      // Ya que para poder editar una nota, se necesita de su indice (id), al entrar en el index, solo redireccionara al inicio

      this.$router.push('/');
    }
  }

</script>