# પ્રકરણ 2 — Setup અને operation: ડેસ્ક ગોઠવવો

> **Level 2 · વાર્તાનો દિવસ 3.**
> આજે ડેસ્ક ગોઠવાય છે: સવિતાબેનનું પોતાનું નામ અને ચાવી, અલગ ઓરડો, તિજોરી, અને રાતનો ચોકીદાર.
> પહેલાં: [પ્રકરણ 1](01-domain-model.md).

## 🎯 આ પ્રકરણ પછી તમે શું કરી શકશો

- Prerequisites અને versions ની યાદી બનાવી શકશો.
- **Offline lab** (DSH વગર) અને **live lab** (DSH + GitHub + model) વચ્ચે ફરક કરી શકશો.
- Agent account, profile, machine configuration, settings, start, status અને stop સમજાવી શકશો.
- `scripts/dsh-superagent` ના ચાર exit codes નો અર્થ કહી શકશો.

## 🗺️ નકશો: ડેસ્ક ગોઠવવાનાં સાત પગલાં

| # | ભોજનાલયમાં | Setup માં | દૃશ્ય |
|---|---|---|---|
| 1 | ઓજારો તપાસવાં | Node, pnpm, git, tmux, Python, gh, DSH | 1 |
| 2 | સવિતાબેનનું પોતાનું નામ અને ચાવી | Agent GitHub account + `gh-agent` wrapper | 2 |
| 3 | ડેસ્કનો અલગ ઓરડો | DSH profile `superagent`, port 3082 | 3 |
| 4 | તિજોરીની જગ્યા | `stateDir` | 3 |
| 5 | પોથી અને યાદી | Settings: Sources → Policy → Execution → Prompts | 4 |
| 6 | ઓટલો તૈયાર કરવાની રીત | prepare command (git worktree) | 4 |
| 7 | બહાદુરનો આંટો | `status` + hourly check | 5 |

---

## દૃશ્ય 1 — ઓજારોની તપાસ

🎬 ડેસ્ક ગોઠવતાં પહેલાં દીદી આરવ પાસે યાદી બનાવડાવે છે: ટેબલ, ખુરશી, રજિસ્ટર, તિજોરી, ફોન. "જે નથી, તે પહેલાં લાવો. અધવચ્ચે ખબર પડે કે તિજોરી નથી, તો બધું ફરી કરવું પડે."

❓ "Software માં 'બધાં ઓજારો છે' કેવી રીતે તપાસું?"

💻 [SETUP.md][setup-md] નું પહેલું પગલું "Probe" એક જ command માં બધું તપાસે છે:

```bash
node -v; pnpm -v; git --version; tmux -V; python3 --version; gh --version | head -1; dsh --version
```

| જરૂરિયાત | Version | આ પુસ્તકના environment માં |
|---|---|---|
| Node.js | `^22.19.0 \|\| >=24.0.0` ([engines][pkg-engines]) | v22.23.4 🧪 |
| pnpm | `pnpm@11.7.0` (`packageManager`) | 11.7.0 🧪 |
| git | 2.32+ | 2.43.0 🧪 |
| tmux | — | 3.4 🧪 |
| Python | 3.8+ | 3.13 🧪 |
| GitHub CLI | 2.48+ | 2.89.0 🧪 |
| DeepSeek Harness | `^0.2.1-alpha.2`; docs install `@deepseek-ai/dsh@0.2.1-rc.3` | ⚠️ installed નથી |
| Model provider | DSH માં configured | ⚠️ નથી |

> ⚠️ **Docs અને code.** [docs/006][doc-deploy] install માટે `0.2.1-rc.3` કહે છે, જ્યારે devDependencies `0.2.1-alpha.2` pin કરે છે. Semver માં `alpha < rc`, એટલે `^0.2.1-alpha.2` ની range માં `rc.3` આવી જાય છે. અમે DSH install કરીને ચકાસ્યું નથી.

> ⚠️ **Windows.** Service script Python `fcntl`, `ps` અને `tmux` વાપરે છે, જે native Windows પર નથી. WSL2 (Ubuntu) ની અંદર Linux ની જેમ setup કરવું સૌથી સરળ લાગે છે, પણ repository WSL2 વિશે કંઈ કહેતી નથી, અને અમે ત્યાં ચલાવ્યું નથી.

🔬 **Expert નજર.** SETUP.md કહે છે: ખૂટતી prerequisite "becomes an item of the plan, not a question". Probe થી જવાબ મળે તે પ્રશ્ન માણસને પૂછવો એ ધ્યાનનો બગાડ છે. Expert પહેલાં machine ને પૂછે છે, પછી માણસને.

## દૃશ્ય 2 — સવિતાબેનનું પોતાનું નામ અને ચાવી

🎬 પહેલા દિવસે સવિતાબેન પપ્પાના ફોનથી ગ્રાહકને જવાબ આપે છે. ગ્રાહક સાંજે પપ્પાને મળે છે: "તમે કહ્યું હતું ને કે…" પપ્પાને કંઈ ખબર નથી. દીદી તરત ડેસ્ક માટે અલગ ફોન અને અલગ સહી-સિક્કો લાવે છે: "સવિતાબેન જે લખે તે **સવિતાબેનના નામે** દેખાવું જોઈએ."

❓ "Agent મારા GitHub account થી કેમ ન ચાલે? સહેલું પડે."

💻 [docs/006][doc-deploy] "Accounts": agent માટે અલગ GitHub **user** account, repository પર write access સાથે. ✅ GitHub App ચાલે નહીં, કારણ કે dsh-superagent account ની **notifications** વાંચે છે.

Wrapper script agent ના credentials ને અલગ folder માં રાખે છે:

```bash
mkdir -p ~/.local/bin
```

```bash
cat > ~/.local/bin/gh-agent <<'EOF'
#!/bin/sh
GH_CONFIG_DIR="$HOME/.config/gh-agent" exec gh "$@"
EOF
```

```bash
chmod +x ~/.local/bin/gh-agent && gh-agent auth login
```

```bash
gh-agent api user --jq .login
```

`GH_CONFIG_DIR` બદલવાથી `gh` પોતાનો token બીજા folder માંથી વાંચે છે. `exec` shell ને `gh` થી બદલી નાખે છે. છેલ્લો command agent નું login છાપે છે; setup પણ login આ જ રીતે વાંચે છે.

**આ પગલાં ફક્ત તમે કરી શકો** (credentials): agent account બનાવવું, repository invitation સ્વીકારવું, `auth login`, અને model provider ની key. SETUP.md નો નિયમ: "Never ask for a secret in the chat."

🔬 **Expert નજર.** `docs/000` "Responsibility": "The agent comments, opens pull requests and messages people under accounts your team sees every day… you are responsible for it." અલગ account ત્રણ વસ્તુ આપે છે: (1) agent નું દરેક લખાણ ઓળખાય; (2) Source પોતાના જ messages છોડી શકે ([`sameName` check][gh-self]), નહીં તો agent પોતાને જ જવાબ આપ્યા કરે; (3) access પાછો ખેંચવો હોય તો એક account બંધ કરો.

## દૃશ્ય 3 — અલગ ઓરડો અને તિજોરી

🎬 પપ્પા ડેસ્ક ગલ્લાની બાજુમાં મૂકવા માગે છે. દીદી ના પાડે છે: "ડેસ્ક પોતાના ઓરડામાં રહેશે. ત્યાં તે પોતાની ગોઠવણ બદલશે; ગલ્લા પર અસર ન થવી જોઈએ. અને ડેસ્ક બંધ-ચાલુ કરીએ ત્યારે ગલ્લો ચાલુ રહેવો જોઈએ."

❓ "Software માં 'અલગ ઓરડો' શું છે?"

💻 **DSH profile.** [docs/006][doc-deploy] "What runs": dedicated profile `superagent`, કારણ કે "the plugin changes process-wide `PATH` and git settings, and its process needs independent restarts and upgrades". ✅

Install (નવા machine પર, એક જ વાર):

```bash
npm install -g @deepseek-ai/dsh@0.2.1-rc.3
```

```bash
git clone https://github.com/deepseek-ai/dsh-superagent-prototype.git dsh-superagent && cd dsh-superagent
```

```bash
pnpm install && pnpm build
```

```bash
dsh superagent --from-default-profile web --dump-config > /dev/null
```

```bash
dsh plugin --profile superagent add "link:$PWD"
```

> ⚠️ ચોથો command profile **બનાવે** છે. Profile પહેલેથી હોય તો તે તેને બદલી નાખે છે અને તેનું `cordis.patch.yml` delete કરે છે. Upgrade માટે ક્યારેય ન વાપરો.

**તિજોરીની જગ્યા** = `stateDir`. [`examples/profile.cordis.patch.yml`][profile-example] ને `~/.dsh/profiles/superagent/cordis.patch.yml` માં copy કરો:

```yaml
- id: webserver
  config:
    host: 127.0.0.1
    port: 3082
- id: dsh-superagent
  config:
    stateDir: /home/me/.dsh/state/superagent
```

`stateDir` માં database, lock, worker shims, agent ની git configuration અને (default રૂપે) ticket directories રહે છે. `host: 127.0.0.1` ફરજિયાત છે: panel loopback સિવાય ચાલવાની ના પાડે છે ([`registerHttp`][http-register]). ✅

🔬 **Expert નજર.** Bundle ની પોતાની [`cordis.patch.yml`][patch-worker] માં machine-specific કશું નથી; `stateDir` profile layer આપે છે. આ વિભાજન ("શું ચાલે" vs "ક્યાં ચાલે") ને કારણે એ જ bundle દસ machines પર એક પણ ફેરફાર વગર ચાલે.

## દૃશ્ય 4 — પોથી, યાદી અને ઓટલો

🎬 ડેસ્ક તૈયાર છે, પણ ખાલી છે. સવિતાબેન પૂછે છે: "કયું રજિસ્ટર જોઉં? કોના ઓર્ડર લઉં? ટુકડીને ઓટલો કેવી રીતે આપું?" દીદી ત્રણેય પ્રશ્નોના જવાબ **એ જ ક્રમમાં** લખે છે, કારણ કે કામ પણ એ જ ક્રમમાં વહે છે.

❓ "Settings નો ક્રમ કેમ મહત્વનો?"

💻 SETUP.md ના પ્રશ્નો અને settings બંને domain flow ના ક્રમમાં છે: **Sources → Policy → Execution → Prompts**. Settings panel માંથી, અથવા **Management API** થી save થાય છે. દરેક request માં `x-orchestrator-request: 1` header જોઈએ ([`sameOrigin`][http-origin]). ✅

| Block | ભોજનાલયમાં | Running example |
|---|---|---|
| `source:github` | કયું રજિસ્ટર, કોની ચાવી | `repository: demo-org/widgets`, `cli: ~/.local/bin/gh-agent` |
| `policy` | ખાતાવાળા ગ્રાહકોની યાદી | `sources.github.allowed: [{ id: 'alice' }]` |
| `eval` | proactive કામ: બંધ / ફક્ત નોંધ / સ્વીકાર | `mode: observe` (default) |
| `executor` | ચૂલા, ઓટલાની રીત | `maxWorkers: 3`, `prepare: …` |

**ઓટલો તૈયાર કરવાની રીત** = prepare command ([docs/006][doc-deploy] નું ઉદાહરણ):

```sh
git -C /home/me/src/widgets fetch --no-tags "https://github.com/$DSH_SUPERAGENT_GITHUB_REPOSITORY.git" "${DSH_SUPERAGENT_GITHUB_PR_HEAD:-HEAD}:refs/dsh-superagent/$DSH_SUPERAGENT_TICKET" &&
git -C /home/me/src/widgets worktree add -b "agent/$DSH_SUPERAGENT_NAME" "$DSH_SUPERAGENT_DIR" "refs/dsh-superagent/$DSH_SUPERAGENT_TICKET"
```

પહેલો `fetch` source ref (PR હોય તો તેનો head, નહીં તો `HEAD`) ને ticket ના local ref માં લાવે છે. બીજો `worktree add` તે ref પરથી `agent/<ટુકડીનું નામ>` branch સાથે ticket ની directory માં નવું checkout બનાવે છે. 🧪 Running example માં ટુકડીનું નામ `readme-setup-97bdef320703` હતું.

🔬 **Expert નજર.** [docs/000][doc-philosophy]: "Start narrow. Begin with a short allowed list and with proactive work only recorded." Default `observe` mode agent ને "હું આ કરત" ફક્ત **નોંધવા** દે છે. એક અઠવાડિયું નોંધો વાંચો; સાચી લાગે પછી `auto`. Expert નવી સત્તા હંમેશાં પહેલાં "ફક્ત જુઓ" mode માં આપે છે.

## દૃશ્ય 5 — બહાદુરના ચાર જવાબ

🎬 રાતનો ચોકીદાર બહાદુર દર કલાકે ડેસ્કના ઓરડામાં ડોકિયું કરે છે. દીદીએ તેને ચાર જ જવાબ શીખવ્યા છે: "બરાબર", "બંધ પડ્યું છે, ચાલુ કરું", "ચાલે છે પણ છોટુ બીમાર છે, શેઠને કહું", "ચાલે છે પણ ગોઠવણ અધૂરી છે, શેઠને કહું".

❓ "છેલ્લા બેમાં બહાદુર પોતે ચાલુ-બંધ કેમ નથી કરતો?"

"કારણ કે ચાલુ-બંધ કરવાથી છોટુ સાજો નહીં થાય."

💻 [`scripts/dsh-superagent`][script-service] `start`, `status`, `stop`, `restart` આપે છે. `start` DSH ને tmux session `dsh-superagent` માં ચલાવે છે. ✅

```bash
scripts/dsh-superagent start
```

```bash
scripts/dsh-superagent status
```

| Exit code | બહાદુરનો જવાબ | અર્થ | Restart થી ઠીક થાય? |
|---|---|---|---|
| 0 | બરાબર | સામાન્ય રીતે ચાલે છે | — |
| 1 | બંધ પડ્યું છે | ચાલતું નથી, બે વાર ચાલે છે, જવાબ નથી આપતું, અથવા runtime error | કદાચ |
| 2 | છોટુ બીમાર છે | ચાલે છે, પણ કોઈ part (Source, `sync:<id>`) error કહે છે | ના |
| 3 | ગોઠવણ અધૂરી | ચાલે છે, પણ setup ની રાહ જુએ છે | ના |

`status` `GET /orchestrator/api/state` વાંચે છે ([`stateView`][http-state]). **Hourly check** operator ની **બીજી** DSH profile માં બને છે, કારણ કે "It must keep running when the agent service is down" ([docs/006][doc-deploy]). ✅

🔬 **Expert નજર.** ચાર codes નો મુદ્દો એ છે કે **દરેક નિષ્ફળતાનો ઉપાય અલગ છે**. એક જ "error" code હોત, તો automation બધું restart કર્યા કરત, અને restart ચાલુ કામ (running Assignments) ને અટકાવે છે. Expert monitoring design કરે ત્યારે પૂછે છે: "આ signal મળે ત્યારે કોણ, શું કરશે?" જે signal પરથી કોઈ અલગ પગલું નથી નીકળતું, તે signal નથી, ઘોંઘાટ છે.

---

## Source map

| ક્રમ | File | શું જોવું |
|---|---|---|
| 1 | [SETUP.md][setup-md] | Probe, 9 પ્રશ્નો, plan, execute |
| 2 | [docs/006][doc-deploy] | Accounts, Install, Machine configuration, Management API, Troubleshooting |
| 3 | [profile example][profile-example] | `webserver`, `stateDir` |
| 4 | [`scripts/dsh-superagent`][script-service] | exit codes |
| 5 | [`http.ts`][http-origin] | `sameOrigin`, `stateView` |

## 🧪 Lab: offline (DSH વગર)

આ પુસ્તકના બધા offline exercises આ રીતે ચાલે છે. Book lab code [`labs/`](../labs/README.md) માં છે.

```bash
git clone https://github.com/deepseek-ai/dsh-superagent-prototype.git && cd dsh-superagent-prototype
```

```bash
git checkout 8c32a9dc5d72c033816c6a8110b37f40cf94fba4 && pnpm install --frozen-lockfile
```

```bash
cp <book>/labs/running-example.spec.ts <book>/labs/demo-source.spec.ts <book>/labs/final-project.spec.ts tests/
```

```bash
pnpm vitest run tests/running-example.spec.ts tests/demo-source.spec.ts tests/final-project.spec.ts
```

🧪 **અવલોકન:** `Test Files 3 passed (3)`, `Tests 3 passed (3)`; `tsc --noEmit` exit 0.

**Offline lab કેમ શક્ય છે:** `tests/fixtures/host.ts` DSH host ની નકલ છે ([fixture][test-host-fixture]). `tests/runtime.spec.ts` આખી application ને તે simulated host પર tools અને HTTP વડે ચલાવે છે.

## 🧪 Lab: live ("Try it")

⚠️ અમે ચલાવી શક્યા નથી (DSH, model provider, agent account ઉપલબ્ધ ન હતાં). પગલાં docs પરથી છે.

Allowed account (alice) થી Issue ખોલો: `@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો.` એક polling interval (default 60 s) માં overview પર Ticket દેખાવો જોઈએ.

## 🔮 આગાહી કસોટી

તમે હાલની Issue ના body ને **edit** કરીને `@widgets-agent` ઉમેરો. Agent જવાબ આપશે? (ધારો. જવાબ: ના. [`readNotified`][gh-notified] ફક્ત cursor પછી **ખોલાયેલી** Issue નું body લે છે; comment જ કહે છે: "A mention added by a later edit to the body is not read". ✅ નવો comment કરો.)

## 🩺 નિષ્ફળતા: setup problems

| લક્ષણ | કારણ | સુધારો |
|---|---|---|
| exit 3, `The agent GitHub CLI is not set.` | GitHub card પર `cli` ખાલી | wrapper નો absolute path |
| `@… cannot push to …` | Agent account પાસે write access નથી | invitation સ્વીકારો |
| `… was not written by dsh-superagent` | `worker-bin` માં બીજાની file | file ખસેડો |
| Mention પછી કંઈ નહીં | Allowed list ખાલી; Source off; paused; mention edit થી | panel માં Source અને Policy |

<a id="saar"></a>

## ✅ સાર

| 🎬 ઘટના | 💻 નિયમ | 🔬 તૂટે તો |
|---|---|---|
| ઓજારોની તપાસ | Probe પહેલાં; machine ને પૂછો, પછી માણસને | અધવચ્ચે અટકવું |
| સવિતાબેનનું નામ | અલગ agent account + wrapper | Agent તમારા નામે બોલે; પોતાને જ જવાબ આપે |
| અલગ ઓરડો | Dedicated profile; `stateDir` profile layer માં | તમારા sessions પણ restart થાય |
| પોથી, યાદી, ઓટલો | Sources → Policy → Execution; `observe` થી શરૂ | પહેલા દિવસે ઘોંઘાટ |
| બહાદુરના ચાર જવાબ | Exit 0/1/2/3; દરેકનો ઉપાય અલગ | નકામા restarts |

**યાદ-ચાવી:** "0 બરાબર, 1 ચાલુ કર, 2 ભાગ બીમાર, 3 ગોઠવણ બાકી."

<details><summary>કાર્ડ: Agent માટે GitHub App કેમ ન ચાલે?</summary>

dsh-superagent agent account ની notifications વાંચે છે; GitHub Apps ને user notifications હોતી નથી.
</details>

## 🧠 Mastery check

1. Agent નો profile તમારા પોતાના DSH profile થી અલગ કેમ?
2. `status` exit 2 અને 3 માં hourly check restart કેમ નથી કરતું?
3. Prepare command માં `DSH_SUPERAGENT_GITHUB_PR_HEAD` ખાલી હોય ત્યારે શું થાય?
4. `observe` mode થી શરૂ કરવાનો ફાયદો શો?

જવાબો: [પરિશિષ્ટ D](../appendix/D-lab-solutions.md#પ્રકરણ-2).

## 🎬 આગળ શું

ડેસ્ક ગોઠવાઈ ગયો. સાંજે આરવ પૂછે છે: "કાલે સવારે સવિતાબેન આવશે ત્યારે પહેલું શું થશે? તિજોરી પહેલાં ખૂલે કે દરવાજો?" દીદી: "ક્રમ ખોટો પડે તો બે જણ એક ચોપડામાં લખે. કાલે સવારે છ વાગ્યે જોઈએ." → [પ્રકરણ 3](03-startup.md)
