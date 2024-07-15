<template>
  <div class="nav-button-wrapper" @click="buttonClicked">
    <button>{{label}}</button>
    <DropDown :list="dropdown" v-if="showDropdown"/>
    <img src="../../assets/down-arrow.svg" alt="" v-if="dropdown.length" style="padding-left: 5px">
  </div>
</template>

<script>

import DropDown from '@/components/DropDown';

export default {
  name: "HeaderButton",
  components: {
    DropDown
  },
  props: {
    label: "",
    clickEvent: function (){},
    dropdown: {
      default: ''
    },
    iconPath: {
      default: ''
    }
 },
  data: function (){
    return {
      showDropdown: false
    }
  },
  methods: {
    buttonClicked: function (event) {
      if(typeof this.dropdown === 'object'){
        this.showDropdown = !this.showDropdown;
      }


    }
  }
}
</script>

<style lang="scss">

.nav-button-wrapper{
  position: relative;
  display: flex;

  button{
    outline: none;
    border: none;
    background: none;
    font-family: var(--base-font);
    cursor: pointer;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
    padding: 0;
  }
}

</style>