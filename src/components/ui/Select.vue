<script setup lang="ts">
import { computed, useId } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    modelValue: string
    label: string
    options: { value: string; label: string }[]
    placeholder?: string
    required?: boolean
    error?: string
    disabled?: boolean
  }>(),
  { placeholder: 'Select an option' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; blur: [] }>()

const id = useId()
const errorId = computed(() => `${id}-error`)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" class="text-sm font-medium text-ink">
      {{ label }}
      <span v-if="required" class="text-red-700" aria-hidden="true">*</span>
      <span v-if="required" class="sr-only">(required)</span>
    </label>

    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? errorId : undefined"
        class="min-h-[2.9rem] w-full appearance-none rounded-xl border bg-white px-4 py-2.5 pr-11 text-[0.95rem] text-ink transition-all duration-200 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10 disabled:bg-canvas disabled:text-muted"
        :class="[
          error ? 'border-red-500' : 'border-forest-700/15',
          modelValue ? '' : 'text-muted',
        ]"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        @blur="emit('blur')"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <ChevronDown
        :size="18"
        class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>

    <p v-if="error" :id="errorId" class="flex items-start gap-1 text-xs font-medium text-red-700">
      <span aria-hidden="true">⚠</span>
      <span>{{ error }}</span>
    </p>
  </div>
</template>
