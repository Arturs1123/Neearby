<template>
    <div class="modal_window">
        <div class="modal_window_i">
            <div class="mw_up">
                <span>Удаление товара</span>
                <img class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
            </div>
            <span>Ваш товар был успешно удалён.</span>
            <div class="mw_down">
                <div class="btn_y">ОК</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Sub35",
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
        width: 565px;
        height: 190px;
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

    .btn_no {
        font-size: 16px;
        font-weight: 500;
        margin-right: 1rem;
        cursor: pointer;
    }

    .btn_y {
        width: 50px;
        height: 30px;
        background: #FE6637;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}

.close_btn {
    cursor: pointer;
}
</style>