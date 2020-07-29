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
        <i class="fa fa-pen" @click="EditarNota"></i>
        <i class="fa fa-trash" @click="EliminandoNota"></i>
        <i class="fa fa-copy" @click="CopiarNota" v-if="soporteCopiar"></i>
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
            <button class="boton boton--gris" @click="EliminandoNota">
              <i class="fa fa-trash"></i> Eliminar nota
            </button>
            <button class="boton boton--gris" @click="CopiarNota" v-if="soporteCopiar">
              <i class="fa fa-copy"></i> Copiar Nota
            </button>
          </div>

          <div class="ver__contenido-nota-detalle">{{ this.nota.nota }}</div>

        </section>
      </main>
    </transition>
  </div>
</template>

<script>
  import navegacion from "@/mixins/navegacion.js";
  import { mapMutations } from "vuex";
  import alertify from "alertifyjs";

  export default {
    mixins: [navegacion],
    head: {
      title: 'Nota'
    },

    data(){
      return {
        nota: null, // Se llena con todo el arreglo de el id correspondiente (index). Insertado en el ciclo de vida beforeMount.

        modificada: false, // Hace enfasis a que la nota fue modificada. Asi se podra mostrar o no en el HTML.

        id: null, // Parametro. Nos ayuda a saber la posicion de esta nota en el arreglo de objetos.

        soporteCopiar: false // Pasa a true, si existe el soporte para el comando de copiar.
      }
    },

    methods: {
      ...mapMutations(['EliminarNota']),
      
      EditarNota(){
        this.IrA(`/editar-nota/${btoa(this.id)}`);
      },

      EliminandoNota(){

        // Class para las botones
        alertify.defaults.theme.ok = "boton-alertify boton-alertify--positivo";
        alertify.defaults.theme.cancel = "boton-alertify boton-alertify--negativo";

        let mensaje = `
          <span style="font-size: 18px; word-wrap: break-word;">
              <b>¿Usted desea eliminar una nota?</b>
              La nota está titulada como: <br><br> <b><i>"${this.nota.titulo}"</i></b>.
          </span>`;

        alertify.confirm(
          'Eliminar', // Titulo
          mensaje, // Mensaje
          () => { 
            this.EliminarNota(this.id); 
            this.IrA('/');
            alertify.success("Nota eliminada");
          }, // Presionar que si
          function(){} // Presionar que no
        ).set('labels', { ok: 'Eliminar', cancel: 'Cancelar' })
          .set('transition', 'fade')
          .set('movable', false);

      },
      
      CopiarNota(){
        // Se crea un elemento "textarea". ¿Por que un textarea? para que los espacios y saltos de linea, tambien puena ser copiados.
        // Tambien, un texto que contiene la nota.
        let aux = document.createElement('textarea');
        let texto = document.createTextNode(this.nota.nota);

        // Se inserta en el BODY el textarea
        document.body.appendChild(aux);

        // Se le inserta el texto al textarea
        aux.appendChild(texto);

        // Se selecciona
        aux.select();

        // Se ejecuta el comando copiar
        document.execCommand('copy');

        // Luego, se elimina del BODY
        document.body.removeChild(aux);

        alertify.message('<b>Copiada y guardada la nota en su portapapeles</b>');
      }

    },

    computed: {
      creacionNota(){
        let date = new Date();
        let dia = date.getDate();

        let hora = this.nota.creacion.hora;
        let amOPm = (hora > 12) ? 'pm' : 'am';
        let horas12 = (hora > 12) ? hora - 12 : hora;
        let horaProcesada = (horas12 < 10) ? '0' + horas12 : horas12;

        let minuto = (this.nota.creacion.minuto < 10) ? "0" + this.nota.creacion.minuto : this.nota.creacion.minuto;

        if(dia == this.nota.creacion.dia){
          return `Hoy - ${horaProcesada}:${minuto}${amOPm}.`
        }

        else if(dia == this.nota.creacion.dia+1){
            return `Ayer - ${horaProcesada}:${minuto}${amOPm}.`
        }

        else {
            return `${this.nota.creacion.dia} / ${this.nota.creacion.mes} / ${this.nota.creacion.año} - ${horaProcesada}:${minuto}${amOPm}.`
        }

      },

      modificacionNota(){
        let date = new Date();
        let dia = date.getDate();

        let hora = this.nota.modificacion.hora;
        let amOPm = (hora > 12) ? 'pm' : 'am';
        let horas12 = (hora > 12) ? hora - 12 : hora;
        let horaProcesada = (horas12 < 10) ? '0' + horas12 : horas12;

        let minuto = (this.nota.modificacion.minuto < 10) ? "0" + this.nota.modificacion.minuto : this.nota.modificacion.minuto;

        if(dia == this.nota.modificacion.dia){
          return `Hoy - ${horaProcesada}:${minuto}${amOPm}.`
        }

        else if(dia == this.nota.modificacion.dia+1){
            return `Ayer - ${horaProcesada}:${minuto}${amOPm}.`
        }

        else {
            return `${this.nota.modificacion.dia} / ${this.nota.modificacion.mes} / ${this.nota.modificacion.año} - ${horaProcesada}:${minuto}${amOPm}.`
        }

      },

    },

    beforeMount(){
      let localNotas = localStorage.getItem('notas');
      let notas = JSON.parse(localNotas);

      let id = atob(this.$route.params.id);
      this.id = id;

      // Se extraen todas las notas del localStorage, y gracias al parametro recibido, se insertan los valores en el titulo y la nota del data de esta vista...

      // Si existe aunque sea el dia de la modificacion de la nota, el valor de la data de esta vista cambiara a true y asi mostrar la fecha de modificacion
      if(notas[id].modificacion.dia){
        this.modificada = true;
      }

      //Y, toda la nota es enviada al data de esta vista para poder mostrar los datos, mandar a los diferentes links, etc.
      this.nota = notas[id];

      /////////////////////////////////////////////////////////////////////

      if(document.queryCommandSupported('copy')){
        // Si esta soportado el comando de copiar, pasa a true y asi muestra los respectivos botones en el DOM
        this.soporteCopiar = true;
      }

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
      grid-template-columns: 50px auto auto;

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
          word-wrap: break-word;
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