<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'
import SearchBar from './components/SearchBar.vue'
import type { Participant } from './types'

const participants = ref<Participant[]>([])
const STORAGE_KEY = 'lottery_participants'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    participants.value = JSON.parse(saved)
  }
})

watch(participants, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

const existingEmails = computed(() => {
  return participants.value.map(p => p.email)
})

const handleAddParticipant = (newParticipantData: Omit<Participant, 'id'>) => {
  const newParticipant: Participant = {
    ...newParticipantData,
    id: Date.now()
  }
  participants.value.push(newParticipant)
}

const filterQuery = ref('')
const currentSortKey = ref<'name' | 'dob' | null>(null)
const currentSortOrder = ref<'asc' | 'desc'>('asc')

const handleFilter = (query: string) => {
  filterQuery.value = query
}

const handleSort = (key: 'name' | 'dob') => {
  if (currentSortKey.value === key) {
    currentSortOrder.value = currentSortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSortKey.value = key
    currentSortOrder.value = 'asc'
  }
}

const processedParticipants = computed(() => {
  let result = [...participants.value]

  if (filterQuery.value) {
    const q = filterQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(q))
  }

  if (currentSortKey.value) {
    result.sort((a, b) => {
      let valA: any = a[currentSortKey.value!]
      let valB: any = b[currentSortKey.value!]

      if (currentSortKey.value === 'dob') {
        valA = new Date(valA).getTime()
        valB = new Date(valB).getTime()
      } else {
        valA = valA.toLowerCase()
        valB = valB.toLowerCase()
      }

      if (valA < valB) return currentSortOrder.value === 'asc' ? -1 : 1
      if (valA > valB) return currentSortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})
</script>

<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <RegistrationForm 
        :existing-emails="existingEmails"
        @add-participant="handleAddParticipant"
      />

      <div>
        <h2 class="text-xl font-bold text-gray-800 mb-4">Participants List</h2>
        
        <SearchBar @filter-by-name="handleFilter" />
        
        <ParticipantsTable 
          :participants="processedParticipants"
          :sort-key="currentSortKey"
          :sort-order="currentSortOrder"
          @sort="handleSort"
        />
      </div>
      
    </div>
  </div>
</template>
