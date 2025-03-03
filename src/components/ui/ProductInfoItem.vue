<template>
  <div class="product-info_act">
    <div class="faq-container">
      <div class="faq">
        <h2 class="text-2xl font-semibold mb-4 text-center">Mahsulot haqida</h2>
        <div v-if="product" class="faq-content">
          <p><strong>Nomi:</strong> {{ product.name }}</p>
          <p><strong>Kategoriya:</strong> {{ product.category }}</p>
          <p><strong>Og'irligi:</strong> {{ product.weight }}</p>
          <p><strong>Ishlab chiqaruvchi:</strong> {{ product.manufacturer }}</p>
          <p>
            <strong>Kelib chiqish mamlakati:</strong>
            {{ product.country_of_origin }}
          </p>
          <p><strong>Qo'llanilishi:</strong> {{ product.usage }}</p>
          <p><strong>Tarkibi:</strong> {{ product.ingredients }}</p>
          <p>
            <strong>Saqlash sharoiti:</strong> {{ product.storage_conditions }}
          </p>
          <p><strong>Narxi:</strong> {{ formattedPrice }}</p>
          <p><strong>Tavsif:</strong> {{ product.description.description }}</p>
        </div>
        <p v-else>Mahsulot yuklanmoqda...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);
const formattedPrice = ref("");

const fetchProduct = async () => {
  try {
    const response = await fetch("/db.json");
    const data = await response.json();

    product.value = data.find((p) => p.id == route.params.id);

    if (product.value) {
      const finalPrice =
        product.value.description.price -
        (product.value.description.discount || 0);
      formattedPrice.value = `${finalPrice} сум`;
    }

    console.log("Mahsulot topildi:", product.value);
  } catch (error) {
    console.error("Mahsulotni yuklashda xatolik:", error);
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.product-info_act {
  width: 100%;
  height: auto;
  padding: 50px 0;
}
.faq-container {
  width: 80%;
  max-width: 1200px;
  margin: auto;
}
.faq {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
}
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.faq-content p {
  margin-bottom: 10px;
  font-size: 18px;
}
.faq-content p strong {
  color: #ff4d4d;
}

.active,
.accordion:hover {
  background-color: #eee;
}

.panel {
  padding: 0 18px;
  background-color: white;
  overflow: hidden;
}
</style>
