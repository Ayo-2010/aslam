<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { lockScroll, unlockScroll } from '@/composables/useScrollLock'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  { size: 'md' },
)

const emit = defineEmits<{ close: [] }>()

const panel = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

const sizeClass: Record<string, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const onKeydown = (event: KeyboardEvent): void => {
  if (!props.open) return
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }
  if (event.key !== 'Tab' || !panel.value) return
  const nodes = Array.from(panel.value.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (el) => el.offsetParent !== null,
  )
  if (nodes.length === 0) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement as HTMLElement | null
      lockScroll()
      await nextTick()
      panel.value?.querySelector<HTMLElement>(focusableSelector)?.focus()
    } else {
      unlockScroll()
      lastFocused?.focus()
    }
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))

// Unmounting while still open (a route change, or a parent v-if flipping)
// skips the watcher, so the lock and the focused element are released here.
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  if (props.open) {
    unlockScroll()
    lastFocused?.focus()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-forest-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        role="presentation"
        @click.self="emit('close')"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          class="relative w-full animate-scale-in rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl"
          :class="sizeClass[size]"
        >
          <header class="flex items-start justify-between gap-4 border-b border-forest-700/10 px-5 py-4 sm:px-7 sm:py-5">
            <div>
              <h2 class="font-display text-xl text-forest-700 sm:text-2xl">{{ title }}</h2>
              <p v-if="description" class="mt-1 text-sm text-muted">{{ description }}</p>
            </div>
            <button
              type="button"
              class="-mr-1 shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-canvas hover:text-forest-700"
              aria-label="Close dialog"
              @click="emit('close')"
            >
              <X :size="20" aria-hidden="true" />
            </button>
          </header>

          <div class="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="border-t border-forest-700/10 px-5 py-4 sm:px-7">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
