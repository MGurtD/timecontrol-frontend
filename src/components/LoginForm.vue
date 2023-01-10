<script setup lang="ts">
import { ref, PropType } from "vue";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { Enterprise, UserLogin } from "../types";

defineProps({
  enterprises: Array as PropType<Array<Enterprise>>,
});

const user = ref({
  username: "",
  password: "",
  enterprise: "",
} as UserLogin);

const toast = useToast();

const emit = defineEmits(["submit"]);

const validateForm = (): string => {
  if (user.value.username.length == 0) {
    return "Introduzca el usuario";
  }

  if (user.value.password.length == 0) {
    return "Introduzca la contraseña";
  }

  return "";
};

const submitHandler = () => {
  const validation = validateForm();
  if (validation.length > 0) {
    toast.add({
      severity: "warn",
      summary: "Formulario inválido",
      detail: validation,
      life: 3000,
      closable: false,
    });
    return;
  }

  emit("submit", user.value);
};
</script>

<template>
  <form class="login-form">
    <div class="p-inputgroup login-form-field">
      <span class="p-inputgroup-addon">
        <i class="pi pi-building"></i>
      </span>
      <Dropdown
        aria-labelledby="enterprise"
        v-model="user.enterprise"
        :options="enterprises"
        optionLabel="name"
        optionValue="id"
        placeholder="Empresa"
      />
    </div>

    <div class="p-inputgroup login-form-field">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText
        aria-labelledby="username"
        placeholder="Usuario"
        v-model="user.username"
      />
    </div>

    <div class="p-inputgroup login-form-field">
      <span class="p-inputgroup-addon">
        <i class="pi pi-key"></i>
      </span>
      <Password
        aria-labelledby="password"
        placeholder="Contraseña"
        v-model="user.password"
        :feedback="false"
      />
    </div>

    <Button class="login-form-button" @click="submitHandler"
      >Iniciar sesión</Button
    >
  </form>
</template>

<style scoped>
.login-form {
  width: 85vw;
}
.login-form-field {
  margin: 0.5rem;
  text-align: left;
}
.login-form-button {
  display: block !important;
  margin: 0.5rem;
  width: 85vw;
}
</style>
