<template>
    <v-card>
        <v-card-title>Week PAX Count</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <BarChart v-bind="barChartProps" />

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card color="indigo">
                <v-card-text>   
                    <v-row>
                        <v-col>
                            BUSIEST DAY
                            <div class="text-h3">
                        
                        {{ busiestDayLabel }}
                    </div>
                        </v-col>
                        <v-col>
                            TOTAL PAX
                            <div class="text-h3">
                        
                                {{ busiestDayTotal }}

                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            SLOWEST DAY
                            <div class="text-h3">
                        {{ slowestDayLabel }}
                    
        
                    </div>
                        </v-col>
                        <v-col>
                            TOTAL PAX
                            <div class="text-h3">
                                {{ slowestDayTotal }}
                    

                            </div>
                        </v-col>
                    </v-row>         
                    
                    
                </v-card-text>
            </v-card>
            </v-col>
            
          </v-row>

        </v-container>
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
  const busiestDayIndex = computed(() => {
    return totals.value.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);    
  });

  const slowestDayIndex = computed(() => {
    return totals.value.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);    
  });

  const busiestDayTotal = computed(() => totals.value[busiestDayIndex.value]);
  const busiestDayLabel = computed(() => dataLabels.value[busiestDayIndex.value]);
  const slowestDayTotal = computed(() => totals.value[slowestDayIndex.value]);
  const slowestDayLabel = computed(() => dataLabels.value[slowestDayIndex.value]);


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
        backgroundColor: "royalBlue",        
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
        y: {
          
              ticks: {
                
                stepSize: 25000
              }
            
        }
    },
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: true
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
  