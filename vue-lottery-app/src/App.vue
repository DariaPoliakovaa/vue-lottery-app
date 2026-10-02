<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'
import SearchBar from './components/SearchBar.vue'
import AppModal from './components/ui/AppModal.vue'
import EditParticipantForm from './components/EditParticipantForm.vue'
import AppButton from './components/ui/AppButton.vue'
import type { Participant } from './types'

const participants = ref<Participant[]>([])
const STORAGE_KEY = 'lottery_participants'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) { participants.value = JSON.parse(saved) }
})

watch(participants, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

const existingEmails = computed(() => participants.value.map(p => p.email))

const handleAddParticipant = (newParticipantData: Omit<Participant, 'id'>) => {
  participants.value.push({ ...newParticipantData, id: Date.now() })
}

const filterQuery = ref('')
const currentSortKey = ref<'name' | 'dob' | null>(null)
const currentSortOrder = ref<'asc' | 'desc'>('asc')

const handleFilter = (query: string) => { filterQuery.value = query }

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
        valA = new Date(valA).getTime(); valB = new Date(valB).getTime()
      } else {
        valA = valA.toLowerCase(); valB = valB.toLowerCase()
      }
      if (valA < valB) return currentSortOrder.value === 'asc' ? -1 : 1
      if (valA > valB) return currentSortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})

const isDeleteModalOpen = ref(false)
const participantToDelete = ref<Participant | null>(null)

const openDeleteModal = (participant: Participant) => {
  participantToDelete.value = participant
  isDeleteModalOpen.value = true
}

const confirmDelete = () => {
  if (participantToDelete.value) {
    participants.value = participants.value.filter(p => p.id !== participantToDelete.value!.id)
  }
  isDeleteModalOpen.value = false
  participantToDelete.value = null
}

const isEditModalOpen = ref(false)
const participantToEdit = ref<Participant | null>(null)

const openEditModal = (participant: Participant) => {
  participantToEdit.value = participant
  isEditModalOpen.value = true
}

const saveEdit = (updatedParticipant: Participant) => {
  const index = participants.value.findIndex(p => p.id === updatedParticipant.id)
  if (index !== -1) {
    participants.value[index] = updatedParticipant
  }
  isEditModalOpen.value = false
  participantToEdit.value = null
}
</script>

<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <RegistrationForm :existing-emails="existingEmails" @add-participant="handleAddParticipant" />

      <div>
        <h2 class="text-xl font-bold text-gray-800 mb-4">Participants List</h2>
        <SearchBar @filter-by-name="handleFilter" />
        <ParticipantsTable 
          :participants="processedParticipants"
          :sort-key="currentSortKey"
          :sort-order="currentSortOrder"
          @sort="handleSort"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
      
    </div>

    <AppModal 
      :is-open="isDeleteModalOpen" 
      title="Підтвердження видалення" 
      @close="isDeleteModalOpen = false"
    >
      <p v-if="participantToDelete" class="text-gray-600">
        Ви дійсно бажаєте видалити учасника <strong>{{ participantToDelete.name }}</strong>, {{ participantToDelete.email }}?
      </p>
      
      <template #footer>
        <AppButton variant="secondary" @click="isDeleteModalOpen = false">Ні</AppButton>
        <AppButton variant="danger" @click="confirmDelete">Так</AppButton>
      </template>
    </AppModal>

    <AppModal 
      :is-open="isEditModalOpen" 
      title="Редагувати дані" 
      @close="isEditModalOpen = false"
    >
      <EditParticipantForm 
        v-if="participantToEdit"
        :participant="participantToEdit"
        :existing-emails="existingEmails"
        @save="saveEdit"
      />
    </AppModal>

  </div>
</template>
