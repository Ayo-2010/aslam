import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

interface Options extends IntersectionObserverInit {
  /** Stop observing after the first intersection (default: true). */
  once?: boolean
}

/**
 * Reveals an element once it enters the viewport. Falls back to "visible"
 * when IntersectionObserver is unavailable, so content is never hidden.
 */
export const useReveal = (options: Options = {}): { target: Ref<HTMLElement | null>; visible: Ref<boolean> } => {
  const { once = true, root = null, rootMargin = '0px 0px -12% 0px', threshold = 0.15, ...rest } = options
  const target = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') {
      visible.value = true
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true
            if (once) observer?.unobserve(entry.target)
          } else if (!once) {
            visible.value = false
          }
        }
      },
      { root, rootMargin, threshold, ...rest },
    )
    if (target.value) observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { target, visible }
}

/** Animates a number from 0 to `to` once the returned element is visible. */
export const useCountUp = (to: number, duration = 1400): { target: Ref<HTMLElement | null>; value: Ref<number> } => {
  const { target, visible } = useReveal({ threshold: 0.4 })
  const value = ref(0)
  let frame = 0

  const start = (): void => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      value.value = to
      return
    }
    const startTime = performance.now()
    const tick = (now: number): void => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      value.value = Math.round(to * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  watch(visible, (isVisible) => {
    if (isVisible) start()
  })

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return { target, value }
}
