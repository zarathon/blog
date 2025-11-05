# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static blog built with Next.js 16 that deploys to GitHub Pages. It uses markdown files for blog posts, shadcn/ui for components, and has a custom font setup with DM Mono for body text and Instrument Serif for headings.

**Key Configuration:**
- Configured for static export (`output: 'export'` in next.config.ts)
- Uses `basePath: '/blog'` for GitHub Pages deployment at zarathon.github.io/blog
- Dark mode enabled by default with localStorage persistence

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production (generates /out directory)
npm run build

# Lint code
npm run lint
```

## Architecture

### Blog Post System

Posts are stored as markdown files in `/posts` with frontmatter:

```markdown
---
title: 'Post Title'
date: '2025-11-05'
excerpt: 'Brief description'
image: 'https://example.com/image.jpg'  # Optional - displayed as circular thumbnail
---

Markdown content here...
```

**Processing flow:**
1. `lib/posts.ts` handles markdown parsing using gray-matter and remark
2. `getSortedPostsData()` - Lists all posts sorted by date (newest first)
3. `getPostData(slug)` - Fetches individual post and converts markdown to HTML
4. Posts are rendered via dynamic route: `app/posts/[slug]/page.tsx`

**Important:**
- Post slugs are derived from filenames (e.g., `primeiro-post.md` → `/posts/primeiro-post`)
- Post images are optional - if provided, displayed as 128x128px circular thumbnails in the post list
- Post titles are automatically prefixed with 📄 emoji
- Main blog title includes 🧠 emoji

### Font Configuration

Defined in `app/layout.tsx`:
- **Body text:** DM Mono (weights: 300, 400, 500)
- **Headings:** Instrument Serif (weight: 400, styles: normal, italic)

Use Tailwind classes:
- `font-sans` - Body text (default)
- `font-heading` - Headers and titles

See FONTS.md for changing fonts or adding additional weights.

### Theme System

Client-side theme toggle in `components/theme-toggle.tsx`:
- Saves preference to localStorage as "theme" key
- Applies/removes "dark" class on `<html>` element
- Dark mode is default (set in layout.tsx with `className="dark"`)

### Design System (shadcn/ui)

Configuration in `components.json`:
- Style: "new-york"
- Base color: neutral
- Components in `components/ui/`
- Uses CVA (class-variance-authority) for variants

**Adding new components:**
```bash
npx shadcn@latest add [component-name]
```

Currently installed: card, button, badge, separator

### Layout Structure

Responsive widths for different sections:
- **Header:** `max-w-full` with responsive padding (px-12 → px-20)
- **Post list:** `max-w-7xl` (1280px)
- **Individual post:** `max-w-6xl` (1152px) with extra internal padding
- **Card content:** `px-12 md:px-16 lg:px-20` for generous spacing

Typography is large and bold:
- Main title: `text-7xl md:text-8xl`
- Post card titles: `text-3xl md:text-4xl`
- Individual post titles: `text-5xl md:text-6xl`
- Markdown headings: H1=5xl, H2=4xl, H3=3xl

### Google Analytics

Optional Google Analytics 4 integration via `components/analytics.tsx`:
- Controlled by `NEXT_PUBLIC_GA_ID` environment variable
- Only loads if variable is set
- See ANALYTICS.md for setup instructions

**For production:** Set as GitHub secret or hardcode in layout.tsx

## GitHub Pages Deployment

Automated via `.github/workflows/deploy.yml`:

**Workflow triggers:**
- Push to `main` branch
- Manual trigger via workflow_dispatch

**Build process:**
1. Checkout code
2. Setup Node.js 20 with npm cache
3. `npm ci` (clean install)
4. `npm run build` (generates /out)
5. Upload /out as pages artifact
6. Deploy to GitHub Pages

**Important:** GitHub Pages source must be set to "GitHub Actions" in repo settings.

## basePath Configuration

The project uses `basePath: '/blog'` because it's deployed to github.io/blog.

**If deploying to username.github.io (no subdirectory):**
- Remove or comment out basePath in next.config.ts
- Links and assets will work at root domain

**For different subdirectory:**
- Update basePath to match (e.g., `basePath: '/my-blog'`)

## Static Export Constraints

Because this uses `output: 'export'`:
- No API routes (server-side code at runtime)
- No dynamic routes with `getStaticPaths` (use `generateStaticParams` instead)
- Images must use `unoptimized: true` (already configured)
- All pages must be statically generatable at build time

## File Organization

```
app/
├── layout.tsx          # Root layout with fonts, analytics, theme
├── page.tsx            # Homepage with post list
├── posts/[slug]/
│   └── page.tsx        # Dynamic post pages
└── globals.css         # Tailwind + theme CSS variables

components/
├── analytics.tsx       # Google Analytics wrapper
├── theme-toggle.tsx    # Dark/light mode toggle button
└── ui/                 # shadcn/ui components

lib/
├── posts.ts            # Markdown processing utilities
└── utils.ts            # cn() helper for class merging

posts/
└── *.md                # Blog post markdown files
```

## Styling Approach

Using Tailwind CSS v4 with:
- CSS variables for theming (defined in globals.css)
- `@plugin "@tailwindcss/typography"` for prose styling
- shadcn/ui neutral color scheme
- Custom font variables (--font-sans, --font-heading)

Theme colors defined in globals.css with separate :root and .dark sections using oklch color space.

## Common Tasks

**Add a new blog post:**
1. Create `posts/new-post-slug.md` with frontmatter
2. Post automatically appears on homepage
3. Accessible at `/posts/new-post-slug`

**Change site title/description:**
- Edit `app/layout.tsx` metadata export
- Edit `app/page.tsx` H1 and subtitle

**Modify homepage layout:**
- `app/page.tsx` contains header, post list, and footer
- Posts rendered with Card components from shadcn/ui

**Adjust responsive breakpoints:**
- Uses Tailwind defaults: sm (640px), md (768px), lg (1024px)
- Most responsive classes use `md:` and `lg:` variants

## Important Notes

- Post dates should be in YYYY-MM-DD format for proper sorting
- File-based routing: URL structure matches file structure
- Theme toggle appears fixed in top-right corner (fixed top-4 right-4)
- All client components must have 'use client' directive (theme-toggle, analytics)
- The `.env.local` file is gitignored; use `.env.local.example` as template
