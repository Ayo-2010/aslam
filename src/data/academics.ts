import type { AcademicProgram, ExtracurricularGroup } from '@/types'
import { images } from './images'

export const academicPrograms: AcademicProgram[] = [
  {
    id: 'primary',
    slug: 'primary',
    stage: 'Primary School',
    ageRange: 'Ages 5 – 11 · Primary 1 – 6',
    summary:
      'A warm, structured start that builds literacy, numeracy, curiosity and the social skills young learners need to thrive.',
    image: images.primary,
    imageAlt: 'Young pupils reading together during a primary school lesson',
    focus: ['Foundational literacy', 'Numeracy', 'Creativity', 'Social development'],
    subjects: [
      'English',
      'Mathematics',
      'Basic Science',
      'Social Studies',
      'Computer Studies',
      'Creative Arts',
      'Physical Education',
      'Religious / Moral Education',
    ],
    objectives: [
      'Read fluently and communicate clearly in English',
      'Develop confident number sense and problem-solving skills',
      'Observe carefully and ask questions about the natural world',
      'Work cooperatively, share materials and resolve conflict calmly',
      'Express ideas through drawing, movement, music and speech',
    ],
    approach: [
      'Play-based, activity-led lessons that keep young learners engaged',
      'Phonics and number blocks for systematic skill building',
      'Daily circle time for values, prayer and class community',
      'Weekly library period and story-telling sessions',
      'Low-stakes homework focused on habit rather than volume',
    ],
    assessment: [
      'Continuous observation and classwork portfolio',
      'Termly moderated progress reports for parents',
      'Reading and numeracy checkpoint each term',
      'Practical, play-based assessments in arts and physical education',
    ],
    progression: 'Pupils progress from Primary 1 to Primary 6 before transitioning into Junior Secondary.',
    cta: 'Explore Primary',
  },
  {
    id: 'junior-secondary',
    slug: 'junior-secondary',
    stage: 'Junior Secondary',
    ageRange: 'Ages 11 – 14 · JSS 1 – 3',
    summary:
      'Subject specialists, structured assessment and a growing independence prepare students for senior secondary study.',
    image: images.secondary,
    imageAlt: 'Junior secondary students working together at a classroom table',
    focus: [
      'Core sciences',
      'Mathematics',
      'Languages',
      'Technology',
      'Critical thinking',
    ],
    subjects: [
      'Mathematics',
      'English',
      'Basic Science',
      'Basic Technology',
      'Social Studies',
      'Computer Studies',
      'Civic Education',
      'Business Studies',
      'Creative Arts',
    ],
    objectives: [
      'Reason with numbers and present logical, step-by-step solutions',
      'Explain scientific phenomena using evidence from experiments',
      'Write clear, structured arguments in English and communicate confidently',
      'Design, build and test simple technology solutions',
      'Work ethically in teams and take responsibility for group outcomes',
    ],
    approach: [
      'Subject-specialist teaching with mixed-ability support sessions',
      'Laboratory and computer-based practical work every fortnight',
      'Weekly tutorial clinics led by senior teachers',
      'Project-based units culminating in a public presentation',
      'Mentoring from senior students in reading and mathematics',
    ],
    assessment: [
      'End-of-term examinations with moderated marking',
      'Continuous class tests and practical assessments',
      'Project and portfolio review each term',
      'Verbal and written feedback with individual targets',
    ],
    progression: 'JSS 3 students sit the BECE and are guided through post-graduate options.',
    cta: 'Explore Junior Secondary',
  },
  {
    id: 'senior-secondary',
    slug: 'senior-secondary',
    stage: 'Senior Secondary',
    ageRange: 'Ages 14 – 18 · SS 1 – 3',
    summary:
      'Advanced academics, career preparation and leadership opportunities that equip students for university and beyond.',
    image: images.senior,
    imageAlt: 'Senior secondary students at graduation ceremony',
    focus: ['Advanced academics', 'Career preparation', 'STEM', 'Arts', 'Leadership'],
    subjects: [
      'Mathematics',
      'English',
      'Physics',
      'Chemistry',
      'Biology',
      'Economics',
      'Government',
      'Literature',
      'Computer Science',
      'Geography',
      'Accounting',
    ],
    objectives: [
      'Achieve excellence in chosen science, arts or commercial subjects',
      'Apply knowledge to unfamiliar, real-world problems',
      'Lead and serve confidently in school clubs, house teams and community',
      'Prepare for university through tutorials, mock exams and applications',
      'Build employability skills: research, communication and collaboration',
    ],
    approach: [
      'Science, arts and commercial groupings chosen from SS 2',
      'Qualified subject teachers with university and industry experience',
      'Weekly examination tutorials and mock WAEC / NECO papers',
      'University guidance, application support and interview practice',
      'Student leadership academy and peer mentoring programme',
    ],
    assessment: [
      'Continuous assessment, unit tests and practical examinations',
      'Mock WAEC / NECO and BECE examinations each term',
      'Internal and external examination preparation intensives',
      'Termly report cards with teacher and principal commentary',
    ],
    progression: 'Graduates proceed to universities, polytechnics, colleges of education and industry placements.',
    cta: 'Explore Senior Secondary',
  },
]

export const extracurricular: ExtracurricularGroup[] = [
  {
    id: 'clubs',
    title: 'Clubs',
    description:
      'Student-led groups that meet weekly under faculty supervision and develop leadership, research and presentation skills.',
    items: [
      'Coding Club',
      'Science Club',
      'Debate Club',
      'Literary Club',
      'Press Club',
      'Entrepreneurship Club',
      'Art Club',
      'Robotics Club',
    ],
  },
  {
    id: 'sports',
    title: 'Sports',
    description:
      'The athletics programme competes in inter-school and inter-house events, with a focus on technique, fitness and team spirit.',
    items: ['Football', 'Basketball', 'Volleyball', 'Athletics', 'Table Tennis', 'Swimming'],
  },
  {
    id: 'creative-arts',
    title: 'Creative Arts',
    description:
      'Performances, exhibitions and public speaking events give every student a platform to be seen and heard.',
    items: ['Music', 'Drama', 'Drawing', 'Painting', 'Public Speaking'],
  },
]

export const programHighlights = [
  {
    id: 'languages',
    title: 'Languages',
    body: 'English is taught as a first language with daily reading and writing practice, alongside French and Yoruba in the junior years.',
  },
  {
    id: 'technology',
    title: 'Technology',
    body: 'Digital literacy, coding and robotics are embedded from Primary 3, supported by a dedicated computer laboratory.',
  },
  {
    id: 'pastoral',
    title: 'Pastoral Care',
    body: 'Every student has a form tutor, a pastoral head and access to a school counsellor.',
  },
]
