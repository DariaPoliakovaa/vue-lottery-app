<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
    :class="[
      disabled 
        ? 'bg-gray-disabled text-gray-500 cursor-not-allowed' 
        : variant === 'secondary' 
          ? 'bg-gray-light text-gray-700 hover:bg-gray-200'
          : variant === 'danger'
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-primary text-white hover:bg-primary-hover'
    ]"
  >
    <slot />
  </button>
</template>
