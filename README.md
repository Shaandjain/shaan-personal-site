# Personal Portfolio - Shaan Jain

A production-ready personal portfolio website built with React, Vite, and TailwindCSS. Features an elegant, editorial design with smooth animations and full accessibility support.

## Features

- 🎨 **Editorial Design**: Inspired by The New Yorker / The Atlantic with elegant typography
- 🎴 **Business Card Hero**: Interactive 3D-tilt business card with letterpress emboss effect
- 🖼️ **Painted Portrait**: SVG-filtered portrait with watercolor/ink bleed aesthetic
- 🌓 **Theme Toggle**: Light/dark mode with system preference detection
- 📱 **Fully Responsive**: Mobile-first design with smooth breakpoints
- ♿ **Accessible**: WCAG AA compliant with keyboard navigation and focus states
- 🔍 **SEO Optimized**: Meta tags, Open Graph, JSON-LD schema, sitemap
- ⚡ **Performance**: Optimized build with Vite for fast loading

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **TypeScript** - Type safety
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended - One-Click Deploy)

**Option 1: Via Vercel Dashboard**
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite settings (already configured in `vercel.json`)
5. Click "Deploy" - done! 🎉

**Option 2: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

**Option 3: One-Click Deploy Button**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/personal-site)

### GitHub Pages

**Option 1: GitHub Actions (Recommended)**
1. Update `vite.config.ts` base path (only if repo name isn't `personal-site`):
   ```ts
   base: '/your-repo-name/',
   ```
2. Push to GitHub - the workflow in `.github/workflows/deploy.yml` will auto-deploy
3. Enable GitHub Pages in repo settings: Settings → Pages → Source: `gh-pages` branch

**Option 2: Manual Deploy**
1. Update `vite.config.ts` base path:
   ```ts
   base: '/your-repo-name/',
   ```
2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```

### Netlify

**Option 1: Netlify Dashboard**
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy site" - done! 🎉

**Option 2: Netlify CLI**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Option 3: Drag & Drop**
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder - instant deploy!

## Customization

### Content

All content is sourced from `/src/content/resume.json`. Edit this file to update your information.

### Portrait Image

**Important**: Add your portrait image at `/public/portrait.png`. 
- Recommended size: 800x800px, square format
- Formats: JPG or PNG
- The image will be automatically processed with SVG filters for the "painted" effect
- If the image fails to load, a CSS gradient fallback will be displayed

### Colors

Edit `tailwind.config.js` to customize the color palette:
- `ivory`: Light background color
- `ink`: Dark text color
- `accent`: Accent color (blue-gray)

### Fonts

Fonts are loaded from Google Fonts in `index.html`. To change:
1. Update the Google Fonts link
2. Update `fontFamily` in `tailwind.config.js`

## Project Structure

```
personal-site/
├── public/
│   ├── portrait.png      # Your portrait image
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       # React components
│   │   ├── BusinessCardHero.tsx
│   │   ├── PaintedPortrait.tsx
│   │   ├── Section.tsx
│   │   ├── ExperienceItem.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ...
│   ├── content/
│   │   └── resume.json   # All content data
│   ├── lib/
│   │   ├── seo.ts        # SEO utilities
│   │   ├── filters.tsx   # SVG filter definitions
│   │   └── hooks.ts      # Custom React hooks
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Analytics

To add analytics, uncomment the placeholder in `App.tsx` footer:

```tsx
{/* <script defer data-domain="shaanjain.com" src="https://plausible.io/js/script.js"></script> */}
```

Or add Google Analytics:

```tsx
{/* Google Analytics */}
{/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
```

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- `prefers-reduced-motion` support
- WCAG AA color contrast

## Performance

- Code splitting with Vite
- Optimized images (add your portrait)
- Lazy loading for sections
- Minimal JavaScript bundle

## License

MIT

## Credits

Design inspired by editorial publications and minimalist portfolio aesthetics.

