<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { primaryNav } from '@/data/navigation'
import Button from '@/components/ui/Button.vue'

useSeo()
</script>

<template>
  <section class="relative overflow-hidden bg-forest-800 py-20 sm:py-28" aria-labelledby="notfound-title">
    <div class="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
    <div class="container-page relative text-center">
      <p class="font-display text-[5rem] leading-none text-gold/30 sm:text-[8rem]" aria-hidden="true">404</p>

      <h1 id="notfound-title" class="mt-2 font-display text-3xl text-white sm:text-4xl">Page Not Found</h1>
      <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70">
        The page you are looking for has moved, or the address may be mistyped. Here are some places to go instead.
      </p>

      <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/" variant="gold" size="lg">Return Home</Button>
        <Button to="/contact" variant="outline" size="lg" class="!border-white/35 !text-white hover:!bg-white hover:!text-forest-700">
          Contact the school
        </Button>
      </div>

      <nav aria-label="Suggested pages" class="mt-12">
        <p class="text-xs uppercase tracking-[0.18em] text-white/50">Popular pages</p>
        <ul class="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <li v-for="link in primaryNav.slice(1)" :key="link.to">
            <RouterLink
              :to="link.to"
              class="inline-flex min-h-[2.4rem] items-center rounded-full border border-white/15 px-4 text-sm text-white/80 transition-colors hover:border-gold/50 hover:text-gold-light"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>
