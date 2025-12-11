<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <TheHeader v-if="route.path !== '/site-analytics'" />
    <main>
      <NuxtPage />
    </main>
    <TheFooter v-if="route.path !== '/site-analytics'" />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()
const { trackPageVisit } = useAnalytics()
const route = useRoute()

onMounted(() => {
  initTheme()
  // Track page visit
  trackPageVisit()
})
</script>
