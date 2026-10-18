<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useUsersStore } from '@/entities/user'
import type { Participant } from '@/entities/user'
import { WinnersBlock } from '@/widgets/users-table'
import { SearchBar } from '@/widgets/users-table'
import { ParticipantsTable } from '@/widgets/users-table'
import AppModal from '@/shared/ui/AppModal.vue'
import { EditParticipantForm } from '@/features/user-form'
import AppButton from '@/shared/ui/AppButton.vue'

const usersStore = useUsersStore()
const toast = useToast()
const { users: storeUsers, isLoading, error } = storeToRefs(usersStore)

const participants = computed<Participant[]>(() => {
  return storeUsers.value.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone || '+380000000000',
    dob: '2000-01-01'
  }))
})

const winnerIds = ref<number[]>([])
const STORAGE_KEY_WINNERS = 'lottery_winners'

onMounted(async () => {
  const savedWinners = localStorage.getItem(STORAGE_KEY_WINNERS)
  if (savedWinners) {
    winnerIds.value = JSON.parse(savedWinners)
  }

  try {
    await usersStore.fetchUsers({ limit: 15 })
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Помилка мережі', detail: 'Не вдалося завантажити учасників', life: 3000 })
  }
})

watch(winnerIds, (newVal) => {
  localStorage.setItem(STORAGE_KEY_WINNERS, JSON.stringify(newVal))
}, { deep: true })

const currentWinners = computed<Participant[]>(() => {
  return winnerIds.value
    .map(id => participants.value.find(p => p.id === id))
    .filter((p): p is Participant => p !== undefined)
})

const handleAddWinner = (winner: Participant) => {
  if (!winnerIds.value.includes(winner.id)) {
    winnerIds.value.push(winner.id)
    toast.add({ severity: 'success', summary: 'Переможець!', detail: `Додано переможця: ${winner.name}`, life: 2500 })
  }
}

const handleRemoveWinner = (winnerId: number) => {
  winnerIds.value = winnerIds.value.filter(id => id !== winnerId)
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
    const idToDelete = participantToDelete.value.id
    usersStore.removeUser(idToDelete)
    winnerIds.value = winnerIds.value.filter(id => id !== idToDelete)
    
    toast.add({ severity: 'info', summary: 'Видалено', detail: 'Учасника успішно видалено', life: 3000 })
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
  isEditModalOpen.value = false
  participantToEdit.value = null
  toast.add({ severity: 'success', summary: 'Оновлено', detail: 'Дані успішно оновлено', life: 3000 })
}
</script>

<template>
  <div class="min-h-screen py-6 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <h1 class="text-3xl font-bold text-center text-primary mb-8">Лотерея серед користувачів API</h1>
      
      <div v-if="isLoading" class="text-center py-12 text-gray-500">Завантаження учасників лотереї...</div>
      <div v-else-if="error" class="text-center py-12 text-red-500">{{ error }}</div>

      <template v-else>
        <WinnersBlock 
          :participants="participants"
          :winners="currentWinners"
          @add-winner="handleAddWinner"
          @remove-winner="handleRemoveWinner"
        />

        <div>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Учасники</h2>
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
      </template>
      
    </div>

    <AppModal :is-open="isDeleteModalOpen" title="Підтвердження видалення" @close="isDeleteModalOpen = false">
      <p v-if="participantToDelete" class="text-gray-600">
        Ви дійсно бажаєте видалити учасника <strong>{{ participantToDelete.name }}</strong>?
      </p>
      <template #footer>
        <AppButton variant="outlined" severity="secondary" @click="isDeleteModalOpen = false">Ні</AppButton>
        <AppButton severity="danger" @click="confirmDelete">Так</AppButton>
      </template>
    </AppModal>

    <AppModal :is-open="isEditModalOpen" title="Редагувати дані" @close="isEditModalOpen = false">
      <EditParticipantForm 
        v-if="participantToEdit"
        :participant="participantToEdit"
        :existing-emails="participants.map(p => p.email)"
        @save="saveEdit"
      />
    </AppModal>

  </div>
</template>
