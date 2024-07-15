<template>
  <div class="upload-cover-modal">
    <h2>Загрузка обложки</h2>
    <hr width="100%">
    <div class="upload-files">
      <input type="file" id="myFile" name="filename" v-on:change="checkFiles">
      <button @click="upload">Загрузить</button>
    </div>

  </div>
</template>

<script>

import TextInput from "@/components/TextInput";
import OrangeButton from "@/components/Buttons/OrangeButton";
import ApiWrapper from "../api";
const { $vfm } = require('vue-final-modal');
import { mapMutations } from "vuex";

export default {
  name: 'LoginModal',
  props: {},
  components: {
    TextInput,
    OrangeButton
  },
  data: function () {
    return {
      file: ''
    }
  },
  methods: {
    checkFiles: function (event){
      this.file = event.target.files[0];
    },
    upload: async function (){
      let [path] = (await ApiWrapper.uploadFile(this.file)).data;

      ApiWrapper.updateCover(path.filePath).then(() => {
        window.location.reload();
      });
    }
  }
}

</script>

<style lang="scss">
@import "./src/css/reset.scss";


.upload-cover-modal{

  position: fixed;
  width: 40%;
  height: 40vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;

  hr{
    padding: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-color: rgba(0,0,0,0.2)
  }
  h2{
    margin: 10px 0 10px 0;
    font-family: var(--base-font);
  }
}


</style>