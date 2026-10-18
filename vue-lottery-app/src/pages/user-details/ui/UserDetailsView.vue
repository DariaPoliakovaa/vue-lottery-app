<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/entities/user'
import AppButton from '@/shared/ui/AppButton.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const usersStore = useUsersStore()
const { currentUser: user, isLoading, error } = storeToRefs(usersStore)

onMounted(async () => {
  await usersStore.fetchUser(props.id)
})
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <button @click="router.back()" class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 mb-6 flex items-center gap-2 font-medium transition-colors">
      &larr; Повернутися до списку
    </button>

    <div v-if="isLoading" class="text-center py-12 text-gray-500 dark:text-gray-400">Завантаження профілю...</div>
    <div v-else-if="error" class="text-center py-12 text-red-500 dark:text-red-400">{{ error }}</div>
    
    <div v-else-if="user" class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
      <div class="flex items-center gap-6 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
        <img v-if="user.image" :src="user.image" :alt="user.firstName" class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 object-cover">
        <div v-else class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 font-bold text-2xl">
          {{ user.firstName[0] }}
        </div>
        
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="text-primary dark:text-indigo-400 font-medium">@{{ user.username }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
          <p class="font-medium text-gray-800 dark:text-gray-200">{{ user.email }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Телефон</p>
          <p class="font-medium text-gray-800 dark:text-gray-200">{{ user.phone }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Вік</p>
          <p class="font-medium text-gray-800 dark:text-gray-200">{{ user.age }} років</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Стать</p>
          <p class="font-medium text-gray-800 dark:text-gray-200 capitalize">{{ user.gender }}</p>
        </div>
      </div>

      <div class="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
        <AppButton variant="outlined" severity="secondary" @click="router.push(`/users/${user.id}/edit`)">Редагувати</AppButton>
      </div>
    </div>
  </div>
</template>
