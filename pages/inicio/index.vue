<template>
  <div class="inicio">
    <header 
      class="inicio__encabezado"
      :class="{'inicio__encabezado-oscuro' : modoOscuro}"
    >
      <div class="inicio__encabezado-titulo">
        <p>Notas</p>
      </div>
      <div 
        class="inicio__encabezado-acciones" 
        :class="{'inicio__encabezado-acciones-oscuro' : modoOscuro}"
      >
        <i 
          :class="{'fa fa-sun' : modoOscuro, 'fa fa-moon' : !modoOscuro}"
          @click="CambiarModo"
        ></i>
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

              <article class="inicio__contenido-notas-vacio" 
                :class="{'inicio__contenido-notas-vacio-oscuro' : modoOscuro}">
                <i class="fa fa-pen"></i>
                <p>No hay notas guardadas hasta ahora.</p>
              </article>

            </template>

            <template v-else>

              <div v-for="(item, index) of notasGuardadas" :key="index" @click="CargarNotas">

                <!-- Este evento "CargarNotas" juega un papel muy importante, ya que si el usuario elimina una nota (tarjeta), automaticamente volvera a cargar las notas -->

                <tarjeta
                  :titulo="item.titulo"
                  :nota="item.nota"
                  :id="index"

                  :creacion="item.creacion"
                  :modificacion="item.modificacion"
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
  import navegacion from "@/mixins/navegacion.js";
  import { mapState, mapMutations } from "vuex";

  export default {
    mixins: [navegacion],
    
    head: {
      title: 'Notas'
    },

    components: {
      Tarjeta
    },

    methods: {
      ...mapMutations(['CargarNotasAlStore', 'CambiarModo']),

      CargarNotas(){
        let notasGuardadas = JSON.parse(localStorage.getItem('notas'));

        if(notasGuardadas != null){
          this.CargarNotasAlStore(notasGuardadas);
        } 

      }
    },

    computed: {
      ...mapState(['notas', 'modoOscuro']),

      notasGuardadas(){
        return this.notas
      }

    },

    mounted(){
      this.CargarNotas();
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .inicio {
    overflow: hidden; // Para no desconfigurar la pagina al momento de la transicion
    width: 100%;
    background: inherit;
    margin: auto;
    font-size: 16px;

    &__encabezado {
      background: $color-blanco;
      transition: all 0.3s;
      width: 100%;
      box-shadow: 1px 1px 0px 0px rgb(212, 212, 212);
      position: fixed;
      z-index: 10000;
      top: 0;
      display: grid;
      grid-template-areas: "titulo acciones";
      grid-template-columns: auto auto;

      &-titulo {
        grid-area: titulo;
        padding: 12px 0px;

          p {
            font-size: calc(1em + 5px);
            margin-left: 12px;
          }

      }

      &-acciones {
        grid-area: acciones;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        i {
          color: rgb(143, 143, 143);
          font-size: calc(1em + 4px);
          margin-right: 16px;

          &:hover {
            color: rgb(139, 139, 139);
            cursor: pointer;
          }
          
          &:active {
            color: rgb(117, 117, 117);
          }
        }
        
      }

    }

    &__contenido {
      color: inherit;
      background: inherit;
      padding: 0px 15px;
      padding-top: 65px;
      margin: auto;
      width: 100%;
      max-width: 750px;

      &-notas {

        &-vacio {
          color: inherit;
          background: inherit;
          width: 100%;
          height: 75vh;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          i {
            color: $color-gris-terciario;
            font-size: calc(1em + 40px);
            margin-bottom: 4px;
          }

          p {
            color: $color-gris-terciario;
            font-size: calc(1em + 7px);
            text-align: center;
          }
        }

      }
    } 
  }

  .inicio__encabezado-oscuro{
    background: #121212;
  }
  
  .inicio__encabezado-acciones-oscuro{
    i {
      color: $color-blanco;

      &:hover {
        color: $color-blanco-secundario;
      }
          
      &:active {
        color: $color-blanco-terciario;
      }
    }
  }

  .inicio__contenido-notas-vacio-oscuro {
    i {
      color: $color-gris-terciario;
    }

    p {
      color: $color-gris-terciario;
    }
  }
</style>