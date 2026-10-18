import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ServiceProvider } from '@/shared/api'
import type { UserService } from '@/entities/user'
import type { User, CreateUserDto, UpdateUserDto } from '@/entities/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const userService = () => ServiceProvider.get<UserService>('users')

    async function fetchUsers(params?: { limit?: number; skip?: number; q?: string }) {
    isLoading.value = true
    error.value = null
    try {
      const response = await userService().getAll(params)
      users.value = response.items
    } catch (err: any) {
      error.value = err.message || 'Помилка завантаження користувачів'
    } finally {
      isLoading.value = false
    }
  }


  async function fetchUser(id: number | string) {
    isLoading.value = true
    try {
      currentUser.value = await userService().getById(Number(id))
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

    async function createUser(userData: CreateUserDto) {
    await userService().create(userData)
    await fetchUsers()
  }

  async function updateUser(id: number | string, userData: UpdateUserDto) {
    await userService().update(Number(id), userData)
    await fetchUsers()
  }

  async function removeUser(id: number | string) {
    await userService().delete(Number(id))
    await fetchUsers()
  }

  return {
    users,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    removeUser,
  }
})
