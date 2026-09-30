<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'green' | 'gold' | 'neutral' | 'danger' | 'info' | 'onDark'
    size?: 'sm' | 'md'
    dot?: boolean
  }>(),
  { tone: 'green', size: 'sm' },
)
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider"
    :class="[
      size === 'sm' ? 'px-2.5 py-1 text-[0.65rem]' : 'px-3 py-1.5 text-xs',
      {
        'border-forest-700/15 bg-forest-50 text-forest-700': tone === 'green',
        'border-gold/40 bg-gold/10 text-gold-dark': tone === 'gold',
        'border-forest-700/10 bg-canvas text-muted': tone === 'neutral',
        'border-red-200 bg-red-50 text-red-800': tone === 'danger',
        'border-sky-200 bg-sky-50 text-sky-800': tone === 'info',
        'border-gold/45 bg-forest-700/40 text-gold-light': tone === 'onDark',
      },
    ]"
  >
    <span
      v-if="dot"
      class="h-1.5 w-1.5 rounded-full bg-current"
      :class="tone === 'danger' ? 'animate-pulse' : ''"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
