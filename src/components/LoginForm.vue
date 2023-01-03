<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { Enterprise, User } from "../types";

defineProps({
  enterprises: Array as PropType<Array<Enterprise>>,
});

const user = ref({
  username: "",
  password: "",
  enterprise: "",
} as User);

const toast = useToast();

const emit = defineEmits(["submit"]);

const validateForm = (): string => {
  if (user.value.username.length == 0) {
    return "Fill the username, please";
  }

  if (user.value.password.length == 0) {
    return "Fill the password, please";
  }

  return "";
};

const submitHandler = () => {
  const validation = validateForm();
  if (validation.length > 0) {
    toast.add({
      severity: "warn",
      summary: "Invalid Form",
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
  <Toast />
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
        placeholder="Select an enterprise"
      />
    </div>

    <div class="p-inputgroup login-form-field">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText
        aria-labelledby="username"
        placeholder="Username"
        v-model="user.username"
      />
    </div>

    <div class="p-inputgroup login-form-field">
      <span class="p-inputgroup-addon">
        <i class="pi pi-key"></i>
      </span>
      <InputText
        aria-labelledby="password"
        placeholder="Password"
        v-model="user.password"
      />
    </div>

    <Button class="login-form-button" @click="submitHandler">Submit</Button>
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
