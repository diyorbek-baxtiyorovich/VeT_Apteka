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
    const itemIndex = cart.value.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      if (cart.value[itemIndex].count > 1) {
        cart.value[itemIndex].count -= 1;
      } else {
        cart.value.splice(itemIndex, 1);
      }
    }
  }

  return { cart, cartCount, addToCart, removeFromCart };
});
