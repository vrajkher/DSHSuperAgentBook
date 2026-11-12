# પરિશિષ્ટ C — શબ્દકોશ: વાર્તા ↔ ગુજરાતી ↔ English ↔ code

> Code અને tools English શબ્દ જ વાપરે છે, એટલે પુસ્તક પણ English શબ્દ રાખે છે અને ગુજરાતી અર્થ સાથે સમજાવે છે.
> Domain શબ્દો repository ના [docs/001][doc-domain] પ્રમાણે છે. વાર્તાના પાત્રોની પૂરી યાદી: [સમગ્ર નકશો § 3](../book/overview-samagra-naksho.md).

## Domain શબ્દો

| English | વાર્તામાં | ગુજરાતી અર્થ | Code | પ્રકરણ |
|---|---|---|---|---|
| Agent | અન્નપૂર્ણાનું ઓર્ડર-ડેસ્ક | સ્વચાલિત team સભ્ય | — | 0 |
| Main Session (router) | સવિતાબેન | મુખ્ય session: routing, Eval, જવાબ | [`rt-master`][rt-master] | 0A, 9 |
| Worker Session | રસોઈ-ટુકડી | Ticket દીઠ કામ કરનાર session | [`workerSessionId`][dsh-session-id] | 7 |
| Source | ઓર્ડર-રજિસ્ટર; WhatsApp ગ્રુપ | ઘટનાઓનો સ્રોત (GitHub, Feishu) | [`SourceKind`][kind-source] | 4 |
| Trigger | ચિઠ્ઠી | એક અપરિવર્તનશીલ ઘટના | [`Trigger`][model-trigger] | 1, 4 |
| Thread | રજિસ્ટરનું પાનું | ચિઠ્ઠીઓની સમયક્રમ શ્રેણી | [`Thread`][model-thread] | 1 |
| Correlation | "આ પાનું પણ જુઓ" | પાનાં વચ્ચેનો સંબંધ, ફક્ત સંદર્ભ | `Thread.correlated` | 1 |
| Channel | પાનાની નીચે જવાબની જગ્યા | જવાબ લખવાનું સરનામું | [`githubChannel`][ght-channel] | 1, 8 |
| Policy | નિયમ-પોથી | કોણ કામ માગી શકે તેના versioned નિયમો | [`Policy`][ports-policy] | 5 |
| Policy version | પોથીની આવૃત્તિનો નંબર | નિયમોના સંયોજનની ઓળખ (hash) | [`policyVersion`][policy-version] | 5 |
| Gate | ગોવિંદકાકા | નિયમ-આધારિત (deterministic) પ્રવેશ-તપાસ | [`gate`][policy-gate] | 5 |
| Assessment | સવિતાબેનનો વિચાર | model નો મત | [`Assessor`][ports-assessor] | 5 |
| Eval | થોકડાનો વિચાર | ચિઠ્ઠીઓના batch નું મૂલ્યાંકન | [`Evaluation`][model-evaluation] | 5 |
| Decision | નિર્ણય-નોંધ | Eval નું પરિણામ | [`Decision`][model-decision] | 5 |
| Mandate | પરવાનો | કામની પરવાનગી; અપરિવર્તનશીલ | [`Mandate`][model-mandate] | 1, 6 |
| Ticket | જોબ-કાર્ડ | મંજૂર કામનો એકમ | [`Ticket`][model-ticket] | 6 |
| Assignment | પાળી | Ticket નો એક ટુકડી સાથેનો એક વારો | [`Assignment`][model-assignment] | 6 |
| Subscription | ટેગ | Ticket અને Thread વચ્ચેનો સંબંધ | `Thread.subscriptions` | 4, 6 |
| Fan-out | ટેગવાળી ટુકડીને નકલ | Subscribed Ticket ને ચિઠ્ઠી પહોંચાડવી | [`Intake.receive`][intake-fanout] | 4 |
| Executor | જશુભાઈ | Assignments ચલાવનાર port | [`Executor`][ports-executor] | 7 |
| Slot | ચૂલો | એક સાથે ચાલી શકતા workers ની જગ્યા | [`WorkerSlots`][dsh-slots] | 7 |
| Report | રિપોર્ટ-કાપલી | પાળીની જણાવેલી સ્થિતિ | [`ReportState`][model-report] | 6, 9 |
| Attention | "શેઠને પૂછવાનો સવાલ" | માણસના જવાબની રાહ જોતો પ્રશ્ન | [`Attention`][model-attention] | 9 |
| Disposition | આવક-રજિસ્ટરની નોંધ | ચિઠ્ઠી ક્યાં ગઈ તેનો હિસાબ | [`TriggerDisposition`][model-disposition] | 4, 11 |
| Strength | પાકો ઓર્ડર / અનુમાન | આધારની મજબૂતી: explicit / inferred | [`MandateBasis`][model-basis] | 5 |
| Accept mode | "પહેલા મહિને ફક્ત જુઓ" | off / observe / auto | [`EvalConfigSchema`][policy-evalcfg] | 5 |
| Hand-back | "આ મારું કામ નથી" | ટુકડીએ પાછી સોંપેલી ચિઠ્ઠી | [`handBack`][part-handback] | 6 |
| Follow-up | એ જ પાના પરની નવી ચિઠ્ઠી | Ticket ના Thread પર માણસનો નવો સંદેશ | [`followupOwners`][model-owners] | 6 |
| Stage | પાટિયા પરનો એક શબ્દ | Ticket ની ગણેલી અવસ્થા | [`ticketStage`][stage-fn] | 6, 10 |
| Store | પાકો ચોપડો | SQLite database | [`Store`][store-open] | 8 |
| Effect | ખીંટી પરની કાપલી | Commit પછી કરવાનું ટકાઉ બહારનું કામ | [`Effects`][effects-enqueue] | 8 |
| Outbox, receipt | જવાબ-ટોપલી, પાવતી | મોકલવાના જવાબો અને તેમની નોંધ | [`Outbox`][outbox-class] | 8 |
| Panel | પાટિયું | Management UI + HTTP API | [`registerHttp`][http-register] | 10 |

## Engineering શબ્દો

| English | ગુજરાતી સમજ | પ્રકરણ |
|---|---|---|
| Composition root | બધા objects જોડવાની એકમાત્ર જગ્યા | 3 |
| Port / adapter | Interface / તેનો અમલ | 0, 13 |
| Transaction (atomic) | બધું લખાય, કે કશું નહીં | 6, 8 |
| Savepoint | Transaction ની અંદરનું નાનું transaction | 8 |
| Transactional outbox | બહારનું કામ transaction માં ફક્ત **નોંધાય**; અમલ પછી | 6, 8 |
| Idempotent | બે વાર કરો તો પણ પરિણામ એક વાર જેવું | 4, 8 |
| Content-derived id | Data પરથી ગણેલું સ્થિર id ("સિક્કો") | 4 |
| Cursor | ક્યાં સુધી વાંચ્યું તેની નિશાની ("દોરી") | 4 |
| At-least-once / effectively-once | ઓછામાં ઓછું એક વાર / વ્યવહારમાં એક જ વાર | 4, 8 |
| Backoff | દરેક નિષ્ફળતા પછી વધુ રાહ | 7, 8 |
| Transient failure | ક્ષણિક, પસાર થઈ જતી નિષ્ફળતા | 7 |
| Race condition | ક્રમ પર આધાર રાખતું અનિશ્ચિત પરિણામ | 7, 13 |
| Coalescing | એક જ કામની ઘણી વિનંતી એક બની જાય | 3, 8 |
| Optimistic concurrency | તાળું નહીં; સાચવતી વખતે તપાસ; ટકરાવ → 409 | 8, 10 |
| Capability | ઓજાર પોતે જ પરવાનગી (closure માં બંધાયેલું `ticketId`) | 9 |
| Derived state | Store ન થતી, હકીકતો પરથી ગણાતી અવસ્થા | 6 |
| Shadow mode | નિર્ણય કરો, અમલ નહીં (`observe`) | 5 |
| Prompt cache | Prompt નો સ્થિર આગળનો ભાગ ફરી મોકલવો સસ્તો | 9, 13 |
| Drift test | Docs / prompts અને code નો મેળ તપાસતો test | 9 |
| Flaky test | એ જ code પર ક્યારેક પાસ, ક્યારેક નિષ્ફળ | 12 |
| CSRF | બીજી site તમારા browser વડે તમારા વતી request મોકલે | 10 |
| Migration | જૂના database ને નવા આકારમાં લાવવું | 8 |
| Bottleneck | આખી system ની ઝડપ નક્કી કરતો સાંકડો ભાગ | 13 |
| Separation of duties | માગનાર, મંજૂર કરનાર, અમલ કરનાર અલગ | 15 |

## લેખના શબ્દો ([પ્રકરણ 0A](../book/00a-lekh-ane-prototype.md))

| લેખનો શબ્દ | અર્થ | Prototype માં |
|---|---|---|
| Router / Worker | બે સ્તર: વહેંચનાર અને કરનાર | Main Session / worker Session |
| Fast path / slow path | Code થી નિકાલ / model થી નિકાલ | Gate / assessment |
| Pass-through | Follow-up સીધો worker ને | Fan-out + `followupOwners` |
| Inline & Spill | Context માં ટૂંકું; વિગત બહાર, સંદર્ભ સાથે | મર્યાદાઓ + `orchestrator_read` |
| Chain of Recall | સંદર્ભ પરથી વિગત પાછી ખેંચવી | `orchestrator_read` resources |
| Full-duplex | રાહ જોતાં પણ નવું સાંભળવું | 5-second shell મર્યાદા, `noWait` |
| Watchdog | સ્વતંત્ર ચોકીદાર agent | ફક્ત કલાકદીઠ `status` (⚠️ નાનું રૂપ) |

## નિશાનોનો અર્થ

| નિશાન | અર્થ |
|---|---|
| ✅ | Pinned commit નો source વાંચીને મળેલી હકીકત |
| 🧪 | આ પુસ્તક માટે ચલાવ્યું, અને પરિણામ જોયું ([પરિશિષ્ટ G](G-verification-log.md)) |
| ⚠️ | અચકાસાયેલું, ધારણા, અથવા વાર્તા અને technical વચ્ચેનો ફરક |
| 📝 | પુસ્તકે સૂચવેલું; repository માં નથી |

<!-- citations:begin (generated by tools/refdefs.py) -->
[doc-domain]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/001-domain.md#L1-L12
[dsh-session-id]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L24
[dsh-slots]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/executor/dsh.ts#L171-L199
[effects-enqueue]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/effects.ts#L61-L66
[ght-channel]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github-trigger.ts#L8-L9
[http-register]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L230-L247
[intake-fanout]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/intake.ts#L38-L46
[kind-source]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/kind.ts#L85-L113
[model-assignment]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L218-L233
[model-attention]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L275
[model-basis]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L116-L123
[model-decision]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L192-L209
[model-disposition]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L42-L61
[model-evaluation]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L136-L154
[model-mandate]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L126-L133
[model-owners]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L75-L88
[model-report]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L216
[model-thread]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L157-L182
[model-ticket]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L277-L308
[model-trigger]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/model.ts#L23-L39
[outbox-class]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/outbox.ts#L22-L25
[part-handback]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/part.ts#L42-L48
[policy-evalcfg]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L83-L87
[policy-gate]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L191-L211
[policy-version]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/policy.ts#L116-L118
[ports-assessor]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L49-L53
[ports-executor]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L59-L69
[ports-policy]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/ports.ts#L17-L27
[rt-master]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/runtime.ts#L104-L105
[stage-fn]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/core/stage.ts#L9-L21
[store-open]: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L58-L101
<!-- citations:end -->
