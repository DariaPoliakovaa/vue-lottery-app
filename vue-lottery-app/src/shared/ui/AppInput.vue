<script setup lang="ts">
import InputText from 'primevue/inputtext'

defineProps<{
  modelValue: string | number
  label?: string
  error?: string
  type?: string
  placeholder?: string
  id?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <InputText
      :id="id"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="{ 'p-invalid': error }"
      class="w-full"
    />
    <small v-if="error" class="text-red-500 text-xs">{{ error }}</small>
  </div>
</template>
