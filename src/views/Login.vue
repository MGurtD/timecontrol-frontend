<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getEnterprises } from "../api/enterprise.api";
import LoginForm from "../components/LoginForm.vue";
import { useRouter } from "vue-router";
import { Enterprise, User } from "../types";
const router = useRouter();

const enterprises = ref([] as Array<Enterprise>);
onMounted(async () => {
  let response = await getEnterprises();
  enterprises.value = response.data;
  console.log(enterprises);
});

const submitHandler = (user: User) => {
  console.log(user);
  router.push({ name: "Home" });
};
</script>

<template>
  <div class="login">
    <img class="logo" src="../assets/images/logo.png" />
    <h3>Timecontrol Login</h3>
    <LoginForm :enterprises="enterprises" @submit="submitHandler" />
  </div>
</template>

<style scoped>
.logo {
  max-width: 256px;
  width: 40vw;
}
</style>
