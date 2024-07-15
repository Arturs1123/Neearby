<template>
  <div class="product-path">
    <TwentyBuyOffer :product="product" :profile="profile"/>
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
const {useToast, POSITION, TYPE} = require('vue-toastification');
export default {
  name: "ProductView",
  components: {
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
      profile: {
        comment_resolution: '',
        mail: '',
        name: '',
        phone: '',
        img: '',
        isLogin: false
      },
      product: {
      },
      showNotification: true,
      contentNotification: {
        show: localStorage.getItem('welcome-notification') != 'true',
        title: 'Новое сообщение',
        messageFrom: 'Neearby.pro',
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
    this.productId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    this.profile.mail =  this.getAuthorizedProfile.email;
    this.profile.name =  this.getAuthorizedProfile.name;
    this.profile.phone =  this.getAuthorizedProfile.phone;
    await ApiWrapper.getProfile({login: this.getAuthorizedProfile.login}).then(response => {
      this.profile.img = response.data.profile_path;
    });

    ApiWrapper.getProductById({id: this.productId})
        .then(el => {
          this.product.id  = el.data[0].id;
          this.product.product_image_path  = el.data[0].product_image_path;
          this.product.title  = el.data[0].title;
          this.product.description  = el.data[0].description;
          this.product.price  = el.data[0].price;
          this.product.download_link  = el.data[0].download_link;
          this.product.product_link  = el.data[0].product_link;
          this.product.product_type  = el.data[0].type;
          this.product.discount_price  = el.data[0].discount_price;
          this.product.comment_resolution = el.data[0].comment_resolution
          this.product.likes = el.data[0].likes;
          const formData = new FormData();
          formData.append('id', this.productId)
          formData.append('author_id', 188)
          formData.append('likes', this.product.likes + 1)
          ApiWrapper.updateActive(formData)
        }).catch((response) => {
        if(!response.success || response.data.length < 1){
              toast('Неверная ссылка на товар, данного товара не существует или он был удален', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
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
