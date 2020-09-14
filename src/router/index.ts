import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Shows from "../views/Home.vue";
import Favorites from "@/components/Favorites.vue";
import Home from "@/views/Home.vue";
import Detail from "@/components/Detail-show.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites
  },
  {
    path: "/show/detail/:id",
    name: "Detail",
    component: Detail,
    props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
