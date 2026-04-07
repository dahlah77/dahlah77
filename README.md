# DAHLAH7 Futuristic Portfolio

Premium, cinematic, data-driven React + Tailwind + Framer Motion portfolio website centered on **MUHAMMAD ROMI HIDAYAT AMD.AK (DAHLAH7)** with an original interactive robot mascot.

## 1) Folder Structure

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    ├── components
    │   ├── GalleryLightbox.tsx
    │   ├── MagneticButton.tsx
    │   ├── Navbar.tsx
    │   ├── RobotMascot.tsx
    │   └── SectionHeading.tsx
    ├── data
    │   ├── experience.ts
    │   ├── gallery.ts
    │   ├── profile.ts
    │   ├── projects.ts
    │   ├── skills.ts
    │   └── social.ts
    ├── hooks
    │   └── useReducedMotion.ts
    └── types
        └── content.ts
```

## 2) Editable Content System

All portfolio content is stored in dedicated data files:

- `src/data/profile.ts` → name, username, hero text, CTA labels, CV link, availability
- `src/data/social.ts` → contact channels + social platforms (Email, WhatsApp, Instagram, TikTok, X, Facebook, Threads, GitHub, LinkedIn, Telegram, CapCut, YouTube, Jobstreet, Fastwork)
- `src/data/skills.ts` → categorized skill groups
- `src/data/projects.ts` → full project schema (title, slug, cover image, category, short/long desc, tech, status, demo/repo, screenshots, highlights)
- `src/data/gallery.ts` → gallery image entries for masonry + lightbox
- `src/data/experience.ts` → timeline + certificates

## 3) Visual / Styling System

- Tailwind with custom premium palette (`midnight`, `cyanGlow`, `violetGlow`) in `tailwind.config.js`
- Global background gradients, grid texture, and glow ambiance in `src/styles.css`
- Reusable design patterns through componentized sections and utility classes

## 4) Animation / Interaction Logic

- Section reveal animations via Framer Motion viewport transitions
- Cinematic hero entrance animation
- Sticky nav with scroll-aware active section state
- Magnetic CTA buttons (`MagneticButton`) for premium microinteraction
- Gallery lightbox with animated modal transitions
- Scroll-reactive mascot ambient transforms

## 5) Robot Mascot Logic

`src/components/RobotMascot.tsx` includes:

- Original stylized 2.5D robot composition built from layered HTML/CSS blocks
- Cursor-reactive head movement (desktop)
- Soft animated glowing eyes and idle floating loops
- Scroll-linked motion (halo scale + vertical drift)
- Performance-safe behavior and reduced-motion fallback through `useReducedMotion`

## 6) Running Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## 7) Deployment Notes

- This is Vite + React and can be deployed to Netlify, Vercel, Cloudflare Pages, or static hosting.
- Ensure placeholder URLs are replaced before publishing.

## 8) Quick Edit Checklist

1. Update identity text in `src/data/profile.ts`.
2. Replace all placeholder social/contact links in `src/data/social.ts`.
3. Add real projects in `src/data/projects.ts`.
4. Replace gallery images in `src/data/gallery.ts`.
5. Update timeline/certificates in `src/data/experience.ts`.
6. Optionally tune glow colors in `tailwind.config.js`.

