<template>
    <v-card width="700">
      <v-card-title>Monday</v-card-title>
      <v-card-text>
        <LineChart v-bind="lineChartProps" />

      </v-card-text>
      
    </v-card>
  </template>
  
  <script setup lang='ts'>
  import { computed, ref, onMounted } from "vue";
  import { LineChart, useLineChart } from "vue-chart-3";
  import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
  import PaxVolumeHour from "../models/PaxVolumeHour";

  const props = defineProps<{
    data: PaxVolumeHour[]
  }>();

  const dataSorted = computed<PaxVolumeHour[]>(() => props.data)

  const arrivals = computed<number[]>(() => dataSorted.value.map(x => x.arrivingPassengers));
    const departures = computed<number[]>(() => dataSorted.value.map(x => x.departingPassengers));
      const totals = computed<number[]>(() => dataSorted.value.map(x => x.arrivingPassengers + x.departingPassengers));

  Chart.register(...registerables);
  
      
      const dataLabels = ref<string[]>([]);

      onMounted(() => {
        for (var i = 0; i < 24; i++) {
          dataLabels.value.push(`${i}:00`);
        }
      })
  
      // @ts-ignore
      const testData = computed<ChartData<"line">>(() => ({
        labels: dataLabels.value,
        datasets: [
   
    {
      label: 'Arrivals',
      data: arrivals.value,
      borderColor: "crimson",
      backgroundColor: "crimson",
      type: "line",
    },
    {
      label: 'Departures',
      data: departures.value,
      borderColor: "LimeGreen",
      backgroundColor: "LimeGreen",
      type: "line",
    },
    {
      label: 'Total',
      data: totals.value,
      backgroundColor: "RoyalBlue",
      barThickness: 20,
      type: 'bar'
    },
  ]
      }));
  
      const options = computed<ChartOptions<"line">>(() => ({
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
        x: {
            ticks: {
                autoSkip: false
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false
      }));
  
      const { lineChartProps } = useLineChart({
        chartData: testData,
        options,
      });
  
  
      
  
     
  
   
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  