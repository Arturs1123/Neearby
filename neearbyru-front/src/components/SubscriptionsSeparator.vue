<template>
  <div class="subscriptions-separator">
      <h3>Уровни подписки <p class="h3__p">{{subscriptionsAmount}}</p></h3>
<!--    <h3>Уровни подписки <p class="h3__p">0</p></h3>-->
  </div>
</template>

<script>

export default {
  name: 'SubscriptionsSeparator',
  props: {
    subscriptionsAmount: 0,

  }
}
</script>

<style lang="scss">
.h3__p {
  display: inline-block;
  color: rgba(0,0,0,.6);
  padding-left: 20px;
  font-size: 19px;
}

.subscriptions-separator{

  h3{
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  margin-top: 10px;
  border-radius: 10px;
  width: 100%;
  padding-top: 0;
  height: 45px;
  background-color: white;

  font-family: var(--base-font);
  font-size: 20px;

  p{

  }
}
</style>