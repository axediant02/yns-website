// Holy Bible, New Living Translation (NLT). Text is verbatim, including
// punctuation; poetic lines are separated with "\n". Tyndale's fair-use terms
// require exact quotation, "NLT" after each quotation, and the credit line below.
// Source checked: Bible Gateway NLT, 2026-11-06.

export const SCRIPTURE_VERSION = 'NLT'

export const SCRIPTURE_CREDIT =
  'Scripture quotations are taken from the Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Ministries. Used by permission. All rights reserved.'

export const verseThemes = [
  { id: 'youth', label: 'Youth' },
  { id: 'fellowship', label: 'Fellowship' },
]

export const verses = [
  {
    id: '1-timothy-4-12',
    reference: '1 Timothy 4:12',
    theme: 'youth',
    text: 'Don’t let anyone think less of you because you are young. Be an example to all believers in what you say, in the way you live, in your love, your faith, and your purity.',
  },
  {
    id: 'hebrews-10-24-25',
    reference: 'Hebrews 10:24-25',
    theme: 'fellowship',
    text: 'Let us think of ways to motivate one another to acts of love and good works. And let us not neglect our meeting together, as some people do, but encourage one another, especially now that the day of his return is drawing near.',
  },
  {
    id: 'ecclesiastes-12-1',
    reference: 'Ecclesiastes 12:1',
    theme: 'youth',
    text: 'Don’t let the excitement of youth cause you to forget your Creator. Honor him in your youth before you grow old and say, “Life is not pleasant anymore.”',
  },
  {
    id: 'psalm-133-1',
    reference: 'Psalm 133:1',
    theme: 'fellowship',
    text: 'How wonderful and pleasant it is\nwhen brothers live together in harmony!',
  },
  {
    id: 'psalm-119-9',
    reference: 'Psalm 119:9',
    theme: 'youth',
    text: 'How can a young person stay pure?\nBy obeying your word.',
  },
  {
    id: 'acts-2-42',
    reference: 'Acts 2:42',
    theme: 'fellowship',
    text: 'All the believers devoted themselves to the apostles’ teaching, and to fellowship, and to sharing in meals (including the Lord’s Supper), and to prayer.',
  },
  {
    id: '2-timothy-2-22',
    reference: '2 Timothy 2:22',
    theme: 'youth',
    text: 'Run from anything that stimulates youthful lusts. Instead, pursue righteous living, faithfulness, love, and peace. Enjoy the companionship of those who call on the Lord with pure hearts.',
  },
  {
    id: 'ecclesiastes-4-12',
    reference: 'Ecclesiastes 4:12',
    theme: 'fellowship',
    text: 'A person standing alone can be attacked and defeated, but two can stand back-to-back and conquer. Three are even better, for a triple-braided cord is not easily broken.',
  },
  {
    id: '1-john-1-7',
    reference: '1 John 1:7',
    theme: 'fellowship',
    text: 'But if we are living in the light, as God is in the light, then we have fellowship with each other, and the blood of Jesus, his Son, cleanses us from all sin.',
  },
]

export const scriptureContent = {
  eyebrow: 'Scripture',
  title: 'Rooted in',
  accent: 'the Word.',
  description: 'Verses on youth and fellowship from the New Living Translation.',
}

export function getVerse(id) {
  const verse = verses.find((candidate) => candidate.id === id)
  if (!verse) throw new Error(`Unknown verse id: ${id}`)
  return verse
}
