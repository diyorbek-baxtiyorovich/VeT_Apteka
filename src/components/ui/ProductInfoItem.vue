<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Mahsulotlar</h2>
    <div v-if="products.length > 0">
      <div
        v-for="product in products"
        :key="product.id"
        class="border p-4 mb-2 rounded-lg shadow-md"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-32 h-32 object-cover rounded-lg mb-2"
        />
        <h3 class="font-semibold text-lg">{{ product.name }}</h3>
        <p class="text-gray-500">{{ product.style }}</p>
        <p class="text-green-600 font-bold">
          {{ product.description.price }} so'm
          <span
            v-if="product.description.discount > 0"
            class="line-through text-red-500 ml-2"
          >
            {{ product.description.price + product.description.discount }} so'm
          </span>
        </p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Sotib olish
        </button>
      </div>
    </div>
    <p v-else>Mahsulotlar mavjud emas</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Multivitamin kompleksi",
          style: "It va mushuklar uchun kuchaytiruvchi vitaminlar",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcHS7hv0swre5mJJ9YzBWFC-27Cca3GuqpDrbYre0gqUq1jMjfZVgFWLp0sq6Hg4SO6WQ&usqp=CAU",
          onSale: true,
          description: {
            price: 25000,
            discount: 5000,
            description:
              "Hayvonlar immunitetini oshiruvchi muhim vitaminlar kompleksi.",
          },
        },
        {
          id: 2,
          name: "ImmunoBoost",
          style: "Mushuk va itlar uchun immunitet ko'taruvchi vosita",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH4I2ikaONGnNZQUfjV25gxXyDkqyoqFr0tw&s",
          onSale: false,
          description: {
            price: 40000,
            discount: 0,
            description: "Infeksiyalarga qarshi chidamlilikni oshiruvchi dori.",
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.border {
  border: 1px solid #ddd;
}
</style>
