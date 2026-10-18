<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  label?: string
  icon?: string
  severity?: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'help' | 'contrast'
  variant?: 'text' | 'outlined' | 'link'
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

defineEmits(['click'])
</script>

<template>
  <Button 
    :label="label" 
    :icon="icon" 
    :severity="severity" 
    :variant="variant"
    :loading="loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </Button>
</template>
