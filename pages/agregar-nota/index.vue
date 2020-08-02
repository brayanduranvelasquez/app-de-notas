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
                  @keyup="verificandoInputTitulo"
                  class="formulario__grupo-input"
                  :class="{'formulario__grupo-input--error' : inputTituloError, 'formulario__grupo-input--oscuro' : modoOscuro}" 
                  type="text" 
                  placeholder="Titulo para la nota" 
                  id="inputTitulo"
                  v-model="titulo" 
                >
    
                <template v-if="inputTituloError">
                  <div class="formulario__grupo-mensaje">Entre 1 a 50 caracteres</div>
                </template>
              </div>

              <div class="formulario__grupo">
                <label class="formulario__grupo-label" for="inputNota">Nota:</label>

                <div 
                  style="text-align: right" 
                  :class="{'formulario__grupo-mensaje' : inputNotaError}"
                >
                  {{ tamanoLetrasEnInputNota }}
                </div>
                
                <textarea 
                  @keyup="verificandoInputNota"
                  class="formulario__grupo-textarea" 
                  placeholder="Agregue el contenido de su nueva nota" 
                  id="inputNota"
                  :class="{'formulario__grupo-textarea--error' : inputNotaError, 'formulario__grupo-textarea--oscuro' : modoOscuro}"
                  v-model="nota" 
                >
                </textarea>
              </div>

              <div class="centrar">
                <button class="boton boton--gris" @click="GuardarNota">
                  <i class="fa fa-save"></i> Guardar la nota
                </button>
              </div>
      
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

    data(){
      return {
        titulo: '', // Todo el texto que este en el input para el titulo de la nota
        inputTituloError: false, // Para poder mostrar un mensaje de error, debe estar en true

        nota: '', // Todo el texto que este en el input para la nota a guardar
        inputNotaError: false,

        seEscribio: false // True cuando se haya escrito algo en los inputs para permitir, si al dar en el clic en el boton de regresar, mostrar una alerta
      }
    },

    methods: {
      verificandoInputTitulo(){
        let titulo = this.titulo.trim(); // Para guardar el valor sin espaciados al lado derecho e izquierdo

        this.seEscribio = true;

        if(titulo.length >= 0 && titulo.length <= 50) {
          this.inputTituloError = false;
        }

        else if(titulo.length > 50) {
          this.inputTituloError = true; // Muestra el mensaje de error, comunicando que supera limite
        }
      },

      verificandoInputNota(){
        let nota = this.nota.trim(); // Para guardar el valor sin espaciados al lado derecho e izquierdo

        this.seEscribio = true;

        if(nota.length >= 0 && nota.length <= 5000) {
          this.inputNotaError = false;
        }

        else if(nota.length > 5000) {
          this.inputNotaError = true; // Muestra el mensaje de error, comunicando que supera limite
        }
      },

      GuardarNota() {
        // Estas variables seran de utilizada para enfocar el input / textarea, si contienen errores de superar los limites, o estar vacios.
        let inputTitulo = document.getElementById('inputTitulo');
        let inputNota = document.getElementById('inputNota');

        // Y estas variable, seran para poder saber si el usuario no ingreso solo espacios en blanco
        let titulo = this.titulo.trim();
        let nota = this.nota.trim();

        if(titulo == ''){
          inputTitulo.focus();
          window.scroll(0, 0);
          alertify.error('No escribió un titulo para la nota');
        }

        else if(this.inputTituloError){
          inputTitulo.focus();
          window.scroll(0, 0);
          alertify.error('Excede los límites de caracteres para el titulo');
        }

        else if(nota == ''){
          inputNota.focus();
          window.scroll(0, 100);
          alertify.error('No escribió la nota a guardar');
        }

        else if(this.inputNotaError){
          inputNota.focus();
          window.scroll(0, 100);
          alertify.error('Excede los límites de caracteres permitidos');
        }

        else if (!this.inputTituloError && titulo.length > 0 &&
                 !this.inputNota && nota.length > 0) {
                  // Si no existe ningun error, y hay contenido en el campo Titulo y en Textarea, se prosigue a guardar.

                  // Se registrara el momento en que se creó la nota
                  let fecha = new Date;

                  let diaF = fecha.getDate();
                  let mesF = 1 + fecha.getMonth(); // +1 porque empieza desde Enero = 0
                  let añoF = fecha.getFullYear();

                  let horaF = fecha.getHours();
                  let minutosF = fecha.getMinutes();
                  let segundosF = fecha.getSeconds();

                  // Se crea un objeto que contendra los datos de la nota
                  let nuevaNota = 
                    { 
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

                  if(notasGuardadas == null) {
                    // Si esta vacio, quiere decir que no existian notas. Y alli, es donde se hace la utilidad un arreglo de objetos. Para que cuando se agregue otra nota, se vayan agregando a este arreglo. El cual sera almacenado en el localStorage
                    let arreglo = [nuevaNota];

                    // Y ahora, se guarda el valor en el localStorage
                    localStorage.setItem('notas', JSON.stringify(arreglo ))

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
                   
                }

      },

      Retroceder(){
        // Si se escribio algo en el input, o en el textarea, mostrara la alerta. Sino, solo regresara a la pagina anterior..

        if(this.seEscribio){

          // Class para las botones
          alertify.defaults.theme.ok = "boton-alertify boton-alertify--positivo";
          alertify.defaults.theme.cancel = "boton-alertify boton-alertify--negativo";

          alertify.confirm(
            'Regresar', // Titulo
            '<span style="font-size: 18px;"><b>¿Usted desea regresar?</b><br> Lo que ha escrito hasta ahora, no será guardado.</span>', // Mensaje
            () => { this.Regresar() }, // Presionar que si
            function(){} // Presionar que no
          ).set('labels', { ok: 'Regresar', cancel: 'No' })
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
        return this.nota.length + " / 5000"
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