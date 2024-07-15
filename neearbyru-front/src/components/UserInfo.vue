<template>
    <div class="container-body">
        <div class="user-info-wrapper">
            <img src="../assets/your-orders-view/lion.svg">
            <p class="title"> Яковлев Михаил Геннадьевич </p>
            <p class="info"> ID: 9126 </p>
            <p class="info"> tehnoidei@list.ru </p>
            <p class="info"> +79113841683 </p>
        </div>
       <div class="gray-line"></div>

       <div class="menu-wrapper">
            <div class="user-menu">
                <img src="../assets/your-orders-view/balance-history.svg">
                <p>История баланса</p>
            </div>
            <div class="user-menu active">
                <img src="../assets/your-orders-view/orders.svg">
                <p>Ваши заказы</p>
            </div>
            <div class="user-menu">
                <img src="../assets/your-orders-view/affiliate.svg">
                <p>Партнёрская программа</p>
            </div>
       </div>   
    </div>
</template>

<style lang="scss" scoped>

.gray-line {
    height: 2px;
    background-color: var(--secondary-color);
    margin: 1% 2% 1% 2%;
}

.title {
    margin-left: 0.5rem;
    font-family: var(--base-font);
    font-size: 17px;
    font-weight: 600;
    color: #000000;
}
.container-body {
    background-color: white;
    border-radius: 10px;
    width: 93%;
    height:min-content;
    flex-direction: column;
    margin-top: 15px;
    padding: 2%;

    .user-info-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3%;

        img {
            width: 26%;
            margin-bottom: 6%;
        }

        .info {
            color: #7A7777;
            font-size: 14px;
            margin-top: 4%;
        }
    }

    .menu-wrapper {
        padding: 1%;

        .user-menu {
            margin-right: 2rem;
            width: 100%;
            height: 3.2rem;

            display: flex;
            align-items: center;
            background-color: white;
            color: #000000;
            cursor: pointer;

            img {
                margin-right: 5%;
                margin-left: 5%;
            }
        }

        .active {
            background-color: #FFDBBA;
            border-radius: 7px;
        }
    }
}
</style>
