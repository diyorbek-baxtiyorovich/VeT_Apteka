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
  {
    img: new URL("../../assets/cart (4).webp", import.meta.url).href,
    name: "Mahsulot nomi 4",
    info: "About haqida ma'lumot 4",
  },
  {
    img: new URL("../../assets/cart (5).jpg", import.meta.url).href,
    name: "Mahsulot nomi 5",
    info: "About haqida ma'lumot 5",
  },
]);
</script>
<style>
.cart_about {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: start;
  padding: 20px;
}

.block_cart {
  background: #fff;
  padding: 15px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.block_cart img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.block_cart h1 {
  font-size: 18px;
  margin: 10px 0;
}

.block_cart p {
  font-size: 14px;
  color: #666;
}
</style>
