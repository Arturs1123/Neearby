<template>
  <div class="profile-icon" @click="buttonClicked">

      <img :src="profilePicturePath" v-if="!profilePictureMiniature" alt="" style="border-radius: 100px">
      <preview
        v-if="profilePictureMiniature"
        class="small"
        :width="60"
        :height="60"
        :image="profilePictureMiniature.image"
        :coordinates="profilePictureMiniature.coordinates"
    />
      <DropDown :list="dropdown" v-if="showDropdown" top="80" left="-120"/>
    <img src="../assets/down-arrow.svg" alt="" v-if="dropdown.length" style="padding-left: 10px; width: 14px;">
  </div>
</template>

<script>

import DropDown from "@/components/DropDown";
import { Preview, PreviewResult } from 'vue-advanced-cropper';
export default {
  name: "ProfileIcon",
  props: {
    profilePicturePath: {
      default: ''
    },
    profilePictureMiniature: {
      default: ''
    },
    dropdown: {
      default: []
    }
  },
  components: {
    DropDown,
    Preview, PreviewResult
  },
  data: function () {
    return {
      showDropdown: false
    }
  },
  methods: {
    buttonClicked: function (event) {
      if (typeof this.dropdown === 'object') {
        this.showDropdown = !this.showDropdown;
      }
    }
  }
}

</script>

<style lang="scss">

.profile-icon {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;


  img {
    height: 60px;
    width: 60px;
  }
}
.small {
  margin-top: 25px;
  width: 50px;
  position: absolute;
  bottom: 17%;
  right: 20%;
  border-radius: 50%;
}

</style>