<script setup lang="ts">
import type { Participant } from '../types'

defineProps<{
  participants: Participant[]
}>()

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-8">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-600">
        <thead class="bg-gray-50 text-gray-800 font-bold border-b border-gray-100">
          <tr>
            <th class="px-6 py-4">#</th>
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Date of Birth</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">Phone number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="participants.length === 0">
            <td colspan="5" class="px-6 py-8 text-center text-gray-500">
              Список учасників пустий
            </td>
          </tr>
          
          <tr 
            v-for="(participant, index) in participants" 
            :key="participant.id"
            class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4 text-gray-400">{{ index + 1 }}</td>
            <td class="px-6 py-4">{{ participant.name }}</td>
            <td class="px-6 py-4">{{ formatDate(participant.dob) }}</td>
            <td class="px-6 py-4">{{ participant.email }}</td>
            <td class="px-6 py-4">{{ participant.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
