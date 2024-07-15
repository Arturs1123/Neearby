<template>
  <div>
    <Header/>
    <div class="create-product-body">
      <div class="sidebar">
        <SidebarMenu style="width: 50%;"/>
      </div>
      <div class="product-container">
        <ProductAdd/>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import ProductAdd from "@/components/ProductAdd";

export default {
  components: {
    Header,
    SidebarMenu,
    ProductAdd,
  }
}
</script>


<style lang="scss" scoped>
.create-product-body {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2fr 4fr 18fr;
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
  margin-top: 100px;
}
@media screen and (max-width: 1500px) {
  body .create-product-body {
    grid-template-columns: 1.1fr 3.5fr 18fr;
  }
  body .product-container {
    width: 95%;
  }
}
@media screen and (max-width: 769px) {
  body .create-product-body {
    display: flex;
    flex-direction: column;
  }
  body .product-container {
    width: 100%;
  }
}

</style>
  