<script setup lang="ts">
import AppTable from '@/shared/ui/AppTable.vue'
import Column from 'primevue/column'
import type { Participant } from '@/entities/user'

defineProps<{
  participants: Participant[]
  sortKey: 'name' | 'dob' | null
  sortOrder: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  (e: 'sort', key: 'name' | 'dob'): void
  (e: 'edit', participant: Participant): void
  (e: 'delete', participant: Participant): void
}>()

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mt-6 transition-colors">
    <AppTable :value="participants">
      
      <Column header="#">
        <template #body="{ index }">
          <span class="text-gray-400 dark:text-gray-500">{{ index + 1 }}</span>
        </template>
      </Column>

      <Column header="Name">
        <template #header>
          <div class="cursor-pointer select-none text-gray-700 dark:text-gray-300" @click="emit('sort', 'name')">
            Name <span v-if="sortKey === 'name'" class="ml-1 text-primary dark:text-indigo-400">{{ sortOrder === 'asc' ? '↓' : '↑' }}</span>
          </div>
        </template>
        <template #body="{ data }">
          <span class="text-gray-900 dark:text-white font-medium">{{ data.name }}</span>
        </template>
      </Column>

      <Column header="Date of Birth">
        <template #header>
          <div class="cursor-pointer select-none text-gray-700 dark:text-gray-300" @click="emit('sort', 'dob')">
            Date of Birth <span v-if="sortKey === 'dob'" class="ml-1 text-primary dark:text-indigo-400">{{ sortOrder === 'asc' ? '↓' : '↑' }}</span>
          </div>
        </template>
        <template #body="{ data }">
          <span class="text-gray-600 dark:text-gray-300">{{ formatDate(data.dob) }}</span>
        </template>
      </Column>

      <Column field="email" header="Email">
        <template #body="{ data }">
          <span class="text-gray-600 dark:text-gray-300">{{ data.email }}</span>
        </template>
      </Column>

      <Column field="phone" header="Phone number">
        <template #body="{ data }">
          <span class="text-gray-600 dark:text-gray-300">{{ data.phone }}</span>
        </template>
      </Column>

      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-3">
            <button @click="emit('edit', data)" class="text-primary dark:text-indigo-400 hover:underline font-semibold">Edit</button>
            <button @click="emit('delete', data)" class="text-red-500 dark:text-red-400 hover:underline font-semibold">Delete</button>
          </div>
        </template>
      </Column>

    </AppTable>
  </div>
</template>
