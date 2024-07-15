<template>
  <div  class="moderation-elements">
    <div style="width: 100%">
      <ProductModerationEl @changeCover="getModerationList"/>
    </div>
  </div>
</template>

<script>
import ApiWrapper from "@/api";
import ProductModerationEl from "@/components/ProductModerationEl";

export default {
  name: 'ProductModeration',
  components: {ProductModerationEl},
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
.title{
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  color: black;
}
.moderation-elements{
  display: flex;
}
</style>