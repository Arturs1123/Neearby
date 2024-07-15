<template>
  <div class="moderation-body">
    <div class="title">
      <div class="moderation-title">
        <div class="fdsfsfsfs">
          <img style="width: 100%; height: 100%;" src="../assets/card.svg" alt="">
          <p class="jblojka">Подписки</p>
        </div>
        <div class="fdsfsdfsfsdfsfs">
          <img style="width: 100%; height: 100%;" src="../assets/Vector.svg" alt="">
          <p>Фильтр</p>
        </div>
      </div>
      <hr>
      <div class="moderation-button">
        <p style="display: flex; justify-content: center; align-items: center; gap: 20px" @click="openModeration"><img style="width: 30px;height: 25px;margin-bottom: 2px;" src="../assets/clock_46wzlebkkes5.svg" alt="">На модерации</p>
        <p style="display: flex; justify-content: center; align-items: center; gap: 20px" @click="openModerationAccept"><img style="width: 30px;height: 25px;margin-bottom: 2px;" src="../assets/acceptance_ioo4wmim29fl.svg" alt="">Принятые</p>
        <p style="display: flex; justify-content: center; align-items: center; gap: 20px" @click="openModerationCancel"><img style="width: 30px;height: 25px;margin-bottom: 3px;" src="../assets/radix-icons_cross-circled.svg" alt="">Отклоненные</p>
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
      <div v-for="el in moderationListed" v-if="step == 1">
        <hr style="position: relative; width: 100%">
        <div class="moderation-item">
          <div>
            <p class="" style="color: black; margin-left: 20px;position: relative; left: 15px">{{ el.id }}</p>
          </div>
          <div style="width: 100px; left: 70px; position: relative;">
            <p class="" style="color: gray;">{{ el.name_user }}</p>
          </div>
          <div style="width: 100px">
            <p class="" style="color: gray; position: relative; left: 25px">{{ el.email_user }}</p>
          </div>
          <div style="width: 100px; position: relative; left: 30px;">
            <p class="" style="color: gray; position: relative; left: 15px">{{ el.number_user }}</p>
          </div>
          <div style="width: 250px; height: 150px; position: relative; left: 15px;">
            <img style="width: 100%; height: 100%;" :src="'https://service-author.neearby.pro/' + el.subscription_image_path" alt="">
          </div>
          <div class="button__moderation">
            <button @click="accept(el)" class="button__accept">Принять</button>
            <button @click="cancel(el)" class="button__cancel">Отклонить</button>
          </div>
        </div>
      </div>
      <div v-for="el in moderationListedAccept" v-if="step == 2">
        <hr style="position: relative; width: 100%">
        <div class="moderation-item">
          <div>
            <p class="" style="color: black; margin-left: 20px;position: relative; left: 15px">{{ el.id }}</p>
          </div>
          <div style="width: 100px; left: 70px; position: relative;">
            <p class="" style="color: gray;">{{ el.name_user }}</p>
          </div>
          <div style="width: 100px">
            <p class="" style="color: gray; position: relative; left: 25px">{{ el.email_user }}</p>
          </div>
          <div style="width: 100px; position: relative; left: 30px;">
            <p class="" style="color: gray; position: relative; left: 15px">{{ el.number_user }}</p>
          </div>
          <div style="width: 250px; height: 150px; position: relative; left: 15px;">
            <img style="width: 100%; height: 100%;" :src="'https://service-author.neearby.pro/' + el.subscription_image_path" alt="">
          </div>
          <div class="button__moderation">
            <button class="button__accept">Принято</button>
          </div>
        </div>
      </div>
      <div v-for="el in moderationListedCancel" v-if="step == 3">
        <hr style="position: relative; width: 100%">
        <div class="moderation-item">
          <div>
            <p class="" style="color: black; margin-left: 20px;position: relative; left: 15px">{{ el.id }}</p>
          </div>
          <div style="width: 100px; left: 70px; position: relative;">
            <p class="" style="color: gray;">{{ el.name_user }}</p>
          </div>
          <div style="width: 100px">
            <p class="" style="color: gray; position: relative; left: 25px">{{ el.email_user }}</p>
          </div>
          <div style="width: 100px; position: relative; left: 30px;">
            <p class="" style="color: gray; position: relative; left: 15px">{{ el.number_user }}</p>
          </div>
          <div style="width: 250px; height: 150px; position: relative; left: 15px;">
            <img style="width: 100%; height: 100%;" :src="'https://service-author.neearby.pro/' + el.subscription_image_path" alt="">
          </div>
          <div class="button__moderation">
            <button class="button__cancel">Отклонено</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";

export default {
  name: "SubModEl",
  props: ['element', 'step'],
  data() {
    return {
      step: 0,
      subscription_image_path: "",
      moderationList: [],
      moderationListed: [],
      moderationListedAccept: [],
      moderationListedCancel: [],
    }
  },
  methods: {
    accept(el) {
      ApiWrapper.acceptSubscription({id: el.id})
          .then(() => {
            const toast = useToast();
            toast("Вы одобрили подписку", {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS, timeout: 2000});
            ApiWrapper.getModerationSubscriprioned({active: 0})
                .then(res => {
                  this.moderationListed = res.data;
                })
          })
          .catch()
    },
    cancel(el) {
      ApiWrapper.cancelSubscription({id: el.id})
          .then(() => {
            const toast = useToast();
            toast("Вы забанили подписку", {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR, timeout: 2000});
            ApiWrapper.getModerationSubscriprioned({active: 0})
                .then(res => {
                  this.moderationListed = res.data;
                })
          })
          .catch()
    },
    async openModeration() {
      this.step = 1;
      await ApiWrapper.getModerationSubscriprioned({active: 0})
          .then(res => {
            this.moderationListed = res.data;
          })
    },
    async openModerationAccept() {
      this.step = 2;
      await ApiWrapper.getModerationSubscriprioned({active: 1})
          .then(response => {
            this.moderationListedAccept = response.data
          })
    },
    async openModerationCancel() {
      this.step = 3;
      await ApiWrapper.getModerationSubscriprioned({active: 2})
          .then(response => {
            this.moderationListedCancel = response.data
          })
    },
  },
  mounted() {
    ApiWrapper.getModerationSubscriprioned({active: 0 || 1 || 2})
        .then(res => {
          this.moderationListed = res.data;
        })
  },
  // created() {
  //   if (this.$props.step) {
  //     this.step = this.$props.step
  //     if (this.step === 1) {
  //       this.openModeration()
  //     } else if (this.step === 2) {
  //       this.openModerationAccept()
  //     } else if (this.step === 3) {
  //       this.openModerationCancel()
  //     }
  //   }
  // }
}
</script>
<style scoped>
.moder-el{
  margin-left: 20px;
  margin-bottom: 10px;
  width: 300px;
}
img{
  width: 300px;
  height: 300px;
}
.fdsfsfsfs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.fdsfsdfsfsdfsfs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.btns{
  display: flex;
  width: 100%;
}
.moderation-body {
  padding-top: 20px;
  min-height: 100vh;
  background-color: var(--secondary-color);
}
.title{
  text-align: left;
  background: white;
  width: 1430px;
  padding: 40px 50px;
  border-radius: 20px;
}
.moderation-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
.jblojka {
  font-size: 18px;
  color: black;
  font-weight: 500;
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
.btn{
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 10px;
}
.green{
  background: greenyellow;
}
.red{
  background: crimson;
}
.block{
  width: 20px;
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