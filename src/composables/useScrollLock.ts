/**
 * Reference-counted body scroll lock.
 *
 * Anything that locks scrolling must go through this module so the page stays
 * locked until the *last* consumer releases it. Overlays can overlap — a modal
 * opening while the mobile menu is open, or a modal that spawns a second modal
 * — and a naive `body.style.overflow = ''` in any one of them re-enables
 * scrolling for whichever one is still on screen.
 */

let lockCount = 0

/** Prevents the page behind an overlay from scrolling. */
export const lockScroll = (): void => {
  lockCount += 1
  document.body.style.overflow = 'hidden'
}

/**
 * Releases one lock. Safe to call in excess — the counter floors at zero and
 * only the final release clears the inline style, so an unbalanced call can
 * never leave the page permanently unscrollable.
 */
export const unlockScroll = (): void => {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) document.body.style.overflow = ''
}

/** Test/diagnostic helper: how many overlays currently hold the lock. */
export const scrollLockCount = (): number => lockCount
