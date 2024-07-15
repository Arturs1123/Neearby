<template>
  <div class="notification-wrapper">
    <div class="notification-header">
      <p class="modal-font"> Новое сообщение </p>
      <img src="../assets/home-view/cancel-modal.svg" alt="" @click="closeEvent(id)">
    </div>
    <div class="notification-body">
      <img class="logo" src="../assets/home-view/logo.svg" alt="">
      <div class="notification-content">
        <div class="flex">
          <p class='title'> {{ notificationFrom }} </p>
          <img class="check-mark" src="../assets/home-view/check-mark.svg">
        </div>

        <p class="message">
          {{ notificationContent }}
        </p>
      </div>
    </div>
    <button @click="closeNot(id, clickEvent)">Посмотреть</button>
  </div>
</template>

<script>
import ApiWrapper from "@/api";

export default {
  name: "NotificationInvited",
  props: ['notificationContent', 'title', 'notificationFrom', 'clickEvent', 'closeEvent', 'id'],
  methods: {
    closeNot(id, event){
      ApiWrapper.closeNotifications({notificationId: id});
      this.$router.push('/messenger')
    },
    linkTo(){

    },
  },
  data() {
    return {
      content: this.notificationContent,
    }
  }
}
</script>

<style scoped lang="scss">
.notification-wrapper {
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  animation-name: rollOut;
  animation-duration: 3.6s;
  opacity: 1;

  .notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FFDBBA;
    height: 2rem;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    padding: 0 4% 0 4%;

    p {
      color: #00000099;
      font-weight: 500;
      font-size: 14px;
    }

    img {
      width: 6%;
    }
  }

  .notification-body {
    display: flex;
    height: min-content;
    padding: 5% 0 2% 5%;

    .logo {
      margin-right: 5%;
      margin-bottom: 6%;
    }

    .notification-content {
      text-align: start;

      .flex {
        display: flex;

        .title {
          font-size: 16px;
          font-weight: 600;
          font-family: var(--base-font);
          margin-bottom: 1px;
        }

        .check-mark {
          margin-left: 1%;
        }
      }

      .message {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  button {
    width: 40%;
    height: 1.7rem;
    background-color: #FE6637;
    color: white;
    font-size: 14px;
    font-weight: 500;
    border: 1px #FE6637;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
  }
}

@keyframes rollOut {
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  100% {
    opacity: 1;
    display: flex;
    transform: translate(0, 0);
  }
}
</style>