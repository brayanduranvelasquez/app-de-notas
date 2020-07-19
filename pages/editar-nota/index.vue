<template>
  <div class="editar">
    <header class="editar__encabezado">
      <div class="editar__encabezado-regresar" @click="IrA('/')">
        <i class="fa fa-arrow-left"></i>
      </div>
      
      <div class="editar__encabezado-titulo">
        <p>Editar Nota</p>
      </div>

      <div class="editar__encabezado-acciones">
        <i class="fa fa-save"></i>
      </div>
    </header>

    <main class="editar__contenido">

      <section class="editar__contenido-formulario">

        <div class="formulario">

          <div class="formulario__grupo">
            <label for="titulo">Título:</label>
            <input type="text" placeholder="Titulo de la nota">
          </div>

          <div class="formulario__grupo">
            <label for="descripcion">Nota:</label>
            <textarea placeholder="Contenido de la nota"></textarea>
          </div>

          <div class="central">
            <button class="boton boton--gris"><i class="fa fa-save"></i> Guardar cambios </button>
          </div>
          
        </div>

      </section>
      
    </main>
  </div>
</template>

<script>

  export default {
    head: {
      title: 'Editar nota'
    },
    methods: {
      IrA(ruta){
        this.$router.push(ruta);
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .editar {
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