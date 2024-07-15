<template>
  <div class="search-wrapper">
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

.search-wrapper {
  background-color: var(--secondary-color);
  width: 50%;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding-left: 20px;
  position: relative;

  input {
    background: transparent;
    border: none;
    outline: none;
    height: 100%;
    width: 95%;
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
@media screen and (max-width: 1450px) {
  .search-wrapper {
    width: 100%;
    position: relative;
    right: 15px;
  }
}
@media screen and (max-width: 450px) {
  .search-wrapper {
    width: 90%;
    position: relative;
    right: 0;
  }
}
</style>