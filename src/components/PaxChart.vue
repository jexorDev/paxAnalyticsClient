<template>
    <v-card>
      <v-card-item :title="$props.title">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"          
          icon="mdi-airplane-takeoff"
          size="18"
        ></v-icon>

        {{ totalDepartingFlights }}

        <v-icon
          class="me-1 pb-1"                    
          icon="mdi-airplane-landing"
          size="18"
        ></v-icon>

        {{ totalArrivingFlights }}
      </template>
    </v-card-item>
      <v-card-text>
        <LineChart v-bind="lineChartProps" />

      </v-card-text>
      
    </v-card>
  </template>
  
  <script setup lang='ts'>
  import { computed } from "vue";
  import { LineChart, useLineChart } from "vue-chart-3";
  import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
  import PaxVolumeHour from "../models/PaxVolumeHour";

  const props = defineProps<{
    title: string,
    data: PaxVolumeHour[]
  }>();

  const dataSorted = computed<PaxVolumeHour[]>(() => props.data)

  const arrivals = computed<number[]>(() => dataSorted.value.map(x => x.arrivingPassengers));
  const departures = computed<number[]>(() => dataSorted.value.map(x => x.departingPassengers));
  const totals = computed<number[]>(() => dataSorted.value.map(x => x.arrivingPassengers + x.departingPassengers));
  const totalArrivingFlights = computed<number>(() => props.data.map(x => x.arrivingFlights).reduce((y, acc) => acc + y, 0));
  const totalDepartingFlights = computed<number>(() => props.data.map(x => x.departingFlights).reduce((y, acc) => acc + y, 0));

  Chart.register(...registerables);
      
  const dataLabels = computed(() => props.data.map(x => `${x.hour}:00`));
    
  
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
        tension: .3
      },
      {
        label: 'Departures',
        data: departures.value,
        borderColor: "LimeGreen",
        backgroundColor: "LimeGreen",
        type: "line",
        tension: .3
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
  