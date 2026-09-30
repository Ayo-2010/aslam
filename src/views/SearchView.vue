<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight, FileText, Search as SearchIcon } from 'lucide-vue-next'
import { searchIndex, searchCategories, type SearchCategoryFilter } from '@/data/search'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/shared/PageHero.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const route = useRoute()
const router = useRouter()
useSeo()

const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const category = ref<SearchCategoryFilter>('All')

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (q.length < 2) return []

  return searchIndex
    .filter((entry) => {
      if (category.value !== 'All' && entry.category !== category.value) return false
      const haystack = `${entry.title} ${entry.excerpt} ${entry.keywords.join(' ')}`.toLowerCase()
      return haystack.includes(q)
    })
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(q) ? 0 : 1
      const bTitle = b.title.toLowerCase().includes(q) ? 0 : 1
      return aTitle - bTitle
    })
})

const countByCategory = (name: SearchCategoryFilter): number =>
  name === 'All'
    ? searchIndex.length
    : searchIndex.filter((entry) => entry.category === name).length

const onSubmit = (): void => {
  void router.replace({ name: 'search', query: query.value.trim() ? { q: query.value.trim() } : {} })
}

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : ''
  },
)
</script>

<template>
  <PageHero
    eyebrow="Search"
    title="Search Aslam School"
    lede="Find pages, news, events and academic programs in one place."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Search' }]"
  />

  <section class="bg-white py-16 sm:py-20" aria-labelledby="search-title">
    <div class="container-page">
      <h2 id="search-title" class="sr-only">Search results</h2>

      <form class="mx-auto max-w-2xl" role="search" @submit.prevent="onSubmit">
        <label for="site-search" class="text-sm font-medium text-ink">What are you looking for?</label>
        <div class="relative mt-2">
          <SearchIcon :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="site-search"
            v-model="query"
            type="search"
            placeholder="Try “fees”, “sports”, “science lab” or “open day”"
            class="min-h-[3.2rem] w-full rounded-full border border-forest-700/15 bg-canvas pl-12 pr-5 text-base text-ink placeholder:text-muted/70 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
            autocomplete="off"
          />
        </div>
      </form>

      <div class="mx-auto mt-10 max-w-4xl">
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter results by category">
          <button
            v-for="item in searchCategories"
            :key="item"
            type="button"
            class="min-h-[2.4rem] rounded-full border px-4 text-sm font-medium transition-all duration-300"
            :class="
              category === item
                ? 'border-forest-700 bg-forest-700 text-white'
                : 'border-forest-700/15 bg-white text-forest-700 hover:bg-forest-50'
            "
            :aria-pressed="category === item"
            @click="category = item"
          >
            {{ item }}
            <span class="ml-1.5 text-xs opacity-70">
              {{ item === 'All' ? searchIndex.length : countByCategory(item) }}
            </span>
          </button>
        </div>

        <p class="mt-6 text-sm text-muted" role="status" aria-live="polite">
          <template v-if="query.trim().length < 2">Enter at least two characters to search.</template>
          <template v-else>
            {{ results.length }} result{{ results.length === 1 ? '' : 's' }} for
            <strong class="text-ink">“{{ query.trim() }}”</strong>
          </template>
        </p>

        <ul v-if="results.length" class="mt-6 space-y-4">
          <li v-for="entry in results" :key="entry.id">
            <RouterLink
              :to="entry.to"
              class="group flex gap-4 rounded-2xl border border-forest-700/10 bg-canvas p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white hover:shadow-card"
            >
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-700 text-gold-light"
                aria-hidden="true"
              >
                <FileText :size="17" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex flex-wrap items-center gap-2">
                  <span class="text-[0.65rem] font-semibold uppercase tracking-wider text-gold-dark">
                    {{ entry.category }}
                  </span>
                </span>
                <span class="mt-1 block font-display text-lg text-forest-700">{{ entry.title }}</span>
                <span class="mt-1 block text-sm leading-relaxed text-muted">{{ entry.excerpt }}</span>
              </span>
              <ArrowRight
                :size="18"
                class="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-forest-700"
                aria-hidden="true"
              />
            </RouterLink>
          </li>
        </ul>

        <EmptyState
          v-else-if="query.trim().length >= 2"
          class="mt-6"
          variant="search"
          title="No results found"
          :description="`We could not find anything matching “${query.trim()}”. Try a shorter or more general term, or contact the school office.`"
          action-label="Return home"
          action-to="/"
        />
      </div>
    </div>
  </section>
</template>
