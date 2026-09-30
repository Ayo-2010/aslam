import type { Announcement, CoreValue, Pillar, Stat } from '@/types'
import { images } from './images'

export const announcements: Announcement[] = [
  {
    id: 'resumption-2026',
    message:
      'School resumes Monday, September 7. Parents are advised to complete all outstanding registration requirements.',
    severity: 'info',
    postedAt: '2026-08-28',
    linkLabel: 'View updates',
    linkTo: '/news',
  },
]

export const stats: Stat[] = [
  {
    id: 'graduation',
    value: 98,
    prefix: '',
    suffix: '%',
    label: 'Graduation Rate',
    description: 'Students who complete secondary school with a full certificate.',
  },
  {
    id: 'ratio',
    value: 15,
    prefix: '',
    suffix: ':1',
    label: 'Student–Teacher Ratio',
    description: 'Small classes that allow every learner to be genuinely known.',
  },
  {
    id: 'clubs',
    value: 25,
    prefix: '',
    suffix: '+',
    label: 'Active Clubs',
    description: 'Co-curricular groups led by teachers and mentors.',
  },
  {
    id: 'students',
    value: 1200,
    prefix: '',
    suffix: '+',
    label: 'Students',
    description: 'Learners from primary through senior secondary.',
  },
]

export const pillars: Pillar[] = [
  {
    id: 'academic',
    icon: 'graduation',
    title: 'Academic Excellence',
    body: 'Rigorous academic programs supported by experienced teachers and modern learning methods.',
  },
  {
    id: 'moral',
    icon: 'shield',
    title: 'Moral Values',
    body: 'We develop integrity, responsibility, respect, discipline, and compassion alongside academic achievement.',
  },
  {
    id: 'stem',
    icon: 'flask',
    title: 'STEM & Arts',
    body: 'Modern facilities and creative programs that encourage curiosity, innovation, experimentation, and artistic expression.',
  },
]

export const coreValues: CoreValue[] = [
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Honesty in word and deed, especially when no one is watching.',
    icon: 'target',
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'High standards in scholarship, conduct and presentation.',
    icon: 'trophy',
  },
  {
    id: 'respect',
    title: 'Respect',
    description: 'Regard for self, elders, peers, and every member of the community.',
    icon: 'users',
  },
  {
    id: 'discipline',
    title: 'Discipline',
    description: 'Consistency and self-control as the foundation of achievement.',
    icon: 'award',
  },
  {
    id: 'responsibility',
    title: 'Responsibility',
    description: 'Taking ownership of learning, choices and commitments.',
    icon: 'compass',
  },
  {
    id: 'compassion',
    title: 'Compassion',
    description: 'Empathy expressed through service and kindness of heart.',
    icon: 'heart',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Curiosity, creativity and the courage to try something new.',
    icon: 'lightbulb',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Leading by example in the classroom, on the field and at home.',
    icon: 'star',
  },
]

export const campusFeatures = [
  {
    id: 'library',
    title: 'Library & Resource Centre',
    description: 'Over 20,000 titles, digital reading stations and quiet study space.',
    image: images.library,
    imageAlt: 'Students reading together in the school library',
  },
  {
    id: 'labs',
    title: 'Science & Computer Laboratories',
    description: 'Dedicated laboratories for physics, chemistry, biology and computing.',
    image: images.scienceLab,
    imageAlt: 'Students conducting an experiment in the science laboratory',
  },
  {
    id: 'fields',
    title: 'Sports Grounds',
    description: 'Football pitch, basketball court, athletics track and swimming pool.',
    image: images.sports,
    imageAlt: 'Students running on the school athletics track',
  },
  {
    id: 'arts',
    title: 'Performing Arts Studio',
    description: 'Music, drama and visual arts studios with student exhibitions each term.',
    image: images.arts,
    imageAlt: 'Student painting artwork in the art studio',
  },
]
