import { App as VueApp, createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import TimePeriods from "./views/TimePeriods.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    { path: "/user-timeperiods", name: "TimePeriods", component: TimePeriods },
  ],
});

const pinia = createPinia();
const app: VueApp<Element> = createApp(App).use(router).use(pinia);

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

app.use(PrimeVue);
app.use(ToastService);

app.component("Toast", Toast);

app.mount("#app");
