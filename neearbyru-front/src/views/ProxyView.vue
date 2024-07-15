<template>
            <MainPage v-if="!subdomain"/>
            <HomeView :profile-link="subdomain" v-if="subdomain"/>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverModeration from "@/components/AdminPanel/CoverModeration";
import AvatarModerationEl from "@/components/AvatarModerationEl";
import AvatarModeration from "@/components/AvatarModeration";
import ProductModeration from "@/components/ProductModeration";
import MainPage from "./MainPage.vue";
import HomeView from "@/views/HomeView.vue";
export default {
    name: "ProxyView",
    components: {
        MainPage,
        HomeView
    },
    beforeMount() {
        // console.log(window.location)

        let link = window.location.href.slice();

        link = link.split('//')[1];

        //Только для локального тестирования
        // link += '.ru';

        if(link.split('.').length === 3){
            // console.log(`subdomain is ${link.split('.')[0]}`)

            this.subdomain = link.split('.')[0];
        }
        if(link.split('.').length === 2){
            // console.log(`domain is ${link.split('.')[0]}`)
        }
    },
    data: function (){
        return {
            subdomain: null
        }
    }
}
</script>
