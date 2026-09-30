<script setup lang="ts">
import { Inbox, SearchX, ServerCrash, ShieldAlert } from 'lucide-vue-next'
import Button from './Button.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    variant?: 'empty' | 'search' | 'error' | 'auth'
    actionLabel?: string
    actionTo?: string
  }>(),
  { variant: 'empty' },
)

const icons = {
  empty: Inbox,
  search: SearchX,
  error: ServerCrash,
  auth: ShieldAlert,
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-forest-700/15 bg-white px-6 py-14 text-center"
    role="status"
  >
    <span class="grid h-14 w-14 place-items-center rounded-2xl bg-forest-50 text-forest-600">
      <component :is="icons[variant]" :size="26" aria-hidden="true" />
    </span>
    <h3 class="mt-5 font-display text-xl text-forest-700">{{ title }}</h3>
    <p v-if="description" class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
      {{ description }}
    </p>
    <Button v-if="actionLabel && actionTo" :to="actionTo" variant="outline" size="sm" class="mt-6">
      {{ actionLabel }}
    </Button>
    <slot />
  </div>
</template>
