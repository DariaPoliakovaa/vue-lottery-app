<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ServiceProvider } from '@/shared/api/service-provider'
import type { User } from '@/entities/user/model/user'
import AppButton from '@/shared/ui/AppButton.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const user = ref<User | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    user.value = await ServiceProvider.users.getById(Number(props.id))
  } catch (err) {
    error.value = 'Не вдалося завантажити дані користувача'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <button @click="router.back()" class="text-gray-500 hover:text-primary mb-6 flex items-center gap-2 font-medium">
      &larr; Повернутися до списку
    </button>

    <div v-if="isLoading" class="text-center py-12 text-gray-500">Завантаження профілю...</div>
    <div v-else-if="error" class="text-center py-12 text-red-500">{{ error }}</div>
    
    <div v-else-if="user" class="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-center gap-6 mb-8 border-b pb-6">
        <img v-if="user.image" :src="user.image" :alt="user.firstName" class="w-24 h-24 rounded-full bg-gray-100 border border-gray-200">
        <div v-else class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-2xl">
          {{ user.firstName[0] }}
        </div>
        
        <div>
          <h1 class="text-3xl font-bold text-gray-800">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="text-primary font-medium">@{{ user.username }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500 mb-1">Email</p>
          <p class="font-medium text-gray-800">{{ user.email }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Телефон</p>
          <p class="font-medium text-gray-800">{{ user.phone }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Вік</p>
          <p class="font-medium text-gray-800">{{ user.age }} років</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Стать</p>
          <p class="font-medium text-gray-800 capitalize">{{ user.gender }}</p>
        </div>
      </div>

      <div class="mt-8 flex justify-end gap-3 pt-6 border-t">
        <AppButton variant="secondary" @click="router.push(`/users/${user.id}/edit`)">Редагувати</AppButton>
      </div>
    </div>
  </div>
</template>
