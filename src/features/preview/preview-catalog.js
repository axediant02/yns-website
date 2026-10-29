import { community, galleryEvents, leadershipPlaceholders, locations, storyPlaceholders } from '@/data/community'
import { aboutCopy, contactCopy, gatheringCopy, heroCopy } from '@/data/section-copy'
import { previewModules } from './preview-fields'

function record(id, label, values) {
  return {
    id, label,
    values: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value ?? ''])),
  }
}
const current = (values) => [record('current', 'Current website content', values)]

const websiteRecords = {
  hero: current({ ...heroCopy, day: community.gathering.day, location: community.location }),
  about: current({
    ...aboutCopy, mission: community.mission, vision: community.vision,
    coreValues: community.coreValues.join('\n'),
  }),
  gathering: current({ ...gatheringCopy, ...community.gathering, audience: community.audience }),
  contact: current({ ...contactCopy, ...community.contact }),
  story: storyPlaceholders.map((story, index) => record(String(index), story.title, story)),
  leader: leadershipPlaceholders.map((leader, index) => record(String(index), leader.name, leader)),
  location: locations.map((location) => record(location.id, `${location.name}, ${location.area}`, {
    locationId: location.id, name: location.name, area: location.area, mapQuery: location.mapQuery,
    venue: location.venue, address: location.address, welcomeMessage: location.welcomeMessage,
    arrivalNotes: location.arrivalNotes, contactHref: location.contact?.href,
    imageSrc: location.image?.src, imageAlt: location.image?.alt,
  })),
  album: galleryEvents.map((album) => record(album.id, album.title, {
    title: album.title, label: album.label, description: album.description,
    photos: JSON.stringify(album.photos),
  })),
  event: [],
}

export const previewCatalog = previewModules.map((module) => ({
  ...module, records: websiteRecords[module.id],
}))
