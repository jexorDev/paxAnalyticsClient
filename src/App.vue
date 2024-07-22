<template>
    <v-app>
      <v-main>
      <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="today">Home</v-tab>
      <v-tab value="threeday">Comparison</v-tab>
      <v-tab value="week">Week</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="today">
          <CurrentDay :data="paxVolData"></CurrentDay>
        </v-tabs-window-item>

        <v-tabs-window-item value="threeday">
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
        </v-tabs-window-item>

        <v-tabs-window-item value="week">
          Three
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
      <v-container fluid>
      
       

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
import {getComparison} from "./utility/PaxVolumeHourUtility";
import CurrentDay from "./components/CurrentDay.vue"
//type PaxVolHourMapType = Record<number, PaxVolumeHour[]>;

const paxVolData = ref(new Map<number, PaxVolumeHour[]>());

const tab = ref("today")

const today = computed(() => paxVolData.value.get(0) ?? []);
const lastWeek = computed(() => paxVolData.value.get(-6) ?? []);
const yesterday = computed(() => paxVolData.value.get(-1) ?? []);;

const todayLastWeekComparison = computed<PaxVolumeHour[]>(() => getComparison(today?.value ?? [], lastWeek?.value ?? []));
const todayYesterdayComparison = computed<PaxVolumeHour[]>(() => getComparison(today?.value ?? [], yesterday?.value ?? []));

onMounted(async () => {
  
  for (var i = -6; i < 1; i++) {
    const data = await getData(i);
    paxVolData.value.set(i, data);
  }

  // Promise.all([
  //   today.value = await getData(0),
  //   lastWeek.value = await getData(-7),
  //   yesterday.value = await getData(-1),

  // ])
  
})



async function getData(dayOffset: number) {
  const result = await getPaxVolume(dayOffset);
  result.forEach(x => x.hour = getLocalHour(x.hour));
  return result.sort((a, b) => a.hour - b.hour);
}


</script>

