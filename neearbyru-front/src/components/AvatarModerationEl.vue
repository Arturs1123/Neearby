<template>
  <div class="moder-el">
  <img :src="element.img_path" @change="selectImg" alt="Тут должна быть фотография">
    <div class="btns">
      <button @click="acceptAvatar(element)" class="btn green">yes</button>
      <div class="block"></div>
      <button @click="cancelAvatar(element)" class="btn red">not</button>
    </div>
  </div>
</template>
<script>
import ApiWrapper from "@/api";
import {POSITION, TYPE, useToast} from "vue-toastification";

export default {
  name: "AvatarModerationEl",
  props:['element'],
  data() {
    return {
      img_path: '',
      imgPath: '',
      statusAccept: 1,
      statusCancel: 2,
      deleteId: []
    }
  },
  methods: {
    setImgUrl(url) {
      this.img_path = url;
    },

    selectImg() {
      const fileReader = new FileReader();
      let fnc = this.setImgUrl;
      let blob = new Blob(this.img_path, {type: 'image/jpg'});
      fileReader.readAsDataURL(blob);
      fileReader.onload = function () {
        fnc(this.result);
      };
      fileReader.addEventListener("load", function () {
        fnc(this.result);
      });
    },

    acceptAvatar(data){
      const formData = new FormData();
      formData.append("status",  this.statusAccept);
      ApiWrapper.acceptPicture()
          .then(() => {
            const toast = useToast();
            toast("Вы одобрили аватарку", {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS, timeout: 2000});
            this.$emit('changeCover');
          })
          .catch()
    },
    cancelAvatar(data){
      ApiWrapper.cancelPicture()
          .then(() => {
            const toast = useToast();
            toast("Вы отклонили аватарку", {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR, timeout: 2000});
            this.$emit('changeCover');
          })
          .catch()
    },
  }

}
</script>
<style scoped>
.moder-el{
  margin-left: 20px;
  margin-bottom: 10px;
  width: 300px;
}
img{
  width: 300px;
  height: 300px;
}
.btns{
  display: flex;
  width: 100%;
}
.btn{
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 10px;
}
.green{
  background: greenyellow;
}
.red{
  background: crimson;
}
.block{
  width: 20px;
}

</style>