<template>
  <div>
    <Header/>
    <div class="container">
      <div class="sidebar">
        <SidebarMenu style="width: 50%;"/>
      </div>

      <div class="main">
        <div class="your-orders-wrapper">
          <div class="your-orders-header">
            <img src="../assets/your-orders-view/finance.svg">
            <p class="title"> Ваши заказы </p>
          </div>
          <div class="gray-line"></div>

          <div class="sort-blocks-wrapper">
              <button class="sort-block">
                <img src="../assets/your-orders-view/not-paid.svg">
                <p> Не оплачены </p> 
              </button>
              <button class="sort-block">
                <img src="../assets/your-orders-view/paid.svg">
                <p> Оплачены </p> 
              </button> 
              <button class="sort-block">
                <img src="../assets/your-orders-view/canсeled.svg">
                <p> Отменены </p> 
              </button>
          </div>
        </div>

        <div class="table-wrapper">
          <OrdersTable />
        </div>
        
      </div>
      <div class="user-info">
          <UserInfo />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import UserInfo from "@/components/UserInfo";
import OrdersTable from "@/components/OrdersTable";

export default {
  components: {
      Header,
      SidebarMenu,
      UserInfo,
      OrdersTable
  }
}
</script>

<style lang="scss" scoped> 

.title {
  margin-left: 0.5rem;
  font-family: var(--base-font);
  font-size: 17px;
  font-weight: 600;
  color: #000000;
}
.container {
min-height: 100vh;
display: grid !important;
grid-template-columns: 2fr 2fr 13fr 5fr;
background-color: var(--secondary-color);

.user-info {
  display: grid;
  margin-left: 15px;

}

.main {
  
   flex-direction: column;
   grid-column: 3 / 4;  
   width: 100%;
  
  .table-wrapper {
    height: min-content;
    flex-direction: column;
    margin-top: 15px;
  }
  .your-orders-wrapper {
      background-color: white;
      border-radius: 10px;
      height:min-content;
      margin-top: 15px;
      display: grid;
      padding: 2%;

      .your-orders-header {
        display: flex;
        height: 30%;
        align-items: center;
          padding: 15px 0 0 15px;

          p {
            margin-left: 2%;
          }
      }   

      .gray-line {
        height: 2px;
        background-color: var(--secondary-color);
        margin: 1% 0 1% 0;
      }
    }
}

.sort-blocks-wrapper {
  display: flex;
  margin-top: 2%;

  .sort-block {
    margin-right: 2rem;
    width: 21%;
    height: 2.3rem;
    border-radius: 10px;
    border: 2px solid #DBDBDB;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #000000;
    cursor: pointer;

    p {
      font-size: 16px;
      font-weight: 400;
    }

    img {
      padding-right: 7%;
    }
  }
}
}

</style>