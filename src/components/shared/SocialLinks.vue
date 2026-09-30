<script setup lang="ts">
import { school } from '@/data/school'
import BrandIcon from './BrandIcon.vue'
</script>

<template>
  <ul class="flex flex-wrap gap-3" aria-label="Social media">
    <li v-for="item in school.social" :key="item.id">
      <a
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border border-forest-700/15 px-4 text-sm font-medium text-forest-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10"
      >
        <BrandIcon :name="item.id as 'facebook' | 'instagram' | 'x' | 'youtube'" />
        <span>{{ item.label }}</span>
      </a>
    </li>
  </ul>
</template>
