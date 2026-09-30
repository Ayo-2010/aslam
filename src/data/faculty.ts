import type { FacultyMember } from '@/types'
import { images } from './images'

export const principal = {
  name: 'Dr. Ibrahim Aslam',
  position: 'Principal, Aslam School',
  image: images.portraitMan,
  imageAlt: 'Portrait of Dr. Ibrahim Aslam, Principal of Aslam School',
  message: [
    'Education at Aslam School begins with a simple conviction: a child learns best when they are known, challenged and respected. Our classrooms are small enough for a teacher to notice who is struggling and who is ready for more, and structured enough that no one is left to drift.',
    'We have deliberately built a school where academic rigour and character are not competing priorities. A student who masters a difficult equation and a student who shows kindness to a weaker classmate are both doing the work we care about. We assess the whole child — scholarship, conduct, service and character.',
    'Our parents are partners in this. The parent portal, regular conferences and transparent reporting exist so that what happens in this campus is also visible at home. When a family chooses Aslam School, they are trusting us with a child’s formation, and we take that responsibility seriously.',
    'To the students reading this: you are not here to be impressed. You are here to become capable. Study hard, act with integrity, and leave this place better than you found it.',
  ],
}

export const leadershipTeam: FacultyMember[] = [
  {
    id: 'principal',
    name: 'Dr. Ibrahim Aslam',
    role: 'Principal',
    department: 'School Leadership',
    image: images.portraitMan,
    imageAlt: 'Portrait of Dr. Ibrahim Aslam',
    bio: 'PhD in Educational Leadership, University of Lagos. Founded the school’s academic-integrity programme and chairs the governors’ academic committee.',
  },
  {
    id: 'vice-principal',
    name: 'Mrs. Amina Yusuf',
    role: 'Vice Principal (Administration)',
    department: 'School Leadership',
    image: images.portraitWoman,
    imageAlt: 'Portrait of Mrs. Amina Yusuf',
    bio: 'Over eighteen years in school administration. Oversees operations, staff welfare and compliance across both campuses.',
  },
  {
    id: 'head-academics',
    name: 'Mr. Chinedu Okafor',
    role: 'Head of Academics',
    department: 'Curriculum',
    image: images.portraitMan2,
    imageAlt: 'Portrait of Mr. Chinedu Okafor',
    bio: 'M.Sc. Education and former WAEC examiner. Leads curriculum design, assessment policy and the timetable programme.',
  },
  {
    id: 'head-primary',
    name: 'Mrs. Fatima Bello',
    role: 'Head of Primary',
    department: 'Primary School',
    image: images.portraitWoman2,
    imageAlt: 'Portrait of Mrs. Fatima Bello',
    bio: 'Specialist in early childhood literacy. Introduced the phonics programme now used from Primary 1 to Primary 3.',
  },
  {
    id: 'head-secondary',
    name: 'Mr. Emeka Nwosu',
    role: 'Head of Secondary',
    department: 'Secondary School',
    image: images.portraitMan3,
    imageAlt: 'Portrait of Mr. Emeka Nwosu',
    bio: 'Mathematics graduate and examination specialist. Leads the senior secondary tutorial and university guidance programmes.',
  },
  {
    id: 'stem-coordinator',
    name: 'Dr. Halima Sani',
    role: 'STEM Coordinator',
    department: 'Science & Technology',
    image: images.portraitWoman3,
    imageAlt: 'Portrait of Dr. Halima Sani',
    bio: 'PhD in Molecular Biology. Runs the robotics laboratory, science fair and the school’s coding club.',
  },
  {
    id: 'arts-coordinator',
    name: 'Mr. Tunde Adeyemi',
    role: 'Arts Coordinator',
    department: 'Creative Arts',
    image: images.portraitMan4,
    imageAlt: 'Portrait of Mr. Tunde Adeyemi',
    bio: 'Theatre practitioner and alumnus of the National Institute for Cultural Studies. Directs drama, music and the annual arts exhibition.',
  },
  {
    id: 'sports-director',
    name: 'Mrs. Grace Eze',
    role: 'Sports Director',
    department: 'Athletics',
    image: images.portraitWoman4,
    imageAlt: 'Portrait of Mrs. Grace Eze',
    bio: 'Former international sprinter. Built the athletics programme that now fields competitive teams in seven sports.',
  },
]

export const leadershipCount = leadershipTeam.length
