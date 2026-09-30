<script setup lang="ts">
import Button from '@/components/ui/Button.vue'

withDefaults(defineProps<{ title: string; text: string; primaryLabel?: string }>(), {
  primaryLabel: 'Apply Now',
})
</script>

<template>
  <section class="relative overflow-hidden bg-forest-700" aria-labelledby="cta-title">
    <div class="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -left-20 bottom-[-6rem] h-80 w-80 rounded-full bg-gold/15 blur-3xl"
      aria-hidden="true"
    />

    <div class="container-page relative py-16 sm:py-20 lg:py-24">
      <div class="grid items-center gap-10 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <h2 id="cta-title" class="font-display text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
            {{ title }}
          </h2>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{{ text }}</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <Button :to="`/admissions#apply`" variant="gold" size="lg" block>{{ primaryLabel }}</Button>
          <Button to="/contact" variant="outline" size="lg" block class="!border-white/35 !text-white hover:!bg-white hover:!text-forest-700">
            Contact Admissions
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
