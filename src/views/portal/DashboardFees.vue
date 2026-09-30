<script setup lang="ts">
import { computed, ref } from 'vue'
import { CircleAlert, Download, Info, Receipt, Wallet } from 'lucide-vue-next'
import { feeRecords, outstandingBalance } from '@/data/portal'
import { naira } from '@/data/fees'
import { startFeePayment } from '@/services/api'
import Badge from '@/components/ui/Badge.vue'
import Modal from '@/components/ui/Modal.vue'

const paymentOpen = ref(false)
const paying = ref(false)
const paymentError = ref('')

const toneFor = (status: string): 'green' | 'gold' | 'danger' | 'info' => {
  if (status === 'Paid') return 'green'
  if (status === 'Processing') return 'info'
  if (status === 'Overdue') return 'danger'
  return 'gold'
}

const invoices = computed(() => feeRecords.filter((record) => record.status !== 'Paid'))
const receipts = computed(() => feeRecords.filter((record) => record.status === 'Paid'))

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const openPayment = async (): Promise<void> => {
  paymentError.value = ''
  paying.value = true
  try {
    await startFeePayment(outstandingBalance.amount)
  } catch (error) {
    paymentError.value = error instanceof Error ? error.message : 'Payment is not available in this build.'
  } finally {
    paying.value = false
    paymentOpen.value = true
  }
}

const downloadReceipt = (id: string): void => {
  window.print()
  void id
}
</script>

<template>
  <div class="space-y-6">
    <!-- Balance -->
    <section
      class="overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card"
      aria-labelledby="balance-title"
    >
      <div class="grid gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted">Current balance</p>
          <h2 id="balance-title" class="mt-2 font-display text-4xl text-forest-700 sm:text-5xl">
            {{ naira(outstandingBalance.amount) }}
          </h2>
          <p class="mt-2 text-sm text-muted">Due {{ formatDate(outstandingBalance.dueDate) }}</p>
          <div class="mt-4">
            <Badge :tone="toneFor(outstandingBalance.status)" dot>{{ outstandingBalance.status }}</Badge>
          </div>
        </div>

        <div class="lg:col-span-5">
          <button
            type="button"
            class="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-gold px-6 text-base font-semibold text-forest-900 transition-colors hover:bg-gold-dark hover:text-white"
            @click="openPayment"
          >
            <Wallet :size="18" aria-hidden="true" />
            Pay School Fees
          </button>
          <p class="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Info :size="14" class="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
            Online payment is not enabled in this build. The bursar’s office will confirm the secure payment routes.
          </p>
        </div>
      </div>

      <div class="border-t border-forest-700/10 bg-canvas px-5 py-5 sm:px-7">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-muted">Breakdown</h3>
        <ul class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li
            v-for="item in outstandingBalance.breakdown"
            :key="item.label"
            class="flex justify-between gap-4 rounded-lg bg-white px-4 py-2.5"
          >
            <span class="text-muted">{{ item.label }}</span>
            <span class="tabular-nums font-semibold text-ink">{{ naira(item.amount) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Invoices -->
    <section
      class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
      aria-labelledby="invoices-title"
    >
      <h2 id="invoices-title" class="font-display text-lg text-forest-700">Invoices</h2>

      <div class="-mx-5 mt-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <table class="w-full min-w-[42rem] border-collapse text-left text-sm">
          <caption class="sr-only">Outstanding and due invoices for the current session</caption>
          <thead>
            <tr class="border-b border-forest-700/10 text-xs uppercase tracking-wider text-muted">
              <th scope="col" class="py-3 pr-4 font-semibold">Description</th>
              <th scope="col" class="px-4 py-3 font-semibold">Period</th>
              <th scope="col" class="px-4 py-3 font-semibold">Date</th>
              <th scope="col" class="px-4 py-3 text-right font-semibold">Amount</th>
              <th scope="col" class="py-3 pl-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-forest-700/10">
            <tr v-for="record in invoices" :key="record.id" class="align-top">
              <th scope="row" class="py-4 pr-4 font-semibold text-ink">{{ record.label }}</th>
              <td class="px-4 py-4 text-muted">{{ record.term }}</td>
              <td class="px-4 py-4 text-muted">{{ formatDate(record.date) }}</td>
              <td class="px-4 py-4 text-right tabular-nums text-ink">{{ naira(record.amount) }}</td>
              <td class="py-4 pl-4">
                <Badge :tone="toneFor(record.status)">{{ record.status }}</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Receipts -->
    <section
      class="rounded-2xl border border-forest-700/10 bg-white p-5 shadow-card sm:p-7"
      aria-labelledby="receipts-title"
    >
      <h2 id="receipts-title" class="font-display text-lg text-forest-700">Payment history &amp; receipts</h2>

      <ul class="mt-6 divide-y divide-forest-700/10">
        <li
          v-for="record in receipts"
          :key="record.id"
          class="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-600" aria-hidden="true">
              <Receipt :size="17" />
            </span>
            <div>
              <p class="text-sm font-semibold text-ink">{{ record.label }}</p>
              <p class="mt-0.5 text-xs text-muted">
                {{ record.term }} · Paid {{ formatDate(record.date) }} · Ref {{ record.id.toUpperCase() }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span class="tabular-nums text-sm font-semibold text-forest-700">{{ naira(record.amount) }}</span>
            <button
              type="button"
              class="inline-flex min-h-[2.4rem] items-center gap-1.5 rounded-full border border-forest-700/20 px-3.5 text-xs font-semibold text-forest-700 transition-colors hover:bg-forest-50"
              @click="downloadReceipt(record.id)"
            >
              <Download :size="14" aria-hidden="true" />
              Download receipt
            </button>
          </div>
        </li>
      </ul>
    </section>

    <Modal
      :open="paymentOpen"
      title="Online payment"
      description="Payments are processed by the bursar's office."
      size="sm"
      @close="paymentOpen = false"
    >
      <div class="flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 p-5">
        <CircleAlert :size="20" class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
        <div class="text-sm leading-relaxed text-ink">
          <p>{{ paymentError }}</p>
          <p class="mt-3">
            To settle <strong>{{ naira(outstandingBalance.amount) }}</strong>, contact the bursar on
            <a href="tel:+2348000000000" class="font-semibold underline underline-offset-4">+234 800 000 0000</a>
            or visit the school office during administrative hours.
          </p>
        </div>
      </div>

      <template #footer>
        <button
          type="button"
          class="min-h-[2.6rem] w-full rounded-full bg-forest-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
          @click="paymentOpen = false"
        >
          Close
        </button>
      </template>
    </Modal>
  </div>
</template>
