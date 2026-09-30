<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { CheckCircle2, CircleAlert, Clock, Loader2, Mail, MapPin, Navigation, Phone, Send } from 'lucide-vue-next'
import { school } from '@/data/school'
import { sendContactMessage, ServiceError } from '@/services/api'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/shared/PageHero.vue'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import Reveal from '@/components/shared/Reveal.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Textarea from '@/components/ui/Textarea.vue'

const subjects = [
  { value: 'admissions', label: 'Admissions enquiry' },
  { value: 'fees', label: 'Fees and payments' },
  { value: 'portal', label: 'Parent portal support' },
  { value: 'academics', label: 'Academic matters' },
  { value: 'transfer', label: 'Transfer a student' },
  { value: 'other', label: 'Something else' },
]

useSeo()

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const touched = reactive<Record<string, boolean>>({})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const reference = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^[0-9+\s()-]{7,}$/

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (form.fullName.trim().length < 2) e.fullName = 'Enter your full name.'
  if (!emailPattern.test(form.email.trim())) e.email = 'Enter a valid email address.'
  if (form.phone.trim() && !phonePattern.test(form.phone.trim())) e.phone = 'Enter a valid phone number.'
  if (!form.subject) e.subject = 'Choose what your message is about.'
  if (form.message.trim().length < 20) e.message = 'Please give us at least 20 characters of detail.'
  return e
})

const showError = (key: string): string | undefined => (touched[key] ? errors.value[key] : undefined)

const submit = async (): Promise<void> => {
  Object.keys(errors.value).forEach((key) => {
    touched[key] = true
  })
  if (Object.keys(errors.value).length > 0) return

  status.value = 'loading'
  errorMessage.value = ''
  try {
    await sendContactMessage({ ...form })
    reference.value = `MSG-${Math.floor(10000 + Math.random() * 89999)}`
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    errorMessage.value =
      error instanceof ServiceError
        ? error.message
        : 'Your message could not be sent. Please try again or call the school office.'
  }
}

const reset = (): void => {
  Object.assign(form, { fullName: '', email: '', phone: '', subject: '', message: '' })
  Object.keys(touched).forEach((key) => delete touched[key])
  status.value = 'idle'
  reference.value = ''
}

const contactCards = [
  { id: 'address', icon: MapPin, label: 'Address', value: school.contact.address, href: null },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    value: school.contact.phone,
    href: `tel:${school.contact.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: school.contact.email,
    href: `mailto:${school.contact.email}`,
  },
  { id: 'hours', icon: Clock, label: 'Administrative hours', value: school.contact.hours, href: null },
]
</script>

<template>
  <PageHero
    eyebrow="Contact"
    title="We’re Here to Help"
    lede="Questions about admissions, fees, your child’s progress or anything else — the school office will point you to the right person."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Contact' }]"
  />

  <section class="bg-white py-16 sm:py-20" aria-labelledby="contact-details-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading eyebrow="Get in touch" title="Contact information" />
      </Reveal>

      <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal v-for="(card, index) in contactCards" :key="card.id" as="li" :delay="index * 70">
          <article
            class="h-full rounded-2xl border border-forest-700/10 bg-canvas p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-card"
          >
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-forest-700 text-gold-light" aria-hidden="true">
              <component :is="card.icon" :size="19" />
            </span>
            <h3 id="contact-details-title" class="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
              {{ card.label }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-ink">
              <a v-if="card.href" :href="card.href" class="link-underline">{{ card.value }}</a>
              <template v-else>{{ card.value }}</template>
            </p>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>

  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="contact-form-title">
    <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-7">
        <Reveal>
          <SectionHeading
            eyebrow="Send a message"
            title="Write to the school office"
            lede="We reply to written enquiries within one working day."
          />
        </Reveal>

        <Reveal :delay="80">
          <div class="mt-8 rounded-2xl border border-forest-700/10 bg-white p-6 shadow-card sm:p-8">
            <form v-if="status !== 'success'" class="space-y-5" novalidate @submit.prevent="submit">
              <div class="grid gap-5 sm:grid-cols-2">
                <Input
                  v-model="form.fullName"
                  label="Full Name"
                  required
                  autocomplete="name"
                  :error="showError('fullName')"
                  @blur="touched.fullName = true"
                />
                <Input
                  v-model="form.email"
                  label="Email"
                  type="email"
                  inputmode="email"
                  required
                  autocomplete="email"
                  :error="showError('email')"
                  @blur="touched.email = true"
                />
                <Input
                  v-model="form.phone"
                  label="Phone (optional)"
                  type="tel"
                  inputmode="tel"
                  autocomplete="tel"
                  :error="showError('phone')"
                  @blur="touched.phone = true"
                />
                <Select
                  v-model="form.subject"
                  label="Subject"
                  :options="subjects"
                  placeholder="What is this about?"
                  required
                  :error="showError('subject')"
                  @blur="touched.subject = true"
                />
              </div>

              <Textarea
                v-model="form.message"
                label="Message"
                :rows="6"
                :maxlength="1200"
                required
                placeholder="Tell us what you need help with…"
                hint="Please include your child’s class and, if relevant, your parent ID."
                :error="showError('message')"
                @blur="touched.message = true"
              />

              <div
                v-if="status === 'error'"
                class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                role="alert"
                aria-live="assertive"
              >
                <CircleAlert :size="17" class="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{{ errorMessage }}</span>
              </div>

              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-xs text-muted">
                  This form is a demonstration; messages are not transmitted to a server.
                </p>
                <button
                  type="submit"
                  :disabled="status === 'loading'"
                  class="inline-flex min-h-[2.9rem] items-center justify-center gap-2 rounded-full bg-forest-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-forest-600 disabled:opacity-60"
                >
                  <Loader2 v-if="status === 'loading'" :size="16" class="animate-spin" aria-hidden="true" />
                  <Send v-else :size="16" aria-hidden="true" />
                  {{ status === 'loading' ? 'Sending…' : 'Send message' }}
                </button>
              </div>
            </form>

            <div v-else class="py-6 text-center" role="status" aria-live="polite">
              <span
                class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-50 text-forest-600"
                aria-hidden="true"
              >
                <CheckCircle2 :size="32" />
              </span>
              <h3 class="mt-5 font-display text-2xl text-forest-700">Message received</h3>
              <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Thank you. Our reference is
                <strong class="text-forest-700">{{ reference }}</strong>
                — quote it if you call the school office before we reply.
              </p>
              <button
                type="button"
                class="mt-7 min-h-[2.6rem] rounded-full border border-forest-700/20 px-5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
                @click="reset"
              >
                Send another message
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div class="lg:col-span-5">
        <Reveal :delay="120">
          <div
            id="campus-map"
            class="scroll-mt-28 overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card"
          >
            <h2 class="border-b border-forest-700/10 px-6 py-4 font-display text-lg text-forest-700">
              Campus location
            </h2>

            <!--
              Map placeholder. Integrating a provider requires a runtime key
              supplied by the school's own account; none is committed here.
              Replace this block with a map component configured through
              VITE_MAP_PROVIDER / VITE_MAP_TOKEN when a key is available.
            -->
            <div
              class="relative flex h-64 items-center justify-center bg-forest-50 p-6 text-center"
              role="img"
              aria-label="Map placeholder showing the location of Aslam School, 12 Education Avenue, Lagos, Nigeria"
            >
              <div class="grain absolute inset-0 opacity-60" aria-hidden="true" />
              <div class="relative">
                <span
                  class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest-700 text-gold-light"
                  aria-hidden="true"
                >
                  <MapPin :size="22" />
                </span>
                <p class="mt-4 font-display text-lg text-forest-700">12 Education Avenue</p>
                <p class="mt-1 text-sm text-muted">Lagos, Nigeria</p>
                <p class="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-muted">
                  Interactive map placeholder. A Google Maps or Mapbox view can be enabled by supplying a
                  production API key.
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-muted">Open for visits Mon – Fri, 8:00 AM – 4:00 PM</p>
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.contact.address)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-[2.6rem] items-center justify-center gap-2 rounded-full bg-forest-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
              >
                <Navigation :size="15" aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
