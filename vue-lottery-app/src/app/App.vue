<script setup lang="ts">
import AppLayout from '@/app/layouts/AppLayout.vue'
import Toast from 'primevue/toast'
import { useThemeStore } from '@/entities/session';
const themeStore = useThemeStore()
</script>

<template>
  <div :class="{ 'my-app-dark dark': themeStore.isDark }" class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
    <AppLayout />
    <Toast />
  </div>
</template>
