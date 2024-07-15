<template>
  <div>
    <Header/>
    <div class="create-product-body">
      <div class="sidebar">
        <SidebarMenu style="width: 50%;"/>
      </div>
      <div class="product-container">
        <ProductEdit :sproduct="product"/>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import ProductAdd from "@/components/ProductAdd";
import ProductEdit from "@/components/ProductEdit";
import ApiWrapper from "@/api";

export default {
    components: {
      ProductEdit,
        Header,
        SidebarMenu,
        ProductAdd,
    },
  data(){
      return {
        productId: 0,
        product: {
          id: '',
          product_image_path: '',
          title: '',
          description: '',
          price: '',
          discount_price: '',
          download_link: '',
          product_link: '',
        },
      }
  },

    mounted() {
      this.productId = location.href.split('/')[location.href.split('/').length - 1];
      ApiWrapper.getProductById({id: this.productId})
          .then(el => {
            this.product.id  = el.data[0].id;
            this.product.product_image_path  = el.data[0].product_image_path;
            this.product.title  = el.data[0].title;
            this.product.description  = el.data[0].description;
            this.product.price  = el.data[0].price;
            this.product.discount_price  = el.data[0].discount_price;
            this.product.download_link  = el.data[0].download_link;
            this.product.product_link  = el.data[0].product_link;
            this.product.active  = el.data[0].active;
            // this.product.product_type  = el.data[0].type;
            // this.product.discount_price  = el.data[0].discount_price;
          });
    }
}
</script>


<style lang="scss" scoped>
.create-product-body {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2fr 4fr 18fr  ;
  background-color: var(--secondary-color);

  .add-product{
    background-color: white;   // white
    border-radius: 10px;
    width: 100%;
    height: 3rem;
    flex-direction: column;
    grid-column: 3 / 4;
    margin-top: 15px;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
}
.product-container {
  width: 80%;
}
</style>
  