<template>
  <a :href="link" class="sidebar-menu-item">

    <div class="item-icon">
      <img :src="iconPath">
    </div>

    <div class="item-label">
      <p>{{label}}</p>
    </div>

    <div class="item-counter" v-if="counter !== 0">
      <div class="circle">
        {{counter}}
      </div>
    </div>

  </a>
</template>

<script>

export default {
  name: 'MenuItem',
  props: {
    iconPath: '',
    link: '',
    label: '',
    counter: {
      type: Number,
      default: 0
    }
  }
}

</script>

<style>

.sidebar-menu-item{
  cursor: pointer;
  height: 35px;
  display: flex;
  width: 100%;
  text-decoration: none;
  color: black;
  font-family: var(--base-font);
  position: relative;
}

.circle{
  height: 22px;
  width: 22px;
  background: #818C99;
  border-radius: 100px;
  position: absolute;
  right: 20px;
  color: white;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-icon{
  width: 25px;
}

.item-label{
  padding-left: 15px;
}

.item-label p{
  display: inline;
}

</style>

