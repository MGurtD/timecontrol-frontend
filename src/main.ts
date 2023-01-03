import { App as VueApp, createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
  ],
});

const app: VueApp<Element> = createApp(App).use(router);

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

app.use(PrimeVue);
app.use(ToastService);

app.component("Toast", Toast);

app.mount("#app");
