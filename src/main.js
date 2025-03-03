import "./assets/main.css";

import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify();

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);

app.mount("#app");
