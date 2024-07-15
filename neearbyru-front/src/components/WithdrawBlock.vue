<template>
  <div class="withdraw-block-wrapper">
    <div class="withdraw-block-header">
      <div class="block-left">
        <div class="logo">
          <img src="../assets/withdraw-icon.png" alt="">
        </div>

        <div class="title">
          <h3>Номер вашей банковской карты</h3>
          <p>Для вывода средств</p>
        </div>

      </div>

      <div class="block-right">
        <TextInput v-mask="'#### #### #### ####'" placeholder="Номер карты"/>
      </div>

    </div>

    <hr>

    <div class="block-body">
      <p>Вывод денежных средств на карту осуществляется в течении 72 часов после формирования заявки на выплату! <br>
        Комиссия платёжной системы 2.5% + 10% комиссия сервиса!</p>

      <p style="margin-top: 40px">
        Минимальная сумма вывода 1000 ₽
      </p>

      <p style="margin-top: 15px;">Максимальная сумма вывода 15 000 ₽ / день</p>

      <p style="margin-top: 40px;">Доступно для вывода: {{ getAuthorizedProfile.balance }} ₽</p>

      <div class="withdrawActivity">
        <div class="custom-input">
          <TextInput placeholder="Сумма для выплаты"/>
        </div>
        <div class="buttons">
          <OrangeButton :height="34" button-label="Добавить карту"/>
          <OrangeButton :height="34" button-label="Запросить вывод"/>
        </div>
      </div>

      <p style="color: #818C99; font-size: 14px; margin-top: 20px;">
        Ваши данные защищены - мы никуда их не передаём. Нажимая кнопку, вы принимаете условия сервиса.
        <br>
        Если в течение этого срока деньги такк и не поступили, напишите нам на почту support@neearby.pro
      </p>
    </div>
  </div>
</template>

<script>

import TextInput from "@/components/TextInput";
import OrangeButton from "@/components/Buttons/OrangeButton";
import {mapGetters} from "vuex";

export default {
  name: "WithdrawBlock",
  components: {
    TextInput,
    OrangeButton
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile'])
  }
}

</script>

<style lang="scss">

.withdraw-block-wrapper{
  width: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  hr {
    width: 97%;
    margin: 10px auto 0 auto;
    border-color: rgba(255, 255, 255, 0.7);
    border-bottom: none;
  }

  .withdraw-block-header{
    margin: 25px 25px 0 25px;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .block-left{
    grid-column: 1 / 2;
    display: flex;
    margin-left: 25px;

    .logo{
      img {
        height: 50px;
      }
    }

    .title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 25px;
      text-align: left;

      p {
        color: rgba(0, 0, 0, 0.6);
        font-size: 15px;
        font-family: var(--base-font);
      }
    }
  }

  .block-right{
    grid-column: 2 / 3;
    width: 90%;
  }

  .block-body{
    margin: 25px 25px 25px 25px;
    text-align: left;
    display: flex;
    flex-direction: column;

    p {
      color: black;
      font-size: 15px;
      font-family: var(--base-font);
    }

    .withdrawActivity{
      margin-top: 30px;
      display: flex;
      align-items: center;

      .buttons {
        display: flex;
        width: 37%;
        justify-content: space-between;
        margin-left: 25px;
      }

      .custom-input{
        width: 40%;
      }

    }
  }
}

</style>