<template>
  <div class="product-info py-10">
    <div class="container">
      <div v-if="product" class="product-info-wrapper">
        <div class="product-info-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info-content py-4 px-7">
          <h1>{{ product.name }}</h1>
          <p class="mb-4 mt-2 text-gray-600 text-xl">
            {{ product.description?.description || "Tavsif mavjud emas" }}
          </p>
          <p class="mb-4 text-xl text-green-600 font-bold">
            <strong class="text-red-600 text-2xl mr-1">Narx:</strong>

            {{ product.description.price - product.description.discount }}
            so'm
            <span
              v-if="product.description.discount > 0"
              class="line-through text-red-500 ml-2"
              >{{ formattedPrice }}
            </span>
          </p>
          <div class="flex justify-start items-center">
            <button class="btn" @click="addToCart()">
              Korzinkaga qo'shish
            </button>
            <button class="btn-buy">Sotib olish</button>
            <div class="counter ml-2 bg-gray-100 rounded-2xl p-1 px-2.5">
              <button @click="decreaseCount()" class="minus-btn">
                <i class="fa-solid fa-minus cursor-pointer text-red-600"></i>
              </button>
              <span class="text-xl font-semibold mx-4 w-8 text-center">
                {{ getCount }}
              </span>
              <button @click="increaseCount()" class="plus-btn">
                <i class="fa-solid fa-plus cursor-pointer text-green-600"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Mahsulot topilmadi</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/counter";
// import ProductInfoItem from "@/components/ui/ProductInfoItem.vue";

const product = ref(null);
const products = ref([]);
const cartStore = useCartStore();
const route = useRoute();

const formattedPrice = computed(() => {
  if (!product.value || !product.value.description) return "Noma'lum narx";
  return `${product.value.description.price} so'm`;
});

const getCount = computed(() => {
  const item = cartStore.cart.find((item) => item.id === product.value?.id);
  return item ? item.count : 0;
});

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
/* Umumiy sahifa styling */
.product-info {
  width: 100%;
  height: 100vh;
  background-color: #f6f7fb;
  padding-top: 100px;
}
.container {
  width: 90%;
  margin: 0 auto;
  padding: 0 15px;
}

/* Mahsulot ma'lumotlari */
.product-info-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

/* Tugmalar styling */
.btn {
  background-color: #6db460;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.btn:hover {
  background-color: #5ca350;
  transform: scale(1.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Sotib olish tugmasi */
.btn-buy {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.3s, transform 0.2s;
}
.btn-buy:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* Savat count */
.counter {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 5px 10px;
}
.counter button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

/* Scrollbar dizayni */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #4caf50, #8bc34a);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #388e3c, #689f38);
}
</style>
