// Llamada "navegacion" porque entre sus dos metodos, "regresar" permite ir una pagina atras (como si le dieras clic en el boton de ir atras del navegador), y "irA" permite ir a una pagina en especifico.

export default {
    methods: {
        Regresar(){
            this.$router.go(-1);
        },
        IrA(ruta){
            this.$router.push(ruta);
        }
    },
}