<script setup lang="ts">
import { computed, ref } from 'vue'
import { news } from '@/data/news'
import PageHero from '@/components/shared/PageHero.vue'
import NewsCard from '@/components/shared/NewsCard.vue'
import Reveal from '@/components/shared/Reveal.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useSeo } from '@/composables/useSeo'


useSeo()

const categories = ['All', ...new Set(news.map((article) => article.category))]
const active = ref('All')

const filtered = computed(() =>
  active.value === 'All' ? news : news.filter((article) => article.category === active.value),
)
</script>

<template>
  <PageHero
    eyebrow="News"
    title="News & Stories from Aslam School"
    lede="Academic achievements, campus developments and the people behind them."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'News' }]"
  />

  <section class="bg-white py-16 sm:py-20" aria-labelledby="news-list-title">
    <div class="container-page">
      <h2 id="news-list-title" class="sr-only">All news articles</h2>

      <Reveal>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="min-h-[2.5rem] rounded-full border px-4 text-sm font-medium transition-all duration-300"
            :class="
              active === category
                ? 'border-forest-700 bg-forest-700 text-white'
                : 'border-forest-700/15 bg-white text-forest-700 hover:border-forest-700/40 hover:bg-forest-50'
            "
            :aria-pressed="active === category"
            @click="active = category"
          >
            {{ category }}
          </button>
        </div>
      </Reveal>

      <p class="mt-5 text-sm text-muted" aria-live="polite">
        Showing {{ filtered.length }} article{{ filtered.length === 1 ? '' : 's' }}
      </p>

      <ul v-if="filtered.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(article, index) in filtered" :key="article.slug" as="li" :delay="(index % 3) * 80">
          <NewsCard :article="article" />
        </Reveal>
      </ul>

      <EmptyState
        v-else
        class="mt-8"
        variant="empty"
        title="No articles in this category yet"
        description="Try another category, or browse all of our latest news."
      >
        <button
          type="button"
          class="mt-6 min-h-[2.5rem] rounded-full border border-forest-700/20 px-5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
          @click="active = 'All'"
        >
          Show all news
        </button>
      </EmptyState>
    </div>
  </section>
</template>
