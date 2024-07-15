<template>
  <div class="modal_back">
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
          <span>Открытый пост</span>
          <img src="../assets/points_vert.svg" alt="">
        </div>
      </div>
      <div class="post-content">
        <!-- <div class="post-image">
        <img :src="post?.post_image_path" alt="">
      </div> -->
        <div class="post-title">
          <h3>{{ post?.title }}Заголовок</h3>
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
              <p>{{ post?.likes.length }}</p>
            </div>

            <div class="comment">
              <img :src="require('../assets/comment.svg')" alt="">
              <!-- <p>{{ post?.comments.length }}</p> -->
              <p>1</p>
            </div>

            <div class="share">
              <img :src="require('../assets/share.svg')" alt="">
            </div>

            <div class="favourite">
              <img :src="require('../assets/favourite.svg')" alt="">
            </div>
          </div>
          <div class="views">
            <img src="../assets/eye.svg" alt="">
            1
          </div>
        </div>


        <!-- <div class="comments-sections">
        <hr>
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

        </div>

      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ApiWrapper from '@/api'
import TextInput from "@/components/TextInput";
import PostContentEmpty from "@/components/PostContentEmpty";
import PostContent from "@/components/PostContent";
import { mapGetters } from "vuex";

export default {
  name: "PostModalBig",
  components: {
    TextInput,
    PostContentEmpty,
    PostContent,
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

<style lang="scss" scoped>
.modal_back{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  margin: 0;
  padding: 0;
}

.post-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  width: 750px !important;
  background-color: white;
  height: auto;
  padding-bottom: 10px;
  margin-right: auto !important;
  margin-left: auto !important;


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
</style>