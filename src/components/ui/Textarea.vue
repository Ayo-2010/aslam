<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    placeholder?: string
    rows?: number
    required?: boolean
    error?: string
    hint?: string
    maxlength?: number
  }>(),
  { rows: 5 },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; blur: [] }>()

const id = useId()
const errorId = computed(() => `${id}-error`)
const hintId = computed(() => `${id}-hint`)
const remaining = computed(() =>
  props.maxlength ? props.maxlength - props.modelValue.length : undefined,
)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex items-baseline justify-between gap-3">
      <label :for="id" class="text-sm font-medium text-ink">
        {{ label }}
        <span v-if="required" class="text-red-700" aria-hidden="true">*</span>
        <span v-if="required" class="sr-only">(required)</span>
      </label>
      <span v-if="remaining !== undefined" class="text-xs text-muted" aria-live="polite">
        {{ remaining }} characters left
      </span>
    </div>

    <textarea
      :id="id"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :maxlength="maxlength"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="[hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined"
      class="w-full resize-y rounded-xl border bg-white px-4 py-2.5 text-[0.95rem] leading-relaxed text-ink transition-all duration-200 placeholder:text-muted/60 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
      :class="error ? 'border-red-500' : 'border-forest-700/15'"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="emit('blur')"
    />

    <p v-if="hint && !error" :id="hintId" class="text-xs text-muted">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="flex items-start gap-1 text-xs font-medium text-red-700">
      <span aria-hidden="true">⚠</span>
      <span>{{ error }}</span>
    </p>
  </div>
</template>
