<template>
  <HeaderPanel/>
  <div>
    <div class="main">
      <div class="admin-part">
        <div class="sidebar" style="margin-top: 80px; background-color: var(--secondary-color); width: 15%; padding-left: 40px;">
          <SidebarAdminPanel style="width: 50%;"/>
        </div>
        <div class="sidebar" style="margin-top: 80px; background-color: var(--secondary-color); width: 90%">
          <div class="moderation-body">
                      <div class="filter">
                        <div>
                          <p style="display: flex; flex-direction: row;align-items: center;justify-content: center; gap: 10px"><img src="../assets/Vector.svg" alt="">Фильтр</p>
                        </div>
                      </div>
            <div class="moderation-elements">
              <div>
                <div class="moderation-status">
                  <p class="">Индекс</p>
                  <p style="margin-left: 30px" class="">Дата Регистрации</p>
                  <p style="margin-left: 60px" class="">Имя и Фамилия</p>
                  <p style="margin-left: 100px" class="">Email</p>
                  <p style="margin-left: 120px" class="">Телефон</p>
                  <p style="margin-left: 70px" class="">Статус</p>
                  <p style="margin-left: 80px" class="">Логин</p>
                  <p style="margin-left: 60px" class="">Действия</p>
                </div>
                <div v-for="el in users" >
                  <hr style="position: relative; width: 100%">
                  <div class="moderation-item">
                    <p class="" style="color: black;">{{ el.id }}</p>
                    <p class="" style="color: gray; margin-left: 20px;">{{new Date(el.created_at).toLocaleDateString()}} {{new Date(el.created_at).toLocaleTimeString()}}</p>
                    <p class="" style="color: gray; margin-left: 95px;">{{ el.name }}</p>
                    <p class="" style="color: gray;margin-left: 70px;">{{ el.email }}</p>
                    <p class="" style="color: gray;margin-left: 95px;">{{ el.phone }}</p>
                    <p v-if="el.role === 1" class="" style="color: gray; margin-left: 30px">user</p>
                    <p v-else class="" style="color: gray;margin-left: 30px">author</p>
                    <p class="" style="color: gray; margin-left: 30px;">{{ el.login }}<br>.neearby.pro</p>
                    <div style="margin-left: 50px;" class="button__moderation">
                      <button @click="banUsers(el)" class="button__accept">Бан</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!--      <div class="admin-part">-->
<!--        <AvatarModeration/>-->
<!--      </div>-->
  <!--    <div class="admin-part">-->
  <!--      <ProductModeration/>-->
  <!--    </div>-->
<!--  <Footer/>-->
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverModeration from "@/components/AdminPanel/CoverModeration";
import AvatarModerationEl from "@/components/AvatarModerationEl";
import AvatarModeration from "@/components/AvatarModeration";
import ProductModeration from "@/components/ProductModeration";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import SidebarAdminPanel from "@/components/Sidebar/SidebarAdminPanel"
import UserMod from "@/components/UserMod";
import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";
import HeaderPanel from "@/components/AdminPanel/HeaderPanel";
export default {
  name: "AdminPanel",
  components: {
    HeaderPanel,
    UserMod,
    ProductModeration, AvatarModeration, AvatarModerationEl, CoverModeration, Footer, Header, SidebarMenu, SidebarAdminPanel
  },
  data(){
    return {
      users: [],
    }
  },
  methods: {
    async banUsers(el) {
     await ApiWrapper.banUser({id: el.id, reason_banned: 1})
          .then(() => {
            const toast = useToast();
            toast("Вы забанили пользователя", {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS, timeout: 2000});
            ApiWrapper.getModerationUsers()
                .then(response => {
                  this.users = response.data;
                })
          })
          .catch()
    }
  },
  async mounted() {
    await ApiWrapper.getModerationUsers()
        .then(response => {
          this.users = response.data;
        })
  },
}
</script>

<style scoped>
  .main{
    position: relative;
    width: 100%;
  }
  .admin-part{
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  .moderation-body {
    padding-top: 20px;
    min-height: 100vh;
    background-color: var(--secondary-color);
  }
  .title{
    text-align: left;
    background: white;
    width: 90%;
    padding: 40px 50px;
    border-radius: 20px;
  }
  .moderation-title > p {
    font-size: 16px;
    font-weight: 600;
    color: black;
  }
  .moderation-button {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
  .moderation-button > p {
    font-size: 16px;
    font-weight: 600;
    color: black;
    padding: 10px 50px;
    border: 1px solid #d3d2d2;
  }
  .moderation-button > p:hover {
    cursor: pointer;
    transition: 1s;
    border: 1px solid orangered;
  }
  .moderation-elements{
    background: white;
    width: 1200px;
    border-radius: 20px;
  }
  .moderation-status {
    color: black;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    padding: 20px;
  }
  .filter {
    margin: 15px 0;
    width: 150px;
    height: 50px;
  }
  .filter > div > p {
    padding: 10px 30px;
    border: 2px solid orangered;
    background: white;
    border-radius: 10px;
  }
  .moderation-item {
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0;
  }
  .moderation-item > p {
    width: 100px;
    font-size: 14px;
  }
  .button__moderation {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  .button__accept {
    background: orangered;;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
  }
  .button__cancel {
    background: #c11b1b;
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 1500px) {
    .moderation-elements{
      background: white;
      width: 99%;
      border-radius: 20px;
    }
  }

</style>