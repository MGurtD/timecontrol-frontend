<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import Button from "primevue/button";
import MobileHeader from "../components/MobileHeader.vue";
import MobileNav from "../components/MobileNav.vue";
import { Enterprise, TimePeriod, User } from "../types";
import { useRouter } from "vue-router";
import { getEnterprise } from "../api/enterprise.api";
import {
  getTimePeriodsByUserId,
  createTimePeriod,
  updateTimePeriod,
} from "../api/timeperiod.api";

const user = ref(null as User | null);
const enterprise = ref(null as Enterprise | null);
const currentDate = ref(null as string | null);
const timePeriods = ref([] as Array<TimePeriod>);
const currentTimePeriod = ref(null as TimePeriod | null);
const difference = ref("");

let intervalId: number;
const router = useRouter();
onMounted(async () => {
  intervalId = setInterval(setCurrentDate, 1000);

  const localStorageUser = localStorage.getItem("timecontrol.user");
  if (localStorageUser != null) {
    user.value = JSON.parse(localStorageUser);

    await fetchData();
  } else {
    router.push({ name: "Login" });
  }
});
onUnmounted(() => {
  clearInterval(intervalId);
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

function humanDiff(Current: number, Target: number) {
  let CalcTime = Current - Target; // Current - Initiallized

  let Years = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
  CalcTime -= Years * (1000 * 60 * 60 * 24 * 7 * 4 * 12);
  let Months = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4);
  CalcTime -= Months * (1000 * 60 * 60 * 24 * 7 * 4);
  let Weeks = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7);
  CalcTime -= Weeks * (1000 * 60 * 60 * 24 * 7);
  // The calculation seconds to days works properly & The calculation of weeks to years may be off slightly
  let Days = Math.floor(CalcTime / 1000 / 60 / 60 / 24);
  CalcTime -= Days * (1000 * 60 * 60 * 24);
  let Hours = Math.floor(CalcTime / 1000 / 60 / 60);
  CalcTime -= Hours * (1000 * 60 * 60);
  let Minutes = Math.floor(CalcTime / 1000 / 60);
  CalcTime -= Minutes * (1000 * 60);
  let Seconds = Math.floor(CalcTime / 1000);

  return (
    (Days != 0 ? Days + (Days == 1 ? "day " : "days ") : "") +
    (Hours != 0
      ? (Hours <= 9 ? "0" + Hours : Hours) + (Hours == 1 ? "hr " : "hrs ")
      : "") +
    (Minutes != 0
      ? (Minutes <= 9 ? "0" + Minutes : Minutes) +
        (Minutes == 1 ? "min " : "mins ")
      : "") +
    (Seconds != 0
      ? (Seconds <= 9 ? "0" + Seconds : Seconds) +
        (Seconds == 1 ? "sec " : "secs ")
      : "")
  );
}

const setCurrentDate = () => {
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

    difference.value = humanDiff(nowInMs, currentInMs);
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
    <MobileHeader></MobileHeader>

    <div v-if="enterprise">
      <p>
        {{ `${enterprise?.name}` }} > {{ `${user?.name} ${user?.surnames}` }}
      </p>
      <p>{{ currentDate }}</p>
    </div>

    <div v-if="currentTimePeriod">
      <p>{{ difference }}</p>
      <Button class="p-button-danger" @click="closeTimePeriod"
        >Clock-Out</Button
      >
    </div>
    <div v-else>
      <Button class="p-button-success" @click="openTimePeriod">Clock-In</Button>
    </div>

    <MobileNav></MobileNav>
  </main>
</template>
