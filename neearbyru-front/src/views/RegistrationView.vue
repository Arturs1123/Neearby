<template>
  <div class="registration-page">
    <div class="registration-window">
      <a class="logo" href="/">
        <img src="../assets/logo1.png" alt="">
        <h2>Neearby.Pro</h2>
      </a>

      <div class="title">
        <h2>Моментальная регистрация + Ваш бонус</h2>
        <h3>*Узнайте, как получить 500 рублей в течение 1 часа*</h3>
      </div>

      <div class="inputs">
        <TextInput ref="name" v-model="name" placeholder="Введите Ваше имя и фамилию"/>
        <TextInput ref="email" v-model="email" placeholder="Введите Ваш email"/>
        <TextInput v-mask="`+7##############`" masked="raw" ref="phone" v-model="phone" placeholder="Введите номер Вашего моб. телефона"/>

        <div class="button-wrapper">
          <OrangeButton button-label="Зарегистрироваться в Neearby" :click-event="registerUser"/>
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
import {mapMutations} from "vuex";
import { useRouter, useRoute } from 'vue-router'
import {POSITION, TYPE, useToast} from "vue-toastification";
export default {
  name: "Registration",
  components: {TextInput, OrangeButton},
  data(){
    return{
      name: '',
      phone: '',
      email: ''
    }
  },
  methods: {
    ...mapMutations(["setRegistrationData"]),

    registerUser: function (){

      const router = useRouter();
      let valid = true;


      // Тряска полей ввода при невалидном вводе
      if(this.name.split(' ').length < 2){
        this.$refs.name.$el.classList.add('notvalid');
        const previousValue = this.$refs.name.$el.querySelectorAll('label')[0].innerText;
        this.$refs.name.$el.querySelectorAll('label')[0].innerText = 'Введите корректное имя + фамилию';
        valid = false;


        setTimeout(() => {

          this.$refs.name.$el.classList.remove('notvalid');
          this.$refs.name.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);
      }


      const regex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");
      if(!this.email.match(regex)){
        this.$refs.email.$el.classList.add('notvalid');
        const previousValue = this.$refs.email.$el.querySelectorAll('label')[0].innerText;
        this.$refs.email.$el.querySelectorAll('label')[0].innerText = 'Введите корректный email'
        valid = false;

        setTimeout(() => {
          this.$refs.email.$el.classList.remove('notvalid');
          this.$refs.email.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);
      }


      if(!this.phone){
        this.$refs.phone.$el.classList.add('notvalid');
        const previousValue = this.$refs.phone.$el.querySelectorAll('label')[0].innerText;
        this.$refs.phone.$el.querySelectorAll('label')[0].innerText = 'Введите корректный номер телефона'
        valid = false;


        setTimeout(() => {
          this.$refs.phone.$el.classList.remove('notvalid');
          this.$refs.phone.$el.querySelectorAll('label')[0].innerText = previousValue;
        }, 2000);
      }

      if(!valid){
        const toast = useToast();
        toast(`Заполните все поля`, {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
        return;
      }




      this.setRegistrationData({
        email: this.email,
        name: this.name,
        phone: this.phone
      });


      ApiWrapper.registerUser({name: this.name, email: this.email, phone: this.phone}).then((response) => {
        if(response.success) {
          // localStorage['token'] = response.data.token
          this.$router.push('/confirm-your-registration');
        } else {
          const toast = useToast();
          toast(`Данная почта уже занята`, {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
        }
      })

    }
  }
}
</script>

<style lang="scss">

.registration-page {
  color: black;
  background: #edeef0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--base-font);

  .registration-window {
    background: white;
    width: 40%;
    height: 500px;
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
        margin-top: 20px;
        height: 50px;
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

  @media screen and (max-width: 1470px) {
    .registration-page .registration-window{
      width: 50%;
      height: auto;
      padding: 20px 0;
    }
    .registration-page .registration-window .title h2 {
      font-size: 27px;
    }
  .registration-page .registration-window .title h3 {
        font-size: 17px;
        padding: 10px 10px 10px 10px;
    }
    .registration-page .registration-window .inputs input {
      height: 40px
    }
    .registration-page .registration-window .inputs label {
    top: 25px;
    left: 45px;
    }
    .registration-page .registration-window .inputs .button-wrapper {
      width: 85%;
    }
  }
  @media screen and (max-width: 1200px) {
    .registration-page .registration-window{
      width: 60%;
    }
  }
  @media screen and (max-width: 1000px) {
    .registration-page .registration-window{
      width: 75%;
    }
  }
    @media screen and (max-width: 769px) {
    .registration-page .registration-window{
      width: 90%;
    }
  }
  @media screen and (max-width: 600px) {
    .registration-page .registration-window{
      width: 100%;
      height: 55%;
    }
    .registration-page .registration-window .title h2 {
      font-size: 25px;
    }
    .registration-page .registration-window .title h3 {
      font-size: 15px;
    }
    .registration-page .registration-window .logo {
      margin-left: 0;
      justify-content: center;
    }
    .registration-page .registration-window .title {
      margin-top: 20px;
    }
    .registration-page .registration-window .inputs .button-wrapper {
      width: 100%;
    }
  }
    @media screen and (max-width: 600px) {
    .registration-page .registration-window{
      width: 100%;
      height: 55%;
    }
    .registration-page .registration-window .title h2 {
      font-size: 20px;
    }
    .registration-page .registration-window .title h3 {
      font-size: 13px;
    }
    .registration-page .registration-window .inputs .button-wrapper {
      width: 100%;
    }
  }

</style>