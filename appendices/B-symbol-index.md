# પરિશિષ્ટ B — Source અને symbol index

[← અનુક્રમણિકા](../README.md)

દરેક symbol નું commit-pinned સ્થાન (2026-11-05 ના રોજ grep થી verified) અને તેને સમજાવતું પ્રકરણ.

| Symbol | File:line | પ્રકાર | કામ | પ્રકરણ |
| --- | --- | --- | --- | --- |
| `Runtime` | [`src/app/runtime.ts#L59`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L59) | class | Composition root, lifecycle | 3 |
| `Engine` | [`src/core/engine.ts#L24`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L24) | class | Domain નો એકમાત્ર entry point, role Picks | 3–7 |
| `EngineForSources / …MainSession / …People / …Settings / …Executor` | [`src/core/engine.ts#L261`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L261) | type | Role-scoped Engine interfaces | 0, 13 |
| `Intake` | [`src/core/intake.ts#L16`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L16) | class | Trigger store/dedupe/filter/fan-out/queue | 4 |
| `Evals` | [`src/core/evals.ts#L27`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L27) | class | Batching, gate, deadline, Decisions | 5 |
| `Tickets` | [`src/core/tickets.ts#L29`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L29) | class | Ticket lifecycle, subscriptions, inputs, letGo | 6 |
| `Assignments` | [`src/core/assignments.ts#L30`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L30) | class | Executor facts, reports, interrupted | 6, 7 |
| `Replies` | [`src/core/replies.ts#L26`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/replies.ts#L26) | class | Channel writes by purpose | 6 |
| `EnginePart` | [`src/core/part.ts#L24`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/part.ts#L24) | class | Engine parts નો base; handBack, queueForEval | 4, 6 |
| `ticketStage / canRetry` | [`src/core/stage.ts#L9`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/stage.ts#L9) | function | Panel stages, retry eligibility | 6 |
| `followupOwners` | [`src/core/model.ts#L75`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L75) | function | Follow-up નો નિર્ણય કોણ કરે | 1, 6 |
| `waitsForPerson` | [`src/core/model.ts#L349`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L349) | function | Blocked/failed hold | 6 |
| `Trigger, Thread, Ticket, Mandate, MandateBasis, Decision, Assignment` | [`src/core/model.ts#L23`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L23) | interface | Domain types | 1 |
| `Policy, Assessor, Executor, Outbox, Repositories, DomainEvents` | [`src/core/ports.ts#L17`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L17) | interface | Ports | 1 |
| `UserError / USER_ERRORS` | [`src/core/errors.ts#L54`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/errors.ts#L54) | class | Fixed refusals | 6, 10 |
| `REASONS / reasonText` | [`src/core/reasons.ts#L5`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/reasons.ts#L5) | const | Decision reason codes | 5 |
| `key` | [`src/core/ids.ts#L3`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ids.ts#L3) | function | Content-derived ids (sha256) | 4 |
| `MemoryRepositories` | [`src/core/memory.ts#L10`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/memory.ts#L10) | class | In-memory Repositories (tests) | 1, 8 |
| `settingsPolicy (gate, revalidate, admitsInferred)` | [`src/policy.ts#L167`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L167) | function | Policy port implementation | 5 |
| `policyVersion` | [`src/policy.ts#L116`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L116) | function | Policy hash | 5 |
| `policyEffects` | [`src/policy.ts#L144`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L144) | function | Policy change → ticket inputs | 5 |
| `assessmentOutcome` | [`src/policy.ts#L40`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L40) | function | Model assessment → outcome | 5 |
| `Store` | [`src/app/store.ts#L51`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L51) | class | SQLite, atomic, afterCommit, receipts | 8 |
| `Effects / Later` | [`src/app/effects.ts#L46`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L46) | class | Durable effect queue | 8 |
| `Outbox` | [`src/app/outbox.ts#L22`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/outbox.ts#L22) | class | Receipts + reply effects | 8 |
| `Passes` | [`src/app/passes.ts#L22`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/passes.ts#L22) | class | 2 s pass scheduler | 3 |
| `Setup` | [`src/app/setup.ts#L24`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/setup.ts#L24) | class | Account probes, worker environment | 2, 3 |
| `Settings` | [`src/app/settings.ts#L82`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/settings.ts#L82) | class | Revisioned saves, policyChanged | 10 |
| `Prompts / promptParts` | [`src/app/prompts.ts#L135`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/prompts.ts#L135) | class | Prompt versions and assembly | 9 |
| `Sessions / WORKER_PRESET / ROUTER_PRESET` | [`src/app/sessions.ts#L93`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L93) | class | DSH sessions, delivery, noWait | 0A, 7, 9 |
| `MasterAssessor` | [`src/app/assessment.ts#L89`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/assessment.ts#L89) | class | Assessment effect + eval tools | 5 |
| `mainTools` | [`src/app/tools/main.ts#L155`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/main.ts#L155) | function | Main Session tools | 9 |
| `executorTools` | [`src/app/tools/executor.ts#L23`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/executor.ts#L23) | function | Worker tools | 9 |
| `registerHttp / sameOrigin` | [`src/app/http.ts#L230`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L230) | function | Management API | 10 |
| `DshExecutor` | [`src/executor/dsh.ts#L207`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L207) | class | Executor port implementation | 7 |
| `WorkerSlots` | [`src/executor/dsh.ts#L171`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L171) | class | Concurrency slots | 7 |
| `transient` | [`src/executor/dsh.ts#L50`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L50) | function | Passing-failure classifier | 7, 11, 12 |
| `ticketExecution / inputMessage` | [`src/executor/dsh.ts#L97`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L97) | function | Worker directory/assignment, input render | 6, 7 |
| `SourceRegistry` | [`src/sources/registry.ts#L13`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/registry.ts#L13) | class | SourceScope implementation | 4 |
| `SourceKind` | [`src/sources/kind.ts#L85`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/kind.ts#L85) | interface | Source plugin contract | 4, 12 |
| `githubKind / apply / pollRound` | [`src/sources/github.ts#L38`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L38) | const | GitHub Source | 4 |
| `commentTrigger / issueTrigger / mentions` | [`src/sources/github-trigger.ts#L65`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L65) | function | GitHub → Trigger | 4, 12 |
| `claimPull / observePull / pullEndNotices` | [`src/sources/github-pull.ts#L35`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-pull.ts#L35) | function | PR binding and closes | 6 |
| `sendGithub` | [`src/sources/github-channel.ts#L18`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-channel.ts#L18) | function | Idempotent GitHub reply (marker) | 8 |
| `cursorAt / POLL_HORIZON_MS` | [`src/sources/poll.ts#L16`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/poll.ts#L16) | const | Overlapping cursor, 14-day horizon | 4 |
| `feishuKind` | [`src/sources/feishu.ts#L31`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu.ts#L31) | const | Feishu Source | 4 |
| `feishuTrigger` | [`src/sources/feishu-trigger.ts#L31`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu-trigger.ts#L31) | function | Feishu event → Trigger | 4 |
| `HealthBoard` | [`src/infra/health.ts#L15`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/infra/health.ts#L15) | class | One writer per health entry | 11, 13 |
| `Commands` | [`src/infra/commands.ts#L59`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/infra/commands.ts#L59) | class | gh / lark-cli / git transport | 2, 8 |

## Tests index (પુસ્તકમાં વપરાયેલા)

| Test file | પ્રકરણ |
| --- | --- |
| [`tests/core-engine.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts) | 0, 4, 5, 6, 7, 11 |
| [`tests/policy.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/policy.spec.ts) | 5, 11 |
| [`tests/sources.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/sources.spec.ts) | 4, 6, 12 |
| [`tests/runtime.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/runtime.spec.ts) | 2, 11 |
| [`tests/runtime-concurrency.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/runtime-concurrency.spec.ts) | 7, 11, 13 |
| [`tests/effects.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/effects.spec.ts) | 8, 11 |
| [`tests/store.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/store.spec.ts) | 8, 11 |
| [`tests/outbox.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/outbox.spec.ts) | 8, 11 |
| [`tests/migration.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/migration.spec.ts) | 8, 11 |
| [`tests/passes.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/passes.spec.ts) | 3 |
| [`tests/index.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/index.spec.ts) | 3 |
| [`tests/model-surface.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/model-surface.spec.ts) | 9 |
| [`tests/prompts.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/prompts.spec.ts) | 9, 12 |
| [`tests/tools.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/tools.spec.ts) | 9 |
| [`tests/panel-execution.spec.tsx`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/panel-execution.spec.tsx) | 10, 12 |
| [`tests/http.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/http.spec.ts) | 10 |
| [`tests/draft.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/draft.spec.ts) | 10 |
| [`tests/docs.spec.ts`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/docs.spec.ts) | 12 |
