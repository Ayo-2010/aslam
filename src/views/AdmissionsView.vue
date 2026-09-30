<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  FileUp,
  Info,
  Loader2,
  ShieldCheck,
  CircleAlert,
} from 'lucide-vue-next'
import { admissionSteps, requirements, fees, feeDisclaimer, admissionsFaqs, naira } from '@/data/fees'
import { getIcon } from '@/data/icons'
import { school } from '@/data/school'
import { submitApplication, ServiceError } from '@/services/api'
import { useSeo } from '@/composables/useSeo'

import type { ApplicationData } from '@/types'
import PageHero from '@/components/shared/PageHero.vue'
import SectionHeading from '@/components/shared/SectionHeading.vue'
import Reveal from '@/components/shared/Reveal.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Textarea from '@/components/ui/Textarea.vue'
import FileUpload from '@/components/ui/FileUpload.vue'

useSeo()

const gradeOptions = [
  { value: 'Primary 1', label: 'Primary 1' },
  { value: 'Primary 2', label: 'Primary 2' },
  { value: 'Primary 3', label: 'Primary 3' },
  { value: 'Primary 4', label: 'Primary 4' },
  { value: 'Primary 5', label: 'Primary 5' },
  { value: 'Primary 6', label: 'Primary 6' },
  { value: 'JSS 1', label: 'JSS 1' },
  { value: 'JSS 2', label: 'JSS 2' },
  { value: 'JSS 3', label: 'JSS 3' },
  { value: 'SS 1', label: 'Senior Secondary 1' },
  { value: 'SS 2', label: 'Senior Secondary 2' },
  { value: 'SS 3', label: 'Senior Secondary 3' },
]

const genderOptions = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
]

const relationshipOptions = [
  { value: 'Mother', label: 'Mother' },
  { value: 'Father', label: 'Father' },
  { value: 'Guardian', label: 'Guardian' },
  { value: 'Other', label: 'Other relative' },
]

const whyJoin = [
  {
    id: 'why-1',
    title: 'Small classes, known teachers',
    body: 'A class of twenty-eight means feedback arrives while it is still useful, not after a term has been lost.',
  },
  {
    id: 'why-2',
    title: 'Character taught, not assumed',
    body: 'Honesty, discipline and responsibility appear in our behaviour policy, our reports and our daily routines.',
  },
  {
    id: 'why-3',
    title: 'Results we can account for',
    body: '98% of our candidates gain university placement, and we publish the tutorial programme that gets them there.',
  },
  {
    id: 'why-4',
    title: 'A portal that keeps you informed',
    body: 'Attendance, results, fees and teacher messages are available to parents the same day they are recorded.',
  },
]

/* ------------------------------ form state ------------------------------ */

const steps = [
  { id: 1, title: 'Student Information' },
  { id: 2, title: 'Parent / Guardian' },
  { id: 3, title: 'Documents' },
  { id: 4, title: 'Review' },
  { id: 5, title: 'Confirmation' },
]

const currentStep = ref(1)
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const reference = ref('')
const copied = ref(false)
const touched = reactive<Record<string, boolean>>({})

const form = reactive<ApplicationData>({
  student: { firstName: '', lastName: '', dateOfBirth: '', gender: '', grade: '' },
  guardian: { name: '', relationship: '', phone: '', email: '', address: '' },
  documents: { birthCertificate: '', previousReport: '', passportPhoto: '', otherDocuments: '' },
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^[0-9+\s()-]{7,}$/

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (currentStep.value === 1 || currentStep.value === 4) {
    if (!form.student.firstName.trim()) e.firstName = 'Enter the student’s first name.'
    if (!form.student.lastName.trim()) e.lastName = 'Enter the student’s last name.'
    if (!form.student.dateOfBirth) e.dateOfBirth = 'Select the student’s date of birth.'
    if (!form.student.gender) e.gender = 'Select a gender.'
    if (!form.student.grade) e.grade = 'Select the grade being applied for.'
  }
  if (currentStep.value === 2 || currentStep.value === 4) {
    if (!form.guardian.name.trim()) e.guardianName = 'Enter the parent or guardian’s name.'
    if (!form.guardian.relationship) e.relationship = 'Select a relationship.'
    if (!phonePattern.test(form.guardian.phone.trim())) e.guardianPhone = 'Enter a valid phone number.'
    if (!emailPattern.test(form.guardian.email.trim())) e.guardianEmail = 'Enter a valid email address.'
    if (form.guardian.address.trim().length < 8) e.guardianAddress = 'Enter a full residential address.'
  }
  if (currentStep.value === 3 || currentStep.value === 4) {
    if (!form.documents.birthCertificate) e.birthCertificate = 'Attach a copy of the birth certificate.'
    if (!form.documents.previousReport) e.previousReport = 'Attach the most recent school report.'
    if (!form.documents.passportPhoto) e.passportPhoto = 'Attach at least one passport photograph.'
  }
  return e
})

const errorCount = computed(() => Object.keys(errors.value).length)
const progress = computed(() => ((Math.min(currentStep.value, 4) - 1) / 4) * 100)

const fieldTouched = (key: string): boolean => touched[key] === true

const showError = (key: string): string | undefined => (fieldTouched(key) ? errors.value[key] : undefined)

const touchAll = (): void => {
  Object.keys(errors.value).forEach((key) => {
    touched[key] = true
  })
}

const validateStep = (step: number): boolean => {
  touchAll()
  const keysByStep: Record<number, string[]> = {
    1: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'grade'],
    2: ['guardianName', 'relationship', 'guardianPhone', 'guardianEmail', 'guardianAddress'],
    3: ['birthCertificate', 'previousReport', 'passportPhoto'],
  }
  return !(keysByStep[step] ?? []).some((key) => Boolean(errors.value[key]))
}

const next = (): void => {
  if (currentStep.value >= 4) return
  if (!validateStep(currentStep.value)) return
  currentStep.value += 1
  status.value = 'idle'
  errorMessage.value = ''
  document.getElementById('apply')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const back = (): void => {
  if (currentStep.value <= 1) return
  currentStep.value -= 1
  status.value = 'idle'
  errorMessage.value = ''
}

const submit = async (): Promise<void> => {
  if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
    currentStep.value = 1
    return
  }
  status.value = 'submitting'
  errorMessage.value = ''
  try {
    const result = await submitApplication(form)
    reference.value = result.reference
    status.value = 'success'
    currentStep.value = 5
  } catch (error) {
    status.value = 'error'
    errorMessage.value =
      error instanceof ServiceError
        ? error.message
        : 'Something went wrong while submitting your application. Please try again.'
  }
  document.getElementById('apply')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const copyReference = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(reference.value)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    copied.value = false
  }
}

const reset = (): void => {
  currentStep.value = 1
  status.value = 'idle'
  reference.value = ''
  errorMessage.value = ''
  Object.keys(touched).forEach((key) => delete touched[key])
  form.student = { firstName: '', lastName: '', dateOfBirth: '', gender: '', grade: '' }
  form.guardian = { name: '', relationship: '', phone: '', email: '', address: '' }
  form.documents = { birthCertificate: '', previousReport: '', passportPhoto: '', otherDocuments: '' }
}

const reviewRows = computed(() => [
  { label: 'Student first name', value: form.student.firstName },
  { label: 'Student last name', value: form.student.lastName },
  { label: 'Date of birth', value: form.student.dateOfBirth },
  { label: 'Gender', value: form.student.gender },
  { label: 'Grade applying for', value: form.student.grade },
  { label: 'Parent / guardian', value: form.guardian.name },
  { label: 'Relationship', value: form.guardian.relationship },
  { label: 'Phone', value: form.guardian.phone },
  { label: 'Email', value: form.guardian.email },
  { label: 'Address', value: form.guardian.address },
  { label: 'Birth certificate', value: form.documents.birthCertificate },
  { label: 'Previous school report', value: form.documents.previousReport },
  { label: 'Passport photograph', value: form.documents.passportPhoto },
  { label: 'Other documents', value: form.documents.otherDocuments || 'None attached' },
])
</script>

<template>
  <PageHero
    eyebrow="Admissions"
    title="Begin Your Aslam School Journey"
    lede="One application, five clear steps, and a decision communicated within three weeks of your assessment."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Admissions' }]"
  />

  <!-- Why join -->
  <section class="bg-white py-16 sm:py-20" aria-labelledby="why-join-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Why Join Us"
          title="What Families Tell Us They Were Looking For"
          lede="Most of the parents who visit us have the same four questions on their list."
        />
      </Reveal>

      <ul class="mt-12 grid gap-5 sm:grid-cols-2">
        <Reveal v-for="(item, index) in whyJoin" :key="item.id" as="li" :delay="index * 80">
          <article
            class="flex h-full gap-4 rounded-2xl border border-forest-700/10 bg-canvas p-6 transition-all duration-300 hover:border-gold/50 hover:bg-white hover:shadow-card"
          >
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-700 text-xs font-semibold text-gold-light"
              aria-hidden="true"
            >
              {{ index + 1 }}
            </span>
            <div>
              <h3 class="font-display text-lg text-forest-700">{{ item.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ item.body }}</p>
            </div>
          </article>
        </Reveal>
      </ul>
    </div>
  </section>

  <!-- Process -->
  <section id="process" class="scroll-mt-24 bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="process-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Admission Process"
          title="Six Steps, Clearly Signposted"
          lede="You will always know what stage your application is at, who has it, and what happens next."
        />
      </Reveal>

      <ol class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(step, index) in admissionSteps" :key="step.id" as="li" :delay="index * 70">
          <article
            class="group relative h-full rounded-2xl border border-forest-700/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card-hover"
          >
            <div class="flex items-center justify-between">
              <span
                class="grid h-12 w-12 place-items-center rounded-xl bg-forest-700 text-gold-light transition-colors duration-300 group-hover:bg-gold group-hover:text-forest-900"
                aria-hidden="true"
              >
                <component :is="getIcon(step.icon)" :size="22" />
              </span>
              <span class="font-display text-3xl text-forest-200" aria-hidden="true">
                0{{ step.step }}
              </span>
            </div>
            <h3 class="mt-5 font-display text-lg text-forest-700">
              <span class="sr-only">Step {{ step.step }}: </span>{{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ step.description }}</p>
          </article>
        </Reveal>
      </ol>
    </div>
  </section>

  <!-- Requirements -->
  <section id="requirements" class="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="requirements-title">
    <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <Reveal>
          <SectionHeading
            eyebrow="Requirements"
            title="What to Prepare Before You Apply"
            lede="Gathering documents early is the single biggest factor in how quickly an application moves."
          />
          <div class="mt-8 flex gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-5">
            <Info :size="20" class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
            <p class="text-sm leading-relaxed text-ink">
              Requirements vary by grade level. Primary applications do not require an entrance examination in the
              same format as secondary applicants, and some medical documentation is only requested for senior
              students. The admissions office confirms the exact list after your first submission.
            </p>
          </div>
        </Reveal>
      </div>

      <div class="lg:col-span-7">
        <Reveal :delay="100">
          <ul class="grid gap-4 sm:grid-cols-2">
            <li
              v-for="item in requirements"
              :key="item.id"
              class="flex gap-3 rounded-2xl border border-forest-700/10 bg-canvas p-5"
            >
              <CheckCircle2 :size="20" class="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
              <div>
                <p class="text-sm font-semibold text-ink">{{ item.label }}</p>
                <p class="mt-1 text-xs leading-relaxed text-muted">{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Fees -->
  <section id="fees" class="scroll-mt-24 bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="fees-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Tuition & Fees"
          title="An Honest Fee Schedule"
          lede="Fees are published in full before enrolment so that no family meets a hidden cost later in the year."
        />
      </Reveal>

      <Reveal :delay="100">
        <div class="mt-10 overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card">
          <div class="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table class="w-full min-w-[46rem] border-collapse text-left text-sm">
              <caption class="sr-only">Indicative annual fees by grade level in Nigerian naira</caption>
              <thead>
                <tr class="bg-forest-700 text-white">
                  <th scope="col" class="px-5 py-4 font-semibold">Grade</th>
                  <th scope="col" class="px-5 py-4 font-semibold">Tuition</th>
                  <th scope="col" class="px-5 py-4 font-semibold">Registration</th>
                  <th scope="col" class="px-5 py-4 font-semibold">Books</th>
                  <th scope="col" class="px-5 py-4 font-semibold">Activities</th>
                  <th scope="col" class="px-5 py-4 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-forest-700/10">
                <tr v-for="row in fees" :key="row.grade" class="transition-colors hover:bg-forest-50/60">
                  <th scope="row" class="px-5 py-4 font-semibold text-ink">{{ row.grade }}</th>
                  <td class="px-5 py-4 tabular-nums text-muted">{{ naira(row.tuition) }}</td>
                  <td class="px-5 py-4 tabular-nums text-muted">{{ naira(row.registration) }}</td>
                  <td class="px-5 py-4 tabular-nums text-muted">{{ naira(row.books) }}</td>
                  <td class="px-5 py-4 tabular-nums text-muted">{{ naira(row.activities) }}</td>
                  <td class="px-5 py-4 font-semibold tabular-nums text-forest-700">{{ naira(row.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <p class="mt-4 flex items-start gap-2 text-sm text-muted">
        <Info :size="16" class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
        {{ feeDisclaimer }}
      </p>
    </div>
  </section>

  <!-- Application form -->
  <section id="apply" class="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="apply-title">
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <aside class="lg:col-span-4">
          <Reveal>
            <SectionHeading
              eyebrow="Online Application"
              title="Apply in Five Steps"
              lede="Your entries stay on this device until you submit. Nothing is sent until the final step."
            />

            <ol class="mt-8 space-y-2" aria-hidden="true">
              <li v-for="step in steps" :key="step.id">
                <div
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                  :class="step.id === currentStep ? 'bg-forest-50' : ''"
                >
                  <span
                    class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors"
                    :class="
                      step.id < currentStep
                        ? 'bg-forest-600 text-white'
                        : step.id === currentStep
                          ? 'bg-gold text-forest-900'
                          : 'bg-canvas text-muted ring-1 ring-forest-700/10'
                    "
                  >
                    <CheckCircle2 v-if="step.id < currentStep" :size="15" />
                    <template v-else>{{ step.id }}</template>
                  </span>
                  <span
                    class="text-sm font-medium"
                    :class="step.id === currentStep ? 'text-forest-700' : 'text-muted'"
                  >
                    {{ step.title }}
                  </span>
                </div>
              </li>
            </ol>

            <div class="mt-8 flex items-start gap-3 rounded-2xl border border-forest-700/10 bg-canvas p-5">
              <ShieldCheck :size="20" class="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
              <p class="text-xs leading-relaxed text-muted">
                This is a demonstration form. Entries are validated in your browser and are not transmitted to a
                server; connecting the real admissions API is a single service call.
              </p>
            </div>
          </Reveal>
        </aside>

        <div class="lg:col-span-8">
          <Reveal :delay="100">
            <form
              class="rounded-2xl border border-forest-700/10 bg-canvas p-6 shadow-card sm:p-8"
              novalidate
              @submit.prevent="currentStep === 4 ? submit() : next()"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    Step {{ currentStep }} of {{ steps.length }}
                  </p>
                  <h3 id="apply-title" class="mt-1 font-display text-2xl text-forest-700">
                    {{ steps.find((step) => step.id === currentStep)?.title }}
                  </h3>
                </div>
                <span class="hidden text-sm font-medium text-muted sm:block">{{ progress }}% complete</span>
              </div>

              <div
                class="mt-4 h-1.5 overflow-hidden rounded-full bg-forest-100"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Application progress"
              >
                <div
                  class="h-full rounded-full bg-gold transition-all duration-500"
                  :style="{ width: `${progress}%` }"
                />
              </div>

              <!-- Step 1 -->
              <fieldset v-show="currentStep === 1" class="mt-8 space-y-5">
                <legend class="sr-only">Student information</legend>
                <div class="grid gap-5 sm:grid-cols-2">
                  <Input
                    v-model="form.student.firstName"
                    label="Student First Name"
                    required
                    autocomplete="off"
                    :error="showError('firstName')"
                    @blur="touched.firstName = true"
                  />
                  <Input
                    v-model="form.student.lastName"
                    label="Student Last Name"
                    required
                    autocomplete="off"
                    :error="showError('lastName')"
                    @blur="touched.lastName = true"
                  />
                  <Input
                    v-model="form.student.dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    required
                    :max="new Date().toISOString().slice(0, 10)"
                    :error="showError('dateOfBirth')"
                    @blur="touched.dateOfBirth = true"
                  />
                  <Select
                    v-model="form.student.gender"
                    label="Gender"
                    :options="genderOptions"
                    placeholder="Select gender"
                    required
                    :error="showError('gender')"
                    @blur="touched.gender = true"
                  />
                </div>
                <Select
                  v-model="form.student.grade"
                  label="Grade Applying For"
                  :options="gradeOptions"
                  placeholder="Select a grade"
                  required
                  :error="showError('grade')"
                  @blur="touched.grade = true"
                />
              </fieldset>

              <!-- Step 2 -->
              <fieldset v-show="currentStep === 2" class="mt-8 space-y-5">
                <legend class="sr-only">Parent or guardian details</legend>
                <div class="grid gap-5 sm:grid-cols-2">
                  <Input
                    v-model="form.guardian.name"
                    label="Parent / Guardian Name"
                    required
                    autocomplete="name"
                    :error="showError('guardianName')"
                    @blur="touched.guardianName = true"
                  />
                  <Select
                    v-model="form.guardian.relationship"
                    label="Relationship"
                    :options="relationshipOptions"
                    placeholder="Select relationship"
                    required
                    :error="showError('relationship')"
                    @blur="touched.relationship = true"
                  />
                  <Input
                    v-model="form.guardian.phone"
                    label="Phone Number"
                    type="tel"
                    inputmode="tel"
                    required
                    autocomplete="tel"
                    :error="showError('guardianPhone')"
                    @blur="touched.guardianPhone = true"
                  />
                  <Input
                    v-model="form.guardian.email"
                    label="Email Address"
                    type="email"
                    inputmode="email"
                    required
                    autocomplete="email"
                    :error="showError('guardianEmail')"
                    @blur="touched.guardianEmail = true"
                  />
                </div>
                <Textarea
                  v-model="form.guardian.address"
                  label="Home Address"
                  :rows="3"
                  required
                  placeholder="Street, area, city and state"
                  :error="showError('guardianAddress')"
                  @blur="touched.guardianAddress = true"
                />
              </fieldset>

              <!-- Step 3 -->
              <fieldset v-show="currentStep === 3" class="mt-8 space-y-5">
                <legend class="sr-only">Supporting documents</legend>
                <FileUpload
                  v-model:file-name="form.documents.birthCertificate"
                  label="Birth Certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  :error="showError('birthCertificate')"
                  hint="PDF or image, up to 5 MB"
                />
                <FileUpload
                  v-model:file-name="form.documents.previousReport"
                  label="Previous School Report"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  :error="showError('previousReport')"
                />
                <FileUpload
                  v-model:file-name="form.documents.passportPhoto"
                  label="Passport Photograph"
                  accept=".jpg,.jpeg,.png"
                  required
                  :error="showError('passportPhoto')"
                />
                <FileUpload
                  v-model:file-name="form.documents.otherDocuments"
                  label="Other Supporting Documents"
                  accept=".pdf,.jpg,.jpeg,.png"
                  hint="Optional — medical information, previous certificates, references"
                />
                <p class="flex items-start gap-2 text-xs text-muted">
                  <FileUp :size="15" class="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
                  Files are only referenced by name in this demonstration. A production build should upload to the
                  admissions service directly.
                </p>
              </fieldset>

              <!-- Step 4 -->
              <div v-show="currentStep === 4" class="mt-8">
                <p class="text-sm text-muted">Please check your details before submitting.</p>

                <div
                  v-if="errorCount > 0"
                  class="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5"
                  role="alert"
                >
                  <p class="flex items-center gap-2 text-sm font-semibold text-red-800">
                    <CircleAlert :size="18" aria-hidden="true" />
                    {{ errorCount }} field{{ errorCount === 1 ? '' : 's' }} need attention
                  </p>
                  <ul class="mt-2 list-inside list-disc text-sm text-red-700">
                    <li v-for="(message, key) in errors" :key="key">{{ message }}</li>
                  </ul>
                </div>

                <dl class="mt-5 divide-y divide-forest-700/10 overflow-hidden rounded-2xl border border-forest-700/10 bg-white">
                  <div
                    v-for="row in reviewRows"
                    :key="row.label"
                    class="grid gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt class="text-xs font-semibold uppercase tracking-wider text-muted sm:text-sm">{{ row.label }}</dt>
                    <dd class="text-sm text-ink sm:col-span-2">{{ row.value || '—' }}</dd>
                  </div>
                </dl>

                <div
                  v-if="status === 'error'"
                  class="mt-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
                  role="alert"
                  aria-live="assertive"
                >
                  <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{{ errorMessage }}</span>
                </div>
              </div>

              <!-- Step 5 -->
              <div v-if="currentStep === 5" class="mt-8 text-center" role="status" aria-live="polite">
                <span
                  class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-50 text-forest-600"
                  aria-hidden="true"
                >
                  <CheckCircle2 :size="32" />
                </span>
                <h3 class="mt-5 font-display text-2xl text-forest-700">Application Submitted Successfully</h3>
                <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Thank you. The admissions office will review your documents and contact you within three working
                  days to schedule the entrance assessment.
                </p>

                <div class="mx-auto mt-7 max-w-sm rounded-2xl border border-gold/50 bg-gold/10 p-6">
                  <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">Application reference</p>
                  <p class="mt-2 font-display text-2xl tracking-wider text-forest-700">{{ reference }}</p>
                  <button
                    type="button"
                    class="mt-4 inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full border border-forest-700/20 px-4 text-xs font-semibold text-forest-700 transition-colors hover:bg-white"
                    @click="copyReference"
                  >
                    <Copy :size="14" aria-hidden="true" />
                    {{ copied ? 'Copied' : 'Copy reference' }}
                  </button>
                </div>

                <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button to="/contact" variant="primary">Contact Admissions</Button>
                  <Button variant="outline" @click="reset">Start a New Application</Button>
                </div>
              </div>

              <div v-if="currentStep < 5" class="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="ghost"
                  :disabled="currentStep === 1"
                  @click="back"
                >
                  <ArrowLeft :size="16" aria-hidden="true" />
                  Back
                </Button>

                <Button v-if="currentStep < 4" type="submit" variant="primary">
                  Continue
                  <ArrowRight :size="16" aria-hidden="true" />
                </Button>

                <Button v-else type="submit" variant="gold" :loading="status === 'submitting'">
                  <template v-if="status !== 'submitting'">
                    Submit Application
                    <ArrowRight :size="16" aria-hidden="true" />
                  </template>
                  <template v-else>Submitting…</template>
                </Button>
              </div>

              <p v-if="status === 'submitting'" class="mt-4 flex items-center gap-2 text-sm text-muted" role="status">
                <Loader2 :size="16" class="animate-spin" aria-hidden="true" />
                Securely submitting your application…
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQs -->
  <section class="bg-canvas py-16 sm:py-20 lg:py-24" aria-labelledby="faq-title">
    <div class="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="FAQs"
          title="Questions Parents Ask Most"
          lede="If your question is not answered here, the admissions office will reply within one working day."
        />
      </Reveal>
      <Reveal :delay="100">
        <div class="mt-10">
          <Accordion :items="admissionsFaqs" />
        </div>
      </Reveal>
    </div>
  </section>

  <!-- Contact admissions -->
  <section class="bg-white py-16 sm:py-20" aria-labelledby="contact-admissions-title">
    <div class="container-page">
      <div
        class="flex flex-col items-start justify-between gap-8 rounded-2xl border border-forest-700/10 bg-canvas p-7 sm:p-10 lg:flex-row lg:items-center"
      >
        <Reveal>
          <div>
            <Badge tone="gold">Admissions Office</Badge>
            <h2 id="contact-admissions-title" class="mt-4 font-display text-2xl text-forest-700 sm:text-3xl">
              Still deciding? Talk to a person.
            </h2>
            <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {{ school.contact.address }} · {{ school.contact.hours }}
            </p>
            <p class="mt-1 text-sm text-muted">
              <a :href="`mailto:${school.contact.email}`" class="link-underline">{{ school.contact.email }}</a>
              <span aria-hidden="true"> · </span>
              <a :href="`tel:${school.contact.phone.replace(/\s/g, '')}`" class="link-underline">
                {{ school.contact.phone }}
              </a>
            </p>
          </div>
        </Reveal>
        <Reveal :delay="100">
          <div class="w-full shrink-0 lg:w-auto">
            <Button to="/contact" variant="primary" size="lg" block>Contact Admissions</Button>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
