<template>
  <div class="search-wrapper-subscriptions">
    <input ref="customInput" name="search" type="text" v-model="searchValue" placeholder=".">
    <label for="search" @click="$refs.customInput.focus()">Поиск</label>
    <a href="#">
      <img src="../assets/search-icon.svg">
    </a>
  </div>
</template>

<script>

export default {
  name: 'Search',
  props: {},
  data: function () {
    return {
      searchValue: ''
    }
  }
}

</script>

<style lang="scss">

.search-wrapper-subscriptions {
  margin-top: 15px;
  background-color: white;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: relative;

  input {
    background: transparent;
    border: none;
    outline: none;
    height: 100%;
    width: 95%;
    text-indent: 20px;
    font-family: var(--base-font);


    &::placeholder {
      color: var(--secondary-color);
    }

    &:focus + label, &:not(:placeholder-shown) + label {
      transform: translate(-10px, -22px) scale(100%);
      font-size: 14px;
    }
  }

  label {
    position: absolute;
    top: 5px;
    left: 20px;
    transition: all 0.2s ease-in;
    font-family: var(--base-font);
    font-size: 15px;
  }

  a{
    margin-right: 5%;
  }
}

</style>