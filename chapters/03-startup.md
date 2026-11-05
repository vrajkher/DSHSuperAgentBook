# પ્રકરણ 3 — Startup architecture

[← પ્રકરણ 2](02-setup-operation.md) · [અનુક્રમણિકા](../README.md) · [આગળ: પ્રકરણ 4 →](04-sources-intake.md)

## શીખવાનું પરિણામ અને પૂર્વજરૂરિયાત

આ પ્રકરણ પછી તમે:
- `src/index.ts` → `Runtime` constructor → `initialize()` → `shutdown()` નો પૂરો ક્રમ trace કરી શકશો;
- Cordis ના `inject`, `apply`, `Config`, `ctx.effect` અને fiber restart નો **આ repository માં થતો ઉપયોગ** સમજાવી શકશો;
- Components કયા ક્રમમાં બને છે અને circular dependency કેવી રીતે ટાળી છે તે કહી શકશો;
- `cordis.patch.yml` માંના ત્રણ plugins અને બે presets ને code સાથે જોડી શકશો.

**નવો concept, composition root:** એક જ જગ્યા જ્યાં application ના બધા objects બને છે અને એકબીજા સાથે જોડાય છે. આ જગ્યાએ business rules નથી હોતા. Async concepts: `Promise`, `AbortController`/`AbortSignal`, `setInterval`.

**ખોલવાનો ક્રમ:** [`src/index.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/index.ts) → [`src/app/runtime.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts) → [`src/app/setup.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/setup.ts) → [`src/app/passes.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/passes.ts) → [`cordis.patch.yml`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/cordis.patch.yml).

## 3.1 Cordis: external boundary (જેટલું અહીં વપરાય છે)

| Cordis ખ્યાલ | આ repository માં ઉપયોગ | Expected behavior |
| --- | --- | --- |
| `export const inject = [...]` | `src/index.ts#L8`: 11 DSH services; `github.ts#L111`: `['orchestrator']` | બધી services ઉપલબ્ધ થાય પછી જ `apply` ચાલે |
| `apply(ctx, config)` | Plugin entry | Config schema વડે validated config મળે |
| `Config` (schemastery `s.object`) | `src/deployment.ts#L15` | Invalid key હોય તો plugin start ન થાય (test: "refuses keys of the previous configuration…") |
| `class Runtime extends Service` + `super(ctx, 'orchestrator')` | `runtime.ts#L59, L88` | Runtime **`orchestrator` નામની service** બને છે. Source plugins તેને inject કરે છે |
| `ctx.effect(() => dispose)` | `index.ts#L22`, `github.ts#L113-L121` | Plugin unload/restart વખતે dispose ચાલે |
| `ctx.fiber.restart()` | `index.ts#L19` | Plugin ને in-process ફરી mount કરે |
| `cordis.patch.yml` `insert` | ત્રણ plugins + બે presets | DSH profile load થાય ત્યારે plugins ઉમેરાય |

**[Source]** Source plugins નો Runtime સાથેનો સંબંધ type stage પર પણ સાંકડો છે:

```ts
declare module '@deepseek-ai/cordis' { interface Context { orchestrator: SourceHost } }
```

([`runtime.ts#L51`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L51)) Runtime ઘણું બધું છે, પણ GitHub plugin ને `ctx.orchestrator` નો type ફક્ત `SourceHost` તરીકે દેખાય છે: `sources` અને `context(kind)`.

## 3.2 Startup lifecycle

```mermaid
sequenceDiagram
  participant DSH as DSH / Cordis
  participant Idx as src/index.ts apply()
  participant RT as Runtime constructor
  participant Init as Runtime.initialize()
  participant Setup
  participant Sess as Sessions / DshExecutor
  participant Loop as Passes + Effects
  DSH->>Idx: apply(ctx, config)
  Idx->>RT: new Runtime(ctx, machine, restart)
  RT->>RT: mkdir stateDir, lockSync(stateDir)
  RT->>RT: new Store(orchestrator.sqlite) → Setup, Prompts, Commands, Effects, SourceRegistry, Sessions, Settings, DshExecutor, MasterAssessor, Outbox, Engine, Passes
  RT->>Init: this.ready = initialize()
  Init->>DSH: registerHttp (/orchestrator/api)
  Init->>Setup: run(settings)
  alt setup fails
    Setup-->>Init: false → runtime health 'paused' (setupPending), return
  else setup ok
    Init->>Sess: sessions.install(), executor.install()
    Init->>Sess: ensure(main Session)
    Init->>Init: settings.sync() for syncable Sources
    Init->>Sess: executor.resume()
    Init->>Loop: passes.start() (every 2 s), effects.start()
    Init-->>Idx: ready (runtime health 'ready')
  end
```

**તીરોનો અર્થ:** ઉપરથી નીચે સમયક્રમ છે. DSH plugin નું `apply` બોલાવે છે. Constructor **synchronously** બધા objects બનાવે છે. પછી `initialize()` async રીતે HTTP routes register કરે છે, setup ચલાવે છે, અને setup સફળ થાય તો જ sessions, recovery અને loops શરૂ કરે છે. `alt` box બે શક્ય માર્ગો બતાવે છે.

## 3.3 Constructor: construction order અને dependency wiring

**[Source]** [`runtime.ts#L87-L172`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L87-L172). મુખ્ય પગલાં:

**(1) Lock પહેલાં, database પછી** (L91-L98, real):

```ts
mkdirSync(machine.stateDir, { recursive: true, mode: 0o700 })
const compromised = (error: Error) => { this.runtimeHealth.set({ state: 'error', detail: error.message }); this.stopped.abort() }
const release = lockSync(machine.stateDir, { stale: 30_000, onCompromised: compromised })
…
const store = opened = this.store = new Store(join(machine.stateDir, 'orchestrator.sqlite'), report)
```

`proper-lockfile` નો `lockSync` બીજી process ને તે જ state directory ખોલતાં રોકે છે. Lock "compromised" થાય (દા.ત. stale lock કોઈ બીજાએ લઈ લીધો), તો runtime health error બને છે અને `stopped` abort થાય છે. આ abort signal બધાં running reads અને subprocesses ને cancel કરે છે. Database lock **પછી** ખુલે છે, કારણ કે બે processes એક સાથે migration ચલાવે તો state બગડી શકે.

**(2) ક્રમ (dependencies પહેલાં):**

| # | Component | શું જોઈએ | નોંધ |
| --- | --- | --- | --- |
| 1 | `Store` | path | Schema 10 હોય તો migration |
| 2 | `Setup` | ctx, machine, lifetime, restart | |
| 3 | `Prompts` | store, limits, `deployed()` callback | Callback lazy છે: setup પછી જ value આપે |
| 4 | `masterId` | store KV | પહેલી વાર `orchestrator-<key(stateDir)>` |
| 5 | `Commands` | `() => setup.deployment` | Getter, કારણ કે deployment હજી resolved નથી |
| 6 | `Effects` | store, health board | |
| 7 | `SourceRegistry` | `() => store.settings()` | Register થાય ત્યારે sync callback |
| 8 | `Sessions` | effects, prompts, `tools(agent, ticket)` | Tools `this.toolHost` વાપરે છે, જે પછી set થાય છે (late binding) |
| 9 | `Settings` | `engine: { policyChanged }` | **Getter trick:** `this.engine` હજી બન્યું નથી |
| 10 | `DshExecutor` | `get engine() { return runtime.engine }` | Circularity તોડવા getter |
| 11 | `MasterAssessor` | `get engine()`, `get deployment()` | Same |
| 12 | `Outbox` | store, effects, sources, commands | |
| 13 | `Engine` | repo=store, scope=sources, policy getter, assessor, executor, outbox, `prepareTicket`, `emit` | **છેલ્લે**, કારણ કે તેને બધા ports જોઈએ |
| 14 | `Passes` | engine, effects | |

**Circularity કેવી રીતે તૂટે છે:** Engine ને Executor જોઈએ (`executor.start`), અને Executor ને Engine જોઈએ (`engine.assignmentStarted`). Runtime Executor ને `{ get engine() { return runtime.engine } }` આપે છે (L128). Executor engine ને ફક્ત **runtime પર** વાપરે છે, construction વખતે નહીં, એટલે ત્યાં સુધીમાં `runtime.engine` બની ગયું હોય છે. `docs/007` આ જ કહે છે: "Runtime gives them getters rather than requiring construction in a circular order."

**(3) `emit` — domain events નું glue** (L138-L153, shortened):

```ts
emit: event => {
  const notice = this.quiet ? undefined : eventNotice(event, id => store.tickets.get(id))
  if (notice) sessions.notify(...notice)
  const followed = !this.quiet && (event.type === 'trigger.received' || event.type === 'ticket.resumed' || event.type === 'trigger.followup')
  const followup = followed ? followupNotice(store, sources, event.data.triggerId) : undefined
  if (followup) sessions.relay(followup.id, followup.text)
  const ended = event.type === 'ticket.ended' ? store.tickets.get(event.data.ticketId) : undefined
  if (ended && setup.configured()) { … for (const message of pullEndNotices(…)) outbox.send(message) }
}
```

- `quiet` counter: main Session નું પોતાનું tool command ચાલે ત્યારે તેને પોતાના જ પગલાંની notice ન મળે (L85-L86, L165).
- `sessions.notify` અને `relay` ફક્ત **effect enqueue** કરે છે. `emit` Engine ના transaction ની અંદર બોલાય છે, એટલે notice domain change સાથે atomically સચવાય છે ([પ્રકરણ 8](08-store-effects-outbox.md)).

**(4) Failure handling** (L167-L171): constructor માં exception આવે તો Store બંધ થાય છે અને lock છૂટે છે, પછી error ફરી throw થાય છે. એટલે in-process restart ફરી lock લઈ શકે છે.

## 3.4 `initialize()` — readiness

**[Source, real]** [`runtime.ts#L201-L218`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L201-L218):

```ts
private async initialize(): Promise<void> {
  this.disposers.push(registerHttp(this.ctx, this.httpHost()))
  if (!await this.setup.run(this.store.settings())) {
    this.runtimeHealth.set({ ...health('paused', 'setupPending'), at: now() })
    return
  }
  this.sessions.install()
  this.executor.install()
  await this.sessions.ensure(this.masterId, this.machine.stateDir, 'dsh-superagent orchestrator', 'orchestrator')
  for (const id of this.settings.syncable()) await this.settings.sync(id).catch(() => {})
  if (this.closing()) return
  this.executor.resume()
  this.passes.start()
  this.effects.start()
  this.runtimeHealth.set({ state: 'ready', detail: 'Orchestrator is ready', at: now() })
}
```

| Line | કેમ આ ક્રમમાં? |
| --- | --- |
| `registerHttp` પહેલાં | Setup fail થાય તો પણ panel ખૂલવી જોઈએ, જેથી operator તેને ઠીક કરી શકે |
| `setup.run` | Repository/accounts ને worker shell ની જેમ probe કરે છે, `worker-bin` shims લખે છે, અને process environment બદલે છે (`applyEnvironment`) |
| Setup fail → `return` | Loops શરૂ જ થતા નથી. Sources ને `ctx.configured()` false મળે છે, એટલે તે poll કરતા નથી (`github.ts#L132`) |
| `install()` | Session events subscribe થાય છે |
| `ensure(master)` | Main Session ને `dsh-superagent-router` preset સાથે બનાવે/ખોલે છે |
| `closing()` check | Setup ની રાહ દરમિયાન `stop()` આવ્યું હોય તો background loops શરૂ ન થાય |
| `executor.resume()` | **Restart recovery:** running Assignments ને `assignmentInterrupted` મળે છે ([પ્રકરણ 7](07-worker-execution.md)) |
| `passes.start()` | દર 2 s એ pass |
| `effects.start()` | આ પહેલાં queued effects (દા.ત. ગયા run ના) ચાલતા નથી |

**Setup પછી restart કેમ?** Settings save થી GitHub account/CLI બદલાય તો `Settings.save` `setup.restart()` બોલાવે છે ([`settings.ts#L193`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/settings.ts#L193)). તે `setTimeout(host.restart, 0)` વડે HTTP response પાછો ગયા પછી `ctx.fiber.restart()` કરે છે. આખો Runtime નવેસરથી બને છે, અને `initialize()` setup ફરી ચલાવે છે.

## 3.5 Passes: "clock"

**[Source]** [`passes.ts#L28-L68`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/passes.ts#L28-L68):
- `start()`: `setInterval(() => this.request(), 2000)`.
- `receive(trigger)`: `engine.receive`; પરિણામ `'stored'` હોય તો તરત નવો pass.
- `pump()`: એક સમયે એક જ pass ચાલે છે. Pass ચાલતો હોય ત્યારે આવેલી બધી requests પછીના **એક** pass માં ભેગી થાય છે (`pumpAgain`).
- `pumpOnce()`: `effects.kick()`, પછી `engine.evaluateDue()`.

**Test:** [`tests/passes.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/passes.spec.ts) — "runs the passes asked for during a pass as one pass after it". આ test સાબિત કરે છે કે ઘણા Triggers ઝડપથી આવે તો પણ evaluateDue એક સાથે બે વાર ચાલતું નથી.

## 3.6 Shutdown

**[Source]** [`runtime.ts#L229-L253`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L229-L253): `stop()` idempotent છે (`this.stopping ??= this.shutdown()`). ક્રમ:

1. `closingFlag = true` → નવા Triggers નકારાય છે (`Passes.receive` throw કરે છે).
2. `passes.stop()`, `stopped.abort()` → Sources ના polls અને subprocesses cancel થાય છે.
3. `assessor.stop()`. Main + બધા workers ના running turns `cancel({ kind: 'user' }, { keepInbox: true })` થાય છે. **Inbox રહે છે**, એટલે પહોંચાડેલાં પણ હજી ન લેવાયેલાં messages restart પછી પણ ત્યાં હોય છે.
4. Passes, `effects.drain()` અને agents idle થાય તેની રાહ. Drain કરતી વખતે waiting rows SQLite માં જ રહે છે.
5. `executor.shutdown()`: દરેક worker નું background work (jobs/subagents) બંધ થાય છે, વધુમાં વધુ 10 s.
6. Dispose → `sessionPersistence.flush()`.
7. `finally`: `setup.restore()` (process environment પાછું), `store.close()`, **પછી** lock release. Database બંધ થાય તે પહેલાં lock છોડી દઈએ, તો બીજી process અડધા લખાયેલા database ને ખોલી શકે.

## 3.7 Bundle configuration → application components

| `cordis.patch.yml` entry | Code | Component |
| --- | --- | --- |
| `id: dsh-superagent`, `name: dsh-superagent` | `src/index.ts` | Runtime (`orchestrator` service) |
| `id: dsh-superagent-github`, `name: dsh-superagent/github-watch` | `src/sources/github.ts` (`apply`) | GitHub SourceKind + polling loop |
| `id: dsh-superagent-feishu` (`disabled: true`) | `src/sources/feishu.ts` | Feishu SourceKind (opt-in) |
| `dsh-superagent-worker-preset` → preset id `dsh-superagent-worker` | `WORKER_PRESET` | Executor Sessions |
| `dsh-superagent-router-preset` → `dsh-superagent-router` | `ROUTER_PRESET` | Main Session |

`stateDir` bundle માં નથી; તે **profile** layer (`examples/profile.cordis.patch.yml`) આપે છે. Bundle layer machine-specific કંઈ રાખતી નથી.

## 3.8 Exercise: lifecycle tests ચલાવો

```bash
pnpm vitest run tests/index.spec.ts tests/passes.spec.ts
```

**અપેક્ષા:** બધા pass થાય. `index.spec.ts` નો "asks DSH to read its settings entry again once a restart it started finished" test `index.ts#L19` ની `describe()` call ને verify કરે છે.

## 3.9 Modification: pass interval

**[Proposed patch, verify માટે]** `passes.ts` માં `2000` ને `500` કરો, અને `pnpm vitest run tests/passes.spec.ts tests/runtime.spec.ts` ચલાવો. **[Test ચલાવ્યો]** પરિણામ: `Test Files 2 passed (2)`, `Tests 95 passed (95)`. Tests interval ની exact value પર આધાર રાખતા નથી; તેઓ `pump()`/`idle()` સીધા બોલાવે છે. ફેરફારથી latency ઘટે છે, પણ `evaluateDue` વારંવાર ચાલવાથી SQLite reads વધે છે ([પ્રકરણ 13](13-advanced-engineering.md)). Patch પાછો લો: `git checkout src/app/passes.ts`.

## 3.10 Debugging exercise

**લક્ષણ:** બીજી વાર `dsh --profile superagent` ચલાવતાં તરત error આવે છે. **નિદાન:** `lockSync` પહેલી process નો lock જુએ છે; `proper-lockfile` "Lock file is already being held" પ્રકારની error આપે છે. **[ધારણા]** exact text library નો છે. **સુધારો:** `scripts/dsh-superagent status` થી ચાલતી process શોધો. Service script પોતે પણ duplicate instances નકારે છે.

## Mastery પ્રશ્નો

1. `registerHttp` setup પહેલાં કેમ થાય છે?
2. `DshExecutor` ને Engine getter તરીકે કેમ મળે છે? Constructor ની અંદર `this.host.engine.receive(...)` બોલાવે તો શું થાય?
3. Shutdown માં `keepInbox: true` નું મહત્વ restart recovery માટે શું છે?
4. Database close **પહેલાં** lock કેમ ન છોડવો?

ઉકેલો: [પરિશિષ્ટ E § પ્રકરણ 3](../appendices/E-solutions.md#પ્રકરણ-3)

[← પ્રકરણ 2](02-setup-operation.md) · [આગળ: પ્રકરણ 4 →](04-sources-intake.md)
