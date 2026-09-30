<script setup lang="ts">
import { portalAnnouncements, schoolCalendar, children } from '@/data/portal'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <div class="space-y-6">
    <div class="grid gap-6 xl:grid-cols-12">
      <section class="xl:col-span-8" aria-labelledby="portal-announcements-title">
        <div class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7">
          <h2 id="portal-announcements-title" class="font-display text-lg text-forest-700">Recent announcements</h2>

          <ul class="mt-6 space-y-4">
            <li
              v-for="item in portalAnnouncements"
              :key="item.id"
              class="rounded-xl border border-forest-700/10 p-5 transition-colors hover:border-gold/50"
            >
              <div class="flex flex-wrap items-center gap-2.5">
                <Badge tone="neutral">{{ item.tag }}</Badge>
                <time :datetime="item.date" class="text-xs text-muted">{{ formatDate(item.date) }}</time>
              </div>
              <h3 class="mt-3 font-display text-base text-forest-700">{{ item.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ item.body }}</p>
            </li>
          </ul>
        </div>
      </section>

      <div class="space-y-6 xl:col-span-4">
        <section class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7" aria-labelledby="portal-calendar-title">
          <h2 id="portal-calendar-title" class="font-display text-lg text-forest-700">School calendar</h2>
          <ul class="mt-5 space-y-4">
            <li v-for="item in schoolCalendar" :key="item.id" class="flex gap-3.5">
              <div class="flex w-12 shrink-0 flex-col items-center rounded-xl bg-forest-50 py-1.5">
                <span class="font-display text-base leading-none text-forest-700">
                  {{ new Date(`${item.date}T00:00:00`).getDate() }}
                </span>
                <span class="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-gold-dark">
                  {{ new Date(`${item.date}T00:00:00`).toLocaleDateString('en-GB', { month: 'short' }) }}
                </span>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-ink">{{ item.title }}</p>
                <p class="mt-0.5 text-xs text-muted">{{ item.detail }}</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7" aria-labelledby="portal-children-title">
          <h2 id="portal-children-title" class="font-display text-lg text-forest-700">Enrolled children</h2>
          <ul class="mt-5 space-y-4">
            <li v-for="item in children" :key="item.id" class="flex items-center gap-3">
              <SmartImage
                :src="item.avatar"
                :alt="item.avatarAlt"
                ratio="1 / 1"
                rounded="rounded-full"
                sizes="40px"
                class="h-10 w-10 shrink-0"
              />
              <div>
                <p class="text-sm font-semibold text-ink">{{ item.name }}</p>
                <p class="text-xs text-muted">{{ item.grade }} · {{ item.classTeacher }}</p>
              </div>
            </li>
          </ul>
          <button
            type="button"
            class="mt-6 min-h-[2.6rem] w-full rounded-full border border-forest-700/20 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
          >
            Update profile details
          </button>
        </section>
      </div>
    </div>
  </div>
</template>
