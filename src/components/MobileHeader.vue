<script setup lang="ts">
import { defineEmits } from "vue";

const emits = defineEmits(["logout"]);

const emitLogout = () => {
  emits("logout");
};
</script>

<template>
  <header class="header">
    <div class="header-text">
      <img class="header-logo" src="../assets/images/logo.png" />
      Timecontrol
      <i class="header-logout pi pi-sign-out" @click="emitLogout" />
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5rem;
  width: 100vw;
  padding: 0.8rem;
  border-bottom: 1px #242424 solid;
  background-color: var(--indigo-400);
}
.header-logo {
  position: fixed;
  left: 10px;
  width: 32px;
}
.header-text {
  font-size: 1.3rem;
  text-align: center;
}
.header-logout {
  position: fixed;
  right: 10px;
  font-size: 24px;
}
.header-logout:hover {
  cursor: pointer;
  color: #fff;
}
</style>
