<template>
  <section id="contact" class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Get In Touch
      </h2>
      <div class="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
      
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
            I'll try my best to get back to you!
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <a 
            href="mailto:your.email@example.com"
            class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-center"
          >
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <p class="text-gray-600 dark:text-gray-400">your.email@example.com</p>
          </a>

          <a 
            href="https://linkedin.com"
            target="_blank"
            class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-center"
          >
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
            <p class="text-gray-600 dark:text-gray-400">Connect with me</p>
          </a>

          <a 
            href="https://github.com"
            target="_blank"
            class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-center"
          >
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">GitHub</h3>
            <p class="text-gray-600 dark:text-gray-400">View my code</p>
          </a>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
              <input 
                v-model="form.name"
                type="text" 
                required
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                placeholder="Your name"
              >
            </div>
            
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                placeholder="your.email@example.com"
              >
            </div>
            
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
              <textarea 
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FormData {
  name: string
  email: string
  message: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref<boolean>(false)

const handleSubmit = async (): Promise<void> => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  alert('Thank you for your message! I\'ll get back to you soon.')
  
  form.value = {
    name: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
}
</script>
