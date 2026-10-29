import { lazy, Suspense } from 'react'
import App from './App'

const PreviewPage = lazy(() => import('./features/preview/preview-page'))

export default function SiteEntry() {
  return window.location.pathname === '/cms-preview'
    ? <Suspense fallback={<p role="status">Loading preview…</p>}><PreviewPage /></Suspense>
    : <App />
}
