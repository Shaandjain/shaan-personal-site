import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const svgPath = join(__dirname, '../public/og-image.svg')
const pngPath = join(__dirname, '../public/og-image.png')

try {
  const svgContent = readFileSync(svgPath, 'utf-8')
  
  // Create HTML to render the SVG
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>
  `
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  
  await page.screenshot({
    path: pngPath,
    width: 1200,
    height: 630,
    type: 'png'
  })
  
  await browser.close()
  
  console.log('✅ Open Graph PNG image generated successfully at:', pngPath)
} catch (error) {
  console.error('❌ Error generating PNG:', error)
  process.exit(1)
}
