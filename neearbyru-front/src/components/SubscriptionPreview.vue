<template>
  <div class="subscription-preview">
    <div class="subscription-preview-image">
      <img :src="subscriptionObject.subscription_image_path" v-if="subscriptionObject.active == 1" @click="go(subscriptionObject.id)" alt="">
      <img v-else src="../../src/assets/locked.png" alt="">
    </div>

    <div class="subscription-preview-title">
      <h3>{{subscriptionObject.title}}</h3>
    </div>

    <div class="product-description">
      <p>Показать описание</p>
    </div>
    <p style="text-decoration: line-through;">{{subscriptionObject.price}}₽ в месяц</p>
    <div class="subscription-preview-price">
      <p>{{subscriptionObject.discount_price}}₽ в месяц</p>
      <div style="width: 20px; display: flex;color: gray; font-size: 13px; margin-right: 10px; align-items: center; position: relative" class="item-icon">
        <img style="height: 15px; margin-left: 30px;" src="../assets/bx_link-alt.png" alt=""> 1
      </div>
      <div style="width: 20px; display: flex; color: gray; font-size: 13px; align-items: center;" class="item-icon">
        <img @click="link(product.product_link)" style="height: 15px; margin-left: 30px;" src="../assets/bx_link-alt.png" alt="">2
      </div>
    </div>


    <div class="menu_items">
      <div class="space_block"></div>
      <div class="setting">
        <div class="overlay">
          <div class="menu_overlay">
            <button style="border-radius: 10px 10px 0 0" @click="sub31 = true">Закрепить</button>
            <a target="_blank" @click="this.$router.push(`/edit-subscription/${subscriptionObject.id}`)">
              <button>Изменить</button>
            </a>
            <button @click="sub34 = true">Удалить</button>
            <button v-if="subscriptionObject.comment_resolution == 2" @click="updateSubscriptionCommented(subscriptionObject.id)">Включить комментарии</button>
            <button v-if="subscriptionObject.comment_resolution == 1" @click="sub37 = true">Выключить комментарии</button>
            <button style="border-radius: 0 0 10px 10px" @click="doCopy(subscriptionObject.id), sub39 = true">Скопировать ссылку на товар</button>
          </div>
        </div>
        <img class="fdsfsfsfs" src="../assets/menu.png" alt="" style="width: 25px; height: 25px">
      </div>
    </div>
    <div class="btns">
      <div class="item-icon" data-title="Лайки" @click="likeSubscription(subscriptionObject.id), isLikeProduct = !isLikeProduct">
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path :class="{'heart':isLikeProduct = likesed.length}"
                d="M14.4264 0.666748C12.5209 0.666748 10.8927 2.02691 9.99818 2.96464C9.10364 2.02691 7.47909 0.666748 5.57455 0.666748C2.29182 0.666748 0 2.95826 0 6.23849C0 9.85284 2.84636 12.189 5.6 14.4486C6.9 15.5165 8.24545 16.62 9.27727 17.8436C9.45091 18.0484 9.70545 18.1667 9.97273 18.1667H10.0255C10.2936 18.1667 10.5473 18.0475 10.72 17.8436C11.7536 16.62 13.0982 15.5156 14.3991 14.4486C17.1518 12.1899 20 9.85375 20 6.23849C20 2.95826 17.7082 0.666748 14.4264 0.666748Z"
                fill="#818C99" />
        </svg>
        <span style="margin-left: 0.2rem;">{{ likesed.length }}</span>
      </div>
      <div v-if="subscriptionObject.comment_resolution === 1" class="item-icon" data-title="Комментарии" @click="productShow = true, step = 2, isLikeComment = true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path :class="{'comment_f':isLikeComment = comments.length}"
                d="M15.75 0H2.25C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.5781C5.625 17.9227 6.01875 18.1231 6.29648 17.9191L10.6875 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0Z"
                fill="#818C99" />
        </svg>
        <span style="margin-left: 0.2rem;">{{ comments.length }}</span>
      </div>
      <div class="item-icon" data-title="Репосты" @click="repostSubscription(subscriptionObject.id), isLikeRepost = true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" :class="{'repost_f':isLikeRepost = reposts.length}"
                d="M12.761 0.878371C12.9324 0.821999 13.1179 0.81836 13.2915 0.867964C13.4652 0.917567 13.6184 1.01793 13.7296 1.15504L19.8165 8.65499C19.9352 8.80127 19.9997 8.98132 19.9997 9.16665C19.9997 9.35199 19.9352 9.53203 19.8165 9.67832L13.7296 17.1783C13.6183 17.3152 13.4652 17.4155 13.2916 17.465C13.118 17.5145 12.9326 17.5108 12.7613 17.4545C12.59 17.3981 12.4413 17.2919 12.336 17.1507C12.2307 17.0094 12.1741 16.8402 12.174 16.6666V13.3416C7.49671 13.435 5.2498 14.2858 4.12113 15.2108C3.0481 16.0899 2.85159 17.1241 2.64724 18.2074L2.5942 18.4866C2.55518 18.6863 2.44133 18.8656 2.27408 18.9905C2.10683 19.1154 1.89771 19.1775 1.68605 19.165C1.47439 19.1525 1.27479 19.0663 1.1248 18.9227C0.974813 18.779 0.884774 18.5878 0.871625 18.3849C0.722062 16.0949 0.946406 12.7766 2.6342 10.0008C4.27243 7.30666 7.22193 5.21658 12.174 4.99992V1.6667C12.174 1.49308 12.2305 1.32377 12.3357 1.18244C12.441 1.0411 12.5896 0.934798 12.761 0.878371Z"
                fill="#818C99" />
        </svg>
        <span style="margin-left: 0.2rem;">{{ reposts.length }}</span>
      </div>
      <div class="item-icon" data-title="Лайки" @click="repostFavor(), isLikeFavor = true">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path :class="{'favor_f':isLikeFavor = favors.length}"
                d="M0.25 2.25V17.4375C0.249929 17.5352 0.275295 17.6312 0.323603 17.7161C0.37191 17.801 0.441494 17.8718 0.525503 17.9217C0.609513 17.9715 0.705053 17.9986 0.802718 18.0003C0.900384 18.002 0.996808 17.9783 1.0825 17.9314L7 14.7026L12.9175 17.9314C13.0032 17.9783 13.0996 18.002 13.1973 18.0003C13.2949 17.9986 13.3905 17.9715 13.4745 17.9217C13.5585 17.8718 13.6281 17.801 13.6764 17.7161C13.7247 17.6312 13.7501 17.5352 13.75 17.4375V2.25C13.75 1.65326 13.5129 1.08097 13.091 0.65901C12.669 0.237053 12.0967 0 11.5 0L2.5 0C1.90326 0 1.33097 0.237053 0.90901 0.65901C0.487053 1.08097 0.25 1.65326 0.25 2.25Z"
                fill="#818C99" />
        </svg>
        <span style="margin-left: 0.2rem;">{{ favors.length }}</span>
      </div>
      <div style="margin-left: 5px; padding: 5px 0 0 0;" class="item-icon-view" data-title="Лайки">
        <img style="margin-left: 5px; width: 40px;" src="../assets/TwentyOffer/ic_views.svg" alt=""> {{ subscriptionObject.active }}
      </div>
    </div>
  </div>

  <VueFinalModal v-model="sub31">
    <Sub31 :step="step" v-if="sub31" @close="sub31=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub32">
    <Sub32 :step="step" v-if="sub32" @close="sub32=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub34">
    <Sub34 :step="step" v-if="sub34" @close="sub34=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub35">
    <Sub35 :step="step" v-if="sub35" @close="sub35=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub36">
    <Sub36 :step="step" v-if="sub36" @close="sub36=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub37">
    <Sub37 :step="step" v-if="sub37" @close="sub37=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub38">
    <Sub38 :step="step" v-if="sub38" @close="sub38=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="sub39">
    <Sub39 :step="step" v-if="sub39" @close="sub39=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>
  <VueFinalModal v-model="productShow">
    <SubSocial :step="step" v-if="productShow" @close="productShow=false" :subscription-object="subscriptionObject" :profile="profile" />
  </VueFinalModal>

<!--  <VueFinalModal name="subscriptionModal" v-model="showSubscriptionModal">-->
<!--    <SubscriptionModal type="update" :subscription="subscriptionObject"/>-->
<!--  </VueFinalModal>-->

</template>

<script>

import SubscriptionModal from "@/components/SubscriptionModal.vue";
import useClipboard from "vue-clipboard3";
import ApiWrapper from "@/api";
import Sub31 from "@/components/ModalForSubsc/Sub31";
import Sub32 from "@/components/ModalForSubsc/Sub32";
import Sub34 from "@/components/ModalForSubsc/Sub34";
import Sub35 from "@/components/ModalForSubsc/Sub35";
import Sub36 from "@/components/ModalForSubsc/Sub36";
import Sub37 from "@/components/ModalForSubsc/Sub37";
import Sub38 from "@/components/ModalForSubsc/Sub38";
import Sub39 from "@/components/ModalForSubsc/Sub39";
import {mapGetters} from "vuex";
import SubSocial from "@/components/SubSocial";

export default {
  name: 'SubscriptionPreview',
  props: {
    subscriptionObject: {},
    profile: {
      default: {}
    },
  },
  setup() {
    const { toClipboard } = useClipboard()
    const doCopy = async (productId) => {
      let domain = window.location.host
      const text = "http://" + domain + `/` + `subscription/` + productId
      try {
        await toClipboard(text)
        console.log('Copied to clipboard')
      } catch (e) {
        console.error(e)
      }
    }

    return { doCopy }
  },
  components: {
    SubSocial,
    Sub39,
    Sub38,
    Sub37,
    Sub36,
    Sub35,
    Sub34,
    Sub32,
    Sub31,
    SubscriptionModal
  },
  data () {
    return {
      sub31: false,
      sub32: false,
      sub34: false,
      sub35: false,
      sub36: false,
      sub37: false,
      sub38: false,
      sub39: false,
      showSubscriptionModal: false,
      productId: '',
      isLikeProduct: false,
      isLikeComment: false,
      isLikeRepost: false,
      isLikeFavor: false,
      productShow: false,
      step: 2,
      likesed: {
      },
      reposts: {
      },
      comments: {
      },
      favors: {
      },
    }
  },
  methods: {
    go(productId) {
      const text = `/subscription/` + this.subscriptionObject.id
      const routeData =  this.$router.resolve({path: text});
      window.open(routeData.href, '_blank');
    },
    async updateSubscriptionComments(productId){
      await ApiWrapper.updateSubscriptionComments({id: this.subscriptionObject.id, comment_resolution: 2}).then(() => {
        window.location.reload();
      })
    },
    async updateSubscriptionCommented(productId){
      await ApiWrapper.updateSubscriptionComments({id: this.subscriptionObject.id, comment_resolution: 1}).then(() => {
        window.location.reload();
      })
    },
    async likeSubscription(productId){
      await ApiWrapper.likeSub({subscriptionId: this.subscriptionObject.id, img: this.profilePicturePath, name: this.profileName, user_id: this.userId}).then(() => {
        ApiWrapper.getLikesByIdSub({target_id: this.subscriptionObject.id, status: 1})
            .then(response => {
              this.likesed = response.data
            })
      })
    },
    async repostSubscription(productId) {
      await ApiWrapper.repostSub({target_id: this.subscriptionObject.id, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, user_id: this.userId, imgProduct: this.subscriptionObject.subscription_image_path}).then(() => {
        window.location.reload();
        ApiWrapper.getRepostByIdSub({target_id: this.subscriptionObject.id, active: 1})
            .then(response => {
              this.reposts = response.data
            })
        ApiWrapper.getRepostWallByIdSub({user_id: 188, active: 1})
            .then(response => {
              this.reposts = response.data
            })
      });
    },
    async repostFavor(productId) {
      await ApiWrapper.repostFavorSub({target_id: this.subscriptionObject.id, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, user_id: this.userId, imgProduct: this.subscriptionObject.subscription_image_path}).then(() => {
        ApiWrapper.getFavorByIdSub({target_id: this.subscriptionObject.id, active: 1})
            .then(response => {
              this.favors = response.data
            })
      });
    },
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  async mounted() {
    await ApiWrapper.getLikesByIdSub({target_id: this.subscriptionObject.id, status: 1})
        .then(response => {
          this.likesed = response.data
        })
    await ApiWrapper.getCommentByIdSub({target_id: this.subscriptionObject.id})
        .then(response => {
          this.comments = response.data
        })
    await ApiWrapper.getRepostByIdSub({target_id: this.subscriptionObject.id, active: 1})
        .then(response => {
          this.reposts = response.data
        })
    await ApiWrapper.getRepostWallByIdSub({user_id: 188, active: 1})
        .then(response => {
          this.reposted = response.data
        })
    await ApiWrapper.getFavorByIdSub({target_id: this.subscriptionObject.id, active: 1})
        .then(response => {
          this.favors = response.data
        })


    this.userId = this.getCurrentProfile.id;
    await ApiWrapper.getProfile({login: this.getCurrentProfile.login}).then(response => {
      let profile = response.data;
      this.profileName = profile.name;
      this.profilePicturePath = profile.profile_path;
      console.log(profile);
      console.log(this.profileName);
    });
    // ApiWrapper.getProducts({authorId: this.profileId}).then(response => {
    //   let product = response.data;
    //   console.log(product)
    // });
  },
}
</script>

<style scoped lang="scss">
.subscription-preview-price {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btns {

  .item-icon {
    img {
      height: 85%;
      width: 85%;
    }

    cursor: pointer;
    margin-left: 10px;
    width: 40px;
    height: 20px;
    padding: 5px;
    border-radius: 5px;
    background: #edf2fa;
    transition: 0.4s;
    display: flex;
    flex-direction: row;
  }

  .item-icon:hover {
    background: #c5c3c3;
  }

  .heart {
    fill: #FF0000;
  }
  .repost_f {
    fill: #6BC432;
  }
  .comment_f {
    fill: #0077FF;
  }
  .favor_f {
    fill: #8F00FF;
  }

  .item-icon-view {
    img {
      height: 100%;
      width: 100%;
    }

    font-size: 12px;
    display: flex;
    text-align: center;
    margin-left: 15px;
    width: 35px;
    height: 15px;
    padding: 5px;
    border-radius: 5px;
    background: none;
    margin-top: 3px;
  }

  width: 100%;
  display: flex;
  position: relative;
  right: 15px;
}
.menu_overlay {
  margin: 10px auto; width: 220px; height: 30px; display: block;
  button {
    -webkit-box-shadow: -1px -4px 25px 25px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -1px -4px 25px 25px rgba(34, 60, 80, 0.2);
    box-shadow: -4px 25px 25px rgba(34, 60, 80, 0.2);
    width: 100%;
    height: 100%;
    background: white;
    border: none;
    font-size: 14px;
    transition: 0.3s;
    text-align: left;
  }

  button:hover {
    background: #c7c6c6;
    border: 1px solid #c7c6c6;
  }
}
.subscription-preview{
  gap: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;

  .subscription-preview-image{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 50%;

    img{
      width: 200px;
    }
  }

  h3, h4, p{
    margin: 0;
  }

  h3{
    margin-top: 15px;
    color: black;
  }

  h4{
    margin-top: 7px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }

  p{
    margin-top: 15px;

  }
}
.subscription-preview:hover {
  .menu_items {
    display: flex;
  }
}

.subscription-preview {
  position: relative;
  margin: 5px 0;

  p {
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  h4 {
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--base-font);

  .fdsfsfsfs {
    height: 200px;
    width: 150px;
  }

  .product-title {
    height: 50px;
    width: 100%;
    margin-top: 15px;
    text-align: center;

    h3 {
      font-family: var(--base-font);
    }
  }

  .product-description {
    margin-top: 7px;

    p {
      max-width: 20ch;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .product-price {
    margin-top: 10px;
    margin-bottom: 15px;
  }


}
.menu_items {

  position: absolute;
  display: none;
  width: 100%;

  .space_block {
    width: 140%;
  }
}
.setting {
  position: relative;
  float: right;
  display: flex;
  .overlay {
    display: none; width: 220px; position: relative;
  }
}
.setting:hover {
  .overlay {
    display: block;
  }
}
</style>