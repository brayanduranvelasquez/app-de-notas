<template>
    <div class="tarjeta">
        <div class="tarjeta__contenido" @click="VerNota">
            <div class="tarjeta__contenido-encabezado">
                <p>{{ titulo }}</p>
            </div>
            <div class="tarjeta__contenido-cuerpo">
                {{ NotaCorta }} <!-- computed -->
            </div> 
            <div class="tarjeta__contenido-pie">
                <i class="fa fa-clock"></i><p> {{ FechaCreacionOModificacion }}  </p>
            </div>
        </div>

        <div class="tarjeta__acciones">
            <div class="tarjeta__acciones-editar" @click="EditarNota">
                <i class="fa fa-pen"></i><p>Editar</p>
            </div>

            <div class="tarjeta__acciones-eliminar" @click="EliminandoNota">
                <i class="fa fa-trash"></i><p>Eliminar</p>
            </div>
        </div>
    </div>
</template>

<script>
  import navegacion from "@/mixins/navegacion.js";
  import { mapMutations } from "vuex";
  import alertify from "alertifyjs";

  export default {
    mixins: [navegacion],
        name: 'Tarjeta',

        props: {
            titulo: String,
            nota: String,
            id: Number,

            creacion: Object,
            modificacion: Object
        },

        computed: {
            NotaCorta(){
                let nota = this.nota;

                if(nota.length > 100){
                    return nota.substring(0, 100) + "...";
                } 

                else {
                    return nota;
                }
                
            },    
            FechaCreacionOModificacion(){
                // Verifica primero si existe el dia modificado. De ser asi, mostrara la ultima modificacion. Sino, mostrara la fecha de creacion. Tambien comprobara si el dia el igual o si es otro dia, para mostrar un mensaje como "Hoy", y "Ayer" (referencia a cuando fue creada/modificada)

                let date = new Date();
                let dia = date.getDate();

                if(this.modificacion.dia){
                    let hora = this.modificacion.hora;
                    let amOPm = (hora > 12) ? 'pm' : 'am';
                    let horas12 = (hora > 12) ? hora - 12 : hora;
                    let horaProcesada = (horas12 < 10) ? '0' + horas12 : horas12;

                    let minuto = (this.modificacion.minuto < 10) ? '0' + this.modificacion.minuto : this.modificacion.minuto;

                    if(dia == this.modificacion.dia){
                        return `${horaProcesada}:${minuto}${amOPm}`
                    }

                    else if(dia == this.modificacion.dia+1){
                        return `Ayer`
                    }

                    else {
                        return `${this.modificacion.dia} / ${this.modificacion.mes} / ${this.modificacion.año}`
                    }
                }

                else {
                    let hora = this.creacion.hora;
                    let amOPm = (hora > 12) ? 'pm' : 'am';
                    let horas12 = (hora > 12) ? hora - 12 : hora;
                    let horaProcesada = (horas12 < 10) ? '0' + horas12 : horas12;

                    let minuto = (this.creacion.minuto < 10) ? '0' + this.creacion.minuto : this.creacion.minuto;

                    if(dia == this.creacion.dia){
                        return `${horaProcesada}:${minuto}${amOPm}`
                    }

                    else if(dia == this.creacion.dia+1){
                        return `Ayer`
                    }

                    else {
                        return `${this.creacion.dia} / ${this.creacion.mes} / ${this.creacion.año}`
                    }
                }
                
            }
        },

        methods: {
            ...mapMutations(['EliminarNota']),

            VerNota(){
                this.IrA(`/ver-nota/${btoa(this.id)}`);
            },
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
                        La nota está titulada como: <br><br> <b><i>"${this.titulo}"</i></b>.
                    </span>`;

                alertify.confirm(
                    'Eliminar', // Titulo
                    mensaje, // Mensaje
                    () => { 
                        this.EliminarNota(this.id); 
                        alertify.success("Nota eliminada");
                    }, // Presionar que si
                    function(){} // Presionar que no
                ).set('labels', { ok: 'Eliminar', cancel: 'Cancelar' })
                .set('transition', 'fade')
                .set('movable', false);

            }
        },
    }
</script>

<style lang="scss">
    @import "@/assets/scss/_colores.scss";
    // Resolucion -> Dispositivos pequeños -> 320px de ancho
    
    .tarjeta {
        font-size: 16px;
        border: 1px solid $color-gris;
        border-radius: 5px;
        width: 100%;
        margin: 15px 0;

        display: grid;
        grid-template-columns: 80% 20%;
        grid-template-areas: 
            "nota-encabezado acciones" 
            "nota-cuerpo acciones" 
            "nota-pie acciones";

            &:hover {
                background: rgb(253, 253, 253);
                cursor: pointer;
            }  

        &__contenido {

            &-encabezado {
                grid-area: nota-encabezado;
                font-size: calc(1em + 4px);
                font-weight: 600;
                margin: 10px 12px;
                word-break: break-all;
            }

            &-cuerpo {
                grid-area: nota-cuerpo;
                font-size: 1em;
                margin: 6px 12px;
                word-break: break-all;
            }

            &-pie {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                grid-area: nota-pie;
                text-align: right;
                font-size: calc(1em - 4px);
                margin: 6px 12px;
                word-break: break-all;

                p, i {
                    text-align: right;
                    margin-left: 3px;
                    color: rgb(160, 160, 160);
                }
            }
        }

        &__acciones {
            border-left: 1px solid #ccc;
            grid-area: acciones;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;

            &-editar, &-eliminar {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                flex-direction: column;

                height: 50%;
                box-sizing: border-box;
                width: 100%;
                border-bottom: 1px solid $color-gris;
                
                i, p {
                    color: #888;
                    font-size: calc(1em - 2px);
                }

                &:hover {
                    background: rgb(226, 226, 226);
                    cursor: pointer;
                }

                &:active {
                    background: rgb(211, 211, 211);
                }
                
            }
        }
    }

</style>