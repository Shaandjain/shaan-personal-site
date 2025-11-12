import React from 'react'
import ReactDOM from 'react-dom/client'
import { GalleryPage } from './pages/GalleryPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('gallery-root')!).render(
  <React.StrictMode>
    <GalleryPage />
  </React.StrictMode>,
)

