<template>
    <table>
        <thead>
            <tr>
                <th style="width:10%"> Номер  </th>    
                <th style="width:50%"> 
                    <p style="padding-right:11%"> Состав заказа </p>  
                </th>
                <th style="width:13%"> Дата </th>
                <th> Сумма </th>
                <th style="padding-left: 1%; width: 22%;"> Статус </th>
            </tr>
        </thead>
        <tbody>
            <template  v-for="(order,index) in orders" :key="index">
                <tr :class="{'green': order.status == 1, 'red': order.status == 2}">
                    <td class="title"> {{ order.id }} </td>
                    <td>
                        <div class="order-list">
                            <img 
                                style="width: 14%" 
                                :src="order.order_image_path"
                            >
                            <p class="order-list-text"> {{order.order_title}} </p>
                        </div>
                    </td>
                    <td>
                        <p class="order-list-text"> 
                            {{ new Date(order.created_at).toLocaleDateString() }} {{ new Date(order.created_at).toLocaleTimeString() }} 
                        </p>
                    </td>
                    <td>
                        <p class="order-list-text"> {{order.price}} </p>
                    </td>
                    <td>
                        <div class="button-wrapper">
                            <div v-if="order.status == 1" class="success"> Успешно </div>
                            <div v-if="order.status == 2" class="failed"> Не проведена </div>
                        </div>
                    </td>
                </tr>
            </template> 
        </tbody>
    </table>
</template>

<script>
import ApiWrapper from "../api";

export default {
    data() {
        return {
            orderList: [
                {
                    id: 213911,
                    order_title: "СВЕРХМОНЕТИЗАЦИЯ+Права перепродажи",
                    order_image_path: "https://cdn.futura-sciences.com/sources/images/dossier/773/01-intro-773.jpg",
                    created_at: 16669180,
                    order_price: 1000,
                    status: 1
                },
                {
                    id: 182117,
                    order_title: "ЛЕКАРСТВО от бедности №1. Пакет Новичок",
                    order_image_path: "https://cdn.futura-sciences.com/sources/images/dossier/773/01-intro-773.jpg",
                    created_at: 16669180,
                    order_price: 1000,
                    status: 2
                },
            ],
            orders: []
        }
    },
    created() {
        this.getYourOrders()
    },
    methods: {
        getYourOrders() {
            ApiWrapper.getYourOrders({period: 'period'}).then(response => {
                this.orders = response.data.orders
            })
        }
    }
}
</script>



<style lang="scss" scoped >
.title {
  margin-left: 0.5rem;
  font-family: var(--base-font);
  font-size: 17px;
  font-weight: 600;
  color: #000000;
}

.order-list-text {
    color: #7A7777;
    font-weight: 400;
    font-size: 16px;
}
.button-wrapper {
    display: flex;
    justify-content: center;

    div {
        height: 2rem;
        align-items: center;
        display: flex;
        justify-content: center;
        border-radius: 6px;
        color: #FFFFFF;
        font-weight: 400;
        margin-left: 10%;
        width: 75%;
    }

    .success {
        background-color: #6BC432;
    } 

    .failed {
        background-color: #D9082E;
    }
}

table {
    border-spacing: 0;
    border:1px solid var(--secondary-color);
    width:100%;
    border-radius: 10px;
    overflow:hidden;

    th {
    background-color: #FFFFFF;
    height: 4rem;
    color: #000000;
    }
}

 .order-list {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        margin-right: 2%;
    }
}

tbody tr {
    height: 6rem;
}

.green {
    background-color: #E7FFD2;
}

.red {
    background-color: #FFE8E8;
}
</style>