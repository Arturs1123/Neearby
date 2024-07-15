<template>
    <div v-if="step == 1" class="modal_window">
        <div class="modal_window_i">
            <div class="mw_up">
                <span>Подтверждение действия</span>
                <img @click="close" class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
            </div>
            <span>Вы действительно хотите отключить комментарии к<br> данной подписке?</span>
            <div class="mw_down">
                <div @click="close" class="btn_no">Нет</div>
                <div @click="updateSubscriptionComments(subscriptionObject.id), step = 2" class="btn_y">Да</div>
            </div>
        </div>
    </div>
    <div v-if="step == 2" class="modal_window">
      <div class="modal_window_i">
        <div class="mw_up">
          <span>Отключение комментариев</span>
          <img @click="closed" class="close_btn" src="../../assets/TwentyOffer/close.svg" alt="">
        </div>
        <span>Комментарии были успешно отключены.</span>
        <div class="mw_down">
          <div @click="closed" class="btn_y">ОК</div>
        </div>
      </div>
    </div>
  <VueFinalModal v-model="product38">
    <Product38 v-if="product38" @close="product38=false" :product="product" :profile="profile" />
  </VueFinalModal>
</template>
<script>
import ApiWrapper from "@/api";
import Product38 from "@/components/ModalsForProducts/Product38";

export default {
    name: "Sub37",
    props: {
      product: {
        default: {}
      },
      subscriptionObject: {},
      profile: {
        default: {}
      }
    },
    components: {
      Product38
    },
    data() {
      return {
        product38: false,
        product37: false,
        step: 1
      }
    },
    methods: {
      close(){
        this.$emit('close');
      },
      closed() {
        window.location.reload()
      },
      async updateSubscriptionComments(productId){
        await ApiWrapper.updateSubscriptionComments({id: productId, comment_resolution: 2}).then(() => {
        })
      },
    },
}
</script>
<style lang="scss" scoped>
.modal_window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1120;
    transition: .3s all;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;

    .modal_window_i {
        width: 565px;
        height: 190px;
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span {
            font-size: 16px;
        }
    }
}

.mw_up {
    background-color: #FFDBBA;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    span {
        font-weight: 500 !important;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
    }
}

.mw_down {
    background-color: #FFDBBA;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2rem;

    .btn_no {
        font-size: 16px;
        font-weight: 500;
        margin-right: 1rem;
        cursor: pointer;
    }

    .btn_y {
        width: 50px;
        height: 30px;
        background: #FE6637;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}

.close_btn{
    cursor: pointer;
}
</style>