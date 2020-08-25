import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Delivery from "../views/Delivery.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/city",
        name: "City",
        component: () =>
            import(/* webpackChunkName: "city" */ "../views/City.vue"),
    },
    {
        path: "/delivery",
        name: "Delivery",
        component: () =>
            import(/* webpackChunkName: "delivery" */ "../views/Delivery.vue"),
    },
    {
        path: "/search",
        name: "Search",
        component: () =>
            import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    },
    {
        path: "/order",
        name: "Order",
        component: () =>
            import(/* webpackChunkName: "order" */ "../views/Order.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () =>
            import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    },
    // {
    //     path: "/shop",
    //     name: "Shop",
    //     component: () =>
    //         import(/* webpackChunkName: "shop" */ "../views/Shop.vue"),
    // },
];

const router = new VueRouter({
    routes,
});

export default router;
