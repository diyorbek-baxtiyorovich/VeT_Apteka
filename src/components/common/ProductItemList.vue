<template>
  <div class="product-list">
    <div v-if="paginatedProducts.length === 0" class="no-products">
      Elementlar topilmadi
    </div>
    <div v-else class="grid grid-cols-4 gap-4">
      <div
        v-for="(product, index) in paginatedProducts"
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
    <nav v-if="totalPages > 1" class="mt-4 flex justify-end">
      <ul class="flex">
        <li>
          <button
            class="page-link rounded-lg px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item">
          <button
            class="page-link px-4 py-2 border rounded-lg transition"
            :class="{
              'bg-blue-500 text-white border-blue-500': currentPage === page,
              'bg-gray-100 text-gray-700 hover:bg-gray-200':
                currentPage !== page,
            }"
            @click="setPage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li>
          <button
            class="page-link rounded-lg px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            :class="{
              'opacity-50 cursor-not-allowed': currentPage === totalPages,
            }"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
    itemsPerPage: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      currentPage: 1,
      productCounts: {},
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.products.slice(start, start + this.itemsPerPage);
    },
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
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    setPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
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
.page-link {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.page-link:hover {
  transform: scale(1.05);
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
