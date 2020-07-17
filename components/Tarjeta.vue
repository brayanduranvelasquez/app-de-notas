<template>
    <div class="tarjeta">
        <div class="tarjeta__encabezado" @click="verNota">
            <p>Esto es el encabezado</p>
        </div>
        <div class="tarjeta__cuerpo" @click="verNota">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nihil repellendus obcaecati, fuga ut unde doloremque saepe accusamus perferendis esse rerum ad voluptatibus? Est quasi quia totam quam quidem consequuntur!
        </div>
        <div class="tarjeta__acciones">
            <div class="tarjeta__acciones-editar" @click="editarNota">
                <p> <i class="fa fa-pen"></i> Editar</p>
            </div>

            <div class="tarjeta__acciones-eliminar" @click="eliminarNota">
                <p> <i class="fa fa-trash"></i> Eliminar</p>
            </div>
        </div>
        <div class="tarjeta__pie" @click="verNota">
            <p style="color: #888">
                 <i class="fa fa-clock" style="color: #888"></i>
                 17 / 07 / 2020
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tarjeta',
        methods: {
            verNota(){
                alert('Ver')
            },
            editarNota(){
                alert('Editar');
            },
            eliminarNota(){
                alert('Eliminar')
            }
        }
    }
</script>

<style lang="scss">
    
    .tarjeta {
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        margin: 15px 0;

        display: grid;
        grid-template-columns: 85% 15%;
        grid-template-areas: 
            "nota-encabezado acciones" 
            "nota-cuerpo acciones" 
            "nota-pie acciones";
        transition: transform 1s;

            &:hover {
                background: rgb(253, 253, 253);
                cursor: pointer;
            }  

        &__encabezado {
            grid-area: nota-encabezado;
            font-size: 24px;
            font-weight: 600;
            margin: 10px 12px;
        }

        &__cuerpo {
            grid-area: nota-cuerpo;
            font-size: 16px;
            margin: 6px 12px;
            height: 40px;
            overflow: hidden;

        }

        &__pie {
            grid-area: nota-pie;
            text-align: right;
            font-size: 14px;
            margin: 6px 12px;
        }

        &__acciones {
            border-left: 1px solid #ccc;
            grid-area: acciones;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            text-align: center;


            &-editar, &-eliminar {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;

                height: 50%;
                box-sizing: border-box;
                width: 100%;
                border-bottom: 1px solid #ccc;
                
                i, p {
                    color: #888;
                }

                &:hover {
                    background: rgb(235, 235, 235);
                    cursor: pointer;
                }

                
            }
        }
    }

</style>