<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const isSelected = (name: string): boolean => {
  return route.name === name;
};
const router = useRouter();
const navigate = (name: string) => {
  if (route.name !== name) {
    router.push({ name });
  }
};
</script>

<template>
  <nav class="nav">
    <div class="nav-links">
      <div class="nav-link" @click="navigate('Home')">
        <i class="pi pi-clock" :class="{ selected: isSelected('Home') }"></i>
      </div>
      <div class="nav-link" @click="navigate('TimePeriods')">
        <i
          class="pi pi-list"
          :class="{ selected: isSelected('TimePeriods') }"
        ></i>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100vw;
  padding: 0.5rem;
  border-top: 1px #242424 solid;
  background-color: var(--indigo-400);
}
.nav-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 2px;
}
.nav-links {
  list-style: none;
}
.nav-link:hover {
  cursor: pointer;
  color: #fff;
}
.nav-link i {
  font-size: 1.5rem;
  text-align: center;
}
.selected {
  color: #fff;
}
</style>
