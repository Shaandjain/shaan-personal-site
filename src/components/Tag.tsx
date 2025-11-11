interface TagProps {
  label: string
}

export const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className="inline-block px-3 py-1 text-fluid-xs font-sans bg-ink/5 dark:bg-ivory/5 text-ink/70 dark:text-ivory/70 rounded-full">
      {label}
    </span>
  )
}

