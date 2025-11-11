import resumeData from '../content/resume.json'

export const generateJSONLD = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resumeData.name,
    jobTitle: resumeData.tagline,
    email: resumeData.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: resumeData.location,
    },
    sameAs: [
      resumeData.links.linkedin,
      resumeData.links.github,
      resumeData.links.blog,
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${resumeData.name} - Portfolio`,
    url: 'https://shaanjain.com',
    description: resumeData.about,
  }

  return {
    person: personSchema,
    website: websiteSchema,
  }
}

export const getMetaTags = () => {
  return {
    title: `${resumeData.name} - ${resumeData.tagline}`,
    description: resumeData.about,
    url: 'https://shaanjain.com',
    image: 'https://shaanjain.com/og-image.jpg',
  }
}

