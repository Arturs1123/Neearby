<template>
  <div style="min-height: 100vh">
    <Header/>
    <div class="balance-body">
      <div class="sidebar">
        <SidebarMenu/>
      </div>
      <div class="full-width">
        <WithdrawBlock/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import WithdrawBlock from "@/components/WithdrawBlock";

export default {
  name: "WithdrawMoney",
  components: {
    Header,
    SidebarMenu,
    WithdrawBlock
  }
}

</script>

<style lang="scss">

</style>