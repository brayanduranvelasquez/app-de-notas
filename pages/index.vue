<template>
  <div class="inicio">
    <header class="inicio__encabezado">
      <div class="inicio__encabezado-titulo">
        <p>Notas</p>
      </div>
    </header>

    <transition name="transicion-izquierda" mode="in-out" appear>
      <main class="inicio__contenido">

        <section class="inicio__contenido-acciones"> 
          <article class="inicio__contenido-acciones-agregar central" @click="IrA('/agregar-nota')">
            <button class="boton boton--gris"> <i class="fa fa-plus"></i> Agregar Nueva Nota </button>
          </article> 
        </section>

        <section class="inicio__contenido-notas">

          <article class="inicio__contenido-notas-guardadas">
            <template v-if="notasGuardadas == null">

              <article class="inicio__contenido-notas-vacio">
                <i class="fa fa-pen"></i>
                <p>No hay notas guardadas hasta ahora.</p>
              </article>

            </template>

            <template v-else>

              <div v-for="(item, index) of notasGuardadas" :key="index">
                <tarjeta
                  :titulo="item.titulo"
                  :nota="item.nota"
                  :id="index"

                  :creacionDia="item.creacion.dia"
                  :creacionMes="item.creacion.mes"
                  :creacionAno="item.creacion.año"
                >
                </tarjeta>
              </div>

            </template>
          </article>

        </section>
      </main>
    </transition>

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

    data(){
      return {
        notasGuardadas: null
      }
    },

    methods: {
      IrA(ruta){
        this.$router.push(ruta);
      }
    },

    mounted(){
      let notasGuardadas = JSON.parse(localStorage.getItem('notas'));

      if(notasGuardadas == null){
        this.notasGuardadas = null;
      } 
      
      else {
        this.notasGuardadas = notasGuardadas;
      }
      
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .inicio {
    overflow: hidden; // Para no desconfigurar la pagina al momento de la transicion
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