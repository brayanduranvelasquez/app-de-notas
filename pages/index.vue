<template>
  <div class="inicio">
    <header class="inicio__encabezado">
      <div class="inicio__encabezado-titulo">
        <p>Notas</p>
      </div>
    </header>

    <main class="inicio__contenido">

      <section class="inicio__contenido-acciones"> 
        <article class="inicio__contenido-acciones-agregar central" @click="IrA('/agregar-nota')">
          <button class="boton boton--gris"> <i class="fa fa-plus"></i> Agregar Nueva Nota </button>
        </article> 
      </section>

      <section class="inicio__contenido-notas">
        <!-- <article class="inicio__contenido-notas-vacio">
          <i class="fa fa-pen"></i>
          <p>No hay notas guardadas hasta ahora.</p>
        </article> -->

        <article class="inicio__contenido-notas-guardadas">
          <tarjeta></tarjeta>
          <tarjeta></tarjeta>
          <tarjeta></tarjeta>
        </article>

      </section>
    </main>
  </div>
</template>

<script>
  import Tarjeta from "@/components/Tarjeta.vue";

  export default {
    head: {
      title: 'Notas'
    },
    components: {
      Tarjeta
    },
    methods: {
      IrA(ruta){
        this.$router.push(ruta);
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .inicio {
    width: 100%;
    background: $color-blanco;
    margin: auto;
    font-size: 16px;
    margin-top: 75px;

    &__encabezado {
      width: 100%;
      box-shadow: 1px 1px 0px 0px rgb(212, 212, 212);
      position: fixed;
      top: 0;
      background: $color-blanco;
      display: grid;
      grid-template-areas: "titulo";
      grid-template-columns: auto;

      &-titulo {
        grid-area: titulo;
        padding: 12px 0px;

          p {
            font-size: calc(1em + 5px);
            margin-left: 12px;
          }

      }

    }

    &__contenido {
      padding: 0px 15px;
      margin: auto;
      width: 100%;
      max-width: 750px;

      &-notas {
        &-vacio {
          width: 100%;
          height: 75vh;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          i {
            color: $color-gris-secundario;
            font-size: calc(1em + 40px);
            margin-bottom: 4px;
          }

          p {
            color: $color-gris-secundario;
            font-size: calc(1em + 7px);
            text-align: center;
          }
        }
      }
    } 
  }

</style>