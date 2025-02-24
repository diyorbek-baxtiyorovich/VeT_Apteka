import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const cartCount = computed(() =>
    cart.value.reduce((total, item) => total + item.count, 0)
  );

  function addToCart(product, count = 1) {
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.count += count;
    } else {
      cart.value.push({ ...product, count });
    }
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter((item) => item.id !== productId);
  }

  return { cart, cartCount, addToCart, removeFromCart };
});
