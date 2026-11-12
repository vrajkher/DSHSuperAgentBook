import { expect, it } from 'vitest'
import { commentTrigger, mentions } from '../src/sources/github-trigger.ts'

const comment = (body: string) => commentTrigger({ id: 1, body, user: { login: 'alice', type: 'User' }, created_at: '2026-11-01T09:00:00Z' },
  { number: 7, isPr: false }, 'conversation', 'widgets-agent')

it('counts a mention the author writes, and not one the author only quotes or puts in code', () => {
  expect(mentions('@widgets-agent fix the README', 'widgets-agent')).toBe(true)
  expect(mentions('> @widgets-agent fix the README\n\nThanks, looks good', 'widgets-agent')).toBe(false)
  expect(mentions('Run `@widgets-agent help` to see usage', 'widgets-agent')).toBe(false)
  expect(mentions('```\n@widgets-agent\n```\nexample above', 'widgets-agent')).toBe(false)
  expect(mentions('> earlier text\n@widgets-agent please also run lint', 'widgets-agent')).toBe(true)
  expect(comment('> @widgets-agent fix the README\n\nThanks!')).not.toHaveProperty('addressed')
  expect(comment('@widgets-agent fix the README')).toMatchObject({ addressed: 'mention' })
})
