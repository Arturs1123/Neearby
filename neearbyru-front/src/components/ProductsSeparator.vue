<template>
  <div class="products-separator-wrapper">
    <div class="products-amount">
<!--      <h4>Товары: <p>{{ productsAmount }}</p></h4>-->
      <h4>Лучшие товары: <p>{{ productsAmount }}</p></h4>
    </div>

    <div class="search">
      <Search/>
    </div>

    <div class="create-product" v-if="getAuthorizedProfile.userId || getCurrentProfile.id">
      <OrangeButton style="width: 90%;" button-label="Добавить товар" :click-event="clicked"> </OrangeButton>
    </div>

  </div>

  <VueFinalModal name="productsModal" v-model="showProductsModal">
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
    productsAmount: ''
  },
  data: function (){
    return {
      showProductsModal: false,
    }
  },
  methods: {
    clicked: function (event){
      this.$router.push('/add-product');
    }
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile']),
  }
}

</script>

<style lang="scss">
.products-separator-wrapper {
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


  .products-amount {
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

  .create-product{
    grid-column: 3 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
</style>