<template>
  <div class="bg-slate-50 dark:bg-gray-700 w-full h-full md:h-48 lg:h-36 rounded-lg block md:flex md:flex-grow mt-3">
    <div class="bg-cover bg-center h-full w-full rounded-l-lg md:basis-1/4 lg:basis-1/6"
      :style="`background-image: url(${props.result.info.thumbnail})`">
    </div>
    <div class="md:basis-3/4 lg:basis-5/6 text-slate-700 dark:text-gray-300">
      <div class="px-3 pt-3">
        <p class="text-xs text-slate-400 font-semibold">Title</p>
        <p class="text-lg">{{ ellipsis(props.result.info.title, 77) ?? '-' }}</p>
      </div>
      <div class="px-3 py-3 grid md grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <p class="text-xs text-slate-400 pb-2">Progress</p>
          <div class="w-3/4 bg-gray-200 dark:bg-gray-800 rounded h-3">
            <div class="bg-emerald-500 h-3 rounded" :style="`width: ${props.result.progress.percentage}`"></div>
          </div>
        </div>
        <div>
          <p class="text-xs text-slate-400">Speed</p>
          <span class="text-md">{{ formatSpeed(props.result.progress.speed) ?? '-' }}</span>
          <span class="text-slate-400 text-sm"> MBps</span>
        </div>
        <div>
          <p class="text-xs text-slate-400">ETA</p>
          <p class="text-md">{{ formatETA(props.result.progress.eta) ?? '-' }}</p>
        </div>
        <div>
          <p class="text-xs text-slate-400">Actions</p>
          <button
            class="text-md bg-slate-200 text-slate-500 dark:bg-emerald-600 dark:text-slate-100 text-xs p-1 rounded"
            @click="onStop(result.id)">
            Stop
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Result } from '../types'

const props = defineProps<{
  result: Result
  onStop: Function
}>()

function formatSpeed(value: number) {
  return (value / 1000 / 1000).toPrecision(2)
}

function ellipsis(target: string, limit: number) {
  return target.length > limit ? `${target.substring(0, limit)}...` : target
}

function formatETA(seconds: number) {
  const hrs = ~~(seconds / 3600)
  const mins = ~~((seconds % 3600) / 60)
  const secs = ~~seconds % 60;
  return `${hrs > 9 ? hrs : `0${hrs}`}:${mins > 9 ? mins : `0${mins}`}:${secs > 9 ? secs : `0${secs}`}`
}
</script>