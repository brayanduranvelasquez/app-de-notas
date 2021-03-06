<template>
  <div class="editar">
    <header 
      class="encabezado"
      :class="{'encabezado--oscuro' : modoOscuro}"
    >
      <div class="encabezado__regresar" @click="Retroceder">
        <i class="fa fa-arrow-left"></i>
      </div>
      
      <div class="encabezado__titulo">
        <p>Editar Nota</p>
      </div>

      <div 
        class="encabezado__acciones"
        :class="{'encabezado__acciones--oscuro' : modoOscuro}"
      >
        <i 
          class="fa fa-save" 
          title="Guardar cambios"
          @click="GuardarNota">
        </i>
      </div>
    </header>

    <transition name="transicion-derecha" mode="out-in" appear>

      <main class="editar__contenido">
        <section class="editar__contenido-formulario">

          <div class="formulario">

            <div class="formulario__grupo">
              <label class="formulario__grupo-label" for="inputTitulo">Título:</label>
              <input
                @keyup="VerificandoInputTitulo"
                class="formulario__grupo-input" 
                :class="{'formulario__grupo-input--oscuro' : modoOscuro}"
                type="text" 
                maxlength="50"
                placeholder="Titulo para la nota" 
                id="inputTitulo"
                v-model="titulo" 
              >
            </div> <!-- Input -> Titulo -->

            <div class="formulario__grupo">
              <label class="formulario__grupo-label" for="inputNota">Nota:</label>

              <div style="text-align: right">
                {{ tamanoLetrasEnInputNota }}
              </div>
              
              <textarea 
                @keyup="VerificandoInputNota"
                class="formulario__grupo-textarea"
                :class="{'formulario__grupo-textarea--oscuro' : modoOscuro}" 
                placeholder="Agregue el contenido para su nota" 
                maxlength="10000"
                id="inputNota"
                v-model="nota" 
              >
              </textarea>
            </div> <!-- Textarea -> Nota -->

            <div class="centrar">
              <button class="boton boton--gris" @click="GuardarNota">
                <i class="fa fa-save"></i> Guardar cambios
              </button>
            </div> <!-- Button -> Guardar -->
          </div>

        </section>
      </main>
    </transition>
  </div>
</template>

<script>

  import navegacion from "@/mixins/navegacion.js";
  import { mapState, mapMutations } from "vuex";
  import alertify from "alertifyjs";

  export default {
    mixins: [navegacion],

    middleware: 'existencia-nota',

    head: {
      title: 'Editando esta nota'
    },

    data() {
      return {
        titulo: '', // Todo el texto que este en el input para el titulo de la nota
        nota: '', // Todo el texto que este en el input para la nota a guardar

        seEscribio: false, // True cuando se haya escrito algo en el input o textarea para permitir, si al dar en el clic en el boton de regresar, mostrar una alerta

        id: null, // Parametro. Nos ayuda a saber la posicion de esta nota en el arreglo de objetos. Cambia y toma el su valor en el ciclo de vida "beforeMount"
      }
    },

    methods: {
      ...mapMutations(['CargarNotasAlStore']),

      VerificandoInputTitulo() { 
        this.seEscribio = true;

        if (this.titulo.length > 50) {
          // Si se escribe mas, de ese limite, entonces se utilizara "substring" para restar siempre 50 y asi no permitir escribir mas.

          this.titulo = this.titulo.substring(0, 50);
        }
      },

      VerificandoInputNota() {
        this.seEscribio = true;

        if (this.nota.length > 10000) {
          // Si se escribe mas, de ese limite, entonces se utilizara "substring" para restar siempre 10000 y asi no permitir escribir mas.

          this.nota = this.nota.substring(0, 10000);
        }
      },

      GuardarNota() {
        // Estas variables seran de utilizada para enfocar el input / textarea, si contienen errores de superar los limites, o estar vacios.
        let inputTitulo = document.getElementById('inputTitulo');
        let inputNota = document.getElementById('inputNota');

        // Y estas variable, seran para poder saber si el usuario no ingreso solo espacios en blanco
        let titulo = this.titulo.trim();
        let nota = this.nota.trim();

        if (titulo == '') {
          inputTitulo.focus();
          window.scroll({
            top: 1,
            behavior: "smooth"
          });
          alertify.error('No escribió un titulo para la nota');
        } 
        
        else if (nota == '') {
          inputNota.focus();
          window.scroll({
            top: 100,
            behavior: "smooth"
          });
          alertify.error('No escribió la nota a guardar');
        } 
        
        else if (titulo.length > 0 && nota.length > 0) {
          // Se registrara el momento en que se edito la nota
          let fecha = new Date;

          let diaF = fecha.getDate();
          let mesF = 1 + fecha.getMonth(); // +1 porque empieza desde Enero = 0
          let añoF = fecha.getFullYear();

          let horaF = fecha.getHours();
          let minutosF = fecha.getMinutes();
          let segundosF = fecha.getSeconds();

          // Se extraen los datos almacenados
          let notasGuardadas = JSON.parse(localStorage.getItem('notas'));

          // Se crea un objeto con los datos de la nota, mas los datos de la nota guardada proveniente del arreglo de objetos
          let notaModificada = {
            titulo: this.titulo.trim(),
            nota: this.nota.trim(),

            creacion: {
              dia: notasGuardadas[this.id].creacion.dia,
              mes: notasGuardadas[this.id].creacion.mes,
              año: notasGuardadas[this.id].creacion.año,
              hora: notasGuardadas[this.id].creacion.hora,
              minuto: notasGuardadas[this.id].creacion.minuto,
              segundo: notasGuardadas[this.id].creacion.segundo
            },

            modificacion: {
              dia: diaF,
              mes: mesF,
              año: añoF,
              hora: horaF,
              minuto: minutosF,
              segundo: segundosF
            },
          };

          // De las notas guardadas, se elimina la nota que fue editada
          notasGuardadas.splice(this.id, 1);

          // Para ahora agregar la nota modificada, y asi quede en la primera posicion del arreglo. Esto es necesario para poder ordenar desde el mas modificado, al mas antiguo
          notasGuardadas.unshift(notaModificada);

          // Solo queda convertirlo en string y guardar nuevamente, con la nueva editada en el arreglo de objetos
          localStorage.setItem('notas', JSON.stringify(notasGuardadas));

          // Y actualizar el store para que obtenga los nuevos valores
          this.CargarNotasAlStore(notasGuardadas);

          alertify.success('Se ha editado la nota');
          sessionStorage.setItem('desplazamiento', 0);

          // Y ahora se dirige a ver la nota, y como esta en la primera posicion, siempre va a la posicion 0
          this.IrA(`/ver-nota/${btoa(0)}`);

        }

      },

      Retroceder() {
        // Si se escribio algo en los inputs, mostrara la alerta. Sino, solo regresara a la pagina anterior..

        if (this.seEscribio) {
          // Class para las botones
          alertify.defaults.theme.ok = "boton-alertify boton-alertify--positivo";
          alertify.defaults.theme.cancel = "boton-alertify boton-alertify--negativo";

          alertify.confirm(
              'Regresar', // Titulo
              '<span style="font-size: 18px;"><b>¿Usted desea regresar?</b><br> Lo que ha escrito hasta ahora, no será guardado.</span>', // Mensaje
              () => {
                this.Regresar()
              }, // Presionar que si
              function () {} // Presionar que no
            ).set('labels', {
              ok: 'Regresar',
              cancel: 'No'
            })
            .set('transition', 'fade')
            .set('movable', false);

        } 
        
        else {
          this.Regresar(); // proviene del mixin
        }

      },

    },

    computed: {
      ...mapState(['modoOscuro']),

      tamanoLetrasEnInputNota() {
        return 10000 - this.nota.length
      }
    },

    beforeMount() {
      // Se extraen todas las notas del localStorage, y gracias al parametro recibido, se insertan los valores en el titulo y la nota del data de esta vista...

      let localNotas = localStorage.getItem('notas');
      let notas = JSON.parse(localNotas);

      let id = atob(this.$route.params.id);
      this.id = id;

      this.titulo = notas[id].titulo;
      this.nota = notas[id].nota;
    }
  }

</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .editar {
    width: 100%;
    background: inherit;
    margin: auto;
    font-size: 16px;

    &__contenido {
      padding: 0px 15px;
      padding-top: 50px;
      margin: auto;
      width: 100%;
      max-width: 750px;
      margin-bottom: 25px;

      // Las class de .formulario y .boton se encuentran en la carpeta assets/scss y estan registrados en el nuxt.config.js como "global CSS"
    }

  } 

</style>