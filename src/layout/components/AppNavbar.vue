<template>
  <div class="navbar-wrapper">
    <nav class="bg-gray-800 text-white p-4 flex justify-between px-10">
      <h1 class="text-3xl font-bold">Pharmacy</h1>
      <ul
        class="flex space-x-4 items-center text-lg font-semibold uppercase tracking-widest text-gray-300"
      >
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/products">Products</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
      <ul
        class="flex space-x-4 items-center text-lg font-semibold uppercase tracking-widest text-gray-300"
      >
        <li class="relative">
          <router-link to="/korzinka">
            <i class="fas fa-shopping-cart"></i>
            <span
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs"
              >0</span
            >
          </router-link>
        </li>
        <li>
          <router-link to="/#">Login</router-link>
        </li>
        <li>
          <router-link to="/#">Register</router-link>
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
  font-weight: bold;
}

ul li {
  transition: all 0.3s;
}
.navbar-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}
</style>
