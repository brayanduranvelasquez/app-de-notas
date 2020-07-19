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
        <i class="fa fa-save"></i>
      </div>
    </header>

    <main class="agregar__contenido">

      <section class="agregar__contenido-formulario">
        <div class="formulario">

          <div class="formulario__grupo">
            <label for="titulo">Título:</label>
            <input type="text" placeholder="Titulo para la nota">
          </div>

          <div class="formulario__grupo">
            <label for="descripcion">Nota:</label>
            <textarea placeholder="Agregue el contenido de su nueva nota"></textarea>
          </div>

          <div class="formulario__boton">
              <button><i class="fa fa-save"></i> Guardar la nota</button>
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
    methods: {
      IrA(ruta){
        this.$router.push(ruta);
      }
    }
  }

</script>

<style lang="scss">
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .agregar {
    width: 100%;
    background: #fff;
    margin: auto;
    font-size: 16px;
    margin-top: 75px;

    &__encabezado {
      width: 100%;
      box-shadow: 1px 1px 0px 0px rgb(212, 212, 212);
      position: fixed;
      top: 0;
      background: white;
      display: grid;
      grid-template-areas: "regresar titulo acciones";
      grid-template-columns: 50px 70% auto;

      &-regresar {
        grid-area: regresar;
        padding: 12px 16px;

        &:hover {
          background: rgb(219, 219, 219);
          cursor: pointer;
        }

        &:active {
          background: rgb(199, 199, 199);
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
            color: rgb(141, 141, 141);
            cursor: pointer;
          }
        }

      }

    }

    &__contenido {
      padding: 0px 15px;
      margin: auto;
      width: 100%;
      max-width: 750px;
    }

  } 

  .formulario {
    width: 100%;

    &__grupo {
      display: flex;
      flex-direction: column;
      margin-top: 18px;

      label{
        font-weight: 600;
        font-size: calc(1em + 8px);
      }

      input {
        font-size: calc(1em + 6px);
        margin-top: 10px;
        padding: 6px;
        border: none;
        outline: none;
        border: 1px solid rgb(185, 185, 185);
        border-radius: 5px;

        &::placeholder {
          color: rgb(196, 196, 196);
          font-size: calc(1em - 2px);
        }

        &:hover, &:focus {
          border: 1px solid rgb(136, 136, 136);
        }
      }

      textarea {
        border-radius: 5px;
        font-size: calc(1em + 6px);
        font-family: Arial;
        margin-top: 10px;
        margin-bottom: 12px;
        outline: none;
        padding: 6px;
        width: 100%;
        height: 70vh;

        &::placeholder {
          color: rgb(170, 170, 170);
          font-size: calc(1em - 2px);
          margin-left: 6px;
        }

        &:hover, &:focus {
          border: 1px solid rgb(136, 136, 136);
        }
      }
      
    }

    &__boton {
      width: 100%;
      text-align: center;
      margin: 12px 0px;

      button {
        background: rgb(219, 219, 219);
        font-size: 18px;
        font-weight: 500;
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

</style>