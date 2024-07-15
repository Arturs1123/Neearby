<!--<template>-->
<!--  <div class="product-section-wrapper">-->
<!--    <div style="padding: 20px" class="repost__product" v-for="repost of reposts">-->
<!--        <img style="height: 200px; width: 150px;" :src="repost.imgProduct">-->
<!--    </div>-->
<!--    <div class="btns">-->
<!--      <div class="item-icon" data-title="Лайки" @click="likeProduct(product.id), isLikeProduct = !isLikeProduct">-->
<!--        <svg width="20" height="19" viewBox="0 0 20 19" fill="none"-->
<!--             xmlns="http://www.w3.org/2000/svg">-->
<!--          <path :class="{'heart':isLikeProduct = likes.length}"-->
<!--                d="M14.4264 0.666748C12.5209 0.666748 10.8927 2.02691 9.99818 2.96464C9.10364 2.02691 7.47909 0.666748 5.57455 0.666748C2.29182 0.666748 0 2.95826 0 6.23849C0 9.85284 2.84636 12.189 5.6 14.4486C6.9 15.5165 8.24545 16.62 9.27727 17.8436C9.45091 18.0484 9.70545 18.1667 9.97273 18.1667H10.0255C10.2936 18.1667 10.5473 18.0475 10.72 17.8436C11.7536 16.62 13.0982 15.5156 14.3991 14.4486C17.1518 12.1899 20 9.85375 20 6.23849C20 2.95826 17.7082 0.666748 14.4264 0.666748Z"-->
<!--                fill="#818C99" />-->
<!--        </svg>-->
<!--        <span style="margin-left: 0.2rem;">{{ likes.length }}</span>-->
<!--      </div>-->
<!--      <div class="item-icon" data-title="Комментарии" @click="productShow = true, step = 2, isLikeComment = true">-->
<!--        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"-->
<!--             xmlns="http://www.w3.org/2000/svg">-->
<!--          <path :class="{'comment_f':isLikeComment = comments.length}"-->
<!--                d="M15.75 0H2.25C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.5781C5.625 17.9227 6.01875 18.1231 6.29648 17.9191L10.6875 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0Z"-->
<!--                fill="#818C99" />-->
<!--        </svg>-->
<!--        <span style="margin-left: 0.2rem;">{{ comments.length }}</span>-->
<!--      </div>-->
<!--      <div class="item-icon" data-title="Репосты" @click="repostProduct(product.id), isLikeRepost = true">-->
<!--        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"-->
<!--             xmlns="http://www.w3.org/2000/svg">-->
<!--          <path fill-rule="evenodd" clip-rule="evenodd" :class="{'repost_f':isLikeRepost = reposts.length}"-->
<!--                d="M12.761 0.878371C12.9324 0.821999 13.1179 0.81836 13.2915 0.867964C13.4652 0.917567 13.6184 1.01793 13.7296 1.15504L19.8165 8.65499C19.9352 8.80127 19.9997 8.98132 19.9997 9.16665C19.9997 9.35199 19.9352 9.53203 19.8165 9.67832L13.7296 17.1783C13.6183 17.3152 13.4652 17.4155 13.2916 17.465C13.118 17.5145 12.9326 17.5108 12.7613 17.4545C12.59 17.3981 12.4413 17.2919 12.336 17.1507C12.2307 17.0094 12.1741 16.8402 12.174 16.6666V13.3416C7.49671 13.435 5.2498 14.2858 4.12113 15.2108C3.0481 16.0899 2.85159 17.1241 2.64724 18.2074L2.5942 18.4866C2.55518 18.6863 2.44133 18.8656 2.27408 18.9905C2.10683 19.1154 1.89771 19.1775 1.68605 19.165C1.47439 19.1525 1.27479 19.0663 1.1248 18.9227C0.974813 18.779 0.884774 18.5878 0.871625 18.3849C0.722062 16.0949 0.946406 12.7766 2.6342 10.0008C4.27243 7.30666 7.22193 5.21658 12.174 4.99992V1.6667C12.174 1.49308 12.2305 1.32377 12.3357 1.18244C12.441 1.0411 12.5896 0.934798 12.761 0.878371Z"-->
<!--                fill="#818C99" />-->
<!--        </svg>-->
<!--        <span style="margin-left: 0.2rem;">{{ reposts.length }}</span>-->
<!--      </div>-->
<!--      <div class="item-icon" data-title="Лайки">-->
<!--        <svg width="14" height="18" viewBox="0 0 14 18" fill="none"-->
<!--             xmlns="http://www.w3.org/2000/svg">-->
<!--          <path-->
<!--              d="M0.25 2.25V17.4375C0.249929 17.5352 0.275295 17.6312 0.323603 17.7161C0.37191 17.801 0.441494 17.8718 0.525503 17.9217C0.609513 17.9715 0.705053 17.9986 0.802718 18.0003C0.900384 18.002 0.996808 17.9783 1.0825 17.9314L7 14.7026L12.9175 17.9314C13.0032 17.9783 13.0996 18.002 13.1973 18.0003C13.2949 17.9986 13.3905 17.9715 13.4745 17.9217C13.5585 17.8718 13.6281 17.801 13.6764 17.7161C13.7247 17.6312 13.7501 17.5352 13.75 17.4375V2.25C13.75 1.65326 13.5129 1.08097 13.091 0.65901C12.669 0.237053 12.0967 0 11.5 0L2.5 0C1.90326 0 1.33097 0.237053 0.90901 0.65901C0.487053 1.08097 0.25 1.65326 0.25 2.25Z"-->
<!--              fill="#818C99" />-->
<!--        </svg>-->
<!--      </div>-->
<!--      <div class="item-icon-view" data-title="Лайки">-->
<!--        <img src="../assets/TwentyOffer/ic_views.svg" alt="">1-->
<!--      </div>-->
<!--    </div>-->

<!--&lt;!&ndash;    <div class="no-products">&ndash;&gt;-->
<!--&lt;!&ndash;      <h2>У Вас нет репостов!</h2>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <VueFinalModal v-model="productShow">-->
<!--      <ProductSocial :step="step" v-if="productShow" @close="productShow=false" :product="product" :profile="profile" />-->
<!--    </VueFinalModal>-->
<!--  </div>-->

<!--</template>-->
<template>
  <div class="product-preview">

    <div style="cursor: pointer;display: contents;">
      <div class="product-image" v-for="repost of reposts">
        <img :src="repost.imgProduct" alt="">
        <h3 style="margin-top: 15px;">gfgfgfgf</h3>
        <h4 style="margin-top: 15px;">5000₽</h4>
        <div class="btns" v-if="repost.active = 1">
          <div class="item-icon" data-title="Лайки" @click="likeProduct(product.id), isLikeProduct = !isLikeProduct">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path :class="{'heart':isLikeProduct = likes.length}"
                    d="M14.4264 0.666748C12.5209 0.666748 10.8927 2.02691 9.99818 2.96464C9.10364 2.02691 7.47909 0.666748 5.57455 0.666748C2.29182 0.666748 0 2.95826 0 6.23849C0 9.85284 2.84636 12.189 5.6 14.4486C6.9 15.5165 8.24545 16.62 9.27727 17.8436C9.45091 18.0484 9.70545 18.1667 9.97273 18.1667H10.0255C10.2936 18.1667 10.5473 18.0475 10.72 17.8436C11.7536 16.62 13.0982 15.5156 14.3991 14.4486C17.1518 12.1899 20 9.85375 20 6.23849C20 2.95826 17.7082 0.666748 14.4264 0.666748Z"
                    fill="#818C99" />
            </svg>
            <span style="margin-left: 0.2rem;">{{ likes.length }}</span>
          </div>
          <div class="item-icon" data-title="Комментарии" @click="productShow = true, step = 2, isLikeComment = true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path :class="{'comment_f':isLikeComment = comments.length}"
                    d="M15.75 0H2.25C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.5781C5.625 17.9227 6.01875 18.1231 6.29648 17.9191L10.6875 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0Z"
                    fill="#818C99" />
            </svg>
            <span style="margin-left: 0.2rem;">{{ comments.length }}</span>
          </div>
          <div class="item-icon" data-title="Репосты" @click="repostProduct(product.id), isLikeRepost = true">
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
          <div class="item-icon-view" data-title="Лайки">
            <img style="width: 20px;" src="../assets/TwentyOffer/ic_views.svg" alt="">{{ likesed }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <VueFinalModal name="productsModal" v-model="showProductsModal">
    <ProductModal type="update" :product="product" />
  </VueFinalModal>
  <VueFinalModal v-model="productShow">
    <ProductSocial :step="step" v-if="productShow" @close="productShow=false" :product="product" :profile="profile" />
  </VueFinalModal>
</template>

<script>

import ProductPreview from "@/components/ProductPreview";
import {mapGetters, mapMutations} from "vuex";
import RepostPreview from "@/components/RepostPreview";
import ApiWrapper from "@/api";
import ProductModal from "@/components/ProductModal";
import ProductSocial from "@/components/ProductSocial";

export default {
  name: 'RepostSection',
  components: {
    RepostPreview,
    ProductPreview,
    ProductModal,
    ProductSocial,
  },
  props: {
    product: {
      default: {}
    },
    profile: {
      default: {}
    }
  },
  data(){
    return {
      userId: 0,
      profileName: '',
      productId: '',
      likesed: '',
      profilePicturePath: '',
      showProductsModal: false,
      isLikeProduct: false,
      isLikeComment: false,
      isLikeRepost: false,
      isLikeFavor: false,
      step: 2,
      active: 1,
      liked: false,
      productShow: false,
      likes: {
      },
      reposted: {
      },
      reposts: {
      },
      favors: {
      },
      comments: {
      },
      products: {
      },

    }
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications', 'getRepostWallById']),
    reposted() {
      return this.getRepostWallById
    }
  },
  methods: {
    getProfile: async function () {
      return await ApiWrapper.getProfile({ login: this.getAuthorizedProfile.login })
    },
    async likeProduct(productId){
      await ApiWrapper.likeProduct({productId: 49, img: this.profilePicturePath, name: this.profileName}).then(() => {
        ApiWrapper.getLikesById({target_id: 49, status: 1})
            .then(response => {
              this.likes = response.data
            })
      })
    },
    async repostFavor(productId) {
      await ApiWrapper.repostFavor({target_id: 49, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, imgProduct: 'эпавпвпва'}).then(() => {
        ApiWrapper.getFavorById({target_id: 49, active: 1})
            .then(response => {
              this.favors = response.data
            })
      });
    },
    async repostProduct(productId) {
      await ApiWrapper.repostProduct({target_id: 49, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, imgProduct: this.profilePicturePath}).then(() => {
        window.location.reload();
        ApiWrapper.getRepostWallById({user_id: 180, active: 2})
            .then(response => {
              this.reposts = response.data
            })
      });
    },
  },
  async mounted() {
    ApiWrapper.getProducts({ authorId: this.profileId }).then(response => {
      let producted = response.data[0];
      this.likesed = producted.likes
      console.log(producted)
      console.log(this.likesed)
    });
    this.userId = this.getCurrentProfile.id;
    await ApiWrapper.getRepostWallById({user_id: 188, active: 1})
        .then(response => {
          this.reposts = response.data
        })
    await ApiWrapper.getLikesById({target_id: 49, status: 1})
        .then(response => {
          this.likes = response.data
        })
    await ApiWrapper.getCommentById({target_id: 49})
        .then(response => {
          this.comments = response.data
        })
    await ApiWrapper.getFavorById({target_id: 49, active: 1})
        .then(response => {
          this.favors = response.data
        })
    await ApiWrapper.getRepostById({target_id: 49, active: 1})
        .then(response => {
          this.reposts = response.data
        })

    await ApiWrapper.getProfile({login: this.getCurrentProfile.login}).then(response => {
      let profile = response.data;
      this.profileName = profile.name;
      this.profilePicturePath = profile.profile_path;
      console.log(profile);
      console.log(this.profileName);
    });
  }
}

</script>

<style scoped lang="scss">


.product-section-wrapper {
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  height: auto;

  .products{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 0 5px 0;
    margin: 0 auto;
  }

  .no-products{
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }

}

@media screen and (max-width: 1500px) {
  .product-section-wrapper .products{
    width: 800px;
  }
  .product-section-wrapper .products {
    width: 800px;
  }
}

@media screen and (max-width: 500px) {
  .product-section-wrapper .products{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .product-section-wrapper .products {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .btns {
    justify-content: center;
  }
  .fdsfs {
    display: contents;
  }
}

@media screen and (max-width: 500px) {
  .products{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .product-section-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .btns {
    justify-content: center;
  }
  .fdsfs {
    display: contents;
  }
}
.product-preview:hover {
  .menu_items {
    display: flex;
  }
}
.button__buy {
  padding: 10px;
  width: 200px;
  height: 20px;
  background: #FE6637;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
}

.product-preview {
  position: relative;
  margin: 10px 0;
  height: auto;
  padding-bottom: 20px;
  padding-top: 20px;
  border-radius: 5px;
  background: white;
  width: 100%;

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

  img {
    height: 250px;
    width: 200px;
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

.btns {
  justify-content: center;
  align-items: center;
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
    justify-content: center;
    transition: 0.4s;
    display: flex;
    flex-direction: row;
  }

  .item-icon:hover {
    background: #c5c3c3;
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

  width: 85%;
  height: 50px;
  margin: 5px auto;
  display: flex;
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
    display: none;
    width: 90px;
    position: relative;
  }

  .menu_overlay {
    margin: 10px auto;
    width: 90%;
    height: 30px;
    display: block;

    button {

      width: 100%;
      height: 100%;
      background: #d2cece;
      border: 1px solid #d3d3d3;
      font-size: 14px;
      transition: 0.3s;
    }

    button:hover {
      background: #c7c6c6;
      border: 1px solid #c7c6c6;
    }
  }
}

.setting:hover {
  .overlay {
    display: block;
  }
}

.buscet_btn {
  text-transform: uppercase;
  width: 300px;
  height: 64px;
  background: #FE6637;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.more_info_pr{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;

  span{
    color: #7A7777;
    border-bottom: 1px solid #7A7777;
    cursor: pointer;
  }

  img{
    width: 15px;
    height: 15px;
    margin-right: 0.5rem;

  }
}

</style>