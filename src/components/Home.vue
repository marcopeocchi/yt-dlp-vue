<template>
  <div class="relative">
    <div class="absolute top-5 left-5 text-2xl text-slate-400 dark:text-slate-300">
      yt-dlp Vue
    </div>
    <div class="absolute top-5 right-5">
      <div class="grid grid-cols-3 gap-x-4">
        <button @click="toggleModalView"
          class="bg-slate-300 hover:bg-slate-400 duration-100 p-2 rounded text-xs font-bold text-slate-500 hover:text-slate-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Add new
        </button>
        <button @click="stopAllDownloads"
          class="bg-slate-300 hover:bg-slate-400 duration-100 p-2 rounded text-xs font-bold text-slate-500 hover:text-slate-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Abort All
        </button>
        <RouterLink to="/settings">
          <button @click="stopAllDownloads"
            class="bg-slate-300 hover:bg-slate-400 duration-100 p-2 rounded text-xs font-bold text-slate-500 hover:text-slate-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            Settings
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
  <main class="p-6 mt-16">
    <DownloadEntry v-for="result in results" :result="result" :on-stop="stopDownload" />
    <DownloadModal :hidden="!showDownloadModal" :on-confirm="(url: string) => {
      addDownload(url)
      toggleModalView()
    }" :on-cancel="toggleModalView" />
  </main>
</template>

<script lang="ts">
import { MOCK_RESULT } from '@/fixtures/dl'
import { RouterLink } from 'vue-router'
import { useSettingsStore } from '../stores/settings'
import { useStatisticsStore } from '../stores/statistics'
import type { JsonRpcRequest, JsonRpcResponse, Result } from '../types'
import { RPC_ADDR } from '../variables'
import DownloadModal from './DownloadModal.vue'
import DownloadEntry from './Entry.vue'

export default {
  setup() {
    const statistics = useStatisticsStore()
    const settings = useSettingsStore()

    return {
      setConnected: statistics.setConnected,
      setFreeSpace: statistics.setFreeSpace,
      pushToTimeSeries: statistics.pushToTimeSeries,
      settings,
    }
  },
  data() {
    return {
      url: "",
      results: [] as Result[],
      socket: new WebSocket(RPC_ADDR),
      loading: true,
      showDownloadModal: false,
    }
  },
  created() {
    const getRunning = () => this.socket.send(JSON.stringify({
      method: "Service.Running",
      params: []
    }))

    this.socket.onopen = () => {
      this.setConnected(true)
      this.loading = false
      this.getFreeSpace()
      getRunning()
    }

    this.socket.onmessage = (event) => {
      const data: JsonRpcResponse<any> = JSON.parse(event.data)
      switch (typeof data.result) {
        case 'number':
          this.setFreeSpace(data.result)
          break
        case 'object':
          this.results = (import.meta.env.DEV ? MOCK_RESULT.result : data.result) // MOCK when in dev
            .filter((r: Result) => !!r.info.url)
            .sort((a: Result, b: Result) => a.info.title.localeCompare(b.info.title))
          this.pushToTimeSeries(this.results
            .map(r => r.progress.speed)
            .reduce((c, n) => c + n, 0)
          )
          break
        default:
          break
      }
    }

    setInterval(() => {
      getRunning()
    }, 1000)
  },
  methods: {
    addDownload(url: string = "") {
      const request: JsonRpcRequest = {
        method: "Service.Exec",
        params: [{
          URL: url || this.url.split("?list")[0],
          Params: this.settings.getDefaultArgs.split(" ").map(a => a.trim()),
        }]
      }
      if (url || this.url) {
        this.socket.send(JSON.stringify(request))
      }
    },
    stopDownload(id: string) {
      const request: JsonRpcRequest = {
        method: "Service.Kill",
        params: [id]
      }
      this.socket.send(JSON.stringify(request))
    },
    stopAllDownloads() {
      const request: JsonRpcRequest = {
        method: "Service.KillAll",
        params: []
      }
      this.socket.send(JSON.stringify(request))
    },
    getFreeSpace() {
      const request: JsonRpcRequest = {
        method: "Service.FreeSpace",
        params: []
      }
      this.socket.send(JSON.stringify(request))
    },
    toggleModalView() {
      this.showDownloadModal = !this.showDownloadModal
    }
  },
  components: { DownloadEntry, DownloadModal, RouterLink }
}
</script>