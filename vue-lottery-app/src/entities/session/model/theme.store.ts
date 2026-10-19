import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const savedTheme = localStorage.getItem('theme')
  const initialDark = savedTheme 
    ? savedTheme === 'dark' 
    : document.documentElement.classList.contains('dark')

  const isDark = ref<boolean>(initialDark)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (val) => {
    if (val) {
      document.documentElement.classList.add('dark', 'my-app-dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark', 'my-app-dark')
      localStorage.setItem('theme', 'light')
    }
  }, { immediate: true })

  return {
    isDark,
    toggleTheme
  }
}, {
  persist: true 
})

