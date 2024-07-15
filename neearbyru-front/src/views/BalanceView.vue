<template>
  <div>
    <Header/>
    <div class="balance-body">
      <div class="sidebar">
        <SidebarMenu/>
      </div>
      <div class="full-width">
        <div class="history__balance">
          <div class="history__balance-wrapper">
            <div class="history__balance-header">
              <img src="../assets/balance-info.png" alt="">
              <p style="margin-left: 10px; font-weight: 600">Пополнить баланс | Вывести средства</p>
            </div>
          </div>
          <div class="history__balance__out">
            <div class="history__balance__stats">
              <p>Ваш текущий баланс: <span>3276.86 руб.</span></p>
              <p>Выведено средств: <span>0 руб.</span></p>
              <hr>
            </div>
            <div class="history__balance__output">
              <div class="history__balance__input">
                <input placeholder="Введите сумму пополнения">
                <input style="margin-top: 10px;" placeholder="Введите сумму вывода">
              </div>
              <div class="history__balance__button">
                <button>Пополнить баланс</button>
                <button style="margin-top: 10px;">Вывести средства</button>
              </div>
              <div class="balance__information">
                <span>Минимальная сумма вывода 1000руб <br> Максимальная сумма вывода 15000руб</span>
              </div>
            </div>
          </div>
        </div>
          <BalanceInfo/>
      </div>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import BalanceInfo from "@/components/BalanceInfo";
import {useStore, mapGetters} from "vuex";
import Button from "@/components/Buttons/OrangeButton";

export default {
  name: "MainPage",
  computed: mapGetters(['getCurrentProfile']),
  components: {
    Button,
    Header,
    LoginModal,
    SidebarMenu,
    BalanceInfo
  }
}
</script>

<style lang="scss">
p {
  margin-bottom: 0;
}
hr {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.balance__information {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
  font-size: 14px;
  color: gray;
  margin-left: 10px;
}
.balance-body{
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2fr 3fr 15fr 1fr ;
    background-color: var(--secondary-color);

  .full-width{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  }
}
.history__balance {
  margin-top: 100px;
}
.history__balance-wrapper {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
}
.history__balance-header {
  padding: 20px;
  display: flex;
  align-items: center;
  width: 100%;
}
.history__balance__out {
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.history__balance__stats {
  padding: 20px 20px 0 20px;
}
.history__balance__stats > p {
  text-align: left;
  margin-top: 10px;
}
.history__balance__output {
  padding: 0 20px 20px 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.history__balance__input {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35%;
}
.history__balance__input > input {
  padding: 10px;
  outline: none;
  border: solid 1px gray;
  border-radius: 10px;
  justify-content: space-between;
}
.history__balance__button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  width: 20%;
}
.history__balance__button > button {
  cursor: pointer;
  background-color: var(--orange);
  color: white;
  font-family: var(--base-font);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  width: 100%;
  height: 40px;
}
@media screen and (max-width: 1440px) {
  .balance-body {
    grid-template-columns: 1fr 3fr 15fr 1fr;
  }
}
@media screen and (max-width: 769px) {
  .balance-body {
    display: flex;
    flex-direction: column;
  }
}

</style>