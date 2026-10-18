<script setup lang="ts">
import DataTable from 'primevue/datatable'

defineProps<{
  value: any[]
  dataKey?: string
  paginator?: boolean
  rows?: number
}>()
</script>

<template>
  <DataTable 
    :value="value" 
    :dataKey="dataKey || 'id'"
    :paginator="paginator" 
    :rows="rows || 10"
    class="p-datatable-sm shadow-sm rounded-lg overflow-hidden"
  >
    <slot />
  </DataTable>
</template>
