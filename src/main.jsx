import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SiteEntry from './site-entry'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteEntry />
  </StrictMode>,
)
