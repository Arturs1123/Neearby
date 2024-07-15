<template>
    <div class="modal_wrapper">
        <div class="modal_social">
            <div class="modal_head">
                <div class="modal_head_i">
                    <div class="m_btns">
                        <div @click="openLike" class="soc_btn active">Лайки <span>{{ likes.length }}</span></div>
                        <div @click="openComment" class="soc_btn active">Комментарии <span>{{ comments.length }}</span></div>
                        <div @click="openRepost" class="soc_btn active">Репосты <span>{{ reposts.length }}</span></div>
                    </div>
                    <img @click="close" class="modal_close" src="../assets/TwentyOffer/close.svg" alt="">
                </div>
            </div>
            <div class="modal_social_i">
                <div class="bl_likes" v-if="step == 1" style="display: flex;">
                    <div class="people_item" v-for="like of likes">
                        <div class="people_img">
                            <img style="width: 100%; height: 100%; border-radius: 50px;" :src="like.img" alt="">
                        </div>
                        <div class="p_name">
                          {{ like.name }}
                        </div>
                    </div>
                </div>
                <div class="bl_comments" v-if="step == 2">
                    <div class="people_item" v-for="comment of comments">
                        <div class="p_img">
                          <img :src="comment.img" alt="">
                        </div>
                        <div class="p_info">
                            <div class="p_username">
                              {{ comment.name }}
                                <img src="../assets/TwentyOffer/veryfied.svg" alt="">
                            </div>
                            <div class="p_date">{{new Date(comment.created_at).toLocaleDateString()}} в {{new Date(comment.created_at).toLocaleTimeString()}}</div>
                            <div class="p_comment">{{comment.comment}}</div>
                        </div>
                    </div>
                    <div class="send_msg">
                        <img class="p_img" src="../assets/TwentyOffer/msg_icon.svg" alt="">
                        <div class="input_msg">
                            <input id="myInput" type="text" placeholder="Написать комментарий..." v-model="comment">
                            <img src="../assets/TwentyOffer/screpka_msg.svg" alt="">
                        </div>
                        <img src="../assets/TwentyOffer/sendMsg_ic.svg" alt="" @click="commentProduct(product.id)">
                    </div>
                </div>
                <div class="bl_repost" style="display:flex;" v-if="step == 3">
                    <div class="people_item" v-for="repost of reposts">
                        <div class="people_img">
                            <img style="width: 100%; height: 100%; border-radius: 50px;" :src="repost.imgUser" alt="">
                        </div>
                        <div class="p_name">
                          {{ repost.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import ApiWrapper from "@/api";
import TwentyBuyOffer from '@/components/TwentyBuyOffer'
import {POSITION, TYPE, useToast} from "vue-toastification";
import {mapGetters} from "vuex";

export default {
    name: "ModalSocial",
    components: { TwentyBuyOffer },
    props: ['product', 'profile', 'step', 'likes', 'reposts', 'comments'],
    data() {
      return {
        productId: '',
        comment: '',
        step: 0,
        comments: {
        },
        com: [],
        rep: [],
        lik: [],
        likes: {
        },
        reposts: {
        },
      }
    },
  async mounted() {
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile', 'getNotifications', 'getUnreadNotifications']),
  },
  methods: {
      getProfile: async function () {
        return await ApiWrapper.getProfile({ login: this.getAuthorizedProfile.login })
      },
      close(){
        this.$emit('close');
      },
      async openLike() {
        this.productId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.step = 1;
        await ApiWrapper.getLikesById({target_id: this.productId, status: 1})
            .then(response => {
              this.likes = response.data
            })
      },
      async openComment() {
        this.step = 2;
        this.productId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        await ApiWrapper.getCommentById({target_id: this.productId})
            .then(response => {
              this.comments = response.data
            })
        },
      async openRepost() {
        this.productId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        this.step = 3;
        await ApiWrapper.getRepostById({target_id: this.productId, active: 1})
            .then(response => {
              this.reposts = response.data
            })
      },
      async commentProduct(productId) {
        await ApiWrapper.commentProduct({productId: productId, comment: this.comment, img: this.profile.img, name: this.profile.name}).then(() =>{
          ApiWrapper.getCommentById({target_id: 49}).then(response => {
            this.comment = '';
            this.comments = response.data
          })
        });
      }

    },
  created() {
    if (this.$props.step) {
      this.step = this.$props.step
      if (this.step === 2) {
        this.openComment()
      } else if (this.step === 1) {
        this.openLike()
      } else if (this.step === 3) {
        this.openRepost()
      }
    }
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

.modal_social {
    width: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1100;
    border-radius: 15px;
    overflow: hidden;
    background-color: white;
}

.m_btns {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    align-items: center;
    width: 60%;
    font-size: 16px;
    font-weight: 500;
    color: #7A7777;
}

.soc_btn.active {
    color: black !important;
}

.modal_head {
    width: 100%;
    height: 59px;
    background-color: #FFDBBA;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal_head_i {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
}

.soc_btn span {
    margin-left: 0.2rem;
}

.modal_close {
    cursor: pointer;
}

.people_img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.bl_likes .people_img::after {
    content: url(../assets/TwentyOffer/like.svg);
    width: 70px;
    height: 70px;
    display: block;
    position: relative;
    bottom: 35px;
    left: 50px;
}

.bl_likes .people_item {
    width: 100px;
    margin: .8rem;
}

.p_name {
    font-size: 13px;
    font-weight: 400;
    margin-top: 0.5rem;
    color: black;
}

.bl_likes {
    display: flex;
    align-items: center;
    justify-content: left;
}

.input_msg {
    width: 530px;
    height: 53px;
    border: 1px solid #D3D9DE;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.send_msg {
    width: 94%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input_msg input {
    outline: 0;
    border: 0;
    width: 85%;
    background-color: rgba(255, 255, 255, 0);
    font-size: 14px;
    font-weight: 400;
}

.bl_comments {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
}

.bl_comments .people_item .p_img {
    width: 75px;
    height: 65px;
}

.bl_comments .people_item .p_img img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
}


.bl_comments .people_item .p_img::after {
    content: url(../assets/TwentyOffer/comments.svg);
    width: 43px;
    height: 43px;
    display: block;
    position: relative;
    /* top: 150px;
    left: 65px;
    bottom: 0; */
    bottom: 25px;
    left: 33px;
}

.bl_comments .people_item {
    display: flex;
    justify-content: start;
    margin-left: 1.7rem;
    margin-bottom: 1rem;
}

.bl_comments .people_item .p_info {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 400;
    color: black;
}

.bl_comments .p_username {
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
}

.bl_comments .p_username img {
    margin-left: 0.5rem;
}

.bl_comments .p_date {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
}

.bl_comments .p_comment {
    font-size: 14px;
}

/*!!! block comments !!!*/


.bl_repost .people_img::after {
    content: url(../assets/TwentyOffer/repost.svg);
    width: 70px;
    height: 70px;
    display: block;
    position: relative;
    bottom: 35px;
    left: 50px;
}

.bl_repost .people_item {
    width: 100px;
    margin: .8rem;
}

.bl_repost {
    display: flex;
    justify-content: center;
    align-items: center;
}
.p_info {
  align-items: flex-start;
  margin-top: 10px;
  margin-left: 20px;
}

@media screen and (max-width: 1100px) {
  .modal_social {
    width: 80%;
  }
}
@media screen and (max-width: 769px) {
  .modal_social {
    width: 90%;
  }
}
@media screen and (max-width: 500px) {
  .modal_social {
    width: 100%;
  }
  .bl_comments .people_item {
    margin-left: 1rem;
  }
  .people_img > img {
    width: 70%;
  }
  .people_img {
    height: 70px;
  }
  .bl_likes .people_item {
    margin: 10px 0 0;
  }
}

</style>