import { PhotoGallery } from '../components/PhotoGallery'
import { ThemeToggle } from '../components/ThemeToggle'
import { SvgDefs } from '../lib/filters'

interface GalleryPageProps {
  images?: string[]
  title?: string
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ 
  images: providedImages,
  title: providedTitle 
}) => {
  // Default to rowing images if not provided
  const images = providedImages || Array.from({ length: 58 }, (_, i) => `/rowimg${i + 1}.png`)
  const title = providedTitle || 'April 2025 — Rowing Practice Photo Gallery'
  const subtitle = providedTitle 
    ? 'A collection of photographs from Bay Area and Yosemite National Park.'
    : 'A collection of photographs from rowing practice sessions.'

  return (
    <div className="min-h-screen bg-ivory dark:bg-ink">
      <SvgDefs />
      
      {/* Header with theme toggle */}
      <header className="fixed top-0 right-0 z-50 p-4 md:p-6">
        <ThemeToggle />
      </header>

      {/* Back button */}
      <div className="fixed top-0 left-0 z-50 p-4 md:p-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-ink/10 dark:bg-ivory/10 hover:bg-ink/20 dark:hover:bg-ivory/20 rounded-lg text-ink dark:text-ivory font-sans text-fluid-sm transition-colors"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Gallery Content */}
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="text-fluid-xs uppercase tracking-wider text-ink/50 dark:text-ivory/50 font-sans mb-2">
              Photography
            </p>
            <h1 className="font-serif text-fluid-4xl font-semibold text-ink dark:text-ivory mb-4 letterpress">
              {title}
            </h1>
            <p className="text-fluid-base text-ink/70 dark:text-ivory/70 font-sans">
              {subtitle}
            </p>
          </div>

          <PhotoGallery images={images} title={title} />
        </div>
      </main>
    </div>
  )
}

