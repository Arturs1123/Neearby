<template>
  <div class="login-page">
    <div class="window">
      <a class="logo" href="/">
        <img src="../assets/logo1.png" alt="">
        <h2>Neearby.com</h2>
      </a>

      <div class="title">
        <h2>Войдите в свой личный кабинет Neearby</h2>
      </div>

      <div class="inputs">
        <TextInput ref="email" v-model="email" placeholder="Введите Ваш email"/>
        <TextInput type="password" ref="password" v-model="password" placeholder="Введите Ваш пароль"/>
        <p style="text-align: right; font-size: 14px; color: #2A5885; font-weight: 600; margin-top: 10px; cursor: pointer" @click="$router.push('/recover-your-password')">Восстановить свой пароль</p>

        <div class="button-wrapper">
          <OrangeButton button-label="Войти в свой личный кабинет Neearby" :click-event="login"/>
          <p style="font-size: 10px; color: #b2b2b2; margin-top: 5px;">Нажимая на кнопку, Вы соглашаетесь с документацией Neearby</p>
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
import { useRouter, useRoute } from 'vue-router'
import { POSITION, TYPE, useToast } from "vue-toastification";
import {inject} from "vue";

const $cookies = inject('$cookies');

export default {
  name: "Registration",
  components: {TextInput, OrangeButton},
  data(){
    return{
      password: '',
      email: ''
    }
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile', 'getSubdomain'])
  },
  methods: {
    ...mapMutations(["setRegistrationData"]),

    login: function (){

      if(!this.email.includes('@')){
        this.$refs.email.$el.classList.add('notvalid');
        const previousValue = this.$refs.email.$el.querySelectorAll('label')[0].innerText;
        this.$refs.email.$el.querySelectorAll('label')[0].innerText = 'Введите корректный email';


        setTimeout(() => {
          this.$refs.email.$el.classList.remove('notvalid');
          this.$refs.email.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);

        return;
      }


      ApiWrapper.login(this.email, this.password).then(async (response) => {

        if(response.success === true){

          console.log(this.$cookies.set('token', response.data, '180d', '/', '.neearby.ru', false, ''));

          console.log(document.cookie)

          decodeURIComponent(document.cookie)

          console.log(decodeURIComponent(document.cookie))

          await ApiWrapper.whoami();
          const toast = useToast();
          toast(`Вы успешно вошли в аккаунт`, {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS});
          // return window.location.href = "http://" + this.getAuthorizedProfile.login + ".localhost:8081/page";
          if (!this.$store.getters.getAuthorizedProfile.login) {
            window.location.href = '/choose-your-subdomain'
          } else {
            let domain = window.location.host
            window.location.href = "http://" + this.$store.getters.getAuthorizedProfile.login + '.' + domain + '/';
          }
        }


        this.$refs.password.$el.classList.add('notvalid');
        const previousValue = this.$refs.password.$el.querySelectorAll('label')[0].innerText;
        this.$refs.password.$el.querySelectorAll('label')[0].innerText = 'Логин или пароль введён неверно, воспользуйтесь кнопкой “Восстановить свой пароль”'


        setTimeout(() => {
          this.$refs.password.$el.classList.remove('notvalid');
          this.$refs.password.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);
      });
    }
  }
}
</script>

<style lang="scss">

.login-page {
  color: black;
  background: #edeef0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--base-font);

  .window {
    background: white;
    width: 40%;
    height: 450px;
    border-radius: 20px;

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

@media (max-width: 1750px) {
  .login-page {
    .button-wrapper {
      width: 90%;
    }
  }
}
  @media screen and (max-width: 1470px) {
  .login-page .window .title h2 {
    font-size: 25px;
  }
  .login-page .window {
    width: 55%;
    height: auto;
    padding: 20px;
    }
    .login-page .window .inputs input {
      height: 50px;
    }
    .login-page .window .inputs label {
      left: 40px;
      top: 25px;
    }
  }
    @media screen and (max-width: 1000px) {

  .login-page .window {
    width: 60%;
    }
    .login-page .window .title h2 {
      font-size: 20px;
    }
    .login-page .window .inputs .button-wrapper {
      width: 100%;
    }
  }

  @media screen and (max-width: 769px) {
  .login-page .window {
    width: 100%;
    }
    .login-page .window .logo {
      justify-content: center;
      margin-left: 0;
    }
  }

  @media screen and (max-width: 480px) {
    .login-page .window {
      height: 50%;
    }
    .login-page .window .title h2 {
      font-size: 17px;
    }
  }

</style>
