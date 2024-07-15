<template>
  <div class="registration-confirmation-page">
    <div class="registration-confirmation-window">
      <a class="logo" href="/">
        <img src="../assets/logo1.png" alt="">
        <h2>Neearby.com</h2>
      </a>

      <div class="title">
        <h3>Вам необходимо прямо сейчас подтвердить свою регистрацию!</h3>
      </div>

      <div class="body">
        <h2 style="font-size: 22px">{{getRegistrationData.name.split(' ')[0]}}, здравствуйте. На связи команда Neearby!</h2>
        <p>Большое спасибо за регистрацию!</p>
        <p style="margin-top: 30px;">Как подтвердить свою регистрацию?</p>
        <div class="email" style="display: flex; align-items: center">
          <p><b>Шаг 1.</b> Зайдите в свою электронную почту <a style="color: #2A5885; display: inline-block">{{ getRegistrationData.email }}</a> <OrangeButton style="margin-left: 20px; width: 200px; display: inline-block" height="30" button-label="Войти в свою почту!" :click-event="openEmail"/></p>
        </div>
        <p style="margin-top: 10px;"><b>Шаг 2.</b> Найдите письмо от Neearby с темой “Подтвердить регистрацию в Neearby” и в самом письме кликните на ссылку </p>
        <h2 style="font-size: 22px">Действуйте прямо сейчас! C уважением, команда Neearby</h2>

        <p style="margin-top: 20px; font-size: 14px; color: #7A7777;">Внимание!<br>
          Если вы не активируете свой аккаунт, Вы не сможете зайти в личный кабинет!</p>

        <p style="margin-top: 15px; font-size: 14px; color: #7A7777;">Иногда почтовые сервисы барахлят...<br>
          Поэтому, если письмо не пришло, проверьте папку спам, переложите письмо из папки спам во входящие и сделайте пошаговые 2 шага.</p>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import OrangeButton from "@/components/Buttons/OrangeButton.vue";
import ApiWrapper from "../api";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "RegistrationConfirmation",
  components: {TextInput, OrangeButton},
  data(){
    return{
      emailLink: '',
    }
  },
  methods: {
    ...mapMutations(["setRegistrationData"]),

    openEmail: function (){
      let emailDomails = {
        'yandex.ru': "https://mail.yandex.ru",
        'gmail.com': "https://mail.google.com",
        'mail.ru': "https://e.mail.ru/inbox"
      }

      let targetLink = emailDomails[this.getRegistrationData.email.split('@')[1]];

      window.open(targetLink, '_blank').focus();
    }
  },
  computed: {
    ...mapGetters(['getRegistrationData'])
  }
}
</script>

<style lang="scss">

.registration-confirmation-page {
  background: #edeef0;
  color: black;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--base-font);

  .registration-confirmation-window {
    background: white;
    width: 50%;
    height: 650px;
    border-radius: 20px;


    .body{
      text-align: left;
      margin-left: 40px;
    }

    .logo {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-left: 40px;
      cursor: pointer;
      text-decoration: none;
      color: black;


      h2 {
        margin-left: 10px;
        margin-bottom: 0;
      }

      img {
        height: 50px;
        margin-top: 20px;
      }

    }

    .title {

      h2 {
        font-size: 30px;
        margin-bottom: 0;
      }

      h3 {
        margin-top: 10px;
        background: #FFF500;
        display: inline-block;
        padding: 0 10px 0 10px;
      }

      margin-top: 40px;
    }

    .inputs{
      width: 90%;
      margin: 20px auto 0 auto;

      .notvalid{
        input{
          background: #FFE3E3;
        }

        label{
          color: red;
          animation: shake 0.82s;
        }

      }



      input{
        transition: 0.2s ease-out all;
        background: #edeef0;
        border: none;
        outline: none;
        height: 30px;
        border-radius: 10px;
        width: 100%;
        text-indent: 20px;
        margin-top: 20px;

        &:focus + label, &:not(:placeholder-shown) + label {
          transform: translate(-5px, -22px) scale(100%);
          font-size: 13px;
        }

        &::placeholder{
          font-family: var(--base-font);
        }
      }

      label{
        top: 25px;
        left: 20px;
      }

      .button-wrapper{
        width: 80%;
        margin: 20px auto 0 auto;
      }
    }
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, -22px, 0);
    }

    20%, 80% {
      transform: translate3d(2px, -22px, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, -22px, 0);
    }

    40%, 60% {
      transform: translate3d(4px, -22px, 0);
    }
  }

}

@media (max-width: 1600px) {
  .registration-confirmation-page {
    .button-wrapper {
      margin: 10px auto 0 auto !important;
    }
  }
}

  @media screen and (max-width: 1470px) {
  .registration-confirmation-page .registration-confirmation-window {
    width: 60%;
    height: auto;
    padding: 20px;
  }
  .registration-confirmation-page .registration-confirmation-window .title h3 {
    font-size: 20px;
    padding: 10px;
  }
  }
  @media screen and (max-width: 1200px) {
  .registration-confirmation-page .registration-confirmation-window {
    width: 70%;
  }
  }
  @media screen and (max-width: 1000px) {
  .registration-confirmation-page .registration-confirmation-window {
    width: 85%;
  }
  }
  @media screen and (max-width: 769px) {
  .registration-confirmation-page .registration-confirmation-window {
    width: 100%;
  }
  .registration-confirmation-page .registration-confirmation-window .title h3 {
    font-size: 17px;
  }
  .registration-confirmation-page .registration-confirmation-window .logo {
    justify-content: center;
    margin-left: 0;
  }
  } 
  @media screen and (max-width: 570px) {
  .registration-confirmation-page .registration-confirmation-window {
    width: 100%;
    height: 75%;
  }
  .registration-confirmation-page .registration-confirmation-window .title h3 {
    font-size: 13px;
  }
  }
  @media screen and (max-width: 460px) {
  .registration-confirmation-page .registration-confirmation-window {
    height: 80%;
  }
  .registration-confirmation-page .registration-confirmation-window .title h3 {
    font-size: 12px;
  }
  }
</style>