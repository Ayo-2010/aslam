<script setup lang="ts">
import { useCountUp } from '@/composables/useReveal'

const props = withDefaults(
  defineProps<{
    value: number
    prefix: string
    suffix: string
    label: string
    description: string
    delay?: number
  }>(),
  { delay: 0 },
)

const { target, value: current } = useCountUp(props.value, 1600)
</script>

<template>
  <div
    ref="target"
    class="group px-2 py-8 text-center transition-colors duration-300 sm:px-6 sm:py-10"
  >
    <dd class="font-display text-4xl leading-none text-forest-700 sm:text-5xl">
      <span class="tabular-nums">{{ prefix }}{{ current.toLocaleString('en-NG') }}{{ suffix }}</span>
    </dd>
    <dt class="mt-3 text-sm font-semibold text-ink sm:text-base">{{ label }}</dt>
    <p class="mx-auto mt-2 max-w-[16rem] text-xs leading-relaxed text-muted sm:text-sm">
      {{ description }}
    </p>
  </div>
</template>
