<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { school } from '@/data/school'
import { coreValues, campusFeatures } from '@/data/announcements'
import { leadershipTeam, principal } from '@/data/faculty'
import { getIcon } from '@/data/icons'
import { images } from '@/data/images'
import PageHero from '@/components/shared/PageHero.vue'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import Reveal from '@/components/shared/Reveal.vue'
import ProfileCard from '@/components/shared/ProfileCard.vue'
import CtaSection from '@/components/shared/CtaSection.vue'
import SmartImage from '@/components/ui/SmartImage.vue'
import Badge from '@/components/ui/Badge.vue'

useSeo()

const milestones = [
  { year: '1998', title: 'Founded', body: 'Aslam School opens with 42 pupils and nine teachers in a single building.' },
  { year: '2006', title: 'Secondary Wing', body: 'Junior and senior secondary programs are introduced with the first graduating class.' },
  { year: '2014', title: 'Science & Technology', body: 'Dedicated laboratories and the school’s first coding club are established.' },
  { year: '2021', title: 'Digital Learning', body: 'The parent portal launches, giving families direct access to reports, attendance and fees.' },
  { year: '2026', title: 'New Campus Wing', body: '24 new classrooms, a technology hub and an expanded library open for the new session.' },
]
</script>

<template>
  <PageHero
    eyebrow="About Us"
    title="A School Built on Scholarship and Character"
    lede="For more than two decades, Aslam School has educated students who are academically capable, ethically grounded and ready to serve."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'About Us' }]"
  />

  <!-- Who we are -->
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="who-we-are">
    <div class="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <div>
          <p class="eyebrow"><span class="h-px w-6 bg-gold" aria-hidden="true" />Who We Are</p>
          <h2 id="who-we-are" class="section-title mt-4">An Independent School with a Clear Purpose</h2>
          <div class="prose-body mt-6 space-y-4">
            <p>
              Aslam School is a co-educational day school on Education Avenue in Lagos, serving more than 1,200
              students from Primary 1 through Senior Secondary 3. We are an independent institution: our governors
              and our parents hold the school to its standard, and the standard is not only examination results.
            </p>
            <p>
              A class at Aslam holds twenty-eight students. That number is deliberate. It allows a teacher to
              recognise when a student has stopped understanding, and to intervene before a term is lost. It also
              allows a shy child to be wrong in public more than once, which is often the only way confidence is
              built.
            </p>
            <p>
              Alongside the taught curriculum, every student belongs to a house, a form group and at least one club
              or team. That structure is how we teach responsibility — a student who is on duty, who organises a
              fixture, or who edits the school press is learning something a textbook cannot.
            </p>
          </div>

          <dl class="mt-8 grid grid-cols-3 gap-4 border-t border-forest-700/10 pt-6">
            <div v-for="item in [{ v: '1998', l: 'Founded' }, { v: '1,200+', l: 'Students' }, { v: '86', l: 'Staff' }]" :key="item.l">
              <dt class="sr-only">{{ item.l }}</dt>
              <dd class="font-display text-2xl text-forest-700 sm:text-3xl">{{ item.v }}</dd>
              <p class="mt-1 text-xs uppercase tracking-wider text-muted">{{ item.l }}</p>
            </div>
          </dl>
        </div>
      </Reveal>

      <Reveal :delay="120" :y="24">
        <div class="grid grid-cols-2 gap-4">
          <SmartImage
            :src="images.classroom"
            alt="A bright classroom with pupils seated at desks"
            ratio="3 / 4"
            rounded="rounded-2xl"
            sizes="(min-width: 1024px) 260px, 45vw"
          />
          <div class="mt-8 grid gap-4">
            <SmartImage
              :src="images.campusLife"
              alt="Students walking through the school courtyard"
              ratio="3 / 4"
              rounded="rounded-2xl"
              sizes="(min-width: 1024px) 260px, 45vw"
            />
            <SmartImage
              :src="images.computerLab"
              alt="Students working at computers in the technology laboratory"
              ratio="4 / 3"
              rounded="rounded-2xl"
              sizes="(min-width: 1024px) 260px, 45vw"
            />
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  <!-- Mission & vision -->
  <section class="bg-forest-800 py-16 sm:py-20 lg:py-24" aria-labelledby="mission-vision">
    <div class="container-page">
      <Reveal>
        <p class="eyebrow !text-gold-light"><span class="h-px w-6 bg-gold" aria-hidden="true" />Mission &amp; Vision</p>
        <h2 id="mission-vision" class="mt-4 font-display text-3xl text-white sm:text-4xl">
          What we are for, and where we are going
        </h2>
      </Reveal>

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article class="h-full rounded-2xl border border-white/10 bg-white/5 p-7 sm:p-9">
            <Badge tone="onDark">Our Mission</Badge>
            <p class="mt-5 font-display text-xl leading-snug text-white sm:text-2xl">{{ school.mission }}</p>
          </article>
        </Reveal>
        <Reveal :delay="100">
          <article class="h-full rounded-2xl border border-white/10 bg-white/5 p-7 sm:p-9">
            <Badge tone="onDark">Our Vision</Badge>
            <p class="mt-5 font-display text-xl leading-snug text-white sm:text-2xl">{{ school.vision }}</p>
          </article>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Core values -->
  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="values-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Core Values"
          title="Eight Commitments We Make to Every Family"
          lede="These are not mottos on a wall. They appear in our behaviour policy, our reports and our staff appraisal."
        />
      </Reveal>

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal v-for="(value, index) in coreValues" :key="value.id" as="li" :delay="index * 60">
          <article
            class="group h-full rounded-2xl border border-forest-700/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card-hover"
          >
            <span
              class="grid h-11 w-11 place-items-center rounded-xl bg-forest-50 text-forest-600 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-gold-light"
              aria-hidden="true"
            >
              <component :is="getIcon(value.icon)" :size="20" />
            </span>
            <h3 class="mt-4 font-display text-lg text-forest-700">{{ value.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ value.description }}</p>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>

  <!-- Principal's message -->
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="principal-title">
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal class="lg:col-span-4">
          <figure class="lg:sticky lg:top-28">
            <SmartImage
              :src="principal.image"
              :alt="principal.imageAlt"
              ratio="4 / 5"
              rounded="rounded-2xl"
              sizes="(min-width: 1024px) 380px, 90vw"
            />
            <figcaption class="mt-5">
              <p class="font-display text-xl text-forest-700">{{ principal.name }}</p>
              <p class="mt-1 text-sm font-medium text-gold-dark">{{ principal.position }}</p>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal :delay="120" class="lg:col-span-8">
          <div>
            <p class="eyebrow"><span class="h-px w-6 bg-gold" aria-hidden="true" />Principal’s Message</p>
            <h2 id="principal-title" class="section-title mt-4">A Message from the Principal</h2>
            <div class="prose-body mt-6 space-y-4">
              <p v-for="paragraph in principal.message" :key="paragraph.slice(0, 24)">{{ paragraph }}</p>
            </div>

            <div class="mt-8 flex items-center gap-4 border-t border-forest-700/10 pt-6">
              <span class="font-display text-2xl italic text-forest-700">Ibrahim Aslam</span>
              <span class="text-xs uppercase tracking-wider text-muted">Signature</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Leadership -->
  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="leadership-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Leadership"
          title="The Team Responsible for Your Child’s Education"
          lede="Every department is led by a member of staff with subject expertise and pastoral responsibility."
        />
      </Reveal>

      <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal v-for="(member, index) in leadershipTeam" :key="member.id" as="li" :delay="(index % 4) * 70">
          <ProfileCard :member="member" />
        </Reveal>
      </ul>
    </div>
  </section>

  <!-- History -->
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="history-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading eyebrow="Our History" title="Twenty-Eight Years, One Commitment" />
      </Reveal>

      <ol class="mt-12 space-y-8 border-l-2 border-forest-700/10 pl-6 sm:pl-8">
        <Reveal v-for="(item, index) in milestones" :key="item.year" as="li" :delay="index * 70" class="relative">
          <span
            class="absolute -left-[2.05rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-gold sm:-left-[2.55rem]"
            aria-hidden="true"
          />
          <p class="font-display text-sm tracking-[0.18em] text-gold-dark">{{ item.year }}</p>
          <h3 class="mt-1 font-display text-lg text-forest-700 sm:text-xl">{{ item.title }}</h3>
          <p class="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{{ item.body }}</p>
        </Reveal>
      </ol>
    </div>
  </section>

  <!-- Campus life -->
  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="campus-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Campus Life"
          title="Facilities Built for Learning, Not for Photography"
          lede="Every space on campus has a teaching purpose, and students are expected to use them."
        />
      </Reveal>

      <ul class="mt-12 grid gap-6 sm:grid-cols-2">
        <Reveal v-for="(feature, index) in campusFeatures" :key="feature.id" as="li" :delay="index * 80">
          <article class="group h-full overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <SmartImage
              :src="feature.image"
              :alt="feature.imageAlt"
              ratio="16 / 10"
              rounded="rounded-none"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div class="p-6">
              <h3 class="font-display text-lg text-forest-700">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ feature.description }}</p>
            </div>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>

  <CtaSection
    title="Come and See the Campus for Yourself"
    text="Visits are arranged throughout the year. Meet the teachers, walk the corridors and ask the questions that matter to your family."
  />
</template>
