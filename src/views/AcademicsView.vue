<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, Check } from 'lucide-vue-next'
import { academicPrograms, extracurricular, programHighlights } from '@/data/academics'
import { images } from '@/data/images'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/shared/PageHero.vue'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import Reveal from '@/components/shared/Reveal.vue'
import Tabs from '@/components/ui/Tabs.vue'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'
import CtaSection from '@/components/shared/CtaSection.vue'
import Button from '@/components/ui/Button.vue'

useSeo()

const tabs = academicPrograms.map((program) => ({ id: program.slug, label: program.stage }))
const active = ref(tabs[0]?.id ?? 'primary')
const route = useRoute()

/** Deep links such as /academics#senior-secondary open the matching tab. */
const syncTabFromHash = (hash: string): void => {
  const id = hash.replace('#', '')
  if (tabs.some((tab) => tab.id === id)) active.value = id
}

onMounted(() => syncTabFromHash(route.hash))
watch(() => route.hash, syncTabFromHash)

const program = (): (typeof academicPrograms)[number] =>
  academicPrograms.find((item) => item.slug === active.value) ?? academicPrograms[0]!
</script>

<template>
  <PageHero
    eyebrow="Academics"
    title="Learning Designed for Every Stage"
    lede="A continuous curriculum from first letters to final examinations — structured, moderated and supported by teachers who know their students."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Academics' }]"
  />

  <!-- Tabs -->
  <section class="bg-white py-16 sm:py-20" aria-labelledby="programmes-title">
    <div class="container-page">
      <h2 id="programmes-title" class="sr-only">Academic programmes by stage</h2>

      <Tabs v-model="active" :items="tabs" label="Select an academic stage" />

      <div
        :id="`panel-${active}`"
        role="tabpanel"
        :aria-labelledby="`tab-${active}`"
        class="mt-10 animate-fade-in"
      >
        <article :id="program().slug" class="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-5">
            <SmartImage
              :src="program().image"
              :alt="program().imageAlt"
              ratio="4 / 3"
              rounded="rounded-2xl"
              sizes="(min-width: 1024px) 480px, 100vw"
            />

            <div class="mt-6 rounded-2xl border border-forest-700/10 bg-canvas p-6">
              <h3 class="font-display text-lg text-forest-700">At a glance</h3>
              <dl class="mt-4 space-y-3 text-sm">
                <div>
                  <dt class="font-semibold text-ink">Age range</dt>
                  <dd class="text-muted">{{ program().ageRange }}</dd>
                </div>
                <div>
                  <dt class="font-semibold text-ink">Progression</dt>
                  <dd class="text-muted">{{ program().progression }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="lg:col-span-7">
            <Badge tone="gold">{{ program().stage }}</Badge>
            <h3 class="mt-4 font-display text-2xl leading-snug text-forest-700 sm:text-3xl">
              {{ program().summary }}
            </h3>

            <div class="mt-8">
              <h4 class="font-display text-lg text-forest-700">Subjects offered</h4>
              <ul class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <li
                  v-for="subject in program().subjects"
                  :key="subject"
                  class="flex items-center gap-2 rounded-lg border border-forest-700/10 bg-white px-3.5 py-2.5 text-sm text-ink"
                >
                  <Check :size="15" class="shrink-0 text-forest-600" aria-hidden="true" />
                  {{ subject }}
                </li>
              </ul>
            </div>

            <div class="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 class="font-display text-lg text-forest-700">Learning objectives</h4>
                <ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <li v-for="item in program().objectives" :key="item" class="flex gap-2">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-display text-lg text-forest-700">Teaching approach</h4>
                <ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <li v-for="item in program().approach" :key="item" class="flex gap-2">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-8 rounded-2xl border border-forest-700/10 bg-canvas p-6">
              <h4 class="font-display text-lg text-forest-700">Assessment</h4>
              <ul class="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
                <li v-for="item in program().assessment" :key="item" class="flex gap-2">
                  <Check :size="15" class="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="mt-8">
              <Button :to="`/admissions#apply`" variant="primary">
                Apply for {{ program().stage }}
                <ArrowRight :size="16" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Program highlights -->
  <section class="bg-canvas py-16 sm:py-20" aria-labelledby="highlights-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Beyond the Timetable"
          title="Three Things That Run Through Every Stage"
          align="center"
        />
      </Reveal>

      <ul class="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal v-for="(item, index) in programHighlights" :key="item.id" as="li" :delay="index * 90">
          <article class="h-full rounded-2xl border border-forest-700/10 bg-white p-7 shadow-card">
            <h3 class="font-display text-lg text-forest-700">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ item.body }}</p>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>

  <!-- Extracurricular -->
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="activities-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Extracurricular"
          title="Clubs, Sports and Creative Arts"
          lede="More than twenty-five groups run through the year. Every student is expected to join at least one."
        />
      </Reveal>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <Reveal v-for="(group, index) in extracurricular" :key="group.id" :delay="index * 90">
          <article
            :id="group.id"
            class="h-full scroll-mt-28 rounded-2xl border border-forest-700/10 bg-canvas p-7 transition-all duration-300 hover:border-gold/50 hover:bg-white hover:shadow-card"
          >
            <h3 class="font-display text-xl text-forest-700">{{ group.title }}</h3>
            <p class="mt-2.5 text-sm leading-relaxed text-muted">{{ group.description }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li
                v-for="item in group.items"
                :key="item"
                class="rounded-full border border-forest-700/12 bg-white px-3 py-1.5 text-xs font-medium text-forest-700"
              >
                {{ item }}
              </li>
            </ul>
          </article>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Gallery -->
  <section class="bg-canvas py-16 sm:py-20" aria-labelledby="learning-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Inside the Classroom"
          title="Learning You Can See"
          align="center"
        />
      </Reveal>

      <ul class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Reveal v-for="(image, index) in [images.scienceLab, images.computerLab, images.library, images.arts]" :key="image" as="li" :delay="index * 70">
          <SmartImage
            :src="image"
            :alt="[
              'Students conducting a practical experiment in the science laboratory',
              'Students working at computers in the technology laboratory',
              'Shelves of books in the school library reading room',
              'Student artwork in the creative arts studio',
            ][index] ?? 'Aslam School learning environment'"
            ratio="4 / 3"
            rounded="rounded-2xl"
            sizes="(min-width: 1024px) 280px, 45vw"
          />
        </Reveal>
      </ul>
    </div>
  </section>

  <CtaSection
    title="Not Sure Which Stage Is Right?"
    text="Tell us your child’s age and current level, and the admissions office will guide you through the right program."
  />
</template>
