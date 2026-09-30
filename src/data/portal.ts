import type {
  AttendanceSummary,
  Child,
  Conversation,
  FeeRecord,
  SubjectResult,
} from '@/types'
import { images } from './images'

export const children: Child[] = [
  {
    id: 'amina',
    name: 'Amina Aslam',
    grade: 'JSS 2',
    classTeacher: 'Mr. Chinedu Okafor',
    attendance: 96,
    avatar: images.childPortrait,
    avatarAlt: 'Portrait of Amina Aslam, JSS 2 student',
  },
  {
    id: 'bilal',
    name: 'Bilal Aslam',
    grade: 'Primary 5',
    classTeacher: 'Mrs. Fatima Bello',
    attendance: 99,
    avatar: images.studentBoy,
    avatarAlt: 'Portrait of Bilal Aslam, Primary 5 student',
  },
]

export const attendance: AttendanceSummary = {
  present: 46,
  absent: 2,
  late: 1,
  total: 49,
}

export const attendanceBySubject: { subject: string; present: number; total: number }[] = [
  { subject: 'Mathematics', present: 98, total: 100 },
  { subject: 'English Language', present: 100, total: 100 },
  { subject: 'Basic Science', present: 94, total: 100 },
  { subject: 'Social Studies', present: 100, total: 100 },
  { subject: 'Computer Studies', present: 96, total: 100 },
]

export const subjectResults: SubjectResult[] = [
  { subject: 'Mathematics', teacher: 'Mr. Emeka Nwosu', score: 88, grade: 'A1', remark: 'Excellent grasp of algebraic reasoning.' },
  { subject: 'English Language', teacher: 'Mrs. A. Yusuf', score: 81, grade: 'B2', remark: 'Strong writing; continue expanding vocabulary.' },
  { subject: 'Basic Science', teacher: 'Dr. Halima Sani', score: 84, grade: 'B2', remark: 'Consistent lab work and good note-taking.' },
  { subject: 'Social Studies', teacher: 'Mr. C. Okafor', score: 79, grade: 'B3', remark: 'Solid understanding of civics concepts.' },
  { subject: 'Computer Studies', teacher: 'Mr. T. Adeyemi', score: 90, grade: 'A1', remark: 'Outstanding project work this term.' },
  { subject: 'Civic Education', teacher: 'Mr. C. Okafor', score: 76, grade: 'C3', remark: 'Good effort; focus on examination timing.' },
]

export const termComments = {
  teacher: 'Amina has settled in well this term. She participates confidently in class and her practical work is consistently careful. The next step is to build her written expression in essays.',
  principal: 'A commendable result. With continued effort, Amina is well placed to progress into the senior secondary science grouping next year.',
}

export const feeRecords: FeeRecord[] = [
  { id: 'inv-1', label: 'First Term Tuition', term: '2025/26 · First Term', amount: 312500, status: 'Paid', date: '2025-09-08' },
  { id: 'inv-2', label: 'Second Term Tuition', term: '2025/26 · Second Term', amount: 312500, status: 'Paid', date: '2026-01-12' },
  { id: 'inv-3', label: 'Third Term Tuition', term: '2025/26 · Third Term', amount: 312500, status: 'Overdue', date: '2026-04-06' },
  { id: 'inv-4', label: 'Registration Fee', term: '2025/26 · Session', amount: 50000, status: 'Paid', date: '2025-09-08' },
  { id: 'inv-5', label: 'Books & Materials', term: '2025/26 · Session', amount: 47000, status: 'Due', date: '2026-09-20' },
]

export const outstandingBalance = {
  amount: 359500,
  dueDate: '2026-09-30',
  status: 'Overdue' as const,
  breakdown: [
    { label: 'Third Term Tuition', amount: 312500 },
    { label: 'Books & Materials', amount: 47000 },
  ],
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    teacher: 'Mr. Emeka Nwosu',
    role: 'Mathematics · Form Tutor',
    subject: 'Mathematics progress',
    avatar: images.portraitMan3,
    avatarAlt: 'Portrait of Mr. Emeka Nwosu',
    lastMessage: 'Amina has improved a great deal in algebra this term.',
    lastTime: '09:42',
    unread: 1,
    messages: [
      {
        id: 'm1',
        from: 'teacher',
        body: 'Good afternoon. I wanted to update you on Amina’s mathematics progress before the end of term.',
        time: '09:15',
      },
      {
        id: 'm2',
        from: 'teacher',
        body: 'She has improved a great deal in algebra this term. Her class tests are consistently above 80, and she now asks the right questions before attempting a problem.',
        time: '09:18',
      },
      {
        id: 'm3',
        from: 'parent',
        body: 'Thank you, sir. She mentioned she finds the written questions difficult.',
        time: '09:30',
      },
      {
        id: 'm4',
        from: 'teacher',
        body: 'Understood. I have given her a timed question set for the holidays and asked her to bring it for marking at the start of the next term.',
        time: '09:42',
      },
    ],
  },
  {
    id: 'c2',
    teacher: 'Dr. Halima Sani',
    role: 'Basic Science',
    subject: 'Laboratory practical',
    avatar: images.portraitWoman3,
    avatarAlt: 'Portrait of Dr. Halima Sani',
    lastMessage: 'The practical report is available in the portal now.',
    lastTime: 'Yesterday',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'teacher',
        body: 'Amina’s group performed well in the acid-base titration practical. Her lab notebook is the most complete in the class.',
        time: '15:02',
      },
      {
        id: 'm2',
        from: 'teacher',
        body: 'The practical report is available in the portal now if you would like to read her write-up.',
        time: '15:05',
      },
    ],
  },
  {
    id: 'c3',
    teacher: 'Mrs. A. Yusuf',
    role: 'English Language',
    subject: 'End of term commentary',
    avatar: images.portraitWoman,
    avatarAlt: 'Portrait of Mrs. A. Yusuf',
    lastMessage: 'Please encourage daily reading at home.',
    lastTime: '2 days',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'teacher',
        body: 'I have written the end of term commentary for Amina. It is available in the portal, but the key request is simple: please encourage daily reading at home, even twenty minutes.',
        time: '11:20',
      },
    ],
  },
]

export const portalAnnouncements = [
  {
    id: 'pa1',
    title: 'School resumes Monday, 7 September',
    body: 'The third term begins at 7:30 AM. Students should come in full uniform and bring their termly books.',
    date: '2026-08-28',
    tag: 'School',
  },
  {
    id: 'pa2',
    title: 'Third term fees outstanding',
    body: 'Third term tuition for the 2025/26 session is now overdue. Please settle before the end of September.',
    date: '2026-09-01',
    tag: 'Fees',
  },
  {
    id: 'pa3',
    title: 'Parent–Teacher Conference',
    body: 'Slots are now open for booking. Reports are available in the portal 48 hours before your slot.',
    date: '2026-09-10',
    tag: 'Events',
  },
  {
    id: 'pa4',
    title: 'New wing orientation',
    body: 'First-year students and their parents are invited to an orientation tour of the new secondary wing on 12 September.',
    date: '2026-09-12',
    tag: 'Campus',
  },
]

export const portalTerms = ['First Term', 'Second Term', 'Third Term']
export const portalYears = ['2025/26', '2024/25', '2023/24']

export const schoolCalendar = [
  { id: 'c1', date: '2026-09-07', title: 'Third term resumption', detail: 'Whole school · 7:30 AM' },
  { id: 'c2', date: '2026-09-12', title: 'New wing orientation', detail: 'Secondary campus · 9:00 AM' },
  { id: 'c3', date: '2026-10-17', title: 'Autumn Open Day', detail: 'Main campus · 9:00 AM – 1:00 PM' },
  { id: 'c4', date: '2026-11-28', title: 'Inter-House Sports', detail: 'Sports grounds · 8:00 AM' },
  { id: 'c5', date: '2026-12-12', title: 'Parent–Teacher Conference', detail: 'Learning block · 9:00 AM – 3:00 PM' },
]
