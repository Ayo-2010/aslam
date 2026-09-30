<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import Button from '@/components/ui/Button.vue'

useSeo()
</script>

<template>
  <section class="bg-white py-20 sm:py-28" aria-labelledby="unauthorized-title">
    <div class="container-page text-center">
      <span
        class="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-forest-50 text-forest-700"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" class="h-8 w-8 fill-none stroke-current" stroke-width="1.6">
          <path d="M12 3 4 6v6c0 4.4 3.4 7.9 8 9 4.6-1.1 8-4.6 8-9V6l-8-3Z" stroke-linejoin="round" />
        </svg>
      </span>

      <h1 id="unauthorized-title" class="mt-6 font-display text-3xl text-forest-700 sm:text-4xl">
        Sign in required
      </h1>
      <p class="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
        The parent dashboard is only available to enrolled parents and guardians. Please sign in with the parent ID
        issued at enrolment.
      </p>

      <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/parent-portal" variant="gold" size="lg">Go to Parent Portal</Button>
        <Button to="/" variant="outline" size="lg">Return Home</Button>
      </div>
    </div>
  </section>
</template>
