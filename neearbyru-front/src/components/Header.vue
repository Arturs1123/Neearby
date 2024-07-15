<template>
  <header class="header">
    <div class="header-content">
    <a :href="`/`" class="logo">
      <img src="../assets/logo1.png" alt="">
      <h3>
        Neearby.Pro
      </h3>
    </a>
    <div class="menu-buttons" v-if="getAuthorizedStatus">
      <NotificationsButton @click="showNotifications = !showNotifications" :showDropdown="showNotifications" :counter="1"/>
      <InviteButton/>
      <SubscriptionsButton/>
    </div>
    <div class="auth-buttons" v-if="!getAuthorizedStatus">
      <OrangeButton button-label="Вход" :inverted="true"
                    :click-event="login"></OrangeButton>
      <OrangeButton button-label="Регистрация" :click-event="registration"></OrangeButton>
    </div>

    <div class="promotions-and-catalogue" v-if="getAuthorizedStatus">
      <div class="buttons">
        <HeaderButton label="Акции" />

        <HeaderButton label="Каталог" :dropdown="[
           {
            label: 'Каталог авторов',
            clickEvent: authorCatalogue,
          },
          {
            label: 'Каталог подписчиков',
            clickEvent: subscribersCatalogue
          },
          {
            label: 'Каталог товаров',
            clickEvent: productsCatalogue
          },
        ]"/>
      </div>
    </div>
    <div class="header-profile-icon" v-if="getAuthorizedStatus">

        <HeaderProfileIcon :profile-picture-path="getAuthorizedProfile.profile_picture_path" :profile-picture-miniature="!getAuthorizedProfile.profile_miniature ? false : JSON.parse(getAuthorizedProfile.profile_miniature)" :dropdown="
        [
            { label: `${getAuthorizedProfile.name} • ID: ${getAuthorizedProfile.userId}`, iconPath: getAuthorizedProfile.profile_picture_path, iconRounded: true, clickEvent: openAuthenticatedPage},
            { label: 'Администрация', iconPath: require('../assets/crown-icon.svg')},
            { label: 'Приобрести NEEARBY VIP', iconPath: require('../assets/crown1-icon.svg') },
            { label: 'Кабинет покупателя', iconPath: require('../assets/home-icon.svg') },
            { label: 'Вывод денег', iconPath: require('../assets/withdraw-icon.svg'), clickEvent: withdrawPage },
            { label: 'Настройки', iconPath: require('../assets/settings-icon.svg') },
            { label: 'Помощь', iconPath: require('../assets/help-icon.svg') },
            { label: 'Выйти', iconPath: require('../assets/logout.svg'), clickEvent: logout },
        ]
"/>
      </div>
      
    </div>
    <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <div class="menu-buttons" v-if="getAuthorizedStatus">
      <NotificationsButton @click="showNotifications = !showNotifications" :showDropdown="showNotifications" :counter="1"/>
      <InviteButton/>
      <SubscriptionsButton/>
    </div>
    <div class="auth-buttons" v-if="!getAuthorizedStatus">
      <OrangeButton button-label="Вход" :inverted="true"
                    :click-event="login"></OrangeButton>
      <OrangeButton button-label="Регистрация" :click-event="registration"></OrangeButton>
    </div>

    <div class="promotions-and-catalogue" v-if="getAuthorizedStatus">
      <div class="buttons">
        <HeaderButton label="Акции" />

        <HeaderButton label="Каталог" :dropdown="[
           {
            label: 'Каталог авторов',
            clickEvent: authorCatalogue,
          },
          {
            label: 'Каталог подписчиков',
            clickEvent: subscribersCatalogue
          },
          {
            label: 'Каталог товаров',
            clickEvent: productsCatalogue
          },
        ]"/>
      </div>
    </div>
    <div class="header-profile-icon" v-if="getAuthorizedStatus">

        <HeaderProfileIcon :profile-picture-path="getAuthorizedProfile.profile_picture_path" :dropdown="
        [
            { label: `${getAuthorizedProfile.name} • ID: ${getAuthorizedProfile.userId}`, iconPath: getAuthorizedProfile.profile_picture_path, iconRounded: true, clickEvent: openAuthenticatedPage},
            { label: 'Администрация', iconPath: require('../assets/crown-icon.svg')},
            { label: 'Приобрести NEEARBY VIP', iconPath: require('../assets/crown1-icon.svg') },
            { label: 'Кабинет покупателя', iconPath: require('../assets/home-icon.svg') },
            { label: 'Вывод денег', iconPath: require('../assets/withdraw-icon.svg'), clickEvent: withdrawPage },
            { label: 'Настройки', iconPath: require('../assets/settings-icon.svg') },
            { label: 'Помощь', iconPath: require('../assets/help-icon.svg') },
            { label: 'Выйти', iconPath: require('../assets/logout.svg'), clickEvent: logout },
        ]
"/>
      </div>
    </ul>
  </div>
  </header>

  <VueFinalModal name="loginModal" v-model="showAuthModal">
    <LoginModal/>
  </VueFinalModal>


</template>

<script>

import NotificationsButton from "@/components/Buttons/NotificationsButton";
import InviteButton from "@/components/Buttons/InviteButton";
import SubscriptionsButton from "@/components/Buttons/SubscriptionsButton";
import OrangeButton from "@/components/Buttons/OrangeButton";
import LoginModal from "@/components/LoginModal";
import HeaderButton from "@/components/Buttons/HeaderButton";
import HeaderProfileIcon from "@/components/HeaderProfileIcon";
import {useStore, mapGetters} from "vuex";

export default {
  name: "Header",
  components: {
    InviteButton,
    NotificationsButton,
    SubscriptionsButton,
    OrangeButton,
    LoginModal,
    HeaderButton,
    HeaderProfileIcon
  },
  props: {
    showDropdown: {
      type: Boolean
    }
  },
  data: function () {
    return {
      showAuthModal: false,
      showNotifications: false
    }
  },
  methods: {
    openModal: function () {
      this.$refs.loginModal.show();
    },
    authorCatalogue: function (){
      window.location.href = '/catalogue';
    },
    subscribersCatalogue: function (){
      window.location.href = '/subscribers';
    },
    productsCatalogue: function (){
      window.location.href = '/products';
    },
    logout: function (){
      console.log(this.$cookies.set('token', null,'180d', '/', '.neearby.ru', false, ''));
      // console.log(this.$cookies.remove("token"))
      console.log(document.cookie)
      decodeURIComponent(document.cookie)
      console.log(decodeURIComponent(document.cookie))
      window.location.href = "http://neearby.ru";
    },
    openAuthenticatedPage(){
      let domain = window.location.host
      window.location.href = "http://" + domain + '/';
    },
    withdrawPage(){
      window.location.href = `/withdraw`;
    },
    login: function (){
      this.$router.push('/enter-your-personal-account');
    },
    registration: function (){
      this.$router.push('/registration');
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
    },
  },
  computed: mapGetters(['getAuthorizedStatus', 'getAuthorizedProfile', "getSubdomain"])
}


</script>

<style lang="scss">
.header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: 2fr 18fr 3fr;
  grid-auto-flow: column;
  grid-row: 1;
  grid-template-rows: 80px 1fr;
  background-color: white;

  .header-content{
    grid-column: 2 / 3;
    display: grid;
    grid-template-rows: 80px 1fr;
    grid-template-columns: 2fr 4fr 2fr 1fr;
  }

  .header-profile-icon {
    grid-column: 4 / 5;
    display: flex;
    justify-content: end;
  }

  .promotions-and-catalogue {
    grid-column: 3 / 4;
    grid-row: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .buttons {
      width: 200px;
      display: flex;
      justify-content: space-between;
    }
  }
  .auth-buttons {
    grid-column: 4 / 5;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 300px;
  }

  .menu-buttons {
    padding-left: 30px;
    display: flex;
    align-items: center;
    grid-column: 2 / 3;
    grid-row: 1;
    height: 100%;
  }

  .menu-buttons a {
    margin-right: 20px;
    padding: 10px;
  }

  .logo {
    grid-column: 1 / 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    cursor: pointer;

    h3{
      margin-left: 10px;
    }
  }
 .hamburger-menu{
  display: none;
 }
  .logo h3 {
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 34px;
    color: black;

  }

  .logo img {
    height: 70%;
  }
  .navbar {
    display: none;
  }
  #menu__toggle {
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
}
.menu__btn {
  position: relative;
  top: 20px;
  left: 30px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 1;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: relative;
  width: 40px;
  height: 2px;
  background-color: #616161;
  transition-duration: .25s;
}
.menu__btn > span::before {
  content: '';
  top: -8px;
}
.menu__btn > span::after {
  content: '';
  top: 8px;
}
.menu__box {
    display: flex;
    position: fixed;
    flex-direction: column-reverse;
    top: 0;
    left: -100%;
    width: 300px;
    height: 400px;
    margin: 0;
    padding: 80px 0;
    list-style: none;
    background-color: #ECEFF1;
    box-shadow: 2px 2px 6px rgb(0 0 0 / 40%);
    transition-duration: 0.25s;
}
.menu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: .25s;
}
.menu__item:hover {
  background-color: #CFD8DC;
}
}

@media screen and (max-width: 1480px) {
  .header .menu-buttons {
    padding-left: 20px;
    position: relative;
  }
  .home > .header {
    grid-template-columns: 2fr 37fr 3fr;
  }
  .home .header .header-content {
    grid-template-columns: 1fr 4fr 2fr 1fr;
  }

}

@media screen and (max-width: 1100px) {
.header .header-content{
  display: none;
}
  .header .navbar {
    display: block;
  }
  .header .menu-buttons {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    height: auto;
  }
  .navbar .menu-items {
    align-items: flex-start;
  }
  .header .promotions-and-catalogue .buttons {
    flex-direction: column;
  }
  .header .hamburger-menu {
    display: block;
    z-index: 10000;
  }
  .header .header-profile-icon {
    justify-content: center;
    margin-top: 15px;
  }
  .nav-button-wrapper {
    margin-top: 10px;
  }
  .header .menu__box .auth-buttons {
    display: flex;
    flex-direction: column;
    margin-bottom: 150px;
  }
  .header .menu__box .auth-buttons .button-wrapper{
    width: 80%;
    margin-top: 20px;
  }
  .header .menu__box .auth-buttons .button-wrapper .inverted {
    width: 100%;
  }
}

</style>