import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SAMPLE_SIZE } from '@/variables'

interface IStatistics {
  downloadSpeed: number
  timeSeries: number[]
  connected: boolean
  freeSpace: number
}

export const useStatisticsStore = defineStore('statistics', () => {
  const statistics = ref<IStatistics>({
    downloadSpeed: 0,
    timeSeries: new Array<number>(SAMPLE_SIZE).fill(0),
    connected: false,
    freeSpace: 0,
  })

  const getDownloadSpeed = computed(() => statistics.value.downloadSpeed / 1000 / 1000)
  const getTimeSeries = computed(() => {
    return {
      labels: new Array<string>(SAMPLE_SIZE).fill(''),
      datasets: [
        {
          fill: true,
          borderColor: '#a7f3d0',
          backgroundColor: '#10b981',
          data: statistics.value.timeSeries,
        }
      ]
    }
  })
  const isConnected = computed(() => statistics.value.connected)
  const getFreeSpace = computed(() => statistics.value.freeSpace / 1024 / 1024 / 1024)

  function pushToTimeSeries(speed: number) {
    statistics.value.downloadSpeed = speed
    statistics.value.timeSeries = [
      ...statistics.value.timeSeries,
      Math.floor(speed / 1000)
    ].slice(-SAMPLE_SIZE)
  }

  function setConnected(connected: boolean) {
    statistics.value.connected = connected
  }

  function setFreeSpace(value: number) {
    statistics.value.freeSpace = value
  }

  return {
    getDownloadSpeed,
    isConnected,
    setConnected,
    getTimeSeries,
    pushToTimeSeries,
    getFreeSpace,
    setFreeSpace,
    statistics,
  }
})
