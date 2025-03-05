import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: null,
    avatar: null,
    email: null,
    isLoggedIn: false,
  }),
  actions: {
    login(userData) {
      this.name = userData.name;
      this.avatar = userData.avatar;
      this.email = userData.email;
      this.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(userData));
    },
    logout() {
      this.name = null;
      this.avatar = null;
      this.email = null;
      this.isLoggedIn = false;
    },
    checkUser() {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        this.login(storedUser);
      }
    },
  },
});
