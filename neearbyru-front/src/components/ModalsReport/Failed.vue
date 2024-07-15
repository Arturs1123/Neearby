<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Модерация жалобы</span>
        <img class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
      </div>
      <div class="mw_inner">
        <img src="../../assets/cross.jpg" alt="">
        <div class="title">
          Вы подавали жалобу на спам аккаунта<br>
          “https://alexhotpro.neearby.pro”
        </div>
        <span class="sup_title" style="color: #7A7777; text-align: left">
                    Комментарий от модератора: “Данный аккаунт<br>
                    “https://alexhotpro.neearby.pro” не присылал Вам ссылки на мошеннические сайты.
                </span>
        <div class="sup_title">
          С уважением, команда Neearby.<br>
          Neearby - всегда рядом.
        </div>
      </div>
      <div class="btn_y">OK</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Failed",
  components: {
  },
  data() {
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.modal_window {
  position: fixed;
  top: 0;
  left: 0;
  text-align: left;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1120;
  transition: .3s all;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  .modal_window_i {
    width: 550px;
    height: 470px;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      font-size: 16px;
    }
  }
}

.mw_up {
  background-color: #FFDBBA;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  span {
    font-weight: 500 !important;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
}
.mw_inner > img {
  margin-left: 40%;
}
.mw_down {
  background-color: #FFDBBA;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;
}

.btn_y {
  width: 85px;
  height: 40px;
  background: #FE6637;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1rem;
}

.close_btn {
  cursor: pointer;
}

.mw_inner {
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  // font-family: 'Inter', serif;

  .sup {
    font-size: 16px;
    color: #7A7777;
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .title {
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 18px;
    color: black;
    font-weight: 500;
  }
  .sup_title{
    margin-top: 1rem;
    text-align: left;
  }
}
@media screen and (max-width: 500px) {
  .modal_window .modal_window_i {
    height: auto;
  }
  .btn_y {
    margin-top: 10px;
  }
}
</style>