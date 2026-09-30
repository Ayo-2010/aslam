<script setup lang="ts">
import { ArrowRight, Quote } from 'lucide-vue-next'
import { images } from '@/data/images'
import { school } from '@/data/school'
import Button from '@/components/ui/Button.vue'
import SmartImage from '@/components/ui/SmartImage.vue'
import Reveal from '@/components/shared/Reveal.vue'
</script>

<template>
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="about-preview-title">
    <div class="container-page">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div class="relative">
            <SmartImage
              :src="images.studentsLearning"
              alt="Students working together at a table during a supervised lesson"
              ratio="4 / 3"
              rounded="rounded-2xl"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
            <div
              class="absolute -bottom-6 -right-4 hidden w-56 overflow-hidden rounded-2xl border-4 border-white shadow-card-hover sm:block lg:-right-8"
            >
              <SmartImage
                :src="images.teacher"
                alt="A teacher guiding a student with their assignment"
                ratio="1 / 1"
                rounded="rounded-none"
                sizes="224px"
              />
            </div>

            <div
              class="absolute -left-4 -top-5 hidden rounded-2xl bg-forest-700 px-5 py-4 text-white shadow-card-hover lg:block"
            >
              <p class="font-display text-3xl leading-none">{{ school.foundedYear }}</p>
              <p class="mt-1 text-xs uppercase tracking-wider text-gold-light">Founded</p>
            </div>
          </div>
        </Reveal>

        <Reveal :delay="120">
          <div>
            <p class="eyebrow">
              <span class="h-px w-6 bg-gold" aria-hidden="true" />
              About Aslam School
            </p>
            <h2 id="about-preview-title" class="section-title mt-4">Education Beyond the Classroom</h2>
            <p class="mt-5 text-base leading-relaxed text-muted">
              Aslam School was founded on a simple idea: a child develops best when intellectual rigour and moral
              formation are taught together, by adults who know them well. For more than two decades we have built
              on that idea — small classes, structured pastoral care, and a curriculum that expects students to
              think, create and take responsibility.
            </p>

            <figure class="mt-8 rounded-2xl border-l-2 border-gold bg-canvas p-6">
              <Quote :size="20" class="text-gold" aria-hidden="true" />
              <blockquote class="mt-3">
                <p class="font-display text-lg leading-snug text-forest-700 sm:text-xl">{{ school.mission }}</p>
              </blockquote>
              <figcaption class="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Our mission statement
              </figcaption>
            </figure>

            <div class="mt-8">
              <Button to="/about" variant="outline">
                Discover Our Story
                <ArrowRight :size="16" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
