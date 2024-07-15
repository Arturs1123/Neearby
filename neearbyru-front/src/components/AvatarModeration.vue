<template>
<div class="title">Avatar Moderation</div>
<div  class="moderation-elements">
  <div v-for="i in moderationList">
  <AvatarModerationEl @changeCover="getAllModerationCover" :element="i" />
  </div>
  </div>
</template>


<script>
import AvatarModerationEl from "@/components/AvatarModerationEl";
import ApiWrapper from "@/api";
export default {
  name: "AvatarModeration",
  components: {AvatarModerationEl},
  data(){
    return {
        moderationList: [],
    }
  },
  methods: {//getModerationCover
    getAllModerationCover(){
      ApiWrapper.getModerationAvatar()
          .then(res => {
            this.moderationList = res.data;
          })
    }
  },
  mounted() {
    this.getAllModerationCover();
    setInterval(this.getAllModerationCover, 2000);
  }

}
</script>
<style scoped>
  .title{
    text-align: left;
    font-size: 25px;
    font-weight: bold;
    color: black;
  }
  .moderation-elements{
    display: flex;
    flex-wrap: wrap;
  }
</style>