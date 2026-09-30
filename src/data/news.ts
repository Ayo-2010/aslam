import type { NewsArticle } from '@/types'
import { images } from './images'

export const news: NewsArticle[] = [
  {
    slug: 'students-win-national-science-fair',
    title: 'Aslam Students Win Gold at National Science Fair',
    category: 'Academic',
    excerpt:
      'A team of JSS 3 students took the gold medal for their low-cost water purification model developed with mentors from the STEM club.',
    body: [
      'Four JSS 3 students have been awarded the gold medal at the National Science Fair for a low-cost water purification model they designed and tested over nine months.',
      'The project began in the Robotics and Science clubs under the mentorship of Dr. Halima Sani. The team visited a rural community to understand the practical constraints before designing a filter that uses locally available materials and can be maintained by the community itself.',
      'Judges praised the team’s rigorous testing record and the way they documented failures as carefully as successes. Each student now plans to continue the project in senior secondary with a focus on manufacturing.',
    ],
    image: images.robotics,
    imageAlt: 'Students working on a robotics project in the school laboratory',
    date: '2026-08-18',
    author: 'Aslam Communications',
    readingTime: '4 min read',
  },
  {
    slug: 'new-secondary-campus-opens',
    title: 'New Secondary Campus Wing Opens for the 2026/27 Session',
    category: 'Campus',
    excerpt:
      'The new wing adds 24 science classrooms, a technology hub and an expanded library to the school’s secondary campus.',
    body: [
      'The 2026/27 academic session begins in a newly completed secondary campus wing, funded by the governors and the parent association.',
      'The building adds 24 classrooms, four dedicated laboratories, a technology hub with 60 workstations, and a library extension that doubles the reading space. The design includes natural cross-ventilation, which has reduced classroom energy use significantly.',
      'Students will begin the term with tours of the new facilities during their first week, along with induction sessions for parents on the expanded parent portal.',
    ],
    image: images.campus,
    imageAlt: 'The Aslam School campus building on a bright morning',
    date: '2026-07-29',
    author: 'Aslam Communications',
    readingTime: '3 min read',
  },
  {
    slug: 'alumni-mentorship-programme',
    title: 'Alumni Mentorship Programme Welcomes 40 New Mentors',
    category: 'Community',
    excerpt:
      'Graduates in medicine, law, engineering and entrepreneurship will mentor senior students through the year.',
    body: [
      'Forty alumni have signed up to mentor senior secondary students through the school’s new mentorship programme.',
      'Mentors meet students fortnightly, in person and online, to talk about university preparation, career realities and life after school. The pairing is arranged around each student’s stated interests rather than results alone.',
      'Last year’s cohort reported that contact with a working graduate changed how they thought about subject choices. Applications for the next round open in January.',
    ],
    image: images.meeting,
    imageAlt: 'Alumni mentors meeting with students around a table',
    date: '2026-07-11',
    author: 'Aslam Communications',
    readingTime: '3 min read',
  },
  {
    slug: 'inter-house-sports-2026',
    title: 'Inter-House Sports: Green Defends the Victorious Cup',
    category: 'Sports',
    excerpt:
      'Over 400 students competed across twelve events in an afternoon of athletics, football and relay racing.',
    body: [
      'Four house teams competed in twelve events in the annual inter-house sports competition, with more than 400 students taking part.',
      'Green House retained the Victorious Cup after strong performances in the relay races and the 100 metres. The final relay saw a photo finish decided by a tenth of a second, decided by a video review from the athletics judges.',
      'The sports director confirmed that selection for the inter-school athletics team begins in two weeks, with trials open to all house members.',
    ],
    image: images.interHouse,
    imageAlt: 'Students competing in a track event during inter-house sports',
    date: '2026-06-24',
    author: 'Sports Department',
    readingTime: '2 min read',
  },
  {
    slug: 'chaplaincy-charity-drive',
    title: 'Chaplaincy Collects 400 Books for Community Schools',
    category: 'Community',
    excerpt:
      'Students raised funds and gathered used textbooks for three community schools in the surrounding district.',
    body: [
      'The school chaplaincy, together with the Literary Club, delivered 400 textbooks to three community schools this term.',
      'The drive began last year with a book drive in the primary school and has now become an annual fixture. Students sorted, labelled and packed the donated materials before the end of the second term.',
      'The chaplaincy will repeat the programme next year and is looking for volunteers to help with reading support for the recipient schools.',
    ],
    image: images.library,
    imageAlt: 'Stack of books prepared for donation to community schools',
    date: '2026-06-05',
    author: 'Chaplaincy Team',
    readingTime: '2 min read',
  },
  {
    slug: 'examination-results-2026',
    title: '98% of Candidates Earn University Places in 2026',
    category: 'Academic',
    excerpt:
      'Outstanding BECE and WAEC results: 41 students scored five distinctions and 12 gained medical and engineering placements.',
    body: [
      'Our graduating class has recorded another year of outstanding results, with 98% of candidates gaining admission to university, polytechnic or college of education.',
      'Forty-one students earned five distinctions, and twelve received places in medicine, engineering and law through the joint admission programme. Two students were offered scholarships to study abroad.',
      'The results reflect sustained work in the tutorial programme, which begins in SS 2 and continues through the entire examination year.',
    ],
    image: images.graduation,
    imageAlt: 'Students in graduation gowns celebrating at the end of the school year',
    date: '2026-05-30',
    author: 'Academic Department',
    readingTime: '3 min read',
  },
]
