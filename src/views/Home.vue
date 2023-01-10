<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Button from "primevue/button";
import { Enterprise, TimePeriod, User } from "../types";
import { useRouter } from "vue-router";
import { getEnterprise } from "../api/enterprise.api";
import {
  getTimePeriodsByUserId,
  createTimePeriod,
  updateTimePeriod,
} from "../api/timeperiod.api";
import { calculateDifferenceBetweenTimes } from "../utils/functions";
import * as constants from "../utils/constants";

const user = ref(null as User | null);
const enterprise = ref(null as Enterprise | null);
const currentDate = ref(null as string | null);
const timePeriods = ref([] as Array<TimePeriod>);
const currentTimePeriod = ref(null as TimePeriod | null);
const difference = ref("");

let intervalId: number = 0;
const router = useRouter();
onMounted(async () => {
  setCurrentDateAndDifference();

  const localStorageUser = localStorage.getItem(constants.USER_KEY);
  if (localStorageUser != null) {
    user.value = JSON.parse(localStorageUser);

    await fetchData();
    intervalId = setInterval(setCurrentDateAndDifference, 1000);
  } else {
    router.push({ name: "Login" });
  }
});
onUnmounted(() => {
  if (intervalId > 0) clearInterval(intervalId);
});

const fetchData = async () => {
  let response = await getEnterprise(user.value?.enterpriseId as string);
  enterprise.value = response.data;

  response = await getTimePeriodsByUserId(user.value?.id as string);
  timePeriods.value = response.data;

  const searchedTimePeriod = timePeriods.value.find(
    (t) => t.updatedAt === null
  );
  currentTimePeriod.value = searchedTimePeriod || null;
};

const setCurrentDateAndDifference = () => {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" })
  );
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  currentDate.value = now.toLocaleString("es-ES", options);

  if (currentTimePeriod.value !== undefined) {
    const currentInMs = new Date(
      currentTimePeriod.value?.createdOn as string
    ).getTime();
    const nowInMs = new Date().getTime();

    difference.value = calculateDifferenceBetweenTimes(nowInMs, currentInMs);
  }
};

const openTimePeriod = async () => {
  await createTimePeriod({ userId: user.value?.id });
  await fetchData();
};
const closeTimePeriod = async () => {
  const timePeriod = currentTimePeriod.value as TimePeriod;
  await updateTimePeriod(timePeriod);
  await fetchData();
};
</script>

<template>
  <main class="home">
    <div v-if="enterprise">
      <h3>{{ `${enterprise?.name}` }}</h3>
      <h3>{{ `${user?.name} ${user?.surnames}` }}</h3>
      <p>{{ currentDate }}</p>
    </div>

    <div v-if="currentTimePeriod">
      <p>{{ difference }}</p>
      <Button class="p-button-danger" @click="closeTimePeriod"
        >Finalizar Fichada</Button
      >
    </div>
    <div v-else>
      <Button class="p-button-success" @click="openTimePeriod"
        >Iniciar Fichada</Button
      >
    </div>
  </main>
</template>
