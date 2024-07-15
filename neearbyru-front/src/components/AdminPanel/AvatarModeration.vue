<template>
  <HeaderPanel />
  <div>
    <div class="main">
      <div class="admin-part">
        <div class="sidebar" style="margin-top: 80px; background-color: var(--secondary-color); width: 15%; padding-left: 40px;">
          <SidebarAdminPanel style="width: 50%;"/>
        </div>
        <div class="sidebar" style="margin-top: 80px; background-color: var(--secondary-color); width: 90%">
          <div class="moderation-body">
            <div class="title">
              <div class="moderation-title">
                <div class="fdsfsfsfs">
                  <img style="width: 40px; height: 40px; transform: rotate(180deg);" src="../../assets/logo1.png" alt="">
                  <p class="jblojka">Аватарки</p>
                </div>
                <div class="fdsfsdfsfsdfsfs">
                  <img style="width: 30px; height: 30px;" src="../../assets/Vector.svg" alt="">
                  <p>Фильтр</p>
                </div>
              </div>
              <hr>
              <div class="moderation-button">
                <p style="display: flex; justify-content: center; align-items: center; gap: 20px" @click="openModeration"><img style="width: 30px;height: 25px;margin-bottom: 2px;" src="../../assets/clock_46wzlebkkes5.svg" alt="">На модерации</p>
                <p style="display: flex; justify-content: center; align-items: center; gap: 20px" @click="openModerationAccept"><img style="width: 30px;height: 25px;margin-bottom: 2px;" src="../../assets/acceptance_ioo4wmim29fl.svg" alt="">Принятые</p>
                <p style="display: flex; justify-content: center; align-items: center; gap: 20px" @click="openModerationCancel"><img style="width: 30px;height: 25px;margin-bottom: 3px;" src="../../assets/radix-icons_cross-circled.svg" alt="">Отклоненные</p>
              </div>
            </div>
            <div class="moderation-elements">
              <div class="moderation-status">
                <p class="">Индекс</p>
                <p class="">Имя и Фамилия</p>
                <p class="">Email</p>
                <p class="">Телефон</p>
                <p class="">Быстрый просмотр</p>
                <p class="">Действия</p>
              </div>
              <div v-for="el in moderationList" v-if="step == 1">
                <hr style="position: relative; width: 100%">
                <div class="moderation-item">
                  <div>
                    <p class="" style="color: black; margin-left: 20px;position: relative; left: 15px">{{ el.id }}</p>
                  </div>
                  <div style="width: 100px; left: 60px; position: relative;">
                    <p class="" style="color: gray;">{{ el.name_user }}</p>
                  </div>
                  <div style="width: 100px">
                    <p class="" style="color: gray; position: relative; left: 15px">{{ el.email_user }}</p>
                  </div>
                  <div style="width: 100px; position: relative; left: 30px;">
                    <p class="" style="color: gray; position: relative; left: 15px">{{ el.number_user }}</p>
                  </div>
                  <div style="width: 250px; height: 150px; position: relative; left: 15px;">
                    <img style="width: 100%; height: 100%;" :src="el.img_path" alt="">
                  </div>
                  <div class="button__moderation">
                    <button @click="accept(el)" class="button__accept">Принять</button>
                    <button @click="cancel(el)" class="button__cancel">Отклонить</button>
                  </div>
                </div>
              </div>
              <div v-for="el in moderationListAccept" v-if="step == 2">
                <hr style="position: relative; width: 100%">
                <div class="moderation-item">
                  <div>
                    <p class="" style="color: black; margin-left: 20px;position: relative; left: 15px">{{ el.id }}</p>
                  </div>
                  <div style="width: 100px; left: 60px; position: relative;">
                    <p class="" style="color: gray;">{{ el.name_user }}</p>
                  </div>
                  <div style="width: 100px">
                    <p class="" style="color: gray; position: relative; left: 15px">{{ el.email_user }}</p>
                  </div>
                  <div style="width: 100px; position: relative; left: 30px;">
                    <p class="" style="color: gray; position: relative; left: 15px">{{ el.number_user }}</p>
                  </div>
                  <div style="width: 250px; height: 150px; position: relative; left: 15px;">
                    <img style="width: 100%; height: 100%;" :src="el.img_path" alt="">
                  </div>
                  <div class="button__moderation">
                    <button class="button__accept">Принято</button>
                  </div>
                </div>
              </div>
              <div v-for="el in moderationListCancel" v-if="step == 3">
                <hr style="position: relative; width: 100%">
                <div class="moderation-item">
                  <div>
                    <p class="" style="color: black; margin-left: 20px;position: relative; left: 15px">{{ el.id }}</p>
                  </div>
                  <div style="width: 100px; left: 60px; position: relative;">
                    <p class="" style="color: gray;">{{ el.name_user }}</p>
                  </div>
                  <div style="width: 100px">
                    <p class="" style="color: gray; position: relative; left: 15px">{{ el.email_user }}</p>
                  </div>
                  <div style="width: 100px; position: relative; left: 30px;">
                    <p class="" style="color: gray; position: relative; left: 15px">{{ el.number_user }}</p>
                  </div>
                  <div style="width: 250px; height: 150px; position: relative; left: 15px;">
                    <img style="width: 100%; height: 100%;" :src="el.img_path" alt="">
                  </div>
                  <div class="button__moderation">
                    <button class="button__cancel">Отклонено</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CoverModerationEl from "@/components/CoverModerationEl";
import ApiWrapper from "@/api";
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import SidebarAdminPanel from "@/components/Sidebar/SidebarAdminPanel";
import {POSITION, TYPE, useToast} from "vue-toastification";
import HeaderPanel from "@/components/AdminPanel/HeaderPanel";
export default {
  name: "AvatarModeration",
  components: {HeaderPanel, CoverModerationEl,Header,SidebarAdminPanel},
  props: ['element', 'step'],
  data(){
    return {
      step: 0,
      moderationList: [],
      moderationListAccept: [],
      moderationListCancel: [],
    }
  },
  methods: {
    accept(el) {
      ApiWrapper.acceptAvatars({id: el.id, status: 1})
          .then(() => {
            const toast = useToast();
            toast("Вы одобрили обложку", {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS, timeout: 2000});
            ApiWrapper.getModerationAvatared()
                .then(res => {
                  this.moderationList = res.data;
                })
          })
          .catch()
    },
    cancel(el) {
      ApiWrapper.cancelAvatars({id: el.id, status: 2})
          .then(() => {
            const toast = useToast();
            toast("Вы забанили обложку", {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR, timeout: 2000});
            ApiWrapper.getModerationAvatared()
                .then(res => {
                  this.moderationList = res.data;
                })
          })
          .catch()
    },
    async openModeration() {
      this.step = 1;
      await ApiWrapper.getModerationAvatared()
          .then(res => {
            this.moderationListed = res.data;
          })
    },
    async openModerationAccept() {
      this.step = 2;
      await ApiWrapper.getModerationAcceptAvatar()
          .then(response => {
            this.moderationListAccept = response.data
          })
    },
    async openModerationCancel() {
      this.step = 3;
      await ApiWrapper.getModerationCancelAvatar()
          .then(response => {
            this.moderationListCancel = response.data
          })
    },
  },
  mounted() {
    ApiWrapper.getModerationAvatared()
        .then(res => {
          this.moderationList = res.data;
        })
  }

}
</script>
<style scoped>
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
.fdsfsfsfs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.jblojka {
  font-size: 18px;
  color: black;
  font-weight: 500;
}
.fdsfsdfsfsdfsfs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  color: #393030;
  width: 220px;
  height: 40px;
  border: 1px solid #d3d2d2;
}
.moderation-button > p:hover {
  cursor: pointer;
  transition: 1s;
  border: 1px solid orangered;
}
.moderation-elements{
  margin-top: 20px;
  background: white;
  width: 99%;
  border-radius: 20px;
}
.moderation-status {
  color: black;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
}
.moderation-item {
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.button__moderation {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  right: 15px;
}
.button__accept {
  background: #50ff50;;
  border: none;
  outline: none;
  padding: 5px 10px;
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
  width: 1440px;
  padding: 40px 50px;
  border-radius: 20px;
}
.moderation-title > p {
  font-size: 16px;
  font-weight: 600;
  color: black;
}
.moderation-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.moderation-button {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.moderation-button > p:hover {
  cursor: pointer;
  transition: 1s;
  border: 1px solid orangered;
}
.moderation-status {
  color: black;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.moderation-item {
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.button__moderation {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media screen and (max-width: 1500px) {
  .title{
    text-align: left;
    background: white;
    width: 90%;
    padding: 40px 50px;
    border-radius: 20px;
  }
}


</style>