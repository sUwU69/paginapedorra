# Design Guidelines: Trabajo + Estudio | Otto Krause

## Design Approach

**Reference-Based Institutional Design** inspired by argentina.gob.ar, adapted for youth engagement. The design balances governmental credibility with student-friendly accessibility, creating trust while remaining approachable for 16-18 year old technical students.

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- **Institutional Blue (Dark):** 215 65% 25% - Navigation, headers, primary buttons
- **Argentina Blue (Light):** 215 80% 50% - Accents, interactive elements, links
- **Otto Krause Identity:** 200 70% 45% - Secondary brand color for school identity

**Neutral Foundation:**
- **Background White:** 0 0% 100% - Main background
- **Soft Gray:** 220 10% 96% - Section backgrounds, cards
- **Medium Gray:** 220 8% 65% - Secondary text, borders
- **Dark Text:** 220 15% 20% - Primary text

**Semantic Colors:**
- **Success Green:** 140 60% 45% - CV submitted, application confirmed
- **Warning Amber:** 35 90% 55% - Important notices, deadlines
- **Info Blue:** 210 75% 55% - Tips, informational callouts

### B. Typography

**Font Families (via Google Fonts CDN):**
- **Primary:** 'Open Sans' - Clean, highly legible for body text and interface
- **Headings:** 'Encode Sans' - Strong, institutional presence for titles

**Type Scale:**
- Hero Headline: text-5xl md:text-6xl font-bold (Encode Sans)
- Section Titles: text-3xl md:text-4xl font-semibold
- Card Headers: text-xl font-semibold
- Body Text: text-base leading-relaxed
- Small Text/Labels: text-sm
- Buttons/CTAs: text-base font-medium

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 md:py-20 lg:py-24
- Grid gaps: gap-6 md:gap-8
- Container max-width: max-w-7xl

**Grid Structure:**
- Desktop: 3-column feature grids, 2-column content splits
- Tablet: 2-column maximum
- Mobile: Single column stack

### D. Component Library

**Navigation:**
- Clean horizontal navbar with logo left, links right
- Mobile: Hamburger menu with full-screen overlay
- Sticky header with subtle shadow on scroll
- Active state: underline accent in Argentina Blue

**Search & Filters:**
- Prominent centered search bar (like argentina.gob.ar's "Te puede interesar")
- Dropdown filters for Rubro, Jornada, Ubicación
- Search button in Institutional Blue with white text

**Job Cards:**
- White cards with soft shadow (shadow-md)
- Company logo or placeholder icon top-left
- Job title in Encode Sans semibold
- Tags for: specialization, job type, location
- "Ver detalles" button in outlined style
- Hover: subtle lift (translate-y-1) and increased shadow

**Forms (CV Upload, Contact):**
- Full-width inputs with gray borders
- Focus state: Argentina Blue border
- File upload with drag-and-drop visual indicator
- Clear labels above inputs
- Submit buttons: full Institutional Blue background

**Information Blocks (Derechos Laborales):**
- Accordion-style sections with expand/collapse
- Icon left, title center-left, chevron right
- Expanded content with bullet points and clear formatting
- Soft gray backgrounds for expanded sections

**Testimonial Cards:**
- Student photo (circular) with quote
- Name, specialization, graduation year
- Background in Soft Gray
- 2-column on desktop, single on mobile

**Footer:**
- Dark Institutional Blue background
- 3-column layout: School info, Quick links, Contact
- Copyright notice centered at bottom
- Social media icons if applicable
- White text with reduced opacity for secondary info

### E. Imagery

**Hero Section:**
- Large hero image showing diverse technical students in workshop/lab settings
- Overlay with semi-transparent Institutional Blue (opacity-30)
- White text overlaid for headline and search bar
- Image height: 70vh on desktop, 50vh on mobile

**Supporting Images:**
- Job category icons: Use Font Awesome icons for programming, networks, design, etc.
- Testimonial photos: Circular cropped student headshots
- Rights section: Illustrative icons for each labor right
- Otto Krause logo: Prominent in header

**Image Treatment:**
- Subtle grayscale filter on background images for text legibility
- Maintain authentic, relatable imagery of real students (avoid stock photo feel)
- Use school colors as accent overlays where appropriate

---

## Page-Specific Layouts

**Homepage:**
- Hero with search (70vh) + category quick links below
- "Ofertas Destacadas" - 3-column job card grid
- "Cómo Funciona" - 3-step process with icons
- Testimonials carousel - 2 visible cards
- CTA section for CV upload

**Ofertas de Empleo:**
- Filter sidebar (desktop) / collapsible (mobile)
- Job listing grid with pagination
- Each card shows: company, position, tags, apply button

**Subí tu CV:**
- 2-column: Form left (60%), Guidelines right (40%)
- Clear step indicators
- File upload with preview
- Success confirmation modal

**Derechos Laborales:**
- Hero with illustration
- Accordion sections for: Pasantías, Prácticas Profesionalizantes, Trabajo en Blanco
- Downloadable PDF resources
- Contact for legal questions

**Rubros/Áreas:**
- Grid of specialization cards (Programming, Networks, Support, Design, etc.)
- Each card: icon, title, description, "Ver empleos" link
- Color-coded by area (subtle tints of Otto Krause blue)

---

## Responsive Behavior

- **Desktop (lg:):** Full multi-column layouts, sidebar filters, expanded navigation
- **Tablet (md:):** 2-column grids, condensed spacing, collapsible filters
- **Mobile (base):** Single column, hamburger menu, touch-optimized buttons (min h-12), stacked forms

---

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Focus indicators: 2px Argentina Blue outline
- Keyboard navigation fully supported
- **Dark mode NOT implemented** - institutional sites maintain light theme for consistency and accessibility
- Alt text for all images
- Semantic HTML (proper heading hierarchy, form labels)

---

## Key Design Principles

1. **Institutional Trust:** Use government-style visual language to convey reliability
2. **Youth Accessibility:** Keep interface simple, clear, and motivating for 16-18 year olds
3. **Content Hierarchy:** Important actions (search, apply, upload CV) prominently featured
4. **Responsive Excellence:** Seamless experience across all devices
5. **School Pride:** Integrate Otto Krause identity subtly throughout