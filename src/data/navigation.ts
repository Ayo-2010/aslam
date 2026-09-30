import type { NavLink } from '@/types'

export const primaryNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about', description: 'Our story, values and leadership' },
  { label: 'Academics', to: '/academics', description: 'Programs from primary to senior secondary' },
  { label: 'Admissions', to: '/admissions', description: 'Process, requirements and fees' },
  { label: 'Parent Portal', to: '/parent-portal', description: 'Track your child’s progress' },
  { label: 'Contact', to: '/contact', description: 'Reach the school office' },
]

export const footerNav: NavLink[] = primaryNav

export const academicsNav: NavLink[] = [
  { label: 'Primary School', to: '/academics#primary' },
  { label: 'Junior Secondary', to: '/academics#junior-secondary' },
  { label: 'Senior Secondary', to: '/academics#senior-secondary' },
  { label: 'Clubs & Activities', to: '/academics#clubs' },
  { label: 'Sports', to: '/academics#sports' },
]

export const admissionsNav: NavLink[] = [
  { label: 'Admission Process', to: '/admissions#process' },
  { label: 'Requirements', to: '/admissions#requirements' },
  { label: 'Tuition & Fees', to: '/admissions#fees' },
  { label: 'Apply Now', to: '/admissions#apply' },
]
