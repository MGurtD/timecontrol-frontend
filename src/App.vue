<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Login from "./views/Login.vue";
import MobileHeader from "./components/MobileHeader.vue";
import MobileNav from "./components/MobileNav.vue";
import { USER_KEY } from "./utils/constants";

const router = useRouter();
const isLogged = ref(false);

onMounted(() => {
  const userData = localStorage.getItem(USER_KEY);
  isLogged.value = userData != null;
});

const logoutHandler = () => {
  localStorage.removeItem(USER_KEY);
  router.push({ name: "Login" });
};
</script>

<template>
  <div v-if="isLogged">
    <MobileHeader @logout="logoutHandler" />
    <router-view></router-view>
    <MobileNav />
  </div>
  <div v-else>
    <Login />
  </div>
</template>
