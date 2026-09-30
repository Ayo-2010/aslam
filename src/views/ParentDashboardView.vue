<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import {
  Bell,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,

  Search,
  Users,
  Wallet,
  X,
  MessageSquare,
  Megaphone,
  CircleUser,
} from 'lucide-vue-next'
import { signOut, readSession } from '@/services/api'
import { children } from '@/data/portal'
import { school } from '@/data/school'
import { useSeo } from '@/composables/useSeo'
import LogoMark from '@/components/layout/LogoMark.vue'
import SmartImage from '@/components/ui/SmartImage.vue'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(false)
const session = readSession()
const parentName = session?.displayName ?? 'Parent'


const links = [
  { id: 'overview', label: 'Dashboard', to: '/parent-portal/dashboard', icon: LayoutDashboard },
  { id: 'reports', label: 'Academic Reports', to: '/parent-portal/dashboard/reports', icon: FileText },
  { id: 'attendance', label: 'Attendance', to: '/parent-portal/dashboard/attendance', icon: CalendarDays },
  { id: 'fees', label: 'School Fees', to: '/parent-portal/dashboard/fees', icon: Wallet },
  { id: 'messages', label: 'Messages', to: '/parent-portal/dashboard/messages', icon: MessageSquare },
  { id: 'announcements', label: 'Announcements', to: '/parent-portal/dashboard/announcements', icon: Megaphone },
  { id: 'children', label: 'Children', to: '/parent-portal/dashboard', icon: Users },
  { id: 'profile', label: 'Profile', to: '/parent-portal/dashboard', icon: CircleUser },
]

const isActive = (to: string, id: string): boolean => {
  if (route.path === to) return true
  if (id === 'overview') return false
  return route.path.startsWith(to) && id !== 'overview'
}

const pageTitle = computed(() => {
  const match = links.find((link) => link.to !== '/parent-portal/dashboard' && route.path.startsWith(link.to))
  return match?.label ?? 'Dashboard'
})

useSeo({ title: computed(() => `${pageTitle.value} | ${school.name}`) })

const logout = async (): Promise<void> => {
  signOut()
  await router.push({ name: 'parent-portal' })
}
</script>

<template>
  <div class="min-h-[70vh] bg-canvas">
    <div class="container-page py-6 lg:py-8">
      <div class="flex items-center justify-between gap-4 lg:hidden">
        <button
          type="button"
          class="inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border border-forest-700/15 bg-white px-4 text-sm font-medium text-forest-700"
          :aria-expanded="sidebarOpen"
          aria-controls="portal-sidebar"
          @click="sidebarOpen = !sidebarOpen"
        >
          <Menu :size="16" aria-hidden="true" />
          Menu
        </button>
        <p class="font-display text-lg text-forest-700">{{ pageTitle }}</p>
        <RouterLink
          to="/parent-portal/dashboard"
          class="grid h-10 w-10 place-items-center rounded-full border border-forest-700/15 bg-white text-forest-700"
          aria-label="Dashboard notifications"
        >
          <Bell :size="16" aria-hidden="true" />
        </RouterLink>
      </div>

      <div class="mt-4 flex gap-6 lg:mt-0 lg:gap-8">
        <!-- Sidebar -->
        <div
          id="portal-sidebar"
          class="fixed inset-0 z-[95] lg:static lg:z-auto"
          :class="sidebarOpen ? '' : 'max-lg:pointer-events-none'"
        >
          <div
            v-if="sidebarOpen"
            class="absolute inset-0 bg-forest-900/50 lg:hidden"
            @click="sidebarOpen = false"
          />
          <aside
            class="absolute left-0 top-0 flex h-full w-[min(17rem,82vw)] flex-col overflow-y-auto rounded-r-2xl bg-forest-800 p-5 transition-transform duration-300 lg:static lg:h-auto lg:w-64 lg:translate-x-0 lg:rounded-2xl"
            :class="sidebarOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'"
            aria-label="Parent dashboard navigation"
          >
            <div class="flex items-center justify-between">
              <RouterLink to="/parent-portal/dashboard" aria-label="Aslam School dashboard home">
                <LogoMark tone="dark" size="sm" />
              </RouterLink>
              <button
                type="button"
                class="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Close dashboard menu"
                @click="sidebarOpen = false"
              >
                <X :size="18" aria-hidden="true" />
              </button>
            </div>

            <nav class="mt-7 flex-1">
              <ul class="space-y-1">
                <li v-for="link in links" :key="link.id">
                  <RouterLink
                    :to="link.to"
                    class="flex min-h-[2.6rem] items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    :class="isActive(link.to, link.id) ? 'bg-white/12 !text-white' : ''"
                    @click="sidebarOpen = false"
                  >
                    <component :is="link.icon" :size="17" aria-hidden="true" />
                    {{ link.label }}
                  </RouterLink>
                </li>
              </ul>
            </nav>

            <div class="mt-6 border-t border-white/10 pt-4">
              <button
                type="button"
                class="flex min-h-[2.6rem] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                @click="logout"
              >
                <LogOut :size="17" aria-hidden="true" />
                Logout
              </button>
            </div>
          </aside>
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <!-- Top bar -->
          <header class="mb-6 hidden lg:block">
            <div class="flex items-center justify-between gap-6 rounded-2xl border border-forest-700/10 bg-white px-5 py-4 shadow-card">
              <div>
                <h1 class="font-display text-2xl text-forest-700">{{ pageTitle }}</h1>
                <p class="mt-0.5 text-sm text-muted">{{ parentName }} · {{ school.name }}</p>
              </div>

              <div class="flex items-center gap-3">
                <div class="relative hidden xl:block">
                  <label for="portal-search" class="sr-only">Search the portal</label>
                  <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                  <input
                    id="portal-search"
                    type="search"
                    placeholder="Search reports, fees, messages…"
                    class="min-h-[2.6rem] w-64 rounded-full border border-forest-700/15 bg-canvas pl-9 pr-4 text-sm placeholder:text-muted/70 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
                  />
                </div>

                <button
                  type="button"
                  class="relative grid h-10 w-10 place-items-center rounded-full border border-forest-700/15 text-forest-700 transition-colors hover:bg-forest-50"
                  aria-label="Notifications, 3 unread"
                >
                  <Bell :size="17" aria-hidden="true" />
                  <span
                    class="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.6rem] font-bold text-forest-900"
                    aria-hidden="true"
                  >
                    3
                  </span>
                </button>

                <div class="flex items-center gap-2.5 border-l border-forest-700/10 pl-3">
                  <SmartImage
                    :src="children[0]!.avatar"
                    :alt="`Profile picture for ${parentName}`"
                    ratio="1 / 1"
                    rounded="rounded-full"
                    sizes="36px"
                    class="h-9 w-9 shrink-0"
                  />
                  <div class="leading-tight">
                    <p class="text-sm font-semibold text-ink">{{ parentName }}</p>
                    <p class="text-xs text-muted">{{ children.length }} children enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
