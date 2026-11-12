# પરિશિષ્ટ A — Source અને symbol index

> આ પાનું `tools/build_index.py` વડે `tools/citations.tsv` અને પ્રકરણોમાંથી **આપોઆપ બને છે**. હાથે ન બદલો.
> બધી links commit `8c32a9d` પર pinned છે. ✅ દરેક file, line range અને "ઓળખ-લખાણ" pinned checkout સામે `tools/citations.py` વડે ચકાસાયેલું છે.

કુલ **254** સંદર્ભ, **75** files માં. "ઓળખ-લખાણ" એ તે લીટીઓમાં હોવું જ જોઈએ તેવું લખાણ છે; upstream બદલાય અને લખાણ ખસી જાય તો ચકાસણી નિષ્ફળ જાય છે.

## `src/core/assignments.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `assign-note` | [L21–L21](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L21-L21) | `const RECOVERY_NOTE` | [7](../book/07-worker-execution.md) |
| `assign-started` | [L34–L43](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L34-L43) | `started(ticketId: string, assignmentId: string): void` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |
| `assign-delivered` | [L48–L58](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L48-L58) | `delivered(ticketId: string, assignmentId: string, inputIds: string[]): void` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |
| `assign-read` | [L60–L65](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L60-L65) | `read(ticketId: string, inputIds: string[]): void` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |
| `assign-interrupted` | [L83–L92](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L83-L92) | `interrupted(ticketId: string, assignmentId: string): void` | [0A](../book/00a-lekh-ane-prototype.md), [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md), [11](../book/11-debugging.md), [13](../book/13-advanced-engineering.md) |
| `assign-report` | [L99–L134](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/assignments.ts#L99-L134) | `report(ticketId: string, report: WorkerReport): Ticket` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |

## `src/core/engine.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `engine-class` | [L24–L38](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L24-L38) | `export class Engine` | [13](../book/13-advanced-engineering.md) |
| `engine-receive` | [L48–L48](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L48-L48) | `receive(trigger: Trigger): ReceiveResult` | [4](../book/04-sources-intake.md), [13](../book/13-advanced-engineering.md) |
| `engine-evaluatedue` | [L75–L85](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L75-L85) | `evaluateDue(): void` | [13](../book/13-advanced-engineering.md) |
| `engine-decide` | [L100–L100](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L100-L100) | `decide(triggerId: string, outcome: Outcome): Decision` | [13](../book/13-advanced-engineering.md) |
| `engine-attach` | [L109–L121](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L109-L121) | `attach(ticketId: string, triggerId: string, note?: string): Ticket` | [6](../book/06-tickets-assignments.md) |
| `engine-stop` | [L160–L160](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L160-L160) | `stopTicket(ticketId: string, reason?: string): Ticket` | [6](../book/06-tickets-assignments.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md) |
| `engine-roles` | [L261–L270](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/engine.ts#L261-L270) | `export type EngineForSources` | [0](../book/00-paayo.md), [13](../book/13-advanced-engineering.md) |

## `src/core/errors.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `errors-table` | [L2–L47](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/errors.ts#L2-L47) | `export const USER_ERRORS` | [6](../book/06-tickets-assignments.md), [9](../book/09-tools-prompts-skills.md) |
| `errors-class` | [L54–L61](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/errors.ts#L54-L61) | `export class UserError extends Error` | [6](../book/06-tickets-assignments.md), [9](../book/09-tools-prompts-skills.md) |

## `src/core/evals.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `evals-requeues` | [L19–L19](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L19-L19) | `const REQUEUES = 2` | [5](../book/05-policy-eval.md) |
| `evals-due` | [L35–L46](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L35-L46) | `due(thread: Thread, policy: Policy): void` | [5](../book/05-policy-eval.md) |
| `evals-delivered` | [L48–L55](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L48-L55) | `delivered(evalId: string, policy: Policy): void` | [5](../book/05-policy-eval.md) |
| `evals-expire` | [L60–L69](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L60-L69) | `private expire(thread: Thread): void` | [5](../book/05-policy-eval.md), [11](../book/11-debugging.md) |
| `evals-start` | [L71–L119](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L71-L119) | `start(threadKeyValue: string, policy: Policy): void` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md), [13](../book/13-advanced-engineering.md) |
| `evals-decide` | [L131–L156](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L131-L156) | `decide(triggerId: string, outcome: Outcome): Decision` | [5](../book/05-policy-eval.md), [6](../book/06-tickets-assignments.md) |
| `evals-handback` | [L183–L188](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L183-L188) | `handback(ticketId: string, triggerId: string, reason: string): boolean` | [6](../book/06-tickets-assignments.md) |
| `evals-reassess` | [L223–L230](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L223-L230) | `private reassess` | [5](../book/05-policy-eval.md) |
| `evals-direct` | [L271–L280](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L271-L280) | `private directEval` | [5](../book/05-policy-eval.md) |
| `evals-decideeval` | [L282–L304](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L282-L304) | `private decideEval` | [5](../book/05-policy-eval.md), [6](../book/06-tickets-assignments.md) |
| `evals-stop` | [L293–L302](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L293-L302) | `stopNotExplicit` | [5](../book/05-policy-eval.md), [14](../book/14-antim-project.md) |
| `evals-accept` | [L306–L316](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/evals.ts#L306-L316) | `private accept` | [5](../book/05-policy-eval.md), [6](../book/06-tickets-assignments.md) |

## `src/core/ids.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `ids-key` | [L3–L5](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ids.ts#L3-L5) | `export function key` | [4](../book/04-sources-intake.md), [13](../book/13-advanced-engineering.md) |

## `src/core/intake.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `intake-receive` | [L19–L62](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L19-L62) | `receive(received: Trigger): ReceiveResult` | [0A](../book/00a-lekh-ane-prototype.md), [4](../book/04-sources-intake.md) |
| `intake-dup` | [L23–L23](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L23-L23) | `return 'duplicate'` | [4](../book/04-sources-intake.md) |
| `intake-filter` | [L25–L29](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L25-L29) | `return 'filtered'` | — |
| `intake-fanout` | [L38–L46](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L38-L46) | `const resumes = trigger.human` | [0A](../book/00a-lekh-ane-prototype.md), [13](../book/13-advanced-engineering.md) |
| `intake-queue` | [L58–L58](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L58-L58) | `if (!this.owners(trigger).length) this.queueForEval(trigger)` | — |

## `src/core/memory.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `memory-repo` | [L10–L24](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/memory.ts#L10-L24) | `export class MemoryRepositories implements Repositories` | [1](../book/01-domain-model.md), [8](../book/08-store-effects-outbox.md) |

## `src/core/model.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `model-trigger` | [L23–L39](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L23-L39) | `export interface Trigger` | [0](../book/00-paayo.md), [1](../book/01-domain-model.md) |
| `model-disposition` | [L42–L61](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L42-L61) | `export interface TriggerDisposition` | [1](../book/01-domain-model.md), [11](../book/11-debugging.md), [15](../book/15-aagal-no-rasto.md) |
| `model-owners` | [L75–L88](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L75-L88) | `export function followupOwners` | [0A](../book/00a-lekh-ane-prototype.md), [1](../book/01-domain-model.md), [6](../book/06-tickets-assignments.md), [11](../book/11-debugging.md) |
| `model-settled` | [L93–L94](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L93-L94) | `export const settled` | — |
| `model-basis` | [L116–L123](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L116-L123) | `export type MandateBasis` | [1](../book/01-domain-model.md) |
| `model-mandate` | [L126–L133](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L126-L133) | `export interface Mandate` | [1](../book/01-domain-model.md) |
| `model-evaluation` | [L136–L154](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L136-L154) | `export interface Evaluation` | [1](../book/01-domain-model.md) |
| `model-thread` | [L157–L182](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L157-L182) | `export interface Thread` | [1](../book/01-domain-model.md) |
| `model-decision` | [L192–L209](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L192-L209) | `export interface Decision` | [1](../book/01-domain-model.md), [15](../book/15-aagal-no-rasto.md) |
| `model-report` | [L216–L216](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L216-L216) | `export type ReportState` | [1](../book/01-domain-model.md), [7](../book/07-worker-execution.md) |
| `model-assignment` | [L218–L233](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L218-L233) | `export interface Assignment` | [1](../book/01-domain-model.md) |
| `model-input` | [L235–L257](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L235-L257) | `export type TicketInput` | — |
| `model-attention` | [L275–L275](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L275-L275) | `export interface Attention` | [1](../book/01-domain-model.md), [9](../book/09-tools-prompts-skills.md), [15](../book/15-aagal-no-rasto.md) |
| `model-ticket` | [L277–L308](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L277-L308) | `export interface Ticket` | [1](../book/01-domain-model.md) |
| `model-live` | [L318–L318](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L318-L318) | `export const liveTicket` | [1](../book/01-domain-model.md), [10](../book/10-panel.md) |
| `model-waits` | [L349–L353](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L349-L353) | `export function waitsForPerson` | [6](../book/06-tickets-assignments.md) |

## `src/core/part.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `part-leftworkers` | [L32–L35](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/part.ts#L32-L35) | `protected leftToWorkers` | [6](../book/06-tickets-assignments.md), [9](../book/09-tools-prompts-skills.md) |
| `part-handback` | [L42–L48](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/part.ts#L42-L48) | `protected handBack` | [6](../book/06-tickets-assignments.md), [11](../book/11-debugging.md) |
| `part-queue` | [L57–L63](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/part.ts#L57-L63) | `protected queueForEval` | [4](../book/04-sources-intake.md) |

## `src/core/ports.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `ports-gate` | [L7–L7](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L7-L7) | `export type GateResult` | [0](../book/00-paayo.md), [1](../book/01-domain-model.md) |
| `ports-policy` | [L17–L27](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L17-L27) | `export interface Policy` | [1](../book/01-domain-model.md) |
| `ports-assessor` | [L49–L53](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L49-L53) | `export interface Assessor` | [1](../book/01-domain-model.md) |
| `ports-executor` | [L59–L69](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L59-L69) | `export interface Executor` | [1](../book/01-domain-model.md), [7](../book/07-worker-execution.md), [13](../book/13-advanced-engineering.md) |
| `ports-outbox` | [L76–L83](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L76-L83) | `export interface Outbox` | [8](../book/08-store-effects-outbox.md) |
| `ports-events` | [L86–L102](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L86-L102) | `export interface DomainEvents` | [3](../book/03-startup.md), [13](../book/13-advanced-engineering.md) |
| `ports-repos` | [L106–L134](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L106-L134) | `export interface Repositories` | [1](../book/01-domain-model.md), [8](../book/08-store-effects-outbox.md) |

## `src/core/reasons.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `reasons-table` | [L5–L26](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/reasons.ts#L5-L26) | `export const REASONS` | [5](../book/05-policy-eval.md), [13](../book/13-advanced-engineering.md) |

## `src/core/replies.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `replies-ack` | [L48–L63](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/replies.ts#L48-L63) | `private acknowledge` | [6](../book/06-tickets-assignments.md) |
| `replies-answer` | [L64–L92](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/replies.ts#L64-L92) | `private answer` | [6](../book/06-tickets-assignments.md) |

## `src/core/stage.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `stage-fn` | [L9–L21](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/stage.ts#L9-L21) | `export function ticketStage` | [6](../book/06-tickets-assignments.md), [10](../book/10-panel.md) |
| `stage-retry` | [L24–L26](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/stage.ts#L24-L26) | `export function canRetry` | [6](../book/06-tickets-assignments.md) |

## `src/core/tickets.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `tickets-create` | [L37–L56](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L37-L56) | `create(id: string, decisionId: string, mandate: Mandate` | [6](../book/06-tickets-assignments.md), [15](../book/15-aagal-no-rasto.md) |
| `tickets-closed` | [L77–L90](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L77-L90) | `threadClosed(thread: ThreadRef` | [6](../book/06-tickets-assignments.md) |
| `tickets-followsdone` | [L95–L101](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L95-L101) | `followsDone(ticket: Ticket)` | [6](../book/06-tickets-assignments.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md) |
| `tickets-retry` | [L168–L180](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L168-L180) | `retry(ticketId: string): Ticket` | [6](../book/06-tickets-assignments.md) |
| `tickets-addinput` | [L234–L245](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L234-L245) | `addInput(ticket: Ticket, input: TicketInput): void` | [6](../book/06-tickets-assignments.md) |
| `tickets-wake` | [L252–L270](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L252-L270) | `wake(ticketId: string): void` | [6](../book/06-tickets-assignments.md) |
| `tickets-letgo` | [L294–L309](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L294-L309) | `private letGo` | [6](../book/06-tickets-assignments.md) |
| `tickets-restart` | [L318–L327](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L318-L327) | `restart(ticket: Ticket, running: Assignment` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |
| `tickets-end` | [L345–L363](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L345-L363) | `end(ticketId: string, by: TicketEndBy` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md), [10](../book/10-panel.md) |
| `tickets-unfinished` | [L370–L379](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/tickets.ts#L370-L379) | `private unfinished` | [6](../book/06-tickets-assignments.md) |

## `src/app/api.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `api-filters` | [L12–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/api.ts#L12-L12) | `export const TICKET_FILTERS` | [10](../book/10-panel.md) |
| `api-stop` | [L36–L36](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/api.ts#L36-L36) | `'POST tickets/:id/stop'` | [10](../book/10-panel.md) |

## `src/app/assessment.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `assess-limits` | [L37–L37](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/assessment.ts#L37-L37) | `STUB_CHARS = 50` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md), [13](../book/13-advanced-engineering.md) |
| `assess-handler` | [L96–L101](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/assessment.ts#L96-L101) | `this.host.engine.candidateDelivered(evalId)` | [5](../book/05-policy-eval.md) |
| `assess-request` | [L104–L104](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/assessment.ts#L104-L104) | `request(candidate: Candidate): void` | [5](../book/05-policy-eval.md) |

## `src/app/effects.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `effects-later` | [L5–L7](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L5-L7) | `export class Later extends Error` | [7](../book/07-worker-execution.md), [8](../book/08-store-effects-outbox.md) |
| `effects-payloads` | [L11–L24](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L11-L24) | `export interface EffectPayloads` | [1](../book/01-domain-model.md), [8](../book/08-store-effects-outbox.md) |
| `effects-enqueue` | [L61–L66](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L61-L66) | `enqueue<K extends EffectKind>` | [8](../book/08-store-effects-outbox.md) |
| `effects-dispatch` | [L103–L122](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L103-L122) | `private dispatch(): void` | [8](../book/08-store-effects-outbox.md) |
| `effects-attempt` | [L130–L146](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L130-L146) | `private async attempt` | [8](../book/08-store-effects-outbox.md), [13](../book/13-advanced-engineering.md) |

## `src/app/http.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `http-origin` | [L75–L79](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L75-L79) | `export function sameOrigin` | [2](../book/02-setup-operation.md), [10](../book/10-panel.md) |
| `http-failure` | [L81–L91](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L81-L91) | `function failure(error: unknown)` | [10](../book/10-panel.md) |
| `http-state` | [L105–L110](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L105-L110) | `export function stateView` | [2](../book/02-setup-operation.md), [10](../book/10-panel.md) |
| `http-requeue` | [L177–L181](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L177-L181) | `'POST triggers/:id/requeue'` | [10](../book/10-panel.md) |
| `http-stop` | [L194–L194](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L194-L194) | `'POST tickets/:id/stop'` | [10](../book/10-panel.md) |
| `http-register` | [L230–L247](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L230-L247) | `export function registerHttp` | [2](../book/02-setup-operation.md), [10](../book/10-panel.md) |

## `src/app/migration.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `migration-versions` | [L20–L22](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/migration.ts#L20-L22) | `export const SCHEMA_VERSION = 11` | [8](../book/08-store-effects-outbox.md), [11](../book/11-debugging.md) |

## `src/app/outbox.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `outbox-class` | [L22–L25](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/outbox.ts#L22-L25) | `export class Outbox implements OutboxPort` | [8](../book/08-store-effects-outbox.md) |
| `outbox-send` | [L27–L32](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/outbox.ts#L27-L32) | `send(message: OutboundMessage): void` | [0A](../book/00a-lekh-ane-prototype.md), [8](../book/08-store-effects-outbox.md) |
| `outbox-deliver` | [L39–L51](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/outbox.ts#L39-L51) | `private async deliver(id: string): Promise<void>` | [8](../book/08-store-effects-outbox.md), [11](../book/11-debugging.md) |

## `src/app/passes.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `passes-start` | [L28–L28](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/passes.ts#L28-L28) | `setInterval(() => { this.request() }, 2000)` | [3](../book/03-startup.md) |
| `passes-receive` | [L34–L39](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/passes.ts#L34-L39) | `if (result === 'stored') this.request()` | [3](../book/03-startup.md) |
| `passes-pump` | [L56–L68](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/passes.ts#L56-L68) | `this.host.engine.evaluateDue()` | [3](../book/03-startup.md), [13](../book/13-advanced-engineering.md) |

## `src/app/prompts.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `prompts-teams` | [L14–L14](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/prompts.ts#L14-L14) | `export const TEAM_SECTIONS` | [9](../book/09-tools-prompts-skills.md), [15](../book/15-aagal-no-rasto.md) |
| `prompts-keys` | [L24–L26](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/prompts.ts#L24-L26) | `const PART_KEYS` | [9](../book/09-tools-prompts-skills.md) |
| `prompts-schema` | [L35–L35](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/prompts.ts#L35-L35) | `export const PromptConfigSchema` | [9](../book/09-tools-prompts-skills.md), [12](../book/12-customization.md) |
| `prompts-parts` | [L102–L115](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/prompts.ts#L102-L115) | `export function promptParts` | [9](../book/09-tools-prompts-skills.md) |

## `src/app/resources.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `resources-text` | [L87–L87](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/resources.ts#L87-L87) | `textPage(resource, body, offset, limit ?? 4000)` | [0A](../book/00a-lekh-ane-prototype.md), [9](../book/09-tools-prompts-skills.md) |

## `src/app/runtime.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `rt-orchestrator` | [L51–L51](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L51-L51) | `interface Context { orchestrator: SourceHost }` | [3](../book/03-startup.md) |
| `rt-class` | [L59–L59](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L59-L59) | `export class Runtime extends Service implements SourceHost` | [3](../book/03-startup.md) |
| `rt-lock` | [L90–L98](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L90-L98) | `lockSync(machine.stateDir` | [3](../book/03-startup.md), [8](../book/08-store-effects-outbox.md), [13](../book/13-advanced-engineering.md) |
| `rt-master` | [L104–L105](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L104-L105) | `orchestrator-${key(machine.stateDir)}` | [0A](../book/00a-lekh-ane-prototype.md), [3](../book/03-startup.md) |
| `rt-getter` | [L128–L130](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L128-L130) | `get engine() { return runtime.engine }` | [3](../book/03-startup.md), [13](../book/13-advanced-engineering.md) |
| `rt-engine` | [L137–L153](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L137-L153) | `new Engine({ repo: store` | [3](../book/03-startup.md) |
| `rt-emit` | [L138–L153](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L138-L153) | `followupNotice(store, sources, event.data.triggerId)` | [0A](../book/00a-lekh-ane-prototype.md), [3](../book/03-startup.md), [13](../book/13-advanced-engineering.md) |
| `rt-passes` | [L157–L158](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L157-L158) | `new Passes(` | — |
| `rt-ctor-fail` | [L167–L171](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L167-L171) | `opened?.close()` | [3](../book/03-startup.md) |
| `rt-paused` | [L200–L200](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L200-L200) | `private paused(): boolean` | — |
| `rt-init` | [L201–L218](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L201-L218) | `private async initialize(): Promise<void>` | [3](../book/03-startup.md) |
| `rt-shutdown` | [L229–L253](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L229-L253) | `private async shutdown(): Promise<void>` | [3](../book/03-startup.md), [13](../book/13-advanced-engineering.md) |

## `src/app/sessions.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `sessions-presets` | [L48–L48](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L48-L48) | `WORKER_PRESET = 'dsh-superagent-worker', ROUTER_PRESET = 'dsh-superagent-router'` | [0A](../book/00a-lekh-ane-prototype.md), [7](../book/07-worker-execution.md), [14](../book/14-antim-project.md) |
| `sessions-worktools` | [L61–L62](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L61-L62) | `const WORK_TOOLS` | [7](../book/07-worker-execution.md) |
| `sessions-nowait` | [L77–L86](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L77-L86) | `function noWait` | [0A](../book/00a-lekh-ane-prototype.md), [9](../book/09-tools-prompts-skills.md) |
| `sessions-relay-handler` | [L104–L105](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L104-L105) | `host.effects.handle('relay'` | [0A](../book/00a-lekh-ane-prototype.md) |
| `sessions-ensure` | [L138–L155](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L138-L155) | `async ensure(id: string, cwd: string, title: string` | [7](../book/07-worker-execution.md) |
| `sessions-prompt` | [L162–L167](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L162-L167) | `async prompt(sessionId: string, requestId: string` | [7](../book/07-worker-execution.md), [8](../book/08-store-effects-outbox.md) |
| `sessions-register` | [L206–L216](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/sessions.ts#L206-L216) | `private registerTool` | [9](../book/09-tools-prompts-skills.md) |

## `src/app/settings.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `settings-save` | [L148–L196](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/settings.ts#L148-L196) | `async save(block: SettingsBlock, value: unknown, revision: number, origin: SettingsOrigin)` | [5](../book/05-policy-eval.md), [8](../book/08-store-effects-outbox.md), [10](../book/10-panel.md), [13](../book/13-advanced-engineering.md) |

## `src/app/setup.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `setup-run` | [L45–L52](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/setup.ts#L45-L52) | `async run(settings: Settings): Promise<boolean>` | [3](../book/03-startup.md) |
| `setup-restart` | [L59–L59](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/setup.ts#L59-L59) | `setTimeout(this.host.restart, 0)` | [3](../book/03-startup.md), [10](../book/10-panel.md) |

## `src/app/store.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `store-sets` | [L30–L44](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L30-L44) | `const SETS` | [8](../book/08-store-effects-outbox.md) |
| `store-open` | [L58–L101](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L58-L101) | `PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL` | [0A](../book/00a-lekh-ane-prototype.md), [8](../book/08-store-effects-outbox.md), [13](../book/13-advanced-engineering.md) |
| `store-newer` | [L66–L67](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L66-L67) | `Unsupported orchestrator database version` | [8](../book/08-store-effects-outbox.md), [11](../book/11-debugging.md) |
| `store-atomic` | [L140–L153](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L140-L153) | `atomic<T>(operation: () => T): T` | [8](../book/08-store-effects-outbox.md), [13](../book/13-advanced-engineering.md) |
| `store-aftercommit` | [L159–L162](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L159-L162) | `afterCommit(action: () => void): void` | [8](../book/08-store-effects-outbox.md) |
| `store-behind` | [L259–L261](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L259-L261) | `behind: (id: string, failures: number)` | [8](../book/08-store-effects-outbox.md), [11](../book/11-debugging.md) |
| `store-receipts` | [L254–L288](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L254-L288) | `readonly receipts` | [8](../book/08-store-effects-outbox.md) |

## `src/app/tools/executor.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `tools-executor` | [L23–L27](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/executor.ts#L23-L27) | `export function executorTools` | [9](../book/09-tools-prompts-skills.md) |
| `tools-ack` | [L28–L40](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/executor.ts#L28-L40) | `orchestrator_ack` | [0A](../book/00a-lekh-ane-prototype.md), [6](../book/06-tickets-assignments.md), [9](../book/09-tools-prompts-skills.md) |
| `tools-handback` | [L65–L73](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/executor.ts#L65-L73) | `orchestrator_trigger_handback` | [0A](../book/00a-lekh-ane-prototype.md), [6](../book/06-tickets-assignments.md), [9](../book/09-tools-prompts-skills.md) |
| `tools-report` | [L74–L103](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/executor.ts#L74-L103) | `orchestrator_report` | [7](../book/07-worker-execution.md), [9](../book/09-tools-prompts-skills.md), [15](../book/15-aagal-no-rasto.md) |

## `src/app/tools/main.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `tools-route-schema` | [L47–L56](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/main.ts#L47-L56) | `const RouteItemSchema` | [9](../book/09-tools-prompts-skills.md) |
| `tools-route-fields` | [L61–L68](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/main.ts#L61-L68) | `const FIELDS` | [9](../book/09-tools-prompts-skills.md) |
| `tools-route` | [L88–L120](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/main.ts#L88-L120) | `function route(` | [5](../book/05-policy-eval.md), [9](../book/09-tools-prompts-skills.md) |
| `tools-main` | [L155–L160](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/main.ts#L155-L160) | `export function mainTools` | [9](../book/09-tools-prompts-skills.md) |
| `tools-requeue` | [L188–L201](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/tools/main.ts#L188-L201) | `orchestrator_trigger_requeue` | [9](../book/09-tools-prompts-skills.md) |

## `src/app/views/records.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `views-actions` | [L123–L123](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/views/records.ts#L123-L123) | `actions: { retry: canRetry(ticket), stop: liveTicket(ticket) }` | [10](../book/10-panel.md) |

## `src/client/api.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `client-fetch` | [L33–L57](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/client/api.ts#L33-L57) | `'x-orchestrator-request': '1'` | [10](../book/10-panel.md) |

## `src/client/draft.tsx`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `client-draft` | [L80–L85](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/client/draft.tsx#L80-L85) | `export function draftReducer` | [10](../book/10-panel.md) |

## `src/client/provider.tsx`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `client-action` | [L42–L56](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/client/provider.tsx#L42-L56) | `export function useAction` | [10](../book/10-panel.md) |

## `src/client/ticket.tsx`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `client-stop` | [L192–L196](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/client/ticket.tsx#L192-L196) | `onConfirm={() => after(call('POST tickets/:id/stop', { id }))}` | [10](../book/10-panel.md), [12](../book/12-customization.md) |

## `src/deployment.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `deploy-config` | [L15–L17](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/deployment.ts#L15-L17) | `stateDir: absolute` | [0](../book/00-paayo.md) |

## `src/executor/dsh.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `dsh-session-id` | [L24–L24](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L24-L24) | `export const workerSessionId` | [0A](../book/00a-lekh-ane-prototype.md), [7](../book/07-worker-execution.md) |
| `dsh-limits` | [L28–L36](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L28-L36) | `const BACKGROUND_LIMIT_MS = 30 * 60_000` | [0A](../book/00a-lekh-ane-prototype.md), [7](../book/07-worker-execution.md) |
| `dsh-prepare-failed` | [L39–L43](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L39-L43) | `class PrepareFailed extends Error` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md) |
| `dsh-transient` | [L44–L55](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L44-L55) | `export function transient` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md), [12](../book/12-customization.md) |
| `dsh-execution` | [L97–L111](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L97-L111) | `export function ticketExecution` | [6](../book/06-tickets-assignments.md) |
| `dsh-capped` | [L113–L116](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L113-L116) | `const ASSIGNMENT_CHARS = 1500, TRIGGER_CHARS = 600` | [0A](../book/00a-lekh-ane-prototype.md), [7](../book/07-worker-execution.md) |
| `dsh-policy-msg` | [L138–L148](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L138-L148) | `function policyMessage` | [5](../book/05-policy-eval.md) |
| `dsh-input-msg` | [L156–L164](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L156-L164) | `export function inputMessage` | [7](../book/07-worker-execution.md) |
| `dsh-slots` | [L171–L199](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L171-L199) | `export class WorkerSlots` | [7](../book/07-worker-execution.md), [13](../book/13-advanced-engineering.md) |
| `dsh-ctor` | [L228–L236](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L228-L236) | `host.effects.handle('launch'` | — |
| `dsh-prepare` | [L247–L262](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L247-L262) | `private async prepareDirectory` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |
| `dsh-start` | [L264–L268](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L264-L268) | `this.host.effects.enqueue('launch'` | [7](../book/07-worker-execution.md) |
| `dsh-launch-queued` | [L270–L285](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L270-L285) | `private async launchQueued` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md) |
| `dsh-deliver-queued` | [L290–L328](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L290-L328) | `private async deliverQueued` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md) |
| `dsh-stop` | [L357–L370](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L357-L370) | `stop(ticket: Ticket, assignment: Assignment, reason: string): void` | [7](../book/07-worker-execution.md), [13](../book/13-advanced-engineering.md) |
| `dsh-launch` | [L424–L470](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L424-L470) | `private async launch` | [7](../book/07-worker-execution.md), [13](../book/13-advanced-engineering.md) |
| `dsh-inbox-remove` | [L446–L448](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L446-L448) | `agent.inbox.remove` | [7](../book/07-worker-execution.md), [8](../book/08-store-effects-outbox.md) |
| `dsh-install` | [L477–L512](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L477-L512) | `install(): void` | [7](../book/07-worker-execution.md) |
| `dsh-read-event` | [L495–L504](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L495-L504) | `this.host.engine.inputsRead(ticketId, read)` | [7](../book/07-worker-execution.md) |
| `dsh-resume` | [L524–L537](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L524-L537) | `resume(): void` | [7](../book/07-worker-execution.md), [13](../book/13-advanced-engineering.md) |
| `dsh-resume-after` | [L555–L576](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L555-L576) | `private resumeAfter` | [7](../book/07-worker-execution.md) |
| `dsh-idle` | [L601–L672](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L601-L672) | `private async workerIdle` | [7](../book/07-worker-execution.md) |

## `src/index.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `index-apply` | [L7–L25](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/index.ts#L7-L25) | `export async function apply` | [0](../book/00-paayo.md), [3](../book/03-startup.md) |
| `index-inject` | [L8–L8](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/index.ts#L8-L8) | `export const inject` | [3](../book/03-startup.md) |

## `src/infra/environment.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `env-token` | [L45–L48](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/infra/environment.ts#L45-L48) | `GH_TOKEN: undefined` | [0A](../book/00a-lekh-ane-prototype.md), [7](../book/07-worker-execution.md) |

## `src/infra/text.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `text-limits` | [L3–L4](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/infra/text.ts#L3-L4) | `export const IM_WORDS = 100` | [0A](../book/00a-lekh-ane-prototype.md), [8](../book/08-store-effects-outbox.md), [9](../book/09-tools-prompts-skills.md), [13](../book/13-advanced-engineering.md) |
| `text-samename` | [L19–L19](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/infra/text.ts#L19-L19) | `export const sameName` | [1](../book/01-domain-model.md), [11](../book/11-debugging.md) |

## `src/policy.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `policy-outcome` | [L40–L61](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L40-L61) | `export function assessmentOutcome` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md) |
| `policy-rules` | [L62–L65](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L62-L65) | `const DEFAULT_RULES` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md), [15](../book/15-aagal-no-rasto.md) |
| `policy-evalcfg` | [L83–L87](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L83-L87) | `export const EvalConfigSchema` | [0](../book/00-paayo.md), [5](../book/05-policy-eval.md) |
| `policy-execcfg` | [L91–L97](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L91-L97) | `export const ExecutorConfigSchema` | [7](../book/07-worker-execution.md) |
| `policy-version` | [L116–L118](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L116-L118) | `export function policyVersion` | [5](../book/05-policy-eval.md) |
| `policy-allowed` | [L119–L121](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L119-L121) | `export function allowedSender` | [1](../book/01-domain-model.md), [5](../book/05-policy-eval.md), [15](../book/15-aagal-no-rasto.md) |
| `policy-effects` | [L144–L165](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L144-L165) | `export function policyEffects` | [5](../book/05-policy-eval.md), [14](../book/14-antim-project.md) |
| `policy-machinegate` | [L171–L188](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L171-L188) | `const machineGate` | [5](../book/05-policy-eval.md) |
| `policy-gate` | [L191–L211](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L191-L211) | `gate(trigger: Trigger, thread, tickets)` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md), [11](../book/11-debugging.md), [13](../book/13-advanced-engineering.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md) |
| `policy-admits` | [L212–L212](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L212-L212) | `admitsInferred` | [5](../book/05-policy-eval.md) |
| `policy-revalidate` | [L213–L240](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L213-L240) | `revalidate(mandate: Mandate)` | [5](../book/05-policy-eval.md), [6](../book/06-tickets-assignments.md) |

## `src/sources/feishu-channel.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `feishu-idem` | [L18–L24](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu-channel.ts#L18-L24) | `--idempotency-key` | [8](../book/08-store-effects-outbox.md) |

## `src/sources/feishu-loops.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `feishu-watch` | [L43–L66](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu-loops.ts#L43-L66) | `async function watch` | [4](../book/04-sources-intake.md) |
| `feishu-consume` | [L70–L103](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu-loops.ts#L70-L103) | `async function consume` | [4](../book/04-sources-intake.md), [12](../book/12-customization.md) |

## `src/sources/feishu-trigger.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `feishu-trigger` | [L31–L44](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu-trigger.ts#L31-L44) | `export function feishuTrigger` | [4](../book/04-sources-intake.md) |

## `src/sources/feishu.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `feishu-scope` | [L54–L59](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/feishu.ts#L54-L59) | `direct_messages_not_allowed` | [4](../book/04-sources-intake.md) |

## `src/sources/github-channel.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `gh-channel` | [L18–L45](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-channel.ts#L18-L45) | `export async function sendGithub` | [8](../book/08-store-effects-outbox.md) |
| `gh-marker` | [L34–L40](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-channel.ts#L34-L40) | `<!-- dsh-superagent:${message.id} -->` | [8](../book/08-store-effects-outbox.md) |

## `src/sources/github-pull.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `ghp-branch` | [L27–L28](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-pull.ts#L27-L28) | `export const ticketBranch` | [6](../book/06-tickets-assignments.md) |
| `ghp-claim` | [L35–L50](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-pull.ts#L35-L50) | `export function claimPull` | [6](../book/06-tickets-assignments.md), [15](../book/15-aagal-no-rasto.md) |
| `ghp-observe` | [L57–L69](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-pull.ts#L57-L69) | `export async function observePull` | [6](../book/06-tickets-assignments.md) |
| `ghp-notices` | [L90–L105](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-pull.ts#L90-L105) | `export function pullEndNotices` | [6](../book/06-tickets-assignments.md) |

## `src/sources/github-trigger.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `ght-channel` | [L8–L9](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L8-L9) | `export const githubChannel` | [4](../book/04-sources-intake.md) |
| `ght-human` | [L46–L47](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L46-L47) | `export const isHumanLogin` | [4](../book/04-sources-intake.md) |
| `ght-mentions` | [L60–L61](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L60-L61) | `export const mentions` | [4](../book/04-sources-intake.md), [12](../book/12-customization.md) |
| `ght-comment` | [L65–L77](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L65-L77) | `export function commentTrigger` | [4](../book/04-sources-intake.md) |
| `ght-issue` | [L82–L89](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L82-L89) | `export function issueTrigger` | [4](../book/04-sources-intake.md) |

## `src/sources/github.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `gh-config` | [L25–L28](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L25-L28) | `const GithubConfigSchema` | [4](../book/04-sources-intake.md) |
| `gh-scope` | [L59–L62](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L59-L62) | `scope: ({ meta }, config) =>` | [4](../book/04-sources-intake.md) |
| `gh-env` | [L92–L105](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L92-L105) | `DSH_SUPERAGENT_GITHUB_REPOSITORY` | [7](../book/07-worker-execution.md) |
| `gh-apply` | [L110–L122](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L110-L122) | `export function apply(ctx: Context): void` | [3](../book/03-startup.md), [4](../book/04-sources-intake.md) |
| `gh-watch` | [L127–L146](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L127-L146) | `async function watch` | [4](../book/04-sources-intake.md) |
| `gh-stream` | [L203–L249](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L203-L249) | `async function readStream` | — |
| `gh-round` | [L280–L296](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L280-L296) | `export async function pollRound` | [4](../book/04-sources-intake.md) |
| `gh-notifications` | [L298–L343](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L298-L343) | `async function pollNotifications` | [4](../book/04-sources-intake.md) |
| `gh-notified` | [L344–L374](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L344-L374) | `async function readNotified` | [2](../book/02-setup-operation.md), [4](../book/04-sources-intake.md) |
| `gh-comments` | [L384–L403](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L384-L403) | `async function intakeComments` | [4](../book/04-sources-intake.md) |
| `gh-self` | [L397–L397](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L397-L397) | `if (sameName(comment.user.login, login)) continue` | [2](../book/02-setup-operation.md), [4](../book/04-sources-intake.md) |

## `src/sources/host.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `host-context` | [L31–L45](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/host.ts#L31-L45) | `export interface SourceContext` | — |
| `host-receive` | [L41–L42](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/host.ts#L41-L42) | `callers should await completion before advancing read cursors` | [4](../book/04-sources-intake.md), [8](../book/08-store-effects-outbox.md) |

## `src/sources/kind.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `kind-source` | [L85–L113](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/kind.ts#L85-L113) | `export interface SourceKind` | [1](../book/01-domain-model.md), [4](../book/04-sources-intake.md), [12](../book/12-customization.md), [15](../book/15-aagal-no-rasto.md) |
| `kind-channel` | [L46–L56](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/kind.ts#L46-L56) | `export interface SourceChannel` | — |

## `src/sources/poll.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `poll-horizon` | [L6–L6](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/poll.ts#L6-L6) | `export const POLL_HORIZON_MS` | [4](../book/04-sources-intake.md) |
| `poll-cursor` | [L16–L16](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/poll.ts#L16-L16) | `export const cursorAt` | [4](../book/04-sources-intake.md) |

## `src/sources/registry.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `registry-register` | [L20–L35](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/registry.ts#L20-L35) | `register<C extends Record<string, unknown>>` | [4](../book/04-sources-intake.md), [12](../book/12-customization.md) |
| `registry-scope` | [L124–L132](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/registry.ts#L124-L132) | `scope(input: { source: string; meta: Record<string, unknown> }` | [4](../book/04-sources-intake.md) |

## `docs/000-philosophy.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-philosophy` | [L1–L10](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/000-philosophy.md#L1-L10) | `Take as little human attention as possible` | [0](../book/00-paayo.md), [2](../book/02-setup-operation.md), [12](../book/12-customization.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md), [નકશો](../book/overview-samagra-naksho.md) |

## `docs/001-domain.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-domain` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/001-domain.md#L1-L12) | `Work moves from Trigger to Eval to execution` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md) |

## `docs/002-authorization.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-auth` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/002-authorization.md#L1-L12) | `The host enforces allowed lists, rules and Mandates` | [1](../book/01-domain-model.md), [4](../book/04-sources-intake.md), [5](../book/05-policy-eval.md), [12](../book/12-customization.md), [15](../book/15-aagal-no-rasto.md) |

## `docs/003-execution.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-exec` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/003-execution.md#L1-L12) | `Each open Ticket has one stage` | [6](../book/06-tickets-assignments.md), [7](../book/07-worker-execution.md) |

## `docs/004-prompts.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-prompts` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/004-prompts.md#L1-L12) | `A team can edit three team sections` | [0A](../book/00a-lekh-ane-prototype.md), [9](../book/09-tools-prompts-skills.md), [12](../book/12-customization.md), [15](../book/15-aagal-no-rasto.md) |

## `docs/005-panel.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-panel` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/005-panel.md#L1-L12) | `Does anything need me now?` | [4](../book/04-sources-intake.md), [10](../book/10-panel.md) |

## `docs/006-deployment.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-deploy` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/006-deployment.md#L1-L12) | `A dedicated DeepSeek Harness profile` | [0A](../book/00a-lekh-ane-prototype.md), [2](../book/02-setup-operation.md), [7](../book/07-worker-execution.md), [10](../book/10-panel.md), [11](../book/11-debugging.md), [12](../book/12-customization.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md), [નકશો](../book/overview-samagra-naksho.md) |

## `docs/007-architecture.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-arch` | [L1–L10](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/007-architecture.md#L1-L10) | `Core classes own domain concepts` | [0](../book/00-paayo.md), [1](../book/01-domain-model.md), [3](../book/03-startup.md), [8](../book/08-store-effects-outbox.md), [9](../book/09-tools-prompts-skills.md), [13](../book/13-advanced-engineering.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md) |

## `docs/008-cookbook.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `doc-cookbook` | [L1–L10](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/008-cookbook.md#L1-L10) | `Add a Source` | [12](../book/12-customization.md), [15](../book/15-aagal-no-rasto.md) |

## `tests/core-engine.spec.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `test-engine-harness` | [L15–L66](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L15-L66) | `function harness(` | [1](../book/01-domain-model.md), [11](../book/11-debugging.md) |
| `test-intake-once` | [L75–L82](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L75-L82) | `stores a trigger once and records source filtering` | [4](../book/04-sources-intake.md), [11](../book/11-debugging.md) |
| `test-debounce` | [L104–L114](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L104-L114) | `serializes evals per thread and debounces triggers that arrive meanwhile` | [5](../book/05-policy-eval.md) |
| `test-accept-atomic` | [L136–L145](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L136-L145) | `records an accept with its ticket, subscriptions and acknowledgement together, or none of them` | [6](../book/06-tickets-assignments.md) |
| `test-deadline` | [L161–L185](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L161-L185) | `deadline from its delivery` | [5](../book/05-policy-eval.md), [11](../book/11-debugging.md) |
| `test-fanout` | [L187–L205](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L187-L205) | `later message on a subscribed thread to the live ticket as context, and not to Eval` | [11](../book/11-debugging.md) |
| `test-resume` | [L296–L311](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L296-L311) | `resumes an ended ticket on any person` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md) |
| `test-interrupted` | [L702–L722](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/core-engine.spec.ts#L702-L722) | `starts an Assignment interrupted mid-work again with a note` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md) |

## `tests/fixtures/host.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `test-host-fixture` | [L1–L20](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/fixtures/host.ts#L1-L20) | — | [0](../book/00-paayo.md), [2](../book/02-setup-operation.md), [11](../book/11-debugging.md) |

## `tests/panel-execution.spec.tsx`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `test-double-stop` | [L217–L217](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/panel-execution.spec.tsx#L217-L217) | `sends one stop for a double click on Confirm` | [10](../book/10-panel.md) |

## `tests/runtime.spec.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `test-prepare` | [L1079–L1097](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/runtime.spec.ts#L1079-L1097) | `runs the prepare command once for a new ticket` | [7](../book/07-worker-execution.md), [11](../book/11-debugging.md) |

## `tests/sources.spec.ts`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `test-feishu-flaky` | [L1089–L1099](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/sources.spec.ts#L1089-L1099) | `takes in the event lines it reads` | [12](../book/12-customization.md) |
| `test-fake-cli` | [L1046–L1060](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/tests/sources.spec.ts#L1046-L1060) | `events) echo '[event] ready' >&2` | [11](../book/11-debugging.md) |

## `README.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `readme` | [L1–L10](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/README.md#L1-L10) | `Research prototype for reference only` | [0](../book/00-paayo.md), [0A](../book/00a-lekh-ane-prototype.md) |

## `SETUP.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `setup-md` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/SETUP.md#L1-L12) | `Ask one question per message` | [2](../book/02-setup-operation.md), [14](../book/14-antim-project.md), [15](../book/15-aagal-no-rasto.md) |

## `cordis.patch.yml`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `patch-worker` | [L20–L30](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/cordis.patch.yml#L20-L30) | `id: dsh-superagent-worker` | [0A](../book/00a-lekh-ane-prototype.md), [2](../book/02-setup-operation.md), [3](../book/03-startup.md), [7](../book/07-worker-execution.md) |
| `patch-worker-shell` | [L39–L50](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/cordis.patch.yml#L39-L50) | `timeoutMs: 5000` | [0A](../book/00a-lekh-ane-prototype.md), [7](../book/07-worker-execution.md) |
| `patch-router` | [L125–L135](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/cordis.patch.yml#L125-L135) | `id: dsh-superagent-router` | [0A](../book/00a-lekh-ane-prototype.md), [3](../book/03-startup.md), [9](../book/09-tools-prompts-skills.md) |
| `patch-router-fs` | [L163–L167](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/cordis.patch.yml#L163-L167) | `write: false` | [0A](../book/00a-lekh-ane-prototype.md), [9](../book/09-tools-prompts-skills.md) |

## `examples/profile.cordis.patch.yml`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `profile-example` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/examples/profile.cordis.patch.yml#L1-L12) | `stateDir:` | [2](../book/02-setup-operation.md) |

## `package.json`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `pkg-scripts` | [L46–L51](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/package.json#L46-L51) | `"check": "pnpm typecheck && pnpm test && pnpm build"` | [0](../book/00-paayo.md) |
| `pkg-engines` | [L52–L56](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/package.json#L52-L56) | `"dsh": "^0.2.1-alpha.2"` | [0](../book/00-paayo.md), [2](../book/02-setup-operation.md) |

## `prompts/admission.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `admission-prompt` | [L1–L12](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/prompts/admission.md#L1-L12) | `Assess proactive candidates yourself` | [0A](../book/00a-lekh-ane-prototype.md), [5](../book/05-policy-eval.md), [9](../book/09-tools-prompts-skills.md), [12](../book/12-customization.md) |

## `prompts/worker.md`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `worker-prompt` | [L1–L10](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/prompts/worker.md#L1-L10) | `You are a worker.` | [9](../book/09-tools-prompts-skills.md) |

## `scripts/dsh-superagent`

| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |
|---|---|---|---|
| `script-service` | [L1–L8](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/scripts/dsh-superagent#L1-L8) | `Manage a local dsh-superagent service` | [0A](../book/00a-lekh-ane-prototype.md), [2](../book/02-setup-operation.md), [11](../book/11-debugging.md), [13](../book/13-advanced-engineering.md), [15](../book/15-aagal-no-rasto.md) |

## વપરાયા વગરના ids

`rt-passes`, `rt-paused`, `model-settled`, `model-input`, `intake-filter`, `intake-queue`, `kind-channel`, `host-context`, `gh-stream`, `dsh-ctor`
