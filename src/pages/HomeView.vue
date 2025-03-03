<template>
  <header>
    <div class="home-warapper">
      <div class="box">
        <h1>Pharmacy</h1>
        <p>
          Pharmacy is a leading provider of prescription drugs and
          over-the-counter medications. We are dedicated to providing you with
          the best products and services to meet your needs.
        </p>
        <button class="btn">Get Started</button>
      </div>
    </div>
    <div class="bacColor"></div>
  </header>
  <section class="w-full p-10">
    <HomeItemCard />
  </section>
  <section class="w-full bg-[#6db460] py-16 px-10 text-center">
    <HomeItemMain />
  </section>
  <section>
    <HomeItemFooter />
  </section>
</template>

<script>
import HomeItemCard from "@/components/common/HomeItemCard.vue";
import HomeItemFooter from "@/components/common/HomeItemFooter.vue";
import HomeItemMain from "@/components/common/HomeItemMain.vue";

export default {
  name: "HomeView",
  components: {
    HomeItemCard,
    HomeItemMain,
    HomeItemFooter,
  },
};
</script>

<style scoped>
.home-warapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  background-image: url("../assets/imges-1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.box {
  width: 600px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  z-index: 2;
  left: 70px;
}
.box h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}
.box p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.box button {
  font-size: 1.2rem;
  cursor: pointer;
}
.bacColor {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    -90deg,
    rgba(12, 12, 12, 0) 0%,
    #74b929 180%
  );
  z-index: 1;
}
</style>
