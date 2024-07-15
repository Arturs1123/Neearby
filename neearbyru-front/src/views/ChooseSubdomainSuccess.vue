<template>
  <div class="choose-subdomain-page-success">
    <div class="window">
      <img class="img-1" src="../assets/choose-subdomain-1.svg" >
      <img class="img-2" src="../assets/choose-subdomain-2.svg" >
      <div class="logo">
        <img src="../assets/lion.png" alt="">
      </div>

      <div class="body">
        <h3 style="text-align: left">
          Ваш поддомен на Neearby успешно зарегистрирован!
         </h3>
        <div class="inputs" style="margin-top: 30px; font-size: 20px;">
          <p>Ваша личная страничка на Neearby: <a :href='getHomeLink()'>http://{{this.getSubdomain()}}.neearby.ru/</a></p>
        </div>
        <div class="buttons">
          <OrangeButton button-label="Войти в свою страничку Neearby!" @click="goHome"/>
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
import Button from "@/components/Buttons/OrangeButton.vue";
import {POSITION, TYPE, useToast} from "vue-toastification";

export default {
  name: "ChooseSubdomain",
  components: {Button, TextInput, OrangeButton},
  data() {
    return {
      subdomain: '',
    }
  },
  methods: {
    ...mapMutations(["setRegistrationData"]),
    ...mapGetters(['getSubdomain']),

    getHomeLink(){
      // let domain = window.location.host
      // return window.location.href = "http://" + this.$store.getters.getAuthorizedProfile.login + '.' + domain + '/';

      return `http://${this.getSubdomain()}.neearby.ru/`
    },

    goHome() {
      let domain = window.location.host
      return window.location.href = "http://" + this.$store.getters.getAuthorizedProfile.login + '.' + domain + '/';
    }
  },

  computed: {
    ...mapGetters(['getRegistrationData'])
  }
}
</script>

<style lang="scss">
.choose-subdomain-page-success .window .inputs > p {
font-size: 18px;
}
.choose-subdomain-page-success {
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
    width: 56%;
    height: 22rem;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 1fr 4fr 0.5fr;

    .logo {
      margin-top: 50px;

      img {
        height: 250px;
      }
    }

    .img-1 {
      width: 6%;
      position: absolute;
    }
    
    .img-2 {
      width: 8%;
      position: absolute;
      right: 22%;
    }



    .body {
      margin-top: 80px;
      display: flex;
      flex-direction: column;

      .buttons {
        margin-top: 30px;
      }

      h3 {
        margin-top: 10px;
        background: #FFF500;
        display: inline-block;
        padding: 0 10px 0 10px;
        font-size: 18px;
      }
    }

    .title {

      h2 {
        font-size: 30px;
        margin-bottom: 0;
      }

      margin-top: 40px;
    }

    .inputs {
      display: flex;

      .domain-name {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #8c8c8c;
        border-radius: 10px;
        width: 150px;
        height: 40px;
        font-weight: 500;
        font-size: 17px;
      }

      width: 100%;

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
        height: 40px;
        border-radius: 10px;
        width: 100%;
        text-indent: 20px;
        margin-top: 20px;

        &:focus + label, &:not(:placeholder-shown) + label {
          transform: translate(-5px, -27px) scale(100%);
          font-size: 13px;
        }

        &::placeholder {
          font-family: var(--base-font);
        }
      }

      label {
        top: 31px;
        left: 20px;
        color:#535353;
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

@media (max-width: 1750px) {
  .choose-subdomain-page {
    label{
      font-size: 12px;
      width: 100%;
    }
  }
}
@media screen and (max-width: 1400px) {
  .choose-subdomain-page-success .window {
    width: 70%;
    height: auto;
    padding: 30px;
  }
}
@media screen and (max-width: 1100px) {
  .choose-subdomain-page-success .window{
    width: 80%;
  }
  .choose-subdomain-page-success .window .body h3 {
    font-size: 16px;
  }
}
@media screen and (max-width: 1100px) {
  .choose-subdomain-page-success .window{
    width: 90%;
  }
}
@media screen and (max-width: 769px) {
  .choose-subdomain-page-success .window{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 50%;
  }
  .choose-subdomain-page-success .window .logo img {
    height: 200px;
  }
  .choose-subdomain-page-success .window .logo {
    margin-top: 0;
  }
  .choose-subdomain-page-success .window .body {
    margin-top: 0;
    width: 100%;
  }
}
@media screen and (max-width: 500px) {
.choose-subdomain-page-success .window .logo img {
  height: 200px;
}
.choose-subdomain-page-success .window .inputs > p {
 width: 100%;
 font-size: 16px;
}
}
@media screen and (max-width: 500px) {
.choose-subdomain-page-success .window .inputs > p {
 font-size: 14px;
}
}

</style>