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
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
    <AppTable :value="participants">
      
      <Column header="#">
        <template #body="{ index }">
          <span class="text-gray-400">{{ index + 1 }}</span>
        </template>
      </Column>

      <Column header="Name">
        <template #header>
          <div class="cursor-pointer select-none" @click="emit('sort', 'name')">
            Name <span v-if="sortKey === 'name'" class="ml-1 text-primary">{{ sortOrder === 'asc' ? '↓' : '↑' }}</span>
          </div>
        </template>
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>

      <Column header="Date of Birth">
        <template #header>
          <div class="cursor-pointer select-none" @click="emit('sort', 'dob')">
            Date of Birth <span v-if="sortKey === 'dob'" class="ml-1 text-primary">{{ sortOrder === 'asc' ? '↓' : '↑' }}</span>
          </div>
        </template>
        <template #body="{ data }">
          {{ formatDate(data.dob) }}
        </template>
      </Column>

      <Column field="email" header="Email" />

      <Column field="phone" header="Phone number" />

      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-3">
            <button @click="emit('edit', data)" class="text-primary hover:underline font-semibold">Edit</button>
            <button @click="emit('delete', data)" class="text-red-500 hover:underline font-semibold">Delete</button>
          </div>
        </template>
      </Column>

    </AppTable>
  </div>
</template>
