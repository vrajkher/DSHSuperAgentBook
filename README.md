# DeepSeek Super Agent Prototype — શરૂઆતથી Advanced Developer સુધી

એક ગુજરાતી પુસ્તક, જે એક જ વાર્તામાં (અમદાવાદનું "અન્નપૂર્ણા થાળી ઘર", દિવાળી પછીની લગ્નસરા) એક આખી autonomous agent system ને ખોલે છે: source વાંચીને, ચલાવીને, તોડીને અને સુધારીને.

- **વિષય:** [`deepseek-ai/dsh-superagent-prototype`](https://github.com/deepseek-ai/dsh-superagent-prototype): GitHub (અને Feishu) પરથી વિનંતીઓ લઈ, નિયમો મુજબ સ્વીકારી, worker agents ને કામ સોંપતી, અને માણસને ફક્ત જરૂર પડે ત્યારે બોલાવતી "super agent" નો research prototype.
- **Pinned commit:** [`8c32a9d`](https://github.com/deepseek-ai/dsh-superagent-prototype/tree/8c32a9dc5d72c033816c6a8110b37f40cf94fba4) (2026-10-31). દરેક source link આ commit પર pinned છે, line numbers સાથે.
- **સાથી લેખ:** DeepSeek Harness નો "Exploring Super-agent Design: Towards a More Autonomous Agent System". [પ્રકરણ 0A](book/00a-lekh-ane-prototype.md) લેખના દરેક વિચારને prototype ના code સાથે જોડે છે, અને જ્યાં બંને અલગ પડે છે તે કહે છે.
- **વાચક:** college પાસ કરેલો કોઈ પણ વિદ્યાર્થી. Programming નો થોડો પરિચય મદદ કરશે; બાકીના શબ્દો જ્યાં પહેલી વાર આવે ત્યાં સમજાવેલા છે.
- **DSH, model key કે GitHub account જરૂરી નથી.** બધી [labs](labs/README.md) repository ના પોતાના tests અને fakes પર, offline ચાલે છે.

> **નિશાન:** ✅ pinned source વાંચીને મળેલી હકીકત · 🧪 આ પુસ્તક માટે ચલાવ્યું અને જોયું · ⚠️ ચકાસ્યું નથી, અથવા વાર્તા અને technical વચ્ચેનો ફરક · 📝 પુસ્તકે સૂચવેલું, repository માં નથી.

> ⚠️ **પ્રામાણિક હદ.** આ prototype અમે **live ચલાવ્યો નથી** (DSH, model provider અને agent account ઉપલબ્ધ નહોતાં). Domain ના નિયમો ખરા `Engine` પર tests વડે ચકાસ્યા છે; model નું વર્તન, ખરું GitHub અને panel નું browser નહીં. પૂરો હિસાબ: [પરિશિષ્ટ G](appendix/G-verification-log.md).

> 📖 **રંગીન web આવૃત્તિ:** <https://claude.ai/artifact/PPin1mKYHGEpZhyeMtboRz>
> આખું પુસ્તક એક પાનામાં: થાળીનું ચિત્ર, chapter cards, રંગીન દૃશ્યો, diagrams, light અને dark mode, અક્ષરનું કદ નાનું-મોટું, phone પર પણ. આ link ખાનગી છે: બીજા લોકો તેને ત્યારે જ ખોલી શકે જ્યારે માલિક પાના ના Share menu માંથી તેને share કરે. ફરી બનાવવા: `node tools/build-artifact.mjs <marked.esm.js> <out.html>`.

## વાર્તા એક ફકરામાં

**આરવ** દિવાળીના વેકેશનમાં ઘરે આવ્યો છે. તેના પપ્પાના ભોજનાલયમાં લગ્નસરાના ઓર્ડરનો ધોધ છે, અને પિતરાઈ બહેન **મીરાદીદી** એ એક નવું **ઓર્ડર-ડેસ્ક** ગોઠવ્યું છે. ડેસ્ક પર **સવિતાબેન** બેસે છે: તે ચિઠ્ઠીઓ વાંચે છે અને કામ વહેંચે છે, પણ ચૂલાને હાથ નથી લગાડતાં. દરવાજે **ગોવિંદકાકા** યાદી લઈને ઊભા છે. **છોટુ** દર મિનિટે રજિસ્ટરમાંથી નવી ચિઠ્ઠીઓ લાવે છે. **જશુભાઈ** ચૂલા અને ઓટલા ફાળવે છે. **મુનીમજી** નો પાકો ચોપડો લાઈટ જાય તો પણ કશું ભૂલતો નથી. અને **પપ્પા** રસોડામાં આવ્યા વગર, એક પાટિયા પરથી બધું જુએ છે.

પંદર દિવસમાં આરવ એક ઓર્ડરને, અલકાબેનની **"@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો."**, ચિઠ્ઠીથી છેલ્લા જવાબ સુધી અનુસરે છે: એ જ ચિઠ્ઠી બે વાર આવે, યાદી બહારના મનોજભાઈ વચ્ચે બોલે, ફેરફાર આવે, રસોઈ બગડે, લાઈટ જાય, અને ગ્રાહક "બંધ કરો" કહે.

વાર્તા શણગાર નથી. ભોજનાલયમાં જે **ઘટના** બને છે તે જ system નો **નિયમ** છે, અને બંને એક જ કારણથી બન્યા છે.

## વિષયસૂચિ

શરૂઆત [સમગ્ર નકશો](book/overview-samagra-naksho.md) થી કરો: આખું પુસ્તક, પાત્રો અને બાર સ્ટેશન એક પાનામાં.

| Level | દિવસ | પ્રકરણ | વાર્તામાં | મુખ્ય lab |
|---|---|---|---|---|
| — | — | **[સમગ્ર નકશો](book/overview-samagra-naksho.md)** | આખું ઘર એક નજરે | પાત્રો ↔ code; વાંચવાના માર્ગ |
| 0 | 1 | [પાયો](book/00-paayo.md) | આરવ ઘરે આવે છે | `pnpm check`: 59 files, 1197 tests |
| 0 | 1 | [લેખ અને prototype](book/00a-lekh-ane-prototype.md) | મીરાદીદીની નોંધપોથી | લેખનું વાક્ય → code ની લીટી |
| 1 | 2 | [Domain model](book/01-domain-model.md) | ચિઠ્ઠી, પાનું, પરવાનો, જોબ-કાર્ડ | Running example ચલાવો |
| 2 | 3 | [Setup અને operation](book/02-setup-operation.md) | ડેસ્ક ગોઠવવું; બહાદુરનો આંટો | Offline labs; live ⚠️ |
| 3 | 4 | [Startup](book/03-startup.md) | સવારે ઘર ખોલવાનો ક્રમ | Pass interval બદલો |
| 4 | 5 | [Sources અને intake](book/04-sources-intake.md) | છોટુ, દોરી અને સિક્કો | Edit કરેલો comment |
| 5 | 6 | [Policy અને evaluation](book/05-policy-eval.md) | ગોવિંદકાકાની યાદી | `REQUEUES` બદલો: 1 test તૂટે |
| 6 | 7 | [Tickets અને assignments](book/06-tickets-assignments.md) | જોબ-કાર્ડ અને પાળી | Stop પછી 3 ચિઠ્ઠી કેમ પાછી આવી |
| 7 | 8 | [Worker execution](book/07-worker-execution.md) | જશુભાઈ અને ચૂલા | Background મર્યાદા: 3 tests તૂટે |
| 8 | 9 | [Store, effects, outbox](book/08-store-effects-outbox.md) | પાકો ચોપડો, ખીંટી, જવાબ-ટોપલી | Crash windows |
| 9 | 10 | [Tools, prompts, skills](book/09-tools-prompts-skills.md) | ઓજારનું ખાનું; સૂચના-પત્ર | Prompt માં એક લીટી: 2 tests તૂટે |
| 10 | 11 | [Panel](book/10-panel.md) | પપ્પાનું પાટિયું | Stop બટન, click થી ચૂલા સુધી |
| 11 | 12 | [Debugging](book/11-debugging.md) | આરવ વૈદ બને છે | દસ ફરિયાદ; સ્વતંત્ર નિદાન |
| 12 | 13 | [Customization](book/12-customization.md) | પાયો હલાવ્યા વગર ઘર બદલવું | 4 patches: 61 files, 1199 tests |
| 13 | 14 | [Advanced engineering](book/13-advanced-engineering.md) | અગાસી પરથી ઘર | Benchmark: 2× ઝડપ, છતાં ન બદલો |
| 14 | 15 | [અંતિમ project](book/14-antim-project.md) | આરવનો છેલ્લો દિવસ | Acceptance test; review |
| — | પછી | [આગળનો રસ્તો](book/15-aagal-no-rasto.md) 📝 | થાળી ઘરથી આખી પેઢી સુધી | 24×7, back-office, મંજૂરી, ઘણા વિભાગ |

### પરિશિષ્ટ

- [A — Source અને symbol index](appendix/A-source-index.md) (254 સંદર્ભ; પૂરું કોષ્ટક: [citations.generated.md](appendix/citations.generated.md))
- [B — Command reference](appendix/B-command-reference.md)
- [C — શબ્દકોશ](appendix/C-glossary.md): વાર્તા ↔ ગુજરાતી ↔ English ↔ code
- [D — Labs અને Mastery check ના ઉકેલ](appendix/D-lab-solutions.md)
- [E — Mastery rubric](appendix/E-mastery-rubric.md)
- [F — Coverage map](appendix/F-coverage-map.md)
- [G — Verification log](appendix/G-verification-log.md): શું ચલાવ્યું, શું જોયું, શું નથી ચકાસ્યું
- [H — સ્થિતિ અને આગળ વધારવાની નોંધ](appendix/H-status.md)

## આ પુસ્તક કેવી રીતે શીખવે છે

દરેક પ્રકરણ **દૃશ્યો** માં છે, અને દરેક દૃશ્યમાં ચાર પગલાં:

| નિશાન | પગલું | ઉદાહરણ ([પ્રકરણ 8](book/08-store-effects-outbox.md), દૃશ્ય 5) |
|---|---|---|
| 🎬 | **ઘટના**: ભોજનાલયમાં કંઈક બને છે | છોટુ જવાબ લખીને પાછો આવે તે પહેલાં લાઈટ જાય છે. લાઈટ આવે ત્યારે તે ફરી લખશે? |
| ❓ | **આરવનો સવાલ** | "ગ્રાહકને બે જવાબ જશે?" |
| 💻 | **Code માં**: એ જ નિયમ pinned source માં, અને ચલાવીને | દરેક GitHub comment માં છૂપો marker; ફરી મોકલતાં પહેલાં marker શોધાય. |
| 🔬 | **Expert નજર**: નિયમ કેમ બન્યો, તૂટે તો શું બગડે | "Exactly-once" અશક્ય છે; "at-least-once + idempotency" શક્ય છે. |

ઘટના યાદ રહે એટલે નિયમ યાદ રહે; અને ઘટનામાં નિયમનું **કારણ** છે, એટલે ગોખવું નથી પડતું.

દરેક પ્રકરણનો ક્રમ: 🎯 તમે શું કરી શકશો → 🗺️ નકશો (diagram, તીરોની સમજ સાથે) → દૃશ્યો → Source map → 🧪 Lab → 🔮 આગાહી કસોટી → 🩺 નિષ્ફળતા → ✅ સાર (ઘટના → નિયમ કોષ્ટક, યાદ-ચાવી, કાર્ડ) → 🧠 Mastery check → 🎬 આગળ શું.

**Code ના ટુકડા** હંમેશાં ઓળખાવેલા છે: *real* (જેમ છે તેમ), *shortened* (`…` વડે ટૂંકાવેલો), *pseudocode*, અથવા 📝 *સૂચિત patch*.

પહેલી વાંચનમાં 🔬 ઝડપથી વાંચો; બીજી વાંચનમાં ત્યાં અટકો.

## ઝડપી શરૂઆત

```bash
git clone https://github.com/deepseek-ai/dsh-superagent-prototype.git && cd dsh-superagent-prototype
```

```bash
git checkout 8c32a9dc5d72c033816c6a8110b37f40cf94fba4 && pnpm install --frozen-lockfile
```

```bash
pnpm check
```

પછી running example (`<book>` = આ repository નો path):

```bash
cp <book>/labs/running-example.spec.ts tests/ && pnpm vitest run tests/running-example.spec.ts
```

🧪 `1 passed`, અને checkout ના root માં `running-example.log.json`. તેને [`evidence/running-example.log.json`](evidence/running-example.log.json) સાથે સરખાવો. પૂરી રીત: [labs/README](labs/README.md).

## આ repository નું માળખું

| Folder | શું છે |
|---|---|
| [`book/`](book/overview-samagra-naksho.md) | સમગ્ર નકશો અને પ્રકરણ 0–15 |
| [`appendix/`](appendix/A-source-index.md) | પરિશિષ્ટ A–H, અને generated citation કોષ્ટક |
| [`labs/`](labs/README.md) | ચલાવી શકાય તેવા tests, benchmark અને patches |
| [`evidence/`](evidence/running-example.log.json) | Running example નો જોયેલો output |
| `tools/` | Citations, index, ચકાસણી અને web આવૃત્તિ બનાવતાં scripts |

## પુસ્તકને ચકાસવું

દરેક source link એક કોષ્ટક (`tools/citations.tsv`) માંથી આવે છે, અને મશીનથી ચકાસાય છે: file અસ્તિત્વમાં છે, line range સાચી છે, અને તે લીટીઓમાં અપેક્ષિત લખાણ છે.

```bash
python3 tools/verify_book.py <dsh-superagent-prototype નો pinned checkout>
```

```bash
node tools/verify-mermaid.mjs <mermaid અને jsdom install કરેલી directory>
```

આ tools **એ નથી ચકાસતાં** કે ટાંકેલી લીટીઓ વાક્યના દાવાને ટેકો આપે છે: તે માણસનું કામ છે. દાવો તમારા માટે મહત્વનો હોય ત્યાં link ખોલીને વાંચો.

## License અને આભાર

પુસ્તકનું લખાણ અને lab code આ repository ના [LICENSE](LICENSE) હેઠળ છે. `dsh-superagent-prototype` અને સાથી લેખ તેમના લેખકોના છે; અહીં તેમાંથી ટૂંકા ટુકડા ફક્ત સમજાવવા માટે, pinned links સાથે ટાંક્યા છે. ભૂલો આ પુસ્તકની છે, upstream ની નહીં.
