<script setup lang="ts">
import { computed } from 'vue'
import AppButton from './ui/AppButton.vue'
import type { Participant } from '../types'

const props = defineProps<{
  participants: Participant[]
  winners: Participant[]
}>()

const emit = defineEmits<{
  (e: 'add-winner', participant: Participant): void
  (e: 'remove-winner', winnerId: number): void
}>()

const isButtonDisabled = computed(() => {
  if (props.winners.length >= 3) return true 
  if (props.participants.length === 0) return true 
  if (props.participants.length === props.winners.length) return true 
})

const pickRandomWinner = () => {
  if (isButtonDisabled.value) return

  const availableParticipants = props.participants.filter(
    p => !props.winners.some(w => w.id === p.id)
  )

  if (availableParticipants.length === 0) return

  const randomIndex = Math.floor(Math.random() * availableParticipants.length)
  const randomWinner = availableParticipants[randomIndex]

  if (randomWinner) {
    emit('add-winner', randomWinner)
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between gap-4">
    
    <div class="flex-grow flex flex-wrap items-center gap-2 border border-gray-300 rounded-md px-3 py-2 min-h-[42px]">
      <span v-if="winners.length === 0" class="text-gray-400 text-sm">Winners</span>
      
      <div 
        v-for="winner in winners" 
        :key="winner.id"
        class="bg-primary text-white text-sm px-2 py-1 rounded flex items-center gap-2"
      >
        {{ winner.name }}
        <button 
          @click="emit('remove-winner', winner.id)" 
          class="hover:text-gray-200 font-bold focus:outline-none"
        >
        ✕
        </button>
      </div>
    </div>

    <AppButton 
      @click="pickRandomWinner" 
      :disabled="isButtonDisabled"
    >
      New winner
    </AppButton>
    
  </div>
</template>
