<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, Phone, Search } from 'lucide-vue-next'
import { primaryNav } from '@/data/navigation'
import { school } from '@/data/school'
import { useScrolled } from '@/composables/useScroll'
import LogoMark from './LogoMark.vue'
import MobileMenu from './MobileMenu.vue'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const scrolled = useScrolled(10)
const menuOpen = ref(false)

const isActive = (to: string): boolean =>
  to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-[80] w-full border-b transition-all duration-300"
    :class="
      scrolled
        ? 'border-forest-700/10 bg-white/95 shadow-header backdrop-blur-md supports-[backdrop-filter]:bg-white/85'
        : 'border-transparent bg-white'
    "
  >
    <div class="container-page flex h-[4.5rem] items-center justify-between gap-4">
      <RouterLink to="/" class="rounded-lg py-1" aria-label="Aslam School — home">
        <LogoMark />
      </RouterLink>

      <nav aria-label="Primary" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in primaryNav" :key="link.to">
            <RouterLink
              :to="link.to"
              class="relative inline-flex min-h-[2.5rem] items-center rounded-full px-3.5 text-[0.9rem] font-medium transition-colors duration-200"
              :class="isActive(link.to) ? 'font-semibold text-forest-700' : 'text-ink/80 hover:text-forest-700'"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              {{ link.label }}
              <span
                class="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold transition-transform duration-300"
                :class="isActive(link.to) ? 'scale-x-100' : 'scale-x-0'"
                aria-hidden="true"
              />
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <RouterLink
          to="/search"
          class="hidden min-h-[2.5rem] w-[2.5rem] place-items-center rounded-full text-forest-700 transition-colors hover:bg-forest-50 sm:grid"
          aria-label="Search the site"
        >
          <Search :size="18" aria-hidden="true" />
        </RouterLink>

        <a
          :href="`tel:${school.contact.phone.replace(/\s/g, '')}`"
          class="hidden min-h-[2.5rem] items-center gap-2 rounded-full px-2.5 text-sm font-medium text-forest-700 transition-colors hover:bg-forest-50 xl:inline-flex"
        >
          <Phone :size="16" aria-hidden="true" />
          {{ school.contact.phone }}
        </a>

        <Button to="/admissions#apply" variant="gold" size="sm" class="hidden sm:inline-flex">
          Apply Now
        </Button>

        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full border border-forest-700/15 text-forest-700 transition-colors hover:bg-forest-50 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="menuOpen = !menuOpen"
        >
          <Menu :size="20" aria-hidden="true" />
        </button>
      </div>
    </div>

    <MobileMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>
