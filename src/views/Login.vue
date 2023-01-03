<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import LoginForm from "../components/LoginForm.vue";
import { Enterprise, UserLogin } from "../types";
import { getEnterprises } from "../api/enterprise.api";
import { login } from "../api/user.api";
const router = useRouter();
const toast = useToast();

const enterprises = ref([] as Array<Enterprise>);
onMounted(async () => {
  let response = await getEnterprises();
  enterprises.value = response.data;
  console.log(enterprises);
});

const submitHandler = async (user: UserLogin) => {
  try {
    const response = await login(user);
    localStorage.setItem("timecontrol.user", JSON.stringify(response.data));
    router.push({ name: "Home" });
  } catch (err) {
    toast.add({
      severity: "error",
      detail: "Incorrect login",
      closable: false,
      life: 5000,
    });
  }
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
