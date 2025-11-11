import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ExperienceItemProps {
  role: string
  org: string
  location: string
  dates: string
  bullets: string[]
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  role,
  org,
  location,
  dates,
  bullets,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = bullets.length > 2

  return (
    <article className="border-l-2 border-ink/10 dark:border-ivory/10 pl-6 pb-8 last:pb-0">
      <div className="mb-2">
        <h3 className="font-serif text-fluid-xl font-semibold text-ink dark:text-ivory mb-1">
          {role}
        </h3>
        <p className="text-fluid-base text-ink/70 dark:text-ivory/70 font-sans">
          {org} • {location}
        </p>
        <p className="text-fluid-sm text-ink/50 dark:text-ivory/50 font-sans mt-1">
          {dates}
        </p>
      </div>

      <ul className="space-y-2 mt-4">
        {bullets.slice(0, isExpanded ? bullets.length : 2).map((bullet: string, idx: number) => (
          <li
            key={idx}
            className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed flex items-start"
          >
            <span className="text-accent mr-2">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-fluid-sm text-accent hover:text-accent/80 font-sans flex items-center gap-1 transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Show less' : 'Show more'}
          <ChevronDown
            size={16}
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </article>
  )
}

