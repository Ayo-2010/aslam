<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    padded?: boolean
    interactive?: boolean
    tone?: 'light' | 'white' | 'dark'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { as: 'div', padded: true, interactive: false, tone: 'light', size: 'md' },
)
</script>

<template>
  <component
    :is="as"
    class="rounded-2xl border transition-all duration-300 ease-out"
    :class="[
      {
        'border-forest-700/10 bg-white shadow-card': tone === 'light',
        'border-white/10 bg-forest-800': tone === 'dark',
        'border-forest-700/10 bg-forest-50/70': tone === 'white',
        'p-5 sm:p-6': padded && size === 'md',
        'p-4 sm:p-5': padded && size === 'sm',
        'p-6 sm:p-8 lg:p-10': padded && size === 'lg',
        'hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover': interactive,
      },
    ]"
  >
    <slot />
  </component>
</template>
