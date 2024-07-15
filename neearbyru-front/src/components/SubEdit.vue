<template>
  <div class="add-product-wrapper">
    <div class="add-product-header">
      <img src="../assets/card.svg" alt="">
      <p class="title"> Добавление подписки </p>
    </div>
  </div>

  <div v-if="subscription.active == 2" style="background: yellow; height: auto; display: flex; flex-direction: column;margin-top: 50px;" class="add-product-wrapper">
    <div style="padding: 20px 20px 20px 0;" class="add-product-header">
      <img src="../assets/cross.png" style="width: 4%;" alt="">
      <p style="text-align: left; margin-left: 20px; font-size: 16px;" class="title"> Вы не прошли модерацию Вашей подписки. Пожалуйста, отредактируйте Вашу подписку. <br>
        Название подписки, Описание подписки, Изображение подписки
      </p>
    </div>
    <div class="add-product-header">
      <p style="text-align: left; color: gray; margin-left: 0; font-size: 16px;" class="title"> Комментарии от модератора: не цензурное название подписки</p>
    </div>
    <div class="add-product-header">
      <p style="text-align: left; margin-left: 0; font-weight: 500;margin-top: 20px; margin-bottom: 20px; font-size: 16px;" class="title"> C уважением, команда Neearby. <br>
        Neearby - всегда рядом.
      </p>
    </div>
  </div>
  <div class="product-content-wrapper">
<!--    <div class="type-product-header">-->
<!--      <p class="title"> Тип товара </p>-->
<!--    </div>-->
<!--    <div class="product-content">-->
<!--      <div class="type-box" :class="{active: isActive[0]}" @click="productTypeChange(0)"> Обычный товар </div>-->
<!--      <div class="type-box" :class="{active: isActive[1]}" @click="productTypeChange(1)"> Товар с правами перепродажи </div>-->
<!--      <div class="type-box" :class="{active: isActive[2]}" @click="productTypeChange(2)"> Соавторский товар </div>-->
<!--    </div>-->

    <div class="input-container">
      <p class="title"> Категория подписки: </p>
      <ProductCategory/>
    </div>

    <div class="input-container">
      <p class="title"> Название подписки: </p>
      <input type="text" v-model="subscription.title">
      <p class="placeholder"> Не более 100 символов </p>
    </div>

    <div class="input-container">
      <p class="title"> Описание подписки: </p>
      <div> <textarea v-model="subscription.description"></textarea> </div>
      <p class="placeholder" style="margin-left: 26px; margin-top: -2px;"> Не более 1500 символов </p>
    </div>

    <div class="input-container inline" style="display: block">
      <div class="dsadada" style="display: flex">
        <p style="margin-top: 24px"><b class="title"> Изображение подписки:</b> (Рекомендуемое разрешение 1250 x 250. Формат - JPG, WEBP или PNG)</p>
        <input type="file" accept=".png, .jpeg, .jpg, .gif" @change="selectImg" class="custom-file-input" style="border: none; background: #FE6637; color: white; width: 20%; height: 20px;padding: 10px 26px; margin-left: 30px; cursor: pointer">
      </div>
      <div class="view_img" v-if="isImgSelect">
        <img style="margin: 0 auto; max-width: 100%; max-height: 500px" :src="isImgSelect" alt="">
      </div>
      <div class="view_img" v-else>
        <img style="margin: 0 auto; max-width: 100%; max-height: 500px" :src="subscription.subscription_image_path" alt="">
      </div>
    </div>

<!--    <div class="input-container">-->
<!--      <p class="title"> Ссылка на продающий одностраничник подписки: </p>-->
<!--      <input type="text" v-model="subscription.product_link">-->
<!--    </div>-->

    <div class="input-container inline">
      <div class="field">
        <p class="title"> Обычная цена подписки: </p>
        <input class="ruble" v-model="subscription.price" type="text">
      </div>
      <div class="field">
        <p class="title"> Цена подписки со скидкой: </p>
        <input class="ruble" type="text" v-model="subscription.discount_price">
      </div>
    </div>

    <div class="input-container inline">
      <div class="field">
        <p class="title"> Автоотмена при не оплате: </p>
        <select class="correct">
          <option value=""> Не отменять </option>
        </select>
      </div>
      <div class="field">
        <p class="title"> Убрать скидку через: </p>
        <select class="correct">
          <option value=""> Не убирать </option>
        </select>
      </div>
    </div>
    <div class="orange-line"></div>

    <div style="margin-bottom: 1%">
      <p class="title"> Информация для покупателей товара  </p>
    </div>

    <div class="input-container">
      <p class="title"> Текст после оплаты товара: </p>
      <input type="text" v-model="subscription.description">
      <p class="placeholder"> Не более 300 символов </p>
    </div>

<!--    <div class="input-container">-->
<!--      <p class="title"> Ссылка на скачивание товара после оплаты: </p>-->
<!--      <input type="text" v-model="subscription.download_link">-->
<!--    </div>-->

    <div class="input-container checkbox-container">
      <p class="title"> Создать группу подписчиков товара покупателей: </p>
      <div>
        <p class="grey-text">Email </p>
        <Checkbox />
      </div>
      <div>
        <p class="grey-text">Messenger Neearby </p>
        <Checkbox />
      </div>
    </div>
    <div class="orange-line"></div>

    <!--        <div style="margin-bottom: 1%">-->
    <!--            <p class="title"> Установка процентов </p>-->
    <!--       </div>-->

    <!--       <div class="input-container inline">-->
    <!--            <div class="field">-->
    <!--               <p class="title"> Мой роялти за товар с правами-перепродажи: </p>-->
    <!--                <input class="persent" type="text">-->
    <!--            </div>-->

    <!--            <div class="field co-author-container">-->
    <!--                <div class="input-block">-->
    <!--                    <p class="title less"> Указать ID соавтора: </p>-->
    <!--                    <input class="less" type="text">-->
    <!--                </div>-->
    <!--                <div class="input-block">-->
    <!--                    <p class="title less"> Процент соавтору за продажу товара: </p>-->
    <!--                    <input class="persent" type="text">-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        <div class="input-container inline">-->
    <!--            <div class="field">-->
    <!--                <p class="title"> Процент партнёрам 1-го уровня за продажу товара: </p>-->
    <!--                <input class="persent" type="text" >-->
    <!--            </div>-->
    <!--            <div class="field">-->
    <!--                <p class="title"> Процент на благотворительность за продажу товара: </p>-->
    <!--                <input class="percent" type="text" >-->
    <!--            </div>-->
    <!--        </div>-->

    <div class="button-add">
      <button class="type-box active" @click="createProduct"> Обновить </button>
    </div>



  </div>
</template>

<script>
import ProductCategory from '@/components/ProductCategory';
import OrangeButton from '@/components/Buttons/OrangeButton';
import Checkbox from '@/components/Checkbox';
import ApiWrapper from "../api/";
import {POSITION, TYPE, useToast} from "vue-toastification";
import {mapGetters} from "vuex";

export default {
  name: "SubEdit",
  props: ['sproduct'],
  components: {
    ProductCategory,
    OrangeButton,
    Checkbox
  },
  data() {
    return {
      subscription: this.sproduct,
      image: {},
      isImgSelect: '',
      isActive: [true, false, false]
    }
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },

  methods: {
    createProduct: function (){
      const formData = new FormData();
      formData.append("image",  this.image);
      formData.append("id",  this.subscription.id);
      formData.append("title", this.subscription.title);
      formData.append("description",  this.subscription.description);
      formData.append("discount_price", this.subscription.discount_price);
      formData.append("price",  this.subscription.price);
      // formData.append("download_link",  this.subscription.download_link);
      // formData.append("product_link",  this.subscription.product_link);
      // if(this.image){
      //   this.product.image = this.image;
      // }
      //
      // for(let i in this.product){
      //   formData.append(i,  this.product[i]);
      // }

      ApiWrapper.updateSubscription(formData).then(result => {
        localStorage.setItem('subId', this.subscription.id);
        let domain = window.location.host
        window.location.href = "http://" + domain + '/';
      })
    },
    setImgUrl(url){
      this.isImgSelect = url;
    },
    selectImg(){
      let element = document.getElementsByClassName('custom-file-input')[0];
      this.image = element.files[0];
      const fileReader = new FileReader();
      let fnc = this.setImgUrl;
      fileReader.readAsDataURL(this.image);
      fileReader.addEventListener("load", function () {
        fnc(this.result);
      });

    },
    productTypeChange(index){
      const toast = useToast();
      if(index != 0){
        return  toast('Данная функция еще не разработанная разработчиками', {position: POSITION.BOTTOM_RIGHT, type: TYPE.INFO});
      }
      for(let i in this.isActive){
        this.isActive[i] = false;
      }
      this.isActive[index] = true;
    }
  }
}
</script>

<style lang="scss" scoped>


.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Выберите Изображение';
  padding: 10px;
  outline: none;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 10pt;
}

.button-wrapper {
  button {
    cursor: pointer;
    background-color: var(--orange);
    color: white;
    font-family: var(--base-font);
    border: none;
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 10px;
    width: 100%;
  }
}

.add-product-wrapper{
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 3rem;
  flex-direction: column;
  grid-column: 3 / 4;
  margin-top: 15px;
  display: grid;
  grid-template-columns: 3fr 1fr;

  .add-product-header {
    margin-left: 20px;
    display: flex;
    align-items: center;
    width: 100%;
  }
}

.product-container {
  width: 99%;
}

.product-content-wrapper {
  background-color: white;
  border-radius: 10px;
  margin-top: 50px;
  padding: 2%;

  .type-product-header {
    text-align: start;
  }

  .product-content {
    margin-top: 1rem;
    display: flex;
  }

  .checkbox-container {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      margin-left: 2%;

      p.grey-text {
        min-width: max-content;
      }
    }
  }
  .button-add {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 2%;

    button {
      width: 100%;
      font-size: 18px;
      height: 42px;
    }
  }
  .input-container {
    text-align: start;
    margin-top: 20px;

    input, select, textarea {
      transition: 0.2s ease-out all;
      background: white;
      outline: none;
      border: 1px solid #A8ADB8;
      border-radius: 10px ;
      height: 2rem;
      width: 98%;
      text-indent: 20px;
      margin-top: 20px;
    }

    textarea {
      padding-top: 8px;
      height: 25px;
      font-family: 'Inter', sans-serif;
    }

    .correct {
      width: 99%;
      height: 2.3rem;
      background-image: url('../assets/arrows.svg');
      background-repeat: no-repeat;
      background-position: 96%;
      background-size: 3%;
      appearance: none;
    }

    .placeholder {
      color:#7A7777;
      font-size: 10px;
      margin-left: 2%;
      margin-top: 1px;
    }
  }

  .inline {
    display: flex;

    .button {
      width: 12%;
      font-size: 16px;
      margin-right: 21%;
    }

    .input-block {
      display: flex;

      .less {
        width: 57%;
        margin-right: 1%;
        font-size: 16px;
      }
    }

    .field {
      width: 100%;
      margin-right: 13px;

      .ruble {
        background-image: url('../assets/ruble.svg');
        background-size: 2%;
        background-repeat: no-repeat;
        background-position: 96%;
        appearance: none;
      }

      .persent {
        background-image: url('../assets/persent.svg');
        background-size: 3%;
        background-repeat: no-repeat;
        background-position: 96%;
        appearance: none;
      }
    }

    .co-author-container {
      display: flex;
      align-items: end;

      .input-block {
        flex-direction: column;

        .title {
          width: 100%;
          margin-right: unset;
          font-size: 13px;
        }

        input.less {
          width: 92%;
        }

        .persent {
          background-size: 6%;
        }
      }
    }
  }

  .orange-line {
    height: 2px;
    background-color:  #FE6637;
    margin: 3% 0 3% 0;
  }
}

.title {
  margin-left: 0.5rem;
  font-family: var(--base-font);
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0;
}
.type-box {
  padding: 0 15px 0 15px;
  margin-right: 1rem;
  width: 100%;
  height: 2.3rem;
  border-radius: 10px;
  border: 2px solid #8e5252;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--orange);
  border: 1px solid var(--orange);
  cursor: pointer;
}

.active {
  background-color: var(--orange);
  color: white;
}

@media screen and (max-width: 769px) {
  body .create-product-body {
    grid-template-columns: 1fr;
  }
}
@media screen and (max-width: 500px) {
  .product-content-wrapper .product-content {
    flex-direction: column;
  }
  .type-box {
    width: 95%;
    margin-top: 15px;
  }
  .product-content-wrapper .inline {
    flex-direction: column;
  }
  .dsadada {
    flex-direction: column;
  }
  .product-content-wrapper .input-container input {
    text-indent: 0;
  }
  .product-content-wrapper .checkbox-container {
    align-items: flex-start;
    flex-direction: column;
  }
  .product-content-wrapper .checkbox-container div p.grey-text {
    margin-bottom: 0;
  }
  .product-content-wrapper .checkbox-container div {
    margin-top: 10px;
  }
}
@media screen and (max-width: 420px) {
  .type-box {
    width: 90%;
  }
}
</style>