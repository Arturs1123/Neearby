<template>
  <div class="footer-wrapper">
    <div class="footer">
      <div class="brand">
        <div class="logo">
          <img src="../assets/logo1.png" alt=""> <h3>Neearby.pro</h3>
        </div>
        <p class="logo__title">© NEEARBY.PRO • 2021-2023</p>
        <p class="logo__title">ИП Мялкин Александр Сергеевич</p>
        <!-- <p class="logo__title">ОГРНИП 321602700021753</p> -->
        <p class="logo__title">ИНН: 772409837853</p>
      </div>
      <div class="docs">
        <p style="color: black;">Документация</p>
        <a href="#" class="secret"></a>
        <a href="#"> <router-link to="/info">Пользовательское соглашение</router-link></a>
        <a href="#"><router-link to="/info">Политика конфиденциальности</router-link></a>
        <a href="#"><router-link to="/info">Соглашение  с подпиской</router-link></a>
        <a href="#"><router-link to="/info">Правила сервиса и рекуррентные платежи</router-link></a>
      </div>
      <div class="social">
        <div class="links">
        <p style="font-weight: 600;">Мы в социальных сетях: </p>
          <a href="https://t.me/alexhotpropartners"><img style="margin-left: 15px;" src="../assets/landing/telegram.svg" alt=""></a>
          <a href="https://vk.com/alexhotpro"><img style="margin-left: 10px;" src="../assets/landing/vk.svg" alt=""></a>
          <img style="margin-left: 10px;" src="../assets/landing/youtube.svg" alt="">
        </div>
        <p style="margin-top: 10px; font-weight: 600;">Есть вопросы?</p>
        <p style="text-decoration: underline; font-weight: 600;">Обращайтесь  - поможем!</p>
        <p style="margin-top: 5px; font-weight: 600;">support@neearby.pro</p>
        <p style="margin-top: 10px; font-weight: 600;">+7917 541 85 93</p>
        <p style="margin-top: 10px; ">Звоните с 12:00</p>
        <p>до 24:00 по МСК</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Footer",
  mounted() {
    document.getElementsByClassName('secret')[0].click();
  }

}

</script>

<style lang="scss">
.logo__title {
  margin-top: 20px;
}
.footer-wrapper{
  font-family: var(--base-font);
  background-color: #FFDBBA;
  background-image: url("~@/assets/footerpattern.png");
  background-repeat: no-repeat;
  height: auto;
  display: flex;
  justify-content: center;
  font-size: 18px;
  .footer{
    margin-top: 35px;
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .brand{
      display: flex;
      flex-direction: column;
      align-items: start;
      font-weight: 600;
      color: black;

      .logo{
        font-weight: 800;
        font-size: 25px;
        text-transform: uppercase;
        display: flex;
        align-items: center;

        img{
          width: 50px;
          margin-right: 20px;
        }

        h3{
          display: inline-block;
        }
      }

    }

    .docs{
      display: flex;
      flex-direction: column;
      text-align: left;
      a{
        cursor: pointer;
        color: #2A5885;
        margin-top: 10px;
      }
    }

    .social{
      text-align: right;
      color: black;
      .links{
        justify-content: right;
        display: flex;
        align-items: center;
      }

    }
  }

}
@media screen and (max-width: 1440px) {
        .footer-wrapper{
          align-items: center;
          height: auto;
        }
        .footer-wrapper .footer {
          width: 100%;
          display: flex;
          margin-top: 0;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
        
        }
        .logo__title {
          margin-top: 10px;
          margin-bottom: 8px;
        }
        .footer-wrapper .footer .docs {
          margin-left: 80px;
          margin-top: 20px;
        }
        .footer-wrapper .footer .social {
          margin-top: 15px;
        }
      }

@media screen and (max-width: 1050px) {
.footer-wrapper {
  height: auto;
}
.footer-wrapper .footer {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 60px;
}
.footer-wrapper .footer .social {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer-wrapper .footer .docs {
  margin-left: 0;
  }
}
@media screen and (max-width: 500px) {
.footer-wrapper .footer {
  margin-left: 35px;
  margin-top: 15px;
}
}
@media screen and (max-width: 400px) {
.footer-wrapper .footer {
  margin-left: 5px;
}
}

</style>