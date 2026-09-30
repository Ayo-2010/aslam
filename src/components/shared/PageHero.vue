<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lede?: string
    breadcrumb: { label: string; to?: string }[]
  }>(),
  {},
)
</script>

<template>
  <section class="relative overflow-hidden bg-forest-800" aria-labelledby="page-hero-title">
    <div class="grain pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      aria-hidden="true"
    />

    <div class="container-page relative py-14 sm:py-16 lg:py-20">
      <nav aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          <li v-for="(item, index) in breadcrumb" :key="item.label" class="flex items-center gap-1.5">
            <RouterLink
              v-if="item.to"
              :to="item.to"
              class="transition-colors hover:text-gold-light"
            >
              {{ item.label }}
            </RouterLink>
            <span v-else class="font-medium text-gold-light" aria-current="page">{{ item.label }}</span>
            <ChevronRight v-if="index < breadcrumb.length - 1" :size="13" aria-hidden="true" />
          </li>
        </ol>
      </nav>

      <p v-if="eyebrow" class="eyebrow mt-6 !text-gold-light">
        <span class="h-px w-6 bg-gold" aria-hidden="true" />
        {{ eyebrow }}
      </p>

      <h1 id="page-hero-title" class="mt-4 max-w-3xl font-display text-3xl leading-[1.1] text-white sm:text-4xl lg:text-5xl">
        {{ title }}
      </h1>

      <p v-if="lede" class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
        {{ lede }}
      </p>
    </div>
  </section>
</template>
