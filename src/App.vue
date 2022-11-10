<template>
  <main class="flex flex-grow min-h-screen">
    <section class="basis-1/12 bg-slate-700 text-slate-50 p-0">
      <Sidebar />
    </section>
    <section class="basis-11/12 bg-slate-100 dark:bg-gray-800">
      <RouterView />
    </section>
  </main>
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

export default {
  mounted() {
    localStorage.getItem("theme") === "light" ?
      document.documentElement.classList.remove("dark") :
      document.documentElement.classList.add("dark");
  },
  components: { Sidebar }
}
</script>