import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface PhotoGalleryProps {
  images: string[]
  title: string
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return

    if (direction === 'next') {
      setSelectedImage((selectedImage + 1) % images.length)
    } else {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {images.map((src, index) => (
          <motion.div
            key={src}
            className="relative aspect-square overflow-hidden rounded-lg bg-ink/5 dark:bg-ivory/5 cursor-pointer group"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: loadedImages.has(index) ? 1 : 0,
                    scale: loadedImages.has(index) ? 1 : 0.9,
                  }
            }
            transition={{ delay: index * 0.02, duration: 0.3 }}
            onClick={() => openLightbox(index)}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          >
            <img
              src={src}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onLoad={() => handleImageLoad(index)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 dark:group-hover:bg-ink/20 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ink/95 dark:bg-ink/98 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            />

            {/* Lightbox Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="relative max-w-7xl max-h-[90vh] w-full"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 p-2 rounded-lg bg-ivory/10 dark:bg-ink/20 text-ivory dark:text-ivory hover:bg-ivory/20 dark:hover:bg-ink/30 transition-colors z-10"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-ivory/10 dark:bg-ink/20 text-ivory dark:text-ivory hover:bg-ivory/20 dark:hover:bg-ink/30 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-ivory/10 dark:bg-ink/20 text-ivory dark:text-ivory hover:bg-ivory/20 dark:hover:bg-ink/30 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={`${title} - Image ${selectedImage + 1}`}
                    className="max-w-full max-h-[90vh] mx-auto object-contain rounded-lg"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Image Counter */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-ivory/80 dark:text-ivory/80 font-sans text-fluid-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

