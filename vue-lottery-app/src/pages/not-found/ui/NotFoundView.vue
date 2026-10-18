<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-white dark:bg-gray-900 p-12 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center transition-colors">
    <h1 class="text-6xl font-black text-gray-200 dark:text-gray-800 mb-4">404</h1>
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Сторінку не знайдено</h2>
    <p class="text-gray-500 dark:text-gray-400 mb-8">Схоже, ви перейшли за невірним посиланням.</p>
    
    <RouterLink 
      to="/" 
      class="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md font-medium transition-colors inline-block"
    >
      Повернутися на головну
    </RouterLink>
  </div>
</template>
