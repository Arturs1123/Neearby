<template>
    <div class="modal" v-if="step==0">
        <div class="modal-header">
            <p> Обновить обложку </p>
            <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">
            
        </div>
        <div class="modal-body">
            <img src="../assets/home-view/img-modal.svg" alt="">
            <p class="title">
                Обновление обложки
            </p>
            <div>
                <p class="text-modal">
                Рекомендуемое разрешение 1250 x 250. <br> 
                Формат - JPG, WEBP или PNG
            </p>
            </div>
            <button style="cursor: pointer; overflow: hidden; text-align: center;">
              <input type="file" id="files" name="files" accept=".png, .jpeg, .jpg, .gif" @change="selectImg" class="custom-file-input3" style="border: none; background: #FE6637; color: white; height: 100%;padding: 7px 26px;">
            </button>
        </div>

    </div>
  <div class="modal" v-if="step==1" style="height: auto">
    <div class="modal-header">
      <p> Модерация обложки </p>
      <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/uiw_loading.png" alt="">
      <div>
        <p style="text-align: left; font-size: 18px; line-height: 25px; margin-top: 15px; color: gray;" class="text-modal">
          В течений 5 минут мы проверим Вашу обложку, и если <br> она соответсвует правилам сервиса Neearby.pro<br> мы ее опубликуем!
        </p>
      </div>
      <p style="margin-top: 0; margin-bottom: 10px" class="title">
        Ожидайте!
      </p>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModal">OK</button>
      </div>

    </div>
  </div>
  <div class="modal" v-if="step==2" style="height: auto">
    <div class="modal-header">
      <p style="padding: 25px;"> Модерация обложки </p>
      <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/check.png" alt="">
      <div>
        <p style="font-size: 17px; line-height: 25px; font-weight: 550; margin-top: 10px;" class="text-modal">
          Поздравляем! Вы прошли модерацию. Ваша <br>
          обложка была успешна опубликована на Вашу <br>
          страницу в Neearby
        </p>
      </div>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModaled(),step=0">OK</button>
      </div>

    </div>
  </div>
  <div class="modal" v-if="step==3" style="height: auto">
    <div class="modal-header">
      <p> Модерация обложки  </p>
      <img @click="closePhotoModal(), step = 0" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/cross.png" alt="">
      <div>
        <p style="font-weight: 600; margin-top: 10px;" class="text-modal">
          Вы не прошли модерацию Вашей обложки<br>Пожалуйста, загрузите новую обложку
         </p>
      </div>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModal">OK</button>
      </div>

    </div>
  </div>
</template>

<script>

import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";
import {mapGetters} from "vuex";
import axios from "axios";
export  default {
    data(){
      return {
        img: '',
        imgSrc: '',
        cover_id: '',
        step: 0,
        idModeration: 0,
        status: 0,
        moderationList: []
      }
    },
    methods: {
        closePhotoModal() {
            this.$emit('close')
        },
        closePhotoModaled() {
          this.$emit('close')
          window.location.reload()
        },
      selectImg: function () {
          let element = document.getElementsByClassName('custom-file-input3')[0];
          this.img = element.files[0];
          const formData = new FormData();
          formData.append("img",  this.img, this.img.name);
          formData.append("imgSrc", this.img.name);
          formData.append("status",  this.status);
          formData.append("cover_id",  this.cover_id);
          formData.append("created_at",  Date.now());
          formData.append("name_user",  this.profileName);
          formData.append("number_user",  this.phoneUser);
          formData.append("email_user",  this.emailUser);

          // this.product.image = this.image;
          // for (let i in this.product) {
          //   formData.append(i, this.product[i]);
          // }

          ApiWrapper.requestUpdateCover(formData).then(result => {
            const toast = useToast();
            toast('Обложка отправлена на модерацию', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS });
            ApiWrapper.updateCover(formData);
            localStorage.removeItem('already');
            localStorage.setItem('coverId', result.data.data[0]);
            window.location.reload()
            console.log(result.data.data[0])
          }).catch(() => {
            const toast = useToast();
            toast('Обложка не подходит под размеры', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR });
          })
        },




      // selectImg() {
      //   let element = document.getElementsByClassName('custom-file-input')[0];
      //   this.img = element.files[0];
      //   const fileReader = new FileReader();
      //   let fnc = this.setImgUrl;
      //   fileReader.readAsDataURL(this.img);
      //   fileReader.addEventListener("load", function () {
      //     fnc(this.result);
      //   });
      //
      // },

        // selectFile(){
        //     this.step++;
        //     let element = document.getElementsByClassName('custom-file-input3')[0];
        //     this.img = element.files[0];
        //     const formData = new FormData();
        //     formData.append("img",  this.img, this.img.name);
        //     formData.append("imgSrc", this.img.name);
        //     formData.append("status",  this.status);
        //     formData.append("cover_id",  this.cover_id);
        //     formData.append("created_at",  Date.now());
        //     formData.append("name_user",  this.profileName);
        //     formData.append("number_user",  this.phoneUser);
        //     formData.append("email_user",  this.emailUser);
        //       ApiWrapper.requestUpdateCover(formData)
        //           .then(el => {
        //             this.idModeration = el.data[0];
        //             this.getProfileCoverModer(el);
        //             const toast = useToast();
        //             toast('Ваша аватарка отправлена на модерацию', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS  });
        //             this.img.name
        //             console.log(this.img.name)
        //           })
        //           .catch(() => {
        //             console.log(32131)
        //             this.step=3;
        //           })
        // },
        // getProfileCoverModer(){
        //     ApiWrapper.getModerationCoveredAdmin({id: 351})
        //         .then(el => {
        //           let status = el.data[0];
        //           console.log(status.id)
        //           const toast = useToast();
        //           if(status.status == 1){
        //             const formData = new FormData();
        //             formData.append("img",  this.img, this.img.name);
        //             formData.append("imgSrc", this.img.name);
        //             toast('Ваша Аватарка одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS });
        //             ApiWrapper.updateCover(formData);
        //             this.step = 2;
        //             this.$emit('update-photo');
        //             return;
        //           }
        //           if(status.status == 2){
        //             toast('Ваша Аватарка не одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
        //             this.step = 3;
        //             this.$emit('update-photo');
        //             return;
        //           }
        //           setTimeout(this.getProfileCoverModer, 15000);
        //         })
        // },
      // async getCoverModer(profile){
      //   await ApiWrapper.getModerationCoverByUser({id: profile.cover_id})
      //       .then(el => {
      //         if(el.data.length > 0){
      //           this.step++;
      //           this.idModeration = el.data[el.data.length - 1].id;
      //           this.getProfileCoverModer()
      //         }
      //       })
      // }
    },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  async mounted() {

    this.profileLogin = this.profileLink;
    await ApiWrapper.getProfile({login: this.profileLogin}).then(response => {
      let profile = response.data;
      this.profileName = profile.name;
      this.phoneUser = profile.phone;
      this.emailUser = profile.email;
      this.coveredId = profile.cover_path_id
      console.log(profile);
      this.getCoverModer(profile);

    });
  }
}
</script>
<style scoped lang="scss">
.custom-file-input3::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input3::before {
  content: 'Загрузить обложку';
  outline: none;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 13pt;
  padding: 10px;
  padding-left: 30px;
}
.modal {
    height: auto;
    width: 45%;
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:#FFDBBA; 
        height: 15%;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
        padding: 0 4% 0 4%;

        p {
            color: #00000099;
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 0;
            padding: 20px;
        }
    }

    .modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 5%;
        p.title {
          margin-top: 5%;
          font-weight: 500;
          color: #000000;
          font-size: 20px;
        }

        div {
            width: 90%;
            .text-modal {
              font-weight: 400;
              color: #000000;
              line-height: 25px;
              font-size: 18px;
              margin-bottom: 5%;
            }
        }

        button {
            width: 50%;
            height: 2.4rem;
            background-color: #FE6637 ;
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: 1px #FE6637;
            border-radius: 10px;
        }
    }
}
@media screen and (max-width: 769px) {
  .modal {
    width: 80%;
  }
  .custom-file-input3::before {
    padding-left: 0;
  }
  }
  @media screen and (max-width: 480px) {
  .modal {
    width: 100%;
  }
  .modal .modal-body button {
    width: 65%;
  }
    .custom-file-input3::before {
      padding-left: 25px;
    }
  .modal .modal-body div .text-modal {
    font-size: 16px;
  }
  }
  @media screen and (max-width: 420px) {
  .modal .modal-body button {
    width: 75%;
  }
  }

</style>