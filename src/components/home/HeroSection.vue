<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, PlayCircle, MapPin, Sparkles } from 'lucide-vue-next'
import { school } from '@/data/school'
import { images } from '@/data/images'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'

const tourOpen = ref(false)

const tourStops = [
  { id: 'campus', label: 'Main Campus', detail: 'Classrooms, admin block and the assembly hall.', image: images.campus },
  { id: 'library', label: 'Library', detail: 'Reading rooms, digital catalogue and study space.', image: images.library },
  { id: 'lab', label: 'Science Laboratories', detail: 'Dedicated physics, chemistry and biology labs.', image: images.scienceLab },
  { id: 'tech', label: 'Computer Laboratory', detail: 'Sixty workstations and the robotics laboratory.', image: images.computerLab },
  { id: 'sports', label: 'Sports Grounds', detail: 'Track, courts and the swimming pool.', image: images.sports },
]
</script>

<template>
  <section class="relative isolate overflow-hidden bg-forest-900" aria-labelledby="hero-title">
    <div class="absolute inset-0 -z-10">
      <img
        :src="images.campus"
        alt="Aslam School campus buildings surrounded by trees on a bright morning"
        class="h-full w-full object-cover"
        width="1920"
        height="1080"
        fetchpriority="high"
        decoding="async"
      />
      <div
        class="absolute inset-0 bg-gradient-to-br from-forest-900/95 via-forest-800/88 to-forest-700/80"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_15%,rgba(201,162,39,0.16),transparent_55%)]"
        aria-hidden="true"
      />
    </div>

    <div class="container-page relative py-20 sm:py-24 lg:py-32">
      <div class="max-w-3xl">
        <p class="animate-fade-in inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
          <Sparkles :size="14" aria-hidden="true" />
          Admitting students for 2026/27
        </p>

        <h1
          id="hero-title"
          class="animate-fade-up mt-6 font-display text-4xl leading-[1.06] text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          style="animation-delay: 80ms"
        >
          {{ school.tagline }}
        </h1>

        <p
          class="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          style="animation-delay: 160ms"
        >
          {{ school.shortDescription }}
        </p>

        <div class="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style="animation-delay: 240ms">
          <Button to="/admissions" variant="gold" size="lg">
            Explore Admissions
            <ArrowRight :size="18" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            class="!border-white/40 !text-white hover:!bg-white hover:!text-forest-700"
            @click="tourOpen = true"
          >
            <PlayCircle :size="18" aria-hidden="true" />
            Take a Virtual Tour
          </Button>
        </div>

        <p
          class="animate-fade-up mt-10 flex items-center gap-2 text-sm text-white/65"
          style="animation-delay: 320ms"
        >
          <MapPin :size="16" class="text-gold-light" aria-hidden="true" />
          {{ school.contact.address }}
        </p>
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent"
      aria-hidden="true"
    />

    <Modal
      :open="tourOpen"
      title="Virtual Tour of Aslam School"
      description="A preview of the spaces where our students spend their day."
      size="lg"
      @close="tourOpen = false"
    >
      <ul class="grid gap-5 sm:grid-cols-2">
        <li v-for="stop in tourStops" :key="stop.id" class="overflow-hidden rounded-xl border border-forest-700/10">
          <img
            :src="stop.image"
            :alt="stop.label"
            class="aspect-[16/10] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="p-4">
            <h3 class="font-display text-base text-forest-700">{{ stop.label }}</h3>
            <p class="mt-1 text-sm text-muted">{{ stop.detail }}</p>
          </div>
        </li>
      </ul>

      <template #footer>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs text-muted">
            Visits can be booked through the admissions office.
          </p>
          <Button to="/contact" variant="primary" size="sm">Book a Visit</Button>
        </div>
      </template>
    </Modal>
  </section>
</template>
