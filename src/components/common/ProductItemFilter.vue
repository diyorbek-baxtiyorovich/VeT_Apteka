<template>
  <div class="filters">
    <h2 class="text-lg font-bold mb-4">Filtr</h2>

    <label class="block">Narxi (sum):</label>
    <div class="flex gap-2">
      <input
        v-model="localFilters.priceMin"
        type="number"
        class="border p-2 rounded w-1/2"
      />
      <input
        v-model="localFilters.priceMax"
        type="number"
        class="border p-2 rounded w-1/2"
      />
    </div>

    <label class="block mt-2">Ishlab chiqaruvchi:</label>
    <input
      v-model="localFilters.manufacturer"
      type="text"
      class="border p-2 rounded w-full"
    />

    <label class="block mt-2">Hajmi:</label>
    <input
      v-model="localFilters.volume"
      type="text"
      class="border p-2 rounded w-full"
    />

    <button @click="clearFilters" class="btn-clear">Очистить фильтр</button>
  </div>
</template>

<script>
export default {
  props: {
    filters: Object,
  },
  data() {
    return {
      localFilters: { ...this.filters },
    };
  },
  watch: {
    localFilters: {
      handler(newFilters) {
        this.$emit("update-filters", newFilters);
      },
      deep: true,
    },
  },
  methods: {
    clearFilters() {
      this.localFilters = {
        priceMin: 0,
        priceMax: 1000000,
        manufacturer: "",
        volume: "",
      };
      this.$emit("update-filters", this.localFilters);
    },
  },
};
</script>
<style>
.filters {
  width: 25%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.filters input {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-clear {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-clear:hover {
  background: #d64040;
}
</style>
