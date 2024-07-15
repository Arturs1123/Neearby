<template>
    <div class="modal" v-if="step==0">
        <div class="modal-header">
            <p> Обновить фотографию </p>
            <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">
            
        </div>
        <div class="modal-body">
            <img src="../assets/home-view/img-modal.svg" alt="">
            <p class="title">
                Обновление фотографии
            </p>
            <div>
                <p class="text-modal">
                Друзьям будет проще узнать вас, если вы загрузите<br>
                свою настоящую фотографию. Вы можете загрузить<br>
                изображение в формате - JPG, GIF или PNG
            </p>
            </div>
            <button style="cursor: pointer; overflow: hidden; text-align: center;">
              <input type="file" id="files" name="files" accept=".png, .jpeg, .jpg, .gif" @change="selectImg" class="custom-file-input2" style="border: none; background: #FE6637; color: white; height: 100%;padding: 7px 10px;">
            </button>
        </div>

    </div>
  <div class="modal" v-if="step==3" style="height: auto">
    <div class="modal-header">
      <p> Модерация аватарки </p>
      <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/home-view/img-modal.svg" alt="">
      <div>
        <p style="text-align: left; font-size: 18px; line-height: 25px; margin-top: 15px; color: gray;" class="text-modal">
          В течений 5 минут мы проверим Вашу обложку, и если <br> она соответсвует правилам сервиса Neearby.pro<br> мы ее опубликуем!
        </p>
      </div>
      <p style="margin-top: 0;" class="title">
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
  <div class="modal" v-if="step==4" style="height: auto">
    <div class="modal-header">
      <p style="padding: 25px;"> Модерация аватарки </p>
      <img @click="closePhotoModal()" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/home-view/img-modal.svg" alt="">
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
  <div class="modal" v-if="step==5" style="height: auto">
    <div class="modal-header">
      <p> Модерация аватарки  </p>
      <img @click="closePhotoModal(), step = 0" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <img src="../assets/home-view/img-modal.svg" alt="">
      <div>
        <p style="font-weight: 600" class="text-modal">
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
        let element = document.getElementsByClassName('custom-file-input2')[0];
        this.img = element.files[0];
        const formData = new FormData();
        formData.append("img",  this.img, this.img.name);
        formData.append("imgSrc", this.img.name);
        formData.append("status",  this.status);
        formData.append("avatar_id",  this.cover_id);
        formData.append("created_at",  Date.now());
        formData.append("name_user",  this.profileName);
        formData.append("number_user",  this.phoneUser);
        formData.append("email_user",  this.emailUser);

        // this.product.image = this.image;
        // for (let i in this.product) {
        //   formData.append(i, this.product[i]);
        // }

        ApiWrapper.requestUpdateAvatar(formData).then(result => {
          const toast = useToast();
          toast('Аватарка отправлена на модерацию', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS });
          ApiWrapper.updateAvatar(formData);
          localStorage.removeItem('already');
          localStorage.setItem('pictureId', result.data.data[0]);
          window.location.reload()
          console.log(result.data.data[0])
        }).catch(() => {
          const toast = useToast();
          toast('Аватарка не подходит под размеры', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR });
        })
      },
//         selectFile(){
//             this.step++;
//             let element = document.getElementsByClassName('custom-file-input2')[0];
//             this.img = element.files[0];
//             if(this.img.size > 1e+6){
//               this.step = 3;
//             }
//             const formData = new FormData();
//             formData.append("img",  this.img, this.img.name);
//             formData.append("imgSrc", this.img.name);
//             formData.append("status",  this.status);
//             formData.append("avatar_id",  255);
//             formData.append("name_user",  this.profileName);
//             formData.append("number_user",  this.phoneUser);
//             formData.append("email_user",  this.emailUser);
//             ApiWrapper.requestUpdateAvatar(formData)
//             .then((el) => {
//               this.idModeration = el.data[0];
//               this.getProfileCoverModer();
//               const toast = useToast();
//               toast('Ваша аватарка отправлена на модерацию', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS  });
//               this.img.name
//               console.log(this.img.name)
//             })
//                 .catch(() => {
//                   this.step=3;
//                 })
// //updateAvatar
//         },
//         getProfileCoverModer(){
//             ApiWrapper.getModerationCoveredAdmin({id: 351})
//                 .then(el => {
//                   let status = el.data[0];
//                   const toast = useToast();
//                   if(status.status === 1){
//                     const formData = new FormData();
//                     formData.append("img",  this.img, this.img.name);
//                     formData.append("imgSrc", this.img.name);
//                     toast('Ваша Аватарка одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS  });
//                     ApiWrapper.updateAvatar(formData);
//                     this.$emit('update-photo');
//                     this.step=2;
//                     return;
//                   }
//                   if(status.status === 2){
//                     toast('Ваша Аватарка не одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
//                     // ApiWrapper.deleteAvatarByUser({id: this.idModeration});
//                     this.$emit('update-photo');
//                     this.step=3;
//                     return;
//                   }
//                   setTimeout(this.getProfileCoverModer, 15000);
//                 })
//           },
//       async getCoverModer(profile){
//         await ApiWrapper.getModerationAvatarByUser({id: profile.profile_id})
//             .then(el => {
//               if(el.data.length > 0){
//                 this.step++;
//                 this.idModeration = el.data[el.data.length - 1].id;
//                 this.getProfileCoverModer()
//               }
//             })
//       }
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
      this.pictureId = profile.profile_picture_id
      console.log(profile);

    });
  }
}
</script>
<style scoped lang="scss">
.custom-file-input2::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input2::before {
  content: 'Загрузить фотографию';
  outline: none;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 13pt;
  padding: 10px 10px 10px 30px;
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
              margin-top: 10px;
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
  }
  @media screen and (max-width: 480px) {
  .modal {
    width: 100%;
  }
  .modal .modal-body button {
    width: 65%;
  }
  .modal .modal-body div .text-modal {
    font-size: 13px;
  }
  }
  @media screen and (max-width: 420px) {
  .modal .modal-body button {
    width: 75%;
  }
  }

</style>