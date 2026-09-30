<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    type?: string
    placeholder?: string
    required?: boolean
    error?: string
    hint?: string
    autocomplete?: string
    inputmode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal'
    disabled?: boolean
  }>(),
  { type: 'text' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; blur: [] }>()

const id = useId()
const errorId = computed(() => `${id}-error`)
const hintId = computed(() => `${id}-hint`)
const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint) ids.push(hintId.value)
  if (props.error) ids.push(errorId.value)
  return ids.length ? ids.join(' ') : undefined
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" class="text-sm font-medium text-ink">
      {{ label }}
      <span v-if="required" class="text-red-700" aria-hidden="true">*</span>
      <span v-if="required" class="sr-only">(required)</span>
    </label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="min-h-[2.9rem] w-full rounded-xl border bg-white px-4 py-2.5 text-[0.95rem] text-ink transition-all duration-200 placeholder:text-muted/60 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10 disabled:bg-canvas disabled:text-muted"
      :class="error ? 'border-red-500' : 'border-forest-700/15'"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="emit('blur')"
    />

    <p v-if="hint && !error" :id="hintId" class="text-xs text-muted">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="flex items-start gap-1 text-xs font-medium text-red-700">
      <span aria-hidden="true">⚠</span>
      <span>{{ error }}</span>
    </p>
  </div>
</template>
