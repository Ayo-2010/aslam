<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, CalendarDays } from 'lucide-vue-next'
import { news } from '@/data/news'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/shared/PageHero.vue'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'
import NewsCard from '@/components/shared/NewsCard.vue'
import CtaSection from '@/components/shared/CtaSection.vue'

const route = useRoute()

const article = computed(() => news.find((item) => item.slug === route.params.slug))
const related = computed(() => news.filter((item) => item.slug !== article.value?.slug).slice(0, 3))

useSeo({
  title: computed(() => (article.value ? `${article.value.title} | Aslam School` : 'News | Aslam School')),
  description: computed(() => article.value?.excerpt),
})

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <template v-if="article">
    <PageHero
      :eyebrow="article.category"
      :title="article.title"
      :lede="article.excerpt"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'News', to: '/news' },
        { label: article.title },
      ]"
    />

    <article class="bg-white py-16 sm:py-20">
      <div class="container-page">
        <div class="mx-auto max-w-3xl">
          <div class="flex flex-wrap items-center gap-4 text-sm text-muted">
            <Badge tone="gold">{{ article.category }}</Badge>
            <time :datetime="article.date">{{ formatDate(article.date) }}</time>
            <span aria-hidden="true">·</span>
            <span>{{ article.author }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ article.readingTime }}</span>
          </div>

          <SmartImage
            :src="article.image"
            :alt="article.imageAlt"
            ratio="16 / 9"
            rounded="rounded-2xl"
            sizes="(min-width: 768px) 768px, 100vw"
            eager
            class="mt-8"
          />

          <div class="prose-body mt-10 space-y-5">
            <p v-for="paragraph in article.body" :key="paragraph.slice(0, 24)">{{ paragraph }}</p>
          </div>

          <div class="mt-12 flex flex-col gap-4 border-t border-forest-700/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <RouterLink to="/news" class="link-underline text-sm">
              <ArrowLeft :size="15" aria-hidden="true" />
              Back to all news
            </RouterLink>
            <RouterLink
              to="/events"
              class="inline-flex min-h-[2.6rem] items-center gap-2 rounded-full border border-forest-700/20 px-4 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
            >
              <CalendarDays :size="15" aria-hidden="true" />
              Upcoming events
            </RouterLink>
          </div>
        </div>

        <section class="mt-16 border-t border-forest-700/10 pt-12" aria-labelledby="related-news">
          <h2 id="related-news" class="section-title">More from Aslam School</h2>
          <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="item in related" :key="item.slug">
              <NewsCard :article="item" />
            </li>
          </ul>
        </section>
      </div>
    </article>

    <CtaSection
      title="Want your child part of this story?"
      text="Applications for the 2026/27 session are open for Primary 1, Primary 4, JSS 1 and SS 1."
      primary-label="Start an application"
    />
  </template>

  <div v-else class="bg-white py-24">
    <div class="container-page text-center">
      <h1 class="font-display text-3xl text-forest-700">Article not found</h1>
      <p class="mt-4 text-muted">This article may have been archived. Browse the latest news instead.</p>
      <RouterLink
        to="/news"
        class="mt-8 inline-flex min-h-[2.9rem] items-center gap-2 rounded-full bg-forest-700 px-6 text-sm font-semibold text-white"
      >
        <ArrowLeft :size="15" aria-hidden="true" />
        View all news
      </RouterLink>
    </div>
  </div>
</template>
