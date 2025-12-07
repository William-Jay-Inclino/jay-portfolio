export const useTheme = () => {
  const colorMode = useState<'light' | 'dark'>('theme', () => 'light')

  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
    if (process.client) {
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', colorMode.value)
    }
  }

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      colorMode.value = savedTheme || (prefersDark ? 'dark' : 'light')
      
      if (colorMode.value === 'dark') {
        document.documentElement.classList.add('dark')
      }
    }
  }

  return {
    colorMode,
    toggleTheme,
    initTheme
  }
}
