import { ExternalLink } from 'lucide-react'
import { Tag } from './Tag'

interface ProjectCardProps {
  title: string
  url: string
  tags: string[]
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, url, tags }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group border border-ink/10 dark:border-ivory/10 rounded-lg p-6 hover:border-accent dark:hover:border-accent transition-all hover:shadow-card"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-serif text-fluid-lg font-semibold text-ink dark:text-ivory group-hover:text-accent transition-colors">
          {title}
        </h3>
        <ExternalLink
          size={18}
          className="text-ink/40 dark:text-ivory/40 group-hover:text-accent transition-colors flex-shrink-0 ml-2"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </a>
  )
}

