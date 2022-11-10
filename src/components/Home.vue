<template>
  <div class="relative">
    <div class="absolute top-5 left-5 text-2xl text-slate-400 dark:text-slate-300">
      yt-dlp Vue
    </div>
    <div class="absolute top-5 right-5">
      <div class="grid grid-cols-1 gap-x-4">
        <button @click="stopAllDownloads"
          class="bg-slate-300 hover:bg-slate-400 duration-100 p-2 rounded text-xs font-bold text-slate-500 hover:text-slate-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Abort All
        </button>
      </div>
    </div>
  </div>
  <header class="mt-24 px-6">
    <form class="grid grid-cols-2 gap-4">
      <div class="relative">
        <input type="text" v-model="url"
          class="block p-4 w-full text-sm text-slate-800 bg-slate-50 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Video URL" required>
        <button type="submit" @click="addDownload"
          class="text-white absolute h-full right-0 bottom-0 bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-r text-sm px-2">
          Download
        </button>
      </div>
      <input type="text" v-model="getDefaultArgs" @keyup="(e: any) => settings.setDefaultArgs(e.target.value)"
        class="block p-4 w-full text-sm text-slate-800 bg-slate-50 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="yt-dlp CLI Arguments">
    </form>
  </header>
  <main class="p-6">
    <DownloadEntry v-for="result in results" :result="result" :on-stop="stopDownload" />
  </main>
</template>

<script lang="ts">
import type { JsonRpcRequest, Result } from '../types'
import { useStatisticsStore } from '../stores/statistics'
import { useSettingsStore } from '../stores/settings'
import { RPC_ADDR } from '../variables'
import DownloadEntry from './Entry.vue'

export default {
  setup() {
    const statistics = useStatisticsStore()
    const settings = useSettingsStore()

    // broke reactivity intentionally
    const { getDefaultArgs } = settings

    return {
      setSpeed: statistics.setDownloadSpeed,
      setConnected: statistics.setConnected,
      settings,
      getDefaultArgs,
    }
  },
  data() {
    return {
      url: "",
      results: [] as Result[],
      socket: new WebSocket(RPC_ADDR),
    }
  },
  created() {
    const getRunning = () => this.socket.send(JSON.stringify({
      method: "Service.Running",
      params: []
    }))

    this.socket.onopen = () => {
      this.setConnected(true)
      getRunning()
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.results = data.result
        .filter((r: Result) => !!r.info.url)
        .sort((a: Result, b: Result) => a.info.title.localeCompare(b.info.title))
      this.setSpeed(this.results
        .map(r => r.progress.speed)
        .reduce((c, n) => c + n, 0)
      )
    }

    setInterval(() => {
      getRunning()
    }, 1000)
  },
  methods: {
    addDownload() {
      const request: JsonRpcRequest = {
        method: "Service.Exec",
        params: [{
          URL: this.url.split("?list")[0],
          Params: this.settings.getDefaultArgs.split(" ").map(a => a.trim()),
        }]
      }
      if (this.url) {
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
  },
  components: { DownloadEntry }
}
</script>