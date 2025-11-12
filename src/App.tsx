import { useEffect } from 'react'
import { BusinessCardHero } from './components/BusinessCardHero'
import { PaintedPortrait } from './components/PaintedPortrait'
import { Section } from './components/Section'
import { ExperienceItem } from './components/ExperienceItem'
import { ProjectCard } from './components/ProjectCard'
import { Pill } from './components/Pill'
import { TOC } from './components/TOC'
import { ThemeToggle } from './components/ThemeToggle'
import { SvgDefs } from './lib/filters'
import { generateJSONLD } from './lib/seo'
import resumeData from './content/resume.json'
import { Award, Mail } from 'lucide-react'

const scrollToContent = () => {
  const firstSection = document.getElementById('about')
  if (firstSection) {
    const offset = 80
    const elementPosition = firstSection.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

function App() {
  useEffect(() => {
    // Inject JSON-LD schema
    const schemas = generateJSONLD()
    const scriptPerson = document.createElement('script')
    scriptPerson.type = 'application/ld+json'
    scriptPerson.text = JSON.stringify(schemas.person)
    document.head.appendChild(scriptPerson)

    const scriptWebsite = document.createElement('script')
    scriptWebsite.type = 'application/ld+json'
    scriptWebsite.text = JSON.stringify(schemas.website)
    document.head.appendChild(scriptWebsite)

    return () => {
      document.head.removeChild(scriptPerson)
      document.head.removeChild(scriptWebsite)
    }
  }, [])

  const tocItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'awards', label: 'Awards' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen">
      <SvgDefs />

      {/* Header with theme toggle */}
      <header className="fixed top-0 right-0 z-50 p-4 md:p-6">
        <ThemeToggle />
      </header>

      {/* TOC */}
      <TOC items={tocItems} />

      {/* Hero with Business Card */}
      <BusinessCardHero onScrollDown={scrollToContent} />

      {/* Main Content */}
      <main>
        {/* About Section with Portrait */}
        <Section id="about" title="About" kicker="Introduction">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <PaintedPortrait src="/portrait.png" alt={`Portrait of ${resumeData.name}`} />
            </div>
            <div className="flex-1">
              <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed mb-6">
                {resumeData.about}
              </p>
              <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed mb-6">
                I'm a student athlete on the Varsity Men's Rowing Team at the University of Toronto,
                competing in the OUA Championships.
              </p>
              <div className="space-y-4">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-accent/30 pl-4">
                    <h4 className="font-serif text-fluid-lg font-semibold text-ink dark:text-ivory mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-fluid-sm text-ink/70 dark:text-ivory/70 font-sans">
                      {edu.school} • {edu.location}
                    </p>
                    <p className="text-fluid-xs text-ink/50 dark:text-ivory/50 font-sans mt-1">
                      {edu.dates}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience" kicker="Selected Roles">
          <div className="space-y-0">
            {resumeData.experience.map((exp, idx) => (
              <ExperienceItem
                key={idx}
                role={exp.role}
                org={exp.org}
                location={exp.location}
                dates={exp.dates}
                bullets={exp.bullets}
              />
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects & Writing" kicker="Selected Work">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.projects.map((project, idx) => (
              <ProjectCard key={idx} title={project.title} url={project.url} tags={project.tags} />
            ))}
          </div>
        </Section>

        {/* Research Section */}
        <Section id="research" title="Research" kicker="Academic Work">
          <div className="space-y-8">
            <div className="border-l-4 border-accent pl-6 py-4">
              <blockquote className="text-fluid-lg font-serif italic text-ink/80 dark:text-ivory/80 mb-4">
                "Policy research at the intersection of governance and ML."
              </blockquote>
              <p className="text-fluid-sm text-ink/60 dark:text-ivory/60 font-sans">
                — Decentralization Research Center, 2025
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed mb-4">
                In my latest release with the Decentralization Research Center,{' '}
                <a
                  href={resumeData.links.drc_article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 underline"
                >
                  "When One Company Owns Your Memory"
                </a>
                , I argue for a neutral, user-owned memory layer, so your context follows you, not
                the platform.
              </p>
              <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed mb-4">
                The risk isn't that assistants remember—these are actually quite useful components
                of AI. It's that one company becomes the keeper of who you are.
              </p>
              <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed">
                AI shouldn't win by keeping your memory. It should win by earning it daily. That's
                the heart of this paper: a design for safe, portable memory and a bridge from Human
                Context Protocol-style standards to products like Mem0 that users can see and
                control.
              </p>
            </div>
          </div>
        </Section>

        {/* Photo Gallery Section */}
        <Section id="gallery" title="Photography" kicker="Gallery">
          <div className="text-center space-y-6">
            <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
              Explore my photography work, including rowing practice sessions and other captures.
            </p>
            <a
              href="/gallery.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink dark:bg-ivory text-ivory dark:text-ink font-sans text-fluid-base rounded-lg hover:bg-ink/90 dark:hover:bg-ivory/90 transition-colors"
              aria-label="Open photo gallery in new tab"
            >
              View Photo Gallery
              <span className="text-fluid-xs" aria-hidden="true">
                ↗
              </span>
            </a>
            <p className="text-fluid-sm text-ink/50 dark:text-ivory/50 font-sans mt-4">
              April 2025 — Rowing Practice Photo Gallery
            </p>
          </div>
        </Section>

        {/* Awards Section */}
        <Section id="awards" title="Awards & Honors" kicker="Recognition">
          <ul className="space-y-4">
            {resumeData.awards.map((award, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 text-fluid-base text-ink/80 dark:text-ivory/80 font-sans"
              >
                <Award size={20} className="text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                <span>{award}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills" kicker="Technical Proficiencies">
          <div className="space-y-8">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-serif text-fluid-xl font-semibold text-ink dark:text-ivory mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, idx) => (
                    <Pill key={idx} label={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact" kicker="Get in Touch">
          <div className="text-center space-y-6">
            <p className="text-fluid-base text-ink/80 dark:text-ivory/80 font-sans leading-relaxed max-w-2xl mx-auto">
              Interested in collaborating or discussing AI, product design, or research? I'd love to
              hear from you.
            </p>
            <a
              href={`mailto:${resumeData.email}?subject=Hello from your portfolio`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink dark:bg-ivory text-ivory dark:text-ink font-sans text-fluid-base rounded-lg hover:bg-ink/90 dark:hover:bg-ivory/90 transition-colors"
            >
              <Mail size={20} />
              Send an Email
            </a>
            <div className="flex items-center justify-center gap-6 pt-4">
              <a
                href={resumeData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 dark:text-ivory/60 hover:text-accent dark:hover:text-accent transition-colors text-fluid-sm font-sans"
              >
                LinkedIn
              </a>
              <span className="text-ink/20 dark:text-ivory/20">•</span>
              <a
                href={resumeData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 dark:text-ivory/60 hover:text-accent dark:hover:text-accent transition-colors text-fluid-sm font-sans"
              >
                GitHub
              </a>
              <span className="text-ink/20 dark:text-ivory/20">•</span>
              <a
                href={resumeData.links.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 dark:text-ivory/60 hover:text-accent dark:hover:text-accent transition-colors text-fluid-sm font-sans"
              >
                Blog
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/10 dark:border-ivory/10 mt-24 py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-fluid-xs text-ink/50 dark:text-ivory/50 font-serif text-center md:text-left">
              © {new Date().getFullYear()} {resumeData.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#about"
                className="text-fluid-xs text-ink/50 dark:text-ivory/50 font-serif hover:text-ink dark:hover:text-ivory transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-fluid-xs text-ink/50 dark:text-ivory/50 font-serif hover:text-ink dark:hover:text-ivory transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          {/* Analytics placeholder */}
          {/* <script defer data-domain="shaanjain.com" src="https://plausible.io/js/script.js"></script> */}
        </div>
      </footer>
    </div>
  )
}

export default App
