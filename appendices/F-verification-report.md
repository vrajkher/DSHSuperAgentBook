# પરિશિષ્ટ F — Verification report

[← અનુક્રમણિકા](../README.md)

## Environment

| વિગત | મૂલ્ય |
| --- | --- |
| Source | `deepseek-ai/dsh-superagent-prototype` @ `8c32a9dc5d72c033816c6a8110b37f40cf94fba4` (`git log -1`: 2026-10-31 20:06:31 +0800, "feat: add the dsh-superagent research prototype") |
| Date | 2026-11-05 |
| OS | Linux 6.18 (cloud container, 4 vCPU) |
| Tools | Node v22.23.4, pnpm 11.7.0, git 2.43.0, tmux 3.4, Python 3.13.18, gh 2.89.0 |
| Not available | DeepSeek Harness (`dsh`), model provider, GitHub agent account, Feishu, lark-cli |
| Install | `pnpm install --frozen-lockfile`: success (npm registry access) |

## Commands અને પરિણામો

| # | Command | પરિણામ | ક્યાં વપરાયું |
| --- | --- | --- | --- |
| 1 | `pnpm check` (પહેલો run, ~12:20 UTC) | ✅ typecheck; **59 files, 1197 tests passed**; build complete (`lib/index.js` 450.26 kB) | README, પ્ર. 0 |
| 2 | `pnpm check`, pristine clone, final (~13:05 UTC) | ❌ **1 failed, 1196 passed** (`sources.spec.ts > feishu event consumer > takes in the event lines it reads…`); build ચાલ્યું નહીં, કારણ કે `&&` પહેલાં test fail થયો | પ્ર. 12.6 |
| 3 | એ failing test, pristine પર એકલો, 7 વાર | ❌ 7/7 fail | પ્ર. 12.6 |
| 4 | એ જ test `cli('late')` fix સાથે, 5 વાર | ✅ 5/5 pass | `examples/patches/upstream-flaky-feishu-consumer-test.diff` |
| 5 | `vitest run tests/running-example.spec.ts` | ✅ 1 passed; log બે runs માં byte-identical (deterministic) | પ્ર. 1, 4–7, 14 |
| 6 | `vitest run tests/demo-source.spec.ts` + `tsc --noEmit` | ✅ 1 passed; tsc exit 0 | પ્ર. 12.3 |
| 7 | `vitest run tests/final-project.spec.ts` | ✅ 1 passed | પ્ર. 14 |
| 8 | Temporary gate-per-mode test | ✅ off: `not_a_member`; observe/auto: inferred `followup` | પ્ર. 5 |
| 9 | `REQUEUES = 3` + `core-engine.spec.ts` | ✅ (expected failure) 1 failed / 112 passed: "counts an Eval's deadline…" | પ્ર. 5.7 |
| 10 | Pass interval 2000→500 + `passes.spec.ts runtime.spec.ts` | ✅ 95 passed | પ્ર. 3.9 |
| 11 | `BACKGROUND_LIMIT_MS` 30→60 min + concurrency tests | ✅ (expected failure) 3 failed / 65 passed | પ્ર. 7.13 |
| 12 | Worker prompt માં "Use orchestrator_finish when done." | ✅ (expected failure) 2 failed / 78 passed: unknown tool + **size budget 1028 > 1000** | પ્ર. 9.9 |
| 13 | Retry after human message (temporary test) | ✅ `notRetryable` thrown | પ્ર. 6.8 |
| 14 | Unlisted requester stop (temporary test) | ✅ `ignore / inferred / stopNotExplicit` | પ્ર. 11.11 |
| 15 | Edited comment new id (temporary test) | ✅ stored, then duplicate | પરિ. E § 4 |
| 16 | Patch 12.2: red → green | ✅ red: `expected false to be true`; green: passed | પ્ર. 12.2 |
| 17 | Patch 12.5: red → green | ✅ red: 1 failed; green: 1 passed | પ્ર. 12.5 |
| 18 | Patches 12.2 + 12.4 + 12.5 + docs rows + flaky fix → `pnpm check` (pristine) | ✅ **61 files, 1199 tests passed; build complete** | પ્ર. 12 |
| 19 | Patches + book tests **વગર** docs rows → `pnpm check` | ❌ (expected) `docs.spec.ts`: "lists every test in the test table of 007 Architecture" | પ્ર. 12.5 |
| 20 | `intake-bench.ts` 2000 FULL/NORMAL × 3 | FULL 0.85–1.17 ms/Trigger; NORMAL 0.41–0.50 | પ્ર. 13.8 |
| 21 | Named regression tests (પ્ર. 4, 6, 8, 10, 11) | ✅ દરેક `1 passed` અથવા group pass | પ્ર. 4–11 |
| 22 | Dependency greps (core, sources, client imports) | ✅ docs/007 rules hold | પ્ર. 13.1 |

## શું verify **નથી** થયું

1. **Live operation:** DSH install, profile, `scripts/dsh-superagent start|status|stop`, real GitHub polling, worker sessions, model calls, panel UI in browser. પ્રકરણ 2 અને 14-B docs પરથી લખાયા છે અને **[ધારણા]** તરીકે labelled છે.
2. **Windows/WSL2:** ચલાવ્યું નથી.
3. **DSH internals:** inbox steer batching, background jobs, `agent.cancel` semantics. અમે ફક્ત repository બોલાવે છે તે interfaces અને tests ના fakes (`tests/fixtures/host.ts`) જોયા છે.
4. **Article experiments (§7):** લેખના આંકડા છે; અમે ફરી ચલાવ્યા નથી.
5. **X article text:** login વગર scrape થઈ શક્યું નહીં. વપરાશકર્તાએ આપેલું machine-translated લખાણ વાપર્યું છે, અને Yicai સારાંશ સાથે મેળવ્યું છે.

## Docs અને code વચ્ચે જોવા મળેલા તફાવતો

| મુદ્દો | Docs | Code/observation |
| --- | --- | --- |
| DSH version | `docs/006`: `@deepseek-ai/dsh@0.2.1-rc.3` | devDependencies `0.2.1-alpha.2`; `engines.dsh ^0.2.1-alpha.2` (semver મુજબ સુસંગત) |
| Router "without Bash" | લેખ §2.1 | Router preset માં bash છે, પણ 5 s limits અને `noWait` guard સાથે |
| "Workers never interact with humans" | લેખ §2.2 | Worker `orchestrator_ack` અને `gh` વડે GitHub પર લખે છે |
| Client plain-value imports | `docs/007` યાદી | `core/stage.ts` પણ import થાય છે, પણ ફક્ત type તરીકે (`import type`), એટલે નિયમ તૂટતો નથી |
| Feishu consumer test | Deterministic હોવો જોઈએ | stdout/stderr ordering race; pristine પર સતત fail (આ environment માં) |

## બાકીની અનિશ્ચિતતાઓ

- Flaky test નું કારણ કેટલાક environments માં, અને ખાસ કરીને પહેલા run માં, pass થવાનું: process scheduling. અમે આ race ને સાબિત કરતું trace લીધું નથી; reasoning code પરથી છે, અને `late` mode ના fix થી સમર્થન મળે છે.
- GitHub marker idempotency ની મર્યાદા (marker ધરાવતો comment delete થાય તો): code પરથી reasoning, test નહીં.
