<template>
  <div class="thanks-for-registration-page">
    <div class="window">
      <a class="logo" href="/">
        <img src="../assets/logo1.png" alt="">
        <h2>Neearby.pro</h2>
      </a>

      <div class="title">
        <h2>Бонус за регистрацию от Neearby</h2>
        <h3>*Узнайте, как получить бонус в течение 1 часа*</h3>
      </div>

      <div class="body">
        <div class="video">
          <iframe width="720" height="315" src="https://www.youtube.com/embed/hFgDS3yjGIA" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
        </div>
        <div class="buttons">
        <OrangeButton @click="redirect('https://t.me/neearbycom1_bot')" style="margin-top: 25px;" button-label="Хочу получить бонус от Neearby!"/>
        <OrangeButton @click="redirect('http://neearby.pro/enter-your-personal-account')" style="margin-top: 10px;" button-label="Войти в свой личный кабинет Neearby!"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import OrangeButton from "@/components/Buttons/OrangeButton.vue";
import ApiWrapper from "../api";
import {mapGetters, mapMutations} from "vuex";
import {POSITION, TYPE, useToast} from "vue-toastification";

export default {
  name: "RegistrationConfirmation",
  components: {TextInput, OrangeButton},
  data() {
    return {
      emailLink: '',
    }
  },
  methods: {

    redirect: function (path){
      location.href = path;
    }
  },
  computed: {
  },
  mounted() {
    // let tokens = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    let token = this.$route.query.token;
    ApiWrapper.confirmRegistration({token: token}).then(response => {
      if(response.success) {
        // localStorage['token'] = response.data.token
        const toast = useToast();
        toast(`Ваш аккаунт подтвержден`, {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS});
      }
    })
  }
}
</script>

<style lang="scss">

.thanks-for-registration-page {
  background: #edeef0;
  color: black;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--base-font);

  .window {
    background: white;
    width: 50%;
    height: 700px;
    border-radius: 20px;


    .body {
      text-align: left;
      margin-left: 40px;
      display: flex;
      flex-direction: column;

      .video{
        align-self: center;
        margin-right: 50px;
        margin-top: 25px;
      }

      .buttons{
        width: 65%;
        display: flex;
        flex-direction: column;
        align-self: center;
        margin-right: 50px;
        button {
          cursor: pointer;
        }
      }
    }

    .logo {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-left: 40px;
      cursor: pointer;
      color: black;
      text-decoration: none;


      h2 {
        margin-left: 10px;
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

    .inputs {
      width: 90%;
      margin: 20px auto 0 auto;

      .notvalid {
        input {
          background: #FFE3E3;
        }

        label {
          color: red;
          animation: shake 0.82s;
        }

      }


      input {
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

        &::placeholder {
          font-family: var(--base-font);
        }
      }

      label {
        top: 25px;
        left: 20px;
      }

      .button-wrapper {
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

@media screen and (max-width: 1470px) {
    .thanks-for-registration-page .window {
    width: 60%;
    height: auto;
    padding: 25px;
  }
  }
  @media screen and (max-width: 1200px) {
    .thanks-for-registration-page .window {
    width: 75%;
  }
  .thanks-for-registration-page .window .body .buttons {
    width: 70%;
  }
  }
  @media screen and (max-width: 1050px) {
    .thanks-for-registration-page .window {
    width: 100%;
  }
  .thanks-for-registration-page .window .body .buttons {
    width: 75%;
  }
  }
  @media screen and (max-width: 930px) {
    .thanks-for-registration-page .window {
    width: 100%;
  }
  }
  @media screen and (max-width: 769px) {
  .thanks-for-registration-page .window {
    width: 100%;
  }
  .youtube {
    width: 100%;
  }
  .thanks-for-registration-page .window .body {
    margin-left: 0;
    width: 100%;
  }
  .thanks-for-registration-page .window .body .video {
    margin-right: 0;
    width: 90%;
    display: flex;
  }
  .thanks-for-registration-page .window .body .buttons {
    margin-right: 0;
    width: 90%;
  }
  .thanks-for-registration-page .window .logo {
    justify-content: center;
    margin-left: 0;
  }
  .thanks-for-registration-page .window .title {
    margin-top: 0;
  }
  }
  @media screen and (max-width: 500px) {
    .thanks-for-registration-page .window {
      height: 70%;
    }
    .thanks-for-registration-page .window .title h2 {
      font-size: 20px;
    }
    .thanks-for-registration-page .window .title h3 {
      font-size: 14px;
    }
    .thanks-for-registration-page .window .body .buttons button{
      font-size: 17px;
    }
  }
    @media screen and (max-width: 400px) {
      .thanks-for-registration-page .window .body .buttons button {
        font-size: 15px;
      }
  }

</style>