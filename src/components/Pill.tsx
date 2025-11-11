interface PillProps {
  label: string
  proficiency?: 'beginner' | 'intermediate' | 'advanced'
}

export const Pill: React.FC<PillProps> = ({ label, proficiency }) => {
  const proficiencyColors = {
    beginner: 'bg-ink/5 dark:bg-ivory/5',
    intermediate: 'bg-accent/10 dark:bg-accent/20',
    advanced: 'bg-accent/20 dark:bg-accent/30',
  }

  return (
    <span
      className={`inline-block px-4 py-2 text-fluid-sm font-sans rounded-full ${
        proficiency
          ? proficiencyColors[proficiency]
          : 'bg-ink/5 dark:bg-ivory/5'
      } text-ink dark:text-ivory`}
    >
      {label}
    </span>
  )
}

