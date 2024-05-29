<template>
    <div style="width: 400px">
      <div style="display: flex; justify-content: center">
        
      </div>
      <BarChart v-bind="barChartProps" />
    </div>
  </template>
  
  <script lang='ts'>
  import { computed, defineComponent, ref } from "vue";
  import { BarChart, useBarChart } from "vue-chart-3";
  import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
  
  Chart.register(...registerables);
  export default defineComponent({
    name: "App",
    components: { BarChart },
    setup() {
      const dataValues = ref([30, 40, 60, 70, 5]);
      const dataLabels = ref(["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"]);
      const toggleLegend = ref(true);
  
      const testData = computed<ChartData<"bar">>(() => ({
        labels: dataLabels.value,
        datasets: [
          {
            data: dataValues.value,
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
          {
            type: "line",
            data: dataValues.value,
            borderColor: "pink"
          },
        ],
      }));
  
      const options = computed<ChartOptions<"bar">>(() => ({
        scales: {
          myScale: {
            type: "logarithmic",
            position: toggleLegend.value ? "left" : "right",
          },
        },
        plugins: {
          legend: {
            position: toggleLegend.value ? "top" : "bottom",
          },
          title: {
            display: true,
            text: "Chart.js Doughnut Chart",
          },
        },
      }));
  
      const { barChartProps, barChartRef } = useBarChart({
        chartData: testData,
        options,
      });
  
      let index = ref(20);
  
      
  
      function switchLegend() {
        toggleLegend.value = !toggleLegend.value;
      }
  
      return {
        switchLegend,
        testData,
        options,
        barChartRef,
        barChartProps,
      };
    },
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
  