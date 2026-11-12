# પરિશિષ્ટ E — Mastery rubric

> તમે ક્યાં ઊભા છો તે જાતે માપો. દરેક પરિમાણને 0–3 ગુણ.
> **Pass:** કુલ ≥ 24 / 33, અને કોઈ પરિમાણમાં 0 નહીં. **Mastery:** ≥ 30 / 33, અને [અંતિમ project](../book/14-antim-project.md) ના જરૂરી ભાગ પૂરા.

## ચાર સ્તર, વાર્તાની ભાષામાં

| ગુણ | સ્તર | આરવ ક્યારે આ સ્તરે હતો |
|---|---|---|
| 0 | 🌱 શબ્દો ભેળવે | પહેલો દિવસ: "Ticket અને Assignment એક જ ને?" |
| 1 | 🟡 વ્યાખ્યા કહી શકે | દિવસ 3: દરેક શબ્દનો અર્થ યાદ |
| 2 | 🟠 code માં બતાવી શકે | દિવસ 9: "આ નિયમ આ file ની આ લીટીમાં છે" |
| 3 | 🌶️ ધારીને, ચલાવીને, સમજાવી શકે | દિવસ 14: આગાહી કરે, test લખે, અને ખોટો પડે તો કારણ શોધે |

## પરિમાણો

| # | પરિમાણ (પ્રકરણ) | 1 | 2 | 3 |
|---|---|---|---|---|
| 1 | Domain model ([1](../book/01-domain-model.md)) | વ્યાખ્યાઓ | Type અને માલિક સાથે | Running example ની સ્થિતિમાંથી દરેક શબ્દ બતાવે |
| 2 | Setup અને operation ([2](../book/02-setup-operation.md)) | Offline `pnpm check` | Live પગલાં અને exit codes સમજાવે | Live પ્રદર્શન, અથવા ખામી વગરની યોજના |
| 3 | Startup ([3](../book/03-startup.md)) | ક્રમ યાદ | Getter wiring અને readiness | Shutdown ના ક્રમનું કારણ; lock નું જોખમ |
| 4 | Intake ([4](../book/04-sources-intake.md)) | ત્રણ પરિણામ | Cursor overlap અને id dedup | Edit / ટાંકણ / bot ના કિસ્સા ધારે અને test કરે |
| 5 | Policy અને Eval ([5](../book/05-policy-eval.md)) | explicit / inferred | Gate tree; deadline અને requeue | Policy બદલાવાની ચાલુ Ticket પર અસર test થી બતાવે |
| 6 | Tickets ([6](../book/06-tickets-assignments.md)) | અવસ્થાઓ | Stop, resume, retry | `letGo` અને PR બંધ થવાના કિસ્સા સમજાવે |
| 7 | Worker execution ([7](../book/07-worker-execution.md)) | Launch નો પ્રવાહ | Slots; delivered અને read | Recovery અને prompt-સ્તરની ખાતરીઓનું વિશ્લેષણ |
| 8 | Store અને Effects ([8](../book/08-store-effects-outbox.md)) | Tables | Effect નું જીવનચક્ર | Crash windows નું કોષ્ટક જાતે બનાવે |
| 9 | Tools, prompts, panel ([9](../book/09-tools-prompts-skills.md), [10](../book/10-panel.md)) | Tool યાદી | Prompt ના થર; drift tests | Panel ની request ને domain સુધી trace કરે |
| 10 | Debugging ([11](../book/11-debugging.md)) | એક ફરિયાદ | પાંચ ફરિયાદ | સ્વતંત્ર નિદાન + regression test |
| 11 | Engineering ([12](../book/12-customization.md)–[14](../book/14-antim-project.md)) | દૃશ્ય 1–2 | દૃશ્ય 3–4 | દૃશ્ય 5 (red → green, docs, `pnpm check`) + review |

## અંતિમ project ની યાદી

- [ ] ભાગ A: offline acceptance test પાસ; ready → merged વિસ્તાર પાસ
- [ ] ભાગ B: live પ્રદર્શન, અથવા ન થઈ શકે તો કારણ સાથેની યોજના
- [ ] ભાગ C: નિદાન-અહેવાલ (ચાર સવાલ, code સંદર્ભ સાથે)
- [ ] ભાગ D: ચકાસેલું extension + review description
- [ ] ભાગ E: architecture review (ઓછામાં ઓછા ત્રણ મુદ્દા)

## પુરાવાના નિયમો

આ પુસ્તક પોતે જે નિયમો પાળે છે તે જ તમારા કામ પર લાગુ કરો:

1. દરેક દાવા સાથે નિશાન: ✅ source વાંચ્યો / 🧪 ચલાવ્યું / ⚠️ અચકાસાયેલું / 📝 સૂચિત.
2. Command અને પરિણામ જેમ હતાં તેમ લખો. નિષ્ફળ test ને નિષ્ફળ જ લખો.
3. Links commit પર pin કરો.
4. "મને લાગે છે" અને "મેં જોયું" ને કદી ભેળવો નહીં.

## તમારી જાતને પૂછવાના ત્રણ સવાલ

1. હું running example ની દરેક ઘટના માટે કહી શકું કે **કયો function** તેને સંભાળે છે?
2. કોઈ મને એક નવી નિષ્ફળતા બતાવે, તો હું કહી શકું કે **પહેલાં ક્યાં** જોવું?
3. હું કહી શકું કે આ system **કઈ ખાતરી નથી આપતી**?

ત્રણેયનો જવાબ "હા" હોય, તો તમે આ repository ના advanced developer છો.
