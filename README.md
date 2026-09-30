# Aslam School

A production-quality, multi-page school website built with **Vue 3**, **TypeScript**, **Vite**, **Tailwind CSS**, **Vue Router** and **Lucide** icons.

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # type-check + production build
npm run preview    # serve the production build
npm run typecheck  # vue-tsc only
```

## Architecture

```text
src/
├── components/
│   ├── layout/      Header, MobileMenu, Footer, AnnouncementBar, LogoMark
│   ├── ui/          Button, Card, Badge, Modal, Tabs, Accordion, Input,
│   │                Select, Textarea, FileUpload, Loading, EmptyState, SmartImage
│   ├── shared/      SectionHeading, PageHero, NewsCard, EventCard, ProfileCard,
│   │                CtaSection, Reveal, BrandIcon, SocialLinks
│   ├── home/        Hero, Stats, WhyAslam, AboutPreview, AcademicPrograms,
│   │                ParentPortalPreview, NewsEvents, Testimonials
│   └── portal/      (view-scoped portal screens live in views/portal)
├── composables/     useSeo, useScroll, useReveal (reveal + count-up)
├── data/            school, navigation, academics, faculty, news, events,
│                    testimonials, fees, announcements, portal, search, images
├── services/        api.ts — mock transport layer (the only integration seam)
├── styles/          main.css (Tailwind layers, theme tokens, print styles)
├── types/           shared TypeScript interfaces
└── views/           one SFC per route, lazy-loaded
```

Content lives in `src/data/*` — no repeated copy is hardcoded in components.

## Routes

`/` · `/about` · `/academics` · `/admissions` · `/parent-portal` ·
`/parent-portal/dashboard` (+ `reports`, `attendance`, `fees`, `messages`,
`announcements`) · `/contact` · `/news` · `/news/:slug` · `/events` ·
`/events/:slug` · `/search` · `/:pathMatch(.*)*` (404)

Routes are code-split, so each page ships as its own chunk.

## Backend integration points

Everything that would call a server is isolated in `src/services/api.ts`:

| Function | Purpose |
| --- | --- |
| `submitApplication` | Admissions form submission |
| `sendContactMessage` | Contact form delivery |
| `signIn` / `signOut` / `readSession` | Parent portal authentication |
| `sendMessage` | Parent–teacher messaging |
| `startFeePayment` | Intentionally unimplemented |

Each simulates latency and can fail, so the UI is already written against real
async behaviour. Swapping a body for a `fetch` call is the only change needed.

**Authentication is a frontend simulation.** The demo accepts parent ID
`parent/2026` with password `aslam-demo`. No real credential, token or API key
exists anywhere in this project. Remove `demoAccounts` from `api.ts` before any
real deployment.

The map on the contact page is a styled placeholder. No API key is committed;
supply one at runtime through an environment variable when integrating Google
Maps or Mapbox.

## Accessibility

Semantic landmarks and heading order, a skip link, visible gold focus rings,
labelled form controls with `aria-invalid` / `aria-describedby` error wiring,
`aria-live` regions for status changes, keyboard-operable tabs (arrow/Home/End),
accordion, carousel and focus-trapped modals, and full `prefers-reduced-motion`
support. All text meets WCAG AA contrast — the gold accent used for small text
is `#7A5E12` rather than the brand gold for this reason.

## Verification performed

- `vue-tsc --noEmit` and `vite build` pass with no errors
- Zero console errors across all routes
- Zero horizontal overflow at 320 / 390 / 768 / 1024 / 1280 / 1600 px on every page
- Admissions form: validation, file uploads, review and reference generation verified
- Parent portal: route guard, failed and successful login, messaging, fee modal, logout
- Anchor navigation resolves after lazy route load
