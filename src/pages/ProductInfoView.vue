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
            <span
              v-if="product.description.discount"
              class="text-gray-400 line-through ml-2"
            >
              {{ product.description.price }} сум
            </span>
          </p>
          <div class="flex flex-wrap justify-start items-center">
            <button class="btn" @click="addToCart">Korzinkaga qo'shish</button>
            <div v-if="getCount > 0" class="counter ml-2 flex items-center">
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
import ProductInfoItem from "@/components/ui/ProductInfoItem.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/counter";
import Swal from "sweetalert2";

const cartStore = useCartStore();
const route = useRoute();

const product = ref(null);
const products = ref([]);

const formattedPrice = computed(() => {
  if (!product.value) return "";
  const originalPrice = product.value.description.price;
  const discount = product.value.description.discount || 0;
  const finalPrice = originalPrice - discount;
  return `${finalPrice} сум`;
});

const getCount = computed(() => {
  const item = cartStore.cart.find((item) => item.id === product.value?.id);
  return item ? item.quantity : 0;
});

const addToCart = () => {
  cartStore.addToCart(product.value, 1);
  Swal.fire({
    title: "Mahsulot qo'shildi!",
    text: "Mahsulot savatchaga muvaffaqiyatli qo'shildi.",
    icon: "success",
    confirmButtonText: "OK",
  });
};
const increaseCount = () => cartStore.addToCart(product.value, 1);
const decreaseCount = () => cartStore.removeFromCart(product.value.id);

const fetchProduct = async () => {
  try {
    const response = await fetch("/db.json");
    const data = await response.json();
    products.value = data;
    product.value = products.value.find((p) => p.id == route.params.id);
  } catch (error) {
    console.error("Mahsulotni yuklashda xatolik:", error);
  }
};

onMounted(fetchProduct);
</script>
<style>
.product-info {
  width: 100%;
  background-color: #f6f7fb;
  padding-top: 50px;
}
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.product-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
}

@media (min-width: 768px) {
  .product-info-wrapper {
    flex-direction: row;
  }
}

.product-info-image {
  width: 100%;
}

@media (min-width: 768px) {
  .product-info-image {
    width: 40%;
  }
}
.product-info-content {
  width: 100%;
}

@media (min-width: 768px) {
  .product-info-content {
    width: 60%;
  }
}
.product-info-image img {
  width: 100%;
  border-radius: 10px;
}
.product-info-content h1 {
  font-size: 1.75rem;
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
