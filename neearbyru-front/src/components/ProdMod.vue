<template>
  <div class="moderation-body">
    <div class="title">
      <div class="moderation-title">
        <p class="jblojka">Обложки</p>
      </div>
      <hr>
      <div class="moderation-button">
        <p>На модерации</p>
        <p>Принятые</p>
        <p>Отклоненные</p>
      </div>
    </div>
    <div class="moderation-elements">
      <div class="moderation-status">
        <p class="">Индекс</p>
        <p class="">Имя и Фамилия</p>
        <p class="">Email</p>
        <p class="">Телефон</p>
        <p class="">Быстрый просмотр</p>
        <p class="">Логин</p>
        <p class="">Действия</p>
      </div>
      <hr style="position: relative;width: 1125px;margin-top: 20px; margin-bottom: 20px; right: 50px;">
      <div class="moderation-item">
        <p class="" style="color: black; margin-left: 20px;">1</p>
        <p class="" style="color: gray;">Алекс Жаркий</p>
        <p class="" style="color: gray">pdashenko@mail.ru</p>
        <p class="" style="color: gray">88888888888</p>
        <p class="" style="color: gray">Фотография</p>
        <p class="" style="color: gray">Логин</p>
        <div class="button__moderation">
          <button class="button__accept">Принять</button>
          <button class="button__cancel">Отклонить</button>
        </div>
      </div>
    </div>
    <!--    <div class="moderation-elements">-->
    <!--&lt;!&ndash;      <div v-for="i in moderationList">&ndash;&gt;-->
    <!--&lt;!&ndash;        <CoverModerationEl @changeCover="getAllModerationCover" :element="i" />&ndash;&gt;-->
    <!--&lt;!&ndash;      </div>&ndash;&gt;-->
    <!--    </div>-->
  </div>

</template>


<script>
import CoverModerationEl from "@/components/CoverModerationEl";
import ApiWrapper from "@/api";
export default {
  name: "ProdMod",
  components: {CoverModerationEl},
  data(){
    return {
      moderationList: [],
    }
  },
  methods: {//getModerationCover
    getAllModerationCover(){
      ApiWrapper.getModerationCover()
          .then(res => {
            this.moderationList = res.data;
          })

    },
  },
  mounted() {
    this.getAllModerationCover();
    setInterval(this.getAllModerationCover, 2000);
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

</style>