<template>
    <div class="ta_content">
<!--        <div class="ta_i" >-->
<!--            <div class="">Привет</div>-->
<!--            <div class="">Тут фото. Смотри...</div>-->
<!--            <div class="content__photo">-->
<!--                <img style="" src="../assets/ta_img1.svg" alt="">-->
<!--            </div>-->
<!--            <div class="">Тут видео. Смотри...</div>-->
<!--            <div class="content__photo">-->
<!--                <img src="../assets/ta_img2.svg" alt="">-->
<!--            </div>-->
<!--            <div class="">Тут аудио. Смотри...</div>-->
<!--            <div class="audio">-->
<!--                <img src="../assets/Проигрыватель.svg" alt="">-->
<!--                <span>Голосовая запись</span> - 1:32-->
<!--            </div>-->
<!--            <div class="">Тут файл. Смотри...</div>-->
<!--            <div class="file">-->
<!--                <img src="../assets/ta_file.svg" alt="">-->
<!--                <div class="f_i">-->
<!--                    <span>5 способов заработка</span>-->
<!--                    <div class="">12.9 МБ</div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="tac_new">-->
<!--            <img style="width: 100%;" src="../assets/photo_home_money_green.jpg" alt="">-->
<!--            <div style="margin-top: 1rem;"><strong>База + новые фишки на увеличение дохода на Neearby!</strong></div>-->
<!--            <div><span>Возьмите мои отработанные фишки, примените их и получайте увеличение дохода.</span></div>-->
<!--        </div>-->
<!--        <div class="for_sub" style="display: none;">-->
<!--            <div class="title">Жирные бонусы для моих подписчиков!</div>-->
<!--            <div class="sup">Данный пост доступен после покупки подписки не ниже уровня: <span>Денежный генератор-->
<!--                    Neearby!</span></div>-->
<!--            <div class="buy">-->
<!--                <div class="btn">Купить подписку за 999 руб.</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="for_sub">-->
<!--            <div class="title">5 урок. ДЕНЕЖНЫЙ ГЕНЕРАТОР NEEARBY</div>-->
<!--            <div class="sup">-->
<!--                Данный пост доступен после оплаты или покупки подписки не ниже уровня:-->
<!--                <span>Денежный генератор Neearby!</span>-->
<!--            </div>-->
<!--            <div class="buy two">-->
<!--                <div style="width: 270px;" class="btn">Купить этот пост за 149 руб.</div>-->
<!--                <div class="btn">Купить подписку за 999 руб.</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="for_sub ">-->
<!--            <div class="title">Только разовая оплата</div>-->
<!--            <div class="sup">-->
<!--                Данный пост доступен только после оплаты.-->
<!--            </div>-->
<!--            <div class="buy two">-->
<!--                <div style="width: 270px;" class="btn">Купить этот пост за 555 руб.</div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
export default {
    name: 'PostContent'
}
</script>

<style scoped lang="scss">
.ta_content {
    text-align: left;
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    color: black;
    font-size: 16px;
    font-weight: 400;

    div {
        margin-bottom: 1rem;
        width: 100%;
    }

    .audio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        color: black;

        span {
            color: #2A5885;
        }
    }

    .file {
        display: flex;
        gap: 10px;
        align-items: flex-start;

        div {
            margin-bottom: 0;
            font-size: 14px;
            color: #7A7777;
        }

        span {
            color: #2A5885;
            font-size: 16px;
        }
    }
}

.for_sub {
    .title {
        font-size: 18px;
        font-weight: 600;
        color: #000;
    }

    .sup {
        font-size: 16px;
        font-weight: 400;
        color: #FF0000;

        span {
            text-transform: uppercase;
        }
    }
    .buy.two{
        width: 100%;
        background-image: url(../assets/blur_w.jpg) !important;
    }

    .buy {
        background-image: url(../assets/blur_img.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 600px;
        height: 360px;

        .btn {
            width: 291px;
            height: 59px;
            background: #FE6637;
            border-radius: 10px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
@media screen and (max-width: 450px) {
  .content__photo > img {
    width: 100%;
  }
}
</style> 