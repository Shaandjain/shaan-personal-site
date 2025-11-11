import { useEffect, useState } from 'react'
import { useSectionObserver } from '../lib/hooks'

interface TOCItem {
  id: string
  label: string
}

interface TOCProps {
  items: TOCItem[]
  className?: string
}

export const TOC: React.FC<TOCProps> = ({ items, className = '' }) => {
  const sectionIds = items.map((item) => item.id)
  const activeSection = useSectionObserver(sectionIds)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Hide TOC on mobile
  if (isMobile) {
    return null
  }

  return (
    <nav
      className={`fixed left-8 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
      aria-label="Table of contents"
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block text-fluid-xs font-sans tracking-wide transition-colors ${
                activeSection === item.id
                  ? 'text-ink dark:text-ivory font-medium'
                  : 'text-ink/40 dark:text-ivory/40 hover:text-ink/60 dark:hover:text-ivory/60'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

