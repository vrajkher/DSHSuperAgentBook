# પરિશિષ્ટ F — Coverage map: માગણી ક્યાં પૂરી થઈ

> આ પુસ્તક એક લેખિત brief પરથી લખાયું છે. અહીં brief ની દરેક માગણી, તે ક્યાં પૂરી થઈ, અને **કેટલી ખાતરી સાથે**, તેનો હિસાબ છે.

## Curriculum ના levels

| Level | વિષય | પ્રકરણ | વાર્તાનો દિવસ | ખાતરી |
|---|---|---|---|---|
| — | સમગ્ર નકશો | [નકશો](../book/overview-samagra-naksho.md) | — | ✅ |
| 0 | પાયો: prototype શું છે, stack, baseline | [0](../book/00-paayo.md) | 1 | ✅ 🧪 |
| 0 (ઉમેરો) | Super-agent લેખ ↔ prototype | [0A](../book/00a-lekh-ane-prototype.md) | 1 | ✅; લેખના આંકડા ⚠️ |
| 1 | Domain model | [1](../book/01-domain-model.md) | 2 | ✅ 🧪 |
| 2 | Setup અને operation | [2](../book/02-setup-operation.md) | 3 | offline 🧪; live ⚠️ |
| 3 | Startup | [3](../book/03-startup.md) | 4 | ✅ 🧪 |
| 4 | Sources અને intake | [4](../book/04-sources-intake.md) | 5 | ✅ 🧪; Feishu live ⚠️ |
| 5 | Policy અને evaluation | [5](../book/05-policy-eval.md) | 6 | ✅ 🧪; ખરું assessment ⚠️ |
| 6 | Tickets અને assignments | [6](../book/06-tickets-assignments.md) | 7 | ✅ 🧪 |
| 7 | Worker execution | [7](../book/07-worker-execution.md) | 8 | ✅ 🧪 (fakes સામે); ખરો worker ⚠️ |
| 8 | Store, effects, outbox | [8](../book/08-store-effects-outbox.md) | 9 | ✅ 🧪; GitHub marker live ⚠️ |
| 9 | Tools, prompts, skills | [9](../book/09-tools-prompts-skills.md) | 10 | ✅ 🧪; model ના tool calls ⚠️ |
| 10 | Panel | [10](../book/10-panel.md) | 11 | ✅ 🧪 (jsdom tests); ખરું browser ⚠️ |
| 11 | Debugging | [11](../book/11-debugging.md) | 12 | regression tests 🧪; ખરી નિષ્ફળતાઓ ⚠️ |
| 12 | Customization | [12](../book/12-customization.md) | 13 | patches 🧪; live API ⚠️ |
| 13 | Advanced engineering | [13](../book/13-advanced-engineering.md) | 14 | grep અને benchmark 🧪 |
| 14 | અંતિમ project | [14](../book/14-antim-project.md) | 15 | ભાગ A 🧪; ભાગ B ⚠️ |
| (ઉમેરો) | આગળનો રસ્તો: 24×7, back-office, મંજૂરી, teams | [15](../book/15-aagal-no-rasto.md) | ઉપસંહાર | 📝 આખું સૂચિત |

## Running example ના કિસ્સા

Request: **"@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો."** બધા 🧪 ([log](../evidence/running-example.log.json)).

| કિસ્સો | Log માં | મુખ્ય પ્રકરણ |
|---|---|---|
| મૂળ request | `A_*` | [1](../book/01-domain-model.md), [5](../book/05-policy-eval.md), [6](../book/06-tickets-assignments.md) |
| Duplicate | `B_duplicate` | [4](../book/04-sources-intake.md) |
| અનધિકૃત મોકલનાર | `C_unauthorized`, `D_*` | [5](../book/05-policy-eval.md) |
| Follow-up | `E_followup` | [4](../book/04-sources-intake.md), [6](../book/06-tickets-assignments.md) |
| Worker નિષ્ફળતા | `F_*` | [6](../book/06-tickets-assignments.md) |
| Restart | `G_restart` | [7](../book/07-worker-execution.md) |
| માણસ રોકે | `H_*`, `I_stopped`, `J_afterStop` | [5](../book/05-policy-eval.md), [6](../book/06-tickets-assignments.md), [10](../book/10-panel.md) |

## Deliverables

| માગણી | ક્યાં |
|---|---|
| Linked table of contents | [README](../README.md) |
| Source અને symbol index | [પરિશિષ્ટ A](A-source-index.md) (આપોઆપ બનેલું) |
| Command reference | [પરિશિષ્ટ B](B-command-reference.md) |
| Glossary | [પરિશિષ્ટ C](C-glossary.md) |
| Exercises, ઉકેલ, patches | [પરિશિષ્ટ D](D-lab-solutions.md), [`labs/`](../labs/README.md) |
| Mastery rubric | [પરિશિષ્ટ E](E-mastery-rubric.md) |
| Verification report | [પરિશિષ્ટ G](G-verification-log.md) |
| Progress file | [પરિશિષ્ટ H](H-status.md) |
| Diagrams (Mermaid), તીરોની સમજ સાથે | દરેક પ્રકરણનો 🗺️ નકશો; `tools/verify-mermaid.mjs` વડે parse 🧪 |
| Commit-pinned citations, line સાથે | દરેક citation link; [`citations.generated.md`](citations.generated.md) |

## પ્રકરણનું માળખું (દરેક પ્રકરણ 4–14 માં)

| ભાગ | હેતુ |
|---|---|
| 🎯 તમે શું કરી શકશો; નવા શબ્દો | પરિણામ અને પૂર્વજરૂરિયાત |
| 🗺️ નકશો | એક diagram, તીરોની સમજ સાથે |
| દૃશ્યો: 🎬 ઘટના → ❓ સવાલ → 💻 code માં → 🔬 Expert નજર | સાદું ઉદાહરણ → source → સમજ → ઊંડાણ |
| Source map | ખોલવાનો ક્રમ |
| 🧪 Lab | ચલાવવાનું; ફેરફાર અને ચકાસણી |
| 🔮 આગાહી કસોટી | ધારો, પછી તપાસો |
| 🩺 નિષ્ફળતા | Debugging નો એક કિસ્સો |
| ✅ સાર; યાદ-ચાવી; કાર્ડ; "મિત્રને સમજાવો" | પુનરાવર્તન |
| 🧠 Mastery check | સવાલો; જવાબ પરિશિષ્ટ D માં |

## જાણીજોઈને ન આવરેલું

- DSH (Harness) ની અંદરની રચના: આ repository તેને બોલાવે છે; તેનો source અહીં નથી.
- Feishu Source ની ઊંડી વિગત: માળખું [પ્રકરણ 4](../book/04-sources-intake.md) માં; live ચલાવ્યું નથી.
- Windows / WSL2.
- React client ની દરેક component: એક ક્રિયા (Stop) પૂરી trace કરી છે.
