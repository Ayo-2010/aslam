<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    to?: RouteLocationRaw
    href?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    block?: boolean
    ariaLabel?: string
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const variantClass = computed(() => {
  const map: Record<Variant, string> = {
    primary: 'bg-forest-700 text-white hover:bg-forest-600 shadow-sm',
    gold: 'bg-gold text-forest-900 hover:bg-gold-dark hover:text-white shadow-sm',
    outline: 'border border-forest-700/25 text-forest-700 hover:border-forest-700 hover:bg-forest-700 hover:text-white',
    ghost: 'text-forest-700 hover:bg-forest-50',
    dark: 'bg-forest-800 text-white hover:bg-forest-600',
  }
  return map[props.variant]
})

const sizeClass = computed(() => {
  const map: Record<Size, string> = {
    sm: 'px-3.5 py-2 text-sm min-h-[2.25rem]',
    md: 'px-5 py-2.5 text-sm min-h-[2.75rem] sm:text-[0.95rem]',
    lg: 'px-6 py-3.5 text-base min-h-[3rem]',
  }
  return map[props.size]
})
</script>

<template>
  <component
    :is="tag"
    class="group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-55 active:translate-y-px"
    :class="[variantClass, sizeClass, block ? 'w-full' : '']"
    :to="to"
    :href="href"
    :type="to || href ? undefined : type"
    :disabled="to || href ? undefined : disabled || loading"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel"
  >
    <span
      v-if="loading"
      class="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
    <slot />
  </component>
</template>
