const text = (key, label, required = false) => ({ key, label, type: 'text', required })
const long = (key, label) => ({ key, label, type: 'textarea' })
const link = (key, label) => ({ key, label, type: 'link' })
const heading = [text('heading', 'Heading', true), text('emphasis', 'Emphasized line'), long('description', 'Introduction')]

export const previewModules = [
  {
    id: 'hero', label: 'Hero', mode: 'singleton', notice: '',
    fields: [
      text('badge', 'Eyebrow'), ...heading,
      text('primaryLabel', 'Primary button label'), link('primaryHref', 'Primary button destination'),
      text('secondaryLabel', 'Secondary link label'), link('secondaryHref', 'Secondary link destination'),
      text('day', 'Gathering day'), text('location', 'Location summary'),
    ],
  },
  {
    id: 'about', label: 'About', mode: 'singleton',
    notice: 'Mission, vision, and values currently contain placeholder text and require verification.',
    fields: [
      ...heading,
      text('pillarOneTitle', 'First pillar title'), long('pillarOneBody', 'First pillar text'),
      text('pillarTwoTitle', 'Second pillar title'), long('pillarTwoBody', 'Second pillar text'),
      long('mission', 'Mission'), long('vision', 'Vision'), long('coreValues', 'Core values (one per line)'),
    ],
  },
  {
    id: 'gathering', label: 'Weekly gathering', mode: 'singleton',
    notice: 'Confirm the schedule, venues, and approximate map information before publishing.',
    fields: [
      ...heading, text('day', 'Day'), text('time', 'Time'), text('venue', 'Venue summary'),
      text('audience', 'Who can attend'), text('welcome', 'Welcome message'),
      long('firstTimeGuidance', 'First-time visitor guidance'),
    ],
  },
  {
    id: 'contact', label: 'Contact', mode: 'singleton',
    notice: 'The official contact destination is not verified yet.',
    fields: [...heading, text('label', 'Contact button label'), link('href', 'Contact destination')],
  },
  {
    id: 'story', label: 'Stories', mode: 'collection',
    notice: 'These are placeholder stories. Verify attribution and consent before publication.',
    fields: [text('title', 'Title', true), long('description', 'Story text'), text('accent', 'Card number')],
  },
  {
    id: 'leader', label: 'Leadership', mode: 'collection',
    notice: 'Current leadership cards are placeholders. Names, roles, and consent require verification.',
    fields: [text('name', 'Name', true), long('description', 'Role and biography')],
  },
  {
    id: 'location', label: 'Locations', mode: 'collection',
    notice: 'Locations contain draft details and approximate maps. Confirm venue information and media rights.',
    fields: [
      text('name', 'Location name', true), text('area', 'Area', true), text('mapQuery', 'Map search'),
      text('venue', 'Venue'), text('address', 'Address'), long('welcomeMessage', 'Welcome message'),
      long('arrivalNotes', 'Arrival notes'), link('contactHref', 'Local contact destination'),
      { key: 'imageSrc', label: 'Photo URL', type: 'image' }, text('imageAlt', 'Photo description'),
    ],
  },
  {
    id: 'album', label: 'Photo albums', mode: 'collection',
    notice: 'Existing albums contain illustrative photos, not approved community media. Uploads are not available; image URLs are preview-only.',
    fields: [
      text('title', 'Album title', true), text('label', 'Album label'), long('description', 'Album description'),
      { key: 'photos', label: 'Photos', type: 'photos' },
    ],
  },
  {
    id: 'event', label: 'Events', mode: 'collection',
    notice: 'No verified event records exist yet. Dates use Asia/Manila. This previews the website event template.',
    fields: [
      text('title', 'Event title', true), long('description', 'Description'),
      { key: 'startsAt', label: 'Starts at (Philippine time)', type: 'datetime-local' },
      { key: 'endsAt', label: 'Ends at (Philippine time)', type: 'datetime-local' },
      text('location', 'Venue or location'),
    ],
  },
]
