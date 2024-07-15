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
        <input type="file" id="files" name="files" accept=".png, .jpeg, .jpg, .gif" @change="selectFile" class="custom-file-input3" style="border: none; background: #FE6637; color: white; width: 100%; height: 100%;padding: 7px 26px;">
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
  name: "AvatarMod",
  props: ['coverId', 'profile'],
  data(){
    return {
      coverId: 0,
      imgSrc: '',
      step: 1,
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
    getModerationProduct(){
      ApiWrapper.getModerationCoveredAdmin({id: this.coverId})
          .then(el => {
            let cover = el.data[0];
            if(cover.status == 1){
              this.getProfileCoverModer(el);
              this.step = 2;
              this.$emit('popUp');
              window.localStorage.removeItem('already');
              window.localStorage.removeItem('coverId');
              return;
            }
            if(cover.status == 2){
              this.step = 3;
              this.$emit('popUp');
              window.localStorage.removeItem('already');
              window.localStorage.removeItem('coverId');
              return;
            }
            window.localStorage.setItem('already', true);
            setTimeout(this.getModerationProduct, 1000);
          })
    },
    getProfileCoverModer(){
            ApiWrapper.getModerationCoveredAdmin({id: this.coverId})
                .then(el => {
                  let cover = el.data[0];
                  console.log(cover)
                  const toast = useToast();
                  if(cover.status == 1){
                    const formData = new FormData();
                    formData.append("cover_path", cover.img_path);
                    formData.append("id", this.coveredID)
                    toast('Ваша Обложка одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS });
                    ApiWrapper.updateCover(formData);
                    this.step = 2;
                    this.$emit('update-photo');
                    return;
                  }
                  if(cover.status == 2){
                    toast('Ваша Обложка не одобрена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
                    this.step = 3;
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
    if(window.localStorage.getItem('coverId')){
      this.coverId = window.localStorage.getItem('coverId');
      if(!localStorage.getItem('already')){
        this.$emit('popUp');
      }
      setTimeout(this.getModerationProduct, 1000);
    }

    await ApiWrapper.getProfile({login: this.getCurrentProfile.login}).then(response => {
      let profile = response.data;
      this.profileName = profile.name;
      this.phoneUser = profile.phone;
      this.emailUser = profile.email;
      this.coveredID = profile.cover_path_id
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