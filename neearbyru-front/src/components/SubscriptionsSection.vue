<template>
  <div class="subscriptions-section-wrapper" v-for="subscription in subscriptions">
    <div class="subscriptions" v-if="subscriptions.length">
      <div style="margin-left: 0" class="subscriptions">
        <div class="fdsfs" style="width: 220px;">
          <SubscriptionPreview :subscription-object="subscription"/>
        </div>
      </div>
    </div>

    <div class="no-subscriptions" v-else>
      <h3 style="color: #2c3e50;">У Вас нет подписок!</h3>
      <p style="margin-top: 10px;">Зайдите в <a href="/catalogue" style="color: #FE6637">каталог подписок</a> и добавьте  подписки с правами-перепродажи </p>
    </div>
  </div>

</template>

<script>


import SubscriptionPreview from "@/components/SubscriptionPreview.vue";

export default {
  name: 'SubscriptionsSection',
  components: {
    SubscriptionPreview,
  },
  props: {
    subscriptions: {
      type: Array,
      default: []
    }
  },
}

</script>

<style lang="scss">


.subscriptions-section-wrapper {
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  height: auto;

  .subscriptions{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 0 5px 0;
  }

  .no-subscriptions{
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10% 0 10%;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 24px;
  }

}

</style>