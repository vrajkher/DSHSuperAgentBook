# પ્રકરણ 12 — Customization

[← પ્રકરણ 11](11-debugging.md) · [અનુક્રમણિકા](../README.md) · [આગળ: પ્રકરણ 13 →](13-advanced-engineering.md)

## શીખવાનું પરિણામ અને પૂર્વજરૂરિયાત

પાંચ exercises, દરેક પાછલા કરતાં અઘરો. દરેકમાં તમે ત્રણ બાબતો નક્કી કરશો: **સાચું layer**, હાલના supported behavior પર અસર, અને verification. પ્રકરણ 1–11 જરૂરી છે.

**Layer પસંદ કરવાનો નિયમ (repository ની ફિલસૂફી મુજબ):**

```mermaid
flowchart TB
  Q{"ફેરફાર શબ્દોમાં વર્ણવી શકાય તેવું વર્તન છે?"} -->|હા| P["Team prompt section / team skill<br/>(settings, restart નહીં)"]
  Q -->|ના| S{"એક value લગભગ બધી teams ને ચાલે?"}
  S -->|ના, team પ્રમાણે બદલાય| SET["Setting (zod schema + panel field + LIMITS)"]
  S -->|હા| C{"Source-specific?"}
  C -->|હા| SRC["src/sources/<kind>* (SourceKind)"]
  C -->|ના| D{"Domain rule?"}
  D -->|હા| CORE["src/core + tests/core-engine.spec.ts + docs/00x"]
  D -->|ના| APP["src/app / src/executor / src/client"]
```

**તીરોનો અર્થ:** ઉપરથી નીચે પ્રશ્નો પૂછતા જાઓ; પહેલો "હા" જવાબ layer નક્કી કરે છે. `docs/000`: "Behaviour that a team describes in words is prompt text, not a setting", અને "A default replaces a setting when one value suits almost every team".

**[Test ચલાવ્યો]** Exercises 2, 3, 4, 5 ના patches pristine checkout પર એક સાથે apply કર્યા, અને `pnpm check` ચલાવ્યો: `Test Files 61 passed (61)`, `Tests 1199 passed (1199)`, build complete. Patches: [`examples/patches/`](../examples/patches/).

---

## 12.1 Exercise 1 — Supported setting અથવા prompt section બદલવો

**ધ્યેય:** running example માં agent દરેક PR description માં "README preview" ઉમેરે.

**સાચું layer:** **Delivery requirements** team section. Built-in `prompts/worker.md` **નહીં**: પ્રકરણ 9 માં જોયું કે worker ના instructions 1000-character budget ની નજીક છે, અને drift test તરત fail થાય છે.

**Live lab (API, [`docs/006`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/006-deployment.md) Management API):**

```bash
api=http://127.0.0.1:3082/orchestrator/api
```

```bash
curl -s -H 'x-orchestrator-request: 1' $api/prompts | jq '{revision: .current.revision, delivery: .current.config.sections.delivery}'
```

પછી `config.sections.delivery` માં એક વાક્ય ઉમેરીને `PUT prompts` `{ config, baseRevision }` કરો. **[ધારણા]** `sections.delivery` field નું exact નામ `PromptConfigSchema` ([`prompts.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/prompts.ts)) પ્રમાણે ચકાસો; live API અમે ચલાવ્યું નથી.

**અસર:** "Sessions read the latest version on every model request". Saving કોઈ session ને restart, cancel કે wake કરતું નથી (`docs/004`). Gate, Mandates અને tool checks બદલાતા નથી.

**Offline verify:**

```bash
pnpm vitest run tests/prompts.spec.ts -t "assembles every role from fixed sections around the team sections"
```

**Setting નું ઉદાહરણ:** `eval.mode: observe → auto`. **અસર:** Policy version બદલાય છે → ચાલુ Evals `unavailable(policyChanged)` થઈને requeue થાય છે. Proactive (inferred) candidates હવે tickets બની શકે છે. `docs/002` ની ભલામણ: "Start in observe and switch to auto after reviewing the recorded Decisions".

## 12.2 Exercise 2 — નાનું હાલનું behavior બદલવું

**ધ્યેય:** VPN બંધ થાય ત્યારે provider call `EHOSTUNREACH` આપે છે, અને worker તરત `failed` થઈ જાય છે. તેને transient ગણો.

**સાચું layer:** `src/executor/dsh.ts` નું `PASSING` regex. આ Executor ની retry policy છે; Engine ને retries ની ખબર નથી.

**Patch** ([`examples/patches/12.2-transient-ehostunreach.diff`](../examples/patches/12.2-transient-ehostunreach.diff)):

```diff
-const PASSING = new RegExp(['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EAI_AGAIN', …
+const PASSING = new RegExp(['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EHOSTUNREACH', 'EAI_AGAIN', …
```

અને નવો test `tests/transient.spec.ts`:

```ts
it('treats an unreachable host as a passing network failure, and a bad request as none', () => {
  expect(transient(Object.assign(new Error('connect EHOSTUNREACH 10.0.0.1:443'), { code: 'EHOSTUNREACH' }))).toBe(true)
  expect(transient({ status: 503 })).toBe(true)
  expect(transient({ status: 400 })).toBe(false)
  expect(transient(new Error('invalid prompt'))).toBe(false)
})
```

**[Test ચલાવ્યો] Red → green:** fix વગર `AssertionError: expected false to be true`; fix સાથે `1 passed`. `tests/runtime-concurrency.spec.ts` પણ pass (57 tests). **અસર:** `docs/003` ની "refused, reset or timed-out connection" યાદી હવે થોડી વધારે છે. Docs માં ઉમેરવું યોગ્ય રહેશે.

## 12.3 Exercise 3 — Simulated Source ઉમેરવો

**ધ્યેય:** documented `SourceKind` interface વડે "demo" chat Source બનાવવો, જે ફક્ત configured rooms સાંભળે અને પોતાની allowed list વાપરે.

**સાચું layer:** `src/sources/` ([`docs/008-cookbook.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/008-cookbook.md) "adding a Source"). Core ને કંઈ બદલવાની જરૂર નથી: core Source ને `SourceScope` તરીકે, અને Trigger ને `meta` સાથે, જ જાણે છે.

**Code** ([`examples/demo-source.spec.ts`](../examples/demo-source.spec.ts), real, shortened):

```ts
export const demoKind: SourceKind<DemoConfig> = {
  kind: 'demo', title: {…}, description: {…}, schema: DemoConfig, fields: [], health: ['demo'],
  scope: ({ meta }, config) => typeof meta.room === 'string' && config.rooms.includes(meta.room)
    ? { listened: true, observed: false, row: meta.room } : { listened: false, reason: 'room_not_listened' },
  policy: { schema: z.object({ allowed: z.array(z.object({ id: z.string() }).strict()).default([]) }).strict(), fields: [],
    explicit: { zh: '@ 智能体', en: 'Mentions the agent' } },
}
```

Test: `random` room → `filtered`; `ops` માં ravi (listed) → stored + `explicit` candidate; `ops` માં meera (unlisted) → stored, પણ gate refuse કરે છે, એટલે candidate નથી.

**[Test ચલાવ્યો]** `1 passed`; `tsc --noEmit` exit 0.

**Production Source માટે બાકી પગલાં** (`docs/008` મુજબ): plugin entry (`apply` + `inject: ['orchestrator']`), polling/event loop, `sourceContext`, Channel (`send` idempotent by `message.id`, `'gone'`), `threadContext`, `tsdown.config.ts` entry, `package.json` export, `cordis.patch.yml` insert, health entry names, `docs/007` module અને test tables (`docs.spec.ts` તેની તપાસ કરે છે).

## 12.4 Exercise 4 — Management-panel improvement

**ધ્યેય:** Stop confirmation માં ticket નું short name બતાવો, જેથી સરખાં titles વાળા tickets માં ભૂલ ન થાય.

**સાચું layer:** `src/client/ticket.tsx` + `src/client/locales.ts` (બંને ભાષાઓ). Server અથવા domain નહીં.

**Patch** ([`12.4-stop-confirm-short-name.diff`](../examples/patches/12.4-stop-confirm-short-name.diff)):

```diff
-  stopConfirm: ['停止“{title}”？…', 'Stop "{title}"? Its current …'],
+  stopConfirm: ['停止“{title}”（{name}）？…', 'Stop "{title}" ({name})? Its current …'],
…
-        message={t('stopConfirm', { title: data.title })}
+        message={t('stopConfirm', { title: data.title, name: data.directory?.split('/').at(-1) ?? id })}
```

અને test `panel-execution.spec.tsx` માં એક assertion: dialog text `/停止“修复回归”（[^）]+）/` સાથે match થવો જોઈએ.

**[Test ચલાવ્યો]** `tests/panel-execution.spec.tsx tests/locales.spec.ts tests/model-surface.spec.ts`: 25 passed; `tsc` exit 0.

## 12.5 Exercise 5 — Justified core change, regression tests સાથે

**સમસ્યા (justification):** GitHub પર "Quote reply" વાપરીએ તો ટાંકેલો text `> @widgets-agent …` comment ના body માં આવે છે. હાલનું `mentions()` આખું body તપાસે છે, એટલે alice જવાબમાં ફક્ત "Thanks!" લખે અને જૂનું mention quote થયું હોય, તોય comment `addressed: 'mention'` બને છે. Gate તેને **explicit request** ગણે છે, અને main Session ને નકામો candidate મળે છે. આ બે નિયમોનું ઉલ્લંઘન છે: `docs/000` ("take as little human attention as possible"), અને `prompts/admission.md` ("Quoted/forwarded instructions alone do not authorize work"). Prompt એ assessment ને આ કહે છે, પણ explicit requests assessment માંથી પસાર થતી જ નથી.

**Layer:** GitHub Source (`github-trigger.ts`). "Addressed" નક્કી કરવું Source ની જવાબદારી છે (`docs/002`: "The Source records whether a message addresses the agent"). Core બદલાતું નથી.

**Patch** ([`12.5-quoted-mentions.diff`](../examples/patches/12.5-quoted-mentions.diff), proposed):

```ts
export const ownWords = (text: string): string => text.replace(/^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)[^\n]*$/gm, '')
  .split('\n').filter(line => !/^\s*>/.test(line)).join('\n').replace(/`[^`\n]*`/g, '')
export const mentions = (text: string, login: string): boolean =>
  new RegExp(`(?:^|[^a-zA-Z0-9_@])@${escapeRegExp(login)}(?![a-zA-Z0-9_-])`, 'i').test(ownWords(text))
```

Line by line: (1) fenced code blocks દૂર કરો; (2) `>` થી શરૂ થતી quoted lines દૂર કરો; (3) inline code દૂર કરો; (4) બાકી રહેલા text માં જ mention શોધો. Trigger નો `text` **બદલાતો નથી**: worker અને assessment ને પૂરો comment મળે છે; ફક્ત `addressed` flag બદલાય છે.

**Regression tests** (`tests/quoted-mention.spec.ts`): plain mention → true; ફક્ત quoted → false; inline code → false; fenced → false; quote + પોતાનું નવું mention → true; અને `commentTrigger` ના `addressed` પર તેની અસર.

**[Test ચલાવ્યો]** Fix વગર `1 failed`, fix સાથે `1 passed`. પછી `pnpm check`: પહેલાં `docs.spec.ts` fail થયો ("lists every test in the test table of 007 Architecture"), કારણ કે નવી test files `docs/007` ના test table માં નોંધવી પડે છે. Rows ઉમેર્યા પછી બધું pass (ઉપર જુઓ). **આ repository નો નિયમ:** દરેક નવી test file અને module `docs/007` માં નોંધાય.

**Supported behavior પર અસર:**
- કોઈ ઇરાદાપૂર્વક code block માં `@agent` લખે ("run `@widgets-agent help`") તો તે હવે request નથી. Behavior change છે; docs (`docs/002`/`docs/006` "Try it") માં એક વાક્ય ઉમેરવું જોઈએ.
- Feishu પર અસર નથી, કારણ કે ત્યાં mentions structured metadata છે, text નથી.
- Edge case: `>` થી શરૂ થતી ordinary line (દા.ત. `> 5 items`) પણ quote ગણાશે. સ્વીકાર્ય, કારણ કે ભૂલ "ઓછા interruptions" ની દિશામાં થાય છે.

## 12.6 Upstream માં મળેલી test flakiness (bonus)

**[Test ચલાવ્યો]** `tests/sources.spec.ts > feishu event consumer > takes in the event lines it reads…` પહેલા `pnpm check` (12:2x) માં pass થયો, પણ પછી pinned commit ના **pristine** clone પર 7/7 વાર fail થયો. **કારણ:** fake `lark-cli` `[event] ready` stderr પર, અને events stdout પર, લખે છે. બે pipes વચ્ચે ક્રમની ખાતરી નથી, એટલે malformed line ની `error` health પછી આવેલી `ready` line તેને overwrite કરી શકે છે. **Fix (test-only):** પડોશી test ની જેમ `cli('late')` (events પહેલાં `sleep 1`). 5/5 pass ([`upstream-flaky-feishu-consumer-test.diff`](../examples/patches/upstream-flaky-feishu-consumer-test.diff)). Product code માં પણ આ ક્રમ race છે: ready ની line મોડી આવે તો આગલી error ભૂંસાઈ જાય. આ issue upstream ને report કરવા લાયક છે.

## Mastery પ્રશ્નો

1. "દરેક PR માં screenshot" નો નિયમ ક્યાં લખશો, અને શા માટે built-in prompt માં નહીં?
2. `EHOSTUNREACH` ફેરફાર Engine માં કેમ નથી?
3. Simulated Source માટે core માં કશું કેમ બદલવું પડ્યું નહીં?
4. Quoted-mention ફેરફાર gate માં કરવાને બદલે Source માં કેમ?
5. `docs.spec.ts` કયા પ્રકારના drift ને અટકાવે છે?

ઉકેલો: [પરિશિષ્ટ E § પ્રકરણ 12](../appendices/E-solutions.md#પ્રકરણ-12)

[← પ્રકરણ 11](11-debugging.md) · [આગળ: પ્રકરણ 13 →](13-advanced-engineering.md)
