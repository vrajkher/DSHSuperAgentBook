# પરિશિષ્ટ E — Exercises ના ઉકેલ અને example patches

[← અનુક્રમણિકા](../README.md)

Patches [`examples/patches/`](../examples/patches/) માં છે. જ્યાં "[Test ચલાવ્યો]" લખ્યું છે ત્યાં પરિણામ pinned commit પર observed છે ([પરિશિષ્ટ F](F-verification-report.md)).

## પ્રકરણ 0

1. `dependencies` (zod, proper-lockfile) bundle સાથે install થાય છે. `peerDependencies` (`@deepseek-ai/*`) DSH host પૂરી પાડે છે, જેથી host અને plugin એક જ Cordis/DSH instance વાપરે. Plugin પોતાની copy લાવે તો services નું injection તૂટી જાય.
2. `EngineForSources = Pick<Engine, 'receive' | 'bindThread' | 'threadClosed'>`. `stopTicket` એ type માં જ નથી, એટલે Source code તેને બોલાવી શકતો નથી (compile error).
3. બહારનું function એ Cordis **effect** છે, જે setup વખતે ચાલે છે. તે જે function પાછું આપે છે (`async () => runtime.stop()`) તે **cleanup** છે, અને plugin unload/restart વખતે ચાલે છે.
4. TypeScript types compile પછી અદૃશ્ય થઈ જાય છે. Saved JSON, HTTP body અને model tool arguments runtime પર આવે છે, એટલે તેમની તપાસ પણ runtime પર (`zod`) જ થઈ શકે.

## પ્રકરણ 0A

**Exercise 1:** `intake.ts#L38-L45` (subscriptions loop → `reached`), L49-L52 (`addInput`), L58 (owners હોય તો Eval queue થતું નથી). **2:** `runtime.ts#L144-L146`: `followupNotice` → `sessions.relay`. **3:** "follow-up" filter માં 27 tests pass થાય છે. ઉદાહરણ: "decides a follow-up in a gate-only Eval beside the Eval its Thread has in progress".

1. 5-second foreground → background shell (preset `timeoutMs: 5000`), અને `noWait` guard (`sleep`, >30 s timeout, >5 s job wait નકારે છે).
2. લેખ મુજબ Router ના decisions અને cache-read tokens વધે છે (+30% decisions, +37% tokens). Prototype માં `Intake.receive` નો fan-out + `followupOwners` (L58) pass-through છે.
3. Cloud execution, BYOM daemons અને intermittent devices **નથી**. Restart scenario ફક્ત "state persistence + recovery" દર્શાવે છે (§5.1 નો local ભાગ).

## પ્રકરણ 1

1. Mandate accept વખતે authorization નો પુરાવો છે. તે બદલાય તો audit અર્થહીન બને. વધુ scope જોઈએ તો **નવો ticket** બને છે (`docs/001`: "wider scope means a new Ticket").
2. Ticket અનેક Assignments (retry, restart, resume) થી પસાર થાય છે, અને "Ticket state that follows the DSH Session" rejected concept છે. Executor ની ભૂલ ticket ની ઓળખ બદલી ન શકે.
3. Routing Subscriptions કરે છે. Correlation ફક્ત "related evidence" છે. તે route કરે તો એક Trigger અનેક Evals માં જાય, અને duplicate tickets બને.
4. તે નક્કી કરે છે કે follow-up નો નિર્ણય **કોણ** કરે છે: worker (owner) કે Eval. Owner હોય ત્યારે main Session ફક્ત stop કરી શકે.

## પ્રકરણ 2

1. dsh-superagent agent account ની **notifications** વાંચે છે; GitHub Apps ને user notifications હોતી નથી (`docs/006`).
2. Plugin process-wide `PATH` અને git settings બદલે છે, અને તેની process ને સ્વતંત્ર restart/upgrade જોઈએ (`docs/006` "What runs").
3. Exit 2/3 ને માણસની જરૂર છે, અને restart તેમને ઠીક કરતું નથી. Exit 1 restart થી ઠીક થઈ શકે છે.
4. `${DSH_SUPERAGENT_GITHUB_PR_HEAD:-HEAD}`: ખાલી હોય તો remote ના `HEAD` (default branch) પરથી worktree બને છે.

## પ્રકરણ 3

1. Setup fail થાય તો પણ operator panel/API વડે સમસ્યા સુધારી શકે, એટલે routes setup પહેલાં register થાય છે.
2. Engine Executor પછી બને છે; getter call વખતે જ value વાંચે છે. Constructor ની અંદર `this.host.engine` બોલાવો તો તે `undefined` છે, અને TypeError આવે.
3. પહોંચાડેલાં પણ ન લેવાયેલાં inputs DSH inbox માં રહે છે. Restart પછી launch તેમની જૂની copy દૂર કરે છે અને delivery ફરી કરે છે (`requeueUntaken` + `inbox.remove`), એટલે messages ખોવાતા નથી કે duplicate થતા નથી.
4. બીજી process lock લઈ લે અને WAL/DB અડધા લખાયેલા હોય ત્યારે ખોલે, તો migration અથવા writes અથડાઈ શકે.

## પ્રકરણ 4

**Modification (edited comment):** running example માં step E પહેલાં:

```ts
const edited = commentTrigger({ id: 83, body: 'Please also run the lint check (edited).', user: { login: 'alice', type: 'User' },
  html_url: `https://github.com/${REPO}/issues/7#issuecomment-83`, created_at: '2026-11-01T09:23:00Z', updated_at: '2026-11-01T09:30:00Z' },
  { number: 7, isPr: false }, 'conversation', AGENT)
expect(edited.id).not.toBe(comment(83, 'alice', 'Please also run the lint check.').id)  // version (updated_at) is part of the id
expect(engine.receive(edited)).toBe('stored')
expect(engine.receive(edited)).toBe('duplicate')
```

**[Test ચલાવ્યો]** આ ત્રણેય assertions pass થાય છે (running example ની temporary copy માં).

1. Overlap થી એક જ item બે વાર વંચાય છે. Content-derived ids (`key(...)`) ને કારણે બીજી વાર `duplicate` મળે છે, અને કશું લખાતું નથી.
2. Audit ("Filtered Triggers" panel) અને પાછળથી "Evaluate again" માટે.
3. Bot નો message ticket ને context તરીકે પહોંચવો જોઈએ (દા.ત. CI result). પણ bot ક્યારેય follow-up owner નથી (`followupOwners` → `[]`), એટલે listed bot candidate બની શકે તે માટે તે Eval માં પણ જાય છે.
4. Eval એક જ જગ્યાએ (primary Thread પર) ચાલે તો duplicate Decisions થતા નથી. Correlation ફક્ત context આપે છે.

## પ્રકરણ 5

1. Gate એ પહેલેથી allowed + addressed સાબિત કર્યું છે. Accept `explicitRouted` reason સાથે નોંધાય છે.
2. `ignore`, reason `observed` ("Observe mode: would accept (…)"), અને audit માં `would_accept: true` + proposal.
3. Busy main Session ની queue નો સમય Eval ના budget માં ગણાય નહીં. ઉપરાંત "an undelivered candidate never expires".
4. અધૂરું કામ cancel થાય તો અધૂરા ફેરફારો રહી જાય. ફેરફાર Input તરીકે worker ને પહોંચાડાય છે (`docs/001` rejected concepts).
5. **[Test ચલાવ્યો]** `off`: gate `not_a_member` → `decide` → `notAdmissible` UserError. `observe`: inferred follow-up → stop → `ignore/stopNotExplicit`.

## પ્રકરણ 6

**Modification:** failed report પછી alice નો message → `retryTicket` → **[Test ચલાવ્યો]** `notRetryable` ("Only an open ticket can be retried, and only when its worker last reported failed or blocked and no person has sent a message since…").

1. Crash વખતે "ticket છે પણ launch નથી" અથવા "ack ગયું પણ ticket નથી" જેવી સ્થિતિ ન આવે.
2. નવું કશું authorize થતું નથી; ticket પોતાના જૂના Mandate હેઠળ ચાલે છે (`revalidate` તપાસે છે).
3. તે message નો નિર્ણય (stop) થઈ ગયો છે. તેને ફરી evaluate કરીએ તો તે નવું કામ બનાવી શકે. Main Session ઇચ્છે તો બાકીનો ભાગ નવા કામ તરીકે accept કરી શકે છે.
4. `addInput` `automatic(input) && waitsForPerson(ticket)` હોય ત્યારે input ને `undelivered` માં મૂકતું નથી; માણસના message ની રાહ જોવાય છે.
5. Close પછી શરૂ થયેલું કામ `ready` ન હોય, અથવા worker એ follow-up લીધો હોય પણ પછી report/turn end ન થયો હોય (`unfinished`).

## પ્રકરણ 7

1. Engine command transaction માં ચાલે છે. સીધું I/O થાય અને પછી rollback થાય, તો બહારની દુનિયા અને DB અસંગત બને.
2. દરેક `await` દરમિયાન stop, retry, pause અથવા shutdown થઈ શકે છે.
3. ન વંચાયેલા follow-ups ticket પૂરો થાય ત્યારે Eval માં પાછા જાય છે. "Delivered" ને "read" ગણીએ તો તે ખોવાઈ જાય.
4. નવા launches માણસને ચાલુ ticket સાથે આગળ વધતાં રોકી ન શકે (`docs/003` Concurrency).
5. `waiting` = worker એ turn પૂરો કર્યો અને કંઈ બાકી નથી; session સચવાય છે. Report પછી input પહોંચ્યું હોય (`busy`) તો worker તેના પર કામ કરતો હતો, એટલે recovery note સાથે ફરી શરૂ થાય છે.

## પ્રકરણ 8

1. `afterCommit`: in-memory, તરતની, restart-insensitive ક્રિયા (cancel, health). Effects: durable, retry જોઈતી બાહ્ય ક્રિયા.
2. ચાલુ attempt પૂરો થાય તે દરમિયાન queue થયેલો નવો payload delete ન થાય.
3. Marker `<!-- dsh-superagent:<id> -->` પહેલેથી હોય તો POST થતો નથી. કોઈ marker વાળો comment delete કરે, અથવા અનેક pages ધરાવતી list read ખોટો જવાબ આપે, તો duplicate થઈ શકે. **[ધારણા]**
4. Push થયું કે નહીં તે domain જાણતું નથી; ફક્ત recovery note.
5. Newer schema ના fields જૂનો code સમજી શકતો નથી; `Unsupported orchestrator database version`. Rollback માટે backup.

## પ્રકરણ 9

1. `ticketId` closure માં બંધાયેલું છે, એટલે worker બીજા ticket પર કાર્ય કરી શકતો નથી.
2. દરેક item અલગ Engine command અને transaction છે; refusal ને `refused` તરીકે પાછું આપવામાં આવે છે.
3. Policy વારંવાર બદલાય છે; છેલ્લે હોય તો ઉપરનું stable prefix (prompt cache) બદલાતું નથી.
4. ના. Gate code (`policy.ts`) માં છે; prompt ફક્ત model ને સૂચના આપે છે (`docs/004`).
5. Network await દરમિયાન SQLite transaction ખુલ્લો ન રહે; synchronous `atomic` ની અંદર await થઈ શકતું નથી.

## પ્રકરણ 10

**Modification:** [`12.4-stop-confirm-short-name.diff`](../examples/patches/12.4-stop-confirm-short-name.diff). **[Test ચલાવ્યો]** 25 tests pass.

1. `actions.stop = liveTicket(ticket)` server પર ગણાય છે; domain નો નિયમ એક જ જગ્યાએ રહે છે.
2. Thread નો stop → Eval → Decision `stop` (explicit જોઈએ). Panel Stop → command, Decision નહીં; બંનેમાં `ended.by = 'human'`.
3. બીજી site custom header સાથે cross-origin request preflight વગર મોકલી શકતી નથી, અને server preflight ને મંજૂરી આપતું નથી.
4. `draftReducer` newer revision સાથે merge કરે છે ("keeps mine where both sides changed a key").

## પ્રકરણ 11

**Independent task:** **[Test ચલાવ્યો]** stop → `{ kind: 'ignore', strength: 'inferred', reason: [{ code: 'stopNotExplicit' }] }`. Alice હવે unlisted છે. Ticket ના Thread પર follow-up, `observe` mode માં, `inferred` બને છે; stop માટે explicit જોઈએ.

1. "દેખાતો નથી": Source layer (poll, cursor, setup, edit-mention). "Filtered": Source scope (configuration).
2. `transient()`: status/regex. Provider નો અજાણ્યો text transient તરીકે ઓળખાતો નથી.
3. Lock, WAL અને ચાલતી process ના caches સાથે અસંગતતા થઈ શકે.
4. Receipt નું id કાયમ રહે છે (`INSERT OR IGNORE`). ફરી મોકલવો હોય તો નવું id (નવો message) જોઈએ, દા.ત. worker/main Session નવો reply આપે.

## પ્રકરણ 12

1. Delivery requirements team section: built-in text નું budget લગભગ પૂરું છે, અને team નિયમ prompt text છે.
2. Retry એ Executor ની policy છે; Engine ફક્ત `failed` fact જાણે છે.
3. Core Source ને `SourceScope` અને `Trigger.meta` વડે જ જાણે છે (ports).
4. "Addressed" Source નક્કી કરે છે (`docs/002`); gate Source-agnostic છે.
5. Code/tests અને `docs/007` ના module/test tables વચ્ચેનું drift.

## પ્રકરણ 13

1. Synchronous Engine + `DatabaseSync` = દરેક command એક અવિભાજ્ય transaction. Async હોત તો await દરમિયાન બીજાં commands interleave થાત (lost updates).
2. એક Eval/ticket ની failure બીજાને rollback ન કરે, અને લાંબા transactions ન બને.
3. LLM latency (seconds) ની સરખામણીમાં ms નગણ્ય છે, અને durability નું જોખમ વધે છે.
4. Metrics નથી. સૌથી નાનું પગલું: `emit` માં event counters, અને `GET state` માં expose કરવા.

## પ્રકરણ 14

**ભાગ A extension:** [`examples/final-project.spec.ts`](../examples/final-project.spec.ts). **[Test ચલાવ્યો]** `1 passed`: `bindThread(own)` → `ready` → `person/review` → `threadClosed(merged)` → `ended { by: 'executor', outcome: 'merged' }`.

1. Ticket ના Thread પર માણસનો follow-up fan-out થઈને worker નો બને છે (pass-through).
2. Running અને mid-work (અથવા report પછી input મળ્યું હોય તેવાં) Assignments ફરી શરૂ થાય છે. waiting/ready/blocked/failed (નવું input નહીં) વાળાં તે જ session માં રહે છે.
3. Ticket પોતે ખોલેલો PR follow કરે છે. `followsDone` PR બંધ થાય ત્યારે જ સાચું બને છે, અને ત્યાં સુધી stage "Awaiting review" રહે છે.
