<script setup lang="ts">
import Logo from './Logo.vue'
import AppNavigation from './AppNavigation.vue'
import { useThemeStore } from '@/entities/session'
import AppButton from '@/shared/ui/AppButton.vue'

const themeStore = useThemeStore()
</script>

<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <Logo />
      <AppNavigation />
      <AppButton variant="outlined" severity="secondary" @click="themeStore.toggleTheme">
         {{ themeStore.isDark ? 'Світла тема' : 'Темна тема' }}
      </AppButton>
    </div>
  </header>
</template>
