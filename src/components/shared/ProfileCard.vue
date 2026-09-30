<script setup lang="ts">
import type { FacultyMember } from '@/types'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

defineProps<{ member: FacultyMember }>()
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
  >
    <SmartImage
      :src="member.image"
      :alt="member.imageAlt"
      ratio="4 / 5"
      :rounded="'rounded-none'"
      sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 100vw"
    />
    <div class="flex flex-1 flex-col p-5">
      <Badge tone="neutral">{{ member.department }}</Badge>
      <h3 class="mt-3 font-display text-lg text-forest-700">{{ member.name }}</h3>
      <p class="mt-1 text-sm font-medium text-gold-dark">{{ member.role }}</p>
      <p class="mt-3 text-sm leading-relaxed text-muted">{{ member.bio }}</p>
    </div>
  </article>
</template>
