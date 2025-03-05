<template>
  <div class="products-wrapper">
    <div class="containers">
      <Filters :filters="filters" @update-filters="updateFilters" />
      <ProductList :products="categorizedProducts" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/counter";
import Filters from "@/components/common/ProductItemFilter.vue";
import ProductList from "@/components/common/ProductItemList.vue";

const cartStore = useCartStore();
const products = ref([]);
const filters = ref({
  priceMin: 0,
  priceMax: 100000,
  manufacturer: "",
  volume: "",
});

const categorizedProducts = computed(() => {
  const uniqueProducts = products.value.reduce((acc, item) => {
    if (!acc.find((p) => p.name === item.name)) {
      acc.push(item);
    }
    return acc;
  }, []);

  return uniqueProducts.filter((product) => {
    const finalPrice =
      product.description.price - (product.description.discount || 0);
    return (
      finalPrice >= filters.value.priceMin &&
      finalPrice <= filters.value.priceMax &&
      (filters.value.manufacturer
        ? product.manufacturer?.includes(filters.value.manufacturer)
        : true) &&
      (filters.value.volume ? product.volume === filters.value.volume : true)
    );
  });
});

const updateFilters = (newFilters) => {
  filters.value = newFilters;
};

const addToCart = ({ product, count }) => {
  cartStore.addToCart(product, count);
};

onMounted(() => {
  fetch("/db.json")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
    })
    .catch((error) => console.error("Error loading product:", error));
});
</script>

<style scoped>
.products-wrapper {
  width: 100%;
  background-color: #f8f8f8;
  padding: 80px 0;
}

.containers {
  display: flex;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .containers {
    flex-direction: column;
  }
  .filters,
  .product-list {
    width: 100%;
  }
}
</style>
