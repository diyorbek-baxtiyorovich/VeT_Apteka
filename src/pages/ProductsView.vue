<template>
  <div class="products-wrapper">
    <div class="containers">
      <Filters :filters="filters" @update-filters="updateFilters" />
      <ProductList :products="categorizedProducts" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script>
import Filters from "@/components/common/ProductItemFilter.vue";
import ProductList from "@/components/common/ProductItemList.vue";

export default {
  name: "ProductsView",
  components: {
    Filters,
    ProductList,
  },
  data() {
    return {
      products: [],
      filters: {
        priceMin: 0,
        priceMax: 100000,
        manufacturer: "",
        volume: "",
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
          (this.filters.volume ? product.volume === this.filters.volume : true)
        );
      });
    },
  },
  methods: {
    updateFilters(newFilters) {
      this.filters = newFilters;
    },
    addToCart({ product, count }) {
      this.$store.dispatch("addToCart", { product, count });
    },
  },
  mounted() {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      })
      .catch((error) => console.error("Error loading products:", error));

    console.log("Route params:", this.$route.params); // Bu yerda `id` kelayotganini tekshiramiz
  },
};
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
