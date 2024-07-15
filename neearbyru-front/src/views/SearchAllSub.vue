<template>
  <div class="products">
    <Header />
    <div style="height: 100vh;" class="main-body">
      <div class="sidebar">
        <SidebarMenu />
      </div>
      <div class="products__content">
        <SubSectionAll :subscription-object="subscriptionObject" :profile="profile" />
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
import SubSectionAll from "@/components/SearchAllSubed";

export default {
  name: "SearchAllSub",
  components: {
    SubSectionAll,
    Header, SidebarMenu, ProductsSectionAll
  },
  props: ['profile', 'subscriptionObject'],
  data() {
    return {
      products: [],
      subscriptionObject: [],
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
    ApiWrapper.searchSubscriptions({ authorId: this.profileId }).then(response => {
      this.subscriptionObject = response.data;
    });
  }
}
</script>

<style scoped>

</style>