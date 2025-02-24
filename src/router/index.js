import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HomeView from "@/pages/HomeView.vue";
import ContactView from "@/pages/ContactView.vue";
import AboutView from "@/pages/AboutView.vue";
import ProductsView from "@/pages/ProductsView.vue";
import ProductInfoView from "@/pages/ProductInfoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        { path: "", name: "home", component: HomeView },
        { path: "contact", name: "contact", component: ContactView },
        { path: "about", name: "about", component: AboutView },
        { path: "products", name: "products", component: ProductsView },
        {
          path: "product/:id",
          name: "productInfo",
          component: ProductInfoView,
          props: true,
        },
      ],
    },
  ],
});

export default router;
