<template>
  <main class="inicio">
    <section class="inicio__titulo">
      <p>Notas Guardadas</p>
    </section>

    <hr>

    <section class="inicio__tarjetas">
      <tarjeta></tarjeta>
      <tarjeta></tarjeta>
      <tarjeta></tarjeta>
    </section>
  </main>
</template>

<script>
  import Tarjeta from "@/components/Tarjeta.vue";

  export default {
    head: {
      title: 'Notas'
    },
    components: {
      Tarjeta
    }
  }
</script>

<style lang="scss">

  .inicio {
    width: 90%;
    max-width: 650px;
    background: #fff;
    box-shadow: 0px 0px 1px 1px rgb(233, 233, 233);
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    padding: 30px 25px;
    border-radius: 10px;

    &__titulo {
      margin-bottom: 20px;

      p {
        display: inline-block;
        font-size: 30px;
        border-bottom: 2px solid rgb(33, 131, 230);
        margin-bottom: 10px;
      }

    }
  }

  hr {
    margin-bottom: 25px;
  }

</style>