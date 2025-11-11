import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/hooks'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-ink/60 dark:text-ivory/60 hover:text-ink dark:hover:text-ivory hover:bg-ink/5 dark:hover:bg-ivory/5 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

