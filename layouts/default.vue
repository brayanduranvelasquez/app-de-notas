<template>
  <div>
    
    <template v-if="!montado">
      <carga-inicial />
    </template>

    <template v-else>
      <Nuxt />
    </template>
    
  </div>
</template>

<script>
  import CargaInicial from "@/components/CargaInicial.vue";

  export default {
    components: {
      CargaInicial
    },

    data(){
      return {
        montado: false
      }
    },

    mounted(){
      this.montado = true;
    }
  }
</script>

<style>
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  ::-webkit-scrollbar {
    background: #ccc;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 40px;
  }

  html {
    background: #fff;
    font-family: 'Lato';
    scroll-behavior: smooth;
  }

</style>