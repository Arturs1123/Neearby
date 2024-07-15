<template>
  <div  class="moderation-elements">
    <div style="width: 100%">
      <SubModEl @changeCover="getModerationList"/>
    </div>
  </div>
</template>

<script>
import SubModEl from "@/components/SubModEl";
import ApiWrapper from "@/api";
export default {
  name: "SubscriptionModeration",
  components: {SubModEl},
  data(){
    return {
      moderationList: []
    }
  },
  methods: {

    getModerationList(){
      ApiWrapper.getModerationProducts()
          .then(res => {
            this.moderationList = res.data;
          })
    }
  },
  mounted() {
    this.getModerationList();
  }
}
</script>

<style scoped>

</style>