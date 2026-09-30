<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BarChart3,
  CalendarCheck,
  Eye,
  EyeOff,
  FileText,
  Info,
  Lock,
  Mail,
  Megaphone,
  MessageSquare,
  Receipt,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-vue-next'
import { signIn, ServiceError } from '@/services/api'
import { images } from '@/data/images'
import { useSeo } from '@/composables/useSeo'

import PageHero from '@/components/shared/PageHero.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import SmartImage from '@/components/ui/SmartImage.vue'
import Reveal from '@/components/shared/Reveal.vue'

const route = useRoute()
const router = useRouter()

useSeo()

const parentId = ref('')
const password = ref('')
const remember = ref(true)
const showPassword = ref(false)
const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')
const touched = ref(false)


const passwordPattern = /^[\w!@#$%^&*.,-]{6,}$/

const idError = computed(() =>
  touched.value && !parentId.value.trim() ? 'Enter your parent ID or username.' : undefined,
)
const passwordError = computed(() => {
  if (!touched.value) return undefined
  if (!password.value) return 'Enter your password.'
  if (!passwordPattern.test(password.value)) return 'Passwords are at least 6 characters.'
  return undefined
})

const features = [
  { id: 'f1', icon: FileText, label: 'Report cards' },
  { id: 'f2', icon: CalendarCheck, label: 'Attendance records' },
  { id: 'f3', icon: Wallet, label: 'Bills and balances' },
  { id: 'f4', icon: Receipt, label: 'Payment receipts' },
  { id: 'f5', icon: MessageSquare, label: 'Teacher messages' },
  { id: 'f6', icon: Megaphone, label: 'School announcements' },
  { id: 'f7', icon: BarChart3, label: 'Progress tracking' },
  { id: 'f8', icon: Users, label: 'Multiple children' },
]

const submit = async (): Promise<void> => {
  touched.value = true
  if (idError.value || passwordError.value) return

  status.value = 'loading'
  errorMessage.value = ''
  try {
    await signIn(parentId.value, password.value, remember.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/parent-portal/dashboard'
    await router.push(redirect)
  } catch (error) {
    status.value = 'error'
    errorMessage.value =
      error instanceof ServiceError ? error.message : 'We could not sign you in. Please try again shortly.'
  }
}
</script>

<template>
  <PageHero
    eyebrow="Parent Portal"
    title="Parent Portal"
    lede="Securely access your child’s academic and school information."
    :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Parent Portal' }]"
  />

  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="portal-login-title">
    <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <Reveal>
          <div>
            <h2 id="portal-login-title" class="section-title">Everything about your child, in one place</h2>
            <p class="mt-4 text-base leading-relaxed text-muted">
              The portal is where results are published, attendance is recorded, fees are settled and teachers
              respond. Parents receive an email the moment something new is posted.
            </p>

            <ul class="mt-8 grid gap-3 sm:grid-cols-2">
              <li
                v-for="feature in features"
                :key="feature.id"
                class="flex items-center gap-2.5 text-sm text-ink"
              >
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forest-50 text-forest-600" aria-hidden="true">
                  <component :is="feature.icon" :size="15" />
                </span>
                {{ feature.label }}
              </li>
            </ul>

            <div class="mt-10 overflow-hidden rounded-2xl">
              <SmartImage
                :src="images.computerLab"
                alt="A parent using a laptop while a student works in the school computer laboratory"
                ratio="16 / 10"
                rounded="rounded-2xl"
                sizes="(min-width: 1024px) 460px, 100vw"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div class="lg:col-span-7">
        <Reveal :delay="120">
          <div class="rounded-2xl border border-forest-700/10 bg-canvas p-6 shadow-card sm:p-9">
            <div class="flex items-center gap-3">
              <span class="grid h-11 w-11 place-items-center rounded-xl bg-forest-700 text-gold-light" aria-hidden="true">
                <Lock :size="20" />
              </span>
              <div>
                <h3 class="font-display text-xl text-forest-700">Sign in to your account</h3>
                <p class="text-sm text-muted">Use the parent ID issued at enrolment.</p>
              </div>
            </div>

            <form class="mt-8 space-y-5" novalidate @submit.prevent="submit">
              <Input
                v-model="parentId"
                label="Parent ID / Username"
                required
                autocomplete="username"
                placeholder="e.g. parent/2026"
                :error="idError"
                :disabled="status === 'loading'"
                @blur="touched = true"
              />

              <div>
                <div class="relative">
                  <Input
                    v-model="password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    autocomplete="current-password"
                    :error="passwordError"
                    :disabled="status === 'loading'"
                    @blur="touched = true"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-[2.35rem] rounded-full p-1.5 text-muted transition-colors hover:bg-forest-50 hover:text-forest-700"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    :aria-pressed="showPassword"
                    @click="showPassword = !showPassword"
                  >
                    <EyeOff v-if="showPassword" :size="18" aria-hidden="true" />
                    <Eye v-else :size="18" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label class="inline-flex min-h-[2.25rem] cursor-pointer items-center gap-2.5 text-sm text-ink">
                  <input
                    v-model="remember"
                    type="checkbox"
                    class="h-4 w-4 rounded border-forest-700/30 text-forest-700 focus:ring-2 focus:ring-forest-600/30"
                  />
                  Remember me on this device
                </label>
                <RouterLink to="/contact" class="link-underline text-sm">Forgot password?</RouterLink>
              </div>

              <div
                v-if="status === 'error'"
                class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                role="alert"
                aria-live="assertive"
              >
                <Info :size="17" class="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{{ errorMessage }}</span>
              </div>

              <Button type="submit" variant="gold" size="lg" block :loading="status === 'loading'">
                {{ status === 'loading' ? 'Signing in…' : 'Login' }}
              </Button>
            </form>

            <div class="mt-7 flex items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 p-4">
              <ShieldCheck :size="18" class="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
              <div class="text-xs leading-relaxed text-ink">
                <p class="font-semibold">Demonstration login</p>
                <p class="mt-1">
                  Authentication is simulated in the browser. Use parent ID
                  <code class="rounded bg-white/70 px-1.5 py-0.5 font-mono">parent/2026</code>
                  with password
                  <code class="rounded bg-white/70 px-1.5 py-0.5 font-mono">aslam-demo</code>. No real account or
                  credential exists, and no data is transmitted.
                </p>
              </div>
            </div>

            <p class="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
              <Mail :size="15" aria-hidden="true" />
              Lost access?
              <RouterLink to="/contact" class="link-underline">Contact the school office</RouterLink>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
