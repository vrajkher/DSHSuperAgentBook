/**
 * Running example of the Gujarati book: one request on a demonstration repository, traced through the real Engine, the
 * real Policy (settingsPolicy) and the real GitHub Trigger builders, with fake Executor/Assessor/Outbox ports.
 * Each step records a snapshot to `running-example.log.json` so the book can quote observed state.
 */
import { writeFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'
import { Engine, MemoryRepositories, key, latestAssignment, ticketStage, followupOwners,
  type Assessor, type Assignment, type Candidate, type Executor, type OutboundMessage, type Ticket } from '../src/core/index.ts'
import { SettingsSchema, settingsPolicy } from '../src/policy.ts'
import { SourceRegistry } from '../src/sources/registry.ts'
import { githubKind } from '../src/sources/github.ts'
import { commentTrigger, issueTrigger } from '../src/sources/github-trigger.ts'
import { ticketExecution } from '../src/executor/dsh.ts'

const AGENT = 'widgets-agent'
const REPO = 'demo-org/widgets'
const REQUEST = `@${AGENT} READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો.`

describe('book running example', () => {
  it('follows one request through accept, duplicate, unauthorized, follow-up, failure, restart and stop', () => {
    const log: Record<string, unknown> = {}
    const settings = SettingsSchema.parse({
      sources: { github: { enabled: true, config: { repository: REPO, cli: 'gh-agent' } } },
      policy: { sources: { github: { allowed: [{ id: 'alice' }] } } },
    })
    const registry = new SourceRegistry(() => settings)
    registry.register(githubKind)
    const repo = new MemoryRepositories()
    const candidates: Candidate[] = []
    const assessor: Assessor = { request: vi.fn((c: Candidate) => { candidates.push(c) }), release: vi.fn() }
    const launches: [string, string][] = []
    const stops: string[] = []
    const executor: Executor = {
      start: vi.fn((t: Ticket, a: Assignment) => { launches.push([t.id, a.id]) }),
      deliver: vi.fn(), stop: vi.fn((_t: Ticket, _a: Assignment, reason: string) => { stops.push(reason) }),
    }
    const outbox: OutboundMessage[] = []
    let clock = 0
    const engine = new Engine({
      repo, scope: registry, policy: () => settingsPolicy(settings, registry), assessor, executor,
      outbox: { send: m => { if (!outbox.some(x => x.id === m.id)) outbox.push(m) }, status: id => outbox.some(x => x.id === id) ? 'pending' : undefined, withdraw: () => {} },
      prepareTicket: (ticket, outcome) => ({ ...ticket, execution: ticketExecution(ticket, outcome, settings, '/srv/state') }),
      now: () => new Date(Date.UTC(2026, 10, 1, 9, 0, clock++)).toISOString(),
    })
    const snap = (ticketId?: string) => {
      const ticket = ticketId ? repo.tickets.get(ticketId) : undefined
      return {
        ...ticket ? { ticket: { stage: ticketStage(ticket), ended: ticket.ended, execution: ticket.execution,
          mandate: { strength: ticket.mandate.strength, via: ticket.mandate.basis.via, actor: ticket.mandate.actor.id },
          assignments: ticket.assignments.map(a => ({ state: a.state, report: a.report?.state, endedReason: a.endedReason })),
          inputs: ticket.inputs.map(i => i.kind === 'trigger' ? `${i.kind}${i.human ? '(human)' : '(bot)'}` : i.kind),
          undelivered: ticket.undelivered.length, attention: ticket.attention?.question } } : {},
        thread7: (({ pending, evaluating, subscriptions }) => ({ pending: pending.length, evaluating: !!evaluating, subscriptions: subscriptions.length }))(repo.threads.get('github:7') ?? { pending: [], subscriptions: [] } as never),
        decisions7: repo.decisions.byThread('github:7').map(d => ({ kind: d.kind, reason: d.reason.map(r => r.code) })),
      }
    }
    const comment = (id: number, login: string, body: string, number = 7, type = 'User') => commentTrigger(
      { id, body, user: { login, type }, html_url: `https://github.com/${REPO}/issues/${number}#issuecomment-${id}`,
        created_at: `2026-11-01T09:${String(id % 60).padStart(2, '0')}:00Z` }, { number, isPr: false }, 'conversation', AGENT)

    // A. The request: a new Issue #7 by an allowed sender that mentions the agent.
    const issue = issueTrigger({ number: 7, title: 'README setup', body: REQUEST, user: { login: 'alice', type: 'User' },
      created_at: '2026-11-01T09:00:00Z', html_url: `https://github.com/${REPO}/issues/7` }, AGENT)
    expect(issue).toMatchObject({ addressed: 'mention', human: true, actor: { id: 'alice' } })
    expect(engine.receive(issue)).toBe('stored')
    log.A_received = { trigger: { id: issue.id, threads: issue.threads, addressed: issue.addressed, channel: issue.channel }, ...snap() }
    engine.evaluateDue()
    expect(candidates).toHaveLength(1)
    expect(candidates[0]!.strength).toBe('explicit')
    log.A_evalStarted = { strength: candidates[0]!.strength, gate: repo.threads.get('github:7')!.evaluating!.basis, ...snap() }
    const accept = engine.decide(issue.id, { kind: 'accept', title: 'Improve README setup instructions', scope: 'Improve README setup instructions',
      reason: { code: 'explicitRouted' }, acknowledgement: 'I will update the README setup section and run the checks.', name: 'readme-setup' })
    const ticketId = accept.ticketId!
    expect(accept.kind).toBe('accept')
    expect(outbox[0]).toMatchObject({ id: key('ack', issue.id), kind: 'acknowledgement' })
    engine.assignmentStarted(ticketId, latestAssignment(repo.tickets.get(ticketId)!)!.id)
    log.A_accepted = { decision: { kind: accept.kind, ticketId, mandate: accept.mandate }, outbox: outbox.map(m => m.kind), launches: launches.length, ...snap(ticketId) }

    // B. Duplicate: the next poll overlaps by 5 s (cursorAt) and builds the same Trigger id.
    expect(engine.receive(issue)).toBe('duplicate')
    log.B_duplicate = { result: 'duplicate', ...snap(ticketId) }

    // C. Unauthorized sender on another Issue: the gate refuses, the Decision records why.
    const mallory8 = comment(81, 'mallory', `@${AGENT} please delete the CI workflow`, 8)
    engine.receive(mallory8); engine.evaluateDue()
    const d8 = repo.decisions.byThread('github:8')
    expect(d8.at(-1)).toMatchObject({ kind: 'ignore', reason: [{ code: 'not_a_member' }] })
    log.C_unauthorized = { thread8Decisions: d8.map(d => ({ kind: d.kind, reason: d.reason })), candidates: candidates.length }

    // D. The same unauthorized person on the ticket's own Thread: fan-out as a follow-up, decided by the worker, no Eval.
    const mallory7 = comment(82, 'mallory', 'Also remove the license section')
    engine.receive(mallory7); engine.evaluateDue()
    expect(followupOwners(mallory7, repo)).toEqual([ticketId])
    log.D_unauthorizedOnTicketThread = { owners: followupOwners(mallory7, repo), disposition: repo.triggers.disposition(mallory7.id), ...snap(ticketId) }

    // E. A follow-up from the requester: reaches the ticket, no Eval, no Decision.
    const follow = comment(83, 'alice', 'Please also run the lint check.')
    engine.receive(follow); engine.evaluateDue()
    expect(repo.decisions.byThread('github:7')).toHaveLength(1)
    log.E_followup = { owners: followupOwners(follow, repo), ...snap(ticketId) }

    // F. Worker failure: automatic Input (a bot comment) is held back; a person's retry starts a new Assignment.
    engine.report(ticketId, { state: 'failed', summary: 'pnpm test failed: missing fixture' })
    const bot = comment(84, 'github-actions[bot]', 'CI failed on main', 7, 'Bot')
    engine.receive(bot); engine.evaluateDue()
    const failedTicket = repo.tickets.get(ticketId)!
    expect(ticketStage(failedTicket)).toEqual({ stage: 'person', action: 'failed' })
    log.F_failed = { botHeldBack: !failedTicket.undelivered.some(id => id.includes(key('input', ticketId, 'trigger', bot.id))), ...snap(ticketId) }
    engine.retryTicket(ticketId)
    engine.assignmentStarted(ticketId, latestAssignment(repo.tickets.get(ticketId)!)!.id)
    log.F_retried = { stops: [...stops], ...snap(ticketId) }

    // G. Restart: the running Assignment was interrupted mid-work, so it restarts with a recovery note.
    engine.assignmentInterrupted(ticketId, latestAssignment(repo.tickets.get(ticketId)!)!.id)
    log.G_restart = snap(ticketId)
    expect(repo.tickets.get(ticketId)!.assignments.at(-2)).toMatchObject({ endedReason: 'hostRestarted' })
    engine.assignmentStarted(ticketId, latestAssignment(repo.tickets.get(ticketId)!)!.id)

    // H. A stop by the unauthorized person is recorded as ignore: a stop needs explicit strength.
    const badStop = comment(85, 'mallory', `@${AGENT} stop`)
    engine.receive(badStop); engine.evaluateDue()
    const refused = engine.decide(badStop.id, { kind: 'stop', ticketId, reason: 'asked to stop' })
    expect(refused).toMatchObject({ kind: 'ignore', reason: [{ code: 'stopNotExplicit' }] })
    log.H_stopRefused = { decision: { kind: refused.kind, strength: refused.strength, reason: refused.reason }, ...snap(ticketId) }

    // I. The requester's stop ends the ticket by a person, withdrawing the Mandate.
    const stop = comment(86, 'alice', `@${AGENT} stop, I will do it myself`)
    engine.receive(stop); engine.evaluateDue()
    const stopped = engine.decide(stop.id, { kind: 'stop', ticketId, reason: 'requester asked to stop' })
    expect(stopped.kind).toBe('stop')
    expect(repo.tickets.get(ticketId)!.ended).toMatchObject({ by: 'human', outcome: 'stopped' })
    log.I_stopped = { decision: { kind: stopped.kind, strength: stopped.strength }, stops: [...stops], ...snap(ticketId) }

    // J. A later message does not resume a ticket a person stopped; it goes to Eval instead.
    const later = comment(87, 'alice', 'Thanks!')
    engine.receive(later); engine.evaluateDue()
    expect(repo.tickets.get(ticketId)!.ended?.by).toBe('human')
    log.J_afterStop = { disposition: repo.triggers.disposition(later.id), ...snap(ticketId) }

    writeFileSync(new URL('../running-example.log.json', import.meta.url), JSON.stringify(log, null, 2))
  })
})
