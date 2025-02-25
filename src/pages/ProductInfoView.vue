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
            {{ product.description.description }}
          </p>
          <p class="mb-4 text-xl">
            <strong class="text-red-600 text-2xl mr-1">Narx:</strong>
            {{ formattedPrice }}
          </p>
          <div class="flex justify-start items-center">
            <div>
              <button class="btn" @click="addToCart">
                Korzinkaga qo'shish
              </button>
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
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/counter";

export default {
  data() {
    return {
      product: null,
      products: [],
      cartStore: useCartStore(), // Pinia store
      route: useRoute(),
    };
  },
  computed: {
    formattedPrice() {
      if (!this.product) return "";
      const finalPrice =
        this.product.description.price -
        (this.product.description.discount || 0);
      return `${finalPrice} сум`;
    },
    getCount() {
      const item = this.cartStore.cart.find(
        (item) => item.id === this.product?.id
      );
      return item ? item.count : 0;
    },
  },
  methods: {
    increaseCount() {
      this.cartStore.addToCart(this.product, 1);
    },
    decreaseCount() {
      this.cartStore.removeFromCart(this.product.id);
    },
    addToCart() {
      this.cartStore.addToCart(this.product, 1);
    },
    async fetchProduct() {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        this.products = data;
        this.product = this.products.find((p) => p.id == this.route.params.id);
        console.log("Mahsulot topilmadi:", this.product);
      } catch (error) {
        console.error("Mahsulotni yuklashda xatolik:", error);
      }
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>

<style>
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

.product-info-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
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
