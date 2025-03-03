<template>
  <div class="about">
    <header>
      <div class="container">
        <div class="about_text">
          <h1>Pharmacy About</h1>
          <p>
            Pharmacy is a respected industry leader and trusted partner
            providing a comprehensive range of agricultural solutions.
          </p>
          <button>Read More</button>
        </div>
      </div>
    </header>
    <section>
      <AboutItemCart />
    </section>
  </div>
</template>

<script setup>
import AboutItemCart from "@/components/ui/AboutItemCart.vue";
</script>

<style scoped>
.about {
  width: 100%;
  height: auto;
}
.about header {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bacround_about.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.about_text {
  width: 100%;
  height: auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.about_text h1 {
  color: #fff;
  font-size: 6rem;
  font-weight: bold;
  letter-spacing: 2px;
}
.about_text p {
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 20px 0;
}
.about_text button {
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  background-color: #6db460;
  padding: 10px 20px;
  border: 1px solid #6db460;
  border-radius: 5px;
  cursor: pointer;
}
</style>
