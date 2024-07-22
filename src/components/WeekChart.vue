<template>
    <v-card>
        <v-card-title>Week PAX Count</v-card-title>
      <v-card-text>
        <BarChart v-bind="barChartProps" />
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang='ts'>
  import { computed } from "vue";
  import { BarChart, useBarChart } from "vue-chart-3";
  import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
  import PaxVolumeHour from "../models/PaxVolumeHour";

  const props = defineProps<{    
    data: Map<number, PaxVolumeHour[]>
  }>();

  const totals = computed(() => {
    const totalsArray: number[] = [];

    for (var value of props.data.values()) {
        totalsArray.push(value.map(x => x.arrivingPassengers + x.departingPassengers).reduce((acc, y) => acc + y));
    }

    return totalsArray;
  });

  
  Chart.register(...registerables);
      
  const days = computed(() => [...props.data.keys()])
  const dataLabels = computed(() => days.value.map(x => {
    const date = new Date();
    date.setDate(date.getDate() + x);
    return date.toLocaleDateString("en-US", {weekday: "long"});
    }));
    
  
  const testData = computed<ChartData<"bar">>(() => ({
    labels: dataLabels.value,
    datasets: [   
      {
        data: totals.value,
        backgroundColor: "dodgerBlue",        
        barThickness: 40,
      },
    ]
  }));
  
  const options = computed<ChartOptions<"bar">>(() => ({
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
  
      const { barChartProps } = useBarChart({
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
  