<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/entities/user'
import AppButton from '@/shared/ui/AppButton.vue'
import AppInput from '@/shared/ui/AppInput.vue'

const route = useRoute()
const router = useRouter()

const usersStore = useUsersStore()
const { users, isLoading, error } = storeToRefs(usersStore)

const totalUsers = ref(0)
const limit = 10

const currentPage = ref(Number(route.query.page) || 1)
const searchQuery = ref((route.query.q as string) || '')
let searchTimeout: ReturnType<typeof setTimeout>

const fetchUsers = async () => {
  const skip = (currentPage.value - 1) * limit
  
  if (users.value.length === 0) {
    isLoading.value = true
  }
  
  try {
    await usersStore.fetchUsers({ 
      limit, 
      skip, 
      q: searchQuery.value 
    })
  } finally {
    isLoading.value = false
  }
}

const deleteUser = async (id: number) => {
  if (!confirm('Ви впевнені, що хочете видалити цього користувача?')) return
  
  try {
    await usersStore.removeUser(id)
  } catch (err) {
    alert('Помилка видалення')
  }
}

const updateUrl = () => {
  router.push({
    path: '/users',
    query: {
      page: currentPage.value > 1 ? currentPage.value : undefined,
      q: searchQuery.value || undefined
    }
  })
}

const nextPage = () => {
  if (users.value.length === limit) {
    currentPage.value++
    updateUrl()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    updateUrl()
  }
}

const handleSearch = (newValue: string | number | undefined) => {
  const value = String(newValue || '')
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    searchQuery.value = value
    currentPage.value = 1
    updateUrl()
  }, 500)
}

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    if (newQuery.page !== oldQuery?.page || newQuery.q !== oldQuery?.q) {
      currentPage.value = Number(newQuery.page) || 1
      searchQuery.value = (newQuery.q as string) || ''
      fetchUsers()
    }
  }
)

onMounted(fetchUsers)
</script>

<template>
  <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 h-[750px] transition-colors">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Список користувачів</h1>
      <RouterLink to="/users/create">
        <AppButton>+ Додати</AppButton>
      </RouterLink>
    </div>

    <div class="mb-6 w-full max-w-md">
      <AppInput 
        :model-value="searchQuery" 
        @update:model-value="handleSearch" 
        placeholder="Пошук користувачів..." 
      />
    </div>

    <div v-if="isLoading" class="text-center py-8 text-gray-500 dark:text-gray-400">Завантаження...</div>
    <div v-else-if="error" class="text-center py-8 text-red-500 dark:text-red-400">{{ error }}</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-600 dark:text-gray-300">
        <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Ім'я</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Телефон</th>
            <th class="px-4 py-3 text-right">Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">Користувачів не знайдено</td>
          </tr>
          <tr v-for="user in users" :key="user.id" class="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
            <td class="px-4 py-3">{{ user.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="px-4 py-3">{{ user.email }}</td>
            <td class="px-4 py-3">{{ user.phone }}</td>
            <td class="px-4 py-3 text-right flex justify-end gap-3">
              <RouterLink :to="`/users/${user.id}`" class="text-primary dark:text-indigo-400 hover:underline">Деталі</RouterLink>
              <RouterLink :to="`/users/${user.id}/edit`" class="text-gray-500 dark:text-gray-400 hover:underline">Редагувати</RouterLink>
              <button @click="deleteUser(user.id)" class="text-red-500 dark:text-red-400 hover:underline">Видалити</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Всього: {{ users.length }}
      </p>
      <div class="flex gap-2">
        <AppButton variant="outlined" severity="secondary" :disabled="currentPage === 1 || isLoading" @click="prevPage">
          Попередня
        </AppButton>
        <div class="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200 bg-transparent">
          {{ currentPage }}
        </div>
        <AppButton variant="outlined" severity="secondary" :disabled="isLoading" @click="nextPage">
          Наступна
        </AppButton>
      </div>
    </div>
    <RouterView />
  </div>
</template>
