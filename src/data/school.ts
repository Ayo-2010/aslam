import type { SchoolContact } from '@/types'

export const school = {
  name: 'Aslam School',
  tagline: "Empowering Tomorrow's Leaders",
  shortDescription:
    'A co-educational day school in Lagos combining academic excellence, character development and modern learning.',
  foundedYear: 1998,
  contact: {
    address: '12 Education Avenue, Lagos, Nigeria',
    phone: '+234 800 000 0000',
    email: 'info@aslamschool.edu',
    hours: 'Monday – Friday, 8:00 AM – 4:00 PM',
  } satisfies SchoolContact,
  mission:
    'To provide a safe, inclusive, and intellectually stimulating environment where every student can develop academically, morally, socially, and creatively.',
  vision:
    'To raise confident, responsible, and innovative leaders who positively influence their communities and the wider world.',
  social: [
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
    { id: 'x', label: 'X (formerly Twitter)', href: 'https://x.com' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  ],
}
