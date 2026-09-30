<script setup lang="ts">
import { school } from '@/data/school'

withDefaults(defineProps<{ tone?: 'light' | 'dark'; size?: 'sm' | 'md' }>(), {
  tone: 'light',
  size: 'md',
})
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <span
      class="grid shrink-0 place-items-center rounded-xl font-display font-semibold text-white shadow-sm"
      :class="[
        size === 'sm' ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-lg',
        tone === 'light' ? 'bg-forest-700' : 'bg-white/10 ring-1 ring-white/25',
      ]"
      aria-hidden="true"
    >
      A
    </span>
    <span class="flex flex-col leading-none">
      <span
        class="font-display font-semibold tracking-tight"
        :class="[size === 'sm' ? 'text-base' : 'text-lg', tone === 'light' ? 'text-forest-700' : 'text-white']"
      >
        {{ school.name }}
      </span>
      <span
        class="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.16em]"
        :class="tone === 'light' ? 'text-muted' : 'text-gold-light'"
      >
        Lagos, Nigeria
      </span>
    </span>
  </span>
</template>
