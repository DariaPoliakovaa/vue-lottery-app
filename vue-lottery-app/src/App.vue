<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'
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
</script>

<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <RegistrationForm 
        :existing-emails="existingEmails"
        @add-participant="handleAddParticipant"
      />

      <ParticipantsTable 
        :participants="participants"
      />
      
    </div>
  </div>
</template>
