<template>
    <div class="nf">
        <div class="lion__img">
          <img src="../assets/lion_found.jpg" alt="">
        </div>
        <div class="lion__title">
          <div class="title">Ооопссс. Злой лев!</div>
          <div class="sup">
            Страница, к которой вы обращаетесь не найдена.<br>
            Советуем перейти на главную страницу сайта.
          </div>
          <a href="/" class="btn">Вернуться на главную</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped lang="scss">
.lion__img {
  width: 100%;
  height: 100%;
  position: absolute;
}
.lion__img > img{
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
.lion__title {
  position: relative;
  padding-top: 10%;
  padding-left: 10%;
}
.nf {
    box-sizing: border-box;
    text-align: left;
    width: 100%;

    .title {
        font-size: 42px;
        font-weight: 600;
        color: #000;
        margin-bottom: 3rem;
    }

    .sup {
        font-size: 24px;
        font-weight: 500;
        color: #000;
        margin-bottom: 7rem;
    }

    .btn {
        width: 327px;
        height: 67px;
        background: #FE6637;
        border-radius: 15px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        font-weight: 600;
        text-decoration: none;
    }
}
@media screen and (max-width: 769px) {
  .lion__img > img{
    height: 1000px;
  }
}
@media screen and (max-width: 500px) {
  .lion__img > img{
    width: auto;
    height: 100%;
  }
}
</style>