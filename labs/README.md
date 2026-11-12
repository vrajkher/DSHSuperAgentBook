# Labs: જાતે ચલાવો

> આ folder માં પુસ્તકનો બધો ચલાવી શકાય તેવો code છે. બધું pinned commit `8c32a9d` પર ચલાવેલું છે ([પરિશિષ્ટ G](../appendix/G-verification-log.md)).
> **DSH, model કે GitHub account ની જરૂર નથી.** ફક્ત Node 22, pnpm અને network (`pnpm install` માટે).

## એક વારની તૈયારી

```bash
git clone https://github.com/deepseek-ai/dsh-superagent-prototype.git && cd dsh-superagent-prototype
```

```bash
git checkout 8c32a9dc5d72c033816c6a8110b37f40cf94fba4 && pnpm install --frozen-lockfile
```

```bash
pnpm check
```

**અપેક્ષા:** 59 files, 1197 tests. એક Feishu consumer test નિષ્ફળ જાય (1196 / 1197) તો તે upstream ની flaky test છે, તમારી ભૂલ નથી ([પ્રકરણ 12, દૃશ્ય 6](../book/12-customization.md)).

નીચે `<book>` એટલે આ પુસ્તકના repository નો path.

## Files

| File | શું બતાવે | પ્રકરણ | ક્યાં મૂકવી |
|---|---|---|---|
| [`running-example.spec.ts`](running-example.spec.ts) | આખું running example: request, duplicate, અનધિકૃત, follow-up, નિષ્ફળતા, restart, stop | [1](../book/01-domain-model.md), [4](../book/04-sources-intake.md)–[7](../book/07-worker-execution.md), [14](../book/14-antim-project.md) | `tests/` |
| [`final-project.spec.ts`](final-project.spec.ts) | Ready → PR merge → Ticket પૂરું | [6](../book/06-tickets-assignments.md), [14](../book/14-antim-project.md) | `tests/` |
| [`demo-source.spec.ts`](demo-source.spec.ts) | Simulated ત્રીજો Source | [12](../book/12-customization.md) | `tests/` |
| [`transient.spec.ts`](transient.spec.ts) | `EHOSTUNREACH` ક્ષણિક ગણાય (patch 12.2 પછી પાસ) | [12](../book/12-customization.md) | `tests/` |
| [`quoted-mention.spec.ts`](quoted-mention.spec.ts) | ટાંકેલું mention "સીધું બોલાવ્યાં" નથી (patch 12.5 પછી પાસ) | [12](../book/12-customization.md) | `tests/` |
| [`intake-bench.ts`](intake-bench.ts) | Intake નો benchmark | [13](../book/13-advanced-engineering.md) | `bench/` |
| [`../evidence/running-example.log.json`](../evidence/running-example.log.json) | Running example નો જોયેલો output | બધે | (સરખાવવા) |

## ચલાવવું

**Running example અને બીજા સ્વતંત્ર tests:**

```bash
cp <book>/labs/running-example.spec.ts <book>/labs/demo-source.spec.ts <book>/labs/final-project.spec.ts tests/
```

```bash
pnpm vitest run tests/running-example.spec.ts tests/demo-source.spec.ts tests/final-project.spec.ts
```

**અપેક્ષા:** `Test Files 3 passed (3)`. Running example checkout ના root માં `running-example.log.json` લખે છે; તેને [`evidence/`](../evidence/running-example.log.json) સાથે સરખાવો.

**Red → green (patch 12.5):**

```bash
cp <book>/labs/quoted-mention.spec.ts tests/ && pnpm vitest run tests/quoted-mention.spec.ts
```

**અપેક્ષા:** નિષ્ફળ (red).

```bash
git apply <book>/labs/patches/12.5-quoted-mentions.diff && pnpm vitest run tests/quoted-mention.spec.ts
```

**અપેક્ષા:** પાસ (green). Patch 12.2 અને `transient.spec.ts` માટે પણ આ જ રીત.

**Benchmark:**

```bash
mkdir -p bench && cp <book>/labs/intake-bench.ts bench/
```

```bash
node --no-warnings --experimental-transform-types bench/intake-bench.ts 2000 FULL
```

```bash
node --no-warnings --experimental-transform-types bench/intake-bench.ts 2000 NORMAL
```

## Patches

| Patch | સ્તર | શું બદલે | નિશાન |
|---|---|---|---|
| [`12.2-transient-ehostunreach.diff`](patches/12.2-transient-ehostunreach.diff) | Executor | `EHOSTUNREACH` ને ક્ષણિક ગણે | 📝 🧪 |
| [`12.4-stop-confirm-short-name.diff`](patches/12.4-stop-confirm-short-name.diff) | Client | Stop ની ખાતરીમાં કાર્ડનું ટૂંકું નામ | 📝 🧪 |
| [`12.5-quoted-mentions.diff`](patches/12.5-quoted-mentions.diff) | GitHub Source | ટાંકેલા અને code ની અંદરના mentions અવગણે | 📝 🧪 |
| [`upstream-flaky-feishu-consumer-test.diff`](patches/upstream-flaky-feishu-consumer-test.diff) | Test | Flaky test ને સ્થિર કરે | 📝 🧪 |

📝 = પુસ્તકે સૂચવેલું, upstream માં **નથી**, અને upstream ને મોકલ્યું નથી.

**બધું સાથે:** ચારેય patches લગાવો, lab tests `tests/` માં મૂકો, `docs/007-architecture.md` ના test કોષ્ટકમાં નવી test files ની rows ઉમેરો (નહીં તો `docs.spec.ts` અટકાવશે), અને `pnpm check`. 🧪 61 files, 1199 tests, build પૂરું.

## પ્રયોગ પછી સાફ કરવું

```bash
git checkout . && git clean -fd tests bench
```

⚠️ `git clean` તમે ઉમેરેલી બધી untracked files કાઢી નાખે છે. તમારું પોતાનું કામ હોય તો પહેલાં સાચવો.
