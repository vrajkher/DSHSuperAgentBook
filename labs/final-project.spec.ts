/** Book chapter 14, part A: a ticket that opened a PR ends only when the PR merges, not on its ready report. */
import { expect, it, vi } from 'vitest'
import { Engine, MemoryRepositories, latestAssignment, ticketStage, type Candidate } from '../src/core/index.ts'
import { SettingsSchema, settingsPolicy } from '../src/policy.ts'
import { SourceRegistry } from '../src/sources/registry.ts'
import { githubKind } from '../src/sources/github.ts'
import { issueTrigger } from '../src/sources/github-trigger.ts'

it('keeps a ready ticket open while its own PR is open, and ends it merged when the PR merges', () => {
  const settings = SettingsSchema.parse({ sources: { github: { enabled: true, config: { repository: 'demo-org/widgets', cli: 'gh-agent' } } },
    policy: { sources: { github: { allowed: [{ id: 'alice' }] } } } })
  const registry = new SourceRegistry(() => settings); registry.register(githubKind)
  const repo = new MemoryRepositories(), candidates: Candidate[] = []
  let clock = 0
  const engine = new Engine({ repo, scope: registry, policy: () => settingsPolicy(settings, registry),
    assessor: { request: c => { candidates.push(c) } }, executor: { start: vi.fn(), deliver: vi.fn(), stop: vi.fn() },
    outbox: { send: vi.fn(), status: () => undefined, withdraw: vi.fn() }, now: () => new Date(Date.UTC(2026, 10, 1, 10, 0, clock++)).toISOString() })
  const issue = issueTrigger({ number: 7, title: 'README setup', body: '@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો.',
    user: { login: 'alice', type: 'User' }, created_at: '2026-11-01T10:00:00Z', html_url: 'https://github.com/demo-org/widgets/issues/7' }, 'widgets-agent')
  engine.receive(issue); engine.evaluateDue()
  const { ticketId } = engine.decide(issue.id, { kind: 'accept', title: 'README setup', scope: 'README setup', reason: 'requested', name: 'readme-setup' })
  engine.assignmentStarted(ticketId!, latestAssignment(repo.tickets.get(ticketId!)!)!.id)
  engine.bindThread(ticketId!, { source: 'github', id: '12' }, true)
  engine.report(ticketId!, { state: 'ready', summary: 'README updated; pnpm check passes' })
  expect(ticketStage(repo.tickets.get(ticketId!)!)).toEqual({ stage: 'person', action: 'review' })
  engine.threadClosed({ source: 'github', id: '12' }, 'merged', '2026-11-01T11:00:00Z')
  expect(repo.tickets.get(ticketId!)!.ended).toMatchObject({ by: 'executor', outcome: 'merged' })
})
