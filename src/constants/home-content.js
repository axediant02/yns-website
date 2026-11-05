// Static interface copy for the home page. Community facts (schedule, locations,
// contact) stay in `@/data/community`; placeholders are labeled where rendered.

export const heroContent = {
  eyebrow: 'A community in Toledo City',
  titleLines: ['Find your people.', 'Follow Jesus.'],
  description: 'YNS D6 is a growing community for everyone interested in discovering what it looks like to follow Jesus together.',
  primaryAction: { label: 'Join us this Sunday', href: '#gathering' },
  secondaryAction: { label: 'Get to know us', href: '#about' },
}

export const aboutContent = {
  eyebrow: 'About',
  title: 'There is room',
  accent: 'for you here.',
  statement: 'You do not need to have everything figured out before you show up. YNS D6 is a place to ask honest questions, meet people, and take the next step together.',
  pillars: [
    {
      icon: 'heart',
      title: 'Come as you are',
      description: 'Everyone interested is welcome. Start with a conversation, a Sunday, or simply a question.',
    },
    {
      icon: 'sparkles',
      title: 'Grow with others',
      description: 'Faith is not a solo project. We are learning to follow Jesus with courage, honesty, and joy.',
    },
  ],
  draftNote: 'Mission, vision, and core values are placeholder text until the approved wording is supplied.',
}

export const gatheringContent = {
  eyebrow: 'Gathering',
  title: 'Start with',
  accent: 'Sunday.',
  description: 'Come for the gathering. Stay for the people, the questions, and the possibility of a life shaped by Jesus.',
  reassurance: 'Not sure what to expect? That is okay.',
  locationsTitle: 'Gather with us near you.',
  locationsNote: 'Map previews are approximate and will be updated with verified venue details.',
}

export const galleryContent = {
  eyebrow: 'Gallery',
  title: 'Room for',
  accent: 'the moments.',
  description: 'Browse the welcome, worship, and ordinary in-between moments that make each YNS D6 event feel like home.',
  draftNote: 'Albums currently use illustrative stock photos. Approved YNS D6 photos will replace them.',
}

export const storiesContent = {
  eyebrow: 'Stories',
  title: 'Every story',
  accent: 'starts somewhere.',
  description: 'The best way to understand YNS D6 is to hear from the people who are finding their way through faith, friendship, and everyday life.',
}

export const leadershipContent = {
  eyebrow: 'Leadership',
  title: 'People who',
  accent: 'make space.',
  description: 'YNS D6 is shaped by people who care about making a welcoming place to meet Jesus and one another. Leadership details will be added as they are confirmed.',
}

export const contactContent = {
  eyebrow: 'Contact',
  title: 'Questions are',
  accent: 'welcome here.',
  description: 'Want to know more before Sunday? Need directions when the venue is confirmed? We would love to hear from you.',
  pendingStatus: 'Contact link will be added soon.',
}
