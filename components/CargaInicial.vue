<template>
  <div class="carga-inicial">
    <header class="carga-inicial__encabezado">
    </header>

    <main class="inicio__contenido">
    </main>
  </div>
</template>

<script>
    export default {
        name: 'CargaInicial',
    }
</script>

<style lang="scss">
  @import "@/assets/scss/_colores.scss";
  // Resolucion -> Dispositivos pequeños -> 320px de ancho

  .carga-inicial {
    width: 100%;
    height: 100vh;
    background: $color-blanco;
    margin: auto;

    &__encabezado {
      width: 100%;
      padding: 24px 0px;
      box-shadow: 1px 1px 0px 0px rgb(212, 212, 212);
      position: fixed;
      top: 0;
      background: $color-blanco;
    }

    &__contenido {
      background: $color-blanco;
      padding: 0px 15px;
      padding-top: 65px;
      margin: auto;
      width: 100%;
      max-width: 750px;
    } 
  }

</style>