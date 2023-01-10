<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "./store";
import MobileHeader from "./components/MobileHeader.vue";
import MobileNav from "./components/MobileNav.vue";

const store = useStore();
const router = useRouter();

const logoutHandler = () => {
  store.logout();
  router.push({ name: "Login" });
};
</script>

<template>
  <MobileHeader v-if="store.isLogged" @logout="logoutHandler" />
  <router-view></router-view>
  <MobileNav v-if="store.isLogged" />
  <Toast position="top-center" />
</template>
