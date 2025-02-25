<template>
  <div>
    <NavbarItem />
    <div class="home-app">
      <div class="block-app">
        <div class="input-container">
          <form @submit.prevent="searchByPNFL" class="form">
            <div>
              <label for="pnfl">PNFL</label>
              <input
                v-model="searchPNFL"
                type="text"
                id="pnfl"
                class="form-control border border-black-300 rounded-md outline-none"
              />
            </div>
            <button
              type="submit"
              class="py-2 bg-blue-500 text-white rounded-md cursor-pointer w-1/5"
            >
              Izlash
            </button>
          </form>
        </div>

        <div class="info-container">
          <div v-if="foundData" class="info-personalty">
            <h2>Doimiy ro'yxatdan o'tish</h2>
            <div class="info-personalty__item">
              <span>Cadastir Raqami:</span>
              <span>{{ foundData.Data.PermanentRegistration.Cadastre }}</span>
            </div>
            <div class="info-personalty__item">
              <span>Manzil:</span>
              <span>{{ foundData.Data.PermanentRegistration.Address }}</span>
            </div>

            <h2>Vaqtinchalik ro'yxatga olish</h2>
            <div
              v-for="(tempReg, index) in foundData.Data.TemproaryRegistrations"
              :key="index"
              class="info-personalty__item"
            >
              <span>Cadastir Raqami:</span>
              <span>{{ tempReg.Cadastre }}</span>
            </div>
            <div class="info-personalty__item">
              <span>Manzil:</span>
              <span>{{
                foundData.Data.TemproaryRegistrations[0]?.Address
              }}</span>
            </div>
          </div>

          <div v-if="foundCar" class="info-car">
            <h2>Avtomobil ma'lumotlari</h2>
            <div class="info-personalty__item">
              <span>Model:</span>
              <span>{{ foundCar.MODEL }}</span>
            </div>
            <div class="info-personalty__item">
              <span>Davlat Raqami:</span>
              <span>{{ foundCar.GOS_NUMBER }}</span>
            </div>
            <div class="info-personalty__item">
              <span>Rang:</span>
              <span>{{ foundCar.COLOR }}</span>
            </div>
            <div class="info-personalty__item">
              <span>Ro'yxatga olingan sana:</span>
              <span>{{ foundCar.REG_DATE }}</span>
            </div>
          </div>

          <div
            v-if="!foundData && searchPNFL"
            class="text-center text-red-500 mt-5"
          >
            Ma'lumot topilmadi!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import NavbarItem from "@/components/common/NavbarItem.vue";

export default {
  name: "HomeApp",
  components: { NavbarItem },
  setup() {
    const searchPNFL = ref(""); // PNFL uchun input
    const foundData = ref(null);
    const foundCar = ref(null);

    const searchByPNFL = async () => {
      try {
        // Doimiy va vaqtinchalik ro'yxat ma'lumotlari
        const usersResponse = await axios.get("http://localhost:3000/users");
        foundData.value =
          usersResponse.data.find((user) => user.PNFL === searchPNFL.value) ||
          null;

        // Avtomobil ma'lumotlari
        const carsResponse = await axios.get("http://localhost:3000/cars");
        foundCar.value =
          carsResponse.data.find((car) => car.PNFL === searchPNFL.value) ||
          null;
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    return { searchPNFL, foundData, foundCar, searchByPNFL };
  },
};
</script>
