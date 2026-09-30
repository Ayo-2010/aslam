<script setup lang="ts">
withDefaults(
  defineProps<{
    rows?: number
    label?: string
    cardClass?: string
  }>(),
  { rows: 3, label: 'Loading content' },
)
</script>

<template>
  <div :class="cardClass" role="status" aria-live="polite">
    <span class="sr-only">{{ label }}</span>
    <div class="space-y-3" aria-hidden="true">
      <div
        v-for="row in rows"
        :key="row"
        class="skeleton h-4 rounded-full"
        :class="row === 1 ? 'w-2/5' : row % 2 === 0 ? 'w-11/12' : 'w-full'"
      />
    </div>
  </div>
</template>
