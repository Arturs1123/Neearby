<template>
  <div class="modal">
    <div class="modal-header">
      <p> Подтверждение действия </p>
      <img @click="closeModal" src="../assets/home-view/cancel-modal.svg" alt="">

    </div>
    <div class="modal-body">
      <h3 class="title">
        Ваш пароль был успешно восстановлен!
      </h3>
      <div>
        <p class="text-modal">
          Зайдите сейчас в свою электронную почту <a :href="email" style="color: blue; text-decoration: underline">{{email}}</a> и войдите в свой аккаунт Neearby с новым паролем.
        </p>

        <OrangeButton style="width: 200px; display: inline-block" height="30" button-label="Войти в свою почту!" :click-event="openEmail"/>

      </div>
    </div>
  </div>
</template>

<script>

import OrangeButton from "@/components/Buttons/OrangeButton.vue";
import {mapGetters} from "vuex";

export  default {
  props:{
    email: '',
    closeModal: function (){},
  },
  components: {
    OrangeButton
  },
  methods: {

    ...mapGetters(['getRecoveryEmail']),

    openEmail: function (){
      let emailDomails = {
        'yandex.ru': "https://mail.yandex.ru",
        'gmail.com': "https://mail.google.com",
        'mail.ru': "https://e.mail.ru/inbox"
      }

      let targetLink = emailDomails[this.getRecoveryEmail().split('@')[1]];

      window.open(targetLink, '_blank').focus();
    }
  }
}
</script>
<style scoped lang="scss">
.modal {
  height: 250px;
  width:33rem;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:#FFDBBA;
    height: 50px;
    overflow: hidden;
    border-radius: 15px 15px 0 0;
    padding: 10px 15px 5px 30px;

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
    padding: 4%;


    h3.title {
      color: #000000;
    }

    div {
      width: 95%;
      .text-modal {
        margin-top: 3%;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        margin-bottom: 5%;
        text-align: left;
        line-height: 20px;
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

      @media screen and (max-width: 550px) {
        .modal {
          width: 100%;
        }
        .modal .modal-body h3.title {
          margin: 0;
        }
        }
        @media screen and (max-width: 420px) {
          .modal .modal-body h3.title {
            font-size: 17px;
          }
        }
          @media screen and (max-width: 380px) {
          .modal .modal-body h3.title {
            font-size: 15px;
          }
        }
</style>