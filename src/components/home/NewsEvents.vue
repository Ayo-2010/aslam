<script setup lang="ts">
import { news } from '@/data/news'
import { events } from '@/data/events'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import NewsCard from '@/components/shared/NewsCard.vue'
import EventCard from '@/components/shared/EventCard.vue'
import Button from '@/components/ui/Button.vue'
import Reveal from '@/components/shared/Reveal.vue'

const featuredNews = news.slice(0, 3)
const upcomingEvents = events.slice(0, 2)
</script>

<template>
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="news-title">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="News & Events"
            title="What’s Happening at Aslam School"
            lede="Achievements, campus updates and the dates worth putting in your calendar."
          />
        </Reveal>
        <Reveal :delay="100">
          <div class="flex shrink-0 gap-3">
            <Button to="/news" variant="outline" size="sm">All news</Button>
            <Button to="/events" variant="outline" size="sm">All events</Button>
          </div>
        </Reveal>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-7">
          <h2 id="news-title" class="sr-only">Latest news</h2>
          <ul class="grid gap-6 sm:grid-cols-2">
            <Reveal v-for="(article, index) in featuredNews" :key="article.slug" as="li" :delay="index * 80">
              <NewsCard :article="article" />
            </Reveal>
          </ul>
        </div>

        <div class="lg:col-span-5">
          <h2 class="sr-only">Upcoming events</h2>
          <ul class="grid gap-6">
            <Reveal v-for="(event, index) in upcomingEvents" :key="event.slug" as="li" :delay="index * 90">
              <EventCard :event="event" layout="horizontal" />
            </Reveal>
          </ul>

          <Reveal :delay="180">
            <div class="mt-6 rounded-2xl border border-forest-700/10 bg-canvas p-6">
              <h3 class="font-display text-lg text-forest-700">Keep up with school life</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">
                Parents receive announcements, deadlines and term dates as soon as they are published.
              </p>
              <div class="mt-4">
                <Button to="/parent-portal" variant="primary" size="sm">Sign in to the portal</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
</template>
