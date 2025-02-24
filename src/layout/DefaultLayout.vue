<template>
  <div>
    <AppNavbar />
    <RouterView />
  </div>
</template>

<script>
import AppNavbar from "@/layout/components/AppNavbar.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    AppNavbar,
    RouterView,
  },
};
</script>

<style scoped></style>
