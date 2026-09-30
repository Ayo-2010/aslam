<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import WhyAslam from '@/components/home/WhyAslam.vue'
import AboutPreview from '@/components/home/AboutPreview.vue'
import AcademicPrograms from '@/components/home/AcademicPrograms.vue'
import ParentPortalPreview from '@/components/home/ParentPortalPreview.vue'
import NewsEvents from '@/components/home/NewsEvents.vue'
import Testimonials from '@/components/home/Testimonials.vue'
import CtaSection from '@/components/shared/CtaSection.vue'

useSeo()
</script>

<template>
  <HeroSection />
  <StatsSection />
  <WhyAslam />
  <AboutPreview />
  <AcademicPrograms />
  <ParentPortalPreview />
  <NewsEvents />
  <Testimonials />
  <CtaSection
    title="Give Your Child a Stronger Foundation for Tomorrow"
    text="Discover an environment where academic achievement and character development grow together."
  />
</template>
