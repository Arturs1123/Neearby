<template>
    <div class="modal_wrapper">
        <div class="full_desc">
            <div class="full_desc_h">
                <div class="full_desc_h_l">
                    <img src="../assets/super_description.svg" alt="">
                    <span>Полное описание “{{product.title}}”</span>
                </div>
                <img class="close_modal" src="../assets/TwentyOffer/close.svg" alt="" @click="close">
            </div>
            <div class="full_modal">
                <div class="full_modal_txt">
                    {{product.description}}
                </div>
                <div class="full_modal_info">
                    <img :src="product.product_image_path" alt="" style="max-width: 275px; height: 200px">
                    <div class="buy_fast_btn">Купить прямо сейчас</div>
                    <div class="pricec_info">
                        <div class="f_pr">
                            Обычная цена товара: <span>
                                <span>{{product.price}} руб.</span>
                            </span>
                        </div>
                        <div class="s_pr">
                            Цена со скидкой сейчас: <span>
                                <span>{{ product.discount_price }} руб.</span>
                            </span>
                        </div>
                        <div class="t_pr">
                            Цена повысится через: <span>
                                23:54
                            </span>
                            <img src="../assets/TwentyOffer/clock.svg" alt="">
                        </div>
                    </div>
                    <div class="social_info">
                        <div class="social_info_btns">
                            <div class="si_des like" data-title="Лайки" @click="likeProduct(product.id), isLikeProduct = !isLikeProduct">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path :class="{'heart':isLikeProduct = liked.length}"
                                        d="M14.4264 0.666748C12.5209 0.666748 10.8927 2.02691 9.99818 2.96464C9.10364 2.02691 7.47909 0.666748 5.57455 0.666748C2.29182 0.666748 0 2.95826 0 6.23849C0 9.85284 2.84636 12.189 5.6 14.4486C6.9 15.5165 8.24545 16.62 9.27727 17.8436C9.45091 18.0484 9.70545 18.1667 9.97273 18.1667H10.0255C10.2936 18.1667 10.5473 18.0475 10.72 17.8436C11.7536 16.62 13.0982 15.5156 14.3991 14.4486C17.1518 12.1899 20 9.85375 20 6.23849C20 2.95826 17.7082 0.666748 14.4264 0.666748Z"
                                        fill="#818C99" />
                                </svg>
                                <span style="margin-left: 0.2rem;">{{ liked.length }}</span>
                            </div>
                            <div class="si_des comment" data-title="Комментарии" @click="socialShow = true, step = 2, isLikeComment = true">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path :class="{'comment_f':isLikeComment = comments.length}"
                                        d="M15.75 0H2.25C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.5781C5.625 17.9227 6.01875 18.1231 6.29648 17.9191L10.6875 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0Z"
                                        fill="#818C99" />
                                </svg>
                                <span style="margin-left: 0.2rem;">{{ comments.length }}</span>
                            </div>
                            <div class="si_des repost" data-title="Репосты" @click="repostProduct(product.id), isLikeRepost = true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" :class="{'repost_f':isLikeRepost = reposts.length}"
                                        d="M12.761 0.878371C12.9324 0.821999 13.1179 0.81836 13.2915 0.867964C13.4652 0.917567 13.6184 1.01793 13.7296 1.15504L19.8165 8.65499C19.9352 8.80127 19.9997 8.98132 19.9997 9.16665C19.9997 9.35199 19.9352 9.53203 19.8165 9.67832L13.7296 17.1783C13.6183 17.3152 13.4652 17.4155 13.2916 17.465C13.118 17.5145 12.9326 17.5108 12.7613 17.4545C12.59 17.3981 12.4413 17.2919 12.336 17.1507C12.2307 17.0094 12.1741 16.8402 12.174 16.6666V13.3416C7.49671 13.435 5.2498 14.2858 4.12113 15.2108C3.0481 16.0899 2.85159 17.1241 2.64724 18.2074L2.5942 18.4866C2.55518 18.6863 2.44133 18.8656 2.27408 18.9905C2.10683 19.1154 1.89771 19.1775 1.68605 19.165C1.47439 19.1525 1.27479 19.0663 1.1248 18.9227C0.974813 18.779 0.884774 18.5878 0.871625 18.3849C0.722062 16.0949 0.946406 12.7766 2.6342 10.0008C4.27243 7.30666 7.22193 5.21658 12.174 4.99992V1.6667C12.174 1.49308 12.2305 1.32377 12.3357 1.18244C12.441 1.0411 12.5896 0.934798 12.761 0.878371Z"
                                        fill="#818C99" />
                                </svg>
                                <span style="margin-left: 0.2rem;">{{ reposts.length }}</span>
                            </div>
                            <div class="si_des zakladki" data-title="Избранное" @click="repostFavor(), isLikeFavor = true">
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path :class="{'favor_f':isLikeFavor = favors.length}"
                                        d="M0.25 2.25V17.4375C0.249929 17.5352 0.275295 17.6312 0.323603 17.7161C0.37191 17.801 0.441494 17.8718 0.525503 17.9217C0.609513 17.9715 0.705053 17.9986 0.802718 18.0003C0.900384 18.002 0.996808 17.9783 1.0825 17.9314L7 14.7026L12.9175 17.9314C13.0032 17.9783 13.0996 18.002 13.1973 18.0003C13.2949 17.9986 13.3905 17.9715 13.4745 17.9217C13.5585 17.8718 13.6281 17.801 13.6764 17.7161C13.7247 17.6312 13.7501 17.5352 13.75 17.4375V2.25C13.75 1.65326 13.5129 1.08097 13.091 0.65901C12.669 0.237053 12.0967 0 11.5 0L2.5 0C1.90326 0 1.33097 0.237053 0.90901 0.65901C0.487053 1.08097 0.25 1.65326 0.25 2.25Z"
                                        fill="#818C99" />
                                </svg>
                              <span style="margin-left: 0.2rem;">{{ favors.length }}</span>
                            </div>
                        </div>
                        <div class="views_info">
                            <img src="../assets/TwentyOffer/ic_views.svg" alt="">{{ product.likes }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <VueFinalModal v-model="socialShow" v-if="socialShow">
    <ProductSocial :step="step" @close="socialShow=false" :product="product" :profile="profile" />
  </VueFinalModal>
</template>
<script>
  import ApiWrapper from "@/api";
  import TwentyBuyOffer from "@/components/TwentyBuyOffer";
  import ModalSocial from "@/components/ModalSocial";
  import ProductSocial from "@/components/ProductSocial"
  import {mapGetters} from "vuex";

  export default {
    props: ['product', 'profile'],
    components: {
      TwentyBuyOffer, ModalSocial, ProductSocial
    },
    data() {
      return {
        profileName: '',
        productId: '',
        profilePicturePath: '',
        liked: {
        },
        reposts: {
        },
        comments: {
        },
        favors: {
        },
        isLikeProduct: false,
        isLikeComment: false,
        isLikeRepost: false,
        isLikeFavor: false,
        step: 2,
        liked: false,
        socialShow: false,
      }
    },
    methods: {
      close(){
        this.$emit('close');
      },
      getProfile: async function () {
        return await ApiWrapper.getProfile({ login: this.getAuthorizedProfile.login })
      },
      async likeProduct(productId){
        await ApiWrapper.likeProduct({productId: productId, img: this.profilePicturePath, name: this.profileName}).then(() => {
          ApiWrapper.getLikesById({target_id: this.productId, status: 1})
              .then(response => {
                this.liked = response.data
              })
        })
      },
      async repostProduct(productId) {
        await ApiWrapper.repostProduct({target_id: productId, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, imgProduct: this.product.product_image_path}).then(() => {
          ApiWrapper.getRepostById({target_id: this.productId, active: 1})
              .then(response => {
                this.reposts = response.data
              })
        });
      },
      async repostFavor(productId) {
        await ApiWrapper.repostFavor({target_id: 49, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, imgProduct: this.product.product_image_path}).then(() => {
          ApiWrapper.getFavorById({target_id: this.productId, active: 1})
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
      this.productId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
      await ApiWrapper.getLikesById({target_id: this.productId, status: 1})
          .then(response => {
            this.liked = response.data
          })
      await ApiWrapper.getCommentById({target_id: this.productId})
          .then(response => {
            // this.com = response.data;
            this.comments = response.data

          })
      await ApiWrapper.getRepostById({target_id: this.productId, active: 1})
          .then(response => {
            this.reposts = response.data
          })
      await ApiWrapper.getFavorById({target_id: this.productId, active: 1})
          .then(response => {
            this.favors = response.data
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
<style lang="scss" scoped>
.modal_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1001;
    transition: .3s all;
}

.full_desc {
    width: 800px;
    height: 600px;
    background: #FFFFFF;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1100;
    overflow: hidden;
}

.full_desc_h {
    background-color: #FFDBBA;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.full_desc_h_l {
    margin-left: 1rem;
    display: flex;
    align-items: center;
    width: 100%;

    span {
        color: black;
        font-weight: 500;
        margin-left: 1rem;
    }
}

.close_modal {
    margin-right: 1rem;
}

.full_modal {
    width: 100%;
  margin: 1rem auto;
  display: flex;
    justify-content: space-around;

    .full_modal_txt {
        text-align: left;
        width: 460px;
        height: 500px;
        background: #EDEEF0;
        border-radius: 15px;
        font-size: 16px;
        font-weight: 400;
        padding: 0.5rem;
        color: black;
        margin-bottom: 1rem;
    }

    .full_modal_info {
        width: 280px;
    }

    .f_pr span {
        background: #FFF500;
        border-radius: 5px;
        width: 109px;
        height: 26px;
        font-size: 18px;
        font-weight: 500 !important;
        text-decoration: line-through;
        color: black;
        text-decoration-thickness: 2px;
        padding: 0.15rem;
    }

    .pricec_info {
        font-size: 14px;
        font-weight: 500;
        color: black;
        margin-top: 2rem;
        text-align: center;
    }

    .s_pr {
        margin-top: 1rem;
        font-size: 14px;
    }

    .s_pr span {
        background: #00FF00;
        border-radius: 5px;
        font-size: 19px;
        font-weight: 500 !important;
        color: black;
        padding: 0.15rem;
    }

    .t_pr {
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }

    .t_pr span {
        width: 65px;
        height: 27px;
        background: #FE6637;
        border-radius: 5px;
        color: white;
        font-weight: 300 !important;
        font-size: 16px;
        margin-left: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .t_pr img {
        margin-left: 0.5rem;
    }

    .social_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2rem;
        width: 95%;
    }

    .social_info_btns {
        display: flex;
        align-items: center;
    }

    .social_info_btns div {
        background: #F0F2F5;
        border-radius: 10px;
        width: 43px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.4rem;
    }

    .social_info_btns div:first-child {
        margin-left: 0;
    }

    .views_info img {
        margin-right: 0.2rem;
    }

    .views_info {
        color: rgba(42, 88, 133, 0.6);
    }

    .like {
        transition: all 0.3s;
        color: #FF0000;
    }

    .comment {
        transition: all 0.3s;
        color: #0077FF;
    }

    .repost {
        transition: all 0.3s;
        color: #00FF00;
    }

    .zakladki {
        transition: all 0.3s;
        color: #8F00FF;
    }


    .si_des:hover::after {
        content: attr(data-title);
        /* Выводим текст */
        position: absolute;
        /* bottom: 25px; */
        margin-bottom: 3.5rem;
        /* Абсолютное позиционирование */
        /* left: 0;
    right: 0;
    bottom: 5px; */
        /* Положение подсказки */
        z-index: 1;
        /* Отображаем подсказку поверх других элементов */
        /* Полупрозрачный цвет фона */
        color: #7A7777;
        /* Цвет текста */
        text-align: center;
        /* Выравнивание текста по центру */
        font-family: Arial, sans-serif;
        /* Гарнитура шрифта */
        font-size: 10px;
        /* Параметры рамки */
        width: 79px;
        height: 18px;
        background: #FFDBBA;
        box-shadow: 3px 3px 5px rgba(122, 119, 119, 0.2);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        transition: all 0.3s;
    }

    .like.active  {
        fill: #FF0000;
    }

    .heart {
      fill: #FF0000;
    }
    .comment_f {
      fill: #0077FF;
    }
  .repost_f {
    fill: #6BC432;
  }
  .favor_f {
    fill: #8F00FF;
  }

    .comment.active {
        fill: #0077FF;
    }

    .repost.active .repost_f {
        fill: #6BC432;
    }

    .zakladki.active .favor_f {
        fill: #8F00FF;
    }

    .buy_fast_btn {
        font-size: 14px;
        font-weight: 400;
        color: white;
        width: 180px;
        height: 47px;
        background: #FE6637;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: auto;
        margin-left: auto;
      margin-top: 30px;
    }

}

@media screen and (max-width: 769px) {
  .full_desc {
    width: 95%;
    height: auto;
  }
  .full_modal {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .full_modal .full_modal_txt {
    width: 90%;
  }
}
</style>