<template>
    <v-table :items="$props.data" density="compact">
        <tr>
            <th>Hour</th>
            <th>Arriving Pax</th>            
            <th>Arriving Flights</th>
            <th>Departing Pax</th>
            <th>Departing Flights</th>
        </tr>
        <tbody>
            <tr v-for="row in $props.data">
                <td>{{ row.hour }}</td>
                <td>
                    <div :class="getColor(row.arrivingPassengers)">
                        {{ row.arrivingPassengers }}
                    </div>
                </td>
                <td>
                    <div :class="getColor(row.arrivingFlights)">
                        {{ row.arrivingFlights }}
                    </div>
                </td>
                <td>
                    <div :class="getColor(row.departingPassengers)">
                        {{ row.departingPassengers }}
                    </div>
                </td>
                <td>
                    <div :class="getColor(row.departingFlights)">
                        {{ row.departingFlights }}
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
<script setup lang="ts">
import PaxVolumeHour from "../models/PaxVolumeHour";

const props = defineProps<{
    isComparison: boolean,
    data: PaxVolumeHour[]
}>();

function getColor(difference: number): string {
    if (!props.isComparison) return 'default';

    if (difference === 0) return 'neutral';
    return difference < 0 ? 'negative' : 'positive';
}


</script>
<style>
.positive {
    color: limegreen    
}
.negative {
    color: crimson
}
.neutral {
    color: gray;
}
.default {
    color: dodgerblue
}
</style>