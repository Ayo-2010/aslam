<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { academicPrograms } from '@/data/academics'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import Reveal from '@/components/shared/Reveal.vue'
import SmartImage from '@/components/ui/SmartImage.vue'
</script>

<template>
  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="programs-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Academic Programs"
          title="A Curriculum That Grows With Your Child"
          lede="Three stages, one continuous journey — from the first letters a pupil reads to the university offer a student earns."
        />
      </Reveal>

      <ul class="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3">
        <Reveal v-for="(program, index) in academicPrograms" :key="program.id" as="li" :delay="index * 90">
          <article
            class="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-card-hover"
          >
            <div class="relative">
              <SmartImage
                :src="program.image"
                :alt="program.imageAlt"
                ratio="16 / 10"
                rounded="rounded-none"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <span
                class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-forest-700 backdrop-blur"
              >
                {{ program.ageRange.split('·')[1]?.trim() ?? program.ageRange }}
              </span>
            </div>

            <div class="flex flex-1 flex-col p-6 sm:p-7">
              <h3 class="font-display text-xl text-forest-700 sm:text-2xl">{{ program.stage }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ program.summary }}</p>

              <ul class="mt-5 flex flex-wrap gap-2">
                <li
                  v-for="focus in program.focus"
                  :key="focus"
                  class="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700"
                >
                  {{ focus }}
                </li>
              </ul>

              <RouterLink
                :to="`/academics#${program.slug}`"
                class="link-underline mt-6 self-start text-sm"
                :aria-label="`${program.cta} — view the full program`"
              >
                {{ program.cta }}
                <ArrowRight :size="15" aria-hidden="true" />
              </RouterLink>
            </div>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
