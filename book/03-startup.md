# પ્રકરણ 3 — Startup architecture: સવારે તાળું ખોલવું

> **Level 3 · વાર્તાનો દિવસ 4.**
> સવારે છ વાગ્યે ડેસ્ક કયા ક્રમમાં ખૂલે છે, અને સાંજે કયા ક્રમમાં બંધ થાય છે.
> પહેલાં: [પ્રકરણ 2](02-setup-operation.md).

## 🎯 આ પ્રકરણ પછી તમે શું કરી શકશો

- `src/index.ts` → `Runtime` constructor → `initialize()` → `shutdown()` નો પૂરો ક્રમ trace કરી શકશો.
- Cordis ના `inject`, `apply`, `Service`, `ctx.effect` અને fiber restart નો **અહીં થતો** ઉપયોગ સમજાવી શકશો.
- Components કયા ક્રમમાં બને છે, અને circular dependency કેવી રીતે ટળે છે, તે કહી શકશો.
- Bundle ના ત્રણ plugins અને બે presets ને code સાથે જોડી શકશો.

**નવો શબ્દ, composition root:** એક જ જગ્યા જ્યાં application ના બધા objects બને અને એકબીજા સાથે જોડાય. ત્યાં business rules હોતા નથી.

## 🗺️ નકશો: સવારનો ક્રમ

```mermaid
sequenceDiagram
  participant DSH as DSH / Cordis (કાંતિકાકા)
  participant Idx as src/index.ts apply()
  participant RT as Runtime constructor
  participant Init as Runtime.initialize()
  participant Setup as Setup
  participant Loop as Passes + Effects
  DSH->>Idx: apply(ctx, config)
  Idx->>RT: new Runtime(ctx, machine, restart)
  RT->>RT: stateDir lock, પછી Store
  RT->>RT: Setup, Prompts, Commands, Effects, SourceRegistry, Sessions, Settings, DshExecutor, MasterAssessor, Outbox, Engine, Passes
  RT->>Init: this.ready = initialize()
  Init->>DSH: registerHttp (/orchestrator/api)
  Init->>Setup: run(settings)
  alt setup નિષ્ફળ
    Setup-->>Init: false, runtime health paused, return
  else setup સફળ
    Init->>Init: sessions.install, executor.install, ensure(main Session), policy sync
    Init->>Init: executor.resume()
    Init->>Loop: passes.start() અને effects.start()
  end
```

સમય ઉપરથી નીચે વહે છે. Constructor **એક શ્વાસે** (synchronously) બધા objects બનાવે છે. પછી `initialize()` પહેલાં પાટિયાની બારી ખોલે છે, setup ચલાવે છે, અને setup સફળ થાય તો જ sessions, recovery અને loops શરૂ કરે છે. `alt` ખાનું બે શક્ય માર્ગ બતાવે છે.

---

## દૃશ્ય 1 — તિજોરીની એક જ ચાવી

🎬 સવારે છ વાગ્યે સવિતાબેન આવે છે. પહેલું કામ: તિજોરીના ઓરડાનું તાળું અંદરથી મારવું. પછી જ તિજોરી ખોલીને ચોપડો કાઢે છે. આરવ પૂછે છે કે આટલી સાવચેતી કેમ. દીદી ગયા અઠવાડિયાનો કિસ્સો કહે છે: બે મુનીમ એક જ ચોપડામાં એક સાથે લખતા હતા, અને બંનેનો સરવાળો ખોટો પડ્યો.

❓ "Code માં 'ઓરડાનું તાળું' શું છે, અને તે ચોપડા **પહેલાં** કેમ?"

💻 **Repository code** ([`Runtime` constructor][rt-lock]): ✅

```ts
mkdirSync(machine.stateDir, { recursive: true, mode: 0o700 })
const compromised = (error: Error) => { this.runtimeHealth.set({ state: 'error', detail: error.message }); this.stopped.abort() }
const release = lockSync(machine.stateDir, { stale: 30_000, onCompromised: compromised })
this.releaseLock = async () => { release() }
…
const store = opened = this.store = new Store(join(machine.stateDir, 'orchestrator.sqlite'), report)
```

- `proper-lockfile` નો `lockSync` બીજી process ને તે જ `stateDir` ખોલતાં રોકે છે.
- Lock "compromised" થાય, તો runtime health error બને અને `stopped` abort થાય. આ signal બધાં ચાલુ reads અને subprocesses ને રોકે છે.
- Database lock **પછી** ખૂલે છે. Code comment: "so another process cannot migrate or write concurrently".
- Constructor માં ક્યાંય error આવે, તો Store બંધ થાય અને lock છૂટે ([cleanup][rt-ctor-fail]), જેથી in-process restart ફરી lock લઈ શકે.

🔬 **Expert નજર.** સૌથી જોખમી ક્ષણ **migration** છે: Store ખૂલતી વખતે જૂના schema ને નવામાં ફેરવે છે ([પ્રકરણ 8](08-store-effects-outbox.md)). બે processes એક સાથે migration ચલાવે, તો database કાયમ માટે બગડી શકે. એટલે નિયમ: પહેલાં "હું એકલો છું" ની ખાતરી, પછી જ state ને અડવું. Expert startup code માં પહેલો પ્રશ્ન આ પૂછે છે: "exclusive access ક્યારે મળે છે, અને તે પહેલાં કશું લખાય છે?"

## દૃશ્ય 2 — કોણ પહેલાં આવે: extension નંબરની યુક્તિ

🎬 જશુભાઈ (રસોડા-મુકાદમ) ને નિયમ-પોથીવાળા ટેબલ (Engine) ને ફોન કરવો પડે: "ચૂલો ચાલુ થયો." અને નિયમ-પોથીવાળા ટેબલને જશુભાઈને ફોન કરવો પડે: "આ કાર્ડ માટે ચૂલો આપો." સવારે કોણ પહેલાં આવે? બંને એકબીજાની રાહ જુએ, તો કોઈ ન આવે.

❓ "આ ગાંઠ કેવી રીતે છૂટે?"

દીદી: "જશુભાઈને નંબર નહીં, **extension ની ચિઠ્ઠી** આપો: 'નિયમ-પોથીનું ટેબલ, જ્યારે જરૂર પડે ત્યારે ડાયલ કરજો.' તે આવતાંવેંત ફોન નથી કરતા; કામ આવે ત્યારે કરે છે. ત્યાં સુધીમાં ટેબલ ગોઠવાઈ ગયું હોય."

💻 Constructor નો ક્રમ ([`runtime.ts`][rt-engine]): ✅

| # | Component | ભોજનાલયમાં | નોંધ |
|---|---|---|---|
| 1 | `Store` | પાકો ચોપડો | Lock પછી |
| 2 | `Setup` | ગોઠવણ-તપાસ | accounts, shims |
| 3 | `Prompts` | સૂચના-પોથી | |
| 4 | `masterId` | સવિતાબેનની ઓળખ | `orchestrator-<key(stateDir)>` ([code][rt-master]) |
| 5 | `Commands` | ફોન (`gh`, `lark-cli`, `git`) | |
| 6 | `Effects` | ખીંટી | |
| 7 | `SourceRegistry` | રજિસ્ટરોની યાદી | |
| 8 | `Sessions` | ડેસ્ક અને ટુકડીઓના ઓરડા | |
| 9 | `Settings` | ગોઠવણ-ચોપડી | |
| 10 | `DshExecutor` | જશુભાઈ | **getter** |
| 11 | `MasterAssessor` | સવિતાબેનની કાર્ડ-ટપાલ | **getter** |
| 12 | `Outbox` | જવાબ-ટોપલી | |
| 13 | `Engine` | નિયમ-પોથીનું ટેબલ | છેલ્લે: તેને બધા ports જોઈએ |
| 14 | `Passes` | ઘડિયાળ | |

Extension ની ચિઠ્ઠી ([getter][rt-getter]):

```ts
this.executor = new DshExecutor({ context: ctx, get engine() { return runtime.engine }, store, effects, … })
```

`get engine()` property વંચાય **ત્યારે** `runtime.engine` શોધે છે, construction વખતે નહીં. Executor engine ને ફક્ત કામ આવે ત્યારે વાપરે છે, અને ત્યાં સુધીમાં Engine બની ગયું હોય છે.

Source plugins ને Runtime ફક્ત સાંકડા type તરીકે દેખાય છે ([declaration][rt-orchestrator]):

```ts
declare module '@deepseek-ai/cordis' { interface Context { orchestrator: SourceHost } }
```

`Runtime extends Service` અને `super(ctx, 'orchestrator')` તેને Cordis ની `orchestrator` service બનાવે છે ([class][rt-class]). GitHub plugin તેને inject કરે છે, પણ ફક્ત `sources` અને `context(kind)` જોઈ શકે છે.

🔬 **Expert નજર.** [docs/007][doc-arch]: "The Executor and Assessor call back into the Engine, so Runtime gives them getters rather than requiring construction in a circular order." Getter એક વચન છે: "construction વખતે વાપરશો નહીં." કોઈ ભવિષ્યમાં `DshExecutor` ના constructor માં `host.engine.…` લખે, તો `undefined` મળે. Expert આવી અદૃશ્ય શરતને ઓળખે છે, અને નવો code લખતાં પહેલાં તપાસે છે કે તે શરત તૂટતી નથી.

## દૃશ્ય 3 — ઘંટડીઓ: કોને જાણ કરવી

🎬 નિયમ-પોથીના ટેબલ પર કંઈક બને (કાર્ડ બંધ થયું, ચિઠ્ઠી ફરી થોકડામાં ગઈ), ત્યારે એક ઘંટડી વાગે છે. પણ સવિતાબેન પોતે જ કાર્ડ બંધ કરે, તો તેમને ઘંટડી નથી વાગતી. "પોતે કરેલા કામની જાણ પોતાને કરવી એ સમયનો બગાડ."

❓ "Code માં ઘંટડી કોણ વગાડે, અને 'પોતાને નહીં' કેવી રીતે?"

💻 Engine દરેક ફેરફાર પછી **domain event** emit કરે છે ([`DomainEvents`][ports-events]). Runtime તેને main Session ની notices માં ફેરવે છે ([`emit`][rt-emit], shortened): ✅

```ts
emit: event => {
  const notice = this.quiet ? undefined : eventNotice(event, id => store.tickets.get(id))
  if (notice) sessions.notify(...notice)
  const followed = !this.quiet && (event.type === 'trigger.received' || event.type === 'ticket.resumed' || event.type === 'trigger.followup')
  const followup = followed ? followupNotice(store, sources, event.data.triggerId) : undefined
  if (followup) sessions.relay(followup.id, followup.text)
  …ticket.ended → pullEndNotices → outbox.send
}
```

- `quiet` counter: main Session નું પોતાનું tool command ચાલે ત્યારે તે વધે છે, એટલે પોતાના પગલાની notice બનતી નથી.
- `sessions.notify` અને `relay` ફક્ત **ખીંટી પર કાપલી** મૂકે છે (effect enqueue). `emit` Engine ના transaction ની અંદર બોલાય છે, એટલે notice અને domain ફેરફાર સાથે જ સચવાય છે ([પ્રકરણ 8](08-store-effects-outbox.md)).

🔬 **Expert નજર.** 13 events માંથી Runtime ફક્ત થોડાકને notices બનાવે છે; [docs/007][doc-arch] પ્રામાણિકપણે કહે છે: "Other events currently have no consumer." આ observability ની ખુલ્લી જગ્યા છે: [પ્રકરણ 13](13-advanced-engineering.md) માં આપણે અહીં counters મૂકવાનું સૂચવીશું.

## દૃશ્ય 4 — દરવાજો ક્યારે ખૂલે

🎬 સવિતાબેન બધું ગોઠવે છે, પણ દરવાજો તરત નથી ખોલતાં. પહેલાં **પાટિયાની બારી** ખોલે છે, જેથી શેઠ અંદર જોઈ શકે. પછી ફોન અને રજિસ્ટરની ચાવી તપાસે છે. ચાવી ન મળે તો દરવાજો બંધ રહે છે, પણ બારી ખુલ્લી રહે છે, અને પાટિયા પર લખાય છે: "ગોઠવણ અધૂરી."

❓ "બારી તપાસ **પહેલાં** કેમ ખૂલે?"

💻 **Repository code** ([`initialize`][rt-init]): ✅

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

| Line | કેમ આ ક્રમમાં |
|---|---|
| `registerHttp` પહેલાં | Setup નિષ્ફળ જાય તો પણ panel ખૂલે, જેથી operator તેને સુધારી શકે |
| `setup.run` | Repository અને accounts ને worker shell ની જેમ probe કરે, shims લખે ([`run`][setup-run]) |
| નિષ્ફળ → `return` | Loops શરૂ થતા નથી; Sources poll કરતા નથી |
| `ensure(master)` | Main Session `dsh-superagent-router` preset સાથે બને/ખૂલે |
| `closing()` check | Setup દરમિયાન stop આવ્યું હોય, તો loops શરૂ ન થાય |
| `executor.resume()` | ગઈ રાતના અધૂરા ચૂલા ([પ્રકરણ 7](07-worker-execution.md)) |
| `passes.start()`, `effects.start()` | છેલ્લે: હવે કામ વહે |

Settings save થી account બદલાય, તો `setup.restart()` `setTimeout(…, 0)` વડે, HTTP જવાબ ગયા પછી, plugin ને ફરી mount કરે છે ([`restart`][setup-restart]).

🔬 **Expert નજર.** "ગોઠવણ અધૂરી" એ **crash નથી, state છે**. Process ચાલે છે, panel જવાબ આપે છે, અને `status` exit 3 કહે છે. નિષ્ફળ setup ને crash બનાવો, તો operator પાસે સુધારવાનું UI જ ન રહે. Expert દરેક startup નિષ્ફળતા માટે પૂછે છે: "આ પછી માણસ તેને **ક્યાંથી** સુધારશે?"

## દૃશ્ય 5 — ઘડિયાળ: દર બે સેકન્ડે એક આંટો

🎬 ડેસ્ક પર એક ઘડિયાળ છે જે દર બે સેકન્ડે ટકોરો મારે છે. દરેક ટકોરે સવિતાબેન બે કામ કરે છે: ખીંટી પરની કાપલીઓ જુએ છે, અને થોકડાઓ તપાસે છે. છોટુ નવી ચિઠ્ઠી લાવે તો ટકોરાની રાહ નથી જોવાતી. પણ એક આંટો ચાલતો હોય ત્યારે બીજો શરૂ થતો નથી: "એક સાથે બે આંટા મારું તો બે વાર ગણું."

❓ "દસ ચિઠ્ઠી એક સાથે આવે તો દસ આંટા?"

💻 [`Passes`][passes-start]: ✅

- `start()`: `setInterval(() => this.request(), 2000)`.
- [`receive`][passes-receive]: `engine.receive`; પરિણામ `'stored'` હોય તો તરત નવો pass.
- [`pump`][passes-pump]: એક સમયે એક જ pass. ચાલુ pass દરમિયાન આવેલી બધી requests પછીના **એક** pass માં ભેગી થાય છે (`pumpAgain`).
- `pumpOnce`: `effects.kick()`, પછી `engine.evaluateDue()`.

એટલે દસ ચિઠ્ઠી માટે: એક pass ચાલુ, અને એક રાહ જોતો. દસ નહીં.

🔬 **Expert નજર.** આ **coalescing** છે: "N requests → વધુમાં વધુ 2 runs". Test "runs the passes asked for during a pass as one pass after it" તેને સાબિત કરે છે. 🧪 મેં interval ને 2000 થી 500 કર્યો અને `passes.spec.ts` + `runtime.spec.ts` ચલાવ્યા: 95 passed. Tests interval પર આધાર રાખતા નથી; તેઓ `pump()` અને `idle()` સીધાં બોલાવે છે. સારા tests સમયની રાહ નથી જોતા.

## દૃશ્ય 6 — સાંજે તાળું: ઊલટો ક્રમ

🎬 રાત્રે બંધ કરતી વખતે સવિતાબેન સવારથી ઊલટું કરે છે: દરવાજો બંધ, ચાલુ ચૂલા ઠારવા, ખીંટીનું ચાલુ કામ પૂરું થવા દેવું, ચોપડો તિજોરીમાં, અને **સૌથી છેલ્લે** ઓરડાનું તાળું ખોલવું.

❓ "ચોપડો મૂકતાં પહેલાં ઓરડો ખોલી નાખે તો?"

"તો બહાર રાહ જોતો બીજો મુનીમ અંદર આવી અડધો લખાયેલો ચોપડો ખોલે."

💻 [`shutdown`][rt-shutdown]: `stop()` idempotent છે (`this.stopping ??= this.shutdown()`). ક્રમ: ✅

1. `closingFlag = true`: નવી ચિઠ્ઠીઓ નકારાય.
2. `passes.stop()`, `stopped.abort()`: polls અને subprocesses અટકે.
3. Main અને બધા workers ના ચાલુ turns `cancel({ kind: 'user' }, { keepInbox: true })`.
4. Passes, `effects.drain()` અને agents idle થાય તેની રાહ.
5. `executor.shutdown()`: દરેક ટુકડીનું background કામ બંધ, વધુમાં વધુ 10 s.
6. Dispose, `sessionPersistence.flush()`.
7. `finally`: `setup.restore()`, `store.close()`, **પછી** lock release.

🔬 **Expert નજર.** `keepInbox: true` નાની લાગે છે, પણ recovery નો પાયો છે: ટુકડીને અપાયેલી પણ હજી ન વંચાયેલી ચિઠ્ઠી inbox માં રહે છે, અને સવારે ખોવાતી નથી ([પ્રકરણ 7](07-worker-execution.md)). Shutdown નો ક્રમ startup નો અરીસો છે: જે સૌથી પહેલાં લીધું (lock), તે સૌથી છેલ્લે છોડાય.

---

## Source map: bundle → components

| `cordis.patch.yml` entry | Code | ભોજનાલયમાં |
|---|---|---|
| `dsh-superagent` | [`src/index.ts`][index-apply] → Runtime | આખો ડેસ્ક |
| `dsh-superagent-github` (`dsh-superagent/github-watch`) | [`github.ts` apply][gh-apply] | છોટુ: રજિસ્ટર |
| `dsh-superagent-feishu` (`disabled: true`) | `feishu.ts` | છોટુ: WhatsApp ગ્રુપ |
| preset [`dsh-superagent-worker`][patch-worker] | `WORKER_PRESET` | ટુકડીના ઓજારો |
| preset [`dsh-superagent-router`][patch-router] | `ROUTER_PRESET` | સવિતાબેનના ઓજારો |

Cordis (external boundary) ના જે ખ્યાલો અહીં વપરાય છે: `inject` ([index][index-inject]), `apply`, `Service`, `ctx.effect`, `ctx.fiber.restart()`.

## 🧪 Lab

```bash
pnpm vitest run tests/index.spec.ts tests/passes.spec.ts
```

**અપેક્ષિત અવલોકન:** બધા pass. `index.spec.ts` નો "asks DSH to read its settings entry again once a restart it started finished" test restart પછીની `describe()` call ચકાસે છે.

## 🔮 આગાહી કસોટી

`passes.ts` માં `2000` ને `500` કરો. `passes.spec.ts` અને `runtime.spec.ts` fail થશે? (ધારો, પછી ચલાવો. 🧪 પરિણામ: 95 passed. પછી `git checkout src/app/passes.ts`.)

## 🩺 નિષ્ફળતા: બીજી વાર ચાલુ કરતાં તરત error

**લક્ષણ:** `dsh --profile superagent` બીજી વાર ચલાવતાં startup નિષ્ફળ. **નિદાન:** `lockSync` પહેલી process નો lock જુએ છે. `scripts/dsh-superagent status` ચાલતી process બતાવે છે (script પોતે duplicate instances નકારે છે). ⚠️ `proper-lockfile` નો exact error text અમે જોયો નથી. **સુધારો:** ચાલતી process ને `stop` કરો; lock file હાથે delete ન કરો.

<a id="saar"></a>

## ✅ સાર

| 🎬 ઘટના | 💻 નિયમ | 🔬 તૂટે તો |
|---|---|---|
| તિજોરીની એક જ ચાવી | Lock, પછી Store | બે migrations, બગડેલો database |
| Extension ની યુક્તિ | Engine છેલ્લે; Executor/Assessor ને getter | Circular construction |
| ઘંટડીઓ | Events → notices, transaction ની અંદર; `quiet` | પોતાના કામની પોતાને જાણ |
| દરવાજો ક્યારે ખૂલે | HTTP → setup → sessions → resume → loops | Setup નિષ્ફળ, અને સુધારવાનું UI નથી |
| ઘડિયાળ | 2 s pass; coalescing | બે passes એક સાથે |
| સાંજે તાળું | ઊલટો ક્રમ; `keepInbox`; lock છેલ્લે | અડધો લખાયેલો ચોપડો ખૂલે |

**યાદ-ચાવી:** "તાળું-ચોપડો-ટેબલ-બારી-ચાવી-ચૂલા-ઘડિયાળ" (lock, Store, wiring, HTTP, setup, resume, loops).

<details><summary>કાર્ડ 1: `registerHttp` setup પહેલાં કેમ?</summary>

Setup નિષ્ફળ જાય તો પણ operator panel/API વડે સમસ્યા સુધારી શકે.
</details>

<details><summary>કાર્ડ 2: Shutdown માં `keepInbox: true` કેમ?</summary>

પહોંચાડેલી પણ ન લેવાયેલી inputs DSH inbox માં રહે, જેથી restart પછી ખોવાય નહીં.
</details>

## 🧠 Mastery check

1. `DshExecutor` ને Engine getter તરીકે કેમ મળે છે? Constructor માં વાપરે તો શું થાય?
2. "Setup અધૂરો" ને crash ને બદલે state કેમ બનાવ્યો?
3. દસ Triggers એક સાથે આવે તો કેટલા passes ચાલે?
4. Database બંધ થાય તે **પહેલાં** lock કેમ ન છોડવો?

જવાબો: [પરિશિષ્ટ D](../appendix/D-lab-solutions.md#પ્રકરણ-3).

## 🎬 આગળ શું

ડેસ્ક ખૂલી ગયો, ઘડિયાળ ચાલે છે. પહેલી ચિઠ્ઠી આવે છે, અને પાંચ મિનિટ પછી છોટુ **એ જ ચિઠ્ઠી** ફરી લાવે છે. સવિતાબેન: "આ તો આવી ગઈ!" છોટુ: "મને શું ખબર?" → [પ્રકરણ 4](04-sources-intake.md)
