import { StrictMode } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import SectionPage from '@/components/pages/section-page'
import { loadPublishedLeaders } from '@/api/leadership'

vi.mock('@/api/leadership', () => ({ loadPublishedLeaders: vi.fn() }))
afterEach(() => { cleanup(); vi.restoreAllMocks() })

it('loads the public Leadership tab and recovers from an API error without showing fixtures', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  loadPublishedLeaders.mockRejectedValueOnce(new Error('Network unavailable')).mockResolvedValueOnce([{
    id: 'officer', name: 'Published test officer', role: 'Published test role', description: 'Published introduction',
    imageSrc: 'https://example.test/officer.jpg', imageAlt: 'Published portrait',
  }])
  render(<StrictMode><SectionPage type="leadership" /></StrictMode>)
  expect(screen.getByRole('status')).toHaveTextContent('Loading officer profiles')
  expect(screen.queryByRole('article')).not.toBeInTheDocument()
  expect(await screen.findByRole('alert')).toHaveTextContent('We couldn’t load the officer profiles')
  expect(loadPublishedLeaders).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
  expect(await screen.findByRole('heading', { name: 'Published test officer' })).toBeInTheDocument()
  expect(screen.getByText('Published test role')).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Published portrait' })).toHaveAttribute('src', 'https://example.test/officer.jpg')
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.queryByText(/These profiles are placeholders|Core officer profile 1/)).not.toBeInTheDocument()
  expect(loadPublishedLeaders).toHaveBeenCalledTimes(2)
})
