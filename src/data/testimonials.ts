import type { Testimonial } from '@/types'
import { images } from './images'

export const testimonials: Testimonial[] = [
  {
    id: 't-parent',
    name: 'Mr. & Mrs. Adeyemi',
    role: 'Parent',
    quote:
      'What convinced us was the small classes. Our daughter moved from a school of ninety to a class of twenty-eight, and within a term her confidence in mathematics had changed completely. The portal means we hear about her week before she even tells us.',
    detail: 'Parents of a JSS 2 student',
    image: images.parentPortrait,
    imageAlt: 'Portrait of Mr. and Mrs. Adeyemi',
  },
  {
    id: 't-alumni',
    name: 'Dr. Amina Aslam',
    role: 'Alumni',
    quote:
      'I came here at six years old and left at eighteen. What I remember most is not the exams but the habits: presenting your work, being honest when you are wrong, and respecting the person teaching you. I use those every day in the clinic.',
    detail: 'Class of 2011 · MBBS, University of Lagos',
    image: images.alumniPortrait,
    imageAlt: 'Portrait of Dr. Amina Aslam, alumna of Aslam School',
  },
  {
    id: 't-student',
    name: 'Yusuf Abdulsalam',
    role: 'Student',
    quote:
      'Our science teacher makes you argue for your answer. I joined the robotics club because of him, and last term we built a water filter that actually works. In SS 1 I thought science was something you memorise. Now I think it is something you test.',
    detail: 'SS 2 student, Robotics Club',
    image: images.studentBoy,
    imageAlt: 'Portrait of Yusuf Abdulsalam, senior secondary student',
  },
  {
    id: 't-parent-2',
    name: 'Mrs. Halima Sanni',
    role: 'Parent',
    quote:
      'The pastoral care is real. When my son struggled in SS 1, the form tutor called us within a week and a tutor was arranged. That is not something you get in a school of a thousand students.',
    detail: 'Parent of an SS 1 student',
    image: images.portraitWoman3,
    imageAlt: 'Portrait of Mrs. Halima Sanni',
  },
  {
    id: 't-alumni-2',
    name: 'Engr. Chidi Okonkwo',
    role: 'Alumni',
    quote:
      'The tutorial programme is unglamorous and it worked. We were prepared for the exam in a way I have not seen elsewhere, but the discipline in the morning routine is what carried me through university.',
    detail: 'Class of 2016 · Engineering, University of Nigeria',
    image: images.portraitMan2,
    imageAlt: 'Portrait of Engr. Chidi Okonkwo, alumnus of Aslam School',
  },
]
