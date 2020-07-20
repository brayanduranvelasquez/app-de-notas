<template>
  <div class="agregar">
    <header class="agregar__encabezado">
      <div class="agregar__encabezado-regresar" @click="IrA('/')">
        <i class="fa fa-arrow-left"></i>
      </div>
      
      <div class="agregar__encabezado-titulo">
        <p>Nueva Nota</p>
      </div>

      <div class="agregar__encabezado-acciones">
        <i class="fa fa-save" @click="GuardarNota"></i>
      </div>
    </header>

    <main class="agregar__contenido">
      <section class="agregar__contenido-formulario">

        <div class="formulario">

          <div class="formulario__grupo">
            <label class="formulario__grupo-label" for="titulo">Título:</label>
            <input
              @keyup="verificandoInputTitulo"
              class="formulario__grupo-input" 
              type="text" 
              placeholder="Titulo para la nota" 
              id="inputTitulo"
              :class="{'formulario__grupo-input--error' : inputTituloError}"
              v-model="titulo" 
            >
 
            <template v-if="inputTituloError">
              <div class="formulario__grupo-mensaje">Entre 1 a 30 caracteres</div>
            </template>
          </div>

          <div class="formulario__grupo">
            <label class="formulario__grupo-label" for="descripcion">Nota:</label>

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
              id="inputDescripcion"
              :class="{'formulario__grupo-textarea--error' : inputNotaError}"
              v-model="nota" 
            >
            </textarea>
          </div>

          <div class="central">
            <button class="boton boton--gris" @click="GuardarNota">
              <i class="fa fa-save"></i> Guardar la nota
            </button>
          </div>
  
        </div>

      </section>
    </main>
  </div>
</template>

<script>

  export default {
    head: {
      title: 'Agregar nueva nota'
    },

    data(){
      return {
        titulo: '', // Todo el texto que este en el input para el titulo de la nota
        inputTituloError: false, // Para poder mostrar un mensaje de error, debe estar en true

        nota: '', // Todo el texto que este en el input para la nota a guardar
        inputNotaError: false,
      }
    },

    methods: {
      IrA(ruta){
        this.$router.push(ruta);
      },
      
      verificandoInputTitulo(){
        let titulo = this.titulo.trim(); // Para guardar el valor sin espaciados al lado derecho e izquierdo

        if(titulo.length >= 0 && titulo.length <= 30) {
          this.inputTituloError = false;
        }

        else if(titulo.length > 30) {
          this.inputTituloError = true; // Muestra el mensaje de error, comunicando que supera limite
        }
      },

      verificandoInputNota(){
        let nota = this.nota.trim(); // Para guardar el valor sin espaciados al lado derecho e izquierdo

        if(nota.length >= 0 && nota.length <= 1000) {
          this.inputNotaError = false;
        }

        else if(nota.length > 1000) {
          this.inputNotaError = true; // Muestra el mensaje de error, comunicando que supera limite
        }
      },

      GuardarNota() {
        let inputTitulo = document.getElementById('inputTitulo');
        let inputNota = document.getElementById('inputTitulo');
        // Estas variables seran de utilizada para enfocar el input, si los input contienen errores de superar los limites, o estar vacios.

        let titulo = this.titulo.trim();
        let nota = this.nota;
        // Y estas variable, la primera guardará el valor del titulo sin espacios a la izquierda ni derecha, y la segunda solo de lo que contenta el textarea correspondiente a la nota

        if(titulo == ''){
          inputTitulo.focus();
          alert('No existe un titulo para la nota')
        }

        else if(this.inputTituloError){
          inputTitulo.focus();
          alert('Excede los limites para el titulo de la nota')
        }

        else if(nota == ''){
          inputNota.focus();
          alert('No escribió ninguna nota a guardar')
        }

        else if(this.inputNotaError){
          inputNota.focus();
          alert('Excede los limites para la nota a guardar')
        }

        else if (!this.inputTituloError && titulo.length > 0 &&
                 !this.inputNota && nota.length > 0) {
                  // Si no existe ningun error, y hay contenido en el campo Titulo y en Textarea, se prosigue a guardar.
                  
                  // Se extraen los datos almacenados
                  let notasGuardadas = JSON.parse(localStorage.getItem('notas'));

                  if(notasGuardadas == null) {
                    // Si esta vacio, quiere decir que no existian notas. Y alli, es donde se hace la utilidad de un arreglo de objetos. Para que cuando se agregue otra nota, se vayan agregando a este arreglo. EL cual sera almacenado en el localStorage

                    // Se crea arreglo de objeto. 
                    let nuevaNota = [{ titulo: this.titulo, nota: this.nota }];

                    localStorage.setItem('notas', JSON.stringify(nuevaNota))
                    alert("1era Nota guardada");
                  }
                  
                  else {
                    // Ahora, si contiene algo esta variable, quiere decir qe hay notas guardadas. Por lo tanto, se deben agregar al arreglo de objetos anteriormente creado.

                    notasGuardadas.push({
                      titulo: this.titulo,
                      nota: this.nota
                    })  

                    // Y ahora, solo queda convertirlo en string y guardar nuevamente, con la nueva nota agregada al array de objetos
                    localStorage.setItem('notas', JSON.stringify(notasGuardadas))

                  }
                   
                }

      },
    },

    computed: {
      tamanoLetrasEnInputNota() {
        return this.nota.length + " / 1000"
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .agregar {
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
    }

  } 
  

</style>