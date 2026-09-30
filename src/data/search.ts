import type { NewsArticle, SchoolEvent, AcademicProgram } from '@/types'
import { news } from './news'
import { events } from './events'
import { academicPrograms } from './academics'
import { primaryNav } from './navigation'

export type SearchCategory = 'Pages' | 'News' | 'Events' | 'Programs'
export type SearchCategoryFilter = SearchCategory | 'All'

export interface SearchEntry {
  id: string
  title: string
  excerpt: string
  category: SearchCategory
  to: string
  keywords: string[]
}

const pageDescriptions: Record<string, string> = {
  '/': 'Homepage: hero, statistics, why Aslam School, academic programs, news and testimonials.',
  '/about': 'Our story, mission, vision, core values, principal’s message, leadership and campus life.',
  '/academics': 'Primary, junior secondary and senior secondary programs, subjects, clubs and sports.',
  '/admissions': 'Why join us, admission process, requirements, fees and the online application form.',
  '/parent-portal': 'Sign in to view report cards, attendance, bills, receipts and teacher messages.',
  '/contact': 'Contact information, administrative hours, an enquiry form and the campus location.',
  '/news': 'The latest announcements, academic achievements and campus stories.',
  '/events': 'Open days, sporting fixtures, conferences and arts showcases.',
}

const toEntries = <T extends { slug: string; title?: string; stage?: string; excerpt?: string; description?: string }>(
  items: T[],
  category: SearchCategory,
  path: string,
  keywordsOf: (item: T) => string[],
): SearchEntry[] =>
  items.map((item) => ({
    id: `${category.toLowerCase()}-${item.slug}`,
    title: item.title ?? item.stage ?? item.slug,
    excerpt: item.excerpt ?? item.description ?? '',
    category,
    to: `${path}/${item.slug}`,
    keywords: keywordsOf(item),
  }))

export const searchIndex: SearchEntry[] = [
  ...primaryNav.map((link) => ({
    id: `page-${link.to}`,
    title: link.label,
    excerpt: pageDescriptions[link.to] ?? link.description ?? '',
    category: 'Pages' as SearchCategory,
    to: link.to,
    keywords: [link.label, link.description ?? ''],
  })),
  ...toEntries<NewsArticle>(news, 'News', '/news', (item) => [item.category, item.author]),
  ...toEntries<SchoolEvent>(events, 'Events', '/events', (item) => [item.category, item.location]),
  ...toEntries<AcademicProgram>(academicPrograms, 'Programs', '/academics', (item) => [
    ...item.focus,
    ...item.subjects,
  ]),
]

export const searchCategories: SearchCategoryFilter[] = ['All', 'Pages', 'News', 'Events', 'Programs']
