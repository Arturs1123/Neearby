<template>
  <div class="filter_post">
    <div class="better">
      Лучшие товары
      <span>{{ products.length }}</span>
    </div>
    <div class="author">
      <span>Автор:</span> {{ profile.name }}
    </div>
    <div class="fil">
      <img src="../assets/orange_filter.svg" alt="">
      Фильтр
    </div>
  </div>
  <div class="product-section-wrapper">
    <div class="products" v-if="products.length">
      <div class="products">
        <div class="fdsfs" style="width: 260px;" v-for="product in products">
          <ProductPreviewAll :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductPreviewAll from "@/components/ProductPreviewAll";
import {mapGetters} from "vuex";
import ApiWrapper from "@/api";

export default {
  name: 'ProductsSectionAll',
  components: {
    ProductPreviewAll
  },
  props: {
    products: [],
    profile: []
  },
  data(){
    return {
      userId: 0
    }
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },
  mounted() {

  }
}

</script>

<style lang="scss" scoped>
.filter_post {
  background: #FFFFFF;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 25px;

  .better {
    font-size: 20px;
    font-weight: 600;
    color: #000;

    span {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .author {
    font-size: 20px;
    font-weight: 600;
    color: #000;

    span {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .fil{
    border-left: 1px solid #EDEEF0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-left: 1rem;
    gap: 10px;
  }
}


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
    width: 900px;
  }
  .product-section-wrapper .products {
    width: 900px;
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

</style>