<template>
  <div class="password-recovery-page">
    <div class="window">
      <a class="logo" href="/">
        <img src="../assets/logo1.png" alt="">
        <h2>Neearby.Pro</h2>
      </a>

      <div class="title">
        <h2>Восстановление своего пароля</h2>
      </div>

      <div class="inputs">
        <TextInput ref="email" v-model="email" placeholder="Введите Ваш email"/>

        <div class="button-wrapper">
          <OrangeButton button-label="Восстановить свой пароль" :click-event="recoverPassword"/>
          <p style="font-size: 10px; color: #b2b2b2; margin-top: 5px;">Нажимая на кнопку, Вы соглашаетесь с документацией Neearby</p>
        </div>

      </div>
    </div>
  </div>

  <VueFinalModal name="photoModal" v-model="showResetModal">
    <PasswordResetModal :closeModal="closeModal" :email="email"></PasswordResetModal>
  </VueFinalModal>

</template>

<script>
import TextInput from "@/components/TextInput.vue";
import OrangeButton from "@/components/Buttons/OrangeButton.vue";
import ApiWrapper from "../api";
import {mapGetters, mapMutations} from "vuex";
import { useRouter, useRoute } from 'vue-router'
import {POSITION, TYPE, useToast} from "vue-toastification";
import PasswordResetModal from "@/components/PasswordResetModal.vue";

export default {
  name: "Registration",
  components: {PasswordResetModal, TextInput, OrangeButton},
  data(){
    return{
      password: '',
      email: '',
      showResetModal: false
    }
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile'])
  },
  methods: {
    ...mapMutations(["setRegistrationData", "setRecoveryEmail"]),

    closeModal() {
      this.showResetModal = !this.showResetModal
    },

    recoverPassword(){

      this.setRecoveryEmail(this.email)

      ApiWrapper.recoverPassword({email: this.email}).then((response => {


        if(response.success !== true){
          this.$refs.email.$el.classList.add('notvalid');
          const previousValue = this.$refs.email.$el.querySelectorAll('label')[0].innerText;
          this.$refs.email.$el.querySelectorAll('label')[0].innerText = 'Введите корректный email'


          setTimeout(() => {
            this.$refs.email.$el.classList.remove('notvalid');
            this.$refs.email.$el.querySelectorAll('label')[0].innerText = previousValue;
          }, 2000);

          return;
        };

        const toast = useToast();
        toast(`На почту выслан новый пароль`, {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS});
        this.showResetModal = true;
      }))
    }

  }
}
</script>

<style lang="scss">

.password-recovery-page {
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
    height: 400px;
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
        height: 50px;
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
        top: 28px;
        left: 40px;
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

  @media screen and (max-width: 1450px) {
    .password-recovery-page .window {
      width: 60%;
      height: auto;
      padding: 20px;
    }
    .password-recovery-page .window .inputs .button-wrapper {
      width: 90%;
    }
    .password-recovery-page .window .title h2 {
      font-size: 25px;
    }
  }
  @media screen and (max-width: 769px) {
    .password-recovery-page .window {
      width: 100%;
    }
    .password-recovery-page .window .inputs .button-wrapper {
      width: 100%;
    }
    .password-recovery-page .window .title h2 {
      font-size: 20px;
    }
  }
    @media screen and (max-width: 500px) {
      .password-recovery-page .window .title h2 {
        font-size: 20px;
      }
  }
      @media screen and (max-width: 400px) {
      .password-recovery-page .window .title h2 {
        font-size: 17px;
      }
  }

</style>