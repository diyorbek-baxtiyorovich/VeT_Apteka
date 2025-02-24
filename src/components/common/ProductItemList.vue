<template>
  <div class="product-list">
    <div v-if="products.length === 0" class="no-products">
      Найдено 0 товаров
    </div>
    <div v-else class="grid grid-cols-4 gap-4">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" class="product-img" />
        <router-link :to="`/product/${product.id}`">
          <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        </router-link>
        <p class="text-gray-500">{{ product.description.description }}</p>
        <p class="text-gray-700 font-bold mt-2">
          {{ formattedPrice(product) }}
        </p>

        <div class="flex justify-center mt-4">
          <div class="flex items-center bg-gray-100 p-2 rounded-xl shadow-md">
            <button @click="decreaseCount(index)" class="cursor-pointer">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="text-xl font-semibold mx-4 w-8 text-center">
              {{ getCount(index) }}
            </span>
            <button @click="increaseCount(index)" class="cursor-pointer">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <button @click="addToCart(product, index)" class="btn-add">
          Korzinkaga qo'shish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  data() {
    return {
      productCounts: {},
    };
  },
  methods: {
    formattedPrice(product) {
      const finalPrice =
        product.description.price - (product.description.discount || 0);
      return product.description.discount
        ? `${finalPrice} сум (Чегирма)`
        : `${product.description.price} сум`;
    },
    increaseCount(index) {
      if (!this.productCounts[index]) {
        this.productCounts[index] = 1;
      } else {
        this.productCounts[index]++;
      }
      this.productCounts = { ...this.productCounts };
    },
    decreaseCount(index) {
      if (this.productCounts[index] && this.productCounts[index] > 1) {
        this.productCounts[index]--;
      } else {
        this.$delete(this.productCounts, index);
      }
    },
    getCount(index) {
      return this.productCounts[index] || 0;
    },
    addToCart(product, index) {
      this.$emit("add-to-cart", {
        product,
        count: this.productCounts[index] || 1,
      });
    },
  },
};
</script>

<style>
.product-list {
  width: 75%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.no-products {
  text-align: center;
  font-size: 18px;
  color: #ff4d4d;
  font-weight: bold;
}

.product-card {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.btn-add {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add:hover {
  background: #388e3c;
}
</style>
