<script setup lang="ts">
import { computed, ref } from 'vue'
import { CalendarCheck, CheckCircle2, Clock3, XCircle } from 'lucide-vue-next'
import { attendance, attendanceBySubject, children } from '@/data/portal'

const childId = ref(children[0]!.id)
const child = computed(() => children.find((item) => item.id === childId.value) ?? children[0]!)

const records = [
  { date: '2026-09-18', status: 'Present', note: '' },
  { date: '2026-09-17', status: 'Present', note: '' },
  { date: '2026-09-16', status: 'Late', note: 'Arrived 8:20 AM' },
  { date: '2026-09-15', status: 'Present', note: '' },
  { date: '2026-09-14', status: 'Absent', note: 'Medical appointment — excused' },
  { date: '2026-09-11', status: 'Present', note: '' },
  { date: '2026-09-10', status: 'Present', note: '' },
  { date: '2026-09-09', status: 'Absent', note: 'Family travel — notified in advance' },
  { date: '2026-09-08', status: 'Present', note: '' },
]

const statusMeta: Record<string, { icon: typeof CheckCircle2; class: string; label: string }> = {
  Present: { icon: CheckCircle2, class: 'bg-forest-50 text-forest-700', label: 'Present' },
  Absent: { icon: XCircle, class: 'bg-red-50 text-red-700', label: 'Absent' },
  Late: { icon: Clock3, class: 'bg-gold/15 text-gold-dark', label: 'Late' },
}

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-6" aria-labelledby="att-filters">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="flex flex-col gap-1.5">
          <label for="att-child" class="text-sm font-medium text-ink">Student</label>
          <select
            id="att-child"
            v-model="childId"
            class="min-h-[2.9rem] rounded-xl border border-forest-700/15 bg-white px-4 text-[0.95rem] text-ink focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
          >
            <option v-for="item in children" :key="item.id" :value="item.id">
              {{ item.name }} · {{ item.grade }}
            </option>
          </select>
        </div>
        <p class="text-sm text-muted" aria-live="polite">
          Term 1 · 2025/26 · <strong class="text-ink">{{ child.name }}</strong>
        </p>
      </div>
    </section>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
        <p class="text-xs font-semibold uppercase tracking-wider text-muted">Attendance rate</p>
        <p class="mt-2.5 font-display text-3xl text-forest-700">{{ child.attendance }}%</p>
      </article>
      <article class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
        <p class="text-xs font-semibold uppercase tracking-wider text-muted">Days present</p>
        <p class="mt-2.5 font-display text-3xl text-forest-700">{{ attendance.present }}</p>
      </article>
      <article class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
        <p class="text-xs font-semibold uppercase tracking-wider text-muted">Days absent</p>
        <p class="mt-2.5 font-display text-3xl text-red-700">{{ attendance.absent }}</p>
      </article>
      <article class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card">
        <p class="text-xs font-semibold uppercase tracking-wider text-muted">Days late</p>
        <p class="mt-2.5 font-display text-3xl text-gold-dark">{{ attendance.late }}</p>
      </article>
    </div>

    <div class="grid gap-6 xl:grid-cols-12">
      <section
        class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7 xl:col-span-7"
        aria-labelledby="att-log-title"
      >
        <h2 id="att-log-title" class="font-display text-lg text-forest-700">Recent attendance log</h2>

        <ul class="mt-6 divide-y divide-forest-700/10">
          <li v-for="record in records" :key="record.date" class="flex items-center gap-4 py-3.5 first:pt-0">
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
              :class="statusMeta[record.status]?.class"
              aria-hidden="true"
            >
              <component :is="statusMeta[record.status]?.icon" :size="16" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-ink">{{ formatDate(record.date) }}</p>
              <p v-if="record.note" class="mt-0.5 text-xs text-muted">{{ record.note }}</p>
            </div>
            <span
              class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
              :class="statusMeta[record.status]?.class"
            >
              {{ statusMeta[record.status]?.label }}
            </span>
          </li>
        </ul>
      </section>

      <section
        class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7 xl:col-span-5"
        aria-labelledby="att-subject-title"
      >
        <h2 id="att-subject-title" class="flex items-center gap-2 font-display text-lg text-forest-700">
          <CalendarCheck :size="18" class="text-forest-600" aria-hidden="true" />
          Attendance by subject
        </h2>

        <ul class="mt-6 space-y-5">
          <li v-for="item in attendanceBySubject" :key="item.subject">
            <div class="flex items-baseline justify-between gap-3 text-sm">
              <span class="font-medium text-ink">{{ item.subject }}</span>
              <span class="tabular-nums text-muted">{{ item.present }}%</span>
            </div>
            <div
              class="mt-1.5 h-2 overflow-hidden rounded-full bg-forest-50"
              role="img"
              :aria-label="`${item.subject}: ${item.present} percent attendance`"
            >
              <div
                class="h-full rounded-full bg-forest-600"
                :style="{ width: `${item.present}%` }"
              />
            </div>
          </li>
        </ul>

        <p class="mt-6 rounded-xl bg-canvas p-4 text-xs leading-relaxed text-muted">
          Attendance below 85% in a term triggers a form tutor conversation and, where appropriate, contact with
          parents.
        </p>
      </section>
    </div>
  </div>
</template>
