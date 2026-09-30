<script setup lang="ts">
import { computed, ref } from 'vue'
import { CalendarDays, Megaphone, TrendingUp, Wallet, CheckCircle2, XCircle, Clock3 } from 'lucide-vue-next'
import {
  children,
  attendance,
  subjectResults,
  outstandingBalance,
  portalAnnouncements,
  schoolCalendar,
  feeRecords,
} from '@/data/portal'
import { naira } from '@/data/fees'
import SmartImage from '@/components/ui/SmartImage.vue'
import Badge from '@/components/ui/Badge.vue'
import Reveal from '@/components/shared/Reveal.vue'

const selectedChild = ref(children[0]!.id)
const child = computed(() => children.find((item) => item.id === selectedChild.value) ?? children[0]!)

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<template>
  <div class="space-y-6">
    <!-- Child overview -->
    <section
      class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
      aria-labelledby="child-overview-title"
    >
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <SmartImage
            :src="child.avatar"
            :alt="child.avatarAlt"
            ratio="1 / 1"
            rounded="rounded-full"
            sizes="64px"
            class="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
          />
          <div>
            <h2 id="child-overview-title" class="font-display text-xl text-forest-700 sm:text-2xl">{{ child.name }}</h2>
            <p class="mt-1 text-sm text-muted">
              {{ child.grade }} · Form teacher: {{ child.classTeacher }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <label for="child-switcher" class="sr-only">Select child</label>
          <select
            id="child-switcher"
            v-model="selectedChild"
            class="min-h-[2.6rem] rounded-full border border-forest-700/15 bg-canvas px-4 text-sm text-ink focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
          >
            <option v-for="item in children" :key="item.id" :value="item.id">{{ item.name }} · {{ item.grade }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Summary tiles -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Reveal>
        <article class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-muted">Attendance</span>
            <CalendarDays :size="17" class="text-forest-600" aria-hidden="true" />
          </div>
          <p class="mt-3 font-display text-3xl text-forest-700">{{ child.attendance }}%</p>
          <p class="mt-1 text-xs text-muted">{{ attendance.present }} of {{ attendance.total }} days present</p>
        </article>
      </Reveal>

      <Reveal :delay="70">
        <article class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-muted">Class average</span>
            <TrendingUp :size="17" class="text-forest-600" aria-hidden="true" />
          </div>
          <p class="mt-3 font-display text-3xl text-forest-700">
            {{ Math.round(subjectResults.reduce((sum, item) => sum + item.score, 0) / subjectResults.length) }}%
          </p>
          <p class="mt-1 text-xs text-muted">Across {{ subjectResults.length }} subjects this term</p>
        </article>
      </Reveal>

      <Reveal :delay="140">
        <article class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-muted">Outstanding fees</span>
            <Wallet :size="17" class="text-forest-600" aria-hidden="true" />
          </div>
          <p class="mt-3 font-display text-3xl text-forest-700">{{ naira(outstandingBalance.amount) }}</p>
          <p class="mt-1 text-xs text-muted">Due {{ formatDate(outstandingBalance.dueDate) }}</p>
        </article>
      </Reveal>

      <Reveal :delay="210">
        <article class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-muted">Unread messages</span>
            <Megaphone :size="17" class="text-forest-600" aria-hidden="true" />
          </div>
          <p class="mt-3 font-display text-3xl text-forest-700">1</p>
          <p class="mt-1 text-xs text-muted">From Mr. Emeka Nwosu</p>
        </article>
      </Reveal>
    </div>

    <div class="grid gap-6 xl:grid-cols-12">
      <!-- Academic performance -->
      <Reveal class="xl:col-span-7">
        <section
          class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
          aria-labelledby="performance-title"
        >
          <div class="flex items-center justify-between gap-4">
            <h2 id="performance-title" class="font-display text-lg text-forest-700">Academic performance</h2>
            <RouterLink to="/parent-portal/dashboard/reports" class="link-underline text-sm">Full report</RouterLink>
          </div>

          <ul class="mt-6 space-y-4">
            <li v-for="item in subjectResults" :key="item.subject">
              <div class="flex items-baseline justify-between gap-3 text-sm">
                <span class="font-medium text-ink">{{ item.subject }}</span>
                <span class="tabular-nums text-muted">{{ item.score }}% · {{ item.grade }}</span>
              </div>
              <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-forest-50">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="item.score >= 80 ? 'bg-forest-600' : item.score >= 70 ? 'bg-gold' : 'bg-red-500'"
                  :style="{ width: `${item.score}%` }"
                />
              </div>
            </li>
          </ul>

          <p class="mt-6 flex items-start gap-2 rounded-xl bg-canvas p-4 text-xs leading-relaxed text-muted">
            <Clock3 :size="15" class="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
            Results are published at the end of each term. Continuous assessment scores are visible in the full
            report card.
          </p>
        </section>
      </Reveal>

      <div class="space-y-6 xl:col-span-5">
        <!-- Attendance summary -->
        <Reveal :delay="80">
          <section
            class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
            aria-labelledby="attendance-title"
          >
            <h2 id="attendance-title" class="font-display text-lg text-forest-700">Attendance this term</h2>
            <dl class="mt-5 grid grid-cols-3 gap-3">
              <div class="rounded-xl bg-forest-50 p-4 text-center">
                <dt class="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Present</dt>
                <dd class="mt-1.5 font-display text-2xl text-forest-700">{{ attendance.present }}</dd>
                <dd class="mt-1 flex items-center justify-center gap-1 text-[0.65rem] text-forest-600">
                  <CheckCircle2 :size="12" aria-hidden="true" /> On time
                </dd>
              </div>
              <div class="rounded-xl bg-red-50 p-4 text-center">
                <dt class="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Absent</dt>
                <dd class="mt-1.5 font-display text-2xl text-red-700">{{ attendance.absent }}</dd>
                <dd class="mt-1 flex items-center justify-center gap-1 text-[0.65rem] text-red-600">
                  <XCircle :size="12" aria-hidden="true" /> Excused
                </dd>
              </div>
              <div class="rounded-xl bg-gold/15 p-4 text-center">
                <dt class="text-[0.65rem] font-semibold uppercase tracking-wider text-gold-dark">Late</dt>
                <dd class="mt-1.5 font-display text-2xl text-gold-dark">{{ attendance.late }}</dd>
                <dd class="mt-1 flex items-center justify-center gap-1 text-[0.65rem] text-gold-dark">
                  <Clock3 :size="12" aria-hidden="true" /> Noted
                </dd>
              </div>
            </dl>
          </section>
        </Reveal>

        <!-- Outstanding fees -->
        <Reveal :delay="140">
          <section
            class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
            aria-labelledby="fees-summary-title"
          >
            <h2 id="fees-summary-title" class="font-display text-lg text-forest-700">Outstanding fees</h2>
            <p class="mt-4 font-display text-3xl text-forest-700">{{ naira(outstandingBalance.amount) }}</p>
            <p class="mt-1 text-sm text-muted">Due {{ formatDate(outstandingBalance.dueDate) }}</p>

            <div class="mt-4">
              <Badge tone="danger" dot>{{ outstandingBalance.status }}</Badge>
            </div>

            <ul class="mt-5 space-y-2 text-sm text-muted">
              <li v-for="item in outstandingBalance.breakdown" :key="item.label" class="flex justify-between gap-4">
                <span>{{ item.label }}</span>
                <span class="tabular-nums text-ink">{{ naira(item.amount) }}</span>
              </li>
            </ul>

            <div class="mt-6 flex flex-col gap-2.5">
              <RouterLink
                to="/parent-portal/dashboard/fees"
                class="inline-flex min-h-[2.6rem] items-center justify-center rounded-full bg-forest-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
              >
                Pay School Fees
              </RouterLink>
              <RouterLink
                to="/parent-portal/dashboard/fees"
                class="inline-flex min-h-[2.6rem] items-center justify-center rounded-full border border-forest-700/20 px-4 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
              >
                View all invoices
              </RouterLink>
            </div>
          </section>
        </Reveal>
      </div>
    </div>

    <!-- Announcements + calendar -->
    <div class="grid gap-6 xl:grid-cols-12">
      <Reveal class="xl:col-span-7">
        <section
          class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
          aria-labelledby="announcements-title"
        >
          <div class="flex items-center justify-between gap-4">
            <h2 id="announcements-title" class="font-display text-lg text-forest-700">Recent announcements</h2>
            <RouterLink to="/parent-portal/dashboard/announcements" class="link-underline text-sm">View all</RouterLink>
          </div>

          <ul class="mt-6 divide-y divide-forest-700/10">
            <li v-for="item in portalAnnouncements" :key="item.id" class="py-4 first:pt-0 last:pb-0">
              <div class="flex flex-wrap items-center gap-2.5">
                <Badge tone="neutral" size="sm">{{ item.tag }}</Badge>
                <time :datetime="item.date" class="text-xs text-muted">{{ formatDate(item.date) }}</time>
              </div>
              <p class="mt-2 text-sm font-semibold text-ink">{{ item.title }}</p>
              <p class="mt-1 text-sm leading-relaxed text-muted">{{ item.body }}</p>
            </li>
          </ul>
        </section>
      </Reveal>

      <Reveal :delay="90" class="xl:col-span-5">
        <section
          class="h-full rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
          aria-labelledby="calendar-title"
        >
          <h2 id="calendar-title" class="font-display text-lg text-forest-700">School calendar</h2>
          <ul class="mt-6 space-y-4">
            <li v-for="item in schoolCalendar" :key="item.id" class="flex gap-4">
              <div class="flex w-14 shrink-0 flex-col items-center rounded-xl bg-forest-50 py-2">
                <span class="font-display text-lg leading-none text-forest-700">
                  {{ new Date(`${item.date}T00:00:00`).getDate() }}
                </span>
                <span class="mt-1 text-[0.6rem] font-semibold uppercase tracking-wider text-gold-dark">
                  {{ new Date(`${item.date}T00:00:00`).toLocaleDateString('en-GB', { month: 'short' }) }}
                </span>
              </div>
              <div>
                <p class="text-sm font-semibold text-ink">{{ item.title }}</p>
                <p class="mt-0.5 text-xs text-muted">{{ item.detail }}</p>
              </div>
            </li>
          </ul>

          <div class="mt-6 rounded-xl bg-canvas p-4 text-xs leading-relaxed text-muted">
            Payment status for the current session:
            <span class="font-semibold text-forest-700">
              {{ feeRecords.filter((record) => record.status === 'Paid').length }} of {{ feeRecords.length }} invoices
              settled
            </span>.
          </div>
        </section>
      </Reveal>
    </div>
  </div>
</template>
