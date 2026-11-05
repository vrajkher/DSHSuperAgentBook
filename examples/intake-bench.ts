/** Book exercise (chapter 13): measure Engine.receive + evaluateDue on the SQLite Store. Usage: node bench/intake-bench.ts <N> <FULL|NORMAL> */
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Engine, type Trigger } from '../src/core/index.ts'
import { Store } from '../src/app/store.ts'

const n = Number(process.argv[2] ?? 1000), sync = process.argv[3] ?? 'FULL'
const dir = mkdtempSync(join(tmpdir(), 'dsh-bench-'))
const store = new Store(join(dir, 'orchestrator.sqlite'))
store.db.exec(`PRAGMA synchronous=${sync}`)
let requested = 0
const engine = new Engine({ repo: store, scope: { scope: () => ({ listened: true, observed: false }) },
  policy: () => ({ version: 'v1', paused: false, evalTimeoutMs: 60_000, gate: () => ({ admissible: true, strength: 'explicit', basis: { via: 'addressed', addressed: 'mention' } }),
    revalidate: () => true, admitsInferred: () => false }),
  assessor: { request: () => { requested++ } }, executor: { start() {}, deliver() {}, stop() {} },
  outbox: { send() {}, status: () => undefined, withdraw() {} } })
const trigger = (i: number): Trigger => ({ id: `t${i}`, source: 'github', threads: [{ source: 'github', id: String(i % 200) }],
  actor: { source: 'github', id: 'alice' }, human: true, addressed: 'mention', at: new Date(Date.UTC(2026, 10, 1, 0, 0, i)).toISOString(), text: `request ${i}`, meta: {} })
const t0 = performance.now()
for (let i = 0; i < n; i++) engine.receive(trigger(i))
const t1 = performance.now()
engine.evaluateDue()
const t2 = performance.now()
console.log(JSON.stringify({ n, synchronous: sync, receiveMs: Math.round(t1 - t0), perTriggerMs: +((t1 - t0) / n).toFixed(3), evaluateDueMs: Math.round(t2 - t1), evalsStarted: requested }))
store.close(); rmSync(dir, { recursive: true, force: true })
