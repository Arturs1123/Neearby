<template>
  <div class="posts-section-wrapper">
<!--    <div class="posts">-->
<!--      <div class="posts">-->
<!--&lt;!&ndash;        <div class="fdsfs" style="width: 260px;">&ndash;&gt;-->
<!--&lt;!&ndash;          <RepostPreview :profile="profile"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <Post v-for="post in posts" :post="post"/>&ndash;&gt;-->
<!--        <Post :repost="repost" :profile="profile"/>-->
<!--      </div>-->
<!--    </div>-->
    <Post v-for="post in posts" :post="post" />

    <div class="no-posts">
      <h2>У Вас нет постов!</h2>
      <p><a href="/catalogue" style="color: #FE6637">Добавьте свой первый пост</a> прямо сейчас. <br>
        Напишите, как Вас зовут, сколько Вам лет, кем работаете или работали, сколько сейчас зарабатываете и сколько хотите зарабатывать </p>
    </div>
    <!-- <PostItem /> -->
  </div>

</template>

<script>


import Post from "@/components/Post.vue";
import RepostPreview from "@/components/RepostPreview";

export default {
  name: 'PostsSections',
  components: {
    RepostPreview,
    Post
  },
  props: {
    posts: {
      type: Array,
      default: []
    },
    reposts: [],
    profile: [],
  }
}

</script>

<style lang="scss">


.posts-section-wrapper {
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  height: auto;

  .posts{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 0 5px 0;
  }

  .no-posts{
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10% 0 10%;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }

}

</style>