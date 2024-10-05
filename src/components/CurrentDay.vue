<template>
    <v-row>
        <v-col>
            <v-card color="yellow-darken-1">
                <v-card-text>   
                    <v-row>
                        <v-col>
                            ARRIVALS
                            <div class="text-h3">
                        <v-icon icon="mdi-airplane-landing" size="50"></v-icon>
                        {{ totalArrivingFlights }}
                    </div>
                        </v-col>
                        <v-col>
                            BUSIEST TIME
                            <div class="text-h3">
                                <v-icon icon="mdi-clock-fast" size="50"></v-icon>
                                {{ maxPaxHour }}:00

                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            DEPARTURES
                            <div class="text-h3">
                        <v-icon icon="mdi-airplane-takeoff" size="50"></v-icon>
                        {{ totalDepartingFlights }}
        
                    </div>
                        </v-col>
                        <v-col>
                            PEAK PAX
                            <div class="text-h3">
                                <v-icon icon="mdi-account-group" size="50"></v-icon>
                                {{ maxPax }}

                            </div>
                        </v-col>
                    </v-row> 
                    <v-row>
                        <v-col>
                            TOTAL PAX
                            <div class="text-h3">
                                {{ todayTotalPax }}
                            </div>
                        </v-col>
                    </v-row>        
                    
                    
                </v-card-text>
            </v-card>
            <PaxComparisonTable :is-comparison="false" :data="today"></PaxComparisonTable>



        </v-col>
        <v-col>
            <PaxChart title="Today PAX Count" :data="today"></PaxChart>
            
        </v-col>
        <v-col>
            <WeekChart :data="$props.data"></WeekChart>

        </v-col>
    </v-row>
</template>
<script setup lang="ts">
    import {computed} from "vue";
    import PaxVolumeHour from "../models/PaxVolumeHour";
    import WeekChart from "./WeekChart.vue";
    import PaxChart from "./PaxChart.vue";
    

    const props = defineProps<{
        data: Map<number, PaxVolumeHour[]>
    }>();

    const today = computed(() => props.data.get(0) ?? []);
    const todayTotalPax = computed(() => today.value.map(x => x.arrivingPassengers + x.departingPassengers).reduce((x, acc) => x + acc, 0))
    const maxPaxHour = computed(() => {
        if (today.value.length === 0) return 0;
        var hour = 0;
        var pax = 0;
        for (var index = 0; index < 24; index++) {
            const currentHour = today.value[index];
            const currentHourPax = currentHour.arrivingPassengers + currentHour.departingPassengers;
            if (currentHourPax > pax) {
                hour = currentHour.hour;
                pax = currentHourPax;
            }
        }

        return hour;
    });

    const maxPax = computed(() => today.value.length > 0 ? today.value[maxPaxHour.value].arrivingPassengers + today.value[maxPaxHour.value].departingPassengers : 0);

    const totalArrivingFlights = computed<number | undefined>(() => today.value !== undefined ? today.value.map(x => x.arrivingFlights).reduce((y, acc) => acc + y, 0) : 0);
    const totalDepartingFlights = computed<number | undefined>(() => today.value !== undefined ? today.value.map(x => x.departingFlights).reduce((y, acc) => acc + y, 0) : 0);


</script>