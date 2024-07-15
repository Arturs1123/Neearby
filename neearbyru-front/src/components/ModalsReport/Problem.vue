<template>
    <div class="Modalcont">
        <div class="Report">
            <div class="mw_up">
                <span style="display: flex;gap: 10px;align-items: center;cursor: pointer;">
                    <img src="../../assets/arr_l.svg" alt="">
                    Назад
                </span>
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
            <div class="title">Из-за чего вы хотите пожаловаться на профиль<br>Алекса?</div>
            <div class="sup">
                <div class="checks">
                    <div class="check "></div>
                    <div style="display: flex;flex-direction: column;">
                        Клон моего профиля
                        <span style="color: rgba(0, 0, 0, .6);">
                            Пользователь копирует ваши фото и информацию и<br>
                            пытается выдать себя за вас
                        </span>
                    </div>
                </div>
                <div class="checks">
                    <div class="check "></div>
                    <div style="display: flex;flex-direction: column;">
                        Мой старый профиль
                        <span style="color: rgba(0, 0, 0, .6);">
                            Аккаунт, к которому у вас больше нет доступа
                        </span>
                    </div>
                </div>
            </div>
            <div class="txt_for_area">
                Комментарий <span>( необязательно )</span>
            </div>
            <textarea class="txt_area" placeholder="Опишите причину жалобы..." />
            <div class="more">Узнайте больше о том, как Neearby борется с копиями<br>профилей</div>
            <div class="mw_down">
                <div class="btn_no">Отмена</div>
                <div class="btn_y">Отправить жалобу</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Spam'
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
        height: 600px;
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
    text-align: left;
    padding-left: 30px;
}


.more {
    font-weight: 400;
    font-size: 14px;
    color: #2A5885;
    text-align: left;
    margin-top: 25px;
    padding-left: 30px;
    margin-bottom: 15px;
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
        width: 170px;
        height: 35px;
        background: #FE6637;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}

.sup {
    font-size: 14px;
    color: #000;
    text-align: left;
    padding-left: 30px;
    margin-top: 15px;
}

.txt_for_area {
    text-align: left;
    color: #000;
    padding-left: 30px;
    margin-top: 25px;
    font-size: 14px;

    span {
        color: rgba(0, 0, 0, .6);
    }
}

.txt_area {
    width: 450px;
    height: 80px;
    border: 2px solid #EDEEF0;
    border-radius: 15px;
    resize: none;
    margin-top: 10px;
    font-family: inherit;
    outline: none;
    padding-left: 10px;
    padding-top: 10px;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
}

.txt_area::placeholder {
    color: rgba(0, 0, 0, .6);
}

.checks {
    display: flex;
    gap: 1rem;
    // align-items: center;
    margin-bottom: 10px;

    .check {
        width: 15px;
        height: 15px;
        border: 1px solid #818C99;
        border-radius: 15px;
    }
    .check.active{
        border: 0;
        background-color: #FE6637;
    }
}
@media screen and (max-width: 769px) {
  .Modalcont .Report {
    height: auto;
  }
  .txt_area {
    width: 90%;
  }
  .pofile_sec {
    width: 95%;
  }
}
</style>