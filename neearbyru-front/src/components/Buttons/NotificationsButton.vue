<template>
  <div class="notifications-button">
    <a href="#" class="button-wrapper" :class="{ active: this.showDropdown }">
      <div class="button-content">
        <img src="../../assets/notifications.svg">
        <div class="counter" v-if="getUnreadNotifications.length" >
          <h5>{{ getUnreadNotifications.length }}</h5>
        </div>
      </div>
      <div class="button-label">
        Уведомления
      </div>
    </a>
    <div class="dropdown" v-if="this.showDropdown">
      <div class="title">
        Уведомления
      </div>

      <hr style="margin-top: 0; margin-bottom: 10px;">
      <div class="notification-item" v-for="element of getNotifications" :data-id="element.notification_id" :data-status="element.status" v-observe-visibility="visibilityChanged">
        <div v-if="element.data">

        <div class="body">
          <div class="author d-flex">
            <div class="picture">
              <img :src="require('../../assets/home-view/logo.svg')" alt="">
            </div>
            <div class="date">
              <h3>{{element?.data?.from?.name}}</h3>
              <p style="font-size: 12px; margin-top: 2px;">{{new Date(element?.created_at).toLocaleDateString() + ' в ' + new Date(element?.created_at).getHours() + ':' + new Date(element?.created_at).getMinutes()}}</p>
              <p style="color: black; font-size: 14px; margin-top: 2px;">{{element?.data?.text}}</p>
            </div>
          </div>
          <div class="d-flex" style="text-align: center">
            <OrangeButton style="margin-right: 20px; align-self: center" @click="closeNotification(element.notification_id, element?.data)" button-label="Посмотреть" height="30"/>
          </div>

        </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>

import OrangeButton from "@/components/Buttons/OrangeButton.vue";
import {mapGetters, mapMutations} from "vuex";
import ApiWrapper from '../../api';

export default {
  name: "NotificationsButton",
  components: {
    OrangeButton
  },
  props: {
    counter: {
      type: Number,
      default: 0,
    },
    showDropdown: {
      type: Boolean
    }
  },
   data() {
    return {
      notifications: [
      ]
    }
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile', 'getNotifications', 'getUnreadNotifications']),
  },
  methods: {
    ...mapMutations(['setNotifications', 'setUnreadNotifications']),
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible;
      if(isVisible){
        let message = entry.target;
        const status = message.getAttribute('data-status');
        const id = message.getAttribute('data-id');

        if(status === '1' || status === '4'){

          ApiWrapper.readNotification({notificationId: id});
        }

      }
    },
    getUnreadNotifications(notifications){

      return notifications.filter(el => el.status === 1 );
    },
    closeNotification(id, data){
      ApiWrapper.closeNotifications({notificationId: id});
      this.$router.push('/messenger');
    }
  },
  mounted() {
    setInterval(async () => {
      let notifications = (await ApiWrapper.getNotifications()).data;
      let unreadNotification = (await ApiWrapper.getUnreadNotification()).data;
       if(unreadNotification.length > this.getUnreadNotifications.length){
         const audio = new Audio(require('../../assets/newmessage.mp3')); // path to file
         audio.play();
       }

       this.setUnreadNotifications(unreadNotification);
       this.setNotifications(notifications);
    }, 1000);


  }
}
</script>


<style lang="scss">
h3 {
  color: black;
  font-size: 18px;
}

.notifications-button {
  font-family: var(--base-font);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .active {
    box-shadow: 3px 3px 60px 3px rgba(0, 0, 0, 0.1);
  }

  .dropdown {
    z-index: 500;
    top: 79px;
    left: 0;
    position: absolute;
    min-width: 600px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: white;
    box-shadow: 3px 3px 60px 3px rgba(0, 0, 0, 0.1);

    .title {
      font-weight: 500;
      font-size: 17px;
      text-align: left;
      padding: 20px 20px 10px 20px;
    }

    .notification-item{
      margin-bottom: 15px;
      display: flex;

      .picture{
        img{
          width: 70%;
          height: auto;
          border-radius: 10px;
        }

        width: 20%;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        margin-left: 20px;
      }

      .body{
        display: flex;
        flex-direction: row;
        align-items: center;

        .date{
          margin-top: 2px;
          font-size: 12px;
          color: gray;
          text-align: left;}

        .message{
          text-align: left;
          font-size: 16px;
          font-weight: bold;
          max-width: 440px;
          margin-top: 5px;
          margin-left: 30px;

        }
      }
    }

  }

  .button-wrapper {
    cursor: pointer;
    text-decoration: none;
  }

  .button-content {
    position: relative;

    img {
      max-height: 25px;
    }
  }

  .button-content .counter {
    position: absolute;
    top: 0;
    right: 25px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #FE6637;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .counter h5 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    color: white;
  }
  .d-flex{
    display: flex;
  }
  .button-label {
    color: #818C99;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
}
@media screen and (max-width: 450px) {

  .notifications-button .dropdown {
    z-index: 500;
    top: 79px;
    position: absolute;
    margin-left: 120px;
    left: auto;
    min-width: 400px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #fff;
  }
  .notifications-button .dropdown .notification-item .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .notifications-button .dropdown .notification-item .picture {
    width: 20%;
    height: 50px;
    display: flex;
    justify-content: center;
    margin-left: 0;
  }
}
</style>