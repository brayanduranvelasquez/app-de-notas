<template>
  <div>
    <Nuxt />
    {{ Modo }}
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";

  export default {

    methods: {
      ...mapMutations(['CambiarModo'])
    },

    computed: {
      ...mapState(['modoOscuro']),

      Modo(){
        if(this.modoOscuro){
          let body = document.body;
          body.style.background = "#202020";
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
      // Y se comprueba si la ultima vez, se dejo en modoOscuro. De ser asi, se ejecuta el metodo para cambiarlo.
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