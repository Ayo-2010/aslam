<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

export interface TabItem {
  id: string
  label: string
  badge?: string
}

const props = withDefaults(defineProps<{ items: TabItem[]; modelValue: string; label: string }>(), {})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const buttons = ref<HTMLButtonElement[]>([])

const select = (id: string): void => emit('update:modelValue', id)

const onKeydown = (event: KeyboardEvent, index: number): void => {
  const last = props.items.length - 1
  let next = index
  if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
  else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = last
  else return
  event.preventDefault()
  select(props.items[next].id)
  buttons.value[next]?.focus()
}

watch(
  () => props.modelValue,
  () => {
    const index = props.items.findIndex((item) => item.id === props.modelValue)
    if (index >= 0) buttons.value[index]?.focus()
  },
)

onBeforeUnmount(() => {
  buttons.value = []
})
</script>

<template>
  <div role="tablist" :aria-label="label" class="flex flex-wrap gap-2 sm:gap-3">
    <button
      v-for="(item, index) in items"
      :key="item.id"
      ref="buttons"
      type="button"
      role="tab"
      :id="`tab-${item.id}`"
      :aria-selected="item.id === modelValue"
      :aria-controls="`panel-${item.id}`"
      :tabindex="item.id === modelValue ? 0 : -1"
      class="min-h-[2.75rem] rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-6"
      :class="
        item.id === modelValue
          ? 'border-forest-700 bg-forest-700 text-white shadow-sm'
          : 'border-forest-700/15 bg-white text-forest-700 hover:border-forest-700/40 hover:bg-forest-50'
      "
      @click="select(item.id)"
      @keydown="onKeydown($event, index)"
    >
      {{ item.label }}
      <span v-if="item.badge" class="ml-2 text-xs font-medium opacity-70">{{ item.badge }}</span>
    </button>
  </div>
</template>
