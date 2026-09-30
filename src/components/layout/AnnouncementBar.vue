<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { announcements } from '@/data/announcements'
import { Megaphone, X, ArrowRight } from 'lucide-vue-next'

/**
 * Reads the active announcement from the data layer. In production this would
 * come from an admin API response of the same shape — the component only
 * depends on `announcements[0]`, so no markup changes are required.
 */
const announcement = computed(() => announcements[0] ?? null)

const dismissed = ref<string | null>(null)
const isDismissed = computed(() => announcement.value !== null && dismissed.value === announcement.value.id)
</script>

<template>
  <div
    v-if="announcement && !isDismissed"
    class="relative bg-forest-800 text-white"
    role="region"
    aria-label="School announcement"
  >
    <div class="container-page flex items-center gap-3 py-2.5 pr-10">
      <Megaphone :size="16" class="hidden shrink-0 text-gold-light sm:block" aria-hidden="true" />
      <p class="text-[0.8rem] leading-snug text-white/90 sm:text-sm">
        <span class="sr-only">Announcement: </span>
        {{ announcement.message }}
        <RouterLink
          v-if="announcement.linkTo && announcement.linkLabel"
          :to="announcement.linkTo"
          class="ml-1.5 inline-flex items-center gap-1 font-semibold text-gold-light underline-offset-4 hover:underline"
        >
          {{ announcement.linkLabel }}
          <ArrowRight :size="14" aria-hidden="true" />
        </RouterLink>
      </p>
    </div>

    <button
      type="button"
      class="absolute -right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Dismiss announcement"
      @click="dismissed = announcement?.id ?? null"
    >
      <X :size="16" aria-hidden="true" />
    </button>
  </div>
</template>
