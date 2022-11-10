import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type ThemeUnion = 'light' | 'dark' | 'system'

interface ISettings {
  rpcAddress: string
  rpcPort: string
  theme: ThemeUnion
  defaultArgs: string
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<ISettings>({
    rpcAddress: localStorage.getItem('rpc-address') ?? 'localhost',
    rpcPort: localStorage.getItem('rpc-port') ?? '4444',
    theme: localStorage.getItem('theme') as ThemeUnion ?? 'light',
    defaultArgs: localStorage.getItem('args') ?? '',
  })

  const getDefaultArgs = computed(() => settings.value.defaultArgs)
  const getRPCAddress = computed(() => settings.value.rpcAddress)
  const getRPCPort = computed(() => settings.value.rpcPort)
  const getTheme = computed(() => settings.value.theme)

  function setRPCAddress(address: string) {
    settings.value.rpcAddress = address
    localStorage.setItem('rpc-address', address)
  }

  function setRPCPort(port: string) {
    settings.value.rpcPort = port
    localStorage.setItem('rpc-port', port)
  }

  function toggleTheme() {
    if (settings.value.theme === 'light') {
      settings.value.theme = 'dark'
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      settings.value.theme = 'light'
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }

  function setDefaultArgs(args: string) {
    settings.value.defaultArgs = args
    localStorage.setItem('args', args)
  }

  return {
    settings,
    getRPCAddress,
    getRPCPort,
    getTheme,
    getDefaultArgs,
    setRPCAddress,
    setRPCPort,
    toggleTheme,
    setDefaultArgs,
  }
})
