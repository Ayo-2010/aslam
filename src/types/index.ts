import type { IconName } from '@/data/icons'

export interface NavLink {
  label: string
  to: string
  description?: string
}

export interface SchoolContact {
  address: string
  phone: string
  email: string
  hours: string
}

export interface Announcement {
  id: string
  message: string
  severity: 'info' | 'urgent'
  postedAt: string
  linkLabel?: string
  linkTo?: string
}

export interface Stat {
  id: string
  value: number
  suffix: string
  prefix: string
  label: string
  description: string
}

export interface Pillar {
  id: string
  icon: IconName
  title: string
  body: string
}

export interface AcademicProgram {
  id: string
  slug: string
  stage: string
  ageRange: string
  summary: string
  image: string
  imageAlt: string
  focus: string[]
  subjects: string[]
  objectives: string[]
  approach: string[]
  assessment: string[]
  progression: string
  cta: string
}

export interface ExtracurricularGroup {
  id: string
  title: string
  description: string
  items: string[]
}

export interface FacultyMember {
  id: string
  name: string
  role: string
  department: string
  image: string
  imageAlt: string
  bio: string
}

export interface CoreValue {
  id: string
  title: string
  description: string
  icon: IconName
}

export interface NewsArticle {
  slug: string
  title: string
  category: string
  excerpt: string
  body: string[]
  image: string
  imageAlt: string
  date: string
  author: string
  readingTime: string
}

export interface SchoolEvent {
  slug: string
  title: string
  category: string
  description: string
  body: string[]
  image: string
  imageAlt: string
  date: string
  time: string
  location: string
}

export interface Testimonial {
  id: string
  name: string
  role: 'Parent' | 'Alumni' | 'Student'
  quote: string
  detail?: string
  image: string
  imageAlt: string
}

export interface FeeRow {
  grade: string
  tuition: number
  registration: number
  books: number
  activities: number
  total: number
}

export interface AdmissionStep {
  id: string
  step: number
  title: string
  description: string
  icon: IconName
}

export interface Requirement {
  id: string
  label: string
  description: string
}

export interface Faq {
  id: string
  question: string
  answer: string
}

export interface ApplicationData {
  student: {
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
    grade: string
  }
  guardian: {
    name: string
    relationship: string
    phone: string
    email: string
    address: string
  }
  documents: {
    birthCertificate: string
    previousReport: string
    passportPhoto: string
    otherDocuments: string
  }
}

export interface Child {
  id: string
  name: string
  grade: string
  classTeacher: string
  attendance: number
  avatar: string
  avatarAlt: string
}

export interface SubjectResult {
  subject: string
  teacher: string
  score: number
  grade: string
  remark: string
}

export interface AttendanceSummary {
  present: number
  absent: number
  late: number
  total: number
}

export interface FeeRecord {
  id: string
  label: string
  term: string
  amount: number
  status: 'Paid' | 'Due' | 'Overdue' | 'Processing'
  date: string
}

export interface Message {
  id: string
  from: 'teacher' | 'parent'
  body: string
  time: string
}

export interface Conversation {
  id: string
  teacher: string
  role: string
  subject: string
  avatar: string
  avatarAlt: string
  lastMessage: string
  lastTime: string
  unread: number
  messages: Message[]
}

