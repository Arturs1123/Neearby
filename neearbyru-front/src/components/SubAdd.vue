<template>
  <div class="add-product-wrapper">
    <div class="add-product-header">
      <img src="../assets/card.svg" alt="">
      <p class="title"> Добавление подписки </p>
    </div>
  </div>
  <div class="product-content-wrapper">
<!--    <div class="type-product-header">-->
<!--      <p class="title"> Тип подписки </p>-->
<!--    </div>-->
<!--    <div class="product-content">-->
<!--      <div class="type-box active" :class="{ active: isActive[0] }" @click="productTypeChange(0)"> Обычный товар </div>-->
<!--      <div class="type-box" :class="{ active: isActive[1] }" @click="productTypeChange(1)"> Товар с правами-перепродажи-->
<!--      </div>-->
<!--      <div class="type-box" :class="{ active: isActive[2] }" @click="productTypeChange(2)"> Соавторский товар </div>-->
<!--    </div>-->

    <div class="input-container">
      <p class="title"> Категория подписки: </p>
      <ProductCategory />
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
      <div class="dsadada" style="display: flex;align-items: center;">
        <p style="margin-top: 24px"><b class="title"> Изображение подписки:</b> (Рекомендуемое разрешение 1250 x 250. Формат
          - JPG, WEBP или PNG)</p>
        <input type="file" title="Загрузить" accept=".png, .jpeg, .jpg, .gif" @change="selectImg"
               class="custom-file-input"
               style="border: none; background: #FE6637; color: white;width: 153px;height: 44px; margin-left: 30px; cursor: pointer">
      </div>
      <div class="view_img" v-if="isImgSelect">
        <img style="margin: 0 auto; max-width: 100%; max-height: 500px" :src="isImgSelect" alt="">
      </div>
    </div>

<!--    <div class="input-container">-->
<!--      <p class="title"> Ссылка на продающий одностраничник товара: </p>-->
<!--      <input style="color: #2A5885;" type="text" v-model="subscription.product_link">-->
<!--    </div>-->

    <div class="input-container inline" style="justify-content: space-between;">
      <div class="field">
        <p class="title"> Обычная цена подписки: </p>
        <input class="ruble" v-model="subscription.price" type="text">
      </div>
      <div class="field">
        <p class="title"> Цена подписки со скидкой: </p>
        <input v-model="subscription.discount_price" class="ruble" type="text">
      </div>
    </div>

    <div class="input-container inline" style="justify-content: space-between;">
      <div class="field" >
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
      <p class="title"> Информация для покупателей подписки </p>
    </div>

    <div class="input-container">
      <p class="title"> Текст после оплаты подписки: </p>
      <input type="text">
      <p class="placeholder"> Не более 300 символов </p>
    </div>

<!--    <div class="input-container">-->
<!--      <p class="title"> Ссылка на скачивание подписки после оплаты: </p>-->
<!--      <input style="color: #2A5885;" type="text" v-model="subscription.download_link">-->
<!--    </div>-->
    <div class="inputs_group">
      <div class="title">Создать группу подписчиков подписки покупателей:</div>
      <div class="check_orange">
        Email
        <img src="../assets/check.png" alt="">
      </div>
      <div class="check_orange">
        Messenger Neearby
        <img src="../assets/check.png" alt="">
      </div>
    </div>
    <div class="orange-line"></div>

    <!--    <div style="margin-bottom: 1%">-->
    <!--      <p class="title"> Установка процентов </p>-->
    <!--    </div>-->

    <!--    <div class="input-container inline">-->
    <!--      <div class="field">-->
    <!--        <p class="title"> Мой роялти за товар с правами-перепродажи: </p>-->
    <!--        <input class="persent" type="text">-->
    <!--      </div>-->

    <!--      <div class="field co-author-container" style="justify-content: space-between;">-->
    <!--        <div class="input-block">-->
    <!--          <p class="title less"> Указать ID соавтора: </p>-->
    <!--          <input class="less" style="height: 34px;" type="text">-->
    <!--        </div>-->
    <!--        <div class="input-block">-->
    <!--          <p class="title less"> Процент соавтору за продажу товара: </p>-->
    <!--          <input class="persent" type="text">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="input-container inline">-->
    <!--      <div class="field">-->
    <!--        <p class="title"> Процент партнёрам 1-го уровня за продажу товара: </p>-->
    <!--        <input class="persent" type="text">-->
    <!--      </div>-->
    <!--      <div class="field">-->
    <!--        <p class="title" style="padding: 0;"> Процент на благотворительность за продажу товара: </p>-->
    <!--        <input class="percent" type="text">-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="button-add" style="width: 221px;height: 44px;margin-right: auto;
          margin-left: auto;">
      <button class="type-box active" @click="createProduct"> Добавить подписку </button>
    </div>



  </div>
</template>

<script>
import ProductCategory from '@/components/ProductCategory';
import OrangeButton from '@/components/Buttons/OrangeButton';
import Checkbox from '@/components/Checkbox';
import ApiWrapper from "../api/";
import { POSITION, TYPE, useToast } from "vue-toastification";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductCategory,
    OrangeButton,
    Checkbox
  },
  data() {
    return {
      subscription: {
        title: '',
        description: '',
        price: '',
        discount_price: '',
        // download_link: '',
        // type: '23',
        // product_link: '',
      },
      profileId: 186,
      image: {},
      isImgSelect: '',
      isActive: [true, false, false]
    }
  },
  computed: {
    ...mapGetters(['getCurrentProfile', 'getAuthorizedProfile', 'getUnreadNotifications'])
  },

  methods: {
    createProduct: function () {
      const formData = new FormData();
      formData.append("image",  this.image);
      formData.append("title", this.subscription.title);
      formData.append("description",  this.subscription.description);
      formData.append("price",  this.subscription.price);
      formData.append("discount_price",  this.subscription.discount_price);
      formData.append("author_id",  this.profileId);
      formData.append("name_user",  this.profileName);
      formData.append("number_user",  this.phoneUser);
      formData.append("email_user",  this.emailUser);

      // this.product.image = this.image;
      // for (let i in this.product) {
      //   formData.append(i, this.product[i]);
      // }

      ApiWrapper.createSubscription(formData).then(result => {
        localStorage.removeItem('already');
        localStorage.setItem('subId', result.data.data.id);
        let domain = window.location.host
        window.location.href = "http://" + domain + '/';
      }).catch(() => {
        console.log("Не удалось создать товар");
      })
    },
    setImgUrl(url) {
      this.isImgSelect = url;
    },
    selectImg() {
      let element = document.getElementsByClassName('custom-file-input')[0];
      this.image = element.files[0];
      const fileReader = new FileReader();
      let fnc = this.setImgUrl;
      fileReader.readAsDataURL(this.image);
      fileReader.addEventListener("load", function () {
        fnc(this.result);
      });

    },
    productTypeChange(index) {
      const toast = useToast();
      if (index != 0) {
        return toast('Данная функция еще не разработанная разработчиками', { position: POSITION.BOTTOM_RIGHT, type: TYPE.INFO });
      }
      for (let i in this.isActive) {
        this.isActive[i] = false;
      }
      this.isActive[index] = true;
    }
  },
  async mounted() {
    this.userId = this.getCurrentProfile.id;
    await ApiWrapper.getProfile({login: this.getCurrentProfile.login}).then(response => {
      let profile = response.data;
      this.profileName = profile.name;
      this.phoneUser = profile.phone;
      this.emailUser = profile.email;
      this.profilePicturePath = profile.profile_path;
      console.log(profile);
      console.log(this.profileName);
    });
  }
}
</script>

<style lang="scss" scoped>
// .custom-file-input::-webkit-file-upload-button {
//   visibility: hidden;
// }

// .custom-file-input::before {
//   content: 'Выберите Изображение';
//   padding: 10px;
//   outline: none;
//   text-align: center;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 10pt;
// }

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

.add-product-wrapper {
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
  width: 1220px;
}

.product-content-wrapper {
  background-color: white;
  border-radius: 10px;
  margin-top: 15px;
  padding: 2%;

  .type-product-header {
    text-align: start;
  }

  .product-content {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
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

    input,
    select,
    textarea {
      transition: 0.2s ease-out all;
      background: white;
      outline: none;
      border: 1px solid #A8ADB8;
      border-radius: 10px;
      height: 2rem;
      width: 98%;
      text-indent: 20px;
      margin-top: 20px;
    }

    textarea {
      // height: 43px;
      padding-top: 8px;
      height: 25px;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
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
      color: #7A7777 !important;
      font-size: 10px !important;
      margin-left: 2% !important;
      margin-top: 1px !important;
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
          background-size: 3%;
        }
      }
    }
  }

  .orange-line {
    height: 2px;
    background-color: #FE6637;
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

.type-box.active {
  // padding: 0 15px 0 15px;
  // margin-right: 1rem;
  // width: 100%;
  // height: 2.3rem;
  // border-radius: 10px;
  // border: 2px solid #8e5252;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // background-color: white;
  // color: var(--orange);
  // border: 1px solid var(--orange);
  // cursor: pointer;
  width: 294px;
  height: 43px;
  background: #FE6637;
  border: 1px solid #FE6637;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.type-box {
  width: 294px;
  height: 43px;
  background: #FFFFFF;
  border: 1px solid #FE6637;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--orange);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
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
  .dsadada {
    flex-direction: column;
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



.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

// .custom-file-input::before {
//   content: 'Выберите Изображение';
//   padding: 10px;
//   outline: none;
//   text-align: center;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 10pt;
// }

.custom-file-input {
  width: 153px !important;
  height: 44px !important;
  color: white !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: #FE6637 !important;
  border-radius: 10px !important;
  outline: 0 !important;
  text-indent: 0 !important;
  margin: 0 !important;
}

.custom-file-input::before {
  content: 'Загрузить';
  text-align: center;
  font-weight: 700;
  margin-top: 8px;
  font-size: 20px;
  line-height: 155%;
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

.input-container {
  p {
    font-size: 16px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
    margin: 0 !important;
    margin-right: 1rem !important;

    .title {
      font-size: 19px !important;
      font-weight: 600 !important;
    }
  }

  .title {
    font-size: 19px !important;
    font-weight: 600 !important;
    padding-left: 1rem;
  }
}

.ruble,
.correct {
  margin-top: 10px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
}

input {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  margin-top: 10px !important;
}

.add-product-wrapper {
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

.persent {
  width: 500px;
}

.product-content-wrapper {
  background-color: white;
  border-radius: 10px;
  margin-top: 15px;
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

  // .input-container {
  // text-align: start;
  // margin-top: 20px;

  // input, select, textarea {
  // transition: 0.2s ease-out all;
  // background: white;
  // outline: none;
  // border: 1px solid #A8ADB8;
  // border-radius: 10px ;
  // height: 2rem;
  // width: 98%;
  // text-indent: 20px;
  // margin-top: 20px;
  // }

  // textarea {
  // height: 2%;
  // }

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
    color: #7A7777;
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
      // width: 57%;
      // margin-right: 1%;
      font-size: 16px !important;
      padding: 0 !important;
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
  background-color: #FE6637;
  margin: 3% 0 3% 0;
}

.correct {
  width: 500px;
}
.ruble {
  width: 500px;
}

.title {
  margin-left: 0.5rem;
  font-family: var(--base-font);
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0;
}

.active {
  background-color: var(--orange);
  color: white;
}

.inputs_group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  gap: 30px;
  color: #7A7777;

  .title {
    text-align: left;

  }

  .check_orange {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    img {
      width: 32px;
      height: 35px;
    }

  }
}

@media screen and (max-width: 769px) {
  body .create-product-body {
    display: flex;
    flex-direction: column;
  }
  .product-content {
    flex-direction: column;
  }
  select {
    width: 50%;
  }
  .type-box.active {
    width: 100%;
  }
  .type-box {
    width: 100%;
  }
  .product-content-wrapper .inline {
    flex-direction: column;
  }
  .ruble {
    width: 100%;
  }
  .product-content-wrapper .inline .co-author-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .product-content-wrapper .inline .co-author-container .input-block {
    width: 100%;
  }
  .product-content-wrapper .inline .co-author-container .input-block input.less {
    width: 98%;
  }
  .input-container .title {
    padding-left: 0;
  }
  .persent {
    width: 100%;
  }
  .persent {
    width: 100%;
  }
}

@media screen and (max-width: 500px) {
  .product-content-wrapper .product-content {
    flex-direction: column;
  }

  .type-box {
    width: 100%;
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