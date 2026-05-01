# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.


## Project Overview

**Jobly** is an AI-powered resume editor built with Next.js 15. It allows users to create, edit, and export professional resumes with real-time preview, multiple templates, AI assistance, and offline-first capabilities using local storage.

## Core Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 19, HeroUI, Radix UI, Tailwind CSS
- **State**: Zustand + localStorage (no backend database)
- **Rich Editor**: Tiptap with extensions (links, colors, text-align, etc.)
- **PDF Export**: html2pdf.js, html2canvas, Puppeteer
- **Animations**: Framer Motion
- **Icons**: Lucide React, Remixicon
- **AI**: Google Generative AI (@google/generative-ai), OpenRouter API
- **Internationalization**: next-intl

## Project Structure

```
src/
├── app/                           # Next.js 15 App Router
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout with locale/providers
│   ├── providers.tsx              # Client providers (themes, analytics)
│   ├── dashboard/                 # Resume management dashboard
│   │   ├── layout.tsx            # Sidebar layout
│   │   ├── page.tsx              # Dashboard home
│   │   └── resumes/              # Resume list & management
│   ├── workbench/                # Main resume editor
│   │   └── layout.tsx            # Editor workspace
│   └── api/                       # Backend API routes
│       ├── grammar/route.ts       # Grammar check API
│       ├── polish/route.ts        # Text polish API
│       └── proxy/image/route.ts   # Image proxy for external images
├── components/
│   ├── templates/                 # Resume template components
│   │   ├── index.tsx             # Template registry & context
│   │   ├── classic/              # Classic template
│   │   ├── creative/             # Creative template
│   │   ├── editorial/            # Editorial template
│   │   ├── elegant/              # Elegant template
│   │   └── left-right/           # Left-right layout template
│   ├── editor/                    # Resume editor UI components
│   │   ├── EditPanel.tsx         # Main editor form
│   │   ├── Field.tsx             # Generic field component
│   │   ├── SidePanel.tsx         # Sidebar editor
│   │   └── [sections]/           # Section-specific editors
│   ├── preview/                   # Resume preview components
│   │   └── index.tsx             # Preview viewer
│   ├── home/                      # Landing page components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── ...
│   ├── shared/                    # Reusable components
│   │   ├── PdfExport.tsx         # PDF export logic
│   │   ├── ThemeToggle.tsx       # Dark mode toggle
│   │   ├── UpdateLocale.tsx      # Language selector
│   │   └── ...
│   └── ui/                        # Shadcn-style base components
├── types/
│   ├── resume.ts                  # Resume data structures
│   ├── template.ts                # Template configuration types
│   └── global.d.ts               # Global type definitions
├── lib/
│   ├── navigation.ts              # i18n navigation helpers
│   ├── utils.ts                   # Utility functions
│   ├── richText.ts               # Tiptap editor utilities
│   ├── templatePreview.ts        # Template preview helpers
│   └── ...
├── i18n/                          # Internationalization setup
├── styles/                        # Global styles, Tiptap overrides
└── public/                        # Static assets
```

## Key Architectural Concepts

### State Management & Data Flow

- **Resume State**: Managed with Zustand, persisted to localStorage
- **Template Context**: `TemplateContext.tsx` provides active template to resume preview
- **Auto-save**: Changes are automatically saved to localStorage
- **No Backend DB**: All resume data lives in browser; export to PDF for persistence

### Template System

- Templates are React components in `/components/templates/{template-name}/`
- Each template has:
  - `index.tsx` - Main template component
  - `config.ts` - Template metadata and default styles
  - `sections/` - Section-specific rendering components
- Registry in `templates/registry.ts` maps template IDs to components
- Templates receive resume data via props and use `TemplateContext`

### Editor Architecture

- **EditPanel.tsx**: Main editor container with tabs for different sections
- **Section Editors**: Dedicated editors for Basic Info, Experience, Education, etc.
- **Field.tsx**: Generic field component for text inputs, dates, editors
- **Rich Text**: Tiptap-based editor for job descriptions and custom content

### PDF Export Pipeline

1. Capture resume DOM (html2canvas)
2. Convert to PDF (html2pdf.js or Puppeteer on server)
3. Include images via data URIs or proxy
4. Download or email the PDF

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start

# Lint code
pnpm lint

# Generate template screenshot previews
pnpm generate:template-snapshots

# Install Playwright for screenshot generation
pnpm install:playwright

# Release/version bump
pnpm release
```

## Common Development Tasks

### Adding a New Resume Section

1. Create section editor in `src/components/editor/{section}/`
2. Add section type to `src/types/resume.ts`
3. Create section component in each template: `src/components/templates/{template}/sections/{Section}.tsx`
4. Update section registry if applicable
5. Add editor tab in `EditPanel.tsx`

### Adding a New Template

1. Create directory: `src/components/templates/{template-name}/`
2. Create `index.tsx` with main template component
3. Create `config.ts` with template metadata
4. Create `sections/` subdirectory with section renderers
5. Register in `templates/registry.ts`
6. Add template cover image to `src/assets/images/template-cover/`

### Modifying the Editor

- Editor panels are in `/components/editor/`
- Rich text editing uses Tiptap (see `components/shared/rich-editor/RichEditor.tsx`)
- Form state is managed by Zustand stores or React hooks

### Adding API Endpoints

- API routes live in `/src/app/api/`
- Use Next.js Route Handlers (`route.ts` files)
- Current endpoints: `/api/grammar`, `/api/polish`, `/api/proxy/image`

## Important Patterns & Conventions

### Component Organization

- **Client Components** use `"use client"` directive (most editor/dashboard components)
- **Server Components** handle layout/metadata (default for pages)
- **UI Components** in `/components/ui/` are Radix UI + Tailwind wrappers

### Styling

- Tailwind CSS for component styling
- SCSS for complex styling (e.g., Tiptap editor in `/styles/tiptap.scss`)
- CSS Modules not used; prefer Tailwind classes

### Internationalization

- Uses `next-intl` for multi-language support
- Locale set via URL segment: `/[locale]/app/dashboard`
- Translations stored in message files (likely in `/src/i18n/messages/`)
- Use `useTranslations()` hook to access locale strings in client components

### Type System

- Resume data interface is in `types/resume.ts`
- Template configuration types in `types/template.ts`
- Path aliases: `@/*` maps to `src/*`

## Resume Data Structure (Key Types)

```typescript
// See src/types/resume.ts for full definitions
interface BasicInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  photoConfig: PhotoConfig;
  customFields: CustomFieldType[];
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  major: string;
  graduationDate: string;
}
// ... additional types for projects, skills, certificates, etc.
```

## Testing & Quality

- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- Type checking on build
- No automated tests currently (manual testing only)

## Performance Considerations

- Framer Motion for smooth animations (client-side only)
- Lazy loading for template previews
- Image optimization via Next.js Image component
- Local storage for instant data persistence

## Common Issues & Solutions

### Template Not Rendering

- Check `templates/registry.ts` - template must be registered
- Verify component imports in main template file
- Check `TemplateContext` is properly consumed

### Resume Data Not Persisting

- Verify Zustand store is properly configured
- Check browser localStorage is enabled
- Ensure JSON serialization of complex objects

### PDF Export Failures

- Check image sources are accessible (use proxy if needed)
- Verify Puppeteer/chromium dependencies installed
- Check heap size if handling large images

### i18n Translation Missing

- Verify message keys exist in locale files
- Check `useTranslations()` hook is imported from `@/i18n/compat/client`
- Verify component is wrapped in `NextIntlClientProvider`

## Deployment Notes

- Optimized for Vercel deployment
- Environment variables: Configure API keys for AI services (Google, OpenRouter)
- Build output: Serverless functions for API routes, static for pages
- File size: Large PDF libraries included, ensure Vercel's limits are met
