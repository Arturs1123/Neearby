<template>
    <div class="fail_mod">
        <div class="title">
            <img src="../assets/cross.png" alt="">
            Вы не прошли модерацию Вашего поста. Пожалуйста, отредактируйте Ваш пост.<br>
            Название поста, Описание поста, Медиафайлы поста.
        </div>
        <div class="sup">
            Комментарий от модератора: В названии поста нельзя указывать нецензурную лексику. В описании поста
            нельзя обещать бешенные проценты ничего не делая. А медиафайлы Вашего поста не должны нарушать<br>
            авторские права.
        </div>
        <div class="sup_title">
            С уважением, команда Neearby.<br>
            Neearby - всегда рядом.
        </div>
    </div>
</template>

<script>
export default {
    name: 'FailModerationWarning'
}
</script>

<style scoped lang="scss">
.fail_mod {
    width: 100%;
    margin-bottom: 1rem;
    height: 224px;
    background: #FFF500;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 17px;
    text-align: left;

    .title {
        display: flex;
        gap: 25px;
        align-items: flex-start;
        font-size: 18px;
        font-weight: 500;
        color: #000;
        margin-bottom: 1rem;

        img {
            width: 35px;
            height: 35px;
        }
    }

    .sup {
        font-size: 16px;
        color: #7A7777;
        font-weight: 400;
    }

    .sup_title{
        font-size: 16px;
        font-weight: 400;
        margin-top: 1.5rem;
    }
}
</style>

