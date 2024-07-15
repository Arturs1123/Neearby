<template>
  <div class="product-path">
    <TwentySubOffer :subscription-object="subscriptionObject" :profile="profile"/>
    <div class="notification-container">
      <div class="notif" v-for="notification of getUnreadNotifications">
        <Notification v-if="notification.status == 1" :notificationContent="notification.data.text" :notification-from="notification.data.from.name" :click-event="showMessages" :close-event="hideNotification" :id="notification.notification_id" />
      </div>
    </div>
  </div>


</template>

<script>
// @ is an alias to /sr
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import Footer from "@/components/Footer.vue";
import Notification from "@/components/Notification";
import ApiWrapper from "../api";
import {mapGetters, mapMutations} from "vuex";
import ProductInfo from "@/components/ProductInfo.vue";
import SubscriptionsSection from "@/components/SubscriptionsSection.vue";
import TwentyBuyOffer from "@/components/TwentyBuyOffer";
import TwentySubOffer from "@/components/TwentySubOffer";
const {useToast, POSITION, TYPE} = require('vue-toastification');
export default {
  name: "SubcView",
  components: {
    TwentySubOffer,
    TwentyBuyOffer,
    Header,
    SidebarMenu,
    Notification,
    Footer,
    ProductInfo
  },
  data() {
    return {
      productId: '',
      subscriptionObjectId: '',
      profile: {
        mail: '',
        name: '',
        phone: '',
        img: '',
        isLogin: false
      },
      product: {
      },
      subscriptionObject: {},
      showNotification: true,
      contentNotification: {
        show: localStorage.getItem('welcome-notification') != 'true',
        title: 'Новое сообщение',
        messageFrom: 'Neearby.com',
        message: 'Алекс Жаркий, поздравляем! Теперь Вы сможете продав...',
        button: {
          label: 'Посмотреть',
          clickEvent: () => {
            this.showNotification = false;
            localStorage.setItem('welcome-notification', 'true');
          }
        }
      },
    }
  },
  methods: {
    ...mapMutations(['setCurrentProile']),


  },

  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },

  async mounted() {
    const toast = useToast();
    this.subscriptionObjectId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    this.profile.mail =  this.getAuthorizedProfile.email;
    this.profile.name =  this.getAuthorizedProfile.name;
    this.profile.phone =  this.getAuthorizedProfile.phone;
    await ApiWrapper.getProfile({login: this.getAuthorizedProfile.login}).then(response => {
      this.profile.img = response.data.profile_path;
    });
    ApiWrapper.getSubById({id: this.subscriptionObjectId})
        .then(el => {
          this.subscriptionObject.id  = el.data[0].id;
          this.subscriptionObject.subscription_image_path  = el.data[0].subscription_image_path;
          this.subscriptionObject.title  = el.data[0].title;
          this.subscriptionObject.description  = el.data[0].description;
          this.subscriptionObject.price  = el.data[0].price;
          this.subscriptionObject.download_link  = el.data[0].download_link;
          this.subscriptionObject.product_link  = el.data[0].product_link;
          this.subscriptionObject.discount_price = el.data[0].discount_price;
          this.subscriptionObject.comment_resolution = el.data[0].comment_resolution
          // this.subscriptionObject.likes = el.data[0].likes;
          // const formData = new FormData();
          // formData.append('id', this.productId)
          // formData.append('author_id', 188)
          // formData.append('likes', this.subscriptionObject.likes + 1)
          // ApiWrapper.updateActive(formData)
        }).catch((response) => {
      if(!response.success || response.data.length < 1){
        toast('Неверная ссылка на подписку, данной подписки не существует или она была удалена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
        return this.$router.push(`/`);
      }
      this.product = response.data[0];
    });
  }
};
</script>

<style scoped>
.main-body{
  width: 100%;
  margin: auto;
}
</style>
