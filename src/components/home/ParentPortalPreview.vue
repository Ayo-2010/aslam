<script setup lang="ts">
import { ArrowRight, FileText, CalendarCheck, Receipt, MessageSquare, Megaphone, Wallet } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Reveal from '@/components/shared/Reveal.vue'

const features = [
  { id: 'reports', icon: FileText, label: 'View report cards', detail: 'Subject results and teacher commentary by term.' },
  { id: 'attendance', icon: CalendarCheck, label: 'Monitor attendance', detail: 'Daily present, absent and late records.' },
  { id: 'bills', icon: Wallet, label: 'View school bills', detail: 'Invoices, balances and due dates in one place.' },
  { id: 'receipts', icon: Receipt, label: 'Download receipts', detail: 'Official payment receipts, ready to print.' },
  { id: 'messages', icon: MessageSquare, label: 'Communicate with teachers', detail: 'Message form tutors and subject teachers directly.' },
  { id: 'announcements', icon: Megaphone, label: 'Receive announcements', detail: 'School news, deadlines and reminders as they happen.' },
]

const subjects = [
  { name: 'Mathematics', score: 88 },
  { name: 'English', score: 81 },
  { name: 'Basic Science', score: 84 },
  { name: 'Computer Studies', score: 90 },
]
</script>

<template>
  <section class="relative overflow-hidden bg-forest-800 py-16 sm:py-20 lg:py-24" aria-labelledby="portal-title">
    <div class="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-forest-600/25 blur-3xl"
      aria-hidden="true"
    />

    <div class="container-page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <div>
          <p class="eyebrow !text-gold-light">
            <span class="h-px w-6 bg-gold" aria-hidden="true" />
            Parent Portal
          </p>
          <h2 id="portal-title" class="mt-4 font-display text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
            Stay Connected to Your Child’s Education
          </h2>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-white/75">
            A secure space for parents to follow academic progress, attendance and fees — and to reach a teacher
            directly when something needs to be discussed.
          </p>

          <ul class="mt-9 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <li v-for="feature in features" :key="feature.id" class="flex gap-3">
              <span
                class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-gold-light"
                aria-hidden="true"
              >
                <component :is="feature.icon" :size="17" />
              </span>
              <span>
                <span class="block text-sm font-semibold text-white">{{ feature.label }}</span>
                <span class="mt-0.5 block text-xs leading-relaxed text-white/60">{{ feature.detail }}</span>
              </span>
            </li>
          </ul>

          <div class="mt-10">
            <Button to="/parent-portal" variant="gold" size="lg">
              Access Parent Portal
              <ArrowRight :size="18" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Reveal>

      <Reveal :delay="140" :y="26">
        <div
          class="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-forest-900/70 p-4 shadow-2xl backdrop-blur sm:p-5"
          role="img"
          aria-label="Preview of the parent dashboard showing attendance, outstanding fees and subject performance for Amina Aslam"
        >
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p class="text-[0.65rem] uppercase tracking-wider text-white/50">Dashboard</p>
              <p class="font-display text-base text-white">Amina Aslam · JSS 2</p>
            </div>
            <span class="rounded-full bg-forest-600/60 px-2.5 py-1 text-[0.65rem] font-semibold text-gold-light">
              96% attendance
            </span>
          </div>

          <dl class="mt-4 grid grid-cols-3 gap-2.5">
            <div class="rounded-xl bg-white/5 p-3">
              <dt class="text-[0.6rem] uppercase tracking-wider text-white/60">Present</dt>
              <dd class="mt-1 font-display text-xl text-white">46</dd>
            </div>
            <div class="rounded-xl bg-white/5 p-3">
              <dt class="text-[0.6rem] uppercase tracking-wider text-white/60">Absent</dt>
              <dd class="mt-1 font-display text-xl text-white">2</dd>
            </div>
            <div class="rounded-xl bg-white/5 p-3">
              <dt class="text-[0.6rem] uppercase tracking-wider text-white/60">Late</dt>
              <dd class="mt-1 font-display text-xl text-white">1</dd>
            </div>
          </dl>

          <div class="mt-4 rounded-xl bg-white/5 p-3.5">
            <div class="flex items-center justify-between">
              <p class="text-[0.65rem] uppercase tracking-wider text-white/60">Outstanding fees</p>
              <span class="rounded-full bg-red-400/15 px-2 py-0.5 text-[0.6rem] font-semibold text-red-200">Overdue</span>
            </div>
            <p class="mt-1.5 font-display text-2xl text-white">₦359,500</p>
            <p class="mt-0.5 text-[0.65rem] text-white/60">Due 30 September 2026</p>
          </div>

          <div class="mt-4 rounded-xl bg-white/5 p-3.5">
            <p class="text-[0.65rem] uppercase tracking-wider text-white/60">Subject performance</p>
            <ul class="mt-3 space-y-2.5">
              <li v-for="subject in subjects" :key="subject.name">
                <div class="flex items-center justify-between text-[0.7rem] text-white/70">
                  <span>{{ subject.name }}</span>
                  <span class="font-semibold tabular-nums text-white">{{ subject.score }}%</span>
                </div>
                <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    class="h-full rounded-full bg-gold transition-all duration-700"
                    :style="{ width: `${subject.score}%` }"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>
