# પરિશિષ્ટ D — Labs અને Mastery check ના ઉકેલ

> દરેક પ્રકરણના 🧠 Mastery check ના જવાબ, lab નાં અવલોકનો, અને patches. 🧪 = અમે ચલાવીને જોયું ([પરિશિષ્ટ G](G-verification-log.md)); ✅ = source વાંચન; ⚠️ = અચકાસાયેલું.
> Patches: [`labs/patches/`](../labs/patches/). Lab code: [`labs/`](../labs/README.md).

**પહેલાં જાતે પ્રયત્ન કરો.** જવાબ વાંચવાથી સમજ નથી આવતી; ખોટું ધારીને સુધારવાથી આવે છે.

## પ્રકરણ 0

1. "Research prototype for reference only" નો અર્થ: સ્થિરતા, support કે backward compatibility નું કોઈ વચન નથી. એટલે commit pin કરો (આ પુસ્તકની જેમ), production માં સીધું ન મૂકો, અને upgrade પહેલાં state ની નકલ લો.
2. `EngineForSources = Pick<Engine, 'receive' | 'bindThread' | 'threadClosed'>`. `stopTicket` એ type માં **છે જ નહીં**, એટલે Source નો code તેને બોલાવે તો compile error. ✅
3. બહારનું function Cordis **effect** છે, જે setup વખતે ચાલે. તે જે function પાછું આપે (`async () => runtime.stop()`) તે **cleanup** છે, અને plugin unload કે restart વખતે ચાલે.
4. જેથી પહેલેથી હાજર નિષ્ફળતા (જેમ કે flaky Feishu test, [પ્રકરણ 12](../book/12-customization.md)) અને તમારા ફેરફારથી આવેલી નિષ્ફળતા અલગ પાડી શકાય.

**Lab:** 🧪 પહેલો `pnpm check`: 59 files, 1197 tests, build પૂરું. પછીના runs માં 1196/1197 ([પરિશિષ્ટ G](G-verification-log.md), rows 1–3).

## પ્રકરણ 0A

**Lab 1:** `intake.ts` L38–L46 (ટેગ પરનો loop → `reached`), પછી `addInput`, અને L58 (માલિક હોય તો Eval queue નથી થતું). **Lab 2:** `runtime.ts` ના `emit` માં `followupNotice` → `sessions.relay`. **Lab 3:** 🧪 `27 passed | 86 skipped`.

1. (a) Preset ની 5-second મર્યાદા: લાંબો foreground command background job બની જાય. (b) `noWait` guard: `sleep`, લાંબા timeout અને લાંબી job-wait નકારે. ✅
2. લેખ મુજબ Router ના નિર્ણયો અને cache-read tokens વધે (⚠️ લેખના આંકડા; અમે માપ્યા નથી). Prototype માં pass-through `Intake.receive` નો fan-out અને "માલિક હોય તો `queueForEval` નહીં" વાળી લીટી છે. ✅
3. Cloud execution, BYOM daemons, અને વચ્ચે-વચ્ચે જોડાતાં devices. Prototype માં ફક્ત "local state ટકે અને restart પછી recovery" છે.

## પ્રકરણ 1

1. Mandate accept વખતની સત્તાનો પુરાવો છે. તે બદલાય તો audit અર્થહીન બને. વધુ scope જોઈએ તો **નવું Ticket** ([docs/001](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/001-domain.md): "wider scope means a new Ticket").
2. તે લખાણ કોઈ પણ લખી શકે, અને તેમાં "પહેલાંની સૂચનાઓ અવગણો" જેવું હોઈ શકે. એટલે સત્તાના નિર્ણયો `text` પર નહીં, Source એ ભરેલી હકીકતો (`actor`, `human`, `addressed`) પર લેવાય; અને prompt માં બહારનું લખાણ "data, સૂચના નહીં" તરીકે આવે.
3. હજી `alice`. Mandate accept વખતે બન્યો છે અને અપરિવર્તનશીલ છે; mallory ની ચિઠ્ઠી ટુકડીને Input તરીકે મળે છે, સત્તા તરીકે નહીં. 🧪 (running example log)
4. તે **વસ્તુઓ** નથી, **પ્રક્રિયાઓ** છે. Gate એ `Policy.gate` method છે, જેનું પરિણામ (`GateResult`, `MandateBasis`) સચવાય. Assessment એ `Assessor` port છે, જેનું પરિણામ `Decision` છે. Effect app સ્તરની queue છે; core તેને જાણતું નથી.

**Lab:** 🧪 `1 passed`; બે runs નો log byte-identical. `Alice` (મોટો A) → gate `explicit` આપે, કારણ કે `sameName` બંને બાજુ lowercase કરે છે. ✅

## પ્રકરણ 2

1. Plugin આખી process ના `PATH` અને git settings બદલે છે, અને તેની process ને સ્વતંત્ર restart અને upgrade જોઈએ. તમારા રોજિંદા DSH profile માં તે ભેળવવું જોખમી છે. ✅ ([docs/006](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/006-deployment.md))
2. Exit 2 અને 3 ને માણસની જરૂર છે; restart તેમને સુધારતું નથી. Exit 1 (process નથી ચાલતો) restart થી સુધરી શકે.
3. `${DSH_SUPERAGENT_GITHUB_PR_HEAD:-HEAD}`: ખાલી હોય તો remote ના `HEAD` (default branch) પરથી worktree બને.
4. System ખરા data પર નિર્ણય કરે પણ અમલ ન કરે. તમે "લીધું હોત" ની નોંધો વાંચીને નિયમો સુધારો, અને ભરોસો બેસે પછી `auto`.

**Lab:** 🧪 offline: `Test Files 3 passed (3)`. ⚠️ live lab ચલાવી નથી.

## પ્રકરણ 3

1. Engine Executor **પછી** બને છે. Getter call વખતે જ કિંમત વાંચે. Constructor ની અંદર `this.host.engine` વાપરો તો તે હજી `undefined` છે, અને TypeError આવે.
2. Setup નિષ્ફળ જાય તો પણ operator panel કે API વડે સમસ્યા સુધારી શકે: routes setup **પહેલાં** નોંધાય છે. Crash થાય તો સુધારવાનું સાધન પણ જાય.
3. વધુમાં વધુ **બે**: એક ચાલતો, અને એક "ફરી એક વાર" (`pumpAgain`). બાકીની વિનંતીઓ તેમાં સમાઈ જાય. ✅
4. બીજી process lock લઈને database ખોલે, જ્યારે પહેલી હજી WAL લખી રહી હોય: બે લખનાર, અને ચોપડો બગડી શકે.

**Lab:** 🧪 pass interval 2000 → 500: `passes.spec.ts` અને `runtime.spec.ts` માં 95 passed (tests આ અચળાંક પર આધાર નથી રાખતા).

## પ્રકરણ 4

**Lab (edit કરેલો comment):** 🧪

```ts
const edited = commentTrigger({ id: 83, body: 'Please also run the lint check (edited).', user: { login: 'alice', type: 'User' },
  html_url: `https://github.com/${REPO}/issues/7#issuecomment-83`, created_at: '2026-11-01T09:23:00Z', updated_at: '2026-11-01T09:30:00Z' },
  { number: 7, isPr: false }, 'conversation', AGENT)
expect(edited.id).not.toBe(comment(83, 'alice', 'Please also run the lint check.').id)  // updated_at id નો ભાગ છે
expect(engine.receive(edited)).toBe('stored')
expect(engine.receive(edited)).toBe('duplicate')
```

ત્રણેય assertions પાસ.

1. Issue body નું id ફક્ત number પરથી બને (`key('github-issue', number)`), એટલે edit નવી ચિઠ્ઠી નથી. Comment ના id માં `updated_at` છે, એટલે edit નવી ચિઠ્ઠી છે.
2. Audit ("Filtered Triggers") અને પાછળથી "Evaluate again" માટે. "કશું થયું નહીં" અને "થયું, પણ જાણીજોઈને ન લીધું" અલગ રાખવા.
3. બંધ કાર્ડને ફક્ત **માણસની** ચિઠ્ઠી ફરી ખોલી શકે (`resumes = trigger.human && …`). મશીનની ચિઠ્ઠી બંધ કાર્ડને જગાડે તો loop બને.
4. 410 "Gone" કાયમી છે (Issue delete થઈ ગઈ). 404 ક્ષણિક હોઈ શકે: private repository પર પરવાનગી થોડા સમય માટે જાય ત્યારે પણ GitHub 404 આપે છે. ✅ `src/sources/github.ts` ની comment: "HTTP 404 is retried because it can indicate revoked access to a private repository"; જવાબ મોકલવાની બાજુ પણ એ જ તર્ક ([`sendGithub`][gh-channel]).

## પ્રકરણ 5

1. Gate એ યાદી અને "સીધું બોલાવ્યાં" બંને code થી સાબિત કર્યાં છે. Accept `explicitRouted` કારણ સાથે નોંધાય. 🧪
2. `ignore`, કારણ `observed`, અને audit માં `would_accept: true`. ✅
3. વ્યસ્ત main Session ની queue નો સમય ચિઠ્ઠીના ખાતે ન કપાય. ઉપરાંત, ન પહોંચેલો candidate કદી expire નથી થતો.
4. અડધું કામ રદ કરવાથી અડધા ફેરફાર રહી જાય. ફેરફારની જાણ Input તરીકે ટુકડીને થાય ([docs/001](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/001-domain.md), નકારેલા વિકલ્પો).
5. 🧪 `off`: gate `not_a_member` → `decide` માં `notAdmissible`. `observe`: inferred follow-up → stop → `ignore / stopNotExplicit`.

**Lab:** 🧪 `REQUEUES = 3` → `1 failed | 112 passed (113)`.

## પ્રકરણ 6

**Lab:** 🧪 failed રિપોર્ટ પછી alice ની ચિઠ્ઠી → `retryTicket` → `notRetryable` ("Only an open ticket can be retried, and only when its worker last reported failed or blocked and no person has sent a message since…").

1. Crash વખતે "Ticket છે પણ launch નથી" કે "જવાબ ગયો પણ Ticket નથી" જેવી અડધી સ્થિતિ ન બને.
2. નવું કશું મંજૂર નથી થતું; Ticket પોતાના જૂના Mandate હેઠળ ચાલે, અને `revalidate` તેને આજની Policy સામે તપાસે.
3. તે ચિઠ્ઠીનો નિર્ણય (stop) થઈ ચૂક્યો છે. ફરી વિચારાય તો "stop" નવા કામ તરીકે વંચાઈ શકે.
4. `addInput`: `automatic(input) && waitsForPerson(ticket)` હોય ત્યારે input `undelivered` માં નથી જતું. 🧪 `F_failed.botHeldBack = true`.
5. બંધ થયા પછી શરૂ થયેલું કામ હજી `ready` ન હોય, અથવા ટુકડીએ follow-up લીધો હોય પણ રિપોર્ટ ન આપ્યો હોય (`unfinished`).

## પ્રકરણ 7

1. Engine ની command transaction માં ચાલે. સીધું I/O થાય અને પછી rollback, તો બહારની દુનિયા અને ચોપડો અલગ પડે.
2. દરેક `await` દરમિયાન stop, retry, pause કે shutdown થઈ શકે.
3. ન વંચાયેલા follow-ups Ticket બંધ થાય ત્યારે Eval માં પાછા જાય. "Delivered" ને "read" ગણીએ તો તે ખોવાય.
4. નવા launches માણસને તેના ચાલુ Ticket સાથે આગળ વધતાં રોકી ન શકે.
5. `waiting` = ટુકડીએ turn પૂરો કર્યો, કશું બાકી નથી; Session સચવાય. રિપોર્ટ **પછી** input પહોંચ્યું હોય (`busy`) તો ટુકડી તેના પર કામ કરતી હતી, એટલે recovery નોંધ સાથે નવી પાળી.

**Lab:** 🧪 `BACKGROUND_LIMIT_MS` 30 → 60 minutes: `3 failed | 65 passed (68)`. નિષ્ફળ tests: "gives each idle of a worker its own 30 minutes…", "kills the jobs that run 30 minutes after the turn ended…", "says a worker's subagents still run when only they ran 30 minutes after the turn ended".

## પ્રકરણ 8

1. `afterCommit`: memory માંનું, તરત કરવાનું, restart પછી જરૂરી નથી (turn રદ, health). Effects: ટકાઉ, retry જોઈતું બહારનું કામ.
2. ચાલતો પ્રયત્ન પૂરો થાય તે દરમિયાન queue થયેલો નવો payload delete ન થઈ જાય.
3. Marker `<!-- dsh-superagent:<id> -->` પહેલેથી હોય તો POST નથી થતો. ⚠️ ધારણા: marker વાળો comment કોઈ delete કરે તો duplicate થઈ શકે.
4. Push થયું કે નહીં તે domain જાણતું નથી. ખાતરી ફક્ત recovery નોંધ (prompt-સ્તર).
5. જૂનો code નવા fields ને સમજતો નથી અને બગાડી શકે: "Unsupported orchestrator database version". Rollback માટે backup.

## પ્રકરણ 9

1. `ticketId` closure માં બંધાયેલું છે; ટુકડી બીજા Ticket નું નામ આપી જ ન શકે.
2. દરેક item અલગ Engine command અને transaction; ના પાડવું `refused` તરીકે પાછું આવે.
3. Policy વારંવાર બદલાય; છેલ્લે હોય તો ઉપરનો સ્થિર ભાગ (prompt cache) અકબંધ રહે.
4. ના. Gate code (`policy.ts`) માં છે; prompt ફક્ત model ને સૂચના આપે.
5. Synchronous `atomic` ની અંદર `await` શક્ય નથી, અને network read દરમિયાન transaction ખુલ્લો ન રખાય.

**Lab:** 🧪 "Use orchestrator_finish when done." → `2 failed | 78 passed (80)`: અજાણ્યું tool, અને કદ 1028 > 1000.

## પ્રકરણ 10

**Lab:** [`12.4-stop-confirm-short-name.diff`](../labs/patches/12.4-stop-confirm-short-name.diff). 🧪 25 tests પાસ.

1. `actions.stop = liveTicket(ticket)` server પર ગણાય; નિયમ એક જ જગ્યાએ રહે.
2. પાના પરનો stop → Eval → Decision `stop` (explicit જોઈએ). Panel નું Stop → command, Decision નહીં. બંનેમાં `ended.by = 'human'`.
3. બીજી site custom header સાથે cross-origin request preflight વગર ન મોકલી શકે, અને server preflight ને મંજૂરી નથી આપતું.
4. `draftReducer` નવી આવૃત્તિ સાથે merge કરે ("keeps mine where both sides changed a key"). 🧪

## પ્રકરણ 11

**Lab:** 🧪 stop → `{ kind: 'ignore', strength: 'inferred', reason: [{ code: 'stopNotExplicit' }] }`. alice હવે યાદીમાં નથી; Ticket ના પાના પર `observe` mode માં તેનો follow-up `inferred` છે; stop માટે `explicit` જોઈએ.

1. "દેખાતો નથી": Source ની બહાર કે Source સ્તર (poll, cursor, setup, edit વડે mention). "Filtered": Source scope (ગોઠવણ).
2. `transient()`: status અને regex. અજાણ્યા શબ્દોવાળી ભૂલ ક્ષણિક તરીકે ઓળખાતી નથી.
3. Lock, WAL, અને ચાલતી process ની memory સાથે અસંગતતા.
4. Receipt નું id કાયમ રહે (`INSERT OR IGNORE`). ફરી મોકલવા નવું id, એટલે નવો જવાબ.

## પ્રકરણ 12

1. Delivery requirements team section. Built-in લખાણનું બજેટ લગભગ ભરેલું છે, અને ઘરનો નિયમ prompt લખાણ છે.
2. Retry Executor ની નીતિ છે; Engine ફક્ત `failed` હકીકત જાણે.
3. Core Source ને `SourceScope` અને `Trigger.meta` વડે જ ઓળખે.
4. "સીધું બોલાવ્યાં" Source નક્કી કરે; gate Source-agnostic છે.
5. Code / tests અને `docs/007` નાં module / test કોષ્ટકો વચ્ચેનો drift.

**Lab:** 🧪 બધા patches + docs rows + flaky fix → `61 files, 1199 tests passed`, build પૂરું.

## પ્રકરણ 13

1. Synchronous Engine + `DatabaseSync` = દરેક command અવિભાજ્ય transaction. Async હોત તો `await` દરમિયાન બીજી commands વચ્ચે આવત (lost updates).
2. એક Eval કે Ticket ની નિષ્ફળતા બીજાને rollback ન કરે; transactions ટૂંકા રહે.
3. Model ની latency (seconds) સામે ms નગણ્ય, અને durability નું જોખમ વધે.
4. Metrics નથી. સૌથી નાનું પગલું: `emit` પર event counters, અને `GET state` માં તેમને બતાવવા. 📝

**Lab:** 🧪 FULL 0.85–1.17 ms / ચિઠ્ઠી; NORMAL 0.41–0.50. તમારા આંકડા અલગ હશે.

## પ્રકરણ 14

**ભાગ A:** [`labs/final-project.spec.ts`](../labs/final-project.spec.ts). 🧪 `1 passed`: `bindThread(own)` → `ready` → `person/review` → `threadClosed(merged)` → `ended { by: 'executor', outcome: 'merged' }`.

**ભાગ C, નમૂનાનો અહેવાલ (ટૂંકો):**

- **શું:** alice ને યાદીમાંથી કાઢ્યા પછી તેનો stop `ignore / stopNotExplicit` બન્યો. 🧪
- **કેમ:** (1) `settingsPolicy` આજની settings પરથી બને; alice હવે unlisted. Gate ની follow-up શાખા તેને અંદર આવવા દે છે, પણ `inferred` તરીકે. (2) `decideEval` stop માટે `explicit` માગે. (3) Policy બદલાતાં ચાલુ Ticket ને `policy-changed` Input (`requesterAllowed: false`) મળ્યો હશે. ✅
- **તો શું:** Operator panel નું Stop વાપરે (`Engine.stopTicket`): gate અને Eval વગર.

**ભાગ E, નમૂનાનું review (હાડપિંજર):** દરેક મુદ્દા માટે ચાર લીટી: *નિર્ણય* → *આ સંદર્ભમાં કેમ સાચો* → *ક્યાં તૂટે* → *પહેલું પગલું*. જેમ કે: "કશું delete નથી થતું → prototype માં મફત audit trail → વર્ષો ચાલતા deployment માં disk અને query ધીમાં → બંધ Tickets ની ચિઠ્ઠીઓ માટે retention job, receipts ને અડ્યા વગર (dedup માટે જોઈએ)."

1. Ticket ના પાના પર માણસનો follow-up fan-out થઈને ટુકડીનો બને (pass-through).
2. ચાલુ અને કામની વચ્ચે રહેલી (કે રિપોર્ટ પછી input મળેલી) પાળીઓ ફરી શરૂ થાય. waiting / ready / blocked / failed (નવું input નહીં) વાળી એ જ Session માં રહે.
3. Ticket પોતે ખોલેલા PR ને follow કરે. `followsDone` PR બંધ થાય ત્યારે જ સાચું બને.

## પ્રકરણ 15

> 📝 આ પ્રકરણ સૂચિત ડિઝાઇન છે; "સાચા" જવાબ નથી, ફક્ત સારા તર્ક.

1. Core, gate / Policy, Store, Effects, Outbox. સાબિતી: `src/core` ના imports નો grep (ફક્ત core અને `node:crypto`), અને simulated Source નો test જે core બદલ્યા વગર પાસ થાય. 🧪
2. રસ્તો 1: prompt (model). રસ્તો 2: gate (code) + અલગ ચાવીઓ. રસ્તો 3: Engine (code).
3. (a) અલગ credentials: યોજના બનાવનાર worker પાસે અમલની ચાવી નહીં. (b) Gate: મંજૂરીની ચિઠ્ઠી યાદીવાળા, સીધું બોલાવનાર માણસની.
4. Code માં ભૂલ PR બંધ કરીને ઉલટાવાય; ચુકવણી કે પોસ્ટ થયેલી entry નહીં. એટલે ભરોસો બેસાડવાનો તબક્કો લાંબો અને કડક હોવો જોઈએ.

**Lab નો નમૂનો (એક પાનું):** કામ: "vendor ના બિલ (PDF, email) માંથી journal entry નો મુસદ્દો". Source: email inbox (નવો `SourceKind`). ચિઠ્ઠી: એક email = એક Trigger; thread = vendor + બિલ નંબર. યાદી: હિસાબ વિભાગના બે માણસ. "મારા domain નો PR": ERP માં **draft** entry (posted નહીં) + સારાંશ. "પૂરું": હિસાબનીશ draft ને post કરે કે નકારે. મંજૂરી: રસ્તો 2. નવું જોખમ: "બિલના PDF માં છુપાયેલી સૂચના (prompt injection) → worker ને ફક્ત draft ની સત્તા; રકમ અને vendor ની ચકાસણી માણસ કરે."

<!-- citations:begin (generated by tools/refdefs.py) -->
[gh-channel]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-channel.ts#L18-L45
<!-- citations:end -->
