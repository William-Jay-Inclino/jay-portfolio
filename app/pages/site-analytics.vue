<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors pt-20">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Site Analytics
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Overview of site visits and statistics
        </p>
      </div>

      <!-- Date Range Selector -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Date
          </label>
          <input
            v-model="startDate"
            type="date"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            End Date
          </label>
          <input
            v-model="endDate"
            type="date"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="fetchData"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Load Data
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Tables -->
      <div v-else-if="stats.length > 0" class="space-y-8">
        <!-- Daily Visit Stats Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Daily Visit Stats</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Aggregated daily statistics</p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Total Visits
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Unique Visits
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Mobile
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Desktop
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Tablet
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="stat in stats" :key="stat.date" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(stat.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ stat.total_visits }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ stat.unique_visits }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ stat.mobile }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ stat.desktop }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ stat.tablet }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Summary Stats -->
          <div class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Total</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ totalStats.total }}</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Unique</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ totalStats.unique }}</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Mobile</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ totalStats.mobile }}</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Desktop</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ totalStats.desktop }}</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Tablet</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ totalStats.tablet }}</p>
              </div>
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Days</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Site Visits Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Site Visits</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Individual visit records ({{ visits.length }} total)</p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    IP
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Device
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Referer
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="(visit, index) in visits" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(visit.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {{ visit.ip }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getDeviceClass(visit.device)">
                      {{ visit.device }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {{ visit.referer || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No data available</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a date range and load data to see analytics.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DailyStats {
  date: string
  total_visits: number
  unique_visits: number
  mobile: number
  desktop: number
  tablet: number
}

interface SiteVisit {
  date: string
  ip: string
  device: string
  referer: string | null
}

const stats = ref<DailyStats[]>([])
const visits = ref<SiteVisit[]>([])
const loading = ref(false)
const error = ref('')

const today = new Date()
const thirtyDaysAgo = new Date(today)
thirtyDaysAgo.setDate(today.getDate() - 30)

const startDate = ref(thirtyDaysAgo.toISOString().split('T')[0])
const endDate = ref(today.toISOString().split('T')[0])

const totalStats = computed(() => {
  return stats.value.reduce((acc, stat) => ({
    total: acc.total + stat.total_visits,
    unique: acc.unique + stat.unique_visits,
    mobile: acc.mobile + stat.mobile,
    desktop: acc.desktop + stat.desktop,
    tablet: acc.tablet + stat.tablet
  }), { total: 0, unique: 0, mobile: 0, desktop: 0, tablet: 0 })
})

const fetchData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const [statsResponse, visitsResponse] = await Promise.all([
      $fetch(`/api/analytics/stats-range`, {
        method: 'GET',
        query: {
          startDate: startDate.value,
          endDate: endDate.value
        }
      }),
      $fetch(`/api/analytics/visits-range`, {
        method: 'GET',
        query: {
          startDate: startDate.value,
          endDate: endDate.value
        }
      })
    ])

    if (statsResponse.success && 'data' in statsResponse) {
      stats.value = statsResponse.data ?? []
    } else {
      error.value = 'message' in statsResponse && statsResponse.message ? statsResponse.message : 'Failed to fetch analytics'
      stats.value = []
    }

    if (visitsResponse.success && 'data' in visitsResponse) {
      visits.value = visitsResponse.data ?? []
    } else {
      visits.value = []
    }
  } catch (e) {
    error.value = 'Failed to load analytics data'
    console.error('Analytics fetch error:', e)
  } finally {
    loading.value = false
  }
}

const getDeviceClass = (device: string) => {
  if (device === 'desktop') {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  } else if (device === 'mobile') {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  } else if (device === 'tablet') {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
  return ''
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

onMounted(() => {
  fetchData()
})
</script>
