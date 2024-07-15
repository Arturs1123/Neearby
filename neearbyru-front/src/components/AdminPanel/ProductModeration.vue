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
          <ProductModeration/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import CoverModeration from "@/components/AdminPanel/CoverModeration";
import AvatarModerationEl from "@/components/AvatarModerationEl";
import AvatarModeration from "@/components/AvatarModeration";
import ProductModeration from "@/components/ProductModeration";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import SidebarAdminPanel from "@/components/Sidebar/SidebarAdminPanel"
import ProdMod from "@/components/ProdMod";
import HeaderPanel from "@/components/AdminPanel/HeaderPanel";

export default {
  name: "AdminPanel",
  components: {
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