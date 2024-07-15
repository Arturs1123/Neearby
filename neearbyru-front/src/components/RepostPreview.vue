<template>
  <div class="product-preview">
    <div style="cursor: pointer;">
      <div class="product-image">
        <div class="post-header">
          <div class="post_header_i">
            <div class="author-logo">
              <!-- <img :src="author?.profile_picture" alt=""> -->
              <img src="../assets/main_img.svg" alt="">
            </div>
            <div class="author-name">
              <h4 style="display: flex;gap: 5px;align-items: center;">
                <b>Алекс Жаркий</b>
                <img src="../assets/verific.svg" alt="">
              </h4>
              <p>8 сентября в 23:12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductModal from "@/components/ProductModal";

export default {
  name: "RepostPreview",

  props: {
    repost: {
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
  width: 270px;

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
    width: 150px;
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

.more_info_pr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;

  span {
    color: #7A7777;
    border-bottom: 1px solid #7A7777;
    cursor: pointer;
  }

  img {
    width: 15px;
    height: 15px;
    margin-right: 0.5rem;

  }
}
</style>