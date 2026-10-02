<script setup lang="ts">
import RegistrationForm from './components/RegistrationForm.vue'

const handleAddParticipant = (participant: any) => {
  console.log('Новий учасник:', participant)
}
</script>

<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <RegistrationForm 
        :existingEmails="['test@example.com']" 
        @add-participant="handleAddParticipant"
      />
      
    </div>
  </div>
</template>
