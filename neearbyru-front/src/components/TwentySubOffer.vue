<template>
  <div class="wrapper">
    <div class="offer_inner">
      <div class="offer_cont">
        <div class="offer_l">
          <img :src="subscriptionObject.subscription_image_path" alt="">
          <div class="tovar_title">{{ subscriptionObject.title }}</div>
          <div class="tovar_sup" @click="descriptionShow = true">Показать полное описание подписки</div>
          <div class="pricec_info">
            <div class="f_pr">
              Обычная цена подписки: <span>
                                <span>{{subscriptionObject.price}} руб.</span>
                            </span>
            </div>
            <div class="s_pr">
              Цена со скидкой сейчас: <span>
                                <span>{{subscriptionObject.discount_price}} руб.</span>
                            </span>
            </div>
            <div class="t_pr">
              Цена повысится через: <span>
                                {{Math.floor(timer / 60)}}:{{timer - (Math.floor(timer / 60) * 60)}}
                            </span>
              <img src="../assets/TwentyOffer/clock.svg" alt="">
            </div>
          </div>
          <div class="social_info">
            <div class="social_info_btns">
              <div class="si_des like" data-title="Лайки" @click="likeSubscription(subscriptionObject.id), isLikeProduct = !isLikeProduct">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path :class="{'heart':isLikeProduct = liked.length}"
                        d="M14.4264 0.666748C12.5209 0.666748 10.8927 2.02691 9.99818 2.96464C9.10364 2.02691 7.47909 0.666748 5.57455 0.666748C2.29182 0.666748 0 2.95826 0 6.23849C0 9.85284 2.84636 12.189 5.6 14.4486C6.9 15.5165 8.24545 16.62 9.27727 17.8436C9.45091 18.0484 9.70545 18.1667 9.97273 18.1667H10.0255C10.2936 18.1667 10.5473 18.0475 10.72 17.8436C11.7536 16.62 13.0982 15.5156 14.3991 14.4486C17.1518 12.1899 20 9.85375 20 6.23849C20 2.95826 17.7082 0.666748 14.4264 0.666748Z"
                        fill="#818C99" />
                </svg>
                <span style="margin-left: 0.2rem;">{{ liked.length }}</span>
              </div>
              <div v-if="subscriptionObject.comment_resolution === 1" class="si_des comment" data-title="Комментарии" @click="socialShow = true, step = 2, isLikeComment = true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path :class="{'comment_f':isLikeComment = comments.length}"
                        d="M15.75 0H2.25C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.5781C5.625 17.9227 6.01875 18.1231 6.29648 17.9191L10.6875 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0Z"
                        fill="#818C99" />
                </svg>
                <span style="margin-left: 0.2rem;">{{ comments.length }}</span>
              </div>
              <div class="si_des repost" data-title="Репосты" @click="repostSubscription(subscriptionObject.id), isLikeRepost = true">
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
              <img src="../assets/TwentyOffer/ic_views.svg" alt="">{{ subscriptionObject.active }}
            </div>
          </div>
        </div>
        <div class="offer_r">
          <div class="user_info" v-if="profile.mail">
            <h3 class="uInfo_title">Вы собираетесь приобрести данную подписку через<br> свой аккаунт:</h3>
            <div class="user_info_i">
              <img :src="profile.img" alt="">
              <div class="user_info_txt">
                <div class="userName">{{profile.name}}</div>
                <div class="">{{profile.mail}}</div>
                <div class="">{{profile.phone}}</div>
                <div class="logout_btn" @click="logShow = true">Выйти из аккаунта</div>
              </div>
            </div>
          </div>
          <div class="" v-else>
            <div class="offer_r_title">Заполните ниже Ваши данные</div>
            <div class="offer_r_inputs">
              <input type="text" placeholder="Введите Ваше имя и фамилию">
              <input type="text" placeholder="Введите Ваш email">
              <input type="text" placeholder="Введите номер Вашего мобильного телефона">
            </div>
          </div>
          <div class="oplata_offer" style="display: none;">
            <div class="oplata_offer_title">Способы оплаты:</div>
            <div class="oplata_offer_var">
              <img src="../assets/TwentyOffer/check.svg" alt="">
              <span>Оплата банковской картой или QIWI кошельком</span>
            </div>
            <div class="busc_btn">Добавить в корзину</div>
            <div class="predoplata">
              <div class="predoplata_title">Предоплата</div>
              <div class="pred_blocks_l">
                <div class="pred_block">500 руб.</div>
                <div class="pred_block">1000 руб.</div>
                <div class="pred_block">2000 руб.</div>
              </div>
              <div class="pred_blocks_l">
                <div class="pred_block">3000 руб.</div>
                <div class="pred_block">4000 руб.</div>
                <div class="pred_block">4500 руб.</div>
              </div>
            </div>
            <div class="user_sog">Нажимая на кнопку, Вы даёте согласие на<br>
              <span>документацию Neearby.com</span>
            </div>
          </div>
          <div class="oplata_offer prodamus" style="">
            <div class="oplata_offer_title">Способы оплаты:</div>
            <div class="oplata_offer_var">
              <div class="">
                <img src="../assets/TwentyOffer/check.svg" alt="">
                <span>Киви [Оплата из России картой или QIWI кошельком]</span>
              </div>
              <div class="">
                <div class="elipse_inp"></div>
                <span>Продамус [Оплата из-за рубежа и другими способами]</span>
              </div>
              <div class="">
                <div class="elipse_inp"></div>
                <span>Заплатить по частям [711.67 руб. в месяц]</span>
              </div>
            </div>
            <div class="busc_btn">Добавить в корзину</div>
            <div class="predoplata">
              <div class="predoplata_title">Предоплата</div>
              <div class="pred_blocks_l">
                <div class="pred_block">500 руб.</div>
                <div class="pred_block">1000 руб.</div>
                <div class="pred_block">2000 руб.</div>
              </div>
              <div class="pred_blocks_l">
                <div class="pred_block">3000 руб.</div>
                <div class="pred_block">4000 руб.</div>
                <div class="pred_block">4500 руб.</div>
              </div>
            </div>
            <div class="user_sog">Нажимая на кнопку, Вы даёте согласие на<br>
              <span>документацию Neearby.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VueFinalModal v-model="infoShow">
      <NearbyInfo @close="infoShow=false"/>
    </VueFinalModal>
    <VueFinalModal v-model="socialShow" v-if="socialShow">
      <SubSocial :step="step" @close="socialShow=false" :subscription-object="subscriptionObject" :profile="profile" />
    </VueFinalModal>
    <VueFinalModal v-model="descriptionShow" v-if="descriptionShow">
      <ModalSubBuy @close="descriptionShow=false" :subscription-object="subscriptionObject"/>
    </VueFinalModal>
    <VueFinalModal v-model="logShow" v-if="logShow">
      <ModalLogout @close="logShow=false"/>
    </VueFinalModal>


  </div>
</template>
<script>
import NearbyInfo from '@/components/NearbyInfo.vue'
import ModalSocial from '@/components/ModalSocial.vue'
import ModalProductBuy from '@/components/ModalProductBuy.vue'
import ModalLogout from "@/components/ModalLogout";
import ProductSocial from "@/components/ProductSocial"
import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";
import succes from "@/components/ModalsReport/Succes";
import SubSocial from "@/components/SubSocial";
import ModalSubBuy from "@/components/ModalSubBuy";
import {mapGetters} from "vuex";

export default {
  name: "TwentySubOffer",
  components: {
    ModalSubBuy,
    SubSocial,
    NearbyInfo,
    ModalSocial,
    ModalLogout,
    ModalProductBuy,
    ProductSocial
  },
  props: ['product', 'profile', 'subscriptionObject'],
  data() {
    return {
      timer: 1439,
      status: '',
      infoShow: false,
      isLikeProduct: false,
      isLikeComment: false,
      isLikeRepost: false,
      isLikeFavor: false,
      step: 2,
      socialShow: false,
      logShow: false,
      descriptionShow: false,
      liked: {
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
    logout: function (){
      console.log(this.$cookies.set('token', null,'180d', '/', '.neearby.ru', false, ''));
      // console.log(this.$cookies.remove("token"))
      console.log(document.cookie)
      decodeURIComponent(document.cookie)
      console.log(decodeURIComponent(document.cookie))
      window.location.href = "http://neearby.ru/49";
    },
    close(){
      this.$emit('close');
    },
    async likeSubscription(productId){
      await ApiWrapper.likeSub({subscriptionId: this.subscriptionObject.id, img: this.profilePicturePath, name: this.profileName, user_id: this.userId}).then(() => {
        ApiWrapper.getLikesById({target_id: this.subscriptionObjectId, status: 1})
            .then(response => {
              this.liked = response.data
            })
      })
    },
    async repostSubscription(productId) {
      await ApiWrapper.repostSub({target_id: this.subscriptionObject.id, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, user_id: this.userId, imgProduct: this.subscriptionObject.subscription_image_path}).then(() => {
        window.location.reload();
        ApiWrapper.getRepostById({target_id: this.subscriptionObjectId, active: 1})
            .then(response => {
              this.reposts = response.data
            })
      });
    },

    async repostFavor(productId) {
      await ApiWrapper.repostFavorSub({target_id: this.subscriptionObject.id, target_type: 1, imgUser: this.profilePicturePath, name: this.profileName, user_id: this.userId, imgProduct: this.subscriptionObject.subscription_image_path}).then(() => {
        ApiWrapper.getFavorById({target_id: this.subscriptionObjectId, active: 1})
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
    this.subscriptionObjectId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    await ApiWrapper.getLikesById({target_id: this.subscriptionObjectId, status: 1})
        .then(response => {
          this.liked = response.data
        })
    await ApiWrapper.getCommentById({target_id: this.subscriptionObjectId})
        .then(response => {
          this.comments = response.data

        })
    await ApiWrapper.getRepostById({target_id: this.subscriptionObjectId, active: 1})
        .then(response => {
          this.reposts = response.data
        })
    await ApiWrapper.getFavorById({target_id: this.subscriptionObjectId, active: 1})
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


    setInterval(() => {
      if(this.timer < 1){
        return;
      }
      this.timer--;
    }, 60000)
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
img{
  max-width: 350px
}
.wrapper {
  position: relative;
  margin: 0 auto;
  padding-top: 2rem;
  width: 85%;
  height: 100%;
  background-color: white;
  font-family: 'Inter', sans-serif !important;
}

.offer_inner {
  width: 100%;
  /* height: 828px; */
  margin: 0 auto;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #818C99;
}

.offer_cont {
  padding: 2rem 5rem;
  margin: 0 auto;
  display: flex;
}

.tovar_title {
  font-size: 24px;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
}

.tovar_sup {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #7A7777;
}

.offer_l {
  width: 50%;
}


.f_pr span {
  background: #FFF500;
  border-radius: 5px;
  width: 118px;
  height: 28px;
  font-size: 19px;
  font-weight: 500 !important;
  text-decoration: line-through;
  color: black;
  text-decoration-thickness: 2px;
  padding: 0.15rem;
}

.pricec_info {
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin-top: 2rem;
  text-align: left;
}

.s_pr {
  margin-top: 1rem;
}

.s_pr span {
  background: #00FF00;
  border-radius: 5px;
  width: 118px;
  height: 28px;
  font-size: 24px;
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
  justify-content: flex-start;
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
  margin-left: 80px;
}

.offer_r {
  width: 50%;
}

.offer_r_inputs {
  display: flex;
  flex-direction: column;
}

.offer_r_title {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: #FE6637;
}

.offer_r_inputs input:first-child {
  margin-top: 2rem;
}

.offer_r_inputs input {
  width: 100%;
  height: 40px;
  background: #EDEEF0;
  border-radius: 10px;
  color: #7A7777;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
  border: 0;
  outline: 0;
  padding-left: 1rem;
}

.offer_r_inputs input::placeholder {
  color: rgba(122, 119, 119, 0.7);
}

.oplata_offer {
  width: 100%;
  text-align-last: left;
  margin-right: auto;
  margin-top: 2rem;
}

.oplata_offer_title {
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  color: black;
  margin-bottom: 2rem;
}

.oplata_offer_var {
  width: 100%;
  height: 65px;
  background: #EDEEF0;
  border-radius: 10px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
}

.oplata_offer_var div {
  display: flex;
  align-items: center;
}

.oplata_offer_var span {
  font-size: 16px;
  font-weight: 600;
  margin-left: 1rem;
  color: black;
}

.busc_btn {
  width: 435px;
  height: 70px;
  background: #FE6637;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 600;
  margin-top: 4rem;
  margin-left: 3rem;
}

.predoplata_title {
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin-top: 4rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}


.pred_blocks_l {
  width: 422px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.pred_block {
  width: 137px;
  height: 44px;
  background: #FE6637;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 500;
}

.user_sog {
  padding-top: 1rem;
  color: #7A7777;
  font-size: 16px;
}

.user_sog span {
  color: #2A5885;
  border-bottom: 1px solid #2A5885;
}

/* prodamus */
.oplata_offer.prodamus .oplata_offer_var {
  height: 155px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-around;
  padding-left: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.elipse_inp {
  width: 28px;
  height: 28px;
  border: 1px solid #FE6637;
  border-radius: 20px;
}

.uInfo_title {
  text-align: left;
  margin: auto;
  color: black;
}

.user_info_i {
  display: flex;
  margin-top: 1rem;
}

.user_info_i img {
  width: 70px;
  height: 80px;
  margin-right: 1rem;
}

.user_info_txt {
  text-align: left;
  font-size: 16px !important;
  font-weight: 400;
  color: black;
}

.userName {
  font-weight: 500;
  padding-top: 0.5rem;
}

.logout_btn {
  cursor: pointer;
  color: #FE6637;
  margin-top: 0.5rem;
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

.like.active {
  fill: #FF0000;
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

.comment.active {
  fill: #0077FF;
}

.repost.active {
  fill: #6BC432;
}

.zakladki.active {
  fill: #8F00FF;
}

@media screen and (max-width: 769px) {
  .offer_cont {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  .offer_l {
    width: 100%;
  }
  .offer_r {
    width: 100%;
    margin-top: 10px;
  }
  .user_info {
    margin-left: 0;
  }
  .oplata_offer {
    margin-left: 0;
    width: 100%;
  }
  .oplata_offer_var {
    width: 100%;
  }
  .busc_btn {
    width: 100%;
    margin-left: 0;
    margin-top: 2rem;
  }
  .predoplata {
    width: 100%;
  }
  .predoplata_title {
    margin-top: 2rem;
  }
  .pred_blocks_l {
    width: 100%;
  }
  .pred_block {
    width: 30%;
  }
  .user_info_i {
    align-items: center;
  }
  .offer_r_title {
    width: 100%;
  }
  .offer_r_inputs {
    width: 100%;
  }
  .offer_r_inputs input {
    width: 100%;
  }
}
@media screen and (max-width: 500px) {
  .pred_blocks_l {
    flex-direction: column;
  }
  .pred_block {
    width: 100%;
    margin-bottom: 10px;
  }
  .oplata_offer_var span {
    font-size: 12px;
  }
  .offer_r_inputs input {
    font-size: 14px !important;
  }
  .busc_btn {
    font-size: 18px;
  }
}
</style>