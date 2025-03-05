import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const cartCount = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0)
  );

  function addToCart(product, quantity = 1) {
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        quantity: quantity,
      });
    }
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter((item) => item.id !== productId);
  }

  watch(
    cart,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true }
  );

  return { cart, cartCount, addToCart, removeFromCart };
});
