# પરિશિષ્ટ G — Verification log: શું ચલાવ્યું, શું જોયું, શું નથી ચકાસ્યું

> આ પુસ્તકનો દરેક 🧪 આ પાનાની એક row પર ટકે છે. નિષ્ફળ થયેલું નિષ્ફળ તરીકે જ નોંધ્યું છે.

## Environment

| વિગત | કિંમત |
|---|---|
| Source | `deepseek-ai/dsh-superagent-prototype` @ [`8c32a9dc5d72c033816c6a8110b37f40cf94fba4`](https://github.com/deepseek-ai/dsh-superagent-prototype/tree/8c32a9dc5d72c033816c6a8110b37f40cf94fba4) (2026-10-31, "feat: add the dsh-superagent research prototype") |
| ક્યારે | Source ની તપાસ અને tests: 2026-11-05. વાર્તા-રૂપમાં પુનર્લેખન અને પુસ્તકનાં tools: 2026-11-12 |
| OS | Linux (cloud container, 4 vCPU) |
| Tools | Node v22.23.4, pnpm 11.7.0, git 2.43.0, tmux 3.4, Python 3.13 |
| **ઉપલબ્ધ નહોતું** | DeepSeek Harness (`dsh`), model provider, GitHub agent account, Feishu, `lark-cli` |
| Install | `pnpm install --frozen-lockfile`: સફળ |

## Upstream code પર ચલાવેલા commands

| # | Command | પરિણામ | ક્યાં વપરાયું |
|---|---|---|---|
| 1 | `pnpm check` (પહેલો run) | ✅ typecheck; **59 files, 1197 tests passed**; build પૂરું | [0](../book/00-paayo.md) |
| 2 | `pnpm check`, સ્વચ્છ checkout, પછીના runs | ❌ **1 failed, 1196 passed** (`sources.spec.ts > feishu event consumer > takes in the event lines it reads…`); test નિષ્ફળ જતાં `&&` ને કારણે build ચાલ્યું નહીં | [0](../book/00-paayo.md), [12](../book/12-customization.md) |
| 3 | એ જ test, સ્વચ્છ checkout પર એકલો, 7 વાર | ❌ 7 / 7 નિષ્ફળ | [12](../book/12-customization.md) |
| 4 | એ જ test, `cli('late')` fix સાથે, 5 વાર | ✅ 5 / 5 પાસ | [12](../book/12-customization.md) |
| 5 | `vitest run tests/running-example.spec.ts` | ✅ 1 passed; બે runs નો log byte-identical | [1](../book/01-domain-model.md), [4](../book/04-sources-intake.md)–[7](../book/07-worker-execution.md), [14](../book/14-antim-project.md) |
| 6 | `vitest run tests/demo-source.spec.ts` + `tsc --noEmit` | ✅ 1 passed; tsc exit 0 | [12](../book/12-customization.md) |
| 7 | `vitest run tests/final-project.spec.ts` | ✅ 1 passed | [14](../book/14-antim-project.md) |
| 8 | કામચલાઉ test: gate, ત્રણેય mode માં | ✅ off: `not_a_member`; observe અને auto: inferred `followup` | [5](../book/05-policy-eval.md) |
| 9 | `REQUEUES = 3` + `core-engine.spec.ts` | ✅ ધાર્યા મુજબ નિષ્ફળ: 1 failed / 112 passed | [5](../book/05-policy-eval.md) |
| 10 | Pass interval 2000 → 500 + `passes.spec.ts runtime.spec.ts` | ✅ 95 passed | [3](../book/03-startup.md) |
| 11 | `BACKGROUND_LIMIT_MS` 30 → 60 min + concurrency tests | ✅ ધાર્યા મુજબ નિષ્ફળ: 3 failed / 65 passed | [7](../book/07-worker-execution.md) |
| 12 | Worker prompt માં "Use orchestrator_finish when done." | ✅ ધાર્યા મુજબ નિષ્ફળ: 2 failed / 78 passed (અજાણ્યું tool; કદ 1028 > 1000) | [9](../book/09-tools-prompts-skills.md) |
| 13 | કામચલાઉ test: માણસની ચિઠ્ઠી પછી retry | ✅ `notRetryable` | [6](../book/06-tickets-assignments.md) |
| 14 | કામચલાઉ test: યાદી બહારના માગનારનો stop | ✅ `ignore / inferred / stopNotExplicit` | [5](../book/05-policy-eval.md), [11](../book/11-debugging.md), [14](../book/14-antim-project.md) |
| 15 | કામચલાઉ test: edit કરેલા comment નું નવું id | ✅ stored, પછી duplicate | [4](../book/04-sources-intake.md) |
| 16 | Patch 12.2: red → green | ✅ red: `expected false to be true`; green: passed | [12](../book/12-customization.md) |
| 17 | Patch 12.5: red → green | ✅ red: 1 failed; green: 1 passed | [12](../book/12-customization.md) |
| 18 | Patches 12.2 + 12.4 + 12.5 + docs rows + flaky fix → `pnpm check` | ✅ **61 files, 1199 tests passed**; build પૂરું | [12](../book/12-customization.md) |
| 19 | એ જ, docs rows **વગર** | ❌ ધાર્યા મુજબ: `docs.spec.ts` ("lists every test in the test table of 007 Architecture") | [12](../book/12-customization.md) |
| 20 | `intake-bench.ts` 2000, FULL / NORMAL × 3 | FULL 0.85–1.17 ms / ચિઠ્ઠી; NORMAL 0.41–0.50 | [13](../book/13-advanced-engineering.md) |
| 21 | નામથી regression tests (પ્રકરણ 4, 6, 8, 10, 11 ના) | ✅ દરેક પાસ | [4](../book/04-sources-intake.md)–[11](../book/11-debugging.md) |
| 22 | Dependency greps (core, sources, client ના imports) | ✅ `docs/007` ના નિયમો જળવાય છે | [13](../book/13-advanced-engineering.md) |
| 23 | `vitest run tests/core-engine.spec.ts -t "follow-up"` | ✅ 27 passed, 86 skipped | [0A](../book/00a-lekh-ane-prototype.md) |
| 24 | `vitest run tests/core-engine.spec.ts -t "intake"` | ✅ 2 passed | [4](../book/04-sources-intake.md) |

"કામચલાઉ test" એટલે running example ની નકલમાં ઉમેરેલી થોડી લીટીઓ; તે અલગ file તરીકે repository માં નથી. તેમનો code [પરિશિષ્ટ D](D-lab-solutions.md) માં છે જ્યાં ટૂંકો છે.

## પુસ્તક પોતે: ચકાસણી

| # | Command | શું ચકાસે | પરિણામ |
|---|---|---|---|
| B1 | `python3 tools/citations.py <checkout>` | દરેક citation: file છે, line range file ની અંદર છે, અને ઓળખ-લખાણ તે લીટીઓમાં છે | ✅ 254 citations |
| B2 | `python3 tools/verify_book.py <checkout>` | Citation કોષ્ટક તાજું; દરેક citation id જાણીતું; દરેક relative link અને anchor અસ્તિત્વમાં; દરેક inline permalink pinned SHA અને સાચી line range સાથે; દરેક દૃશ્યમાં 🎬 ❓ 💻 🔬 | ✅ (છેલ્લું પરિણામ [પરિશિષ્ટ H](H-status.md) માં) |
| B3 | `node tools/verify-mermaid.mjs <dir>` | દરેક Mermaid diagram parse થાય | ✅ (છેલ્લું પરિણામ [પરિશિષ્ટ H](H-status.md) માં) |

**આ tools શું નથી ચકાસતાં:** citation ની લીટીઓ વાક્યના **દાવાને ટેકો આપે છે** કે નહીં. તે માણસનું (અહીં લેખકનું) કામ છે, અને તેમાં ભૂલ હોઈ શકે. પુનર્લેખન દરમિયાન આવી ત્રણ ભૂલો મળી અને સુધારી (ખોટા test નામ સાથે જોડાયેલા બે citations, અને એક ખોટું schema નામ). બીજી રહી ગઈ હોઈ શકે: દાવો મહત્વનો હોય ત્યાં link ખોલીને જાતે વાંચો.

## શું ચકાસ્યું **નથી**

1. **Live operation:** DSH install, profile, `scripts/dsh-superagent start | status | stop`, ખરું GitHub polling, worker sessions, model calls, browser માં panel, Management API ના `curl` commands. [પ્રકરણ 2](../book/02-setup-operation.md) નો live ભાગ, [14](../book/14-antim-project.md) નો ભાગ B અને [12](../book/12-customization.md) નું દૃશ્ય 1 docs પરથી લખાયાં છે.
2. **Model નું વર્તન:** main Session કે worker ખરેખર કયા tool calls કરે છે, prompt ફેરફારની અસર, recovery નોંધનું પાલન.
3. **DSH ની અંદરની રચના:** inbox, background jobs, `agent.cancel`. અમે ફક્ત repository જે interfaces બોલાવે છે તે અને tests ના fakes જોયા છે.
4. **લેખના પ્રયોગો:** token અને latency ના આંકડા લેખના છે; અમે ફરી ચલાવ્યા નથી.
5. **લેખનું મૂળ લખાણ:** X પરથી login વગર વાંચી શકાયું નહીં. વાચકે આપેલું machine-translated લખાણ વપરાયું છે.
6. **[પ્રકરણ 15](../book/15-aagal-no-rasto.md):** આખું સૂચિત; કશું બનાવ્યું કે ચલાવ્યું નથી.
7. **Windows / WSL2**, અને Feishu Source live.

## Docs અને code વચ્ચે જોયેલા ફરક

| મુદ્દો | Docs / લેખ | Code / અવલોકન |
|---|---|---|
| DSH version | `docs/006`: `@deepseek-ai/dsh@0.2.1-rc.3` | `engines.dsh ^0.2.1-alpha.2` ([`package.json`][pkg-engines]); semver મુજબ સુસંગત |
| Router "without Bash" | લેખ | Router preset માં bash છે, 5 s મર્યાદા અને `noWait` guard સાથે |
| "Workers never interact with humans" | લેખ | Worker `orchestrator_ack` અને `gh` વડે GitHub પર લખે છે |
| Client ના imports | `docs/007` ની યાદી | `core/stage.ts` પણ import થાય છે, પણ ફક્ત type તરીકે |
| Feishu consumer test | Deterministic હોવો જોઈએ | stdout / stderr ના ક્રમની race; આ environment માં સ્વચ્છ checkout પર સતત નિષ્ફળ |

## બાકીની અનિશ્ચિતતા

- Flaky test પહેલા run માં કેમ પાસ થયો: process scheduling. અમે race સાબિત કરતો trace લીધો નથી; તર્ક code પરથી છે, અને `late` mode ના fix થી ટેકો મળે છે.
- GitHub marker idempotency ની હદ (marker વાળો comment delete થાય તો): code પરથી તર્ક, test નહીં.
- Benchmark ના આંકડા container ના I/O પર આધાર રાખે છે; ફેલાવો મોટો છે.

<!-- citations:begin (generated by tools/refdefs.py) -->
[pkg-engines]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/package.json#L52-L56
<!-- citations:end -->
