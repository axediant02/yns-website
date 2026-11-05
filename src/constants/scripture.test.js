import { describe, expect, it } from 'vitest'

import { getVerse, SCRIPTURE_CREDIT, verses, verseThemes } from './scripture'

describe('scripture constants', () => {
  it('keeps verses unique, themed, and free of source footnote markers', () => {
    const themeIds = verseThemes.map((theme) => theme.id)

    expect(new Set(verses.map((verse) => verse.id)).size).toBe(verses.length)
    expect(new Set(verses.map((verse) => verse.reference)).size).toBe(verses.length)
    for (const verse of verses) {
      expect(themeIds).toContain(verse.theme)
      expect(verse.text).not.toMatch(/\[[a-z]\]/)
    }
    for (const id of themeIds) expect(verses.some((verse) => verse.theme === id)).toBe(true)
  })

  it('carries the Tyndale NLT credit line', () => {
    expect(SCRIPTURE_CREDIT).toContain('Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Ministries')
  })

  it('fails loudly for an unknown verse id', () => {
    expect(getVerse('psalm-133-1').reference).toBe('Psalm 133:1')
    expect(() => getVerse('missing')).toThrow('Unknown verse id: missing')
  })
})
