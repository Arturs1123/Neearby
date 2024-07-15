<template>
  <div class="product-preview">

    <div style="cursor: pointer;display: contents;">
      <div class="product-image">
        <img :src="product.product_image_path" v-if="product.active == 1" alt="">
        <img v-else src="http://45.11.27.143:3003/lock.png" alt="">
      </div>

      <div class="product-title">
        <h3>{{ product.title }}Заголовок</h3>
      </div>

      <div class="product-description">
        <p>Показать описание</p>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center;" class="product-price">
        <h4 style="margin-left: 80px;">{{ product.price }}500 ₽</h4>
        <div
            style="width: 20px; display: flex;color: gray; font-size: 13px; margin-right: 10px; align-items: center; position: relative"
            class="item-icon">
          <img @click="$router.push(`/product/${product.id}`)" style="height: 15px; margin-left: 30px;"
               src="../assets/bx_link-alt.png" alt=""> 1
        </div>
        <div style="width: 20px; display: flex; color: gray; font-size: 13px; align-items: center;" class="item-icon">
          <img @click="link(product.product_link)" style="height: 15px; margin-left: 30px;"
               src="../assets/bx_link-alt.png" alt="">
          2
        </div>
        <div style="width: 20px; display: flex; color: gray; font-size: 13px; align-items: center;margin-left: 0.5rem;"
             class="item-icon">
          <img @click="link(product.product_link)" style="height: 15px; margin-left: 30px;"
               src="../assets/bx_link-alt.png" alt="">
          3
        </div>
      </div>
    </div>

    <div class="menu_items">
      <div class="space_block"></div>
      <div class="setting">
        <div class="overlay">
          <div class="menu_overlay">
            <button>удалить</button>
            <button>удалить</button>
            <button>удалить</button>
          </div>
        </div>
        <img src="../assets/menu.png" alt="" style="width: 25px; height: 25px">
      </div>
    </div>

    <div class="btns">
      <div class="item-icon"><img src="../assets/wpf_like.png" alt=""></div>
      <div class="item-icon"><img src="../assets/fa-solid_comment-alt.png" alt=""></div>
      <div class="item-icon"><img src="../assets/akar-icons_arrow-forward-thick-fill.png" alt=""></div>
      <div class="item-icon">
        <img src="../assets/bi_bookmark-fill.png" alt="">
      </div>
      <div class="item-icon-view">
        <img src="../assets/ant-design_eye-filled.png" alt=""> 0
      </div>
    </div>
    <div class="buscet_btn">Добавить в корзину</div>
    <div class="more_info_pr">
      <img src="../assets/Vector_questions_more.svg" alt="">
      <span>Узнать подробнее</span>
    </div>
  </div>

  <VueFinalModal name="productsModal" v-model="showProductsModal">
    <ProductModal type="update" :product="product" />
  </VueFinalModal>
</template>

<script>

import ProductModal from "@/components/ProductModal";

export default {
  name: "ProductPreview",

  props: {
    product: {
      default: {}
    }
  },
  data: function () {
    return {
      showProductsModal: false,
    }
  },
  components: {
    ProductModal,
  },
  methods: {
    productClicked: function (event) {
      this.showProductsModal = !this.showProductsModal;
    },
    link(link) {
      location.assign(link);
    }
  }
}

</script>

<style lang="scss" scoped>
.product-preview:hover {
  .menu_items {
    display: flex;
  }
}

.product-preview {
  position: relative;
  margin: 5px 0;
  width: 300px;

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
    height: 200px;
    width: 100%;
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

  .item-icon {
    img {
      height: 85%;
      width: 85%;
    }

    cursor: pointer;
    margin-left: 10px;
    width: 25px;
    height: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    background: #edf2fa;
    transition: 0.4s;
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