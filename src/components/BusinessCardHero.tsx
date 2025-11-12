import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, ExternalLink, ChevronDown } from 'lucide-react'
import resumeData from '../content/resume.json'

interface BusinessCardHeroProps {
  onScrollDown: () => void
}

interface TiltState {
  x: number
  y: number
}

export const BusinessCardHero: React.FC<BusinessCardHeroProps> = ({ onScrollDown }) => {
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    
    setTilt({
      x: Math.max(-6, Math.min(6, y * 6)),
      y: Math.max(-6, Math.min(6, x * -6)),
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Ocean waves background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/og-image.jpg)',
        }}
      />
      
      {/* Gradient fade from ocean to dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink dark:via-ink/60 dark:to-ink" />
      
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-ink/20 dark:bg-ink/40" />

      <motion.div
        ref={cardRef}
        className="relative z-10 w-full max-w-md"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Business Card */}
        <div className="bg-ivory dark:bg-[#1a1a1c] border border-ink/10 dark:border-ivory/20 rounded-lg p-8 md:p-12 shadow-letterpress paper-grain relative overflow-hidden">
          {/* Gleam effect on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Name with letterpress effect */}
            <h1 className="font-serif text-fluid-4xl font-semibold tracking-tighter text-ink dark:text-ivory letterpress mb-2">
              {resumeData.name}
            </h1>

            {/* Tagline */}
            <p className="text-fluid-sm text-ink/70 dark:text-ivory/70 font-sans tracking-wide mb-6">
              {resumeData.tagline}
            </p>

            {/* Location */}
            <p className="text-fluid-xs text-ink/60 dark:text-ivory/60 font-sans mb-8">
              {resumeData.location}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              <a
                href={resumeData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 dark:text-ivory/60 hover:text-accent dark:hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={resumeData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 dark:text-ivory/60 hover:text-accent dark:hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={resumeData.links.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 dark:text-ivory/60 hover:text-accent dark:hover:text-accent transition-colors"
                aria-label="Blog"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={onScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink/40 dark:text-ivory/40 hover:text-ink dark:hover:text-ivory transition-colors"
          aria-label="Scroll to content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <ChevronDown size={24} className="animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  )
}

