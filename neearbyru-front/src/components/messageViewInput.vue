<template>
  <div class="text-input">
    <textarea @input="changed" :value="modelValue" name="input" placeholder="." :style="{'height': height + 'px'}" v-if="height > 30"></textarea>
    <input ref="customInput" @input="changed" :value="modelValue" name="input" placeholder="." :type="type" :style="{'height': height}" v-if="height  <= 30">
    <label for="input" @click="$refs.customInput.focus()">{{placeholder}}</label>
  </div>
</template>

<script>
export default {
  name: 'messageViewInput',
  methods: {
    changed: function (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
  props: {
    placeholder: '',
    type: '',
    height: {
      default: 30
    },
    modelValue: String,
  }
}
</script>

<style lang="scss">
.text-input{
  position: relative;
  width: 100%;


  textarea{
    background: transparent;
    outline: none;
    height: 30px;
    width: 100%;
    text-indent: 4%;
    font-family: var(--base-font);
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 10px;
    resize: vertical;
    max-height: 200px;


    &::placeholder {
      color: var(--secondary-color);
    }

    &:focus + label, &:not(:placeholder-shown) + label {
      transform: translate(-10px, -22px) scale(100%);
      font-size: 14px;
    }
  }

  input {
    background: transparent;
    outline: none;
    height: 30px;
    width: 100%;
    text-indent: 4%;
    font-family: var(--base-font);
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 10px;
    border: none;


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
    text-align: left;
    transition: all 0.2s ease-in;
    font-family: var(--base-font);
    font-size: 15px;
  }
}
</style>