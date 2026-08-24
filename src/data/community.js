export const community = {
  name: 'Youth Nation Shakers District 6',
  shortName: 'YNS D6',
  location: 'Toledo City, Cebu',
  audience: 'Everyone interested',
  gathering: {
    day: 'Every Sunday',
    time: '10:00 AM–12:00 noon',
    venue: '8 locations across Cebu',
    welcome: 'Everyone is invited.',
    firstTimeGuidance: 'Look for a friendly face, introduce yourself, and let us know it is your first Sunday. We will help you find your way.',
  },
  mission: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, sapien at feugiat aliquet, lorem ipsum dolor sit amet.',
  vision: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sem sed neque facilisis vulputate, integer posuere lorem at sapien.',
  coreValues: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Integer posuere lorem at sapien feugiat, consectetur adipiscing elit.',
    'Donec vitae sem sed neque vulputate, integer posuere sapien at feugiat.',
  ],
  contact: {
    label: 'Facebook / Messenger',
    href: null,
  },
}

const draftLocationDetails = {
  status: 'draft',
  venue: null,
  address: null,
  arrivalNotes: null,
  contact: null,
  welcomeMessage: null,
  image: null,
}

export const locations = [
  {
    ...draftLocationDetails,
    id: 'bato-toledo-city',
    name: 'Bato',
    area: 'Toledo City, Cebu',
    mapQuery: 'Bato, Toledo City, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'mainggit-toledo-city',
    name: 'Mainggit',
    area: 'Toledo City, Cebu',
    mapQuery: 'Mainggit, Toledo City, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'nangka-balamban',
    name: 'Nangka',
    area: 'Balamban, Cebu',
    mapQuery: 'Nangka, Balamban, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'bairan-asturias',
    name: 'Bairan',
    area: 'Asturias, Cebu',
    mapQuery: 'Bairan, Asturias, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'camp-3-talisay',
    name: 'Camp 3',
    area: 'Talisay, Cebu',
    mapQuery: 'Camp 3, Talisay, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'minolos-matab-ang',
    name: 'Minolos',
    area: 'Matab-ang, Toledo City, Cebu',
    mapQuery: 'Minolos, Matab-ang, Toledo City, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'ylaya-toledo-city',
    name: 'Ylaya',
    area: 'Toledo City, Cebu',
    mapQuery: 'Ylaya, Toledo City, Cebu',
  },
  {
    ...draftLocationDetails,
    id: 'pandacan-pinamungajan',
    name: 'Pandacan',
    area: 'Pinamungajan, Cebu',
    mapQuery: 'Pandacan, Pinamungajan, Cebu',
  },
]

export const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Gathering', href: '#gathering' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Stories', href: '#stories' },
  { label: 'Leadership', href: '#leadership' },
]

const galleryPhotoPool = [
  {
    id: 'kids-01',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85',
    alt: 'Smiling child outdoors in warm sunlight',
    title: 'Small moments, big joy.',
    size: 'tall',
  },
  {
    id: 'kids-02',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=85',
    alt: 'Children walking together outside',
    title: 'Growing side by side.',
    size: 'wide',
  },
  {
    id: 'kids-03',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85',
    alt: 'Child smiling while looking toward the camera',
    title: 'Room to be curious.',
    size: 'standard',
  },
  {
    id: 'kids-04',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Children spending time together indoors',
    title: 'Make space for play.',
    size: 'standard',
  },
  {
    id: 'kids-05',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=1200&q=85',
    alt: 'Child laughing with arms raised',
    title: 'Joy belongs here.',
    size: 'wide',
  },
  {
    id: 'kids-06',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85',
    alt: 'Children learning together in a bright room',
    title: 'Learn together.',
    size: 'tall',
  },
  {
    id: 'kids-07',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=85',
    alt: 'Young children smiling together',
    title: 'Friendship starts early.',
    size: 'standard',
  },
  {
    id: 'kids-08',
    category: 'kids',
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85',
    alt: 'Child enjoying a sunny outdoor moment',
    title: 'A place to belong.',
    size: 'standard',
  },
  {
    id: 'youth-01',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
    alt: 'Group of friends spending time together outdoors',
    title: 'Find your people.',
    size: 'wide',
  },
  {
    id: 'youth-02',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=85',
    alt: 'Friends laughing together outside',
    title: 'Laugh a little louder.',
    size: 'tall',
  },
  {
    id: 'youth-03',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
    alt: 'Young friends gathered together',
    title: 'Better together.',
    size: 'standard',
  },
  {
    id: 'youth-04',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85',
    alt: 'Young people talking around a table',
    title: 'Stay for the conversation.',
    size: 'standard',
  },
  {
    id: 'youth-05',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=85',
    alt: 'Group of young people having a conversation',
    title: 'Ask honest questions.',
    size: 'tall',
  },
  {
    id: 'youth-06',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    alt: 'Young people collaborating around a table',
    title: 'Bring what you have.',
    size: 'wide',
  },
  {
    id: 'youth-07',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    alt: 'Team of young adults working together',
    title: 'Grow with others.',
    size: 'standard',
  },
  {
    id: 'youth-08',
    category: 'youth',
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85',
    alt: 'Friends enjoying time together outdoors',
    title: 'Make memories here.',
    size: 'standard',
  },
]

export const galleryEvents = [
  {
    id: 'youth-camp-2026',
    label: 'Preview',
    title: 'Youth Camp 2026',
    date: null,
    locationIds: [],
    isIllustrative: true,
    description: 'A preview of the friendships, learning, and shared moments that belong in this event album.',
    photos: galleryPhotoPool.slice(0, 6),
  },
  {
    id: 'event-album-coming-soon-01',
    label: 'Coming soon',
    title: 'More moments coming soon',
    date: null,
    locationIds: [],
    isIllustrative: true,
    description: 'Verified event details and approved photos will be added here when available.',
    photos: galleryPhotoPool.slice(6, 11),
  },
  {
    id: 'event-album-coming-soon-02',
    label: 'Coming soon',
    title: 'Another album coming soon',
    date: null,
    locationIds: [],
    isIllustrative: true,
    description: 'This space is ready for another verified YNS D6 event and its shared memories.',
    photos: galleryPhotoPool.slice(11),
  },
]

function getIllustrativePreviewPhotos(startIndex) {
  return Array.from({ length: 3 }, (_, offset) => {
    const photo = galleryPhotoPool[(startIndex + offset) % galleryPhotoPool.length]

    return {
      ...photo,
      id: `illustrative-${startIndex}-${photo.id}`,
      title: 'Illustrative preview',
    }
  })
}

export const locationPhotoPreviews = locations.map((location, index) => ({
  id: `${location.id}-illustrative-preview`,
  label: 'Illustrative preview',
  title: 'Moments from here',
  date: null,
  locationIds: [location.id],
  isIllustrative: true,
  description: 'These temporary images show the intended layout and are not photos from this location.',
  photos: getIllustrativePreviewPhotos(index * 2),
}))

export const storyPlaceholders = [
  {
    title: 'Real stories from the community are on the way.',
    description:
      'We are making room for honest stories about faith, friendship, and the ways God is moving in ordinary lives.',
    accent: '01',
  },
  {
    title: 'A place to ask honest questions.',
    description:
      'YNS D6 is for people who are curious, searching, growing, and ready to take one more step with others.',
    accent: '02',
  },
]

export const leadershipPlaceholders = [
  {
    name: 'Leadership team',
    description: 'Verified names, roles, and photos will be added here when available.',
  },
  {
    name: 'Community voices',
    description: 'Meet the people helping make YNS D6 a welcoming place to belong.',
  },
]
