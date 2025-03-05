<template>
  <div class="navbar-wrapper">
    <nav class="bg-gray-800 text-white p-4 flex justify-between px-10 py-3">
      <h1 class="text-3xl font-bold">
        <router-link to="/">Pharmacy</router-link>
      </h1>
      <ul
        class="flex space-x-4 items-center text-lg font-semibold uppercase tracking-widest"
      >
        <li>
          <router-link
            to="/"
            class="hover:text-white transition duration-300"
            exact-active-class="text-white font-bold border-b-2 border-white"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/products"
            class="hover:text-white transition duration-300"
            active-class="text-white font-bold border-b-2 border-white"
          >
            Products
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="hover:text-white transition duration-300"
            active-class="text-white font-bold border-b-2 border-white"
          >
            About
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="hover:text-white transition duration-300"
            active-class="text-white font-bold border-b-2 border-white"
          >
            Contact
          </router-link>
        </li>
      </ul>
      <ul
        class="flex space-x-4 items-center text-lg font-semibold uppercase tracking-widest"
      >
        <li class="relative">
          <router-link to="/cart">
            <i class="fas fa-shopping-cart text-2xl"></i>
            <span
              v-if="totalItems > 0"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs"
            >
              {{ totalItems }}
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/login"> Login </router-link>
        </li>
        <li>
          <router-link to="/register"> Register </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/counter";
import { computed } from "vue";

const cartStore = useCartStore();

const totalItems = computed(() => cartStore.totalItems);
</script>

<style scoped>
ul li:hover {
  color: white;
}

ul li {
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 10px;
  color: rgba(223, 198, 198, 0.8);
}
.navbar-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}
</style>
