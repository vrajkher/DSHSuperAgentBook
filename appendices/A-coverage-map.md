# પરિશિષ્ટ A — Source coverage map

[← અનુક્રમણિકા](../README.md)

Pinned commit [`8c32a9d`](https://github.com/deepseek-ai/dsh-superagent-prototype/tree/8c32a9dc5d72c033816c6a8110b37f40cf94fba4) ની 216 tracked files માંથી દરેક જૂથ કયા પ્રકરણમાં આવરી લેવાયું છે, અને કેટલી ઊંડાણથી.

**Depth:** **L** = line-by-line walkthrough · **S** = symbols અને behavior સમજાવ્યાં · **M** = mention/નકશો (વિગત નથી)

| Path (files) | Lines (approx.) | Depth | પ્રકરણ |
| --- | --- | --- | --- |
| `README.md`, `SETUP.md`, `LICENSE` | 120 | S | 0, 2 |
| `docs/000`–`008` (9) | 2,100 | S | દરેક પ્રકરણ શરૂઆતમાં; 0A |
| `package.json`, `tsconfig.json`, `tsdown.config.ts`, `vitest.config.ts` | 200 | S | 0 |
| `cordis.patch.yml`, `examples/profile.cordis.patch.yml` | 200 | S | 0A, 2, 3 |
| `scripts/dsh-superagent` (Python) | 250 | S | 2 |
| `src/index.ts` | 27 | L | 0, 3 |
| `src/core/model.ts` | 353 | L | 1 |
| `src/core/ports.ts`, `part.ts` | 214 | L | 1, 4, 6 |
| `src/core/engine.ts` | 270 | L | 3–7 |
| `src/core/intake.ts` | 63 | L | 4 |
| `src/core/evals.ts` | 340 | L | 5 |
| `src/core/tickets.ts` | 423 | L | 6 |
| `src/core/assignments.ts` | 140 | L | 6, 7 |
| `src/core/replies.ts`, `stage.ts`, `errors.ts`, `reasons.ts`, `ids.ts`, `memory.ts`, `index.ts` | 400 | S | 1, 6, 8 |
| `src/policy.ts`, `src/admission.ts`, `src/limits.ts` | 330 | L (policy) | 5 |
| `src/deployment.ts`, `src/setup.ts`, `src/app/setup.ts` | 330 | S | 2, 3 |
| `src/app/runtime.ts` | 254 | L | 3 |
| `src/app/passes.ts` | 69 | L | 3 |
| `src/app/effects.ts` | 161 | L | 8 |
| `src/app/store.ts`, `store-read.ts` | 372 | L (store) | 8 |
| `src/app/outbox.ts` | 52 | L | 8 |
| `src/app/migration.ts`, `versions.ts`, `src/kv.ts` | 750 | S | 8 |
| `src/app/sessions.ts`, `delivery.ts`, `role-models.ts`, `retry-health.ts` | 600 | S | 0A, 7, 9 |
| `src/app/assessment.ts` | 282 | S | 5 |
| `src/app/settings.ts`, `settings-history.ts` | 358 | S (save L) | 10 |
| `src/app/prompts.ts`, `context.ts`, `skill-files.ts` | 400 | S | 9 |
| `src/app/tools/*.ts` (3) | 430 | L (executor), S (main) | 9 |
| `src/app/resources.ts`, `cards.ts`, `links.ts`, `notices.ts` | 610 | S | 3, 9 |
| `src/app/http.ts`, `api.ts` | 330 | L (http) | 10 |
| `src/app/views/*.ts` (7) | 700 | S | 10 |
| `src/app/execution-environment.ts`, `source-context.ts`, `cache.ts` | 300 | S | 4, 7 |
| `src/executor/dsh.ts` | 673 | L | 7 |
| `src/executor/background.ts` | 165 | S | 7 |
| `src/infra/*.ts` (5) | 500 | S | 2, 7, 8 |
| `src/sources/kind.ts`, `registry.ts`, `host.ts` | 400 | L (registry) | 4, 12 |
| `src/sources/github.ts`, `github-trigger.ts`, `github-pull.ts`, `github-channel.ts`, `github-read.ts` | 960 | L (github, trigger, pull) | 4, 6, 8 |
| `src/sources/poll.ts`, `admission-context.ts` | 150 | S | 4, 5 |
| `src/sources/feishu*.ts` (7) | 900 | S | 4 |
| `src/client/*` (27) | 4,000 | S (ticket, api, provider, widgets, draft); M (બાકી) | 10 |
| `prompts/*.md` (15) | 600 | S | 5, 9 |
| `skills/*/SKILL.md` (2) | 200 | M | 9 |
| `locale/en.json`, `zh.json` | — | M | 10 |
| `tests/*.spec.ts(x)` (59) + `tests/fixtures/*` (6) | 11,000 | S (named tests in each chapter) | 0–14 |

**ઓછું આવરાયેલું** (આગલી આવૃત્તિ માટે): `src/sources/feishu-read.ts`, `feishu-image.ts`, `src/sources/github-read.ts` (CI snapshots), `src/client/*` ના મોટા ભાગના pages, `src/app/migration.ts` ના schema-10 conversion ની વિગતો, `scripts/dsh-superagent` નો પૂરો code.
