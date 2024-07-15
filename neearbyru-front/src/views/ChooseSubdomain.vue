<template>
  <div class="choose-subdomain-page">
    <div class="window">
      <img class="img-1" src="../assets/choose-subdomain-1.svg" >
      <img class="img-2" src="../assets/choose-subdomain-2.svg" >
      <div class="logo">
        <img src="../assets/lion.png" alt="">
      </div>

      <div class="body">
        <h3 style="text-align: left">
          Войдите на свою личную страницу Neearby и начните применять
          инструменты Neearby для успешного заработка!
         </h3>
        <div class="inputs">
          <TextInput ref="subdomain" v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" v-model="subdomain" placeholder="Введите на английском Ваш поддомен (Пример ivanivanov)"/>
          <div class="domain-name">
            <p>neearby.com</p>
          </div>
        </div>
        <p style="margin-left: 4px; text-align: left; font-size: 10px; margin-top: 5px; color: #818C99">(Поддомен должен быть от 10 до
          30 английских букв и цифр. Без спец.символов) </p>
        <div class="buttons">
          <OrangeButton button-label="Установить поддомен" @click="becomeAuthor"/>
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
  name: "RegistrationConfirmation",
  components: {Button, TextInput, OrangeButton},
  data() {
    return {
      subdomain: '',
    }
  },
  methods: {
    ...mapMutations(["setRegistrationData", 'setSubdomain']),


    becomeAuthor() {


      let valid = true;

      if(this.subdomain.length < 10){
        this.$refs.subdomain.$el.classList.add('notvalid');
        const previousValue = this.$refs.subdomain.$el.querySelectorAll('label')[0].innerText;
        this.$refs.subdomain.$el.querySelectorAll('label')[0].innerText = 'Минимальная длина - 10 символов';
        valid = false;


        setTimeout(() => {

          this.$refs.subdomain.$el.classList.remove('notvalid');
          this.$refs.subdomain.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);
      }

      if(this.subdomain.length > 30){
        this.$refs.subdomain.$el.classList.add('notvalid');
        const previousValue = this.$refs.subdomain.$el.querySelectorAll('label')[0].innerText;
        this.$refs.subdomain.$el.querySelectorAll('label')[0].innerText = 'Максимальная длина - 30 символов';
        valid = false;


        setTimeout(() => {
          this.$refs.subdomain.$el.classList.remove('notvalid');
          this.$refs.subdomain.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);
      }

      if(!valid){
        return;
      }


     ApiWrapper.becomeAuthor({login: this.subdomain}).then( async response => {

       this.setSubdomain(this.subdomain)

        if (this.subdomain) {

          await ApiWrapper.whoami();


          location.href = '/subdomain-set-successfully'

          //this.$router.push(`/page/${this.$store.getters.getAuthorizedProfile.login}`);
        }
     })
    }
  },

  computed: {
    ...mapGetters(['getRegistrationData'])
  }
}
</script>

<style lang="scss">

.choose-subdomain-page {
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
    width: 65%;
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
        width: 50%;
        margin-left: 20px;
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
@media screen and (max-width: 1440px) {
.choose-subdomain-page .window {
  width: 80%;
  height: auto;
  padding: 30px;
}
}
@media screen and (max-width: 1050px) {
.choose-subdomain-page .window {
  width: 85%; 
  grid-template-columns: 1fr 4fr 0.1fr;
}
}
@media screen and (max-width: 950px) {
.choose-subdomain-page .window {
  width: 100%; 
  grid-template-columns: 1fr 4fr;
}
}
@media screen and (max-width: 769px) {
.choose-subdomain-page .window {
    display: flex;
    flex-direction: column;
    height: 50%;
}
.choose-subdomain-page .window .logo {
  margin-top: 0;
}
.choose-subdomain-page .window .body h3 {
  margin-top: 0;
}
.choose-subdomain-page .window .body {
  margin-top: 0;
  justify-content: center;
  align-items: center;
}
.choose-subdomain-page .window .body .buttons {
  width: 100%;
  margin-left: 0;
}
.choose-subdomain-page .window .logo img {
  height: 200px;
}
}
@media screen and (max-width: 500px) {
.choose-subdomain-page .window .inputs label {
  left: 0;
  font-size: 12px;
  top: 40px;
}
  .choose-subdomain-page .window .inputs input {
    margin-top: 40px;
  }
  .choose-subdomain-page .window .inputs .domain-name {
    margin-top: 40px;
  }
}
@media screen and (max-width: 400px) {
.choose-subdomain-page .window .body h3 {
  font-size: 15px;
}
.choose-subdomain-page .window .inputs label {
  font-size: 12px;
  left: 0;
}

}

</style>