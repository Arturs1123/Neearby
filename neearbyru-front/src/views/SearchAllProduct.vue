<template>
  <div class="products">
    <Header />
    <div style="height: 100vh;" class="main-body">
      <div class="sidebar">
        <SidebarMenu />
      </div>
      <div class="products__content">
        <ProductsSectionAll :products="products" :profile="profile" />
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  import SidebarMenu from "@/components/Sidebar/SidebarMenu";
  import ApiWrapper from "@/api";
  import ProductsSectionAll from "@/components/SearcedAllProducted";
  import {mapGetters} from "vuex";

  export default {
    name: "SearchAllProduct",
    components: {
      Header, SidebarMenu, ProductsSectionAll
    },
    props: ['profile'],
    data() {
      return {
        products: [],
        profile: {
          mail: '',
          name: '',
          phone: '',
          img: '',
          isLogin: false
        },
      }
    },
    computed: {
      ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
    },

    async mounted() {
      this.profile.mail =  this.getAuthorizedProfile.email;
      this.profile.name =  this.getAuthorizedProfile.name;
      this.profile.phone =  this.getAuthorizedProfile.phone;
      await ApiWrapper.getProfile({login: this.getAuthorizedProfile.login}).then(response => {
        this.profile.img = response.data.profile_path;
      });
      ApiWrapper.getProducts({ authorId: this.profileId }).then(response => {
        this.products = response.data;
      });
    }
  }
</script>

<style>
 .products__content {
   margin-top: 100px;
 }
</style>