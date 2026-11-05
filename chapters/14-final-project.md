# પ્રકરણ 14 — Final project: નિયંત્રિત GitHub coding bot

[← પ્રકરણ 13](13-advanced-engineering.md) · [અનુક્રમણિકા](../README.md) · [પરિશિષ્ટો →](../appendices/A-coverage-map.md)

## ધ્યેય

આ prototype વડે `demo-org/widgets` માટે એક **નિયંત્રિત** GitHub coding bot બનાવો અને તેનું demonstration કરો. Demonstration માં request admission, Ticket creation, execution, checks, reporting, follow-ups, stop અને recovery દેખાવાં જોઈએ. પછી ત્રણ સ્વતંત્ર કામ કરો: એક debugging task, એક tested extension, અને એક architecture review. મૂલ્યાંકન: [પરિશિષ્ટ D rubric](../appendices/D-rubric.md).

"નિયંત્રિત" એટલે `docs/000` ની Responsibility ના ત્રણ નિયમો: **start narrow** (allowed list માં એક વ્યક્તિ, `observe` mode), **tune for less noise**, અને **own what it says**.

## ભાગ A — Offline acceptance (DSH વગર, ફરજિયાત)

**[Test ચલાવ્યો]** [`examples/running-example.spec.ts`](../examples/running-example.spec.ts) તમારો acceptance test છે. તે real Engine, Policy અને GitHub Trigger builders ને fakes સાથે જોડે છે. દરેક step નું observed state [`running-example.log.json`](../examples/running-example.log.json) માં છે:

| Requirement | Step | Observed proof |
| --- | --- | --- |
| Admission (explicit) | A | `A_evalStarted.strength = explicit`, basis `via: addressed` |
| Ticket creation (atomic: Decision + Ticket + subscription + ack + launch) | A | `A_accepted`: `outbox: [acknowledgement]`, `launches: 1`, `thread7.subscriptions: 1` |
| Duplicate | B | `duplicate`; state unchanged |
| Unauthorized | C, D | `not_a_member` on #8; on #7 fan-out to the worker (no authority) |
| Follow-up | E | No new Decision; `undelivered: 2` |
| Failure + human gate | F | `person/failed`; bot input held back; retry → `retried` |
| Recovery | G | `hostRestarted` + recovery `text` input; `working/queued` |
| Stop | H, I | mallory: `ignore/stopNotExplicit`; alice: `stop`, `ended.by: human` |
| No resume after stop | J | `fanout: []`; message goes to Eval |

**કાર્ય:** આ test ને **ready → PR merge** સુધી વિસ્તારો. Steps: નવો ticket accept કરો; `assignmentStarted`; `engine.report(ticketId, { state: 'ready', … })` પહેલાં `engine.bindThread(ticketId, { source: 'github', id: '12' }, true)`; ready પછી ticket open રહે છે (`person/review`); `engine.threadClosed({source:'github', id:'12'}, 'merged', at)` પછી `ended.outcome = 'merged'`. આ `Tickets.followsDone` નો નિયમ છે. ઉકેલ: [પરિશિષ્ટ E § પ્રકરણ 14](../appendices/E-solutions.md#પ્રકરણ-14).

## ભાગ B — Live lab (credentials જરૂરી)

**[ધારણા]** આ ભાગ અમે ચલાવ્યો નથી (DSH, model provider અને GitHub accounts ઉપલબ્ધ ન હતા). પગલાં repository ના docs પરથી છે.

1. **Setup** ([પ્રકરણ 2](02-setup-operation.md)): profile `superagent`, port 3082, `stateDir`, `gh-agent` wrapper (agent account `widgets-agent`), repository `demo-org/widgets`, allowed `alice`, mode `observe`, prepare command (worktree).
2. **Delivery requirements** team section: "Run `pnpm install && pnpm check` before marking ready; include the command output summary in the PR. Never enable auto-merge." (Auto-merge prompt paragraph દૂર કરો, અથવા merge CLI ન આપો.)
3. **Demonstration script:**

| # | ક્રિયા | જોવાનું (panel / GitHub) |
| --- | --- | --- |
| 1 | alice: Issue "@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો." | ≤ 60 s: Overview પર Ticket; Issue પર ack comment (disclosure line સાથે) |
| 2 | એ જ issue ફરી poll થાય | Trigger tab: એક જ Trigger |
| 3 | mallory: બીજા issue પર `@widgets-agent …` | Eval tab: `ignore`, reason "not on the list" |
| 4 | alice: "lint પણ ચલાવજો" | Thread: "Delivered to Ticket"; Decision નથી |
| 5 | Worker: branch `agent/readme-setup-…`, PR, checks | PR worker ના report થી અથવા poll થી ticket સાથે bind થાય; stage "Awaiting review" |
| 6 | Worker failure simulate: prepare command તોડો, નવો ticket | "Failed"; **Retry** ઠીક કર્યા પછી |
| 7 | Recovery: worker કામ કરતો હોય ત્યારે `scripts/dsh-superagent restart` | Assignment "dsh-superagent restarted"; recovery note સાથે નવું Assignment |
| 8 | alice: "@widgets-agent stop" (અથવા panel Stop) | Ended "Stopped by a person"; પછીના messages resume નથી કરતા |
| 9 | PR merge | Ticket "Pull request merged" |

4. **Health:** દરેક step પછી `scripts/dsh-superagent status` → exit 0.

## ભાગ C — Independent debugging task

સમસ્યા ([પ્રકરણ 11.11](11-debugging.md#1111-independent-debugging-task-practice)): stop પહેલાં alice ને allowed list માંથી કાઢી નાખવામાં આવે છે. **[Test ચલાવ્યો]** પરિણામ: `{ kind: 'ignore', strength: 'inferred', reason: [{ code: 'stopNotExplicit' }] }`. તમારો report આ ચાર બાબતો સમજાવે:
1. Gate એ alice ને `followup` + `inferred` કેમ આપ્યું (`policy.ts` ની `participating` શાખા)?
2. Stop ને explicit કેમ જોઈએ (`evals.ts#L297-L298`)?
3. ચાલુ ticket ને `policyEffects` કયું Input આપશે (`requesterAllowed: false`)?
4. Operator ticket રોકવા શું કરી શકે? (panel Stop command: Eval અને gate વગર.)

## ભાગ D — Tested extension

[પ્રકરણ 12.5](12-customization.md#125-exercise-5--justified-core-change-regression-tests-સાથે) નો quoted-mention ફેરફાર, અથવા તમારો પોતાનો, આ શરતો સાથે:
- Red → green test બતાવો.
- `docs/007` test table અપડેટ કરો.
- `pnpm check` (flaky Feishu consumer test ની નોંધ સાથે) pass.
- PR description ([13.9](13-advanced-engineering.md#139-focused-contribution-review-description)).

## ભાગ E — Architecture review

[13.10 checklist](13-advanced-engineering.md#1310-architecture-review-checklist-પ્રકરણ-14-માં-વપરાશે) વાપરીને એક પાનાનું review લખો. ઓછામાં ઓછું આ ત્રણ મુદ્દાઓ આવરો:
1. **Prompt-only guarantees:** worker ના બહારનાં actions (git push, PR comment) restart પછી ફરી ન થાય તેની ખાતરી ફક્ત recovery note આપે છે. ઉકેલ દિશા [Proposed]: worker tools માં `orchestrator_report` સાથે "external action receipt" નોંધવી.
2. **Isolation:** `danger-full-access` અને operator OS user. Wrappers "do not isolate the process" (`docs/006`). લેખ §8.4 નું "use credentials without seeing them" અહીં આંશિક જ છે.
3. **Unbounded storage:** કશું delete થતું નથી ([પ્રકરણ 8.9](08-store-effects-outbox.md)). Retention policy નું design (કયા records ક્યારે, કયું owner).

## Mastery પ્રશ્નો

1. Demonstration ના step 4 માં Decision કેમ નથી?
2. Step 7 માં કયા Assignments ફરી શરૂ થશે, અને કયા નહીં?
3. Step 9 પહેલાં worker `ready` report કરે, તો ticket કેમ પૂરો થતો નથી?

ઉકેલો: [પરિશિષ્ટ E § પ્રકરણ 14](../appendices/E-solutions.md#પ્રકરણ-14)

[← પ્રકરણ 13](13-advanced-engineering.md) · [પરિશિષ્ટો →](../appendices/A-coverage-map.md)
