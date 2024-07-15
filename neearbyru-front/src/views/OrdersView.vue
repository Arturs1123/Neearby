<template>
  <div>
    <Header/>
    <div class="orders-body">
      <div class="sidebar">
        <SidebarMenu/>
      </div>
      <div class="full-width">
        <div class="orders-separator">
          <div class="title">
            <img src="../assets/orders-logo.svg" alt="">
            <h4>Заказы</h4>
          </div>
          <div class="balances">
            <div class="my-balance">
              Мой баланс
              <div class="custom-balance">{{ getAuthorizedProfile.balance }}</div>
            </div>
            /
            <div class="withdrawn-balance">
              Выведено
              <div class="custom-balance">{{ getAuthorizedProfile.balance }}</div>
            </div>
          </div>
          <div class="period-select" @click="showDropdown = !showDropdown">
            <div class="logo">
              <img src="../assets/clock.svg" alt="">
            </div>
            <div class="label">
              <p style="margin-bottom: 0">Показывать заказы за</p>
              <p style="font-weight: 600; margin-bottom: 0">{{ periodLabels[selectedPeriod] }}</p>
            </div>
            <div class="dropdown">
              <DropDown :list="periods" v-if="showDropdown" left="-250" top="45" width="250px"
                        style="box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);"/>
              <img src="../assets/down-arrow.svg" alt="" v-if="periods.length" style="padding-left: 5px">
            </div>
          </div>
        </div>
        <div class="plates">
          <div class="plate-item all">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.all?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p>ВСЕГО</p>
              <div class="boxed-amount" style="background: #FE6637">
                {{ orders.all?.ordersAmount || 0 }}
              </div>
            </div>
          </div>

          <div class="plate-item payed">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.payed?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p>ОПЛАЧЕНО</p>
              <div class="boxed-amount" style="background: #6BC432">
                {{ orders.payed?.ordersAmount || 0 }}
              </div>
            </div>
          </div>

          <div class="plate-item notpayed">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p>НЕ ОПЛАЧЕНО</p>
              <div class="boxed-amount" style="background: #0500FF">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
          <div class="plate-item failed">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p style="color: #c81bff">ОТМЕНЕНО</p>
              <div class="boxed-amount" style="background: rgb(143 14 114)">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
          <div class="plate-item back">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p style="color: #fc0000">ВОЗВРАТ</p>
              <div class="boxed-amount" style="background: #fc0000">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
          <div class="plate-item chast">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p style="color: rgb(255 237 0)">ЧАСТИЧНО</p>
              <div class="boxed-amount" style="background: rgb(255 237 0)">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
          <div class="plate-item royal">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p style="#ff00ae">РОЯЛИТИ</p>
              <div class="boxed-amount" style="background: #ff00ae">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
          <div class="plate-item author">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p>СОАВТОРСКИЕ</p>
              <div class="boxed-amount" style="background: #6BC432">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
          <div class="plate-item partner">
            <div class="value">
              <p style="text-align: left; color: black;">{{ orders.waiting?.value || 0 }} руб.</p>
            </div>
            <hr>
            <div class="orders-amount">
              <p>ПАРТНЕРСКИЕ</p>
              <div class="boxed-amount" style="background: #0dfff5">
                {{ orders.waiting?.ordersAmount || 0 }}
              </div>
            </div>
          </div>
        </div>
        <div class="order-history">
          <div class="order-history-item" style="height: 40px; min-height: 0">
            <div class="first-row" style="height: 40px; min-height: 0">
            <p>Номер заказа</p>
            <p>Товар / подписка</p>
            <p>Сумма</p>
            <p>Создан</p>
            <p>Оплачено</p>
            <p>Статус</p>
            <p>Устройство / метка</p>
            <p>Действия</p>
            </div>
          </div>
          <div class="order-history-item" v-for="order of orders.orders"
               :style="{background: (order.status === 3 ? '#E7FFD2' : '#E2ECF9')}">
            <div class="first-row" @click="getDetails(order)">
            <p>{{ order.id }}</p>

            <div class="logo">
              <img :src="order.imagePath">
            </div>

            <p>{{ order.price }} ₽</p>

            <p>{{ new Date(order.created_at).toLocaleDateString() }}
              {{ new Date(order.created_at).toLocaleTimeString() }}</p>

            <p>{{ order.status === 3 ? `Оплачено` : `Ожидает оплаты` }}</p>

            <div class="status">
              <div class="completed" v-if="order.status === 3">
                Выполнен
              </div>
              <div class="waiting" v-if="order.status !== 3">
                Ожидается оплата
              </div>

            </div>

            <p>-</p>

            <p>-</p>
            </div>

            <div class="details" v-if="order.showDetails">
              <div class="user">
                <div class="user-logo">
                  <img :src="order.client.profile_picture" alt="">
                </div>
                <div class="user-details">
                  <h2>{{order.client.name}}</h2>
                  <p></p>
                </div>
              </div>

              <div class="order-details">
                  <h4>{{order.order_type === 2 ? 'Подписка' : 'Товар'}}</h4>
                <div class="order-logo">
                  <img :src="order.imagePath">
                  <h3>{{order.targetTitle}}</h3>
                </div>
                <p>Ссылка на оплату: <a style="cursor: pointer; color: blue;" :href="order.payment_link">{{order.payment_link}}</a></p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/Sidebar/SidebarMenu.vue";
import Header from "@/components/Header.vue";
import DropDown from "@/components/DropDown.vue";
import {mapGetters} from "vuex";
import ApiWrapper from '../api'


export default {
  name: "Orders",
  components: {
    SidebarMenu,
    Header,
    DropDown
  },
  data: function () {
    return {
      showDropdown: false,
      withdrawnBalance: '',
      selectedPeriod: 'week',
      periodLabels: {
        day: 'Сегодня',
        yesterday: 'Вчера',
        week: 'Неделю',
        month: 'Месяц',
        previousMonth: 'Предыдущий месяц',
        all: 'Всё время',
      },
      periods: [
        {
          label: 'Сегодня',
          clickEvent: this.selectPeriod,
          key: 'day'
        },
        {
          label: 'Вчера',
          clickEvent: this.selectPeriod,
          key: 'yesterday'
        },
        {
          label: 'Неделю',
          clickEvent: this.selectPeriod,
          key: 'week'
        },
        {
          label: 'Месяц',
          clickEvent: this.selectPeriod,
          key: 'month'
        },
        {
          label: 'Предыдущий месяц',
          clickEvent: this.selectPeriod,
          key: 'previousMonth'
        },
        {
          label: 'Все время',
          clickEvent: this.selectPeriod,
          key: 'all'
        },
      ],
      orders: {}
    }
  },
  methods: {
    selectPeriod(period, key) {
      this.selectedPeriod = key;
      this.getOrders();
    },
    async getOrders() {
      await ApiWrapper.getOrders({period: this.selectedPeriod}).then(response => {
        this.orders = response.data;
      });

      for (let order of this.orders.orders) {

        if (order.order_type === ApiWrapper.OrderTypes.Product) {
          ApiWrapper.getProducts({productId: order.target_id}).then(response => {
            let product = response.data[0];

            order.imagePath = product.product_image_path;
            order.targetTitle = product.title;
          })
        }

        if (order.order_type === ApiWrapper.OrderTypes.Subscription) {
          ApiWrapper.searchSubscriptions({subscriptionId: order.target_id}).then(response => {
            let subscription = response.data[0];


            order.imagePath = subscription.subscription_image_path;
            order.targetTitle = subscription.title;

          })
        }

      }

    },
    async getDetails(order){
      ApiWrapper.getProfile({id: order.client_id}).then(response => {
        order.client = response.data;
      });

      order.showDetails = !order.showDetails;
    }
  },
  computed: mapGetters(['getAuthorizedProfile']),
  mounted() {
    this.getOrders();
  }
}

</script>

<style lang="scss">

.orders-body {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr 15fr 1fr;
  background-color: var(--secondary-color);

  .all {
    background: #FFDBBA;

    hr {
      border: 1px solid white;
    }
  }


  .full-width {
    margin-top: 105px;
    grid-auto-rows: max-content;

    .orders-separator {
      grid-column: 1 / 3;
      background: white;
      border-radius: 10px;
      display: grid;
      grid-template-columns: 1fr 4fr 2fr 1fr;

      .title {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 25px;

        font-size: 20px;
        font-weight: 600;
        font-family: var(--base-font);
      }

      .balances {
        display: flex;
        align-items: center;
        justify-content: center;

        .my-balance {
          display: flex;
          align-items: center;
          margin-right: 15px;

          .custom-balance {
            margin-left: 15px;
            background: #818C99;
            color: white;
            height: 30px;
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .withdrawn-balance {
          display: flex;
          align-items: center;
          margin-left: 15px;

          .custom-balance {
            margin-left: 15px;
            background: none;
            border: 1px solid #818C99;
            border-radius: 10px;
            height: 30px;
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      .period-select {

        display: flex;
        justify-content: space-around;
        align-items: center;

        cursor: pointer;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(0, 0, 0, 0.2);

        .dropdown {
          position: relative;
        }
      }
    }

    .plates {
      width: 100%;
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;

      .plate-item {
        font-family: var(--base-font);
        padding: 0 15px 0 15px;
        width: 270px;
        height: 150px;
        border-radius: 10px;
        border: 2px solid #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;

        hr {
          width: 100%;
          border-bottom: none;
        }

        .orders-amount {
          display: flex;
          justify-content: space-between;

          .boxed-amount {
            display: flex;
            width: 35px;
            height: 25px;
            align-items: center;
            border-radius: 5px;
            justify-content: center;
            padding: 0 10px 0 10px;
            color: white;
          }
        }
      }
    }

    .order-history {
      margin-top: 15px;
      height: 100vh;
      background: white;
      grid-column: 1 / 3;
      display: flex;
      flex-direction: column;

      .order-history-item {

        border-top: 1px solid rgba(129, 140, 153, 0.5);

        .first-row{
          height: auto;
          min-height: 100px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            display: flex;
            justify-content: center;
            height: 90px;
          }

        }

        .status {
          display: flex;
          align-items: center;
          justify-content: center;

          .completed{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            background: #6BC432;
            width: 70%;
            color: white;
            border-radius: 5px;
          }

          .waiting{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            background: #D9082E;
            width: 70%;
            color: white;
            border-radius: 5px;

          }

        }

        p {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .details{
          background: white;
          height: 200px;
          grid-column: 1 / 8;

          display: grid;
          grid-template-columns: 2fr 1fr;

          .user{
            display: flex;
            height: 100%;
            width: 60%;
            justify-content: space-around;

            .user-logo{
              display: flex;
              align-items: center;
              margin-left: 15px;

              img{
                height: 160px;
                border-radius: 100px;
              }
            }

            .user-details{
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }

          .order-details{
            display: flex;
            flex-direction: column;
            justify-content: center;

            .order-logo {
              margin-top: 15px;
              height: 100px;
              display: flex;
              h3{
                margin-left: 50px;
              }
              align-items: center;


              img{
                height: 90%;
              }
            }
          }
        }
      }
    }

  }

  .payed {
    background: #E7FFD2;
    color: #6BC432;

    hr {
      border: 1px solid white;
    }
  }

  .notpayed {
    background: #E2ECF9;
    color: #0500FF;

    hr {
      border: 1px solid white;
    }
  }
  .failed {
    background: #e9b0fb;
    color: #2c3e50;

    hr {
      border: 1px solid white;
    }
  }
  .back {
    background: #fdb2b2;
    color: #2c3e50;

    hr {
      border: 1px solid white;
    }
  }
  .chast {
    background: #d5ff85;
    color: #2c3e50;

    hr {
      border: 1px solid white;
    }
  }
  .royal {
    background: #e9b0fb;
    color: #2c3e50;

    hr {
      border: 1px solid white;
    }
  }
  .author {
    background: #E7FFD2;
    color: #6BC432;

    hr {
      border: 1px solid white;
    }
  }
  .partner {
    background: #9cfffb;
    color: #01948e;

    hr {
      border: 1px solid white;
    }
  }
}
@media screen and (max-width: 769px) {
  .orders-body .full-width .plates {
    flex-direction: column;
    align-items: center;
  }
  .orders-body .full-width .orders-separator {
    display: flex;
    flex-direction: column;
  }
  .orders-body .full-width .orders-separator .period-select {
    justify-content: center;
    margin-top: 20px;
  }
  .orders-body .full-width .orders-separator .title {
    justify-content: center;
  }
  .orders-body .full-width .orders-separator .title > h4 {
    margin-left: 10px;
  }
  .label {
    margin-left: 15px;
    padding-bottom: 10px;
  }
  .orders-body {
    grid-template-columns: 1fr 1fr 15fr 1fr;
  }
}

</style>