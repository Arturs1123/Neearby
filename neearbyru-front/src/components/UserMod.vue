<template>
  <div class="moderation-body">
    <div class="moderation-elements">
      <div>
        <div class="moderation-status">
          <p class="">Индекс</p>
          <p class="">Дата Регистрации</p>
          <p class="">Имя и Фамилия</p>
          <p class="">Email</p>
          <p class="">Телефон</p>
          <p class="">Статус</p>
          <p class="">Логин</p>
          <p class="">Действия</p>
        </div>
        <hr style="position: relative;width: 1125px;margin-top: 20px; margin-bottom: 20px; right: 50px;">
        <div class="moderation-item">
          <p class="" style="color: black; margin-left: 20px;">{{ users.name }}</p>
          <p class="" style="color: gray; margin-left: 20px;">{{  }}</p>
          <p class="" style="color: gray;">{{  }}</p>
          <p class="" style="color: gray">{{  }}</p>
          <p class="" style="color: gray">{{  }}</p>
          <p class="" style="color: gray">{{  }}</p>
          <p class="" style="color: gray">{{  }}</p>
          <div class="button__moderation">
            <button class="button__accept">Бан</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import CoverModerationEl from "@/components/CoverModerationEl";
import ApiWrapper from "@/api";
import UserModer from "@/components/UserModer";
export default {
  name: "UserMod",
  components: {UserModer},
  data(){
    return {
      users: {
      }
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
  margin-top: 20px;
  background: white;
  width: 90%;
  padding: 40px 50px;
  border-radius: 20px;
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
.button__accept {
  background: orangered;;
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

</style>