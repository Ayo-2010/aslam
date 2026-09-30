import type { AdmissionStep, Faq, FeeRow, Requirement } from '@/types'

export const admissionSteps: AdmissionStep[] = [
  {
    id: 'apply',
    step: 1,
    title: 'Submit Application',
    description:
      'Complete the online application form and upload the required documents. You will receive an application reference immediately.',
    icon: 'book',
  },
  {
    id: 'review',
    step: 2,
    title: 'Document Review',
    description:
      'The admissions office verifies your documents and confirms the applicant is eligible for the requested grade level.',
    icon: 'shield',
  },
  {
    id: 'assessment',
    step: 3,
    title: 'Entrance Assessment',
    description:
      'Applicants sit a written assessment in English and mathematics at the assigned time. Primary applicants are assessed through an age-appropriate activity session.',
    icon: 'target',
  },
  {
    id: 'interview',
    step: 4,
    title: 'Interview',
    description:
      'A short interview with the applicant and a separate conversation with parents or guardians about expectations and support.',
    icon: 'users',
  },
  {
    id: 'decision',
    step: 5,
    title: 'Admission Decision',
    description:
      'Decisions are communicated by email and through the parent portal, with a place offer and the deadline for acceptance.',
    icon: 'award',
  },
  {
    id: 'enrolment',
    step: 6,
    title: 'Enrollment',
    description:
      'Pay fees, collect uniforms and student identity cards, and attend the orientation session before term begins.',
    icon: 'graduation',
  },
]

export const requirements: Requirement[] = [
  {
    id: 'form',
    label: 'Completed application form',
    description: 'Submitted online with a valid reference number.',
  },
  {
    id: 'birth',
    label: 'Birth certificate',
    description: 'A certified copy issued by a government authority.',
  },
  {
    id: 'records',
    label: 'Previous school records',
    description: 'Most recent report card or terminal result from the previous school.',
  },
  {
    id: 'photos',
    label: 'Passport photographs',
    description: 'Four clear colour photographs, taken within the last six months.',
  },
  {
    id: 'medical',
    label: 'Medical information',
    description: 'Where required by grade level or the school’s health policy.',
  },
  {
    id: 'guardian',
    label: 'Parent / guardian identification',
    description: 'A valid means of identification for the responsible parent or guardian.',
  },
  {
    id: 'assessment',
    label: 'Entrance assessment',
    description: 'Scheduled by the school once the application is reviewed.',
  },
]

export const fees: FeeRow[] = [
  { grade: 'Primary 1 – 3', tuition: 480000, registration: 45000, books: 38000, activities: 32000, total: 595000 },
  { grade: 'Primary 4 – 6', tuition: 545000, registration: 45000, books: 42000, activities: 35000, total: 667000 },
  { grade: 'JSS 1 – 3', tuition: 625000, registration: 50000, books: 47000, activities: 40000, total: 762000 },
  { grade: 'SS 1 – 3', tuition: 780000, registration: 55000, books: 56000, activities: 45000, total: 936000 },
]

export const feeDisclaimer =
  'Displayed fees are illustrative. Contact the admissions office for the current official fee schedule.'

export const naira = (amount: number): string =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)

export const admissionsFaqs: Faq[] = [
  {
    id: 'faq-1',
    question: 'What is the school intake for the 2026/27 session?',
    answer:
      'Applications are open for Primary 1, Primary 4, JSS 1 and SS 1. Other grade levels are considered only where vacancies exist — the admissions office will confirm availability when your application is reviewed.',
  },
  {
    id: 'faq-2',
    question: 'Is there an application fee?',
    answer:
      'No. The online application is free and no payment is required to submit it. You will only be asked for payment once an offer of admission has been made.',
  },
  {
    id: 'faq-3',
    question: 'Do siblings receive priority or a fee discount?',
    answer:
      'Siblings are prioritised in the allocation process when places are limited. A sibling discount of 10% on tuition applies from the second child enrolled in the same academic year.',
  },
  {
    id: 'faq-4',
    question: 'What happens after I submit the application?',
    answer:
      'You receive an application reference by email. The admissions office reviews your documents, schedules your entrance assessment and interview, and then communicates a decision.',
  },
  {
    id: 'faq-5',
    question: 'Are there scholarships or bursaries?',
    answer:
      'Yes. Means-tested bursaries and merit scholarships are awarded in the second term each year. Applications open with the main admission cycle and are reviewed by the governors’ committee.',
  },
  {
    id: 'faq-6',
    question: 'Can I pay fees in instalments?',
    answer:
      'Yes. Tuition may be paid in two instalments (first and second term) or in three monthly instalments. The bursar explains the options during enrolment.',
  },
  {
    id: 'faq-7',
    question: 'Does the school provide transport?',
    answer:
      'The school partners with two vetted transport operators covering routes across Lagos. Details are shared with enrolled families before the start of each term.',
  },
]
