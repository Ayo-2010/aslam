<script setup lang="ts">
import { useId } from 'vue'
import { Upload, FileText, X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    label: string
    accept?: string
    required?: boolean
    error?: string
    hint?: string
    fileName?: string
  }>(),
  { accept: '.pdf,.jpg,.jpeg,.png' },
)

const emit = defineEmits<{ 'update:fileName': [value: string]; change: [file: File | null] }>()

const id = useId()
const errorId = `${id}-error`

const onChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  emit('update:fileName', file ? file.name : '')
  emit('change', file)
}

const clear = (): void => {
  emit('update:fileName', '')
  emit('change', null)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <span :id="`${id}-label`" class="text-sm font-medium text-ink">
      {{ label }}
      <span v-if="required" class="text-red-700" aria-hidden="true">*</span>
      <span v-if="required" class="sr-only">(required)</span>
    </span>

    <div
      class="relative flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors duration-200"
      :class="error ? 'border-red-400 bg-red-50/50' : 'border-forest-700/20 bg-canvas/60 hover:border-forest-600/50'"
    >
      <template v-if="fileName">
        <div class="flex items-center gap-2.5 text-left">
          <FileText :size="18" class="shrink-0 text-forest-600" aria-hidden="true" />
          <span class="truncate text-sm font-medium text-ink">{{ fileName }}</span>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:underline"
          @click="clear"
        >
          <X :size="14" aria-hidden="true" />
          Remove file
        </button>
      </template>

      <template v-else>
        <Upload :size="20" class="text-forest-600" aria-hidden="true" />
        <p class="text-sm text-muted">
          <span class="font-semibold text-forest-700">Choose a file</span> or drop it here
        </p>
      </template>

      <label
        :for="id"
        class="sr-only"
      >
        {{ label }}
      </label>
      <input
        :id="id"
        type="file"
        :accept="props.accept"
        :aria-labelledby="`${id}-label`"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? errorId : undefined"
        class="absolute inset-0 cursor-pointer opacity-0"
        @change="onChange"
      />
    </div>

    <p v-if="hint && !error" class="text-xs text-muted">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="flex items-start gap-1 text-xs font-medium text-red-700">
      <span aria-hidden="true">⚠</span>
      <span>{{ error }}</span>
    </p>
  </div>
</template>
