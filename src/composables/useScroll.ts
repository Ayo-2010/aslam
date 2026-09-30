import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/** Reactive `window.scrollY`, bound to a passive scroll listener. */
export const useScrollY = (): Ref<number> => {
  const y = ref(0)
  const update = (): void => {
    y.value = window.scrollY
  }
  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))
  return y
}

export const useScrolled = (threshold = 12): Ref<boolean> => {
  const y = useScrollY()
  return {
    get value() {
      return y.value > threshold
    },
  } as Ref<boolean>
}
