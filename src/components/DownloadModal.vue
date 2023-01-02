<template>
  <div :class="props.hidden ? 'hidden' : 'block'"
    class="bg-gray-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
    <div class="bg-slate-100 dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-md text-center w-1/2">
      <h1 class="text-2xl mb-4 font-semibold text-gray-700 dark:text-gray-100">Add download</h1>
      <div class="mb-4">
        <div class="text-start text-lg text-gray-600 dark:text-gray-200">
          URL
        </div>
        <input v-model="url"
          class="block p-4 my-2 w-full text-sm text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="https://...">
        <div class="text-start text-lg text-gray-600 dark:text-gray-200 mt-4">
          yt-dlp CLI arguments
        </div>
        <input type="text" v-model="settings.getDefaultArgs"
          @keyup="(e: any) => settings.setDefaultArgs(e.target.value)"
          class="block p-4 my-2 w-full text-sm text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="yt-dlp CLI Arguments">
      </div>
      <button class="bg-blue-500 px-4 py-2 rounded-md text-md text-white mt-6" @click=onCancel()>Cancel</button>
      <button class="bg-emerald-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        @click="onConfirm(url)">OK</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSettingsStore } from '../stores/settings'

const props = defineProps<{
  hidden?: boolean
  onConfirm: Function
  onCancel: Function
}>()

const url = ref("")
const hidden = ref(props.hidden)
const settings = useSettingsStore()

</script>