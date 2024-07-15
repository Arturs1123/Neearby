<template>
    <div class="modal">
        <div class="modal-header">
            <p class="modal-font"> Область обложки </p>
            <img @click="changeMiniature()" src="../assets/home-view/cancel-modal.svg" alt="">

        </div>
        <div class="modal-body">
            <div>
                <p class="text-modal modal-font">
                    Выбранная область будет видна вам в профиле
                </p>
            </div>
            <div class="img-wrapper">

                <cropper class="change-miniature"
                         :src="coverImage"
                         :debounce="false"
                         :stencil-props="{
                          aspectRatio: 4
                          }"
                         @change="onChange"
                         :auto-zoom="true"

                />

            </div>

            <button class="modal-font" @click="updateMiniature">
                Установить область обложки
            </button>
        </div>
    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'
import ApiWrapper from "@/api";

export default {

    components: {
        Cropper
    },

    props:['coverImagePath'],

    data (){
        return {
            coverImage: this.coverImagePath,
            result: {
                coordinates: null,
                image: null
            },
            interval: null
        }
    },
  computed: {

  },
    methods: {
        changeMiniature() {
            this.$emit('changeCoverMiniature');
        },
        updateMiniature(){
            ApiWrapper.updateCoverPictureMiniature(
                {
                  miniature: JSON.stringify({coordinates: this.result.coordinates, image: this.result.image})
                })
                .then(() => {
                  this.$emit('updateProfilePictureMiniature', this.result);
                  this.$emit('changeCoverMiniature');
                })
        },

        onChange({ coordinates, image }) {
            this.result = {
                coordinates,
                image
            };
        },
        checkUpdate(){
          setTimeout(() => {
            this.checkUpdate();
          }, 1000);
        }
    },
  mounted() {
      setTimeout(() => {
        this.checkUpdate();
      }, 1000);
  }
}
</script>
<style scoped lang="scss">
.modal {
    width: 50%;
    height: auto;

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:#FFDBBA;
        height: 3.5rem;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
        padding: 0% 4% 0% 4%;

        p {
            color: #00000099;
            font-weight: 500;
            margin-bottom: 0;
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
                margin-bottom: 0;
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
            margin-bottom: 30px;
        }

        .img-wrapper {
            position: relative;

            .change-miniature {
                width: 100%;
                margin-right: 0;
            }

        }
    }
}
@media screen and (max-width: 769px) {
  .modal {
    width: 80%;
  }
  }
  @media screen and (max-width: 480px) {
  .modal {
    width: 100%;
  }
    .modal .modal-body button {
      width: 80%;
    }
  }

</style>