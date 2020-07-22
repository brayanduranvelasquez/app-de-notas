<template>
  <div class="ver">
    <header class="ver__encabezado">
      <div class="ver__encabezado-regresar" @click="IrA('/')">
        <i class="fa fa-arrow-left"></i>
      </div>
      
      <div class="ver__encabezado-titulo">
        <p>Nota</p>
      </div>

      <div class="ver__encabezado-acciones">
        <i class="fa fa-copy"></i>
      </div>
    </header>

    <transition name="transicion-derecha" mode="out-in" appear>
      <main class="ver__contenido" v-if="nota">
        <section class="ver__contenido-nota">

          <div class="ver__contenido-nota-titulo">
            Titulo: {{ nota.titulo }}
          </div>

          <div class="ver__contenido-nota-fechas">
            <div>
              Creada: {{ creacionNota }}
            </div>

            <div v-if="modificada">
              Ultima moficación: {{ modificacionNota }}
            </div>
          </div>

          <div class="ver__contenido-nota-acciones">
            <button class="boton boton--gris" @click="EditarNota">
              <i class="fa fa-pen"></i> Editar nota
            </button>
            <button class="boton boton--gris" @click="EliminarNota">
              <i class="fa fa-trash"></i> Eliminar nota
            </button>
            <button class="boton boton--gris">
              <i class="fa fa-copy"></i> Copiar a portapapeles
            </button>
          </div>

          <div class="ver__contenido-nota-detalle">{{ this.nota.nota }}</div>

        </section>
      </main>
    </transition>
  </div>
</template>

<script>

  export default {
    head: {
      title: 'Nota'
    },

    data(){
      return {
        nota: null, // Se llena con todo el arreglo. Insertado en el ciclo de vida beforeMount.
        modificada: false // Hace enfasis a que la nota fue modificada. Asi se podra mostrar o no en el HTML.
      }
    },

    methods: {
      IrA(ruta){
        this.$router.push(ruta);
      },
      EditarNota(){
        this.$router.push(`/editar-nota/${this.$route.params.id}`);
      },
      EliminarNota(){
        this.$router.push(`/eliminar-nota/${this.$route.params.id}`);
      },
    },

    computed: {
      creacionNota(){
        return `${this.nota.creacion.dia} / ${this.nota.creacion.mes} / ${this.nota.creacion.año} - A las ${this.nota.creacion.hora} horas con ${this.nota.creacion.minuto} minutos.`
      },
      modificacionNota(){
        return `${this.nota.modificacion.dia} / ${this.nota.modificacion.mes} / ${this.nota.modificacion.año} - A las ${this.nota.modificacion.hora} horas con ${this.nota.modificacion.minuto} minutos.`
      }
    },

    beforeMount(){
      let localNotas = localStorage.getItem('notas');
      let notas = JSON.parse(localNotas);

      // Se extraen todas las notas del localStorage, y gracias al parametro recibido, se insertan los valores en el titulo y la nota del data de esta vista...

      // Si existe aunque sea el dia de la modificacion de la nota, el valor de la data de esta vista cambiara a true y asi mostrar la fecha de modificacion
      if(notas[this.$route.params.id].modificacion.dia){
        this.modificada = true;
      }

      //Y, toda la nota es enviada al data de esta vista para poder mostrar los datos, mandar a los diferentes links, etc.
      this.nota = notas[this.$route.params.id];

      }
  }

</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .ver {
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
      grid-template-areas: "regresar titulo acciones";
      grid-template-columns: 50px 70% auto;

      &-regresar {
        grid-area: regresar;
        padding: 12px 16px;

        &:hover {
          background: $color-gris-secundario;
          cursor: pointer;
        }

        &:active {
          background: $color-gris-terciario;
        }

        i {
          font-size: calc(1em + 6px);
        }
        
      }

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
          color: #ccc;
          font-size: calc(1em + 4px);
          margin-right: 16px;

          &:hover {
            color: rgb(177, 177, 177);
            cursor: pointer;
          }
          
          &:active {
            color: rgb(129, 129, 129);
          }
        }

        
      }

    }

    &__contenido {
      padding: 0px 15px;
      margin: auto;
      width: 100%;
      max-width: 750px;
      margin-bottom: 25px;

      &-nota {

        &-titulo {
          font-size: calc(1em + 8px);
          font-weight: 600;
        }

        &-fechas {
          font-size: calc(1em + 2px);
          color: rgb(114, 114, 114);
          margin-bottom: 18px;
        }

        &-acciones {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          
          .boton {
            margin-bottom: 4px;
            margin-left: 4px;
            width: 45%;
            border-radius: 10px;
          }
        }

        &-detalle {
          word-wrap: break-word;
          white-space: pre-line;
          margin-top: 12px;
          font-size: calc(1em + 2px);
        }
      }
    }

  } 
  

</style>