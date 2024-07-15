<template>
    <div class="modal">
        <div class="modal-header">
            <p class="modal-font"> Изменение миниатюры </p>
            <img @click="changeMiniature()" src="../assets/home-view/cancel-modal.svg" alt="">

        </div>
        <div class="modal-body">
            <div>
                <p class="text-modal modal-font">
                    Выберите область для маленьких фотографий.
                    Выбранная миниатюра будет использоваться в новостях, личных сообщениях и комментариях.
                </p>
            </div>
            <div class="img-wrapper">
                    <cropper

                        class="change-miniature"
                        :src="getImg"
                        @change="change"
                        :auto-zoom="true"
                        :stencil-component="$options.components.CircleStencil"
                    />

                    <img class="big" :src="getImage"/>
                    <img class="small" :src="getImage"/>

            </div>

            <button class="modal-font" @click="changeMiniature">
                Сохранить изменения
            </button>
        </div>
    </div>
</template>

<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'
export default {

    components: {
      Cropper, CircleStencil
    },

    props:['profilePicturePath'],

    data (){
      return {
          img: this.profilePicturePath,
          image: this.profilePicturePath,
      }
    },
    computed: {
        getImg(){
          return this.img;
        },
        getImage(){
          return this.image;
        }
    },
    methods: {
        changeMiniature() {
            this.$emit('change_miniature')
        },

        change({ canvas }) {
          this.image = canvas.toDataURL();
        },
    },

    mounted() {
    }
}
</script>
<style scoped lang="scss">
.modal {
    height: 27rem;
    width:34.5rem;
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:#FFDBBA; 
        height: 3.5rem;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
        padding: 0 4% 0 4%;

        p {
            color: #00000099;
            font-weight: 500;
        }
    }

    .modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // padding: 5%;

        div {
            width: 83%;
            margin-top: 2%;
            .text-modal {
                margin-top: 3%;
                font-weight: 400;
                color: #000000;
                font-size: 16px;
                margin-bottom: 5%;
            }
        }

        button {
            width: 40%;
            height: 2.4rem;
            background-color: #FE6637 ;
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: 1px #FE6637;
            border-radius: 10px;
            margin-top: 5%;
        }

        .img-wrapper {
            position: relative;

            .change-miniature {
                width: 50%;
                margin-right: 14%;
            }

            .big {
                width: 100px;
                position: absolute;
                right: 25%;
                bottom: 50%;
                border-radius: 50%;
            }   
            .small {
                width: 50px;
                position: absolute;
                bottom: 17%;
                right: 36%;
                border-radius: 50%;
            }
        }
    }
}

</style>