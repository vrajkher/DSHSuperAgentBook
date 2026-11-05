# DeepSeek Super Agent Prototype — શરૂઆતથી Advanced Developer સુધી

> `deepseek-ai/dsh-superagent-prototype` repository ને સમજવા, ચલાવવા, debug કરવા, બદલવા, test કરવા અને extend કરવા માટેનું વ્યવહારુ ગુજરાતી પુસ્તક.

| વિગત | મૂલ્ય |
| --- | --- |
| Primary repository | <https://github.com/deepseek-ai/dsh-superagent-prototype> |
| Reference commit | [`8c32a9dc5d72c033816c6a8110b37f40cf94fba4`](https://github.com/deepseek-ai/dsh-superagent-prototype/tree/8c32a9dc5d72c033816c6a8110b37f40cf94fba4) (2026-10-31, "feat: add the dsh-superagent research prototype") |
| Inspection તારીખ | 2026-11-05 |
| Inspection environment | Linux, Node.js v22.23.4, pnpm 11.7.0, git 2.43.0, tmux 3.4, Python 3.13, gh 2.89.0 |
| DeepSeek Harness (DSH) | આ environment માં installed **ન હતું**; DSH પર live run નથી કર્યો (જુઓ [Verification report](appendices/F-verification-report.md)) |
| `pnpm check` પરિણામ | ✅ typecheck, 59 test files / 1197 tests passed, build complete |

## આ પુસ્તક કેવી રીતે વાંચવું

દરેક પ્રકરણ પહેલાંના પ્રકરણો પર જ build થાય છે, જેમ repository ના `docs/000…008` કરે છે. દરેક મોટા concept માટે ક્રમ એક જ છે:
**હેતુ → સાદું ઉદાહરણ → source location → code explanation → જોડાયેલા components → runtime behavior → exercise → modification → verification.**

દરેક code claim સાથે commit-pinned GitHub link છે. Text માં ચાર પ્રકારના labels વાપરીએ છીએ:

| Label | અર્થ |
| --- | --- |
| **[Source]** | Pinned commit નો code વાંચીને મળેલી હકીકત |
| **[Test ચલાવ્યો]** | આ પુસ્તક માટે ખરેખર ચલાવેલો test/command અને તેનું પરિણામ |
| **[Observed]** | ચલાવેલા code નું observed output (જેમ કે [`examples/running-example.log.json`](examples/running-example.log.json)) |
| **[ધારણા]** / **[Proposed]** | Verify ન થયેલી ધારણા, અથવા પુસ્તકે સૂચવેલો ફેરફાર (repository માં નથી) |

Code excerpts પણ labelled છે: **real** (exact lines), **shortened** (`…` વડે ટૂંકું કરેલું), **pseudocode**, અથવા **proposed patch**.

## Running example

આખા પુસ્તકમાં એક જ demonstration repository `demo-org/widgets` અને એક જ request વાપરીએ છીએ. Agent account `widgets-agent` છે, allowed person `alice` છે, અને અજાણી વ્યક્તિ `mallory` છે:

> **"@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો."**

આ request ને duplicate event, unauthorized sender, follow-up, worker failure, human stop અને restart સાથે ફરી જોઈએ છીએ. [`examples/running-example.spec.ts`](examples/running-example.spec.ts) આ બધું **real** `Engine`, **real** `settingsPolicy` અને **real** GitHub Trigger builders સાથે ચલાવે છે.

## અનુક્રમણિકા (Table of contents)

### ભાગ 1 — પાયો
- [પ્રકરણ 0 — Repository વાંચવાનો પાયો](chapters/00-foundation.md)
- [પ્રકરણ 0A — Super-agent design article અને આ prototype](chapters/00a-superagent-article.md)
- [પ્રકરણ 1 — Domain model](chapters/01-domain-model.md)
- [પ્રકરણ 2 — Setup અને operation](chapters/02-setup-operation.md)

### ભાગ 2 — Architecture નો પ્રવાસ
- [પ્રકરણ 3 — Startup architecture](chapters/03-startup.md)
- [પ્રકરણ 4 — Sources અને intake](chapters/04-sources-intake.md)
- [પ્રકરણ 5 — Policy અને evaluation](chapters/05-policy-eval.md)
- [પ્રકરણ 6 — Tickets અને Assignments](chapters/06-tickets-assignments.md)
- [પ્રકરણ 7 — Worker execution](chapters/07-worker-execution.md)
- [પ્રકરણ 8 — Store, Effects અને Outbox](chapters/08-store-effects-outbox.md)
- [પ્રકરણ 9 — Tools, prompts અને skills](chapters/09-tools-prompts-skills.md)
- [પ્રકરણ 10 — Management panel](chapters/10-panel.md)

### ભાગ 3 — Engineer તરીકે કામ
- [પ્રકરણ 11 — Debugging](chapters/11-debugging.md)
- [પ્રકરણ 12 — Customization](chapters/12-customization.md)
- [પ્રકરણ 13 — Advanced engineering](chapters/13-advanced-engineering.md)
- [પ્રકરણ 14 — Final project](chapters/14-final-project.md)

### પરિશિષ્ટ (Appendices)
- [A — Source coverage map](appendices/A-coverage-map.md)
- [B — Source અને symbol index](appendices/B-symbol-index.md)
- [C — ગુજરાતી–English glossary](appendices/C-glossary.md)
- [D — Mastery assessment rubric](appendices/D-rubric.md)
- [E — Exercises ના ઉકેલ અને example patches](appendices/E-solutions.md)
- [F — Verification report](appendices/F-verification-report.md)

### Runnable examples
- [`examples/running-example.spec.ts`](examples/running-example.spec.ts): running example નો end-to-end domain test
- [`examples/running-example.log.json`](examples/running-example.log.json): તે test નું observed state
- [`examples/demo-source.spec.ts`](examples/demo-source.spec.ts): simulated Source (પ્રકરણ 12)
- [`examples/intake-bench.ts`](examples/intake-bench.ts): intake workload measurement (પ્રકરણ 13)

Examples ચલાવવા માટે, તેમને pinned checkout ના `tests/` (અથવા `bench/`) માં copy કરો. પગલાં [પ્રકરણ 2](chapters/02-setup-operation.md#25-offline-lab-repository-build-અને-tests) માં છે.

## Progress

કામની સ્થિતિ, inspect કરેલા sources અને બાકીના પ્રશ્નો [PROGRESS.md](PROGRESS.md) માં છે.

## License નોંધ

Upstream repository MIT license હેઠળ છે. આ પુસ્તકમાંના code excerpts ત્યાંથી citation સાથે લીધેલા છે.
