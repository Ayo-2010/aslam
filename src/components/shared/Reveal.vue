<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'

const props = withDefaults(
  defineProps<{
    delay?: number
    as?: string
    y?: number
  }>(),
  { delay: 0, as: 'div', y: 18 },
)

const { target, visible } = useReveal()
</script>

<template>
  <component
    :is="props.as"
    ref="target"
    class="transition-all duration-700 ease-out motion-reduce:transition-none"
    :style="{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translateY(${props.y}px)`,
      transitionDelay: `${props.delay}ms`,
    }"
  >
    <slot />
  </component>
</template>
