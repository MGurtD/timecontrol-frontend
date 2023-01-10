<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { useToast } from "primevue/usetoast";
import LoginForm from "../components/LoginForm.vue";
import { Enterprise, UserLogin } from "../types";
import { getEnterprises } from "../api/enterprise.api";
const store = useStore();
const router = useRouter();
const toast = useToast();

const enterprises = ref([] as Array<Enterprise>);
onMounted(async () => {
  let response = await getEnterprises();
  enterprises.value = response.data;
});

const submitHandler = async (user: UserLogin) => {
  await store.login(user);
  if (store.isLogged) {
    router.push({ name: "Home" });
  } else {
    toast.add({
      severity: "error",
      summary: "Login incorrecte",
      detail: "Les credencials introduides no són vàlides",
      closable: false,
      life: 5000,
    });
  }
};
</script>

<template>
  <div class="login">
    <img class="logo" src="../assets/images/logo.png" />
    <h3>Timecontrol</h3>
    <LoginForm :enterprises="enterprises" @submit="submitHandler" />
  </div>
</template>

<style scoped>
.login {
  text-align: center;
}
.logo {
  max-width: 256px;
  width: 40vw;
}
</style>
