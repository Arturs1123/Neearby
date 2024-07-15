<template>
  <div class="home">
    <Header />
    <Report style="display: none;"/>
    <Spam style="display: none;"/>
    <Scam style="display: none;"/>
    <Insult style="display: none;"/>
    <Porno style="display: none;"/>
    <Problem style="display: none;"/>
    <Wait style="display: none;"/>
    <Succes/>
    <PostModalBig style="display: none;"/>
    <ModalVideo  style="display: none;"/>
    <div class="main-body">
      <div class="sidebar">
        <SidebarMenu />
      </div>
      <div class="author-content">
        <div class="full-width">

          <ProfileCover :image-path="coverImagePath" :mnt="coverImagePathMiniature" @uploadModules="showCovModal"
            @deleteCover="showDelCoverModal" @changeCoverMiniature="changeCoverMiniature" />
          <ProfileShortInfo :short-description="profileDescription" :followers-amount="followersCount"
            :subscribers-amount="subscribersCount" :sales-amount="salesCount" :image-path="profilePicturePath"
            :profilePictureMiniature="profilePictureMiniature" :name="profileName" @update-photo="updatePhoto"
            @delete_photo="deletePhoto" @changeProfileMiniature="changeProfileMiniature" />
        </div>

        <div v-if="reasonBanned == 1" style="height: 300px; width: 100%; margin-top: 10px; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: white" class="no-products">
            <h1>Вы находитесь в бане!</h1>
        </div>

        <div v-else class="posts-and-products">
          <ProductsSeparator :products-amount="products.length" />
          <ProductsSection :products="products" :profile="profile" />
          <PostsSeparator :posts-amount="posts.length" />
          <PostsSections />

          <RepostSeparator />
          <RepostSection />
        </div>


        <div v-if="reasonBanned == 1" class="subscriptions">
          <div style="height: 300px; width: 100%; font-size: 10px; margin-top: 10px; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: white" class="no-products">
            <h1>Вы находитесь в бане!</h1>
          </div>
        </div>

        <div v-else class="subscriptions">
          <SubscriptionsSeparator :subscriptions-amount="subscriptions.length"/>
          <SearchSubscriptions />
          <div class="add-subscription-button" v-if="getCurrentProfile.id || getAuthorizedProfile.userId">
            <OrangeButton :click-event="clicked" button-label="Добавить подписку" />
          </div>
          <SubscriptionsSection :subscriptions="subscriptions" :profile="profile"/>
<!--          <SubscriptionPreview v-for="subscription in subscriptions" :subscription-object="subscription" />-->
        </div>
      </div>
    </div>
    <Footer></Footer>

    <div class="notification-container">
      <div class="notif" v-for="notification of getUnreadNotifications">
        <Notification v-if="notification.status == 1" :notificationContent="notification.data.text"
          :notification-from="notification.data.from.name" :click-event="notification.data.showOn"
          :close-event="hideNotification" :id="notification.notification_id" />
      </div>

    </div>
  </div>

  <VueFinalModal name="photoModal" v-model="showPhotoModal">
    <PhotoModal @close="updatePhoto" @update-photo="showPhotoModal = true, getProfile"></PhotoModal>
  </VueFinalModal>
  <VueFinalModal name="photoModal" v-model="showCoverModal">
    <CoverModal @close="showCoverModal = !showCoverModal" @update-photo="showCoverModal = true, getProfile"></CoverModal>
  </VueFinalModal>
  <VueFinalModal name="deletePhotoModal" v-model="showDeleteCoverModal">
    <DeleteCoverModal @close='showDeleteCoverModal = !showDeleteCoverModal' @update-photo="getProfile"></DeleteCoverModal>
  </VueFinalModal>
  <VueFinalModal name="deletePhotoModal" v-model="showDeletePhotoModal">
    <DeletePhotoModal @close='deletePhoto' @update-photo="getProfile"></DeletePhotoModal>
  </VueFinalModal>

  <VueFinalModal name="changeMiniatureModal" v-model="showChangeMiniatureCoverModal" v-if="showChangeMiniatureCoverModal">
    <ChangeMiniatureCoverModal @updateProfilePictureMiniature="updateCoverMiniature"
      @changeCoverMiniature="changeCoverMiniature" :coverImagePath="coverImagePath"></ChangeMiniatureCoverModal>
  </VueFinalModal>


  <VueFinalModal name="changeMiniatureModal" v-model="showChangeMiniatureProfileModal"
    v-if="showChangeMiniatureProfileModal">
    <ChangeMiniatureProfileModal @updateProfilePictureMiniature='updateProfilePictureMiniature'
      @changeProfileMiniature='changeProfileMiniature' :profilePicturePath="profilePicturePath">
    </ChangeMiniatureProfileModal>
  </VueFinalModal>




  <VueFinalModal name="changeMiniatureModal" v-model="itemProfileModal">
    <Item @popUp="itemProfileModal = true" @close="itemProfileModal = false" />
  </VueFinalModal>
  <VueFinalModal name="changeMiniatureModal" v-model="SubProfileModal">
    <Sub @popUp="SubProfileModal = true" @close="SubProfileModal = false" />
  </VueFinalModal>
  <VueFinalModal name="changeMiniatureModal" v-model="PictureProfileModal">
    <PictureMod @popUp="PictureProfileModal = true" @close="PictureProfileModal = false" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal name="changeMiniatureModal" v-model="AvatarProfileModal">
    <AvatarMod @popUp="AvatarProfileModal = true" @close="AvatarProfileModal = false" :profile="profile" />
  </VueFinalModal>
<!--  <VueFinalModal name="changeMiniatureModal" v-model="CoverProfileModal">-->
<!--    <Sub @popUp="CoverProfileModal = true" @close="CoverProfileModal = false" />-->
<!--  </VueFinalModal>-->
</template>

<script>
// @ is an alias to /sr
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import ProfileCover from "@/components/ProfileCover";
import ProfileShortInfo from "@/components/ProfileShortInfo";
import ProductsSeparator from "@/components/ProductsSeparator";
import ProductsSection from "@/components/ProductsSection"
import SubscriptionsSeparator from "@/components/SubscriptionsSeparator";
import SearchSubscriptions from "@/components/SearchSubscriptions"
import OrangeButton from "@/components/Buttons/OrangeButton";
import SubscriptionPreview from "@/components/SubscriptionPreview";
import PostsSeparator from "@/components/PostsSeparator";
import Footer from "@/components/Footer.vue";
import Post from "@/components/Post";
import PhotoModal from "@/components/PhotoModal";
import DeletePhotoModal from "@/components/DeletePhotoModal";
import CoverModal from "@/components/CoverModal";
import DeleteCoverModal from "@/components/DeleteCoverModal";
import ChangeMiniatureProfileModal from "@/components/ChangeMiniatureProfileModal.vue";
import ChangeMiniatureCoverModal from "@/components/ChangeMiniatureCoverModal.vue";
import Notification from "@/components/Notification";
import ApiWrapper from "../api";
import { mapGetters, mapMutations } from "vuex";
import PostsSections from "@/components/PostsSection.vue";
import SubscriptionsSection from "@/components/SubscriptionsSection.vue";
import Item from "@/components/Item";
import PostModalBig from "@/components/PostModalBig";
import ModalVideo from "@/components/ModalVideo";
import Report from "@/components/ModalsReport/Report";
import Spam from "@/components/ModalsReport/Spam";
import Scam from "@/components/ModalsReport/Scam";
import Insult from "@/components/ModalsReport/Insult";
import Porno from "@/components/ModalsReport/Porno";
import Problem from "@/components/ModalsReport/Problem";
import Wait from "@/components/ModalsReport/Wait";
import Succes from "@/components/ModalsReport/Succes";
import {inject} from "vue";
import RepostSeparator from "@/components/RepostSeparator";
import RepostSection from "@/components/RepostSection";
import Sub from "@/components/Sub";
import AvatarMod from "@/components/Avatar";
import Picture from "@/components/Picture";
import PictureMod from "@/components/Picture";





export default {
  name: "HomeView",
  components: {
    PictureMod,
    Picture,
    AvatarMod,
    Sub,
    RepostSection,
    RepostSeparator,
    Item,
    SubscriptionsSection,
    PostsSections,
    ProfileCover,
    Header,
    SidebarMenu,
    ProfileShortInfo,
    ProductsSeparator,
    ProductsSection,
    SubscriptionsSeparator,
    SearchSubscriptions,
    OrangeButton,
    SubscriptionPreview,
    PostsSeparator,
    Post,
    PhotoModal,
    DeletePhotoModal,
    CoverModal,
    DeleteCoverModal,
    ChangeMiniatureProfileModal,
    ChangeMiniatureCoverModal,
    Notification,
    Footer,
    PostModalBig,
    ModalVideo,
    Report,
    Spam,
    Scam,
    Insult,
    Porno,
    Problem,
    Wait,
    Succes
  },
  data() {
    return {
      itemProfileModal: false,
      PictureProfileModal: false,
      SubProfileModal: false,
      AvatarProfileModal: false,
      CoverProfileModal: false,
      coverImagePath: '',
      coverImagePathMiniature: '',
      profileDescription: '',
      followersCount: '',
      reasonBanned: 0,
      subscribersCount: '',
      pictureId: 0,
      coverId: 0,
      salesCount: '',
      profilePicturePath: '',
      profilePictureMiniature: '',
      profileCoverMiniature: '',
      profileName: '',
      posts: [],
      profileLogin: '',
      profileId: '',
      products: [],
      subscriptions: [],
      showPhotoModal: false,
      showCoverModal: false,
      showDeletePhotoModal: false,
      showDeleteCoverModal: false,
      showChangeMiniatureProfileModal: false,
      showChangeMiniatureCoverModal: false,
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
          },
        }
      },
    }
  },
    props: {
      profileLink: null,
      profile: {}
    },
  methods: {
    ...mapMutations(['setCurrentProile']),
    updatePhoto() {
      this.showPhotoModal = !this.showPhotoModal
    },
    showDelCoverModal() {
      this.showDeleteCoverModal = !this.showDeleteCoverModal;
    },
    clicked: function (event){
      this.$router.push('/add-subscription');
    },
    showCovModal() {
      this.showCoverModal = !this.showCoverModal;
    },
    deletePhoto() {
      this.showDeletePhotoModal = !this.showDeletePhotoModal
    },
    changeProfileMiniature() {
      this.showChangeMiniatureProfileModal = !this.showChangeMiniatureProfileModal
    },
    updateProfilePictureMiniature(data) {
      this.profilePictureMiniature = data
    },
    changeCoverMiniature() {
      this.showChangeMiniatureCoverModal = !this.showChangeMiniatureCoverModal
    },
    updateCoverMiniature(data) {
      this.coverImagePathMiniature = data
    },
    showMessages(data) {
      location.href = data;
    },
    hideNotification(id) {
      ApiWrapper.readNotification({ notificationId: id, status: 4 });
    },
    async getProfile() {
      await ApiWrapper.getProfile({ login: this.profileLogin }).then(response => {
        let profile = response.data;
        this.coverImagePath = profile.cover_path;
        this.profileDescription = profile.description;
        this.followersCount = profile.followers_count;
        this.profileName = profile.name;
        this.subscribersCount = profile.subscribers_count;
        this.profilePicturePath = profile.profile_path;
        this.coverImagePathMiniature = profile.miniature.length > 0 ? JSON.parse(profile.miniature) : false;
        this.profilePictureMiniature = profile.profile_miniature.length > 0 ? JSON.parse(profile.profile_miniature) : false;
        this.salesCount = profile.sells_count;
        this.profileId = profile.id;
        this.setCurrentProile(profile);
      });
    },
    async getModeration(profile) {
      await ApiWrapper.getModerationAvatarByUser({ id: profile.profile_id })
        .then(el => {
          if (el.data.length > 0) {
            this.coverId = el.data[0].id;
            setTimeout(this.getModerationCover, 1000);
          }
        })
      await ApiWrapper.getModerationCoverByUser({ id: profile.cover_id })
        .then(el => {
          if (el.data.length > 0) {
            this.profileId = el.data[0].id;
          }

        })

    },
    async getModerationCover() {
      await ApiWrapper.getModerCover({ id: this.coverId })
        .then(el => {
          let status = el.data[0].status;
          if (status == 1) {
            return;
          }
          if (status == 2) {
            return;
          }
          setTimeout(this.getModerationCover, 1000);
        });

    },
    async getModerationAvatar() {

    },
  },

  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  async mounted() {

    this.profileLogin = this.profileLink;
    await ApiWrapper.getProfile({ login: this.profileLogin }).then(response => {

      // const $cookies = inject('$cookies')
      //
      // this.$cookies.config('180d', '', '', true)
      //
      // window.$cookies.get('token')

      console.log(11111)



      console.log(decodeURIComponent(document.cookie))



      let profile = response.data;
      this.reasonBanned = profile.reason_banned;
      this.coverImagePath = profile.cover_path;
      this.profileDescription = profile.description;
      this.followersCount = profile.followers_count;
      this.profileName = profile.name;
      this.subscribersCount = profile.subscribers_count;
      this.profilePicturePath = profile.profile_path;
      this.coverImagePathMiniature = profile.miniature.length > 0 ? JSON.parse(profile.miniature) : false;
      this.profilePictureMiniature = profile.profile_miniature.length > 0 ? JSON.parse(profile.profile_miniature) : false;
      this.salesCount = profile.sells_count;
      this.profileId = profile.id;
      console.log(432894247324729042042)
      console.log(profile)
      this.coveredID = profile.cover_path_id
      this.profileID = profile.profile_picture_id
      console.log(this.coveredID)
      console.log(this.profileID)
      this.setCurrentProile(profile);
    });
    ApiWrapper.getProducts({ authorId: this.profileId }).then(response => {
      this.products = response.data;
      const formData = new FormData();
      formData.append('id', this.productId)
      formData.append('author_id', 188)
      formData.append('likes', this.product.likes + 1)
      ApiWrapper.updateActive(formData)
    });
    ApiWrapper.getPosts({ authorId: this.profileId }).then(response => {
      this.posts = response.data;
    })
    ApiWrapper.searchSubscriptions({ authorId: this.profileId }).then(response => {
      this.subscriptions = response.data;
    })
  }
};
</script>

<style lang="scss">
body {
  margin: 0 !important;
}

.home {
  height: 100vh;
  background-color: #EDEEF0;

  .notification-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    height: 9rem;
    width: 30%;
    overflow: hidden;
    padding: 1%;
  }

  .disable {
    display: none;
  }
}



.main-body {
  display: grid;
  grid-template-columns: 2fr 3fr 15fr 3fr;
  background-color: var(--secondary-color);
  padding-bottom: 20px;
}

.sidebar {
  grid-column: 2 / 3;
  margin-top: 80px;
}

.author-content {
  grid-column: 3 / 4;
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  margin-top: 110px;

  .full-width {
    grid-column: 1 / 3;
  }

  .posts-and-products {
    grid-column: 1 / 2;
  }

  .subscriptions {
    margin-left: 15px;
    width: calc(100% - 15px);
    display: flex;
    flex-direction: column;
    grid-column: 2 / 3;

    .add-subscription-button {
      margin-top: 15px;
    }
  }

  @media (max-width: 1250px) {
    .posts-and-products {
      grid-column: 1 / 3;
    }

    .subscriptions {
      grid-column: 1 / 3;
      margin-left: 0;
      width: 100%;
    }
  }

}

@media screen and (max-width: 1500px) {

  .subscriptions-separator {
    height: auto;
  }

  .subscriptions-separator h3 {
    font-size: 20px;
    padding-bottom: 20px;
  }

  .posts-section-wrapper .no-posts {
    padding-bottom: 20px;
  }

  body .main-body {
    grid-template-columns: 1fr 3fr 15fr 1fr;
  }

  .sidebar-wrapper {
    justify-content: start;
  }

  body .author-content {
    grid-template-columns: 4fr 2fr;
    margin-top: 85px;
  }
}

@media screen and (max-width: 769px) {
  .posts-section-wrapper .no-posts {
    height: auto;
    margin-bottom: 0;
  }

  .footer-wrapper .footer {
    margin-left: 25px;
  }

  .posts-separator-wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .products-separator-wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .profile-short-info-wrapper {
    height: auto;
    font-size: 16px;
    padding-bottom: 10px;
  }

  .profile-short-info {
    grid-template-columns: 1fr;
  }

  .profile-description {
    grid-column: 1;
  }

  .profile-description .author-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .product-section-wrapper .no-products {
    font-size: 16px;
  }

  body .main-body {
    grid-template-columns: 0.1fr 0.1fr 15fr 0.1fr;
  }

  .nav-container .hamburger-lines .line {
    background: white;
  }

  .nav-container input[type="checkbox"]:checked~.hamburger-lines .line1 {
    background: black;
  }

  .nav-container input[type="checkbox"]:checked~.hamburger-lines .line2 {
    background: black;
  }

  .nav-container input[type="checkbox"]:checked~.hamburger-lines .line3 {
    background: black;
  }

  .circle {
    margin-right: 40px;
  }
}

@media screen and (max-width: 480px) {
  .product-section-wrapper .no-products {
    font-size: 16px;
  }

  .posts-section-wrapper .no-posts {
    font-size: 16px;
  }

  .author-content .subscriptions {
    position: relative;
    top: -500px;
  }

  .posts-section-wrapper {
    position: relative;
    top: 380px;
  }

  .posts-separator-wrapper {
    position: relative;
    top: 380px;
  }

  .profile-description .profile-name h3 {
    font-size: 25px;
  }

  .big {
    height: 350px;
  }

  .products-separator-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;
  }

  .products-separator-wrapper .products-amount {
    margin-top: 20px;
    padding-left: 0;
  }

  .products-separator-wrapper .create-product {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }

  .button-wrapper {
    width: 100%;
    right: 0;
  }

  .products-separator-wrapper .search {
    width: 100%;
  }

  .search-wrapper {
    width: 100%;
  }

  .posts-separator-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;
  }

  .posts-separator-wrapper .posts-amount {
    padding-left: 0;
    margin-top: 20px;
  }

  .posts-separator-wrapper .search {
    margin-top: 20px;
    width: 100%;
  }

  .posts-separator-wrapper .create-posts {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }

}

@media screen and (max-width: 420px) {
  .products-separator-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }

  .products-separator-wrapper .search {
    grid-column: 1;
    padding-bottom: 20px;
    margin-top: 20px;
  }

  .products-separator-wrapper .products-amount {
    padding-left: 2%;
  }

  .search-wrapper {
    width: 90%;
  }

  .posts-separator-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }

  .home .notification-container {
    width: 100%;
  }

  .posts-separator-wrapper .search {
    grid-column: 1;
    padding-bottom: 20px;
  }

  .posts-separator-wrapper .posts-amount {
    padding-left: 2%;
  }

  .posts-section-wrapper .no-posts {
    margin-bottom: 60px;
    padding-bottom: 20px;
  }
}
</style>
