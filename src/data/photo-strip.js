import { galleryEvents } from '@/data/community'

// Temporary illustrative stock images, explicitly requested for this layout.
// These do not represent YNS members or events.
export const photoStripPhotos = galleryEvents
  .flatMap((album) => album.photos)
  .filter((photo) => photo.category === 'youth')
  .slice(0, 6)
  .map((photo) => ({
    id: photo.id,
    src: photo.src.replace('w=1200&q=85', 'w=800&q=75'),
    alt: `Illustrative placeholder: ${photo.alt}`,
  }))

export const photoStripContent = {
  eyebrow: 'In the frame',
  title: 'A glimpse of',
  accent: 'life together.',
  description: 'There is room for conversations, shared laughter, and moments worth remembering.',
  placeholderNote: 'Temporary stock photos for this preview — these are not photos of YNS members or events.',
  listLabel: 'Illustrative community photo placeholders',
  unavailable: 'Photo unavailable',
  empty: 'Photos will be added here soon.',
}
