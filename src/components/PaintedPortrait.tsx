import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface PaintedPortraitProps {
  src: string
  alt: string
  className?: string
}

export const PaintedPortrait: React.FC<PaintedPortraitProps> = ({ src, alt, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Fallback if image fails to load
  const handleImageError = () => {
    setHasError(true)
  }

  if (hasError) {
    // Pure CSS fallback - gradient circle
    return (
      <div
        ref={containerRef}
        className={`w-64 h-64 rounded-full bg-gradient-to-br from-accent/20 to-ink/10 dark:from-accent/30 dark:to-ivory/10 ${className}`}
        aria-label={alt}
      />
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden bg-ivory dark:bg-ink/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Portrait image with theme-aware filters - sharp rendering */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover portrait-image"
          style={{
            filter: 'url(#paintedPortrait)',
            transition: 'opacity 1.2s ease-out, filter 0.3s ease',
            imageRendering: 'crisp-edges' as const,
          }}
          onError={handleImageError}
          loading="eager"
        />

        {/* Theme-aware overlay for better integration */}
        <div
          className="absolute inset-0 pointer-events-none portrait-overlay"
          style={{
            background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.05) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Dark mode overlay */}
        <div
          className="absolute inset-0 pointer-events-none dark:portrait-overlay-dark"
          style={{
            background:
              'radial-gradient(circle at center, transparent 50%, rgba(255,255,255,0.03) 100%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Very subtle grain overlay - theme aware */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  )
}
