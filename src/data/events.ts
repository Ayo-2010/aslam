import type { SchoolEvent } from '@/types'
import { images } from './images'

export const events: SchoolEvent[] = [
  {
    slug: 'autumn-open-day',
    title: 'Autumn Open Day',
    category: 'Admissions',
    description:
      'Meet our teachers, tour our facilities, and learn more about life at Aslam School.',
    body: [
      'Join us for a morning on campus as prospective families meet class teachers, tour the laboratories, library and sports grounds, and learn about the curriculum at each stage.',
      'Sessions run in English and Yoruba, with separate times for primary and secondary families. There will be a student-led tour of the boarding and day facilities, and an informal Q&A with the admissions office and school leadership.',
      'No registration fee is required and children are welcome to take part in the supervised activity programme.',
    ],
    image: images.openDay,
    imageAlt: 'Families and visitors arriving at the school for open day',
    date: '2026-10-17',
    time: '9:00 AM – 1:00 PM',
    location: 'Main Campus, 12 Education Avenue, Lagos',
  },
  {
    slug: 'inter-house-sports',
    title: 'Inter-House Sports',
    category: 'Sports',
    description:
      'Students compete across a variety of sporting events while building teamwork and school spirit.',
    body: [
      'Our four house teams compete across twelve events including football, basketball, volleyball, table tennis and relay athletics.',
      'Spectators are warmly welcome. The athletics trials for the inter-school team will be announced at the event, and refreshments will be available on the field.',
    ],
    image: images.interHouse,
    imageAlt: 'Students competing in an athletics event',
    date: '2026-11-28',
    time: '8:00 AM – 4:00 PM',
    location: 'Sports Grounds, Aslam School',
  },
  {
    slug: 'parent-teacher-conference',
    title: 'Parent–Teacher Conference',
    category: 'Academic',
    description: 'Meet with teachers to discuss student progress and development.',
    body: [
      'Termly conferences give parents direct access to subject teachers, form tutors and pastoral staff.',
      'Slots are booked through the school office and the parent portal. Reports and progress commentary are available for download in the portal 48 hours before the conference.',
    ],
    image: images.conference,
    imageAlt: 'Parents seated in discussion with teachers at a conference',
    date: '2026-12-12',
    time: '9:00 AM – 3:00 PM',
    location: 'Learning Block, Aslam School',
  },
  {
    slug: 'annual-arts-exhibition',
    title: 'Annual Arts Exhibition & Drama Showcase',
    category: 'Arts',
    description:
      'An evening of student artwork, music and drama in the performing arts studio.',
    body: [
      'The Creative Arts department presents its annual showcase: paintings, sculptures, photography, a student orchestra and two drama performances.',
      'Parents, alumni and invited guests are welcome. The event is free, and proceeds from the exhibition catalogue go towards arts scholarships.',
    ],
    image: images.arts,
    imageAlt: 'Student artwork displayed at an exhibition',
    date: '2027-01-23',
    time: '5:00 PM – 8:00 PM',
    location: 'Performing Arts Studio, Aslam School',
  },
  {
    slug: 'career-guidance-workshop',
    title: 'Senior Secondary Career Guidance Workshop',
    category: 'Admissions',
    description:
      'University admissions, JAMB preparation, vocational pathways and alumni career stories.',
    body: [
      'A practical workshop for SS 2 and SS 3 students and their parents, covering university and polytechnic admissions, scholarship applications and alternative vocational pathways.',
      'Alumni working in medicine, law, engineering, teaching and entrepreneurship share their experience, followed by a Q&A session.',
    ],
    image: images.meeting,
    imageAlt: 'Students attending a career guidance workshop',
    date: '2027-02-20',
    time: '10:00 AM – 2:00 PM',
    location: 'Auditorium, Aslam School',
  },
]
