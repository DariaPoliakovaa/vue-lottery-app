<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <nav class="flex items-center gap-6">
    <RouterLink to="/" class="text-gray-500 hover:text-primary transition-colors font-medium" active-class="text-primary font-bold border-b-2 border-primary pb-1">
      Home
    </RouterLink>
    
    <RouterLink to="/about" class="text-gray-500 hover:text-primary transition-colors font-medium" active-class="text-primary font-bold border-b-2 border-primary pb-1">
      About author
    </RouterLink>
    
    <RouterLink v-if="authStore.isAuthenticated" to="/users" class="text-gray-500 hover:text-primary transition-colors font-medium" active-class="text-primary font-bold border-b-2 border-primary pb-1">
      Users
    </RouterLink>
    
    <button 
      v-if="authStore.isAuthenticated" 
      @click="authStore.logout()" 
      class="text-gray-500 hover:text-red-500 transition-colors font-medium"
    >
      Logout
    </button>
    <RouterLink 
      v-else 
      to="/login" 
      class="text-gray-500 hover:text-primary transition-colors font-medium" 
      active-class="text-primary font-bold border-b-2 border-primary pb-1"
    >
      Login
    </RouterLink>
  </nav>
</template>
