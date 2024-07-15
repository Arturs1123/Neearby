<template>
  <div class="modal">

    <h2>Подписка</h2>
    <hr width="100%">
    <div class="subscription-content-create" v-if="type === 'create' || currentSubscription.author_id === getAuthorizedProfile.userId">
      <div class="subscription-left">
        <div class="inputs">
          <text-input placeholder="Название подписки" v-model="currentSubscription.title"></text-input>
          <text-input placeholder="Описание" height="100" v-model="currentSubscription.description"></text-input>
          <text-input placeholder="Стоимость" v-model="currentSubscription.price" v-money="money"></text-input>
        </div>
      </div>

      <div class="subscription-right">
          <img :src="currentSubscription.subscription_image_path" alt="">
      </div>

    </div>

    <div class="subscription-content-purchase"
         v-if="type !== 'create' && subscription?.author_id !== getAuthorizedProfile.userId">
      <p><b>Название:</b> {{ subscription?.title }}</p>
      <p><b>Описание:</b> {{ subscription?.description }}</p>
      <p><b>Стомость:</b> {{ subscription?.price }} ₽</p>
      <img :src="subscription?.subscription_image_path" alt="">
    </div>
  </div>
</template>

<script>

import TextInput from "@/components/TextInput";
import OrangeButton from "@/components/Buttons/OrangeButton";
import ApiWrapper from "../api";

const {$vfm} = require('vue-final-modal');
import {mapGetters, mapMutations} from "vuex";
import {POSITION, TYPE, useToast} from "vue-toastification";

export default {
  name: 'ProductModal',
  props: {
    subscription: {},
    type: {
      default: 'create'
    }
  },
  data: function () {
    return {
      currentSubscription: {},
      money: {
        decimal: ',',
        thousands: '',
        prefix: '',
        suffix: ' ₽',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  components: {
    TextInput,
    OrangeButton
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile'])
  },
  methods: {
    buyProduct: async function () {
      let order = await ApiWrapper.createOrder(2, this.subscription.id);
      const toast = useToast();
      toast("Перенаправление на страницу оплаты", {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS, timeout: 2000});
      setTimeout(() => {
        window.location.href = order.data.payUrl;
      }, 2000);

    },
    checkFiles: function (event) {
      this.file = event.target.files[0];
    },
    createProduct: async function () {

    },
    updateProduct: async function () {

      let filePath = null;
      if (this.file) {
        filePath = (await ApiWrapper.uploadFile(this.file)).data[0];
      }

      let subscriptionObject = {
        id: this.currentSubscription.id,
        title: this.currentSubscription.title,
        description: this.currentSubscription.description,
        price: this.currentSubscription.price.split(' ')[0],
        subscription_image_path: this.currentSubscription.subscription_image_path
      }

      ApiWrapper.updateSubscription({subscription: subscriptionObject}).then(response => {

      })

    }

  },
  mounted() {
    Object.assign(this.currentSubscription, this.subscription);
  }
}

</script>

<style lang="scss">

.modal {
  position: fixed;
  width: 40%;
  height: 55%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;


  .subscription-content-purchase {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    p {
      word-wrap: break-word;
      width: 100%;
      margin: 10px;
    }

    img {
      height: 50%;
    }

  }

  hr {
    padding: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-color: rgba(0, 0, 0, 0.2)
  }

  h2 {
    margin: 10px 0 10px 0;
    font-family: var(--base-font);
  }


  .subscription-content-create {
    padding-top: 10px;
    justify-self: center;
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;

    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80%;
      width: 90%;
    }

    .subscription-right {
      grid-column: 2 / 3;

      height: 80%;

      .upload-files {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
    }
  }
}


</style>