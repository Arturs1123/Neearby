<template>
  <HeaderPanel/>
  <div>
    <div className="main">
      <div className="admin-part">
        <div className="sidebar"
             style="margin-top: 80px; background-color: var(--secondary-color); width: 15%; padding-left: 40px;">
          <SidebarAdminPanel style="width: 50%;"/>
        </div>
        <div className="sidebar" style="margin-top: 80px; background-color: var(--secondary-color); width: 85%">
          <SubscriptionModeration/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPanel from "@/components/AdminPanel/HeaderPanel";
import ProdMod from "@/components/ProdMod";
import ProductModeration from "@/components/ProductModeration";
import AvatarModeration from "@/components/AvatarModeration";
import AvatarModerationEl from "@/components/AvatarModerationEl";
import CoverModeration from "@/components/AdminPanel/CoverModeration";
import Footer from "@/components/Footer";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import SidebarAdminPanel from "@/components/Sidebar/SidebarAdminPanel";
import SubscriptionModeration from "@/components/SubscriptionModeration";

export default {
  name: "SubscriptionModerationPanel",
  components: {
    SubscriptionModeration,
    HeaderPanel,
    ProdMod,
    ProductModeration,
    AvatarModeration,
    AvatarModerationEl,
    CoverModeration,
    Footer,
    SidebarMenu,
    SidebarAdminPanel
  }
}
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
}

.admin-part {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

</style>