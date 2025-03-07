<template>
  <div class="product-list" v-if="products.length > 0">
    <div v-if="paginatedProducts.length === 0" class="no-products">
      Elementlar topilmadi
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="(product, index) in paginatedProducts"
        :key="index"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" class="product-img" />
        <router-link :to="`/product/${product.id}`">
          <h2
            class="text-lg font-semibold mt-2 hover:text-blue-500 cursor-pointer"
          >
            {{ product.name }}
          </h2>
        </router-link>
        <p class="text-gray-500">
          {{
            product.description.description.slice(0, 50) +
            (product.description.description.length > 50 ? "..." : "")
          }}
        </p>
        <p class="mt-2" v-html="formattedPrice(product)"></p>
        <div class="flex justify-center mt-4">
          <div
            class="flex items-center bg-gray-100 p-3 sm:p-5 rounded-xl shadow-md"
          >
            <button @click="decreaseCount(product.id)" class="cursor-pointer">
              <i class="fa-solid fa-minus text-red-500"></i>
            </button>
            <span class="text-lg sm:text-xl font-semibold mx-4 w-8 text-center">
              {{ getCount(product.id) }}
            </span>
            <button @click="increaseCount(product.id)" class="cursor-pointer">
              <i class="fa-solid fa-plus text-green-600"></i>
            </button>
          </div>
        </div>
        <button @click="addToCart(product)" class="btn-add">
          Korzinkaga qo'shish
        </button>
      </div>
    </div>
    <nav
      v-if="totalPages > 1"
      class="mt-4 flex flex-wrap justify-center sm:justify-end"
    >
      <ul class="flex flex-wrap">
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
            :disabled="currentPage === page"
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
  <div v-else>Ma'lumot yo'q</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import Swal from "sweetalert2";

const props = defineProps({
  products: Array,
  itemsPerPage: {
    type: Number,
    default: 8,
  },
});

const emit = defineEmits(["add-to-cart"]);
const currentPage = ref(1);
const productCounts = ref({});

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cartCounts");
  productCounts.value = storedCart ? JSON.parse(storedCart) : {};
};

const saveCartToStorage = () => {
  localStorage.setItem("cartCounts", JSON.stringify(productCounts.value));
};

const totalPages = computed(() => {
  return Math.ceil(props.products.length / props.itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  return props.products.slice(start, start + props.itemsPerPage);
});

const formattedPrice = (product) => {
  const finalPrice =
    product.description.price - (product.description.discount || 0);

  if (product.description.discount > 0) {
    return `
      <span class="text-red-500 line-through">${product.description.price} so'm</span>
      <span class="text-green-700 font-bold ml-2">${finalPrice} so'm (Chegirma)</span>
    `;
  } else {
    return `<span class="text-green-700 font-bold">${product.description.price} so'm</span>`;
  }
};

const increaseCount = (productId) => {
  if (!productCounts.value[productId]) {
    productCounts.value[productId] = 1;
  } else {
    productCounts.value[productId]++;
  }
  saveCartToStorage();
};

const decreaseCount = (productId) => {
  if (productCounts.value[productId] && productCounts.value[productId] > 1) {
    productCounts.value[productId]--;
  } else {
    delete productCounts.value[productId];
  }
  saveCartToStorage();
};

const getCount = (productId) => {
  return productCounts.value[productId] || 0;
};

const addToCart = (product) => {
  emit("add-to-cart", {
    product,
    count: productCounts.value[product.id] || 1,
  });
  saveCartToStorage();
  Swal.fire({
    title: "Mahsulot qo'shildi!",
    text: "Mahsulot savatchaga muvaffaqiyatli qo'shildi.",
    icon: "success",
    confirmButtonText: "OK",
  });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const setPage = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  loadCartFromStorage();
});
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
