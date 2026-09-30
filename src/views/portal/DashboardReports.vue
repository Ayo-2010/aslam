<script setup lang="ts">
import { computed, ref } from 'vue'
import { Download, Printer } from 'lucide-vue-next'
import { children, portalTerms, portalYears, subjectResults, termComments } from '@/data/portal'
import Badge from '@/components/ui/Badge.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

const childId = ref(children[0]!.id)
const term = ref(portalTerms[1]!)
const year = ref(portalYears[0]!)

const child = computed(() => children.find((item) => item.id === childId.value) ?? children[0]!)
const average = computed(
  () => Math.round(subjectResults.reduce((sum, item) => sum + item.score, 0) / subjectResults.length),
)

const position = computed(() => {
  const best = Math.max(...subjectResults.map((item) => item.score))
  return subjectResults.findIndex((item) => item.score === best) + 1
})

/** Generates a printable copy of the report card using the browser's print dialog. */
const printReport = (): void => window.print()

const gradeTone = (score: number): 'green' | 'gold' | 'danger' =>
  score >= 80 ? 'green' : score >= 70 ? 'gold' : 'danger'
</script>

<template>
  <div class="space-y-6">
    <!-- Controls -->
    <section
      class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-6"
      aria-labelledby="report-filters-title"
    >
      <h2 id="report-filters-title" class="font-display text-lg text-forest-700">Select a report</h2>

      <div class="mt-5 grid gap-4 sm:grid-cols-3">
        <div class="flex flex-col gap-1.5">
          <label for="report-child" class="text-sm font-medium text-ink">Student</label>
          <select
            id="report-child"
            v-model="childId"
            class="min-h-[2.9rem] rounded-xl border border-forest-700/15 bg-white px-4 text-[0.95rem] text-ink focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
          >
            <option v-for="item in children" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="report-term" class="text-sm font-medium text-ink">Term</label>
          <select
            id="report-term"
            v-model="term"
            class="min-h-[2.9rem] rounded-xl border border-forest-700/15 bg-white px-4 text-[0.95rem] text-ink focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
          >
            <option v-for="item in portalTerms" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="report-year" class="text-sm font-medium text-ink">Academic year</label>
          <select
            id="report-year"
            v-model="year"
            class="min-h-[2.9rem] rounded-xl border border-forest-700/15 bg-white px-4 text-[0.95rem] text-ink focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
          >
            <option v-for="item in portalYears" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-muted" aria-live="polite">
          Showing results for <strong class="text-ink">{{ child.name }}</strong> — {{ term }}, {{ year }}
        </p>
        <div class="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            class="inline-flex min-h-[2.6rem] items-center justify-center gap-2 rounded-full border border-forest-700/20 px-5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
            @click="printReport"
          >
            <Printer :size="15" aria-hidden="true" />
            Print report
          </button>
          <button
            type="button"
            class="inline-flex min-h-[2.6rem] items-center justify-center gap-2 rounded-full bg-forest-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
            @click="printReport"
          >
            <Download :size="15" aria-hidden="true" />
            Download
          </button>
        </div>
      </div>
    </section>

    <!-- Report card -->
    <section
      class="overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card"
      aria-labelledby="report-card-title"
    >
      <header class="flex flex-col gap-4 border-b border-forest-700/10 bg-forest-700 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div class="flex items-center gap-4">
          <SmartImage
            :src="child.avatar"
            :alt="child.avatarAlt"
            ratio="1 / 1"
            rounded="rounded-full"
            sizes="56px"
            class="h-12 w-12 shrink-0 ring-2 ring-gold/40"
          />
          <div>
            <p class="font-display text-xl">{{ child.name }}</p>
            <p class="mt-0.5 text-sm text-white/70">{{ child.grade }} · {{ year }} · {{ term }}</p>
          </div>
        </div>
        <div class="sm:text-right">
          <p class="text-xs uppercase tracking-wider text-white/60">Average score</p>
          <p class="font-display text-3xl text-gold-light">{{ average }}%</p>
        </div>
      </header>

      <div class="p-5 sm:p-7">
        <h3 id="report-card-title" class="sr-only">Subject results</h3>

        <div class="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table class="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption class="sr-only">Subject results, teacher remarks and grades for the selected term</caption>
            <thead>
              <tr class="border-b border-forest-700/10 text-xs uppercase tracking-wider text-muted">
                <th scope="col" class="py-3 pr-4 font-semibold">Subject</th>
                <th scope="col" class="px-4 py-3 font-semibold">Teacher</th>
                <th scope="col" class="px-4 py-3 text-right font-semibold">Score</th>
                <th scope="col" class="px-4 py-3 text-center font-semibold">Grade</th>
                <th scope="col" class="py-3 pl-4 font-semibold">Remark</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-forest-700/10">
              <tr v-for="item in subjectResults" :key="item.subject" class="align-top">
                <th scope="row" class="py-3.5 pr-4 font-semibold text-ink">{{ item.subject }}</th>
                <td class="px-4 py-3.5 text-muted">{{ item.teacher }}</td>
                <td class="px-4 py-3.5 text-right tabular-nums font-semibold text-forest-700">{{ item.score }}%</td>
                <td class="px-4 py-3.5 text-center">
                  <Badge :tone="gradeTone(item.score)">{{ item.grade }}</Badge>
                </td>
                <td class="py-3.5 pl-4 text-muted">{{ item.remark }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <dl class="mt-7 grid gap-5 sm:grid-cols-3">
          <div class="rounded-xl bg-forest-50 p-5">
            <dt class="text-xs font-semibold uppercase tracking-wider text-muted">Class position</dt>
            <dd class="mt-2 font-display text-2xl text-forest-700">{{ position }} of 28</dd>
          </div>
          <div class="rounded-xl bg-forest-50 p-5 sm:col-span-2">
            <dt class="text-xs font-semibold uppercase tracking-wider text-muted">Form teacher’s comment</dt>
            <dd class="mt-2 text-sm leading-relaxed text-ink">{{ termComments.teacher }}</dd>
          </div>
        </dl>

        <div class="mt-5 rounded-xl border border-gold/40 bg-gold/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">Principal’s comment</p>
          <p class="mt-2 text-sm leading-relaxed text-ink">{{ termComments.principal }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
