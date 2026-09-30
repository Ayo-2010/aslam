<script setup lang="ts">
import { ref } from 'vue'
import { ImageOff } from 'lucide-vue-next'

/**
 * Image with a fixed aspect ratio (prevents layout shift), lazy loading below
 * the fold, and a branded fallback if the file cannot be loaded.
 */
withDefaults(
  defineProps<{
    src: string
    alt: string
    ratio?: string
    eager?: boolean
    sizes?: string
    rounded?: string
    overlay?: boolean
  }>(),
  { ratio: '4 / 3', sizes: '100vw', rounded: 'rounded-xl' },
)

const failed = ref(false)
</script>

<template>
  <div
    class="relative overflow-hidden bg-forest-100"
    :class="rounded"
    :style="{ aspectRatio: ratio }"
  >
    <img
      v-if="!failed"
      :src="src"
      :alt="alt"
      :sizes="sizes"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      class="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
      @error="failed = true"
    />

    <div
      v-else
      class="grain flex h-full w-full flex-col items-center justify-center gap-2 bg-forest-700 px-4 text-center"
      role="img"
      :aria-label="alt"
    >
      <ImageOff :size="22" class="text-gold-light" aria-hidden="true" />
      <span class="text-xs font-medium text-white/80">Aslam School</span>
    </div>

    <div v-if="overlay" class="pointer-events-none absolute inset-0" aria-hidden="true">
      <slot name="overlay" />
    </div>
  </div>
</template>
