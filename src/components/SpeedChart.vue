<template>
  <LineChartGenerator :chart-options="chartOptions" :chart-data="timeSeries" :chart-id="chartId"
    :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script lang="ts">
import { Line as LineChartGenerator } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'
import { useStatisticsStore } from '@/stores/statistics'
import { computed } from 'vue'
import { SAMPLE_SIZE } from '../variables'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 235
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const statistics = useStatisticsStore()
    return {
      timeSeries: computed(() => statistics.getTimeSeries)
    }
  },
  data() {
    return {
      chartData: {
        labels: new Array<string>(SAMPLE_SIZE).fill(''),
        datasets: [
          {
            borderColor: '#ffffff',
            backgroundColor: '#f87979',
            data: new Array(SAMPLE_SIZE).fill(0)
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        color: '#ffffff',
        scales: {
          x: {
            grid: {
              display: false,
              borderColor: '#10b981',
              borderWidth: 2
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false,
              borderColor: 'transparent',
            },
            ticks: {
              display: false
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y} KBps`;
                }
                return label;
              }
            }
          }
        },
        elements: {
          line: {
            cubicInterpolationMode: 'monotone',
            backgroundColor: '#fff'
          }
        }
      }
    }
  }
}
</script>