<template>
  <div class="navbar-wrapper">
    <nav class="bg-gray-800 text-white p-4 flex justify-between px-10">
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
          <router-link to="/korzinka">
            <i class="fas fa-shopping-cart"></i>
            <span
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs"
            >
              0
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

<script>
export default {
  name: "AppNavbar",
};
</script>
<style>
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
