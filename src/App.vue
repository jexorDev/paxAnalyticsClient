<template>
    <v-app>
    <v-main>
      
      <PaxChart :data="data"></PaxChart>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import PaxChart from "./components/PaxChart.vue"
import {onMounted, ref} from 'vue';
import getPaxVolume from "./requests/PaxVolumeRequests"
import PaxVolumeHour from "./models/PaxVolumeHour";

const data = ref<PaxVolumeHour[]>([]);

onMounted(async () => {
  data.value = (await getPaxVolume());

  
})


</script>

