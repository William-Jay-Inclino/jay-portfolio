<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <TheHeader />
    <main>
      <NuxtPage />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()
const { trackPageVisit } = useAnalytics()

onMounted(() => {
  initTheme()
  // Track page visit
  trackPageVisit()
})
</script>
