<template>
  <div class="modal">
    <div class="modal-header">
      <p class="modal-text"> Предупреждение </p>
      <img  src="../assets/home-view/cancel-modal.svg" alt="" @click="close()">

    </div>
    <div class="modal-body">
      <p class="text-modal">
        Вы уверены, что хотите выйти?
      </p>
    </div>
    <div class="modal-footer">
      <div>
        <button @click="close()" class="cancel modal-text"> Отмена </button>
        <button class="delete modal-text" @click="logout(), close()" style="cursor: pointer"> Выйти </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalLogout",
  methods: {
    logout: function (){
      console.log(this.$cookies.set('token', null,'180d', '/', '.neearby.pro', false, ''));
      // console.log(this.$cookies.remove("token"))
      console.log(document.cookie)
      decodeURIComponent(document.cookie)
      console.log(decodeURIComponent(document.cookie))
      let domain = window.location.host
      window.location.href = "http://" + this.$store.getters.getAuthorizedProfile.login + '.' + domain + '/49';
    },
    close(){
      this.$emit('close');
    },
  }
}
</script>

<style scoped lang="scss">
.modal {
  height: 18%;
  width: 35%;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:#FFDBBA;
    height: 3.5rem;
    overflow: hidden;
    border-radius: 15px 15px 0 0;
    padding: 0 4% 0 4%;

    p {
      color: #00000099;
      font-weight: 500;
      margin-bottom: 0;
    }
  }

  .modal-body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 4rem;
    .text-modal {
      font-weight: 400;
      color: #000000;
      font-size: 16px;
      font-family: 'Inter';
      margin-bottom: 0;
    }
  }

  .modal-footer {
    display: flex;
    align-items: center;
    background-color:#FFDBBA;
    height: 3.5rem;
    overflow: hidden;
    border-radius:0 0 15px 15px ;
    padding: 0 4% 0 4%;
    position: absolute;
    bottom:0;
    width: 92%;

    div {
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      margin-left: 35%;

      button {

      }
      .delete {
        height: 1.9rem;
        background-color: #FE6637;
        color: white;
        font-size: 16px;
        font-weight: 400;
        border: 1px #FE6637;
        border-radius: 5px;
        padding: 0 7% 0 7%;
      }
      .cancel {
        margin-right: 9%;
        border: none;
        background: none;
        font-weight: 500;
        font-size: 15px;
      }
    }

  }
}
@media screen and (max-width: 1480px) {
  .modal {
    height: 170px;
  }
}
@media screen and (max-width: 769px) {
  .modal {
    width: 80%;
  }
}
@media screen and (max-width: 480px) {
  .modal {
    width: 100%;
  }
  .modal .modal-footer div {
    margin-left: 25%;
  }
}
</style>