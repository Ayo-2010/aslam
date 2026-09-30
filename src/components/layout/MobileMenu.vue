<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Phone, X, ArrowRight } from 'lucide-vue-next'
import { primaryNav } from '@/data/navigation'
import { school } from '@/data/school'
import LogoMark from './LogoMark.vue'
import Button from '@/components/ui/Button.vue'
import { lockScroll, unlockScroll } from '@/composables/useScrollLock'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const open = computed(() => props.open)
const panel = ref<HTMLElement | null>(null)

const close = (): void => emit('close')

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && props.open) close()
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) lockScroll()
    else unlockScroll()
    if (isOpen) {
      await nextTick()
      panel.value?.querySelector<HTMLAnchorElement>('nav a')?.focus()
    }
  },
)
onMounted(() => window.addEventListener('keydown', onKeydown))

// Unmounting while still open (a route change closes the menu) skips the
// watcher, so the lock is released here instead of being left behind.
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (props.open) unlockScroll()
})
</script>

<template>
  <!--
    Teleported to <body> on purpose. The header is `sticky` and uses
    `backdrop-blur`, either of which makes it a containing block for positioned
    descendants — so an in-tree `absolute inset-0` overlay would be clipped to
    the 72px header strip and the drawer would collapse to that height.
  -->
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[90] lg:hidden"
      :class="open ? 'pointer-events-auto' : 'pointer-events-none'"
      :aria-hidden="open ? undefined : 'true'"
    >
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <div v-if="open" class="absolute inset-0 bg-forest-900/50 backdrop-blur-sm" @click="close" />
      </Transition>

      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        leave-active-class="transition-transform duration-250 ease-in"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="open"
          id="mobile-menu"
          ref="panel"
          class="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div class="flex items-center justify-between border-b border-forest-700/10 px-5 py-4">
            <RouterLink to="/" aria-label="Aslam School home" @click="close">
              <LogoMark size="sm" />
            </RouterLink>
            <button
              type="button"
              class="rounded-full p-2 text-muted transition-colors hover:bg-canvas hover:text-forest-700"
              aria-label="Close menu"
              @click="close"
            >
              <X :size="20" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" class="flex-1 overflow-y-auto px-3 py-4">
            <ul class="flex flex-col gap-1">
              <li v-for="link in primaryNav" :key="link.to">
                <RouterLink
                  :to="link.to"
                  class="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-forest-50"
                  active-class="bg-forest-50 text-forest-700"
                  @click="close"
                >
                  <span>
                    <span class="block font-medium text-ink">{{ link.label }}</span>
                    <span v-if="link.description" class="mt-0.5 block text-xs text-muted">
                      {{ link.description }}
                    </span>
                  </span>
                  <ArrowRight :size="16" class="shrink-0 text-muted/60" aria-hidden="true" />
                </RouterLink>
              </li>
            </ul>
          </nav>

          <div class="space-y-3 border-t border-forest-700/10 px-5 py-5">
            <Button to="/admissions#apply" variant="gold" block @click="close">Apply Now</Button>
            <a
              :href="`tel:${school.contact.phone.replace(/\s/g, '')}`"
              class="flex items-center justify-center gap-2 pt-1 text-sm font-medium text-forest-700"
            >
              <Phone :size="15" aria-hidden="true" />
              {{ school.contact.phone }}
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
