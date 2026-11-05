/**
 * Book exercise (chapter 12.3): a simulated Source kind written against the documented `SourceKind` protocol, registered in
 * the real `SourceRegistry`, and judged by the real `settingsPolicy` inside the real `Engine`.
 */
import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { Engine, MemoryRepositories, type Candidate, type Trigger } from '../src/core/index.ts'
import { SettingsSchema, settingsPolicy } from '../src/policy.ts'
import { SourceRegistry } from '../src/sources/registry.ts'
import type { SourceKind } from '../src/sources/kind.ts'

const DemoConfig = z.object({ rooms: z.array(z.string()).default([]) }).strict()
type DemoConfig = z.infer<typeof DemoConfig>
/** A chat-like Source: it listens only to configured rooms, and never reads unaddressed messages. */
export const demoKind: SourceKind<DemoConfig> = {
  kind: 'demo',
  title: { zh: '演示', en: 'Demo' },
  description: { zh: '演示来源', en: 'A simulated chat Source for the book' },
  schema: DemoConfig,
  fields: [],
  health: ['demo'],
  scope: ({ meta }, config) => typeof meta.room === 'string' && config.rooms.includes(meta.room)
    ? { listened: true, observed: false, row: meta.room } : { listened: false, reason: 'room_not_listened' },
  policy: { schema: z.object({ allowed: z.array(z.object({ id: z.string() }).strict()).default([]) }).strict(), fields: [],
    explicit: { zh: '@ 智能体', en: 'Mentions the agent' } },
}
const message = (id: string, room: string, from: string, text: string): Trigger => ({ id, source: 'demo',
  threads: [{ source: 'demo', id: `${room}:${id}` }], actor: { source: 'demo', id: from }, human: true,
  ...text.includes('@agent') ? { addressed: 'mention' as const } : {}, at: '2026-11-01T10:00:00Z', text,
  channel: { source: 'demo', thread: `demo:${room}:${id}`, address: { room, message: id } }, meta: { room } })

describe('a simulated Source', () => {
  it('filters rooms it does not listen to, and gates its senders by its own part of the Policy', () => {
    const settings = SettingsSchema.parse({ sources: { demo: { enabled: true, config: { rooms: ['ops'] } } },
      policy: { sources: { demo: { allowed: [{ id: 'ravi' }] } } } })
    const registry = new SourceRegistry(() => settings)
    registry.register(demoKind)
    const candidates: Candidate[] = []
    const engine = new Engine({ repo: new MemoryRepositories(), scope: registry, policy: () => settingsPolicy(settings, registry),
      assessor: { request: c => { candidates.push(c) } }, executor: { start: vi.fn(), deliver: vi.fn(), stop: vi.fn() },
      outbox: { send: vi.fn(), status: () => undefined, withdraw: vi.fn() } })
    expect(engine.receive(message('1', 'random', 'ravi', '@agent fix README'))).toBe('filtered')
    expect(engine.receive(message('2', 'ops', 'ravi', '@agent fix README'))).toBe('stored')
    expect(engine.receive(message('3', 'ops', 'meera', '@agent fix README'))).toBe('stored')
    engine.evaluateDue()
    expect(candidates.map(c => [c.triggers[0]!.id, c.strength])).toEqual([['2', 'explicit']])
  })
})
