<template>
    <div class="modal_window">
        <div class="modal_window_i">
            <div class="mw_up">
                <span>Удаление поста</span>
                <img class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
            </div>
            <div class="mw_inner">
                <div class="title">
                    Данный пост удалить невозможно, так как по нему у Вас уже<br> были оплаты. Если Вы хотите снять данный пост с продажи,<br> поставьте запрет на его покупку в редактировании поста.
                </div>
            </div>
            <div class="btn_y">Отредактировать пост</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Succes",
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
        height: 259px;
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span {
            font-size: 16px;
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
    width: 248px;
    height: 39px;
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

.mw_inner {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    // font-family: 'Inter', serif;

    .sup {
        font-size: 16px;
        color: #7A7777;
        text-align: left;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .title {
        margin-top: 1rem;
        margin-bottom: 2rem;
        font-size: 16px;
        color: black;
        font-weight: 500;
    }
    .sup_title{
        margin-top: 1rem;
        text-align: left;
    }
}

</style>