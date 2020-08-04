<template>
  <div class="acerca-de">
    <header 
      class="encabezado"
      :class="{'encabezado--oscuro' : modoOscuro}"
    >
      <div class="encabezado__regresar" @click="Regresar">
        <i class="fa fa-arrow-left"></i>
      </div>
      
      <div class="encabezado__titulo">
        <p>Acerca de</p>
      </div>
    </header>

    <transition name="transicion-aparecer" mode="in-out" appear>
      <main class="acerca-de__contenido">
        <section class="acerca-de__contenido-img">
          <img src="~/assets/img.png">
        </section>

        <section class="acerca-de__contenido-detalles">
          <article class="acerca-de__contenido-detalles-version">
            <p>Notas - Version 1.0.0</p>
          </article>

          <article class="acerca-de__contenido-detalles-descripcion">
            <p>Administre sus notas. Revise, guarde, edite y elimine. Esta aplicación utiliza la memoria de su navegador para almacenarlas de manera local. Por lo tanto, su información no es enviada a ningun otro sitio.</p>
          </article>

          <article class="acerca-de__contenido-detalles-creacion">
            <p>Creada por Brayan Durán Velásquez - 2020</p>
          </article>
        </section>

        <section 
          class="acerca-de__contenido-vinculos"
          :class="{'acerca-de__contenido-vinculos--oscuro' : modoOscuro}"
        >
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-linkedin"></i></a>
          <a href="#"><i class="fab fa-github"></i></a>
        </section> 

        <section class="acerca-de__contenido-repositorio">
          <a href="#">
            Ir al repositorio para más informacion
          </a>
        </section>
      </main>
    </transition>

  </div>
</template>

<script>
  import navegacion from "@/mixins/navegacion.js";
  import { mapState } from "vuex";

  export default {
    mixins: [navegacion],
    
    head: {
      title: 'Acerca de esta aplicacion'
    },

    computed: {
      ...mapState(['modoOscuro'])
    }
  }
</script>

<style lang="scss">

  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .acerca-de {
    overflow: hidden; // Para no desconfigurar la pagina al momento de la transicion
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    min-height: 100vh;
    background: inherit;
    color: inherit;
    font-size: 16px;

    &__contenido {
      color: inherit;
      background: inherit;
      padding-top: 65px;
      padding-bottom: 45px;
      margin: auto;
      width: 100%;
      max-width: 500px;

      &-img {
        text-align: center;

        img {
          width: 100%;
          max-width: 120px;
        }
        
      }

      &-detalles {
        margin: 2px 10px;

        &-version{
          margin-bottom: 6px;
          text-align: center;
        }

        &-creacion{
          color: $color-gris-terciario;
          margin-bottom: 6px;
          text-align: center;
          padding: 4px;
        }

      }

      &-vinculos{
        text-align: center;

        i {
          color: $color-negro-secundario;
          margin: 0px 4px;
          font-size: 2.2em;
          transition: all 0.3s;
          cursor: pointer;

          &:active {
            color: $color-gris-secundario;
            transform: scale(1.1);
          }
        }
      }

      &-repositorio {
        text-align: center;

        a {
          display: inline-block;
          text-decoration: none;
          color: rgb(67, 67, 255);
          font-weight: 600;
          text-align: center;
          padding: 16px;
          margin: 4px 0;
          cursor: pointer;

          &:active {
            background-color: $color-gris;
          }
        }
        
      }
    } 
  }

  .acerca-de__contenido-vinculos--oscuro{
    i {
      color: $color-gris;
      margin: 0px 4px;
      font-size: 2em;
      transition: all 0.3s;

      &:active {
        color: $color-gris-secundario;
        transform: scale(1.1);
      }
    }
  }

</style>