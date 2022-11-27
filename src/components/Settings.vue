<template>
  <div class="relative">
    <div class="absolute top-5 left-5 text-2xl text-slate-400 dark:text-slate-300">
      Settings (wip)
    </div>
    <div class="absolute top-5 right-5">
      <div class="grid grid-cols-1 gap-x-4">
        <RouterLink to="/"
          class="bg-slate-300 text-center hover:bg-slate-400 duration-100 p-2 rounded text-xs font-bold text-slate-500 hover:text-slate-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Home
        </RouterLink>
      </div>
    </div>
  </div>
  <main class="mt-24 px-6">
    <div>
      <label class="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="mtime" class="sr-only peer" disabled>
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-400 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">
        </div>
        <span class="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
          Do not set "modified at" header (--no-mtime)
        </span>
      </label>
    </div>
    <div>
      <label class="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="x" class="sr-only peer" disabled>
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-400 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">
        </div>
        <span class="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
          Extract audio only (-x)
        </span>
      </label>
    </div>
    <div class="mt-6 dark:text-gray-200 text-gray-600 text-lg">
      Global CLI arguments
    </div>
    <div class="grid grid-cols-2 mt-2">
      <input type="text" v-model="settings.getDefaultArgs" @keyup="(e: any) => settings.setDefaultArgs(e.target.value)"
        class="block p-4 w-full text-sm text-slate-800 bg-slate-50 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="yt-dlp CLI Arguments">
    </div>
  </main>
</template>

<script lang="ts">
import { useSettingsStore } from '../stores/settings'

export default {
  setup() {
    const settings = useSettingsStore()
    return {
      settings
    }
  },
}
</script>