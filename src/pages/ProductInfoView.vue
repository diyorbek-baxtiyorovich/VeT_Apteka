<template>
  <div class="product-info py-10">
    <div class="container">
      <div v-if="product" class="product-info-wrapper">
        <div class="product-info-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info-content">
          <h1>{{ product.name }}</h1>
          <p>{{ product.description.description }}</p>
          <p><strong>Narx:</strong> {{ formattedPrice }}</p>
          <button class="btn" @click="addToCart">Korzinkaga qo'shish</button>
        </div>
      </div>
      <div v-else>
        <p>Mahsulot topilmadi</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      products: [],
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
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", { product: this.product, count: 1 });
    },
    fetchProduct() {
      fetch("/db.json")
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
          this.product = this.products.find(
            (p) => p.id == this.$route.params.id
          );
          console.log("Mahsulot topildi:", this.product);
        })
        .catch((error) =>
          console.error("Mahsulotni yuklashda xatolik:", error)
        );
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
  background-color: #f5f5f5;
  padding-top: 100px;
}
.container {
  width: 100%;
  max-width: 1200px;
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
</style>
