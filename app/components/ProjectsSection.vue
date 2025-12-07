<template>
  <section id="projects" class="py-20 bg-white dark:bg-gray-900 transition-colors">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Featured Projects
      </h2>
      <div class="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
      
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in projects" 
          :key="project.title"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all"
        >
          <div class="h-48 bg-gradient-to-br" :class="project.gradient"></div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>
            
            <div class="flex gap-4">
              <a 
                :href="project.github" 
                target="_blank"
                class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code
              </a>
              <a 
                v-if="project.demo"
                :href="project.demo" 
                target="_blank"
                class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with payment integration, admin dashboard, and real-time inventory management.',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    gradient: 'from-purple-500 to-pink-500',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team features, and productivity analytics.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    gradient: 'from-blue-500 to-cyan-500',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with forecasts, interactive maps, and location-based recommendations.',
    technologies: ['Nuxt.js', 'OpenWeather API', 'Chart.js'],
    gradient: 'from-orange-500 to-yellow-500',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media insights with data visualization and reporting features.',
    technologies: ['Next.js', 'GraphQL', 'MongoDB', 'D3.js'],
    gradient: 'from-green-500 to-teal-500',
    github: 'https://github.com',
    demo: null
  },
  {
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown support, SEO optimization, and content management system.',
    technologies: ['Nuxt.js', 'Strapi', 'PostgreSQL'],
    gradient: 'from-red-500 to-pink-500',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    title: 'Portfolio Generator',
    description: 'Tool to help developers create beautiful portfolios with customizable themes and templates.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Express'],
    gradient: 'from-indigo-500 to-purple-500',
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
]
</script>
