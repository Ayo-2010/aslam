<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lede?: string
    align?: 'left' | 'center'
    tone?: 'light' | 'dark'
  }>(),
  { align: 'left', tone: 'light' },
)
</script>

<template>
  <div :class="[align === 'center' ? 'mx-auto text-center' : '', 'max-w-3xl']">
    <p v-if="eyebrow" class="eyebrow" :class="tone === 'dark' ? '!text-gold-light' : ''">
      <span class="h-px w-6 bg-gold" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <h2
      class="section-title mt-4"
      :class="tone === 'dark' ? '!text-white' : ''"
    >
      {{ title }}
    </h2>
    <p
      v-if="lede"
      class="section-lede"
      :class="[align === 'center' ? 'mx-auto' : '', tone === 'dark' ? '!text-white/75' : '']"
    >
      {{ lede }}
    </p>
    <slot />
  </div>
</template>
