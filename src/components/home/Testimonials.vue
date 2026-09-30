<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-vue-next'
import { testimonials } from '@/data/testimonials'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

const index = ref(0)
const paused = ref(false)
let timer: number | undefined

const count = testimonials.length
const current = computed(() => testimonials[index.value] ?? testimonials[0]!)

const goTo = (next: number): void => {
  index.value = (next + count) % count
}

const next = (): void => goTo(index.value + 1)
const prev = (): void => goTo(index.value - 1)

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prev()
  }
}

/**
 * A slow auto-advance that stops on hover, on focus and when the visitor
 * requests reduced motion. It is deliberately gentle and never loops quickly.
 */
const startAuto = (): void => {
  stopAuto()
  if (paused.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(next, 9000)
}

const stopAuto = (): void => {
  if (timer) window.clearInterval(timer)
  timer = undefined
}

watch(index, startAuto)

watch(paused, (value) => (value ? stopAuto() : startAuto()))

onBeforeUnmount(stopAuto)
</script>

<template>
  <section
    class="bg-canvas py-16 sm:py-20 lg:py-24"
    aria-labelledby="testimonials-title"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
    @keydown="onKeydown"
  >
    <div class="container-page">
      <SectionHeading
        eyebrow="Testimonials"
        title="In the Words of Our School Community"
        lede="Parents, alumni and students on what actually changed for them."
        align="center"
      />

      <div class="relative mx-auto mt-12 max-w-4xl lg:mt-14">
        <div
          class="relative overflow-hidden rounded-2xl border border-forest-700/10 bg-white p-7 shadow-card sm:p-10 lg:p-12"
          role="group"
          aria-roledescription="carousel"
          :aria-label="`Testimonial ${index + 1} of ${count}`"
        >
          <Quote :size="30" class="text-gold/70" aria-hidden="true" />

          <div aria-live="polite" aria-atomic="true">
            <blockquote>
              <p class="mt-5 font-display text-xl leading-[1.5] text-forest-700 sm:text-2xl lg:text-[1.75rem]">
                “{{ current.quote }}”
              </p>
            </blockquote>

            <figcaption class="mt-8 flex items-center gap-4">
              <SmartImage
                :src="current.image"
                :alt="current.imageAlt"
                ratio="1 / 1"
                rounded="rounded-full"
                sizes="64px"
                class="h-14 w-14 shrink-0"
              />
              <div>
                <p class="font-semibold text-ink">{{ current.name }}</p>
                <p class="text-sm text-muted">{{ current.role }}<span v-if="current.detail"> · {{ current.detail }}</span></p>
              </div>
            </figcaption>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            class="grid h-11 w-11 place-items-center rounded-full border border-forest-700/15 bg-white text-forest-700 transition-all duration-300 hover:-translate-x-0.5 hover:border-forest-700 hover:bg-forest-700 hover:text-white"
            aria-label="Previous testimonial"
            @click="prev"
          >
            <ChevronLeft :size="18" aria-hidden="true" />
          </button>

          <ul class="flex items-center gap-1.5">
            <li v-for="(item, dot) in testimonials" :key="item.id">
              <button
                type="button"
                class="grid h-11 w-11 place-items-center rounded-full transition-colors duration-300 hover:bg-forest-50"
                :aria-label="`Show testimonial from ${item.name}`"
                :aria-current="dot === index ? 'true' : undefined"
                @click="goTo(dot)"
              >
                <span
                  class="block h-2.5 rounded-full transition-all duration-300"
                  :class="dot === index ? 'w-7 bg-gold' : 'w-2.5 bg-forest-700/25'"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>

          <button
            type="button"
            class="grid h-11 w-11 place-items-center rounded-full border border-forest-700/15 bg-white text-forest-700 transition-all duration-300 hover:translate-x-0.5 hover:border-forest-700 hover:bg-forest-700 hover:text-white"
            aria-label="Next testimonial"
            @click="next"
          >
            <ChevronRight :size="18" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
