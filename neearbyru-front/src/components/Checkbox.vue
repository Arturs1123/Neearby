<template>
    <div class="checkbox-input">
      <input 
        type="checkbox" 
        class="custom-checkbox" 
        :checked="checked" 
     >
        <label @click="change"></label>
    </div>
  </template>
  

  <script>
  export default {
    data(){
      return {
          checked: false
      }
    },
    methods: {
      change: function(event) {
          this.checked = !this.checked;
      }
    },
    mounted() {
      this.checked = this.status;
    }
  }
  </script>
  
  <style>
  .checkbox-input {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    grid-row: 1;
    margin: 0 auto 0 auto;
  }
  
  .custom-checkbox {
    /* position: absolute; */
    z-index: -1;
    opacity: 0;
  }
  
  .custom-checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  
  .custom-checkbox + label::before {
    content: '';
    display: inline-block;
    width: 2em;
    height: 2em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #000000;
    border-radius: 1.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  
  .custom-checkbox:checked + label::before {
    border-color: #FE6637;
    background-color: #FE6637;
    background-image: url("../assets/checkbox.svg");
  }
  </style>