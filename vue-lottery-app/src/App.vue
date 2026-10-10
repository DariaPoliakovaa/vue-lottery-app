<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm p-4 mb-4 flex gap-4">
      <RouterLink to="/" class="text-primary hover:underline font-bold">Home</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
