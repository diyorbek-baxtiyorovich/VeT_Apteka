<template>
  <div class="container mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold text-center mb-10">
      Pharmacy <span class="text-green-600">Products</span>
    </h2>
    <swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="20"
      :breakpoints="{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000 }"
      class="swiper-container"
    >
      <swiper-slide v-for="(product, index) in products" :key="index">
        <div
          class="bg-white shadow-lg rounded-lg p-4 transform transition hover:scale-105"
        >
          <div class="relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-64 object-contain rounded-lg"
            />
            <span
              v-if="product.onSale"
              class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded"
              >SALE</span
            >
          </div>
          <div class="text-center mt-4">
            <h3 class="text-lg font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500 p-2">{{ product.style }}</p>
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
              @click="sendDetailPage(product)"
            >
              Batafsil
            </button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = ref([
  {
    name: "Hayvonlar uchun vitaminlar",
    style:
      "Hayvonlar uchun vitaminlar va ulardan foydalash usullarini tanishing",
    image:
      "https://www.housethatbarks.com/wp-content/uploads/dog-vegetables-1.jpg",
    onSale: false,
    description: {
      price: 10000,
      discount: 5000,
      description: "Bu mahsulot hayvonlar uchun vitaminlar bilan bog'liq",
    },
  },
  {
    name: "Sabzavodlar uchun o'g'itlar",
    style:
      "Sabzavodlar uchun o'g'itlar va ulardan foydalash usullarini tanishing",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHmcNJ8zFb-PfbjV3lvG1Qvdg_MkJEZVuT7-XSxoZHUjzS7VcTI_L8snW2EwdLrLcR2IA&usqp=CAU",
    onSale: true,
  },
  {
    name: "Parazitlar uchun dori",
    style: "Parazitlar uchun dori va ulardan foydalash usullarini tanishing",
    image:
      "https://media.istockphoto.com/id/1365789615/vector/lice-and-bug-insect-symbol-set-illustration-vector.jpg?s=612x612&w=0&k=20&c=mn7vgTJGbzIxoPB8bDOaSaiOYpYI2vQl8S0Jyec_94c=",
    onSale: false,
  },
  {
    name: "Hashoratlar uchun qarshi dori vositalari",
    style:
      "Hashoratlar uchun qarshi dori vositalari va ulardan foydalasnish usullar bilan tanishing",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoCx-o2oQPyrU_KH4ZY9MQDzqHa7xEIw-PzRW7s12jbDjqfPIwhMDrGlCuU3qJA_6iiHE&usqp=CAU",
    onSale: false,
  },
]);

function sendDetailPage(details) {
  console.log(details);
}
</script>

<style scoped>
.swiper-container {
  width: 100%;
  padding-bottom: 30px;
}
</style>
