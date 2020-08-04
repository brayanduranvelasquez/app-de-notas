<template>
  <div class="inicio">
    <header 
      class="encabezado"
      :class="{'encabezado--oscuro' : modoOscuro}"
    >
      <div class="encabezado__titulo--inicio"> <!-- Es el titulo, en este caso -->
        <p>Notas</p>
      </div>
      <div 
        class="encabezado__acciones" 
        :class="{'encabezado__acciones--oscuro' : modoOscuro}"
      >
        <i 
          :class="{'fa fa-sun' : modoOscuro, 'fa fa-moon' : !modoOscuro}"
          @click="CambiarModo"
          title="Cambiar de modo Claro a Oscuro, y viceversa"
        ></i>
        <i 
          class="fa fa-info-circle" 
          title="Acerca de"
          @click="IrA('/inicio/acerca-de')"
        ></i>
      </div> 
    </header>

    <transition name="transicion-izquierda" mode="in-out" appear>
      <main class="inicio__contenido">

        <section class="inicio__contenido-acciones"> 
          <article class="inicio__contenido-acciones-agregar centrar">
            <button 
              class="boton boton--gris" 
              @click="IrA('/agregar-nota')">
               <i class="fa fa-plus"></i> Agregar Nueva Nota 
            </button>
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

    data(){
      return {
        // Ver el metodo "Desplazamiento"
        guardarValorDesplazamiento: false,
        posicionScroll: 0,
      }
    },

    components: {
      Tarjeta
    },

    methods: {
      ...mapMutations(['CargarNotasAlStore', 'CambiarModo']),

      CargarNotas(){
        // Obtiene todas las notas guardadas en el localStorage, las manda al store y ese mismo, sera el encargado de mostrarlo como un computed.
        let notasGuardadas = JSON.parse(localStorage.getItem('notas'));

        if(notasGuardadas != null){
          this.CargarNotasAlStore(notasGuardadas);
        } 

      },

      Desplazamiento(){
        this.guardarValorDesplazamiento = true; 
        // Para poder guardar el valor de la posicion de desplazamiento que tiene el usuario, para que al volver a esta vista, lo lleve exactamente a donde estaba.

        window.addEventListener('scroll', () => {
          if(this.guardarValorDesplazamiento){
            // Se guarda el valor de la posicion en la sessionStorage
            let desplazamiento = document.documentElement.scrollTop;
            sessionStorage.setItem('desplazamiento', desplazamiento);
          }
        })

        // Y este mismo metodo, se encargara de dirigir al usuario a la posicion de desplazamiento donde estaba. Ya que este metodo sera llamado en el ciclo de vida "mounted"
        let desplazamiento = sessionStorage.getItem('desplazamiento');
        if(desplazamiento){
          window.scroll(0, desplazamiento);
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

      setTimeout(() => {
        this.Desplazamiento();
      }, 100); // Para que un milisegundo despues, de haber montado el DOM, ya este cargado todo el scroll que se deba hacer.
      
    },

    beforeDestroy(){ 
      // False, para que en las otras rutas no guarde el valor del desplazamiento
      this.guardarValorDesplazamiento = false;
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

  .inicio__contenido-notas-vacio-oscuro {
    i {
      color: $color-gris-terciario;
    }

    p {
      color: $color-gris-terciario;
    }
  }
</style>