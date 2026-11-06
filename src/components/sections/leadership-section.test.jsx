import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HomePage from '@/components/pages/home-page'
import { buildPreviewSite } from '@/features/preview/site-preview-model'
import { validatePreview } from '@/features/preview/preview-validation'
import LeadershipSection from './leadership-section'

const officer = {
  id: 'test-officer', name: 'Test officer', role: 'Test role', description: 'A test introduction.',
  imageSrc: 'https://example.test/portrait.jpg', imageAlt: 'Test portrait description',
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('LeadershipSection', () => {
  it('labels sample profiles clearly and keeps the gathering invitation and scripture', () => {
    render(<LeadershipSection />)
    const section = screen.getByRole('region', { name: 'Meet the core officers' })
    expect(within(section).getAllByRole('article')).toHaveLength(3)
    expect(within(section).getByText(/These profiles are placeholders/)).toBeInTheDocument()
    expect(within(section).getAllByText('Portrait coming soon')).toHaveLength(3)
    expect(within(section).getAllByText('Role to be confirmed')).toHaveLength(3)
    expect(within(section).queryByRole('img')).not.toBeInTheDocument()
    expect(within(section).getByRole('link', { name: 'Explore our gatherings' })).toHaveAttribute('href', '/gathering')
    expect(within(section).getByText(/1 Timothy 4:12/)).toBeInTheDocument()
  })

  it('shows supplied names, roles, introductions and accessible portraits without hover', () => {
    render(<LeadershipSection showHeading={false} leaders={[officer]} />)
    expect(screen.queryByText('People who')).not.toBeInTheDocument()
    const card = screen.getByRole('article')
    expect(within(card).getByRole('heading', { name: officer.name })).toBeInTheDocument()
    expect(within(card).getByText(officer.role)).toBeInTheDocument()
    expect(within(card).getByText(officer.description)).toBeInTheDocument()
    expect(within(card).getByRole('img', { name: officer.imageAlt })).toHaveAttribute('src', officer.imageSrc)
  })

  it('replaces a failed portrait, logs safe context once, and loads a replacement URL', () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { rerender } = render(<LeadershipSection leaders={[officer]} />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Photo unavailable')
    expect(screen.getByRole('heading', { name: officer.name })).toBeInTheDocument()
    expect(report).toHaveBeenCalledExactlyOnceWith('Leadership portrait could not be loaded', {
      feature: 'leadership', operation: 'load-portrait', code: 'IMAGE_LOAD_FAILED',
    })
    rerender(<LeadershipSection leaders={[{ ...officer, imageSrc: 'https://example.test/replacement.jpg' }]} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.test/replacement.jpg')
    expect(screen.queryByText('Photo unavailable')).not.toBeInTheDocument()
  })

  it('renders an empty collection without restoring sample officers', () => {
    render(<LeadershipSection leaders={[]} />)
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Officer profiles are being prepared')
    expect(screen.getByRole('link', { name: 'Explore our gatherings' })).toBeInTheDocument()
  })

  it('shows loading and recoverable API errors without labeling published content as placeholders', () => {
    const retry = vi.fn()
    const { rerender } = render(<LeadershipSection status="loading" leaders={[]} showDraftNote={false} />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading officer profiles')
    expect(screen.queryByText(/These profiles are placeholders/)).not.toBeInTheDocument()
    rerender(<LeadershipSection status="error" leaders={[]} showDraftNote={false} onRetry={retry} />)
    expect(screen.getByRole('alert')).toHaveTextContent('We couldn’t load the officer profiles')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })

  it('supports portrait and role edits through the existing validated preview model', () => {
    const draft = validatePreview('leader', officer)
    expect(draft.values).toMatchObject({ role: officer.role, imageSrc: officer.imageSrc, imageAlt: officer.imageAlt })
    expect(validatePreview('leader', { ...officer, imageSrc: 'javascript:alert(1)' }).values.imageSrc).toBe('')
    const site = buildPreviewSite([{ moduleId: 'leader', recordId: '0', values: draft.values }])
    render(<HomePage sections={site.sections} />)
    expect(screen.getByRole('img', { name: officer.imageAlt })).toHaveAttribute('src', officer.imageSrc)
    expect(document.getElementById('preview-leader-0')).toHaveTextContent(officer.name)
    expect(document.getElementById('preview-leader-0')).toHaveTextContent(officer.role)
  })
})
