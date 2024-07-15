<template>

  <div class="profile-cover">
    <img v-if="!mnt.coordinates" :src="imagePath" @mouseover="hovered" @mouseleave="hovered" id="ads" style="height: 250px">

    <preview
        v-if="mnt"
        class="big"
        :image="mnt.image"
        :coordinates="mnt.coordinates"
        :width="cssWidth"
        @mouseover="hovered"
        @mouseleave="hovered"
    />
    <div v-if="subscribersCount == null" class="buttons" v-bind:class="{animate: rollButton}" @mouseover="hovered">
      <div style="display: flex; flex-direction: column;">
        <button @click="showUploadModal"> Обновить обложку</button>
        <button @click="changeMiniature"> Область обложки</button>
        <button @click="deleteCover"> Удалить обложку</button>
      </div>
    </div>
  </div>


</template>


<script>

import { Preview, PreviewResult } from 'vue-advanced-cropper';
import {mapGetters, mapMutations} from "vuex";
import ApiWrapper from "../api";


export default {
  name: "ProfileCover",
  props: {
    imagePath: '',
    mnt: '',
    subscribersCount: '',
  },
  data: function () {
    return {
      rollButton: false
    }
  },

  components: {
    Preview, PreviewResult
  },
  computed: {
    ...mapGetters(["getAuthorizedProfile", "getCurrentProfile"]),
    cssHeight(){
      return document.getElementsByClassName('profile-cover')[0].style.height;
    },
    cssWidth(){
      return document.getElementsByClassName('profile-cover')[0].style.width;
    },

  },
  methods: {
    hovered: function (event) {

      if (this.getCurrentProfile.id || this.getAuthorizedProfile.userId) {
        if (event.type === 'mouseover') {
          this.rollButton = true;
        }
        if (event.type === 'mouseleave') {
          this.rollButton = false;
        }
      }
    },
    showUploadModal(){
      this.$emit('uploadModules')
    },

    deleteCover: function (){
      this.$emit('deleteCover')
    },
      changeMiniature() {
          this.$emit('changeCoverMiniature')
      },
  },
  async mounted() {
    this.profileLogin = this.profileLink;
    await ApiWrapper.getProfile({ login: this.profileLogin }).then(response => {

      // const $cookies = inject('$cookies')
      //
      // this.$cookies.config('180d', '', '', true)
      //
      // window.$cookies.get('token')

      console.log(11111)



      console.log(decodeURIComponent(document.cookie))



      let profile = response.data;
      this.reasonBanned = profile.reason_banned;
      this.coverImagePath = profile.cover_path;
      this.profileDescription = profile.description;
      this.followersCount = profile.followers_count;
      this.profileName = profile.name;
      this.subscribersCount = profile.subscribers_count;
      this.profilePicturePath = profile.profile_path;
      this.coverImagePathMiniature = profile.miniature.length > 0 ? JSON.parse(profile.miniature) : false;
      this.profilePictureMiniature = profile.profile_miniature.length > 0 ? JSON.parse(profile.profile_miniature) : false;
      this.salesCount = profile.sells_count;
      this.profileId = profile.id;
      console.log(432894247324729042042)
      console.log(profile)
      this.setCurrentProile(profile);
    });
  }
}

</script>

<style lang="scss">

@keyframes rollOut {
  0% {
    height: auto;
    opacity: 0;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 1;
    height: auto;
    display: flex;
    transform: translate(-50%, -120px);
  }
}
.big {
  height: 250px;
  border-radius: 10px;
}
.profile-cover {
  width: 100%;
  height: 250px;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .buttons {
    z-index: 15;
    display: flex;
    height: 0;
    flex-direction: column;
    position: absolute;
    bottom: -100px;
    left: 50%;
    opacity: 0;
    transform: translateX(-50%);

    button {
      cursor: pointer;
      width: 150px;
      height: 35px;
      background-color: white;
      border: none;
      border-radius: 10px;
      font-family: var(--base-font);
      font-size: 14px;
      margin-top: 10px;
    }

    &.animate {
      animation-name: rollOut;
      animation-duration: 0.5s;
      transform: translate(-50%, -120px);
      opacity: 1;
      height: auto;
    }
  }

}
@keyframes rollOut {
  0% {
    height: auto;
    opacity: 0;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 1;
    height: auto;
    display: flex;
    transform: translate(-50%, -120px);
  }
}
.big {
  height: 250px;
}
.profile-cover {
  width: 100%;
  height: 250px;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .buttons {
    display: none;
    z-index: 15;
    //display: flex;
    height: 0;
    flex-direction: column;
    position: absolute;
    bottom: -100px;
    left: 50%;
    opacity: 0;
    transform: translateX(-50%);

    button {
      cursor: pointer;
      width: 150px;
      height: 35px;
      background-color: white;
      border: none;
      border-radius: 10px;
      font-family: var(--base-font);
      font-size: 14px;
      margin-top: 10px;
    }

    &.animate {
      display: block;
      animation-name: rollOut;
      animation-duration: 0.5s;
      transform: translate(-50%, -120px);
      opacity: 1;
      height: auto;
    }
  }

}
@media screen and (max-width: 500px) {
  .profile-cover {
    height: auto;
  }
}
</style>