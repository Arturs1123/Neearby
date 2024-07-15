<template>
    <div class="modal_window">
        <div class="modal_window_i">
            <div class="mw_up">
                <span>Ссылка на видео YouTube или Vimeo</span>
                <img class="close_btn" src="../assets/TwentyOffer/close.svg" alt="">
            </div>
            <div class="input">
                <label for="">Ссылка</label>
                <div class="input_i">
                    <div class="name">YouTube/ Vimeo</div>
                    <div class="inp">
                        <input type="text" placeholder="Введите ссылку на видео...">
                    </div>
                </div>
            </div>
            <div class="mw_down">
                <div class="btn_y">Добавить видео</div>
                <div class="btn_no">Закрыть</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ModalVideo",
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
        height: 240px;
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
    gap: 1rem;

    .btn_no {
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }

    .btn_y {
        width: 149px;
        height: 29px;
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

.input {
    width: 491px;
    margin-right: auto;
    margin-left: auto;
    text-align: left;
    font-family: 'Inter', serif;
    .input_i{
        display: flex;
    }

    .name {
        width: 155px;
        height: 39px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #EDEEF0;
        border-width: 1px 0 1px 1px;
        border-style: solid;
        border-color: #A8ADB8;
        border-radius: 10px 0 0 10px;
        font-weight: 500;
    }

    .inp {
        width: 336px;
        height: 39px;
        border: 1px solid #A8ADB8;
        border-radius: 0 10px 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            border: 0;
            outline: 0;
            height: 90%;
            width: 98%;
            padding-left: 1rem;
            box-sizing: border-box;
        }
    }
}
</style>