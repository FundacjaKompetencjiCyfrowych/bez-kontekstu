# "No Context" foundation Web Page

A showcase website presenting the foundation's activities, its mission, projects, and collaborators.

## Stack

- TypeScript
- Turborepo (monorepo)
- Next.js 15 (apps/web)
- Sanity Studio (apps/studio)
- Tailwind CSS
- Prettier

## Installation

`pnpm install`

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- **Studio**: http://localhost:3333 (Sanity CMS)
- **Frontend**: http://localhost:3000 (Next.js app)

This project follows the Git Flow branching model


## Project Structure

```
apps/
  studio/       # Sanity Studio (CMS)
  web/          # Next.js application
    app/        # App Router (pages, layouts, components)
      lib/      # Utilities
```


## Features

- **Responsive Web Design (RWD)** - Mobile-first 
- **Internationalization (i18n)** - Supports English and Polish languages
- **Content Management** - Sanity CMS for managing content
- **Modern UI** - Custom animations, smooth scrolling, and interactive components
- **SEO Optimized** - Server-side rendering with Next.js App Router
- **Scroll-triggered Animations**

## Unique Features

- **Dynamic Image Layout** - RandomRectangles component with collision detection for organic project showcase
- **Logo Morphing Animation** - GSAP-powered logo transformation that morphs on scroll
- **Real-time Preview** - Sanity Live integration for instant content updates during editing
- **Responsive Typography** - Adaptive text layouts with different versions for mobile and desktop

