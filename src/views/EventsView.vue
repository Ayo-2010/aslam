<script setup lang="ts">
import { events } from '@/data/events'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/shared/PageHero.vue'
import EventCard from '@/components/shared/EventCard.vue'
import Reveal from '@/components/shared/Reveal.vue'
import CtaSection from '@/components/shared/CtaSection.vue'

useSeo()

const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
</script>

<template>
  <PageHero
    eyebrow="Events"
    title="Events & School Calendar"
    lede="Open days, sporting fixtures, conferences and arts showcases — the dates that shape each term."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Events' }]"
  />

  <section class="bg-white py-16 sm:py-20" aria-labelledby="events-list">
    <div class="container-page">
      <h2 id="events-list" class="sr-only">All school events</h2>
      <p class="text-sm text-muted" aria-live="polite">{{ sorted.length }} upcoming events</p>

      <ul class="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal v-for="(event, index) in sorted" :key="event.slug" as="li" :delay="(index % 2) * 80">
          <EventCard :event="event" layout="horizontal" />
        </Reveal>
      </ul>
    </div>
  </section>

  <CtaSection
    title="Planning a visit to the school?"
    text="Open days run each October, and individual visits can be arranged during administrative hours."
    primary-label="Contact the school"
  />
</template>
