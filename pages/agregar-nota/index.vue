<template>
  <div class="agregar">
      <header 
        class="encabezado"
        :class="{'encabezado--oscuro' : modoOscuro}"
      >
        <div class="encabezado__regresar" @click="Retroceder">
          <i class="fa fa-arrow-left"></i>
        </div>
        
        <div class="encabezado__titulo">
          <p>Nueva Nota</p>
        </div>

        <div 
          class="encabezado__acciones"
          :class="{'encabezado__acciones--oscuro' : modoOscuro}"
        >
          <i 
            class="fa fa-save" 
            title="Guardar esta nota"
            @click="GuardarNota"
          ></i>
        </div>
      </header>

      <transition name="transicion-derecha" mode="out-in" appear>

        <main class="agregar__contenido">
          <section class="agregar__contenido-formulario">

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
                  placeholder="Agregue el contenido de su nueva nota" 
                  id="inputNota"
                  maxlength="10000"
                  v-model="nota" 
                >
                </textarea>
              </div> <!-- Textarea -> Nota -->

              <div class="centrar">
                <button class="boton boton--gris" @click="GuardarNota">
                  <i class="fa fa-save"></i> Guardar la nota
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

    head: {
      title: 'Agregar una nueva nota'
    },

    data() {
      return {
        titulo: '', // Todo el texto que este en el input para el titulo de la nota
        nota: '', // Todo el texto que este en el input para la nota a guardar

        seEscribio: false // True cuando se haya escrito algo en los inputs para permitir, si al dar en el clic en el boton de regresar, mostrar una alerta
      }
    },

    methods: {
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

          // Se registrara el momento en que se creó la nota
          let fecha = new Date;

          let diaF = fecha.getDate();
          let mesF = 1 + fecha.getMonth(); // +1 porque empieza desde Enero = 0
          let añoF = fecha.getFullYear();

          let horaF = fecha.getHours();
          let minutosF = fecha.getMinutes();
          let segundosF = fecha.getSeconds();

          // Se crea un objeto que contendra los datos de la nota
          let nuevaNota = {
            titulo: this.titulo.trim(),
            nota: this.nota.trim(),

            creacion: {
              dia: diaF,
              mes: mesF,
              año: añoF,
              hora: horaF,
              minuto: minutosF,
              segundo: segundosF
            },

            modificacion: {
              dia: null,
              mes: null,
              año: null,
              hora: null,
              minuto: null,
              segundo: null
            }
          };

          // Se extraen los datos almacenados
          let notasGuardadas = JSON.parse(localStorage.getItem('notas'));

          if (notasGuardadas == null) {
            // Si esta vacio, quiere decir que no existian notas. Y alli, es donde se hace la utilidad un arreglo de objetos. Para que cuando se agregue otra nota, se vayan agregando a este arreglo. El cual sera almacenado en el localStorage
            let arreglo = [nuevaNota];

            // Y ahora, se guarda el valor en el localStorage
            localStorage.setItem('notas', JSON.stringify(arreglo))

            this.IrA('/'); // Redireccionar a la vista inicial
          } 
          
          else {
            // Ahora, si contiene algo esta variable, quiere decir que hay notas guardadas. Por lo tanto, se deben agregar al principio arreglo de objetos anteriormente creado de la extraccion del localStorage

            // ¿Por que al principio? asi se van ordenando desde la mas nueva, a la mas vieja

            notasGuardadas.unshift(nuevaNota);

            // Y ahora, solo queda convertirlo en string y guardar nuevamente, con la nueva nota agregada al arreglo de objetos
            localStorage.setItem('notas', JSON.stringify(notasGuardadas));

            this.IrA('/'); // Redireccionar a la vista inicial

          }

          alertify.success('Se ha guardado la nota');
          sessionStorage.setItem('desplazamiento', 0);

        }

      },

      Retroceder() {
        // Si se escribio algo en el input, o en el textarea, mostrara la alerta. Sino, solo regresara a la pagina anterior..

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

      }
    },

    computed: {
      ...mapState(['modoOscuro']),

      tamanoLetrasEnInputNota() {
        return 10000 - this.nota.length;
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .agregar {
    width: 100%;
    background: inherit;
    color: inherit;
    margin: auto;
    font-size: 16px;

    &__contenido {
      padding: 0px 15px;
      margin: auto;
      padding-top: 50px;
      width: 100%;
      max-width: 750px;
      margin-bottom: 25px;

      // Las class de .formulario y .boton se encuentran en la carpeta assets/scss y estan registrados en el nuxt.config.js como "global CSS"

    }

  } 

</style>