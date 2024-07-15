<template>
    <div class="modal_window">
        <div class="modal_window_i">
            <div class="mw_up">
                <span>Удаление товара</span>
                <img class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
            </div>
            <span>
                Данный товар удалить невозможно, так как по нему у Вас<br> уже были оплаты. Если Вы хотите снять данный
                товар с<br> продажи, поставьте запрет на его покупку в редактировании<br> товара.
            </span>
            <div class="btn_y">Отредактировать товар</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Product36",
    components: {
    },
    data() {
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
.modal_window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1120;
    transition: .3s all;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;

    .modal_window_i {
        width: 550px;
        height: 260px;
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span {
            font-size: 16px;
            margin-bottom: 1rem;
        }
    }
}

.mw_up {
    background-color: #FFDBBA;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    span {
        font-weight: 500 !important;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
    }
}

.mw_down {
    background-color: #FFDBBA;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2rem;
}

.btn_y {
    width: 250px;
    height: 40px;
    background: #FE6637;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 1rem;
}

.close_btn {
    cursor: pointer;
}
@media screen and (max-width: 500px) {
  .modal_window .modal_window_i span {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>