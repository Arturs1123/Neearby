<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-buttons">
      <SidebarMenuItem :icon-path="require('../../assets/mypage.svg')" label="Моя страница" @click="openAuthenticatedPage()"
                       ></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/news.svg')" label="Новости" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/messages.svg')" label="Сообщения" link="/messenger"
                       :counter="getUnreadChats().length"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/posts.svg')" label="Посты" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/orders.svg')" label="Заказы" link="/orders"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/products.svg')" label="Товары" link="/products"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/subscriptions-menu-icon.svg')"  label="Подписки"
                       link="/subscriptions"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/fast-website.svg')" label="Быстрый сайт"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/webinar-auto.svg')" label="Вебинар|Автовебинар"
                       link="https://webinar.neearby.pro/webinar-autowebinar"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/smart-links.svg')" label="Умные ссылки"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/partners.svg')" label="Партнёрка" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/advertisments.svg')" label="Реклама"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/favourites.svg')" label="Избранное" @click="openFavorsPage()"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/awards.svg')" label="Награды" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/charity.svg')" label="Благо"
                       link="#"></SidebarMenuItem>
    </div>
  </div>

  <nav style="padding:0">
      <div class="navbar">
        <div class="container nav-container">
            <input class="checkbox" type="checkbox" name="" id="" />
            <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>  
          <div class="menu-items">
<SidebarMenuItem :icon-path="require('../../assets/mypage.svg')" label="Моя страница"
                       :link="'/page'"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/news.svg')" label="Новости" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/messages.svg')" label="Сообщения" link="/messenger"
                       :counter="getUnreadChats().length"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/posts.svg')" label="Посты" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/orders.svg')" label="Заказы" link="/orders"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/products.svg')" label="Товары" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/subscriptions-menu-icon.svg')" label="Подписки"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/fast-website.svg')" label="Быстрый сайт"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/smart-links.svg')" label="Умные ссылки"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/partners.svg')" label="Партнёрка" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/advertisments.svg')" label="Реклама"
                       link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/favourites.svg')" label="Избранное" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/awards.svg')" label="Награды" link="#"></SidebarMenuItem>
      <SidebarMenuItem :icon-path="require('../../assets/charity.svg')" label="Благо"
                       link="#"></SidebarMenuItem>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>

import SidebarMenuItem from "@/components/Sidebar/SidebarMenuItem";
import {mapGetters, mapMutations} from "vuex";
import ApiWrapper from '../../api';


export default {
  name: 'SidebarMenu',
  components: {
    SidebarMenuItem
  },
  data: function () {
    return {
      unreadChats: []
    }
  },
  methods: {
    openAuthenticatedPage(){
      let domain = window.location.host
      window.location.href = "http://" + domain + '/';
    },
    openFavorsPage() {
      let domain = window.location.host
      window.location.href = "http://" + domain + '/favors';
    },
    ...mapMutations(['setUnreadChats']),
    ...mapGetters(['getUnreadChats'])
  },
  computed: mapGetters(['getAuthorizedProfile']),
  async mounted() {

    ApiWrapper.findUnread().then(result => {
      this.setUnreadChats(result.data)
    });

    setInterval(async () => {
      ApiWrapper.findUnread().then(result => {
        this.setUnreadChats(result.data)
      });
    }, 1000)
  }
}

</script>

<style>

.sidebar-wrapper {
  display: flex;
  /* justify-content: center; */
  margin-top: 30px;
}


.container {
  max-width: 1050px;
  width: 90%;
  margin: auto;
}

.navbar {
  display: none;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
}
.item-counter {
  margin-left: 70px;
}
.navbar .menu-items {
  display: flex;
}

.navbar .nav-container li {
  list-style: none;
}

.navbar .nav-container a {
  text-decoration: none;
  color: #0e2431;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.7rem;
}

.navbar .nav-container a:hover{
    font-weight: bolder;
}

.nav-container {
  display: block;
  position: relative;
  height: 60px;
}

.nav-container .checkbox {
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  top: 10px;
  left: 35px;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.nav-container .hamburger-lines {
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  left: 35px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: #0e2431;
}

.nav-container .hamburger-lines .line1 {
  transform-origin: 0 0;
  transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
  transform-origin: 0 100%;
  transition: transform 0.4s ease-in-out;
}

.navbar .menu-items {
  padding-top: 120px;
  background: white;
  height: 100vh;
  width: 380px;
  transform: translate(-150%);
  display: flex;
  flex-direction: column;
  margin-left: -40px;
  padding-left: 50px;
  transition: transform 0.5s ease-in-out;
  text-align: center;
}

.navbar .menu-items li {
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.nav-container input[type="checkbox"]:checked ~ .menu-items {
  transform: translateX(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
  transform: rotate(45deg);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
  transform: scaleY(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
  transform: rotate(-45deg);
}

.nav-container input[type="checkbox"]:checked ~ .logo{
  display: none;
}
  @media screen and (max-width: 769px) {
.navbar {
  width: 100%;
  display: block;
  position: absolute;
  right: 45px;
  top: 95px;
  z-index: 1000;
}
.sidebar-wrapper{
  display: none;
}
  }
@media screen and (max-width: 480px) {
.navbar {
  right: 40px;
}

  }
</style>