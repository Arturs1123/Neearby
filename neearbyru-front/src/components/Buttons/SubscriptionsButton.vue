<template>
  <a href="#" class="button-wrapper">
    <div class="button-content">
      <img src="../../assets/subscriptions.svg">
    </div>
    <div class="button-label">
      Подписки
    </div>
  </a>
</template>

<script>
export default {
  name: "SubscriptionsButton",
  props: {
    counter: 0,
  }
}

</script>


<style>
.button-wrapper {
  text-decoration: none;
}

.button-content {
  position: relative;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-content .counter {
  position: absolute;
  top: 0;
  right: 25px;
  width: 20px;
  border-radius: 10px;
  background-color: #FE6637;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter h5 {
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  color: white;
}

.button-label {
  padding-top: 0;
  color: var(--base-color);
  font-family: var(--base-font);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}
</style>