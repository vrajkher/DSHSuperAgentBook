# પરિશિષ્ટ C — ગુજરાતી–English glossary

[← અનુક્રમણિકા](../README.md)

Domain terms repository ના `docs/001` glossary પ્રમાણે છે; ચીની નામ panel ની (?) glossary માંથી છે. Code અને tools English term જ વાપરે છે, એટલે પુસ્તક પણ English term રાખે છે, અને ગુજરાતી અર્થ સાથે સમજાવે છે.

## Domain terms

| English | ગુજરાતી અર્થ | 中文 | Code |
| --- | --- | --- | --- |
| Agent | સ્વચાલિત team સભ્ય | 智能体 | — |
| Main Session (orchestrator) | મુખ્ય session: routing, Eval, જવાબ | 主 Session | `masterId`, `ROUTER_PRESET` |
| Executor Session (worker) | ticket દીઠ કામ કરનાર session | 执行器 Session | `worker-<ticketId>` |
| Source | ઘટનાઓનો સ્રોત (GitHub, Feishu) | 来源 | `SourceKind` |
| Trigger | એક અપરિવર્તનશીલ ઘટના | 触发 | `Trigger` |
| Thread | Triggers ની સમયક્રમ શ્રેણી | 线程 | `Thread` |
| Correlation | Threads વચ્ચેનો સંબંધ (ફક્ત context) | 关联 | `Thread.correlated` |
| Channel | જવાબ લખવાનું સરનામું | 渠道 | `ChannelRef` |
| Policy | કોણ કામ માગી શકે તેના versioned નિયમો | 策略 | `Policy`, `settingsPolicy` |
| Policy version | નિયમોના સંયોજનની ઓળખ (hash) | 策略版本 | `policyVersion` |
| Gate | નિર્ધારિત (deterministic) પ્રવેશ-તપાસ | 准入 | `Policy.gate` |
| Assessment | model નો નિર્ણય | 研判 | `Assessor` |
| Eval | Triggers ના batch નું મૂલ્યાંકન | 评估 | `Evaluation` |
| Decision | Eval નું પરિણામ | 决定 | `Decision` |
| Mandate | કામની પરવાનગી (અપરિવર્તનશીલ) | 授权 | `Mandate` |
| Ticket | મંજૂર કામનો એકમ | 工单 | `Ticket` |
| Assignment | Ticket નું એક executor સાથેનું બંધન | 派工 | `Assignment` |
| Subscription | Ticket અને Thread વચ્ચેનો સંબંધ | 订阅 | `Thread.subscriptions` |
| Fan-out | subscribed Ticket ને Trigger પહોંચાડવો | 扇出 | `Intake.receive` |
| Executor | Assignments ચલાવનાર port | 执行器 | `Executor`, `DshExecutor` |
| Execution environment | worker/prepare ના variables | 执行环境 | `ticketEnvironment` |
| Report | Assignment ની જણાવેલી સ્થિતિ | 报告 | `ReportState` |
| Attention | માણસના જવાબની રાહ જોતો પ્રશ્ન | 待人工决定 | `Attention` |
| Disposition | Trigger ક્યાં ગયો તેનો હિસાબ | 去向 | `TriggerDisposition` |
| Input | Ticket ને મળતો context | 输入 | `TicketInput` |
| Scope | Mandate જે કામની મંજૂરી આપે | 范围 | `Mandate.scope` |
| Strength (explicit / inferred) | આધારની મજબૂતી: સ્પષ્ટ / અનુમાનિત | 强度 (明确 / 推断) | `Strength` |
| Accept mode (off / observe / auto) | proactive કામ: બંધ / ફક્ત નોંધ / સ્વીકાર | — | `eval.mode` |
| Admission table | receiving scope પ્રમાણે cells | — | `AdmissionRow` |
| Hand-back | worker એ પાછો સોંપેલો message | — | `orchestrator_trigger_handback` |
| Follow-up | ticket ના Thread પરનો માણસનો નવો message | — | `followupOwners` |

## Engineering terms

| English | ગુજરાતી |
| --- | --- |
| Composition root | બધા objects જોડવાની એકમાત્ર જગ્યા |
| Port / Adapter | interface / તેનો implementation |
| Transaction (atomic) | બધું અથવા કશું નહીં: અણુ-સંગત ફેરફાર |
| Savepoint | nested transaction બિંદુ |
| Effect (outbox pattern) | commit પછી કરવાનું durable બાહ્ય કામ |
| Idempotent | બે વાર કરવાથી પણ પરિણામ એક જ |
| Content-derived id | data પરથી ગણેલું સ્થિર id |
| Cursor | ક્યાં સુધી વાંચ્યું તેની નોંધ |
| Backoff (exponential) | ફરી પ્રયાસ પહેલાં બમણી થતી રાહ |
| Transient failure | પસાર થઈ જતી (ક્ષણિક) નિષ્ફળતા |
| Race condition | ક્રમ પર આધારિત અનિશ્ચિત પરિણામ |
| Flaky test | ક્યારેક pass, ક્યારેક fail થતો test |
| Drift test | docs/prompts અને code નો મેળ તપાસતો test |
| Health entry | ભાગની તંદુરસ્તી નોંધ |
| Lock (directory lock) | એક સમયે એક જ process નો હક |
| Migration (schema) | જૂના database ને નવા આકારમાં લાવવું |
| Optimistic concurrency (revision) | revision તપાસીને જ save; સંઘર્ષ થાય તો 409 |
| Same-origin / CSRF | એક જ origin ની request / cross-site request forgery |
| At-least-once / effectively-once | ઓછામાં ઓછું એક વાર / વ્યવહારમાં એક જ વાર |
| Inline & Spill | context માં મૂકવું / બહાર રાખીને pointer આપવું (લેખ §3.3) |
| Pass-through | follow-up સીધો worker ને (લેખ §3.2) |
