<script setup lang="ts">
import { MapPin, Phone, Mail, Clock } from 'lucide-vue-next'
import { school } from '@/data/school'
import { footerNav, academicsNav, admissionsNav } from '@/data/navigation'
import LogoMark from './LogoMark.vue'
import BrandIcon from '@/components/shared/BrandIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative mt-auto overflow-hidden bg-forest-800 text-white/80">
    <div class="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

    <div class="container-page relative">
      <div class="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div class="lg:col-span-4">
          <LogoMark tone="dark" />
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            {{ school.tagline }} — combining academic excellence, character development and modern learning in a
            safe, inclusive school community.
          </p>

          <ul class="mt-6 space-y-3 text-sm">
            <li class="flex items-start gap-3">
              <MapPin :size="17" class="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>{{ school.contact.address }}</span>
            </li>
            <li class="flex items-start gap-3">
              <Phone :size="17" class="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <a :href="`tel:${school.contact.phone.replace(/\s/g, '')}`" class="hover:text-gold-light">
                {{ school.contact.phone }}
              </a>
            </li>
            <li class="flex items-start gap-3">
              <Mail :size="17" class="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <a :href="`mailto:${school.contact.email}`" class="hover:text-gold-light">{{ school.contact.email }}</a>
            </li>
            <li class="flex items-start gap-3">
              <Clock :size="17" class="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
              <span>{{ school.contact.hours }}</span>
            </li>
          </ul>

          <div class="mt-7 flex gap-2.5">
            <a
              v-for="item in school.social"
              :key="item.id"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10 hover:text-gold-light"
              :aria-label="`${school.name} on ${item.label}`"
            >
              <BrandIcon :name="item.id as 'facebook' | 'instagram' | 'x' | 'youtube'" :size="17" />
            </a>
          </div>
        </div>

        <nav class="lg:col-span-8" aria-label="Footer">
          <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">Explore</h2>
              <ul class="mt-4 space-y-2.5 text-sm">
                <li v-for="link in footerNav" :key="link.to">
                  <RouterLink :to="link.to" class="transition-colors hover:text-white">{{ link.label }}</RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">Academics</h2>
              <ul class="mt-4 space-y-2.5 text-sm">
                <li v-for="link in academicsNav" :key="link.to">
                  <RouterLink :to="link.to" class="transition-colors hover:text-white">{{ link.label }}</RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">Admissions</h2>
              <ul class="mt-4 space-y-2.5 text-sm">
                <li v-for="link in admissionsNav" :key="link.to">
                  <RouterLink :to="link.to" class="transition-colors hover:text-white">{{ link.label }}</RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="font-display text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">Get in touch</h2>
              <p class="mt-4 text-sm leading-relaxed">
                Ready to visit? Our open day runs every October, and the admissions office answers enquiries on
                weekdays.
              </p>
              <RouterLink
                to="/admissions#apply"
                class="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-forest-900 transition-colors hover:bg-gold-dark hover:text-white"
              >
                Apply Now
              </RouterLink>
            </div>
          </div>
        </nav>
      </div>

      <div
        class="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row sm:text-sm"
      >
        <p>© {{ year }} Aslam School. All Rights Reserved.</p>
        <ul class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li><RouterLink to="/contact" class="hover:text-white">Privacy Policy</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:text-white">Terms of Use</RouterLink></li>
          <li><RouterLink to="/search" class="hover:text-white">Site Search</RouterLink></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
