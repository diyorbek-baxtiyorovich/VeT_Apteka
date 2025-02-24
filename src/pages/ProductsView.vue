<template>
  <div class="products-wrapper">
    <div class="container">
      <div class="filters">
        <h2 class="text-lg font-bold mb-4">Фильтр</h2>

        <label class="block">Цена (сум):</label>
        <div class="flex gap-2">
          <input
            v-model="filters.priceMin"
            type="number"
            class="border p-2 rounded w-1/2"
          />
          <input
            v-model="filters.priceMax"
            type="number"
            class="border p-2 rounded w-1/2"
          />
        </div>

        <label class="block mt-2">Производитель:</label>
        <input
          v-model="filters.manufacturer"
          type="text"
          class="border p-2 rounded w-full"
        />

        <label class="block mt-2">Объем:</label>
        <input
          v-model="filters.volume"
          type="text"
          class="border p-2 rounded w-full"
        />

        <label class="block mt-2">Bce:</label>
        <input
          v-model="filters.weight"
          type="text"
          class="border p-2 rounded w-full"
        />

        <button @click="clearFilters" class="btn-clear">Очистить фильтр</button>
      </div>

      <div class="product-list">
        <div v-if="categorizedProducts.length === 0" class="no-products">
          Найдено 0 товаров
        </div>
        <div v-else class="grid grid-cols-4 gap-4">
          <div
            v-for="(product, index) in categorizedProducts"
            :key="index"
            class="product-card"
          >
            <img :src="product.image" :alt="product.name" class="product-img" />
            <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
            <p class="text-gray-500">{{ product.description.description }}</p>
            <p class="text-gray-700 font-bold mt-2">
              {{ formattedPrice(product) }}
            </p>
            <div class="flex justify-center mt-4">
              <div
                class="flex items-center bg-gray-100 p-2 rounded-xl shadow-md"
              >
                <button
                  @click="decreaseCount(index)"
                  class="btn cursor-pointer"
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="text-xl font-semibold mx-4 w-8 text-center">
                  {{ productCounts[index] ? productCounts[index] : 0 }}
                </span>
                <button
                  @click="increaseCount(index)"
                  class="btn cursor-pointer"
                >
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsView",
  data() {
    return {
      products: [],
      index: 0,
      productCounts: {},
      filters: {
        priceMin: 0,
        priceMax: 100000,
        manufacturer: "",
        volume: "",
        weight: "",
      },
    };
  },
  computed: {
    categorizedProducts() {
      const uniqueProducts = this.products.reduce((acc, item) => {
        if (!acc.find((p) => p.name === item.name)) {
          acc.push(item);
        }
        return acc;
      }, []);

      return uniqueProducts.filter((product) => {
        const finalPrice =
          product.description.price - (product.description.discount || 0);

        return (
          finalPrice >= this.filters.priceMin &&
          finalPrice <= this.filters.priceMax &&
          (this.filters.manufacturer
            ? product.manufacturer?.includes(this.filters.manufacturer)
            : true) &&
          (this.filters.volume
            ? product.volume === this.filters.volume
            : true) &&
          (this.filters.weight ? product.weight === this.filters.weight : true)
        );
      });
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
      }
    },

    addToCart(product, index) {
      this.$store.dispatch("addToCart", {
        product,
        count: this.productCounts[index] || 1,
      });
    },

    clearFilters() {
      this.filters = {
        priceMin: 0,
        priceMax: 1000000,
        manufacturer: "",
        volume: "",
        weight: "",
      };
    },
  },
  mounted() {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      })
      .catch((error) => console.error("Error loading products:", error));
  },
};
</script>

<style scoped>
.products-wrapper {
  width: 100%;
  background-color: #f8f8f8;
  padding: 80px 0;
}

.container {
  display: flex;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
}

.filters {
  width: 25%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.filters input {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-clear {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-clear:hover {
  background: #d64040;
}

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

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
  }
  .filters,
  .product-list {
    width: 100%;
  }
}
</style>
