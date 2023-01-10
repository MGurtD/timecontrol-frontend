<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTimePeriodsByUserId } from "../api/timeperiod.api";
import { useStore } from "../store";
import { TimePeriod, User } from "../types";

const timePeriods = ref(null as Array<TimePeriod> | null);
const store = useStore();

onMounted(async () => {
  const user = store.getUser as User;
  const response = await getTimePeriodsByUserId(user.id);
  timePeriods.value = response.data;
});
</script>

<template>
  <h1>TimePeriods</h1>
  <pre v-if="timePeriods">{{ timePeriods }}</pre>
</template>

<style scoped></style>
