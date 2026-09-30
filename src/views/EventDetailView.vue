<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, CalendarDays, Clock, MapPin } from 'lucide-vue-next'
import { news } from '@/data/news'
import { events } from '@/data/events'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/shared/PageHero.vue'
import EventCard from '@/components/shared/EventCard.vue'
import Reveal from '@/components/shared/Reveal.vue'
import NewsCard from '@/components/shared/NewsCard.vue'
import CtaSection from '@/components/shared/CtaSection.vue'

const route = useRoute()

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const event = computed(() => events.find((item) => item.slug === route.params.slug))
const otherEvents = computed(() => events.filter((item) => item.slug !== event.value?.slug).slice(0, 2))

useSeo({
  title: computed(() => (event.value ? `${event.value.title} | Aslam School` : 'Events | Aslam School')),
  description: computed(() => event.value?.description),
})
</script>

<template>
  <template v-if="event">
    <PageHero
      :eyebrow="event.category"
      :title="event.title"
      :lede="event.description"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Events', to: '/events' },
        { label: event.title },
      ]"
    />

    <section class="bg-white py-16 sm:py-20" aria-labelledby="event-details">
      <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <Reveal>
            <div>
              <dl class="grid gap-4 sm:grid-cols-3">
                <div class="rounded-2xl border border-forest-700/10 bg-canvas p-5">
                  <dt class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <CalendarDays :size="14" class="text-forest-600" aria-hidden="true" />
                    Date
                  </dt>
                  <dd class="mt-2 text-sm text-ink">{{ formatDate(event.date) }}</dd>
                </div>
                <div class="rounded-2xl border border-forest-700/10 bg-canvas p-5">
                  <dt class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Clock :size="14" class="text-forest-600" aria-hidden="true" />
                    Time
                  </dt>
                  <dd class="mt-2 text-sm text-ink">{{ event.time }}</dd>
                </div>
                <div class="rounded-2xl border border-forest-700/10 bg-canvas p-5">
                  <dt class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <MapPin :size="14" class="text-forest-600" aria-hidden="true" />
                    Location
                  </dt>
                  <dd class="mt-2 text-sm text-ink">{{ event.location }}</dd>
                </div>
              </dl>

              <div id="event-details" class="prose-body mt-10 space-y-4">
                <p v-for="paragraph in event.body" :key="paragraph.slice(0, 24)">{{ paragraph }}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <aside class="lg:col-span-5">
          <Reveal :delay="100">
            <div>
              <h2 class="font-display text-lg text-forest-700">Upcoming events</h2>
              <ul class="mt-5 space-y-5">
                <li v-for="item in otherEvents" :key="item.slug">
                  <EventCard :event="item" layout="horizontal" />
                </li>
              </ul>

              <div class="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-6">
                <h3 class="font-display text-lg text-forest-700">Attending this event?</h3>
                <p class="mt-2 text-sm leading-relaxed text-ink">
                  Let the school office know so we can plan numbers and materials.
                </p>
                <RouterLink
                  to="/contact"
                  class="mt-4 inline-flex min-h-[2.6rem] items-center rounded-full bg-forest-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
                >
                  Contact the school
                </RouterLink>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>

    <section class="bg-canvas py-16 sm:py-20" aria-labelledby="event-news">
      <div class="container-page">
        <h2 id="event-news" class="section-title">Latest news</h2>
        <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in news.slice(0, 3)" :key="item.slug">
            <NewsCard :article="item" />
          </li>
        </ul>
      </div>
    </section>

    <CtaSection
      title="Interested in joining Aslam School?"
      text="Our next intake is open. Read about the admission process, or apply online in five steps."
    />
  </template>

  <div v-else class="bg-white py-24">
    <div class="container-page text-center">
      <h1 class="font-display text-3xl text-forest-700">Event not found</h1>
      <p class="mt-4 text-muted">The event you are looking for may have been moved or removed.</p>
      <RouterLink
        to="/events"
        class="mt-8 inline-flex min-h-[2.9rem] items-center gap-2 rounded-full bg-forest-700 px-6 text-sm font-semibold text-white"
      >
        <ArrowLeft :size="15" aria-hidden="true" />
        View all events
      </RouterLink>
    </div>
  </div>
</template>
