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
        <input type="file" id="files" name="files" accept=".png, .jpeg, .jpg, .gif" @change="selectFile" class="custom-file-input2" style="border: none; background: #FE6637; color: white; width: 100%; height: 100%;padding: 7px 10px;">
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
          В течений 5 минут мы проверим Вашу аватарку, и если <br> она соответсвует правилам сервиса Neearby.com<br> мы ее опубликуем!
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
          аватарка была успешна опубликована на Вашу <br>
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
          Вы не прошли модерацию Вашей аватарки<br>Пожалуйста, загрузите новую аватарку
        </p>
      </div>
      <div>
        <p style="text-align: left;" class="text-modal">
          С уважением, команда Neearby. <br>
          Neearby - всегда рядом.
        </p>
        <button @click="closePhotoModaled()">OK</button>
      </div>

    </div>
  </div>
</template>
<script>
import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";
import {mapGetters} from "vuex";
export default {
  name: "PictureMod",
  props: ['pictureId', 'profile'],
  data() {
    return {
      pictureId: 0,
      imgSrc: '',
      step: 3,
      coveredId: '',
      idModeration: 0
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
    getModerationProduct() {
      ApiWrapper.getModerationAvatarAdmin({id: this.pictureId})
          .then(el => {
            let cover = el.data[0];
            if (cover.status == 1) {
              this.getProfileCoverModer(el);
              this.step = 4;
              this.$emit('popUp');
              window.localStorage.removeItem('already');
              window.localStorage.removeItem('pictureId');
              return;
            }
            if (cover.status == 2) {
              this.step = 5;
              this.$emit('popUp');
              window.localStorage.removeItem('already');
              window.localStorage.removeItem('pictureId');
              return;
            }
            window.localStorage.setItem('already', true);
            setTimeout(this.getModerationProduct, 1000);
          })
    },
    getProfileCoverModer() {
      ApiWrapper.getModerationAvatarAdmin({id: this.pictureId})
          .then(el => {
            let cover = el.data[0];
            console.log(cover)
            const toast = useToast();
            if (cover.status == 1) {
              const formData = new FormData();
              formData.append("picture_path", cover.img_path);
              formData.append("id", this.coveredID)
              toast('Ваша Аватарка одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS});
              this.step = 4;
              ApiWrapper.updateAvatar(formData);
              this.$emit('update-photo');
              return;
            }
            if (cover.status == 2) {
              toast('Ваша Аватарка не одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
              this.step = 5;
              this.$emit('update-photo');
              return;
            }
            setTimeout(this.getProfileCoverModer, 15000);
          })
    },
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  async mounted() {
    if (window.localStorage.getItem('pictureId')) {
      this.pictureId = window.localStorage.getItem('pictureId');
      if (!localStorage.getItem('already')) {
        this.$emit('popUp');
      }
      setTimeout(this.getModerationProduct, 1000);
    }

    await ApiWrapper.getProfile({login: this.getCurrentProfile.login}).then(response => {
      let profile = response.data;
      this.profileName = profile.name;
      this.phoneUser = profile.phone;
      this.emailUser = profile.email;
      this.coveredID = profile.profile_picture_id
      console.log(profile);
      this.getCoverModer(profile);

    });

  },
}

</script>

<style scoped lang="scss">
.custom-file-input3::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input3::before {
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