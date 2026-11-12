# પરિશિષ્ટ H — સ્થિતિ અને આગળ વધારવાની નોંધ

> આ પાનું પુસ્તકની "progress file" છે: શું પૂરું છે, શું બાકી છે, અને કોઈ બીજું (કે ભવિષ્યનો તમે) કામ ક્યાંથી ઉપાડી શકે.

## સ્થિતિ

| ભાગ | સ્થિતિ |
|---|---|
| સમગ્ર નકશો; પ્રકરણ 0, 0A, 1–15 | ✅ લખાયાં, વાર્તા અને દૃશ્યના રૂપમાં |
| પરિશિષ્ટ A–H | ✅ |
| Labs (6 files) અને patches (4) | ✅ pinned commit પર ચલાવેલાં ([પરિશિષ્ટ G](G-verification-log.md)) |
| Tools: citations, refdefs, index, verify, mermaid, web આવૃત્તિ | ✅ |
| Live lab (DSH, model, GitHub) | ⚠️ **નથી ચલાવ્યું**; credentials નહોતાં |

## છેલ્લી ચકાસણી

2026-11-12, pinned checkout `8c32a9d` સામે:

```text
verify_book: 29 files, 828 relative links, 991 permalinks, 95 scenes, 0 error(s)
verify-mermaid: 22 block(s), 0 failure(s)
build-artifact: 28 parts, 729 KB
```

Web આવૃત્તિ desktop (1280px, light) અને phone (400px, dark) પહોળાઈ પર એક વાર ખોલીને જોઈ: આડું scroll નથી, script errors નથી.

## આ આવૃત્તિ કેવી રીતે બની

1. **પહેલી આવૃત્તિ** (સીધી, technical): source ની તપાસ, running example, patches અને verification.
2. **આ આવૃત્તિ** (વાર્તા-રૂપ): એ જ ચકાસેલી હકીકતો, પણ "અન્નપૂર્ણા થાળી ઘર" ની એક સળંગ વાર્તામાં, દરેક વિચાર ચાર પગલાંમાં (🎬 ❓ 💻 🔬). Citations હવે એક કોષ્ટક (`tools/citations.tsv`) માંથી આવે છે અને મશીનથી ચકાસાય છે.
3. પુનર્લેખનમાં **નવા tests ચલાવ્યા નથી**, સિવાય કે પુસ્તકનાં પોતાનાં tools. 🧪 નાં બધાં પરિણામ પહેલી આવૃત્તિની તપાસમાંથી છે, એ જ pinned commit પર.

## Upstream બદલાય ત્યારે

1. નવા commit નો checkout લો.
2. `python3 tools/citations.py <checkout>` ચલાવો. જે citation ની લીટીઓ ખસી ગઈ હોય તે નિષ્ફળ જશે (ઓળખ-લખાણ નહીં મળે).
3. `tools/citations.tsv` માં ranges સુધારો; `tools/citations.py` માં `SHA` બદલો; `python3 tools/citations.py <checkout> > appendix/citations.generated.md`.
4. `python3 tools/refdefs.py book/*.md appendix/[A-H]*.md` અને `python3 tools/build_index.py`.
5. Labs ફરી ચલાવો ([labs/README](../labs/README.md)), અને જે 🧪 આંકડા બદલાયા હોય તે સુધારો.
6. `python3 tools/verify_book.py <checkout>`.

## ખુલ્લા મુદ્દા

- Live lab ચલાવીને [પ્રકરણ 2](../book/02-setup-operation.md), [12](../book/12-customization.md) (દૃશ્ય 1) અને [14](../book/14-antim-project.md) (ભાગ B) ના ⚠️ ને 🧪 માં ફેરવવા.
- Flaky Feishu consumer test અને ટાંકેલા mention વાળો ફેરફાર upstream ને report કરવા (કર્યું **નથી**).
- [પ્રકરણ 13](../book/13-advanced-engineering.md) અને [14](../book/14-antim-project.md) ની બે આગાહી કસોટીઓ (ટેગવાળું workload; `bindThread` નો ક્રમ) માપવી: અત્યારે ⚠️ અનુમાન છે.
- [પ્રકરણ 15](../book/15-aagal-no-rasto.md) ના મંજૂરીના "રસ્તો 2" નો નાનો પ્રયોગ.
