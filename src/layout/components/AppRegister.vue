<template>
  <div class="wrapper">
    <h2>Registration</h2>
    <form @submit.prevent="registerUser">
      <div class="input-box">
        <input
          type="text"
          v-model="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="input-box">
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="input-box">
        <input
          type="password"
          v-model="password"
          placeholder="Create password"
          required
        />
      </div>
      <div class="input-box">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <p v-if="passwordMismatch" class="error">Passwords do not match</p>
      </div>
      <div class="policy">
        <input type="checkbox" v-model="acceptedTerms" />
        <h3>I accept all terms & conditions</h3>
      </div>
      <div class="input-box button">
        <input type="submit" value="Register Now" :disabled="!canSubmit" />
      </div>
      <div class="text">
        <h3>
          Already have an account?
          <router-link to="/login">Login now</router-link>
        </h3>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptedTerms = ref(false);
const userStore = useUserStore();
const router = useRouter();

const passwordMismatch = computed(
  () => password.value !== confirmPassword.value
);

const canSubmit = computed(
  () =>
    name.value &&
    email.value &&
    password.value &&
    !passwordMismatch.value &&
    acceptedTerms.value
);

const registerUser = () => {
  if (!canSubmit.value) return;

  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  };

  localStorage.setItem("user", JSON.stringify(userData));

  userStore.login(userData);
  router.push("/");
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
.wrapper {
  margin: 80px auto;
  position: relative;
  max-width: 430px;
  width: 100%;
  background: #fff;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.wrapper h2 {
  position: relative;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}
.wrapper h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 28px;
  border-radius: 12px;
  background: #4070f4;
}
.wrapper form {
  margin-top: 30px;
}
.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}
form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #c7bebe;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.input-box input:focus,
.input-box input:valid {
  border-color: #4070f4;
}
form .policy {
  display: flex;
  align-items: center;
}
form h3 {
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}
.input-box.button input {
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
}
.input-box.button input:hover {
  background: #0e4bf1;
}
form .text h3 {
  color: #333;
  width: 100%;
  text-align: center;
}
form .text h3 a {
  color: #4070f4;
  text-decoration: none;
}
form .text h3 a:hover {
  text-decoration: underline;
}
</style>
