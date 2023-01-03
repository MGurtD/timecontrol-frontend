<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const enterprise = ref("");
const enterprises = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

const emit = defineEmits(["submit"]);

const submitHandler = () => {
  emit("submit");
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
        v-model="enterprise"
        :options="enterprises"
        optionLabel="name"
        optionValue="code"
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
        v-model="username"
      />
    </div>

    <div class="p-inputgroup login-form-field">
      <span class="p-inputgroup-addon">
        <i class="pi pi-key"></i>
      </span>
      <InputText
        aria-labelledby="password"
        placeholder="Password"
        v-model="password"
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
