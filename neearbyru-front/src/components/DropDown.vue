<template>

  <div class="dropdown-menu" v-bind:style="{top: top + `px`, left: left + `px`, width: width}">
    <div class="dropdown-item" v-for="element of list" @click="clicked(element.clickEvent, element.label, element.key)">
    <img 
      v-if="element.iconPath" 
      :src="element.iconPath" 
      :style="{'border-radius': element.iconRounded ? `100px` : 0}"
    > 
      <p :class="{font: changeFont}" >{{element.label}}</p>
    </div>
  </div>

</template>

<script>

export default {
  name: "Dropdown",
  props: {
    list: [],
    top: {
      default: 30
    },
    left: {
      default: 0
    },
    width: {
      default: 'max-content'
    },
    changeFont: {
      default: false
    }
  },
  methods: {
    clicked: function (event, label, key){
      event(label, key);
    }
  }
}

</script>

<style lang="scss">

.dropdown-menu{
  border-radius: 10px;
  position: absolute;
  z-index: 9999;
  background-color: white;
  top: 30px;
  right: 0;
  width: max-content;
  box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
  padding: 10px;

  p {
    width: auto;
    text-align: left;
    font-family: var(--base-font);
    font-size: 16px;
  }

  .font {
    font-size: 14px;
  }

  .dropdown-item {
    margin: 1px 0 1px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 33px;
    border-radius: 5px;
    border: 1px;

    img{
      padding-right: 7px;
      width: 21px;
      height: 21px;
      padding-left: 3%;
    }
  }

  .dropdown-item:hover {
    background-color: #E6E6E6;
  }
}

</style>