import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { school } from '@/data/school'
import { readSession } from '@/services/api'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: `${school.name} | ${school.tagline}`,
      description:
        'Aslam School is a leading co-educational day school in Lagos, Nigeria, combining academic excellence, character development and modern learning to prepare students for a changing world.',
      ogImage: 'images/campus',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: `About Us | ${school.name}`,
      description:
        'Discover Aslam School — our story, mission, vision, core values, principal’s message and the leadership team behind a community built on academic excellence and character.',
      ogImage: 'images/campusLife',
    },
  },
  {
    path: '/academics',
    name: 'academics',
    component: () => import('@/views/AcademicsView.vue'),
    meta: {
      title: `Academics | ${school.name}`,
      description:
        'Learning designed for every stage at Aslam School: primary, junior secondary and senior secondary programs, subject offerings, clubs, sports and creative arts.',
      ogImage: 'images/library',
    },
  },
  {
    path: '/admissions',
    name: 'admissions',
    component: () => import('@/views/AdmissionsView.vue'),
    meta: {
      title: `Admissions | ${school.name}`,
      description:
        'Begin your Aslam School journey. Review the admission process, requirements, tuition and fees, and apply online in five simple steps.',
      ogImage: 'images/openDay',
    },
  },
  {
    path: '/parent-portal',
    name: 'parent-portal',
    component: () => import('@/views/ParentPortalView.vue'),
    meta: {
      title: `Parent Portal | ${school.name}`,
      description:
        'Securely access your child’s academic and school information: report cards, attendance, school bills, receipts and teacher messages.',
      ogImage: 'images/computerLab',
    },
  },
  {
    path: '/parent-portal/dashboard',
    name: 'parent-dashboard',
    component: () => import('@/views/ParentDashboardView.vue'),
    meta: {
      title: `Parent Dashboard | ${school.name}`,
      description: 'Track attendance, academic performance, fees and school announcements.',
      requiresAuth: true,
      noIndex: true,
    },
    children: [
      {
        path: '',
        name: 'dashboard-overview',
        component: () => import('@/views/portal/DashboardOverview.vue'),
        meta: { title: `Dashboard | ${school.name}` },
      },
      {
        path: 'reports',
        name: 'dashboard-reports',
        component: () => import('@/views/portal/DashboardReports.vue'),
        meta: { title: `Academic Reports | ${school.name}` },
      },
      {
        path: 'attendance',
        name: 'dashboard-attendance',
        component: () => import('@/views/portal/DashboardAttendance.vue'),
        meta: { title: `Attendance | ${school.name}` },
      },
      {
        path: 'fees',
        name: 'dashboard-fees',
        component: () => import('@/views/portal/DashboardFees.vue'),
        meta: { title: `School Fees | ${school.name}` },
      },
      {
        path: 'messages',
        name: 'dashboard-messages',
        component: () => import('@/views/portal/DashboardMessages.vue'),
        meta: { title: `Messages | ${school.name}` },
      },
      {
        path: 'announcements',
        name: 'dashboard-announcements',
        component: () => import('@/views/portal/DashboardAnnouncements.vue'),
        meta: { title: `Announcements | ${school.name}` },
      },
    ],
  },
  {
    path: '/parent-portal/unauthorized',
    name: 'portal-unauthorized',
    component: () => import('@/views/UnauthorizedView.vue'),
    meta: { title: `Sign in required | ${school.name}`, noIndex: true },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: `Contact Us | ${school.name}`,
      description:
        'Contact Aslam School in Lagos: address, phone, email, administrative hours, an online enquiry form and campus directions.',
      ogImage: 'images.campusLife',
    },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsView.vue'),
    meta: {
      title: `News | ${school.name}`,
      description: 'The latest announcements, academic achievements and campus stories from Aslam School.',
      ogImage: 'images/campus',
    },
  },
  {
    path: '/news/:slug',
    name: 'news-detail',
    component: () => import('@/views/NewsDetailView.vue'),
    meta: { title: `News | ${school.name}` },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventsView.vue'),
    meta: {
      title: `Events | ${school.name}`,
      description: 'Open days, sports, conferences and arts showcases at Aslam School.',
      ogImage: 'images/interHouse',
    },
  },
  {
    path: '/events/:slug',
    name: 'event-detail',
    component: () => import('@/views/EventDetailView.vue'),
    meta: { title: `Events | ${school.name}` },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue'),
    meta: { title: `Search | ${school.name}`, noIndex: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: `Page Not Found | ${school.name}`, noIndex: true },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise((resolve) => {
        // The target lives inside a lazily loaded view, so poll briefly for it
        // before scrolling. Resolves with a no-op if the anchor is missing.
        const started = Date.now()
        const tryScroll = (): void => {
          const el = document.querySelector(to.hash)
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 96
            window.scrollTo({ top, behavior: 'smooth' })
            resolve({ el: to.hash, top: 96 })
            return
          }
          if (Date.now() - started > 2000) {
            resolve({ top: 0 })
            return
          }
          window.setTimeout(tryScroll, 60)
        }
        tryScroll()
      })
    }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !readSession()) {
    return { name: 'portal-unauthorized', query: { redirect: to.fullPath } }
  }
  return true
})
