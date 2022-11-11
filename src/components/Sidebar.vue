<template>
  <aside class="flex flex-col flex-grow justify-between min-h-full py-3">
    <div>
      <div class="p-3 bg-slate-600 rounded text-slate-300 text-center mx-3">
        Download Speed
        <div class="text-emerald-500 text-xl font-mono mt-1 font-semibold">
          <span>{{ speed.toPrecision(2) }}</span>
          <span class="text-sm"> MBps</span>
        </div>
      </div>
      <SpeedChart class="p-0"></SpeedChart>
      <div class="p-3 bg-slate-600 rounded text-slate-300 text-center mt-3 mx-3">
        RPC Address
        <div class="text-emerald-500 text-lg font-mono mt-1 font-semibold">
          <input type="text" class="text-center appearance-none bg-slate-600" :value="address"
            @keyup="(e: any) => settings.setRPCAddress(e.target.value)" />
        </div>
      </div>
      <div class="p-3 bg-slate-600 rounded text-slate-300 text-center mt-3 mx-3">
        RPC Port
        <div class="text-emerald-500 text-lg font-mono mt-1 font-semibold">
          <input type="text" class="text-center appearance-none bg-slate-600" :value="port"
            @keyup="(e: any) => settings.setRPCPort(e.target.value)" />
        </div>
      </div>
      <div class="p-3 bg-slate-600 rounded text-slate-300 text-center mt-3 mx-3">
        Free space (GiB)
        <div class="text-sky-500 text-xl font-mono mt-1 font-semibold">
          <span>{{ freeSpace.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="p-3 bg-slate-600 rounded text-slate-300 text-center ml-3">
        Status
        <div class="mt-1 font-semibold" :class="connected ? 'text-emerald-500' : 'text-red-500'">
          <span>{{ connected ? 'Connected' : 'Disconnected' }}</span>
        </div>
      </div>
      <div @click="settings.toggleTheme"
        class="p-3 bg-slate-600 hover:bg-slate-500 cursor-pointer duration-300 rounded text-slate-300 text-center mr-3">
        Theme
        <div class="mt-1 font-semibold text-emerald-500">
          <span class="capitalize">{{ settings.getTheme }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../stores/settings'
import { useStatisticsStore } from '../stores/statistics'
import SpeedChart from './SpeedChart.vue';

export default {
  setup() {
    const settings = useSettingsStore();
    const statistics = useStatisticsStore();
    return {
      connected: computed(() => statistics.isConnected),
      freeSpace: computed(() => statistics.getFreeSpace),
      address: computed(() => settings.getRPCAddress),
      speed: computed(() => statistics.getDownloadSpeed),
      port: computed(() => settings.getRPCPort),
      settings
    };
  },
  components: { SpeedChart }
}
</script>