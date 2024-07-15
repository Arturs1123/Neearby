<template>
  <div class="product_card">
    <div class="info">
      <div class="picture">
        <img :src="product.product_image_path" alt="">
      </div>
      <div class="title">{{product.title}}</div>
      <div class="show_description">показать полное описание товара</div>
      <div class="price_block">
      <div class="price">Обычная цена товара <span>{{product.price}} руб</span></div>
      <div class="sale-price">Цена со скидкой сейчас <span>{{product.discount_price}} руб</span></div>
      <div class="last-time">цена повысится через <span>23:53</span></div>
      </div>
        <div class="btns">
          <div class="img-icon"><img src="/img/messages.84502486.svg" alt="" ></div>
          <div class="img-icon"><img src="/img/messages.84502486.svg" alt="" ></div>
          <div class="img-icon"><img src="/img/messages.84502486.svg" alt="" ></div>
          <div class="img-icon"><img src="/img/messages.84502486.svg" alt="" ></div>
        </div>
    </div>
    <div class="info">
      <div class="user-info" v-if="profile.mail ? false : true">
        <div class="title">Заполните Свои данные</div>
        <input placeholder="Введите сови данные">
        <input placeholder="Введите сови данные">
        <input placeholder="Введите сови данные">
      </div>
      <div class="user-info" v-else>
        <div class="profile">
          <div class="el picture">
            <img :src="profile.img" alt="">
          </div>
          <div class="el info">
            <div class="name">{{profile.name}}</div>
            <div class="mail">{{profile.mail}}</div>
            <div class="phone">{{profile.phone}}</div>
          </div>
        </div>
      </div>
      <div class="price-type">
        <div class="text">Выбрать способ оплаты</div>
        <div class="element"><Checkbox style="margin: 0 0"/> <span>Такой то способ оплаты</span></div>
      </div>
      <button class="add-bin">Добавить в корзину</button>
      <div class="text">Предоплата</div>
      <div class="recurent-price">
        <div>
        <button>1100</button>
        <button>500</button>
        <button>500</button>
        </div>
        <div>
        <button>500</button>
        <button>500</button>
        <button>500</button>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import { Preview, PreviewResult } from 'vue-advanced-cropper';
import Checkbox from '@/components/Checkbox';
import Button from "@/components/Buttons/OrangeButton";
export default {
  name: "Header",
  components: {Button, Preview, PreviewResult, Checkbox },
  props: {
    product: {
      default: {}
    },
    profile: {
      default: {}
    }
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(["getAuthorizedProfile", "getCurrentProfile"]),
  }
}
</script>

<style lang="scss" scoped>
.product_card{
  width: 100%;
  margin: auto;
  display: flex;
  .info{
    width: 100%;
  }
  .picture{
    width: 500px;
    margin: 40px auto;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .title{
    font-weight: bold;
    font-size: 25px;
    color: black;
  }
  .show_description{
    font-size: 14px;
    color: #8c8c8c;
    margin-top: 15px;
  }
  .price_block{
    width: 500px;
    margin: 5px auto;

  }
  .price{
    font-size: 16px;
    color: black;
    span{
      margin: 0 5px;
      color: black;
      text-decoration: line-through;
      background: #ffd23c;
      padding: 5px;
      border-radius: 5px;

    }
    margin-top: 20px;
  }
  .sale-price{
      margin-top: 10px;
      font-size: 17px;
      color: black;
      span{
        font-size: 20px;
        background: lawngreen;
        padding: 8px;
        border-radius: 5px;
      }
  }
  .last-time{
    font-size: 15px;
    margin-top: 18px;
    span{
      margin: 0 10px;
      color: white;
      background: #ff4f4f;
      padding: 4px;
      border-radius: 3px;
    }
  }
  .btns{
    display: flex;
    width: 350px;
    margin: 25px auto;
    .img-icon{
      margin-left: 3px;
      background: #e1e0e0;
      width: 30px;
      height: 22px;
      padding: 5px;
      border-radius: 10px;
      transition: 0.3s;
    }
    .img-icon:hover{
      background: #afaeae;
    }
  }
  .user-info{
    margin: 50px auto;
    width: 100%;
    .title{
      font-size: 32px;
      color: #ff7c0c;
      font-weight: bold;
      margin-bottom: 15px;
    }
    input{
      width: 90%;
      border: none;
      color: #727272;
      background: #e5e4e4;
      padding: 20px;
      margin: 5px;
      height: 10px;
      border-radius: 10px;
    }
    .profile{
      margin: 0 20px;
      width: 50%;
      display: flex;
    .el{
      width: 100%;
    }
      .picture{
        img{
          border-radius: 50px;
          width: 100%;
          height: 100%;
        }
        width: 90px;
        height: 65px;
        margin: 0 5px;

      }
      .info{
        font-size: 17px;
        font-weight: bold;
        text-align: left;
        margin: 2px 5px;
        display: block;
      }
    }

  }
  .price-type{
    .element{
      padding: 10px;
      display: flex;
      color: black;
      font-size: 20px;
      width: 90%;
      text-align: center;
      border-radius: 10px;
      background: #d2d2d2;
      margin: 0 auto;
      span{
        margin: 5px 15px;
      }
    }
  }
  .text{
    width: 90%;
    margin: 0 auto;
    font-weight: bold;
    font-size: 26px;
    text-align: left;
    color: black;
  }
  .add-bin{
    cursor: pointer;
    width: 80%;
    margin: 35px auto;
    height: 60px;
    background: #fa790f;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 26px;
    font-weight: bold;

  }
  .recurent-price{
    width: 90%;
    margin: 10px auto;
    div{
      display: flex;
    }
    button{
      width: 100%;
      height: 50px;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 24px;
      background: #fa790f;
      border-radius: 12px;
      margin: 2px;
    }
  }
}


</style>