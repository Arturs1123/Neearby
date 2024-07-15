<template>
  <div class="profile-short-info-wrapper">
    <div class="profile-short-info">
      <div class="profile-picture">

      <img v-if="!profilePictureMiniature.coordinates" :src="imagePath" @mouseover="hovered" @mouseleave="hovered" style="border-radius: 50%" id="profileImage">

        <preview
            v-if="profilePictureMiniature"
            class="big"
            :image="profilePictureMiniature.image"
            :coordinates="profilePictureMiniature.coordinates"
            :height="cssHeight"
            :width="cssWidth"
            style="border-radius: 50%"
            @mouseover="hovered"
            @mouseleave="hovered"
        />

        <div v-if="subscribersCount == null" class="buttons" :class="{animate: rollButton}" @mouseover="hovered">
          <div style="display: flex; flex-direction: column;">
            <button @click="updatePhoto">Обновить фотографию</button>
            <button @click="changeMiniature">Изменить миниатюру</button>
            <button @click="deletePhoto" >Удалить фотографию</button>
          </div>
        </div>
      </div>

      <div class="profile-description">
          <div class="profile-name" style="display: flex">
            <h3>{{this.getAuthorizedProfile.name}}</h3>
            <h3 style="position: relative;
    bottom: 7px;
    margin: 0 10px;">.</h3>
            <h3>Online</h3>
          </div>

          <div class="author-info">
            <p>Отслеживающих: <b style="font-size: 24px; font-weight: bold">{{followersAmount}}</b></p>
            <p>Подписчиков: <b style="font-size: 24px; font-weight: bold">{{subscribersAmount}}</b></p>
            <p>Продаж: <b style="font-size: 24px; font-weight: bold">0</b></p>
          </div>

        <div class="short-description">
          <p>{{shortDescription}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import { Preview, PreviewResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: "ProfileShortInfo",
  props: {
    imagePath: '',
    profilePictureMiniature:{},
    followersAmount: '',
    subscribersAmount: '',
    salesAmount: '',
    name: '',
    shortDescription: ''
  },
  components: { Preview, PreviewResult },
  data() {
    return {
      rollButton: false,
      path: this.imagePath
    }
  },
  computed: {
    ...mapGetters(["getAuthorizedProfile", "getCurrentProfile"]),
    cssHeight(){
      return document.getElementById('profileImage').height;
    },
    cssWidth(){
      return document.getElementById('profileImage').width;
    },
    getPath(){
      return this.path;
    }
  },
  methods: {
    hovered(event) {
      if (this.getCurrentProfile.id || this.getAuthorizedProfile.userId) {
        if (event.type === 'mouseover') {
          this.rollButton = true;
        }
        if (event.type === 'mouseleave') {
          this.rollButton = false;
        }
      }
    },
    updatePhoto() {
      this.$emit('update-photo')
    },
    deletePhoto() {
      this.$emit('delete_photo')
    },
    changeMiniature() {
      this.$emit('changeProfileMiniature')
    }
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

.profile-short-info-wrapper {
  width: 100%;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  margin-top: 10px;
}

.profile-short-info {
  display: grid;
  grid-template-columns: 1fr 4fr;
}

.profile-picture {
  grid-column: 1 / 2;
  grid-row: 0;
  display: flex;
  align-items: center;
  justify-content: center !important;
  height: 200px;
  margin-left: 20px;
  position: relative;

  img {
    height: 180px;
    width: 180px;
  }

  .buttons {
    z-index: 15;
    display: none;
    height: 0;
    flex-direction: column;
    position: absolute;
    bottom: -78px;
    left: 50%;
    opacity: 0;
    transform: translateX(-50%);

    button {
      cursor: pointer;
      width: 136px;
      height: 30px;
      background-color: white;
      border: none;
      border-radius: 10px;
      font-family: var(--base-font);
      font-size: 11px;
      margin-top: 9px;
      white-space: nowrap;
    }

    &.animate {
      display: block;
      animation-name: rollOut;
      animation-duration: 0.6s;
      transform: translate(-50%, -120px);
      opacity: 1;
      height: auto;
    }
  } 
}

.profile-description {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: var(--base-font);
  margin-left: 20px;

  .profile-name{
    margin-top: 36px;

    h3 {
      font-family: var(--base-font);
      font-size: 32px;
      margin: 0;
    }

  }
  .author-info{
    margin-top: 15px;
    p{
      display: inline;
      font-family: var(--base-font);
      margin-right: 20px;
    }

  }

  .short-description{
    margin-top: 30px;

    p {
      color: black;
    }
  }
}
</style>