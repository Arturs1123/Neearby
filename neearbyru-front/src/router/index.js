import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainPage from "../views/MainPage.vue";
import Documentation from  "../views/Documentation";
const ApiWrapper = require('../api');
import store from '../store';
import BalanceView from "@/views/BalanceView";
import WithdrawMoney from "@/views/WithdrawMoney";
import OrdersView from "@/views/OrdersView.vue";
import RegistrationView from "@/views/RegistrationView.vue"
import RegistrationConfirmView from "@/views/RegistrationConfirmView.vue";
import LoginView from "@/views/LoginView.vue";
import PasswordRecoveryView from "@/views/PasswordRecoveryView.vue";
import ThanksForRegistration from "@/views/ThanksForRegistration.vue";
import ChooseSubdomain from "@/views/ChooseSubdomain.vue";
import CreateProductView from '@/views/CreateProductView.vue'
import MessagesView from "@/views/MessagesView.vue";
import YourOrdersView from '@/views/YourOrdersView.vue'
import ChooseSubdomainSuccess from "@/views/ChooseSubdomainSuccess.vue";
import ProductView from "@/views/ProductView";
import AdminPanel from "@/views/AdminPanel";
import EditProductView from "@/views/EditProductView";
import NewPost from "@/views/NewPost";
import ChangePost from "@/views/ChangePost";
import SearchPost from "@/views/SearchPost";
import NotFound from "@/views/NotFound";
import P53 from "@/components/PostModals/P53";
import Report from "@/components/ModalsReport/Report";
import Spam from "@/components/ModalsReport/Spam";
import Scam from "@/components/ModalsReport/Scam";
import Insult from "@/components/ModalsReport/Insult";
import Porno from "@/components/ModalsReport/Porno";
import Problem from "@/components/ModalsReport/Problem";
import Wait from "@/components/ModalsReport/Wait";
import Succes from "@/components/ModalsReport/Succes";
import Failed from "@/components/ModalsReport/Failed";
import SubscriptionModal from "@/components/SubscriptionModal";
import NewsSearch from "@/views/NewsSearch";
import SuccesBlock from "@/components/ModalMessanger/SuccesBlock";
import Search from "@/components/Search";
import AdSearch from "@/views/AdSearch";
import SearchAllFavors from "@/views/AllFavors";
import Posts from "@/views/Posts";
import Block from "@/components/ModalMessanger/Block";
import NotificationInvited from "@/components/Notification"
import ProxyView from "@/views/ProxyView.vue";
import LoginSubdomain from "@/views/LoginSubdomain";
import SearchAllProduct from "@/views/SearchAllProduct";
import PostModalBig from "@/components/PostModalBig";
import PostModeration from "@/components/AdminPanel/PostModeration"
import AvatarModeration from "@/components/AdminPanel/AvatarModeration"
import CoverModeration from "@/components/AdminPanel/CoverModeration"
import ProductModerationViews from "@/components/AdminPanel/ProductModeration"
import SubscriptionModeration from "@/components/AdminPanel/SubscriptionModeration"
import CreateSubView from "@/views/CreateSubView";
import EditSubView from "@/views/EditSubView";
import SubcView from "@/views/SubcView";
import SearchAllSub from "@/views/SearchAllSub";

const routes = [
    {
        path: "/",
        name: "landing",
        component: ProxyView,
    },
    {
        path: "/info",
        name: "info",
        component: Documentation,
    },
    {
        path: "/admin-panel",
        name: "admin-panel",
        component: AdminPanel,
    },
    // {
    //     path: "/admin-panel/moderation-post",
    //     name: "admin-panel-moderation-post",
    //     component: PostModeration,
    // },
    {
        path: "/admin-panel/moderation-avatars",
        name: "admin-panel-moderation-avatars",
        component: AvatarModeration,
    },
    {
        path: "/admin-panel/moderation-covers",
        name: "admin-panel-moderation-covers",
        component: CoverModeration,
    },
    {
        path: "/admin-panel/moderation-product",
        name: "admin-panel-moderation-product",
        component: ProductModerationViews,
    },
    {
        path: "/admin-panel/moderation-subscription",
        name: "admin-panel-moderation-subscription",
        component: SubscriptionModeration,
    },
    {
        path: "/edit-product/:id",
        name: "edit-product",
        component: EditProductView,
    },
    {
        path: "/:id",
        name: "product-path",
        component: ProductView,
    },
    {
        path: "/products",
        name: "searchAllProduct",
        component: SearchAllProduct
    },
    {
        path: "/favors",
        name: "searchAllFavors",
        component: SearchAllFavors
    },
    // {
    //     path: "/favor",
    //     name: "searchAllFavor",
    //     component: SearchAllFavor
    // },
    {
        path: "/balance",
        name: "balance",
        component: BalanceView
    },
    {
        path: "/withdraw",
        name: "withdraw",
        component: WithdrawMoney
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersView
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationView
    },
    {
        path: '/confirm-your-registration',
        name: 'confirm-your-registration',
        component: RegistrationConfirmView
    },
    {
        path: '/enter-your-personal-account',
        name: 'enter-your-personal-account',
        component: LoginView
    },
    {
        path: '/enter-your-personal-accounts',
        name: 'enter-your-personal-accounts',
        component: LoginSubdomain
    },
    {
        path: '/recover-your-password',
        name: 'recover-your-password',
        component: PasswordRecoveryView
    },
    {
        path: '/add-product',
        name: 'add-product',
        component: CreateProductView
    },
    {
        path: '/add-subscription',
        name: 'add-subscription',
        component: CreateSubView
    },
    {
        path: "/edit-subscription/:id",
        name: "edit-subscription",
        component: EditSubView,
    },
    {
        path: "/subscription/:id",
        name: "subscription-path",
        component: SubcView,
    },
    {
        path: "/subscriptions",
        name: "searchAllSubscription",
        component: SearchAllSub
    },
    {
        path: '/your-orders',
        name: 'your-orders',
        component: YourOrdersView
    },
    {
        path: '/thank-you-for-registering/',
        name: 'thank-you-for-registering',
        component: ThanksForRegistration
    },
    // {
    //     path: '/thank-you-for-registering/:token',
    //     name: 'thank-you-for-registering',
    //     component: ThanksForRegistration
    // },
    {
        path: '/choose-your-subdomain',
        name: 'choose-your-subdomain',
        component: ChooseSubdomain
    },
    {
        path: '/messenger',
        name: 'messages',
        component: MessagesView
    },
    {
        path: '/subdomain-set-successfully',
        name: 'subdomainSuccess',
        component: ChooseSubdomainSuccess
    },
    {
        path: '/new-post',
        name: 'new-post',
        component: NewPost
    },
    {
        path: '/change-post',
        name: 'change-post',
        component: ChangePost
    },
    {
        path: '/search-post',
        name: 'search-post',
        component: SearchPost
    },
    {
        path: '/not-found',
        name: 'not found page',
        component: NotFound
    },
    {
        path: '/news-search',
        name: 'NewsSearch',
        component: NewsSearch
    },
    {
        path: '/ad-search',
        name: 'ad-search',
        component: AdSearch
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts
    },
    {
        path: '/check-page',
        name: 'check-page',
        component: PostModalBig
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {

    try {
        let user = await ApiWrapper.whoami();
        store.commit('setAuthorized', false);
        if (user?.success) {
            store.commit('setAuthorized', true);
        }
        next()
    } catch (e) {
        next()
    }
})


router.beforeEach( async (to, from, next) => {

    
    if(location.pathname == '/choose-your-subdomain'){
        next();
        return;
    }

    let user = (await ApiWrapper.whoami()).data;



  if (user.role == 1) {
    location.href = '/choose-your-subdomain';
  }
  else {
    next()
  }
})

export default router;
