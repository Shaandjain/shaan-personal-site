import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  title: string
  kicker?: string
  children: ReactNode
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  kicker,
  children,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Kicker */}
        {kicker && (
          <p className="text-fluid-xs uppercase tracking-wider text-ink/50 dark:text-ivory/50 font-sans mb-2">
            {kicker}
          </p>
        )}

        {/* Heading with rule */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="font-serif text-fluid-3xl font-semibold tracking-tight text-ink dark:text-ivory">
            {title}
          </h2>
          <div className="flex-1 h-px bg-ink/20 dark:bg-ivory/20" />
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">{children}</div>
      </motion.div>
    </section>
  )
}

