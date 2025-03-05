<template>
  <div class="navbar-wrapper bg-gray-800 text-white">
    <div class="flex justify-between items-center px-10 py-3">
      <h1 class="text-3xl font-bold">
        <router-link to="/">Pharmacy</router-link>
      </h1>
      <ul
        class="hidden md:flex space-x-6 text-lg font-semibold uppercase tracking-widest"
      >
        <li><router-link to="/" class="hover:text-white">Home</router-link></li>
        <li>
          <router-link to="/products" class="hover:text-white"
            >Products</router-link
          >
        </li>
        <li>
          <router-link to="/about" class="hover:text-white">About</router-link>
        </li>
        <li>
          <router-link to="/contact" class="hover:text-white"
            >Contact</router-link
          >
        </li>
      </ul>
      <ul class="flex space-x-6 items-center text-lg font-semibold">
        <li class="relative">
          <router-link to="/cart" class="relative">
            <i class="fas fa-shopping-cart text-2xl"></i>
            <span
              v-if="totalItems > 0"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs"
            >
              {{ totalItems }}
            </span>
          </router-link>
        </li>

        <li class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center space-x-2 focus:outline-none"
          >
            <img
              :src="userStore.avatar || defaultAvatar"
              class="w-10 h-10 rounded-full border-2 border-white"
            />
            <span>{{ userStore.name || "Guest" }}</span>
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden"
            @click="isDropdownOpen = false"
          >
            <p
              v-if="userStore.isLoggedIn"
              class="block px-4 py-2 font-bold border-b"
            >
              {{ userStore.name }}
            </p>
            <router-link
              v-if="userStore.isLoggedIn"
              to="/profile"
              class="block px-4 py-2 hover:bg-gray-200"
              >Profile</router-link
            >
            <router-link
              v-if="userStore.isLoggedIn"
              to="/settings"
              class="block px-4 py-2 hover:bg-gray-200"
              >Settings</router-link
            >
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {{ userStore.isLoggedIn ? "Logout" : "Login" }}
            </button>
          </div>
        </li>
      </ul>

      <button class="md:hidden text-3xl" @click="toggleMobileMenu">☰</button>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden flex flex-col space-y-4 px-10 pb-4"
    >
      <router-link to="/" @click="closeMobileMenu">Home</router-link>
      <router-link to="/products" @click="closeMobileMenu"
        >Products</router-link
      >
      <router-link to="/about" @click="closeMobileMenu">About</router-link>
      <router-link to="/contact" @click="closeMobileMenu">Contact</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/counter";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const cartStore = useCartStore();
const router = useRouter();

const totalItems = computed(() => cartStore.totalItems);
const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

const isDropdownOpen = ref(false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () =>
  (isMobileMenuOpen.value = !isMobileMenuOpen.value);
const closeMobileMenu = () => (isMobileMenuOpen.value = false);

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
  isDropdownOpen.value = false;
};
</script>

<style scoped>
ul li {
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 10px;
  color: rgba(223, 198, 198, 0.8);
}

ul li:hover {
  color: white;
}

.navbar-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}
</style>
