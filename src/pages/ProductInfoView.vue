<template>
  <div class="product-info py-10">
    <div class="container">
      <div v-if="product" class="product-info-wrapper">
        <div class="product-info-image">
          <img
            :src="product.image"
            :alt="product.name"
            class="product-img w-full h-full object-contain"
          />
        </div>
        <div class="product-info-content py-4 px-7">
          <h1>{{ product.name }}</h1>
          <p class="mb-4 mt-2 text-gray-600 text-xl">
            {{ product.description.description }}
          </p>
          <p class="mb-4 text-xl">
            <strong class="text-red-600 text-2xl mr-1">Narx:</strong>
            {{ formattedPrice }}
          </p>
          <div class="flex justify-start items-center">
            <div>
              <button class="btn">Korzinkaga qo'shish</button>
            </div>
            <div class="counter ml-2">
              <button @click="decreaseCount" class="minus-btn">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="text-xl font-semibold mx-4 w-8 text-center">
                {{ getCount }}
              </span>
              <button @click="increaseCount" class="plus-btn">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Mahsulot topilmadi</p>
      </div>
    </div>
    <ProductInfoItem />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ProductInfoItem from "@/components/ui/ProductInfoItem.vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/counter";

const cartStore = useCartStore();
const route = useRoute();

const product = ref(null);
const products = ref([]);

const formattedPrice = computed(() => {
  if (!product.value) return "";
  const finalPrice =
    product.value.description.price - (product.value.description.discount || 0);
  return `${finalPrice} сум`;
});

const getCount = computed(() => {
  const item = cartStore.cart.find((item) => item.id === product.value?.id);
  return item ? item.count : 0;
});

// Funksiyalar
const increaseCount = () => {
  cartStore.addToCart(product.value, 1);
};

const decreaseCount = () => {
  cartStore.removeFromCart(product.value.id);
};

const addToCart = () => {
  cartStore.addToCart(product.value, 1);
};

// Mahsulotni olish
const fetchProduct = async () => {
  try {
    const response = await fetch("/db.json");
    const data = await response.json();
    products.value = data;
    product.value = products.value.find((p) => p.id == route.params.id);
    console.log("Mahsulot topilmadi:", product.value);
  } catch (error) {
    console.error("Mahsulotni yuklashda xatolik:", error);
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<style>
.product-info {
  width: 100%;
  height: auto;
  background-color: #f6f7fb;
  padding-top: 50px;
}
.container {
  width: 80%;
  margin: 0 auto;
  padding: 0 15px;
}

.product-info-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 50px;
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
}
.product-info-image {
  width: 30%;
}
.product-info-content {
  width: 70%;
}

.product-info-image img {
  width: 100%;
  border-radius: 10px;
}
.product-info-content h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
}
.btn {
  background-color: #6db460;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #5ca350;
}
</style>
