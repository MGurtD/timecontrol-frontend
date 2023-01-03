<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
import { useRouter } from "vue-router";

const submitHandler = () => {
  useRouter().push({ name: "Home" });
};
</script>

<template>
  <div class="login">
    <img class="logo" src="../assets/images/logo.png" />
    <h3>Timecontrol Login</h3>
    <LoginForm @submit="submitHandler" />
  </div>
</template>

<style scoped>
.logo {
  max-width: 256px;
  width: 40vw;
}
</style>
