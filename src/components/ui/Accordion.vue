<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

withDefaults(defineProps<{ items: AccordionItem[]; allowMultiple?: boolean }>(), { allowMultiple: true })

const openIds = ref<string[]>([])

const toggle = (id: string, allowMultiple: boolean): void => {
  openIds.value = openIds.value.includes(id)
    ? openIds.value.filter((value) => value !== id)
    : allowMultiple
      ? [...openIds.value, id]
      : [id]
}
</script>

<template>
  <div class="divide-y divide-forest-700/10 overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card">
    <div v-for="item in items" :key="item.id">
      <h3>
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-forest-50/60 sm:px-7"
          :aria-expanded="openIds.includes(item.id)"
          :aria-controls="`accordion-panel-${item.id}`"
          @click="toggle(item.id, allowMultiple)"
        >
          <span class="font-display text-base text-forest-700 sm:text-lg">{{ item.question }}</span>
          <span
            class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-forest-700/15 text-forest-700 transition-colors"
            :class="openIds.includes(item.id) ? 'bg-forest-700 text-white' : ''"
            aria-hidden="true"
          >
            <Minus v-if="openIds.includes(item.id)" :size="15" />
            <Plus v-else :size="15" />
          </span>
        </button>
      </h3>
      <div
        :id="`accordion-panel-${item.id}`"
        class="grid transition-all duration-300 ease-out"
        :class="openIds.includes(item.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden">
          <p class="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-7 sm:pb-6 sm:text-base">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
