<template>
    <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>PAX Analytics</v-card-title>
              <v-card-subtitle>July 19, 2024</v-card-subtitle>
            </v-card>

            
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <PaxChart title="Yesterday" :data="yesterday"></PaxChart>
            <PaxComparisonTable :is-comparison="true" :data="todayYesterdayComparison"></PaxComparisonTable>
          </v-col>
          <v-col>
            <PaxChart  title="Today" :data="today"></PaxChart>
            <PaxComparisonTable :is-comparison="false" :data="today"></PaxComparisonTable>
          </v-col>
          <v-col>
            <PaxChart title="Last Week" :data="lastWeek"></PaxChart>
            <PaxComparisonTable :is-comparison="true" :data="todayLastWeekComparison"></PaxComparisonTable>
          </v-col>
        </v-row>

      </v-container>
      
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import PaxChart from "./components/PaxChart.vue"
import PaxComparisonTable from "./components/PaxComparisonTable.vue";
import {onMounted, ref, computed} from 'vue';
import getPaxVolume from "./requests/PaxVolumeRequests"
import PaxVolumeHour from "./models/PaxVolumeHour";
import {getLocalHour} from './utility/DateTimeUtility';

const today = ref<PaxVolumeHour[]>([]);
const lastWeek = ref<PaxVolumeHour[]>([]);
const yesterday = ref<PaxVolumeHour[]>([]);

const todayLastWeekComparison = computed<PaxVolumeHour[]>(() => getComparison(today.value, lastWeek.value));
const todayYesterdayComparison = computed<PaxVolumeHour[]>(() => getComparison(today.value, yesterday.value));

onMounted(async () => {
  Promise.all([
    today.value = await getData(0),
    lastWeek.value = await getData(-7),
    yesterday.value = await getData(-1),

  ])
  
})

function getComparison(currentDayData: PaxVolumeHour[], comparisonDayData: PaxVolumeHour[]): PaxVolumeHour[] {
  const comparisonHours: PaxVolumeHour[] = [];

  for (const currentDayHour of currentDayData) {
    const comparisonDayHour = comparisonDayData.find(x => x.hour === currentDayHour.hour);
    if (comparisonDayHour) {
      comparisonHours.push({
        hour: currentDayHour.hour,
        arrivingFlights: currentDayHour.arrivingFlights - comparisonDayHour.arrivingFlights,
        arrivingPassengers: currentDayHour.arrivingPassengers - comparisonDayHour.arrivingPassengers,
        departingFlights: currentDayHour.departingFlights - comparisonDayHour.departingFlights,
        departingPassengers: currentDayHour.departingPassengers - comparisonDayHour.departingPassengers,
      })  
    }
  }

  return comparisonHours;
}

async function getData(dayOffset: number) {
  const result = await getPaxVolume(dayOffset);
  result.forEach(x => x.hour = getLocalHour(x.hour));
  return result.sort((a, b) => a.hour - b.hour);
}


</script>

