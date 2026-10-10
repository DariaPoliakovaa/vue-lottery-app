<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex items-center gap-6">
    <RouterLink 
      to="/" 
      class="text-gray-500 hover:text-primary transition-colors font-medium"
      active-class="text-primary font-bold border-b-2 border-primary pb-1"
    >
      Home
    </RouterLink>
    
    <RouterLink 
      to="/about" 
      class="text-gray-500 hover:text-primary transition-colors font-medium"
      active-class="text-primary font-bold border-b-2 border-primary pb-1"
    >
      About author
    </RouterLink>
    
    <RouterLink 
      to="/users" 
      class="text-gray-500 hover:text-primary transition-colors font-medium"
      active-class="text-primary font-bold border-b-2 border-primary pb-1"
    >
      Users
    </RouterLink>
    
    <RouterLink 
      to="/login" 
      class="text-gray-500 hover:text-primary transition-colors font-medium"
      active-class="text-primary font-bold border-b-2 border-primary pb-1"
    >
      Login
    </RouterLink>
  </nav>
</template>
