<template>
  <div class="cart">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 px-10 py-10">
          <h1 class="text-2xl font-semibold mb-4">
            {{ cartItems.length }} Item in your Cart
          </h1>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white px-4 py-4 rounded-lg shadow-md mb-4 flex items-center"
          >
            <img
              :src="item.image"
              alt="Product"
              class="w-24 h-24 object-cover rounded-md"
            />

            <div class="flex-1 ml-4">
              <h2 class="text-lg font-semibold">{{ item.name }}</h2>
              <p class="text-sm text-gray-500">{{ item.description }}</p>
              <p class="text-lg font-bold text-red-600">
                {{ item.discountedPrice }} so'm
                <span class="text-gray-400 line-through"
                  >{{ item.originalPrice }} so'm</span
                >
                <span class="text-sm text-green-600"
                  >{{
                    ((item.discount / item.originalPrice) * 100).toFixed(0)
                  }}% OFF</span
                >
              </p>
              <p class="text-sm text-gray-500">
                Delivery: Today, 6:00 pm - 10:00 pm
              </p>
            </div>

            <div class="text-right">
              <button @click="removeItem(item.id)" class="text-red-500 text-lg">
                <i class="fas fa-trash"></i>
              </button>
              <div class="mt-2">
                <label class="text-sm">Qty</label>
                <input
                  type="number"
                  v-model="item.quantity"
                  class="border p-1 w-12 text-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white px-6 py-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Cart Total</h2>
          <p class="flex justify-between">
            <span>Total MRP:</span> <span>{{ totalMRP }} so'm</span>
          </p>
          <p class="flex justify-between text-green-600">
            <span>Discount:</span> <span>- {{ totalDiscount }} so'm</span>
          </p>
          <p class="flex justify-between">
            <span>Delivery Charges:</span> <span>{{ deliveryCharge }}</span>
          </p>
          <hr class="my-2" />
          <p class="flex justify-between font-bold text-lg">
            <span>Amount to Pay:</span> <span>{{ totalPayable }} so'm</span>
          </p>

          <button class="btn" @click="cartStore.checkout">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/counter";

const cartStore = useCartStore();
const cartItems = computed(() =>
  cartStore.cart.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    originalPrice: item.description.price,
    discount: item.description.discount,
    discountedPrice: item.description.price - item.description.discount,
    description: item.description.description,
    quantity: item.quantity || 1,
  }))
);

const removeItem = (id) => {
  cartStore.removeFromCart(id);
};

const totalMRP = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  )
);
const totalDiscount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.discount * item.quantity, 0)
);
const totalPayable = computed(() => totalMRP.value - totalDiscount.value);
const deliveryCharge = computed(() =>
  totalPayable.value > 50000 ? "Free" : "20000 so'm"
);
</script>

<style scoped>
.cart {
  width: 100%;
  height: auto;
  padding-top: 100px;
}
.container {
  background-color: #f6f7fb;
  max-width: 1200px;
  padding: 30px;
  border-radius: 20px;
}
.btn {
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}
</style>
