<template>
  <div class="modal" style="height: 750px; width: 57%">

    <div class="product-content-create" v-if="type == 'create' || product?.author_id !== getAuthorizedProfile.userId">
    </div>
    <div class="product-content-purchase"
         v-if="type != 'create' && product?.author_id === getAuthorizedProfile.userId">
        <div class="product_card d-flex">
          <div class="product_info">
            <div class="product_data">
            <img :src="product.product_image_path" alt="" style="height: 330px">
            <div class="product_title">{{product.title}}</div>
            <div class="product_description">показать полностью описание ляляля</div>
            <div class="price">
              <div class="product_price">Обычная цена товара <span class="yellow">{{ product.price }} рубл</span></div>
              <div class="product_price">Обычная цена товара <span class="green">{{ product.price }} рубл</span></div>
              <div class="product_price">скидка закончится  <span class="red">100</span></div>
            </div>
              <div class="product-btn">
              <a class="btn"><img style="width: 30px; height: 30px" class="btn_icon" src="../assets/icon/heart.png" alt=""></a>
              <a class="btn"><img style="width: 30px; height: 30px" class="btn_icon" src="../assets/icon/heart.png" alt=""></a>
              <a class="btn"><img style="width: 30px; height: 30px" class="btn_icon" src="../assets/icon/heart.png" alt=""></a>
                <a class="btn"><img style="width: 30px; height: 30px" src="../assets/icon/heart.png" alt=""></a>
            </div>
            </div>
          </div>
          <div class="product_info">
              <div class="product_data">
                <div class="name_title">Заполните Данные</div>
                <input type="text" class="product_form" placeholder="введите имя и фамилию">
                <input type="text" class="product_form" placeholder="Введите ваш e-mail">
                <input type="text" class="product_form" placeholder="Введите номер Вашего мобильного телефона">
                <div class="product_txt">Спопсоб Оплаты</div>
                <div class="form">
                  <div class="el d-flex">
                    <Checkbox style="margin: 0 0" />
                    <span>adadaadadadadadad adada dadad </span>
                  </div>
                  <div class="el d-flex">
                    <Checkbox style="margin: 0 0"/>
                    <span>adadaadadadadadad adada dadad </span>
                  </div>
                  <div class="el d-flex">
                    <Checkbox style="margin: 0 0" />
                    <span>adadaadadadadadad adada dadad </span>
                  </div>
                </div>
                <button class="product_btn_submit">Добавить В корзину</button>
                <div class="product_txt">Спопсоб Оплаты</div>
                <div class="forms">
                  <div class="el d-flex">
                    <button class="price_var_btn">21</button>
                    <button class="price_var_btn">12312</button>
                    <button class="price_var_btn">123</button>
                  </div>
                  <div class="el d-flex">
                    <button class="price_var_btn">21</button>
                    <button class="price_var_btn">12312</button>
                    <button class="price_var_btn">123</button>
                  </div>
                </div>
              </div>
          </div>
        </div>


    </div>
  </div>
</template>

<script>

import TextInput from "@/components/TextInput";
import OrangeButton from "@/components/Buttons/OrangeButton";
import ApiWrapper from "../api";
import Checkbox from '@/components/Checkbox';
const {$vfm} = require('vue-final-modal');
import {mapGetters, mapMutations} from "vuex";
import {POSITION, TYPE, useToast} from "vue-toastification";
import Button from "@/components/Buttons/OrangeButton";

export default {
  name: 'ProductModal',
  props: {
    product: {},
    type: {
      default: 'create'
    }
  },
  data: function () {
    return {
      currentProduct: {},
      money: {
        decimal: ',',
        thousands: '',
        prefix: '',
        suffix: ' ₽',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  components: {
    Button,
    TextInput,
    OrangeButton,
    Checkbox
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile'])
  },
  methods: {
    buyProduct: async function (product) {
      let order = await ApiWrapper.createOrder(1, this.product.id);
      const toast = useToast();
      toast("Перенаправление на страницу оплаты", {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS, timeout: 2000});
      setTimeout(() => {
        window.location.href = order.data.payUrl;
      }, 2000);

    },
    checkFiles: function (event) {
      this.file = event.target.files[0];
    },
    createProduct: async function () {
      let filePath = '';
      if (this.file) {
        filePath = (await ApiWrapper.uploadFile(this.file)).data[0];
      }


      let response = await ApiWrapper.createProduct({
        title: this.currentProduct.title,
        description: this.currentProduct.description,
        price: Number(this.currentProduct.price.split(this.money.suffix)[0]),
        download_link: this.currentProduct.download_link,
        product_type: '1',
        product_image_path: filePath.filePath || undefined
      });

      if (response.success) {
        window.location.reload()
      }
    },
    updateProduct: async function () {

      let filePath = '';
      if (this.file) {
        filePath = (await ApiWrapper.uploadFile(this.file)).data[0];
      }


      let response = await ApiWrapper.updateProduct({
        product: {
          id: this.currentProduct.id,
          title: this.currentProduct.title,
          description: this.currentProduct.description,
          price: Number(this.currentProduct.price.split(this.money.suffix)[0]),
          download_link: this.currentProduct.download_link,
          product_image_path: filePath.filePath || undefined
        }
      });

      if (response.success) {
        window.location.reload()
      }
    }

  },
  mounted() {
    Object.assign(this.currentProduct, this.product);
  }
}

</script>

<style lang="scss">

.modal {
  position: fixed;
  width: 57%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  .product-content-purchase {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    p {
      word-wrap: break-word;
      width: 100%;
      margin: 10px;
    }

    img {
      height: 30%;
    }

  }

  hr {
    padding: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-color: rgba(0, 0, 0, 0.2)
  }

  h2 {
    margin: 10px 0 10px 0;
    font-family: var(--base-font);
  }


  .product-content-create {
    padding-top: 10px;
    justify-self: center;
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;

    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80%;
      width: 90%;
    }

    .product-right {
      grid-column: 2 / 3;
      height: 80%;

      .upload-files {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
    }
  }
}

.d-flex {
  display: flex;
}

.product_card{
  width: 100%;
  height: 100%;
  margin: 10px auto;
}

.product_info{
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  .product_data{
    width: 100%;
    margin: 0 auto;
  }
  img{
    width: 100%;
    height: 250px;
  }
}

.product_title{
  color: black;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin-top: 20px;
}

.product_description{
  font-size: 13px;
  text-align: center;
  width: 100%;
  margin-top: 10px;
  color: #7A7777;
}
div.price{
  color: black;
  width: 80%;
  margin: 0 auto;

  .product_price{
    margin: 25px 0;
    font-size: 19px;
    font-weight: bold;
    text-align: left;
  }
  .red{
    padding: 7px;
    background: #e05353;
    color: white;
    border-radius: 5px;
  }
  .yellow {
    padding: 8px;
    background: yellow;
    border-radius: 10px;
    text-decoration: line-through;
  }
  .green {
    padding: 11px;
    background: lawngreen;
    border-radius: 11px;
  }
}

.product-btn{
  text-align: left;
  .btn{
    margin-right: 5px;
  }
}

.name_title{
  font-weight: bold;
  font-size: 27px;
  color: #fa790f;
  margin-bottom: 15px;
}

.product_form{
  width: 95%;
  margin: 5px auto;
  border: none;
  padding: 15px;
  border-radius: 8px;
  background: #f5f5f5;
  color: #7A7777;
  font-size: 17px;
}

.product_txt{
  text-align: left;
  font-weight: bold;
  font-size: 25px;
  margin: 15px 0;
  color: black;
}

.form{
  width: 100%;
  background: #e0d6d6;
  padding: 5px;
  border-radius: 7px;
}

.product_btn_submit{
  width: 300px;
  height: 55px;
  background: var(--orange);
  padding: 20px;
  color: white;
  font-size: 19px;
  font-weight: bold;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  text-align: center;

}

.price_var_btn{
  width: 100%;
  height: 40px;
  padding: 5px;
  border-radius: 8px;
  background: var(--orange);
  color: white;
  font-size: 19px;
  border: none;
  margin: 3px 4px;
}
.product-btn{
  display: flex;
  .btn{

    width: 30px;
    height: 30px;
    display: block;
    border: none;
    padding: 7px;
    border-radius: 10px;
    background: #a6a3a3;
  }
  .img{
      display: block;
      width: 30px;
      height: 30px;
      margin: 0 auto;
  }

}

.radio{
  width: 30px;
  background-color: #720000;
  border: 1px solid orangered;
  height: 30px;
}
.form {
  .el {
  }

}



</style>