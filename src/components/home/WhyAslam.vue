<script setup lang="ts">
import { getIcon } from '@/data/icons'
import { pillars } from '@/data/announcements'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import Reveal from '@/components/shared/Reveal.vue'
</script>

<template>
  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="why-aslam-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Why Aslam School"
          title="Why Choose Aslam School?"
          lede="An environment designed to develop confident, capable, and responsible young people."
        />
      </Reveal>

      <ul class="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        <Reveal v-for="(pillar, index) in pillars" :key="pillar.id" as="li" :delay="index * 90">
          <article
            class="group relative h-full overflow-hidden rounded-2xl border border-forest-700/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-card-hover sm:p-8"
          >
            <span
              class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-forest-50 transition-transform duration-500 group-hover:scale-125"
              aria-hidden="true"
            />

            <span
              class="relative grid h-14 w-14 place-items-center rounded-xl bg-forest-700 text-gold-light transition-colors duration-300 group-hover:bg-gold group-hover:text-forest-900"
              aria-hidden="true"
            >
              <component :is="getIcon(pillar.icon)" :size="24" />
            </span>

            <h3 class="relative mt-6 font-display text-xl text-forest-700 sm:text-2xl">{{ pillar.title }}</h3>
            <p class="relative mt-3 text-sm leading-relaxed text-muted sm:text-base">{{ pillar.body }}</p>

            <span
              class="relative mt-6 block h-0.5 w-10 origin-left scale-x-100 rounded-full bg-gold/70 transition-transform duration-300 group-hover:scale-x-[1.6]"
              aria-hidden="true"
            />
          </article>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
