<template>
  <div class="posts-separator-wrapper">
    <div class="posts-amount">
<!--      <h4>Лучшие посты: <p>{{ postsAmount }}</p></h4>-->
      <h4>Лучшие посты: <p>0</p></h4>
    </div>

    <div class="search">
      <Search/>
    </div>

    <div class="create-posts" v-if="getAuthorizedProfile.userId || getCurrentProfile.id">
      <OrangeButton style="width: 90%;" button-label="Добавить пост" :click-event="clicked"> </OrangeButton>
    </div>

  </div>

  <VueFinalModal name="postsModal" v-model="showPostsModal">
    <ProductModal/>
  </VueFinalModal>
</template>

<script>
import Search from "@/components/Search";
import OrangeButton from "@/components/Buttons/OrangeButton";
import ProductModal from "@/components/ProductModal";
import {mapGetters} from "vuex";

export default {
  name: 'ProductsSeparator',
  components: {ProductModal, Search, OrangeButton },
  props: {
    postsAmount: ''
  },
  data: function (){
    return {
      showPostsModal: false,
    }
  },
  methods: {
    clicked: function (event){
      this.showPostsModal = !this.showPostsModal
    }
  },
  computed: mapGetters(['getCurrentProfile', 'getAuthorizedProfile'])
}

</script>

<style lang="scss">
.posts-separator-wrapper {
  margin-top: 10px;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  h4 {
    display: inline-block;
    font-family: var(--base-font);
    font-size: 19px;
    color: black;
    margin: 0;
  }

  p{
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);
    padding-left: 5px;
    font-size: 19px;
  }


  .posts-amount {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10%;
  }

  .search{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 2 / 3;
  }

  .create-posts{
    grid-column: 3 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
</style>