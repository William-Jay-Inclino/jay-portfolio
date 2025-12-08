<template>
  <section id="skills" class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Skills & Technologies
      </h2>
      <div class="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
      
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="category in skills" 
          :key="category.title"
          class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-2xl">{{ category.icon }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.title }}</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in category.items" 
              :key="skill"
              class="px-3 py-1 bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  {
    title: 'Frontend',
    icon: '🎨',
    items: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Bootstrap', 'Bulma', 'CSS3', 'HTML5', 'jQuery']
  },
  {
    title: 'Backend',
    icon: '⚙️',
    items: ['Node.js', 'Express.js', 'NestJS', 'PHP', 'Laravel', 'CodeIgniter', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MySQL', 'MariaDB']
  },
  {
    title: 'DevOps & Tools',
    icon: '🚀',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Nginx', 'Apache', 'PM2', 'Vercel', 'Github', 'Gitlab', 'Bitbucket']
  },
  {
    title: 'Mobile',
    icon: '📱',
    items: ['React Native', 'Progressive Web Apps', 'Responsive Design']
  },
  {
    title: 'Testing',
    icon: '🧪',
    items: ['Cypress', 'Playwright', 'Vitest', 'Pest', 'Postman', 'Insomnia']
  },
  {
    title: 'Other',
    icon: '💡',
    items: ['Agile', 'Scrum', 'VS Code', 'Slack', 'Jira', 'Github Copilot', 'Figma', 'Draw.io', 'Microsoft Teams']
  }
]
</script>
