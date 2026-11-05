# પરિશિષ્ટ D — Mastery assessment rubric

[← અનુક્રમણિકા](../README.md)

દરેક પરિમાણને 0–3 ગુણ મળે છે. **Pass:** કુલ ≥ 24/33, અને કોઈ પણ પરિમાણમાં 0 નહીં. **Mastery:** ≥ 30/33, અને final project (પ્રકરણ 14) ના પાંચેય ભાગ પૂર્ણ.

| # | પરિમાણ | 0 | 1 | 2 | 3 (mastery) |
| --- | --- | --- | --- | --- | --- |
| 1 | Domain model (પ્ર. 1) | Terms ભેળવે | Definitions કહી શકે | Type + owner સાથે | Running example ના state થી દરેક term બતાવે |
| 2 | Setup/operation (પ્ર. 2) | ચલાવી ન શકે | Offline `pnpm check` | Live setup steps + exit codes સમજાવે | Live demo અથવા offline + ખામી રહિત plan |
| 3 | Startup (પ્ર. 3) | — | ક્રમ યાદ | Getter wiring અને readiness સમજાવે | Shutdown ના ક્રમનું કારણ અને lock નું જોખમ સમજાવે |
| 4 | Intake (પ્ર. 4) | — | ત્રણ outcomes | Cursor overlap + id dedupe | Edit/quote/bot ના cases નું predict + test |
| 5 | Policy/Eval (પ્ર. 5) | — | explicit/inferred | Gate tree + deadline/requeue | Policy change ની ચાલુ ticket પર અસર test થી બતાવે |
| 6 | Tickets/Assignments (પ્ર. 6) | — | States | Stop/resume/retry | `letGo` અને PR closure ના cases સમજાવે |
| 7 | Worker execution (પ્ર. 7) | — | Launch flow | Slots + delivered/read | Restart recovery અને prompt-only guarantees નું વિશ્લેષણ |
| 8 | Store/Effects (પ્ર. 8) | — | Tables | Effect lifecycle | Crash windows table પોતે બનાવે |
| 9 | Tools/prompts (પ્ર. 9–10) | — | Tool list | Assembly + drift tests | Panel request ને domain સુધી trace કરે |
| 10 | Debugging (પ્ર. 11) | — | એક scenario | પાંચ scenarios | Independent task + regression test |
| 11 | Engineering (પ્ર. 12–14) | — | Exercise 1–2 | Exercise 3–4 | Exercise 5 (red→green, docs, `pnpm check`) + review |

## Final project checklist

- [ ] ભાગ A: offline acceptance test pass; ready→merged extension pass
- [ ] ભાગ B: live demo, અથવા ન થઈ શકે તો કારણ સાથે plan
- [ ] ભાગ C: debugging report (ચાર પ્રશ્નો)
- [ ] ભાગ D: tested extension + PR description
- [ ] ભાગ E: architecture review (ત્રણ મુદ્દા)

## પુરાવા (evidence) ના નિયમો

1. દરેક દાવા સાથે label: [Source] / [Test ચલાવ્યો] / [Observed] / [ધારણા].
2. Commands અને પરિણામ સાચાં લખો; fail થયેલો test fail તરીકે જ લખો.
3. Commit-pinned links વાપરો.
