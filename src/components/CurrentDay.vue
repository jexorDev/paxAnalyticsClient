<template>
    <v-row>
        <v-col>
            <v-card color="yellow-darken-1">
                <v-card-text>            
                    <div class="text-h3">
                        <v-icon icon="mdi-airplane-landing" size="50"></v-icon>
                        {{ totalArrivingFlights }}
                    </div>
                    <div class="text-h3">
                        <v-icon icon="mdi-airplane-takeoff" size="50"></v-icon>
                        {{ totalDepartingFlights }}
        
                    </div>
                </v-card-text>
            </v-card>
            <WeekChart :data="$props.data"></WeekChart>

        </v-col>
        <v-col>
            <PaxChart title="Today PAX Count" :data="today"></PaxChart>
        </v-col>
        <v-col>
            <PaxComparisonTable :is-comparison="false" :data="today"></PaxComparisonTable>

        </v-col>
    </v-row>
</template>
<script setup lang="ts">
    import {computed} from "vue";
    import PaxVolumeHour from "../models/PaxVolumeHour";
    import WeekChart from "./WeekChart.vue";
    import PaxChart from "./PaxChart.vue";
    import PaxComparisonTable from "./PaxComparisonTable.vue";

    const props = defineProps<{
        data: Map<number, PaxVolumeHour[]>
    }>();

    const today = computed(() => props.data.get(0) ?? []);

    const totalArrivingFlights = computed<number | undefined>(() => today.value !== undefined ? today.value.map(x => x.arrivingFlights).reduce((y, acc) => acc + y, 0) : 0);
    const totalDepartingFlights = computed<number | undefined>(() => today.value !== undefined ? today.value.map(x => x.departingFlights).reduce((y, acc) => acc + y, 0) : 0);


</script>