<template>
  <div class="button-wrapper">
    <button class="reg" :style="{'height': height + 'px'}" @click="clickEvent" v-bind:class="{inverted: inverted}">{{ buttonLabel }}</button>
  </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
    buttonLabel: '',
    clickEvent: function () {
    },
    inverted: false,
    height: {
      default: 44
    },
    fontSize: {
      default: 20
    }
  },
  data: function () {
    return {
      fontSizeCalculated: 20
    }
  },
  mounted() {
    if(this.height < 40) {
      this.fontSizeCalculated = 15;
    }
  }
}

</script>

<style lang="scss">
.thanks-for-registration-page .window .body .buttons button {
  font-size: 20px;
}
.reg {
      width: 180px;
    }
.button-wrapper {
  button {
    cursor: pointer;
    background-color: var(--orange);
    color: white;
    font-family: var(--base-font);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    padding-left: 15px;
    padding-right: 15px;
    border-radius: 10px;
    width: 100%;

    transition: 0.2s all;

    &:hover {
      background-color: #b24a2d;
      box-shadow: 2px 4px 10px 1px rgba(183, 61, 27, 0.5);
    }
  }

  .inverted {
    background-color: white;
    color: var(--orange);
    border: 1px solid var(--orange);
    width: 120px;
    &:hover {
      color: white
    }
  }
}
</style>