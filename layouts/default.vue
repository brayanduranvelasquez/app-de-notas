<template>
  <div>
    
    <template v-if="!montado">
      <carga-inicial />
    </template>

    <template v-else>
      <Nuxt />

      {{ Modo }}
    </template>
    
  </div>
</template>

<script>
  import CargaInicial from "@/components/CargaInicial.vue";
  import { mapState, mapMutations } from "vuex";

  export default {
    components: {
      CargaInicial
    },

    data(){
      return {
        montado: false
      }
    },

    methods: {
      ...mapMutations(['CambiarModo'])
    },

    computed: {
      ...mapState(['modoOscuro']),

      Modo(){
        if(this.modoOscuro){
          let body = document.body;
          body.style.background = "#121212";
          body.style.color = "white";
        } 
        else {
          let body = document.body;
          body.style.background = "white";
          body.style.color = "black";
        }
      }
    },

    mounted(){
      this.montado = true; // Desaparece la cargainicial

      // Y se comprueba si la ultima vez, se dejo en modoOscuro
      let notasModoOscuro = localStorage.getItem('notas-modo-oscuro');
      if(notasModoOscuro == 'true'){
        this.CambiarModo();
      }
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
    scroll-behavior: smooth;
  }

  body {
    transition: 0.3s all;
    background: #fff;
    font-family: 'Lato';
  }

</style>