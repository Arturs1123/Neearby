<template>
  <div style="background: #EDEEF0">
    <Header/>
    <div className="first-block">
      <div className="left-labels">
        <h2>
          Начни с сегодняшнего дня зарабатывать в автоматическом режиме благодаря автоматизации на NEEARBY.PRO 
        </h2>
        <p>Моментально зарегистрируйтесь прямо сейчас!</p>
        <div className="authors">
          <div className="author-circle">
            <img src="../assets/landing/author1.png" alt="">
          </div>

          <div className="author-circle" style="margin-left: -15px;">
            <img src="../assets/landing/author2.png" alt="">
          </div>

          <div className="author-circle" style="margin-left: -15px;">
            <img src="../assets/landing/author3.png" alt="">
          </div>

          <div className="author-circle" style="margin-left: -15px;">
            <p>100k+</p>
          </div>

          <h4>Присоединяйся к сообществу авторов</h4>
        </div>
        <div className="button-wrapper">
          <OrangeButton
              :button-label="!getAuthorizedProfile.userId ? 'Регистрируйся прямо сейчас' : 'Войти в мой профиль'"
              :click-event="registration"/>
        </div>

      </div>
      <div className="right-image">
        <img src="../assets/landing/laptop.png" alt="">
      </div>
    </div>

    <div className="how-it-works">
      <h1>Как работает сервис
        <div id="orange-label" style="color: #FF431A">Neearby.pro</div>
        ?
      </h1>

      <div className="steps">
        <div className="step-item">
          <div className="image">
            <img src="../assets/landing/step1.png" alt="">
          </div>
          <div className="description">
            <h3>Шаг
              <div className="red-circle">1</div>
            </h3>
            <p>Зарегистрируйтесь, станьте автором и создайте свою страницу на Neearby.</p>
            <p>Создайте свои уровни подписки.</p>
            <p>Размещайте посты с фото, видео, ссылками.</p>
            <p>Подумайте, что вы реально будете давать вашим подписчикам.</p>
          </div>

          <img className="steps__img" style="position: absolute; left: -200px; top: 150px"
               src="../assets/landing/arrow.svg"
               alt="">
        </div>
        <div className="step-item">
          <div className="description">
            <h3>Шаг
              <div className="red-circle">2</div>
            </h3>
            <p>Расскажите своим друзьям, что вы используете Neearby.</p>
            <p>Оповестите во всех социальных сетях о вашем новом профиле.</p>
            <p>Neearby, это совершенно новый формат общения между авторами и подписчиками.</p>
          </div>
          <div className="image">
            <img src="../assets/landing/step2.png" alt="">
          </div>
          <img className="steps__img" style="position: absolute; right: -200px; top: 150px; transform: scaleX(-1)"
               src="../assets/landing/arrow.svg" alt="">
        </div>
        <div className="step-item">
          <div className="image">
            <img src="../assets/landing/step3.png" alt="">
          </div>
          <div className="description">
            <h3>Шаг
              <div className="red-circle">3</div>
            </h3>
            <div className="text">
              <p>Будьте активны.</p>
              <p>Постоянно рассказывайте о своем профиле в социальных сетях.</p>
              <p>Цель - чтобы количество ваших подписчиков постоянно росло.</p>
            </div>
          </div>
        </div>

      </div>


    </div>

    <div className="advantages">
      <h1>Что умеет
        <div id="orange-label" style="color: #FF431A">Neearby.pro</div>
        ?
      </h1>

      <div className="items">
        <div className="item">
          <div className="image">
            <img src="../assets/landing/sale.svg" alt="">
          </div>
          <div className="description">
            Продажа электронных товаров
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/catalogue.svg" alt="">
          </div>
          <div className="description">
            Каталог авторов, каталог товаров, каталог подписок
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/top.svg" alt="">
          </div>
          <div className="description">
            Топ 10 товаров<br>
            Топ 10 подписок
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/vip.svg" alt="">
          </div>
          <div className="description">
            VIP
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/cart.svg" alt="">
          </div>
          <div className="description">
            Покупка рекламы
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/chat.svg" alt="">
          </div>
          <div className="description">
            Общение по переписке с другими зарегистрированными пользователями
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/up.svg" alt="">
          </div>
          <div className="description">
            Расширенная статистика ваших продаж подписок и товаров
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/call.svg" alt="">
          </div>
          <div className="description">
            Умные ссылки, чтобы понять с какой конкретной ссылки были заказы/продажи
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/bell.svg" alt="">
          </div>
          <div className="description">
            Уведомления о заказах и продажах
          </div>
        </div>

        <div className="item">
          <div className="image">
            <img src="../assets/landing/ai.svg" alt="">
          </div>
          <div className="description">
            Нейронка на контент 18+
          </div>
        </div>


      </div>

    </div>

    <div className="best-authors">
      <h1>Лучшие авторы
        <div id="orange-label" style="color: #FF431A">Neearby.pro</div>
      </h1>

      <div className="gallery">
        <VueHorizontal responsive>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
            <div className="link">
              <a href="#">Перейти на страницу автора</a>
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img src="../assets/landing/alex.png" alt="">
            </div>

            <div className="name">
              <h2>Владелец Neearby.pro</h2>
            </div>
            <div className="followers">
              2301 отслеживающих
            </div>
            <div className="subscribers">
              1200 подписчиков
            </div>
            <div className="sells">
              187 продаж
            </div>
          </div>


        </VueHorizontal>
      </div>
    </div>

    <div className="calculator">
      <div className="left-side">
        <h2>Сколько я заработаю?</h2>
        <div className="content-block">
          <p>Введите предполагаемое количество подписчиков на Neerby.com</p>
          <input type="text" v-model="subscribersAmount">

          <p style="margin-top: 40px;">Введите сумму подписки:</p>
          <input type="text" v-model="subscriptionPrice">

          <p style="margin-top: 40px;">При стоимости уровня {{ subscriptionPrice }} рублей вы заработаете:</p>

          <h3>
            <h2 style="margin-right: 20px;">{{ ((subscribersAmount * subscriptionPrice) * 0.9).toLocaleString() }}</h2>
            руб./месяц
          </h3>
          <p>После вычета комиссий сервиса и платёжных систем</p>

        </div>
        <div className="white-block">
          <div className="head">
            Есть вопросы? Обращайтесь - поможем!
          </div>
          <div className="body">
            <div className="contact">По любым вопросам:
              <div className="orange">support@neearby.pro</div>
            </div>

            <div className="contact">По срочным вопросам:
              <div className="orange">+7917 541 85 93</div>
            </div>

          </div>

        </div>

      </div>
      <div className="right-side">
        <h2>Что я могу предложить?</h2>
        <div className="content-block">
          <p style="">Самые популярные варианты:</p>
          <p style="margin-top: 15px;">
            <img src="../assets/landing/selected.svg" alt="" style="margin-right: 20px;">Ранний
            доступ к контенту
          </p>
          <p style="margin-top: 15px;">
            <img src="../assets/landing/selected.svg" alt="" style="margin-right: 20px;">Влияние на будущий контент
          </p>
          <p style="margin-top: 15px;">
            <img src="../assets/landing/selected.svg" alt="" style="margin-right: 20px;">Эксклюзивный контент
          </p>
          <p style="margin-top: 15px;">
            <img src="../assets/landing/selected.svg" alt="" style="margin-right: 20px;">Участие в закрытой группе или в
            секретном чате
          </p>
          <p style="margin-top: 15px;">
            <img src="../assets/landing/selected.svg" alt="" style="margin-right: 20px;">Не
            вошедшее
          </p>
          <p style="margin-top: 15px;">
            <img src="../assets/landing/selected.svg" alt="" style="margin-right: 20px;">Всё,
            что понравится вашим подписчикам
          </p>
        </div>

        <div className="white-block">
          <div className="head">
            Мы в социальных сетях! Подписывайтесь!
          </div>
          <div className="body">
            <div className="social">
              <a href="#" className="social-link">
                <img src="../assets/landing/vk.svg" alt="">Наш VK
              </a>

              <a href="#" className="social-link">
                <img src="../assets/landing/telegram.svg" alt="">Наш телеграмм
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from "@/views/Header";
import LoginModal from "@/components/LoginModal";
import OrangeButton from "@/components/Buttons/OrangeButton.vue";
import Footer from "@/components/Footer.vue";
import VueHorizontal from "vue-horizontal";
import TwentyBuyOffer from "@/components/TwentyBuyOffer.vue";
import {useStore, mapGetters} from "vuex";
import TextInput from "@/components/TextInput.vue";
import ProductPreview from '@/components/ProductPreview.vue'
import Product38 from '@/components/ModalsForProducts/Product38.vue'

export default {
  name: "MainPage",
  computed: mapGetters(['getCurrentProfile', "getAuthorizedProfile"]),
  components: {
    TextInput,
    Header,
    LoginModal,
    OrangeButton,
    VueHorizontal,
    Footer,
    Product38
  },
  data() {
    return {
      subscribersAmount: '1000',
      subscriptionPrice: '200'
    }
  },
  methods: {
    registration: function () {
      if (this.getAuthorizedProfile.userId) {
        let domain = window.location.host
        window.location.href = "http://" + this.$store.getters.getAuthorizedProfile.login + '.' + domain + '/';
        return;
      }
      this.$router.push('/registration');
    }
  },
}
</script>

<style lang="scss">
.first-block {
  position: relative;
  height: calc(100vh - 80px);
  display: flex;
  width: 90%;
  margin: 0 auto;


  .left-labels {
    align-self: center;
    width: 50%;
    margin-left: 60px;
    font-family: var(--base-font);
    display: flex;
    flex-direction: column;

    .authors {
      margin-top: 50px;
      display: flex;

      .author-circle {
        width: 55px;
        height: 55px;
        background: white;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        p {
          font-size: 15px;
        }

        img {
          width: 54px;
          height: 54px;
          border-radius: 100px;
        }
      }


      h4 {
        margin-left: 50px;
        width: 200px;
        text-align: left;
      }
    }

    .button-wrapper {
      margin-top: 40px;
      width: 70%;
    }

    h2 {
      font-size: 46px;
      text-align: left;
    }

    p {
      text-align: left;
      font-size: 20px;
    }
  }

  .right-image {
    align-self: center;
    height: 50vh;

    img {
      height: 100%;
    }
  }

}

.how-it-works {
  background: white;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .steps {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;

    .step-item {
      position: relative;
      margin-top: 50px;
      border-radius: 15px;
      box-shadow: 0 0 40px 5px rgba(0, 0, 0, 0.2);
      height: auto;
      width: 1000px;
      display: flex;
      justify-content: space-between;

      .image {
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;

        img {
          border-radius: 15px;

        }
      }

      .description {
        margin-top: 15px;
        padding-left: 20px;
        padding-bottom: 10px;

        .text {
          height: calc(100% - 70px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 90%;
        }

        p {
          font-size: 16px;
          color: black;
          margin-top: 10px;
          text-align: left;
          font-family: var(--base-font);
        }

        h3 {
          font-size: 36px;
          color: #000000;
          margin-bottom: 15px;
        }

        .red-circle {
          color: white;
          display: inline-block;
          border-radius: 100px;
          width: 43px;
          height: 42px;
          background: #FF431A;
        }
      }
    }
  }


  h1 {
    padding-top: 100px;
    font-size: 45px;
    margin-bottom: 15px;

    #orange-label {
      display: inline-block;
    }
  }

}

.advantages {
  margin: 0 auto;
  width: 80%;
}

.advantages {

  height: auto;

  .items {
    margin: 50px auto 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    grid-gap: 33px;
    padding-bottom: 100px;

    .item {
      background: white;
      border-radius: 10px;
      width: 250px;
      height: 230px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 15px;
      transition: 0.5s all ease-out;
      box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-10px);
      }

      .image {
        display: flex;
        align-items: center;
        height: 130px;
      }

      .description {
        font-family: var(--base-font);
        font-size: 16px;
        margin-top: 20px;
      }
    }

  }

  h1 {
    padding-top: 100px;
    font-size: 45px;
    margin-bottom: 15px;

    #orange-label {
      display: inline-block;
    }
  }

}

.best-authors {
  background: white;

  .gallery {
    width: 80%;
    margin: 50px auto 0 auto;

    .item {
      margin-top: 20px;
      margin-left: 20px;
      font-family: var(--base-font);
      min-width: 290px;
      display: flex;
      flex-direction: column;
      margin-right: 100px;
      padding-bottom: 20px;
      border-radius: 10px;
      transition: 0.2s all ease-out;

      &:hover {
        box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.1);
      }

      .name {
        h2 {
          font-size: 20px;
        }
      }

      .image {
        img {
          border-radius: 100px;
        }

        margin: 10px 0 10px 0;
      }

      .subscribers {
        margin-top: 10px;
      }

      .sells {
        margin-top: 10px;
      }

      .link {
        margin-top: 15px;

        a {
          cursor: pointer;
          color: #FF431A;
          text-decoration: underline;
        }
      }

    }

  }

  h1 {
    padding-top: 100px;
    font-size: 45px;
    margin-bottom: 15px;

    #orange-label {
      display: inline-block;
    }
  }

}

.calculator {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: var(--base-font);
  padding-bottom: 100px;

  .white-block {
    border-radius: 15px;
    margin-top: 50px;
    height: 200px;
    width: 80%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 50px;

    .head {
      width: 90%;
      margin-top: 50px;
      text-align: left;
      font-size: 24px;
      font-weight: 700;
    }

    .body {

      width: 90%;

      .contact {
        margin-top: 20px;
        display: block;
        text-align: left;
      }

      .social {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        .social-link {
          cursor: pointer;
          padding: 5px 10px 5px 10px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          transition: 0.2s all ease-out;
          text-decoration: none;
          color: blue;

          &:hover {
            box-shadow: 0 0 40px 5px rgba(0, 0, 0, 0.2);
          }

          img {
            margin-right: 20px;
          }
        }
      }

      .orange {
        color: #FF431A;
        display: inline-block;
      }
    }
  }

  .content-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 400px;
  }

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 20%;


    h3 {
      display: flex;
      align-items: center;
    }

    h2 {
      display: inline-block;
      font-size: 40px;
      color: black;
    }

    input {
      margin-top: 20px;
      border-radius: 10px;
      border: none;
      background: white;
      height: 40px;
      width: 320px;
      font-size: 20px;
      text-indent: 30px;
    }
  }

  .right-side {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-right: 20%;

    .content-block {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    p {
      display: flex;
      align-items: center;
    }

    h2 {
      display: inline-block;
      font-size: 40px;
      color: black;
    }
  }
}

@media screen and (max-width: 1470px) {
  .how-it-works .steps .step-item {
    width: 90%;
  }

  .best-authors .gallery .item {
    margin-left: 50px;
    margin-right: 135px;
    min-width: 250px;
  }

  .advantages .items .item .description {
    font-size: 15px;
  }

  .first-block .left-labels {
    margin-top: 135px;
  }

  .how-it-works {
    margin-top: 70px;
  }
}

@media screen and (max-width: 1280px) {
  .first-block .left-labels h2 {
    font-size: 35px;
  }

  .first-block {
    height: 85vh;
  }

  .first-block .left-labels .button-wrapper {
    width: 100%;
  }

  .calculator .right-side {
    margin-right: 0;
  }

  .calculator .left-side {
    margin-left: 0;
  }

  .calculator .white-block {
    padding-left: 25px;
    width: 90%;
  }

  .calculator {
    width: 90%;
    margin: 0 auto;
  }

  .calculator .white-block .head {
    margin-top: 25px;
  }
}

@media screen and (max-width: 1130px) {
  .calculator .right-side h2 {
    font-size: 35px;
  }

  .calculator .left-side h2 {
    font-size: 35px;
  }

  .how-it-works .steps .step-item .image img {
    width: 100%;
  }

  .how-it-works .steps .step-item .description p {
    line-height: 25px;
    margin-top: 0;
  }

  .how-it-works .steps .step-item .description h3 {
    font-size: 30px;
  }

  .how-it-works .steps .step-item .description .red-circle {
    width: 35px;
    height: 35px;
  }

  .first-block .right-image img {
    width: 80%;
  }

  .first-block .left-labels h2 {
    font-size: 30px;
  }
}

@media screen and (max-width: 990px) {
  .calculator .right-side h2 {
    font-size: 30px;
  }

  .calculator .left-side h2 {
    font-size: 30px;
  }

  .calculator .white-block .head {
    font-size: 20px;
  }

  .first-block .right-image {
    display: none;
  }

  .first-block {
    width: 100%;
    justify-content: center;
  }

  .first-block .left-labels {
    width: 100%;
    margin-left: 30px;
  }
}

@media screen and (max-width: 890px) {
  .calculator .right-side h2 {
    font-size: 25px;
  }

  .calculator .left-side h2 {
    font-size: 25px;
  }
}

@media screen and (max-width: 769px) {
  .best-authors .gallery .item {
    min-width: 600px;
  }

  .calculator {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .calculator .content-block {
    height: 100%;
  }

  .calculator .white-block {
    margin-top: 25px;
    height: 150px;
  }

  .calculator .left-side {
    width: 100%;
  }

  .calculator .right-side {
    width: 100%;
  }

  .steps__img {
    display: none;
  }

  .advantages .items {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .advantages .items .item {
    width: 90%;
    height: auto;
  }

  .how-it-works .steps .step-item {
    flex-direction: column;
    height: 100%;
    padding: 2%;
  }

  .how-it-works h1 {
    padding-top: 0;
    font-size: 40px;
  }

  .how-it-works .steps .step-item .image {
    justify-content: center;
    margin-bottom: 5px;
    margin-top: 10px;
    order: 2;
  }

  .how-it-works .steps .step-item .description p {
    text-align: left;
    font-size: 18px;
  }

  .how-it-works {
    width: 100%;
  }

  .advantages h1 {
    padding-top: 0;
  }

  .first-block {
    text-align: center;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    margin: 0 auto;
    width: 80%;
  }

  .first-block .left-labels {
    width: 100%;
    margin-left: 0;
    height: auto;
  }

  .first-block .left-labels h2 {
    text-align: center;
  }

  .first-block .left-labels p {
    text-align: center;
  }

  .first-block .left-labels .authors {
    justify-content: center;
  }
}

@media screen and (max-width: 590px) {
  .best-authors .gallery .item {
    min-width: 450px;
  }
}

@media screen and (max-width: 490px) {
  .calculator .white-block {
    height: 200px;
  }

  .calculator .content-block > p {
    text-align: left;
  }

  .first-block .left-labels {
    margin-top: 80px;
  }

  .how-it-works .steps .step-item .description p {
    font-size: 16px;
  }

  .how-it-works h1 {
    font-size: 30px;
  }

  .advantages h1 {
    font-size: 40px;
  }

  .best-authors .gallery .item {
    min-width: 330px;
  }

  .first-block {
    height: auto;
  }

  .first-block .left-labels .button-wrapper {
    padding-bottom: 50px;
  }

  .calculator .left-side input {
    width: 100%;
  }

  .calculator .white-block .body .social {
    flex-direction: column;
  }
}

@media screen and (max-width: 390px) {
  .calculator .white-block .head {
    font-size: 16px;
  }

  .advantages h1 {
    font-size: 30px;
  }

  .best-authors .gallery .item {
    min-width: 290px;
  }
}

@media screen and (max-width: 390px) {
  .best-authors .gallery .item {
    min-width: 250px;
  }
}
</style>