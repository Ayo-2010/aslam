<script setup lang="ts">
import type { SchoolEvent } from '@/types'
import { ArrowRight, MapPin, Clock } from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

defineProps<{ event: SchoolEvent; layout?: 'vertical' | 'horizontal' }>()

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parts = (iso: string): { day: string; month: string } => {
  const date = new Date(`${iso}T00:00:00`)
  return { day: String(date.getDate()), month: MONTHS[date.getMonth()] }
}
</script>

<template>
  <article
    class="group flex overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
    :class="layout === 'horizontal' ? 'flex-col sm:flex-row' : 'flex-col'"
  >
    <div
      class="relative shrink-0"
      :class="layout === 'horizontal' ? 'sm:w-56' : ''"
    >
      <SmartImage
        :src="event.image"
        :alt="event.imageAlt"
        ratio="16 / 10"
        :rounded="'rounded-none'"
        sizes="(min-width: 640px) 320px, 100vw"
      />
      <div
        class="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white/95 px-3 py-2 text-center shadow-md backdrop-blur"
        aria-hidden="true"
      >
        <span class="font-display text-xl leading-none text-forest-700">{{ parts(event.date).day }}</span>
        <span class="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold-dark">
          {{ parts(event.date).month }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5 sm:p-6">
      <Badge tone="green">{{ event.category }}</Badge>

      <h3 class="mt-3 font-display text-lg leading-snug text-forest-700 sm:text-xl">
        <RouterLink :to="`/events/${event.slug}`" class="transition-colors hover:text-forest-600">
          {{ event.title }}
        </RouterLink>
      </h3>

      <p class="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{{ event.description }}</p>

      <dl class="mt-4 space-y-1.5 text-xs text-muted">
        <div class="flex items-center gap-2">
          <Clock :size="14" class="shrink-0 text-forest-600" aria-hidden="true" />
          <dt class="sr-only">Date and time</dt>
          <dd>{{ event.time }}</dd>
        </div>
        <div class="flex items-center gap-2">
          <MapPin :size="14" class="shrink-0 text-forest-600" aria-hidden="true" />
          <dt class="sr-only">Location</dt>
          <dd>{{ event.location }}</dd>
        </div>
      </dl>

      <RouterLink
        :to="`/events/${event.slug}`"
        class="link-underline mt-5 text-sm"
        :aria-label="`View details for ${event.title}`"
      >
        View details
        <ArrowRight :size="15" aria-hidden="true" />
      </RouterLink>
    </div>
  </article>
</template>
