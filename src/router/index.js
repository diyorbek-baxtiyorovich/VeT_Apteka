import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HomeView from "@/pages/HomeView.vue";
import ContactView from "@/pages/ContactView.vue";
import ProductsView from "@/pages/ProductsView.vue";
import AboutView from "@/pages/AboutView.vue";
// import NotFound from "@/pages/NotFound.vue"; // NotFound sahifasi

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "contact",
          name: "contact",
          component: ContactView,
        },
        {
          path: "products",
          name: "products",
          component: ProductsView,
        },
        {
          path: "about",
          name: "about",
          component: AboutView,
        },
        {
          path: "korzinka",
          name: "korzinka",
          component: () => import("@/pages/KorzinkaView.vue"),
        },
      ],
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "NotFound",
    //   component: NotFound,
    // },
  ],
});

export default router;
