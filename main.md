# MASTER DEVELOPMENT PROMPT — ASLAM SCHOOL WEBSITE

## ROLE

Act as a senior team consisting of:

* Senior Product Designer
* Senior UI/UX Designer
* Senior Vue Engineer
* Senior TypeScript Engineer
* Frontend Architect
* Accessibility Specialist
* SEO Specialist
* QA Engineer

Build a **complete, modern, responsive, production-quality school website** for a fictional educational institution called **Aslam School**.

Do not create a simple landing page or a collection of disconnected mockups. Build the website as a coherent, multi-page school platform with reusable components, realistic content, responsive layouts, accessibility, animations, validation, and clean architecture.

---

# 1. TECHNOLOGY STACK

Use:

* Vue
* TypeScript
* Vite
* Tailwind CSS
* Vue Router
* Lucide  icons
* Modern CSS animations/transitions
* Responsive design
* Semantic HTML

Use a component-based architecture.

Do NOT use:

* jQuery
* Bootstrap
* Material UI
* unnecessary UI libraries
* inline styles unless absolutely necessary

Keep the code clean, modular, reusable, and strongly typed.

---

# 2. BRAND IDENTITY

## School Name

**Aslam School**

## Brand Personality

The website should communicate:

* Academic excellence
* Discipline
* Moral values
* Safety
* Leadership
* Modern education
* Trust
* Community
* Professionalism

## Color Palette

### Primary

Deep Forest Green:

`#0B3D2E`

### Secondary Green

`#145A43`

### Gold Accent

`#C9A227`

### Light Gold

`#E5D18A`

### White

`#FFFFFF`

### Background

`#F7F9F7`

### Dark Text

`#17201C`

### Muted Text

`#66736D`

Use gold sparingly as an accent rather than making the website predominantly gold.

---

# 3. DESIGN DIRECTION

Create a premium academic aesthetic.

The website should feel similar to a high-quality private school/university website.

Use:

* Large typography
* Strong visual hierarchy
* Generous whitespace
* Rounded but professional cards
* Subtle shadows
* Clean borders
* High-quality imagery
* Elegant gold accents
* Forest-green sections
* Smooth hover effects
* Subtle entrance animations
* Consistent spacing

Avoid:

* Excessive gradients
* Excessive animations
* Cluttered layouts
* Huge rounded cards everywhere
* Poor contrast
* Generic template appearance

The website must look intentionally designed rather than AI-generated.

---

# 4. RESPONSIVE DESIGN

The website must work perfectly on:

* Mobile phones
* Tablets
* Laptops
* Desktop monitors
* Large screens

Breakpoints should include:

* Mobile
* `md`
* `lg`
* `xl`
* `2xl`

On mobile:

* Convert navigation to hamburger menu
* Stack cards appropriately
* Make tables horizontally scrollable when necessary
* Make forms single-column
* Keep buttons touch-friendly
* Maintain readable typography
* Prevent horizontal overflow

There must be **zero unintended horizontal scrolling**.

---

# 5. GLOBAL HEADER

Create a reusable `<Header />` component.

## Desktop Navigation

Logo:

**Aslam School**

Navigation:

* Home
* About Us
* Academics
* Admissions
* Parent Portal
* Contact

Right side:

* Parent Login
* Apply Now

`Apply Now` should be the primary gold CTA.

## Mobile

Use:

* Hamburger button
* Slide-down/mobile navigation
* Apply Now button
* Parent Login link

The header should remain visually polished when scrolling.

Consider a sticky header with a subtle shadow/background change after scrolling.

---

# 6. GLOBAL FOOTER

Create a reusable `<Footer />`.

Include:

### School Information

Aslam School

"Empowering Tomorrow's Leaders"

Address placeholder:

**12 Education Avenue, Lagos, Nigeria**

Phone:

**+234 800 000 0000**

Email:

**[info@aslamschool.edu](mailto:info@aslamschool.edu)**

### Quick Links

* Home
* About Us
* Academics
* Admissions
* Parent Portal
* Contact

### Academics

* Primary School
* Junior Secondary
* Senior Secondary
* Clubs & Activities
* Sports

### Admissions

* Admission Process
* Requirements
* Tuition & Fees
* Apply Now

### Social Media

Use icons for:

* Facebook
* Instagram
* X/Twitter
* YouTube

### Bottom

Copyright:

**© 2026 Aslam School. All Rights Reserved.**

Include a privacy policy and terms link.

---

# 7. EMERGENCY ANNOUNCEMENT SYSTEM

Create a reusable announcement banner.

Example:

"School resumes Monday, September 7. Parents are advised to complete all outstanding registration requirements."

The banner should be dismissible.

Create the component so administrators could later control the announcement from a backend.

---

# 8. HOMEPAGE

Route:

`/`

## HERO SECTION

Use a high-quality school/campus/student image.

Overlay it with a subtle dark green layer for readability.

Headline:

**Empowering Tomorrow's Leaders**

Supporting text:

"At Aslam School, we combine academic excellence, character development, creativity, and modern learning to prepare students for a changing world."

Buttons:

### Primary

**Explore Admissions**

→ `/admissions`

### Secondary

**Take a Virtual Tour**

Open a virtual-tour section/modal.

Include subtle entrance animations.

---

# 9. STATS SECTION

Create four statistics:

* **98%** Graduation Rate
* **15:1** Student–Teacher Ratio
* **25+** Active Clubs
* **1,200+** Students

Use animated counters when the section enters the viewport.

Make the stats easy to update from a data object.

---

# 10. WHY ASLAM SCHOOL

Heading:

**Why Choose Aslam School?**

Subtitle:

"An environment designed to develop confident, capable, and responsible young people."

Create three major cards.

### Academic Excellence

Icon: Graduation Cap

Content:

"Rigorous academic programs supported by experienced teachers and modern learning methods."

### Moral Values

Icon: Shield/Heart

Content:

"We develop integrity, responsibility, respect, discipline, and compassion alongside academic achievement."

### STEM & Arts

Icon: Flask / Palette

Content:

"Modern facilities and creative programs that encourage curiosity, innovation, experimentation, and artistic expression."

Add a subtle hover animation to each card.

---

# 11. ABOUT PREVIEW

Create a homepage section introducing the school.

Heading:

**Education Beyond the Classroom**

Include:

* Image
* Short description
* Mission statement
* CTA: "Discover Our Story"

Link:

`/about`

---

# 12. ACADEMIC PROGRAMS

Create a section with three cards.

### Primary School

Focus:

* Foundational literacy
* Numeracy
* Creativity
* Social development

CTA:

"Explore Primary"

### Junior Secondary

Focus:

* Core sciences
* Mathematics
* Languages
* Technology
* Critical thinking

CTA:

"Explore Junior Secondary"

### Senior Secondary

Focus:

* Advanced academics
* Career preparation
* STEM
* Arts
* Leadership

CTA:

"Explore Senior Secondary"

---

# 13. PARENT PORTAL FEATURE

Create a visually strong section promoting the digital parent portal.

Heading:

**Stay Connected to Your Child's Education**

Features:

* View report cards
* Monitor attendance
* View school bills
* Download receipts
* Communicate with teachers
* Receive school announcements

CTA:

**Access Parent Portal**

→ `/parent-portal`

Create a dashboard preview UI on the right side.

---

# 14. NEWS & EVENTS

Create a responsive news/event grid.

Example events:

### Open Day

"Meet our teachers, tour our facilities, and learn more about life at Aslam School."

### Inter-House Sports

"Students compete across a variety of sporting events while building teamwork and school spirit."

### Parent–Teacher Conference

"Meet with teachers to discuss student progress and development."

Each item should have:

* Date
* Category
* Title
* Description
* Image
* Read More button

Create reusable `<NewsCard />` and `<EventCard />` components.

---

# 15. TESTIMONIALS

Create a testimonial carousel.

Example testimonials should represent:

* Parent
* Alumni
* Student

Each testimonial includes:

* Avatar/photo
* Name
* Role
* Quote
* Optional graduation year

Use accessible carousel controls.

Include:

* Previous
* Next
* Pagination indicators

Do not use excessive auto-scrolling.

---

# 16. CALL TO ACTION

Create a large green CTA section.

Heading:

**Give Your Child a Stronger Foundation for Tomorrow**

Text:

"Discover an environment where academic achievement and character development grow together."

Buttons:

* Apply Now
* Contact Admissions

---

# 17. ABOUT US PAGE

Route:

`/about`

Sections:

1. Page Hero
2. Who We Are
3. Mission
4. Vision
5. Core Values
6. Principal's Message
7. Leadership Team
8. Faculty
9. Campus Life
10. CTA

---

# 18. MISSION & VISION

### Mission

"To provide a safe, inclusive, and intellectually stimulating environment where every student can develop academically, morally, socially, and creatively."

### Vision

"To raise confident, responsible, and innovative leaders who positively influence their communities and the wider world."

---

# 19. CORE VALUES

Create cards for:

* Integrity
* Excellence
* Respect
* Discipline
* Responsibility
* Compassion
* Innovation
* Leadership

---

# 20. PRINCIPAL'S MESSAGE

Create a professional principal profile section.

Include:

* Principal photo
* Name
* Position
* Message
* Signature-style name

Example:

**Dr. Ibrahim Aslam**

Principal, Aslam School

Keep the message realistic and professional.

---

# 21. LEADERSHIP & FACULTY

Create reusable profile cards.

Each profile:

* Photo
* Name
* Position
* Department
* Short biography

Example:

* Principal
* Vice Principal
* Head of Academics
* Head of Primary
* Head of Secondary
* STEM Coordinator
* Arts Coordinator
* Sports Director

Use realistic placeholder data.

---

# 22. ACADEMICS PAGE

Route:

`/academics`

Hero:

**Learning Designed for Every Stage**

Create tabs:

* Primary
* Junior Secondary
* Senior Secondary

Each tab should contain:

* Overview
* Subjects
* Learning objectives
* Teaching approach
* Assessment
* Progression information

---

# 23. SUBJECTS

Create subject grids.

Primary:

* English
* Mathematics
* Basic Science
* Social Studies
* Computer Studies
* Creative Arts
* Physical Education
* Religious/Moral Education

Junior Secondary:

* Mathematics
* English
* Basic Science
* Basic Technology
* Social Studies
* Computer Studies
* Civic Education
* Business Studies
* Creative Arts

Senior Secondary:

* Mathematics
* English
* Physics
* Chemistry
* Biology
* Economics
* Government
* Literature
* Computer Science
* Geography
* Accounting

---

# 24. EXTRACURRICULAR ACTIVITIES

Create sections for:

### Clubs

* Coding Club
* Science Club
* Debate Club
* Literary Club
* Press Club
* Entrepreneurship Club
* Art Club
* Robotics Club

### Sports

* Football
* Basketball
* Volleyball
* Athletics
* Table Tennis
* Swimming

### Creative Arts

* Music
* Drama
* Drawing
* Painting
* Public Speaking

---

# 25. ADMISSIONS PAGE

Route:

`/admissions`

Hero:

**Begin Your Aslam School Journey**

Sections:

1. Why Join Us
2. Admission Process
3. Requirements
4. Tuition & Fees
5. Application Form
6. FAQs
7. Contact Admissions

---

# 26. ADMISSION PROCESS

Create a visual step-by-step timeline.

### Step 1

Submit Application

### Step 2

Document Review

### Step 3

Entrance Assessment

### Step 4

Interview

### Step 5

Admission Decision

### Step 6

Enrollment

Use numbered steps with icons.

---

# 27. ADMISSION REQUIREMENTS

Create a checklist.

Potential requirements:

* Completed application form
* Birth certificate
* Previous school records
* Passport photographs
* Medical information where required
* Parent/guardian identification
* Entrance assessment

Clearly indicate that actual requirements may vary by grade level.

---

# 28. TUITION & FEES

Create a clean fee table.

Columns:

* Grade
* Tuition
* Registration
* Books
* Activities
* Total

Example grades:

* Primary 1–3
* Primary 4–6
* JSS 1–3
* SS 1–3

Use placeholder amounts.

Add a disclaimer:

"Displayed fees are illustrative. Contact the admissions office for the current official fee schedule."

---

# 29. ONLINE APPLICATION FORM

Create a multi-step form.

## Step 1 — Student Information

Fields:

* Student First Name
* Student Last Name
* Date of Birth
* Gender
* Grade Applying For

## Step 2 — Parent/Guardian

Fields:

* Parent/Guardian Name
* Relationship
* Phone Number
* Email Address
* Address

## Step 3 — Documents

Allow upload fields for:

* Birth Certificate
* Previous School Report
* Passport Photograph
* Other Supporting Documents

## Step 4 — Review

Show entered information before submission.

## Step 5 — Confirmation

Display:

"Application Submitted Successfully"

Generate a temporary application reference number.

Use client-side validation.

Show clear validation errors.

---

# 30. PARENT PORTAL

Route:

`/parent-portal`

Create two states:

### Logged-Out State

Display:

**Parent Portal**

"Securely access your child's academic and school information."

Login form:

* Parent ID / Username
* Password
* Remember Me
* Forgot Password
* Login

Use realistic frontend authentication simulation only unless a backend is provided.

Clearly separate authentication logic so it can later be connected to a real API.

---

# 31. PARENT DASHBOARD

Create route:

`/parent-portal/dashboard`

Dashboard layout:

### Sidebar

* Dashboard
* Children
* Academic Reports
* Attendance
* School Fees
* Messages
* Announcements
* Calendar
* Profile
* Logout

### Top Bar

* Search
* Notifications
* Parent profile

---

# 32. DASHBOARD WIDGETS

Create:

### Child Overview

Student:

**Amina Aslam**

Grade:

**JSS 2**

Attendance:

**96%**

### Academic Performance

Show subject performance.

### Attendance

Display:

* Present
* Absent
* Late

### Outstanding Fees

Display:

* Amount Due
* Due Date
* Payment Status

### Recent Announcements

Show school updates.

---

# 33. REPORT CARDS

Create a report-card interface.

Features:

* Term selector
* Academic year selector
* Student selector
* Subject results
* Teacher comments
* Principal comments
* Download button

The download button can initially simulate a download or generate a printable report layout.

---

# 34. SCHOOL FEES

Create:

* Current balance
* Payment history
* Invoice list
* Receipt list
* Payment status

Buttons:

* Pay School Fees
* View Receipt
* Download Receipt

Do not implement real payment processing without a backend/payment provider.

---

# 35. MESSAGES

Create a parent-teacher messaging UI.

Display:

* Teacher list
* Conversation preview
* Message window
* Message composer

Include realistic placeholder messages.

Structure the component so it can later connect to a real messaging API.

---

# 36. CONTACT PAGE

Route:

`/contact`

Hero:

**We're Here to Help**

Contact information:

### Address

12 Education Avenue, Lagos, Nigeria

### Phone

+234 800 000 0000

### Email

[info@aslamschool.edu](mailto:info@aslamschool.edu)

### Administrative Hours

Monday–Friday

8:00 AM – 4:00 PM

---

# 37. CONTACT FORM

Fields:

* Full Name
* Email
* Phone
* Subject
* Message

Include:

* Validation
* Loading state
* Success state
* Error state

Do not actually send emails without backend integration.

Create a clean service abstraction so an API can later be connected.

---

# 38. MAP

Create a campus location section.

Use a map placeholder if no map API key is available.

Structure the component so Google Maps or Mapbox can later be integrated.

Do not expose fake API keys.

---

# 39. SEARCH

Create a basic site search interface.

Search across:

* Pages
* News
* Events
* Academic programs

Display:

* Search results
* Categories
* Result count
* Empty state

---

# 40. ACCESSIBILITY

Follow WCAG principles.

Ensure:

* Semantic HTML
* Proper heading hierarchy
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Accessible forms
* Labels for every input
* Alt text for images
* Sufficient color contrast
* ARIA attributes where appropriate
* Screen-reader-friendly navigation

Do not rely solely on color to communicate information.

---

# 41. SEO

Every page should have:

* Unique title
* Meta description
* Open Graph metadata
* Semantic headings
* Proper URL
* Descriptive image alt text

Example:

Home title:

**Aslam School | Empowering Tomorrow's Leaders**

Admissions:

**Admissions | Aslam School**

Academics:

**Academics | Aslam School**

Contact:

**Contact Us | Aslam School**

---

# 42. ERROR & EMPTY STATES

Create reusable components for:

* Loading
* Empty data
* Form errors
* 404 page
* Network error
* Unauthorized page

Create:

`/404`

with:

**Page Not Found**

and a button:

**Return Home**

---

# 43. ANIMATION

Use subtle animations:

* Fade-in
* Slide-up
* Hover elevation
* Button transitions
* Card transitions
* Navigation transitions
* Modal transitions

Animations should respect:

`prefers-reduced-motion`

Do not make the website feel like an animation demo.

---

# 44. COMPONENT ARCHITECTURE

Create reusable components such as:

```text
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MobileMenu.tsx
│   └── AnnouncementBar.tsx
│
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Tabs.tsx
│   ├── Accordion.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Loading.tsx
│   └── EmptyState.tsx
│
├── home/
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── WhyAslam.tsx
│   ├── AboutPreview.tsx
│   ├── AcademicPrograms.tsx
│   ├── ParentPortalPreview.tsx
│   ├── NewsEvents.tsx
│   ├── Testimonials.tsx
│   └── CTASection.tsx
│
├── academics/
├── admissions/
├── parent-portal/
├── contact/
└── shared/
```

---

# 45. PAGE STRUCTURE

Create these routes:

```text
/
 /about
 /academics
 /admissions
 /parent-portal
 /parent-portal/dashboard
 /contact
 /news
 /news/:slug
 /events
 /events/:slug
 /404
```

---

# 46. DATA ARCHITECTURE

Do not hardcode repeated content directly inside JSX.

Create structured data files:

```text
data/
├── navigation.ts
├── school.ts
├── academics.ts
├── faculty.ts
├── news.ts
├── events.ts
├── testimonials.ts
├── fees.ts
└── announcements.ts
```

Components should consume these data structures.

---

# 47. TYPESCRIPT

Create proper interfaces/types.

Example:

```ts
interface FacultyMember {
  id: string
  name: string
  role: string
  department?: string
  image: string
  bio: string
}
```

Do not use `any` unless absolutely unavoidable.

---

# 48. IMAGE HANDLING

Use high-quality educational imagery.

Images should show:

* Students learning
* Teachers
* Science laboratories
* Computer labs
* Sports
* Arts
* School buildings
* Classrooms

Use appropriate responsive image sizing.

Lazy-load non-critical images.

Use descriptive alt text.

Do not allow images to cause layout shifts.

---

# 49. PERFORMANCE

Optimize for:

* Fast loading
* Minimal JavaScript
* Lazy-loaded images
* Code splitting
* Responsive images
* No unnecessary dependencies
* No layout shift
* Efficient rendering

The homepage should remain performant even with multiple sections.

---

# 50. SECURITY

Although this is initially a frontend application:

* Never store real passwords
* Never expose secrets
* Never expose API keys
* Never put sensitive credentials in source code
* Keep authentication logic isolated
* Clearly mark mock authentication
* Prepare the project for secure backend authentication

---

# 51. QA REQUIREMENTS

Before considering the project complete, test:

### Navigation

Every navigation link must work.

### Forms

Every form must:

* Validate
* Display errors
* Display loading
* Display success/error states

### Responsive

Test:

* 320px
* 375px
* 390px
* 768px
* 1024px
* 1280px
* 1440px+

### Accessibility

Check:

* Keyboard navigation
* Focus states
* Labels
* Contrast
* Screen-reader semantics

### Visual

Check for:

* Horizontal overflow
* Broken images
* Uneven spacing
* Text overflow
* Incorrect alignment
* Mobile layout problems
* Inconsistent typography

---

# 52. FINAL QUALITY STANDARD

The final website must look like a **real premium private school website**, not a coding demo.

Prioritize:

1. Excellent UX
2. Visual hierarchy
3. Responsive design
4. Accessibility
5. Performance
6. Reusable architecture
7. Maintainability
8. Realistic content
9. Professional interactions
10. Consistent branding

Do not leave major sections as empty placeholders.

Where backend functionality is unavailable, create polished frontend states and clearly structured service abstractions that can later connect to real APIs.

---

# 53. DEVELOPMENT PROCESS

Build the project incrementally.

### Phase 1

Set up:

* Vue
* TypeScript
* Vite
* Tailwind
* Router
* Global styles
* Theme
* Folder architecture

### Phase 2

Build:

* Header
* Navigation
* Footer
* Announcement bar
* Shared UI components

### Phase 3

Build homepage.

### Phase 4

Build About page.

### Phase 5

Build Academics page.

### Phase 6

Build Admissions page and application form.

### Phase 7

Build Parent Portal landing page.

### Phase 8

Build Parent Dashboard.

### Phase 9

Build Contact page.

### Phase 10

Add:

* SEO
* Accessibility
* Animations
* Error states
* Loading states
* Responsive optimization

### Phase 11

Perform a complete QA audit.

Fix all:

* TypeScript errors
* Console errors
* Broken routes
* Layout issues
* Overflow
* Accessibility problems
* Responsive problems

---

# IMPORTANT

Do not stop after generating the homepage.

The requested result is the **entire Aslam School website** with all specified pages and reusable components.

Do not generate fake backend functionality and present it as real.

If a backend is not available, use realistic mock data and clearly isolate the integration points.

Start by creating the project architecture and then implement each phase systematically.
