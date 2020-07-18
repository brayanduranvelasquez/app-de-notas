<template>
  <div class="inicio">
    <header class="inicio__encabezado">
      <p>Notas</p>
    </header>

    <main class="inicio__contenido">

      <section class="inicio__contenido-acciones"> 
        <article class="inicio__contenido-acciones-agregar">
          <button> <i class="fa fa-plus"></i> Agregar Nueva Nota </button>
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
    }
  }
</script>

<style lang="scss">
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .inicio {
    width: 100%;
    background: #fff;
    margin: auto;
    font-size: 16px;

    &__encabezado {
      padding: 12px 16px;
      margin-bottom: 15px;
      width: 100%;
      border-bottom: 1px solid rgb(65, 65, 65);

      p {
        display: inline-block;
        font-size: calc(1em + 10px);
      }

    }

    &__contenido {
      padding: 0px 15px;

      &-acciones {

        &-agregar {
          text-align: center;

          button {
            background: rgb(219, 219, 219);
            font-size: 18px;
            outline: none;
            width: 80%;
            padding: 8px 0px;
            border: none;
            border-radius: 10px;
            text-align: center;
            color: rgb(94, 94, 94);

            i {
               color: rgb(102, 102, 102);
            }

            &:hover {
              background: rgb(209, 209, 209);
              cursor: pointer;
            }

            &:active {
              background: rgb(196, 196, 196);
            }
          }
          
        }
      }

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
            color: rgb(196, 196, 196);
            font-size: calc(1em + 40px);
            margin-bottom: 4px;
          }

          p {
            color: rgb(196, 196, 196);
            font-size: calc(1em + 7px);
            text-align: center;
          }
        }
      }
    } 
  }

</style>