<script setup lang="ts">
import type { NewsArticle } from '@/types'
import { ArrowRight } from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

defineProps<{ article: NewsArticle }>()

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
  >
    <RouterLink :to="`/news/${article.slug}`" class="block" tabindex="-1" aria-hidden="true">
      <SmartImage
        :src="article.image"
        :alt="article.imageAlt"
        ratio="16 / 10"
        :rounded="'rounded-none'"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        class="group"
      />
    </RouterLink>

    <div class="flex flex-1 flex-col p-5 sm:p-6">
      <div class="flex flex-wrap items-center gap-3">
        <Badge tone="gold">{{ article.category }}</Badge>
        <time :datetime="article.date" class="text-xs font-medium text-muted">{{ formatDate(article.date) }}</time>
      </div>

      <h3 class="mt-4 font-display text-lg leading-snug text-forest-700 sm:text-xl">
        <RouterLink :to="`/news/${article.slug}`" class="transition-colors hover:text-forest-600">
          {{ article.title }}
        </RouterLink>
      </h3>

      <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{{ article.excerpt }}</p>

      <div class="mt-5 flex items-center justify-between border-t border-forest-700/10 pt-4">
        <span class="text-xs text-muted">{{ article.readingTime }}</span>
        <RouterLink
          :to="`/news/${article.slug}`"
          class="link-underline text-sm"
          :aria-label="`Read more: ${article.title}`"
        >
          Read more
          <ArrowRight :size="15" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </article>
</template>
