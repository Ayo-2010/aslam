<script setup lang="ts">
import { stats } from '@/data/announcements'
import StatCell from './StatCell.vue'
import Reveal from '@/components/shared/Reveal.vue'
</script>

<template>
  <section class="relative border-b border-forest-700/10 bg-white" aria-label="Aslam School at a glance">
    <div class="container-page">
      <dl class="grid grid-cols-2 lg:grid-cols-4">
        <Reveal
          v-for="(stat, index) in stats"
          :key="stat.id"
          :delay="index * 80"
          class="border-forest-700/10 [&:not(:nth-child(odd))]:border-l lg:border-l lg:first:border-l-0 lg:[&:nth-child(-n+2)]:border-t lg:[&:nth-child(n+3)]:border-t-0"
        >
          <StatCell
            :value="stat.value"
            :prefix="stat.prefix"
            :suffix="stat.suffix"
            :label="stat.label"
            :description="stat.description"
          />
        </Reveal>
      </dl>
    </div>
  </section>
</template>
