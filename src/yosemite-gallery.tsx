import React from 'react'
import ReactDOM from 'react-dom/client'
import { GalleryPage } from './pages/GalleryPage'
import './index.css'

// Bay Area & Yosemite images
const yosemiteImages = [
  '/15-DSC06976.jpg',
  '/22-DSC06918.jpg',
  '/25-DSC06963.jpg',
  '/4-DSC06167.jpg',
  '/49-DSC06682.jpg',
  '/52-DSC06845.jpg',
  '/66-DSC06810.jpg',
  '/68-DSC06636.jpg',
  '/DSC06185.jpg',
  '/DSC06189.jpg',
  '/DSC06256.jpg',
  '/DSC06562.jpg',
  '/DSC06565.jpg',
  '/DSC06570.jpg',
]

ReactDOM.createRoot(document.getElementById('yosemite-gallery-root')!).render(
  <React.StrictMode>
    <GalleryPage 
      images={yosemiteImages}
      title="2025 Summer — Bay Area & Yosemite National Park"
    />
  </React.StrictMode>,
)

