<template>
    <div class="Modalcont">
        <div class="Report">
            <div class="mw_up">
                <span>Пожаловаться</span>
                <img class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
            </div>
            <div class="pofile_sec">
                <img src="../../assets/main_img.svg" alt="">
                <div class="pofile_info">
                    <div class="profile_name">
                        Алекс Жаркий
                        <img src="../../assets/verific.svg" />
                    </div>
                    <span>Профиль</span>
                </div>
            </div>
            <div class="title">Что вам кажется недопустимым на странице Алекса?</div>
            <div class="lines_reports">
                <div class="line">
                    Спам
                    <img src="../../assets/arr_r.svg" alt="">
                </div>
                <div class="line">
                    Мошенничество
                    <img src="../../assets/arr_r.svg" alt="">
                </div>
                <div class="line">
                    Оскорбления
                    <img src="../../assets/arr_r.svg" alt="">
                </div>
                <div class="line">
                    Откровенное изображение
                    <img src="../../assets/arr_r.svg" alt="">
                </div>
                <div class="line">
                    Проблема с профилем
                    <img src="../../assets/arr_r.svg" alt="">
                </div>
            </div>
            <div class="more">Узнайте больше о правилах Neearby</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Report'
}
</script>

<style scoped lang="scss">
.Modalcont {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10000;

    .Report {
        width: 500px;
        height: 551px;
        background: #FFFFFF;
        border-radius: 15px;
        overflow: hidden;
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

}

.pofile_sec {
    width: 450px;
    height: 103px;
    border: 2px solid #EDEEF0;
    border-radius: 15px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
}

.pofile_info {
    text-align: left;

    span {
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
    }
}

.profile_name {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 18px;
    font-weight: 600;

    img {
        height: 22px;
        width: 22px;
    }


}

.title {
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin-top: 20px;
}

.lines_reports {
    margin-top: 20px;

    .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 5px;
        background-color: white;
        border-bottom: 1px solid #E0E0E0;
        height: 50px;
        cursor: pointer;
        transition: all .4s;
    }

    .line:hover {
        background-color: #E0E0E0;
    }
}

.more {
    font-weight: 400;
    font-size: 14px;
    color: #2A5885;
    text-align: left;
    margin-top: 20px;
    padding-left: 30px;
}

@media screen and (max-width: 500px) {
  .txt_area {
    width: 90%;
  }
  .pofile_sec {
    width: 95%;
    justify-content: space-around;
  }
}
</style>