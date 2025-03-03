<template>
  <div class="about-cart w-full h-auto py-10">
    <div class="container">
      <div class="cart_about">
        <div class="block_cart mr-2" v-for="item in cartDataInfo" :key="item">
          <img :src="item.img" alt="cart rasmlar" />
          <h1>{{ item.name }}</h1>
          <p>{{ item.info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const cartDataInfo = ref([
  {
    img: new URL("../../assets/cart (1).jfif", import.meta.url).href,
    name: "Mahsulot nomi 1",
    info: "About haqida ma'lumot 1",
  },
  {
    img: new URL("../../assets/cart (2).jfif", import.meta.url).href,
    name: "about nomi 2",
    info: "Mahsulot haqida ma'lumot 2",
  },
  {
    img: new URL("../../assets/cart (3).jfif", import.meta.url).href,
    name: "Mahsulot nomi 3",
    info: "About haqida ma'lumot 3",
  },
]);
</script>
<style>
.cart_about {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.block_cart {
  width: 350px;
  height: 400px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.block_cart img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}
</style>
