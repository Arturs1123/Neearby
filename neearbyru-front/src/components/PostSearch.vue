<template>
  <div class="post-wrapper">
    <div class="post-header">
      <div class="post_header_i">
        <div class="author-logo">
          <!-- <img :src="author?.profile_picture" alt=""> -->
          <img src="../assets/main_img.svg" alt="">
        </div>
        <div class="author-name">
          <h4 style="display: flex;gap: 5px;align-items: center;">
            <b>{{ author?.name }}Алекс Жаркий</b>
            <img src="../assets/verific.svg" alt="">
          </h4>
          <p>8 сентября в 23:12</p>
        </div>
      </div>
      <div class="post_ui">
        <div class="zakrep" style="display: none;">
          <img src="../assets/zakrep_post.png" alt="">
          Закреплённый пост |
        </div>
        <span style="display: none;">Открытый пост</span>
        <span>Закрытый пост</span>
        <img src="../assets/points_vert.svg" alt="">
      </div>
    </div>
    <div class="post-content">
      <!-- <div class="post-image">
        <img :src="post?.post_image_path" alt="">
      </div> -->
      <div class="post-title">
        <h3>{{ post?.title }}</h3>
      </div>
      <div class="post-description" style="display: none;">
        <p>{{ post?.description }}Описание</p>
      </div>
      <PostContentEmpty style="margin-top: 1rem;display: none;" />
      <PostContent style="margin-top: 1rem;" />
      <div class="p_info">
        <div class="reactions">
          <div class="likes" v-bind:class="{ unliked: !liked }" @click="toggleLike">
            <img :src="require('../assets/like.svg')" alt="">
            <!-- <p>{{ post?.likes.length }}</p> -->
            <!-- <p>1</p> -->
          </div>

          <div class="comment">
            <img :src="require('../assets/comment.svg')" alt="">
            <!-- <p>{{ post?.comments.length }}</p> -->
            <!-- <p>1</p> -->
          </div>

          <div class="share">
            <img :src="require('../assets/share.svg')" alt="">
            <!-- <p>1</p> -->
          </div>

          <div class="favourite">
            <img :src="require('../assets/favourite.svg')" alt="">
            <!-- <p>1</p> -->
          </div>
        </div>
        <div class="views">
          <img src="../assets/eye.svg" alt="">
          1
        </div>
      </div>
      <div class="comments_block" style="display: none;">
        <div class="comment_item">
          <img src="../assets/main_img.svg" alt="">
          <div class="comm_info">
            <div class="comm_name">
              Алекс Жаркий
              <img src="../assets/verific.svg" alt="">
            </div>
            <div class="comm_date">8 сентября в 23:12</div>
            <div class="comm_content">
              Моя ссылка на страничку Neearby <span style="color: #2A5885;">https://alexhotpro.neearby.pro</span>
            </div>
            <div class="comm_like_res">
              <div class="comm_res">Ответить</div>
              <div class="comm_like">
                <img src="../assets/like_blue.svg" alt="">
                1
              </div>
            </div>
          </div>
        </div>
        <div class="comment_item">
          <img src="../assets/main_img.svg" alt="">
          <div class="comm_info">
            <div class="comm_name">
              Hot Pro
              <img src="../assets/verific.svg" alt="">
            </div>
            <div class="comm_date">8 сентября в 23:12</div>
            <div class="comm_content">
              <img src="../assets/ta_img1.svg" alt="">
            </div>
            <div class="comm_like_res">
              <div class="comm_res">Ответить</div>
              <div class="comm_like">
                <img src="../assets/like_blue.svg" alt="">
                1
              </div>
            </div>
          </div>
        </div>
        <div class="comment_item">
          <img src="../assets/main_img.svg" alt="">
          <div class="comm_info">
            <div class="comm_name">
              Hey Play
              <!-- <img src="../assets/verific.svg" alt=""> -->
            </div>
            <div class="comm_date">8 сентября в 23:12</div>
            <div class="comm_content">
              <img src="../assets/ta_img2.svg" alt="">
            </div>
            <div class="comm_like_res">
              <div class="comm_res">Ответить</div>
              <div class="comm_like">
                <img src="../assets/like_blue.svg" alt="">
                1
              </div>
            </div>
          </div>
        </div>
        <div class="comment_item">
          <img src="../assets/ava_white.svg" alt="">
          <div class="comm_info">
            <div class="comm_name">
              Грегори Дрим
              <!-- <img src="../assets/verific.svg" alt=""> -->
            </div>
            <div class="comm_date">8 сентября в 23:12</div>
            <div class="comm_content">
              <div class="audio">
                <img src="../assets/Проигрыватель.svg" alt="">
                <span>Голосовая запись</span> - 1:32
              </div>
            </div>
            <div class="comm_like_res">
              <div class="comm_res">Ответить</div>
              <div class="comm_like">
                <img src="../assets/like_blue.svg" alt="">
                1
              </div>
            </div>
          </div>
        </div>
        <div class="comment_item">
          <img src="../assets/ava_white.svg" alt="">
          <div class="comm_info">
            <div class="comm_name">
              Dream team
              <!-- <img src="../assets/verific.svg" alt=""> -->
            </div>
            <div class="comm_date">8 сентября в 23:12</div>
            <div class="comm_content">
              <div class="file">
                <img src="../assets/ta_file.svg" alt="">
                <div class="f_i">
                  <span>5 способов заработка</span>
                  <div class="">12.9 МБ</div>
                </div>
              </div>
            </div>
            <div class="comm_like_res">
              <div class="comm_res">Ответить</div>
              <div class="comm_like">
                <img src="../assets/like_blue.svg" alt="">
                1
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="send_comment" style="display: none;">
        <img style="width: 70px;height: 70px;" src="../assets/main_img.svg" alt="">
        <div class="sc_input">
            <input type="text" placeholder="Написать комментарий...">
            <img src="../assets/add_in_msg_i.svg" alt="">
        </div>
        <img src="../assets/send-arrow.svg" alt="">
      </div>
      <!-- <div class="comments-sections"> -->
      <!-- <hr>
        <div class="comment" v-for="comment of post.comments">
          <div class="user-logo">
            <img :src="comment.picture" alt="">
          </div>
          <div class="comment-area">
            <h3>{{comment.name}}</h3>
            <p>{{comment.comment}}</p>
            <p style="color: #2A5885; margin-top: 10px;">{{new Date(comment.date).toLocaleDateString()}} {{new Date(comment.date).toLocaleTimeString()}}</p>
          </div>
        </div>

        <div class="create-comment">
          <div class="user-logo">
            <img :src="getAuthorizedProfile.profilePicture" alt="">
          </div>
          <div class="comment-area">
            <TextInput placeholder="Написать комментарий..." :height="45" v-model="comment"/>
          </div>
          <div class="send-button" @click="sendComment">
            <img :src="require('../assets/send-arrow.svg')" alt="">
          </div>

        </div> -->

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import ApiWrapper from '@/api'
import TextInput from "@/components/TextInput";
import PostContentEmpty from "@/components/PostContentEmpty";
import PostContent from "@/components/PostContent";
import P53 from "@/components/PostModals/P53";
import P54 from "@/components/PostModals/P54";
import P57 from "@/components/PostModals/P57";
import P58 from "@/components/PostModals/P58";
import P60 from "@/components/PostModals/P60";
import P59 from "@/components/PostModals/P59";
import P61 from "@/components/PostModals/P61";
import P62 from "@/components/PostModals/P62";
import PostModalBig from "@/components/PostModalBig";
import { mapGetters } from "vuex";

export default {
  name: "Post",
  components: {
    TextInput,
    PostContentEmpty,
    PostContent,
    P53,
    P54,
    P57,
    P58,
    P60,
    P59,
    P61,
    P62,
    PostModalBig
  },
  props: {
    post: {}
  },
  data: function () {
    return {
      author: {},
      liked: false,
      comment: ''
    }
  },
  watch: {
    post: {
      async handler() {
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile']),
  },
  methods: {
    getAuthor: async function (author_id) {
      ApiWrapper.getProfile({ id: author_id }).then(result => {
        this.author = result.data;
      })
    },
    getProfile: async function (user_id) {
      return await ApiWrapper.getProfile({ id: user_id })
    },
    toggleLike: function () {
      ApiWrapper.placeLike({ postId: this.post.id }).then(result => {

        if (result.success) {
          this.liked = !this.liked;
          if (this.liked === true) {
            this.post.likes.push(this.getAuthorizedProfile.userId);
            return;
          }
          this.post.likes = this.post.likes.filter(x => x !== this.getAuthorizedProfile.userId)

        }
      });
    },
    sendComment: function () {
      ApiWrapper.writeComment({ postId: this.post.id, comment: this.comment }).then(element => {
        this.comment = '';
      })
    }
  },
  async mounted() {
    this.getAuthor(this.post.author_id).then(result => {
      this.liked = this.post.likes.includes(this.getAuthorizedProfile.userId);
    });

    for (let comment of this.post.comments) {
      let profile = (await this.getProfile(comment.user_id)).data;
      comment.picture = profile.profile_picture;
      comment.name = profile.name;
    }
    this.post.comments = this.post.comments.sort(function (a, b) {

      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    })

  },
}
</script>

<style lang="scss">
h3 {
  margin: 0;
  padding: 0;
}

.post-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  height: auto;
  padding-bottom: 10px;


  .comments-sections {
    width: 100%;
    height: 100%;

    .comment {
      display: flex;
      height: 90px;

      .comment-area {
        display: flex;
        flex-direction: column;
        margin-left: 2%;
        margin-top: 10px;

        h3 {
          text-align: left;
        }

        p {
          text-align: left;
          font-size: 14px;
        }
      }

      .user-logo {
        img {
          height: 80px;
          width: 80px;
          border-radius: 100px;
        }
      }
    }

    hr {
      width: calc(100% + 20px);
      margin-left: -20px;
      border: 1px solid #EDEEF0;
      border-bottom: none;
    }

    .create-comment {
      display: flex;
      width: 100%;
      height: auto;

      img {
        height: 60px;
        border-radius: 100px;
      }

      .comment-area {
        width: 80%;
        height: auto;
        display: flex;
        align-items: center;
        margin-left: 20px;
      }

      .send-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 40px;

        img {
          height: 35px;
        }
      }

    }
  }

  .post-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
    margin-right: 20px;

    .reactions {
      // margin-top: 30px;
      display: flex;

      .likes.unliked {
        img {
          filter: grayscale(1) opacity(0.8);
        }

        p {
          color: gray;
        }
      }


      div {
        margin-right: 10px;
        cursor: pointer;
        height: 30px;
        background-color: #F0F2F5;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 0 12px 0 12px;

        p {
          margin: 0 0 0 5px;
          color: #FE6637;
        }
      }
    }

    .post-title {
      margin-top: 10px;
    }

    .post-description {
      margin-top: 10px;
    }

    .post-image {
      img {
        height: 360px;
      }
    }
  }
}


.post-header {
  height: 100px;
  display: flex;
  justify-content: space-between;

  .post_header_i {
    display: flex;
  }

  .post_ui {
    padding-right: 2rem;
    display: flex;
    gap: 8px;
    font-size: 16px;
    font-weight: 400 !important;
    align-items: center;
    padding-top: 1rem;
    justify-content: center;
    height: 20px;
    line-height: 19px;

    img {
      margin-left: 1rem;
    }
  }

  .author-logo {
    margin-left: 20px;
    display: flex;
    align-items: center;

    img {
      height: 80%;
      border-radius: 100px;
    }
  }

  .author-name {
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h4 {
      font-family: var(--base-font);
      font-size: 20px;
      margin: 0;
    }

    p {
      margin-top: 3px;
      font-family: var(--base-font);
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  }


}

.p_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30px;
}

.zakrep {
  display: flex;
  gap: 5px;
  align-items: center;
}

.comments_block {
  margin-top: 2rem;
  border-top: 2px solid #EDEEF0;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  padding-top: 1rem;
}

.comment_item:last-child {
  border-bottom: 0;
}

.comment_item {
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  padding-bottom: 15px;
  padding-top: 15px;
  border-bottom: 1px solid #EDEEF0;

  img {
    width: 75px;
    height: 75px;
  }

  .comm_content {
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;

    img {
      height: auto;
      width: auto;
    }

    .audio {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      color: black;

      span {
        color: #2A5885;
      }
    }

    .file {
      display: flex;
      gap: 10px;
      align-items: flex-start;

      div {
        margin-bottom: 0;
        font-size: 14px;
        color: #7A7777;
      }

      span {
        color: #2A5885;
        font-size: 16px;
      }
    }
  }

  .comm_info {
    width: 100%;
  }

  .comm_name {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    gap: 5px;
    align-items: center;
    color: #000;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .comm_date {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }

  .comm_like_res {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .comm_like {
      display: flex;
      align-items: center;
      gap: 5px;
      color: rgba(42, 88, 133, 0.6);
    }

    img {
      width: 20px;
      height: 17px;
      object-fit: contain;
    }
  }
}

.send_comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;

  .sc_input {
    width: 83%;
    height: 60px;
    border: 1px solid #D3D9DE;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    input{
      border: 0;
      outline: 0;
      width: 95%;
      height: 100%;
      padding: 0 0 0 1rem;
      box-sizing: border-box;
      font-size: 16px;
    }
  }
}
</style>