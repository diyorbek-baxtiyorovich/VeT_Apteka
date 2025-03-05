import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";

import HomeView from "@/pages/HomeView.vue";
import ContactView from "@/pages/ContactView.vue";
import AboutView from "@/pages/AboutView.vue";
import ProductsView from "@/pages/ProductsView.vue";
import ProductInfoView from "@/pages/ProductInfoView.vue";
import AppLogin from "@/layout/components/AppLogin.vue";
import AppRegister from "@/layout/components/AppRegister.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: HomeView },
      { path: "contact", name: "contact", component: ContactView },
      { path: "about", name: "about", component: AboutView },
      { path: "products", name: "products", component: ProductsView },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/pages/CartView.vue"),
      },
      {
        path: "product/:id",
        name: "productInfo",
        component: ProductInfoView,
        props: true,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "/login", name: "login", component: AppLogin },
      { path: "/register", name: "register", component: AppRegister },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
