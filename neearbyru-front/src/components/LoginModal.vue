<template>
  <div class="auth-modal">

    <h2>Авторизация</h2>
    <hr width="100%">
    <div class="auth-wrapper">
      <div class="auth-inputs">
        <TextInput placeholder="Логин" class="custom-input" v-model="email"/>
        <TextInput placeholder="Пароль" class="custom-input" v-model="password" type="password"/>
      </div>
      <div class="login-button">
        <OrangeButton button-label="Войти" :click-event="authenticate"/>
      </div>
    </div>
  </div>
</template>

<script>

import TextInput from "@/components/TextInput";
import OrangeButton from "@/components/Buttons/OrangeButton";
import ApiWrapper from "../api";
const { $vfm } = require('vue-final-modal');
import { mapMutations } from "vuex";

export default {
  name: 'LoginModal',
  props: {},
  components: {
    TextInput,
    OrangeButton
  },
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(["setAuthorizedProfile", "setAuthorized"]),

    authenticate: async function (){
      let response = await ApiWrapper.login(this.email, this.password);

      if(response.success){
        await this.$vfm.hideAll();
      }

      let whoami = await ApiWrapper.whoami();

      // window.location.href = `/page/${whoami.data.login}`

      this.setAuthorizedProfile(whoami.data);
      this.setAuthorized(true);
      window.location.href = '/';

    }
  }
}

</script>

<style lang="scss">

.auth-modal {
  position: fixed;
  width: 30%;
  height: 30vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  hr{
    padding: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-color: rgba(0,0,0,0.2)
  }
  h2{
    margin: 10px 0 10px 0;
    font-family: var(--base-font);
  }

  .auth-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .auth-inputs{
    margin-top: 10px;
    width: 80%;
  }

  .custom-input{
    margin-bottom: 30px;
  }
}


</style>