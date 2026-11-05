# પ્રકરણ 2 — Setup અને operation

[← પ્રકરણ 1](01-domain-model.md) · [અનુક્રમણિકા](../README.md) · [આગળ: પ્રકરણ 3 →](03-startup.md)

## શીખવાનું પરિણામ અને પૂર્વજરૂરિયાત

આ પ્રકરણ પછી તમે:
- prerequisites અને compatible versions ની યાદી બનાવી શકશો;
- **offline lab** (DSH વગર: build, tests, running example) અને **live lab** (DSH + GitHub + model provider) વચ્ચે ફરક કરી શકશો;
- profile, agent account, settings, startup, status અને shutdown ના પગલાં સમજાવી શકશો;
- `scripts/dsh-superagent` ના exit codes નો અર્થ કહી શકશો.

**Terminal concepts:** environment variable (`$HOME`, `DSH_HOME`), `PATH`, shell wrapper script (`#!/bin/sh`), `chmod +x`, tmux session. **Git:** clone, worktree.

**ખોલવાનો ક્રમ:** [`SETUP.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/SETUP.md) → [`docs/006-deployment.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/006-deployment.md) → [`examples/profile.cordis.patch.yml`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/examples/profile.cordis.patch.yml) → [`scripts/dsh-superagent`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/scripts/dsh-superagent).

## 2.1 SETUP.md ની રીત: setup પણ ફિલસૂફી મુજબ

**[Source]** `SETUP.md` માણસ માટે નહીં, **coding agent માટે** લખાયેલું છે. Agent એક સમયે એક જ પ્રશ્ન પૂછે છે, દરેક message 300 શબ્દોથી ટૂંકો રાખે છે, પહેલાં બધા જવાબો ભેગા કરે છે, પછી એક જ plan બતાવે છે અને confirmation પછી જ execute કરે છે. Chat માં ક્યારેય secret માગતો નથી. Operator ના ધ્યાનની બચત અહીં પણ નિયમ છે.

નવ પ્રશ્નો domain flow ના ક્રમમાં છે: **Sources** (1–4) → **Policy** (5–6) → **Execution** (7–9). Defaults જેના વિશે પૂછવામાં આવતું નથી: profile `superagent`, port `3082`, branch prefix `agent/`, accept mode `observe`.

## 2.2 Prerequisites અને versions

| જરૂરિયાત | Version | ક્યાંથી | આ environment માં |
| --- | --- | --- | --- |
| Node.js | `^22.19.0 \|\| >=24.0.0` | `package.json` `engines.node` | v22.23.4 ✅ |
| pnpm | `packageManager: pnpm@11.7.0` | `package.json` | 11.7.0 ✅ |
| git | 2.32+ | `docs/006` (credential config) | 2.43.0 ✅ |
| tmux | (version નથી આપ્યું) | `scripts/dsh-superagent start` | 3.4 ✅ |
| Python | 3.8+ | service script (`#!/usr/bin/env python3`) | 3.13 ✅ |
| GitHub CLI | 2.48+ | `docs/006` | 2.89.0 ✅ |
| DSH (DeepSeek Harness) | `engines.dsh: ^0.2.1-alpha.2`; docs install command `@deepseek-ai/dsh@0.2.1-rc.3` | `package.json`, `docs/006` | ❌ installed નથી |
| Model provider | DSH માં configured | `docs/006` | ❌ |
| lark-cli (Feishu માટે, વૈકલ્પિક) | 1.0.90 પર tested | `docs/006` | ❌ |

**Documentation અને code વચ્ચેનો ફરક:** `docs/006` install command માં `@deepseek-ai/dsh@0.2.1-rc.3` વાપરે છે, જ્યારે devDependencies `0.2.1-alpha.2` packages pin કરે છે. `^0.2.1-alpha.2` semver range માં `0.2.1-rc.3` આવી જાય છે (prerelease ordering: `alpha < rc`), એટલે બંને સુસંગત છે. **[ધારણા]** semver prerelease નિયમો પરથી; DSH install કરીને ચકાસ્યું નથી.

### Linux અને Windows + WSL2

- **[Source]** `cordis.patch.yml` માં `process.platform === 'win32'` પ્રમાણે bash અથવા PowerShell sandbox પસંદ થાય છે. એટલે DSH presets Windows ને ધ્યાનમાં રાખે છે.
- **[Source]** `scripts/dsh-superagent` Python `fcntl`, `ps -ww` અને `tmux` વાપરે છે. આ POSIX સાધનો છે અને native Windows પર ઉપલબ્ધ નથી.
- **[ધારણા, verify નથી કર્યું]** Windows પર સૌથી સરળ રસ્તો WSL2 (Ubuntu) છે: આખું setup Linux ની જેમ WSL2 ની અંદર કરો, અને panel ને Windows browser માંથી `http://127.0.0.1:3082` પર ખોલો. WSL2 સામાન્ય રીતે localhost ports forward કરે છે. Repository WSL2 વિશે કંઈ કહેતી નથી, અને અમે WSL2 પર ચલાવ્યું નથી.

## 2.3 કયા પગલાંમાં તમારા credentials જોઈએ (operator steps)

આ પગલાં કોઈ agent તમારા માટે ન કરી શકે, અને કરવાં પણ ન જોઈએ:

| પગલું | શા માટે | આદેશ (docs/006 મુજબ) |
| --- | --- | --- |
| Agent માટે અલગ GitHub **user** account બનાવો, અને તેને repository માં write access આપો | Agent જે લખે તે આ નામે દેખાય છે; GitHub App ચાલે નહીં, કારણ કે notifications વંચાય છે | GitHub UI |
| Agent CLI wrapper માં login કરો | Agent ના credentials operator ના credentials થી અલગ રહે | નીચે જુઓ |
| (Feishu) Bot app બનાવો, અને secret stdin થી આપો | Chat માં secret ન જાય | `lark-cli config init --app-secret-stdin` |
| Model provider configure કરો | DSH ને LLM જોઈએ | DSH ના પોતાના docs (external boundary) |

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

**સમજૂતી:** `GH_CONFIG_DIR` બદલવાથી `gh` પોતાની configuration (અને token) અલગ directory માંથી વાંચે છે, એટલે agent ના credentials operator ના credentials સાથે ભળતા નથી. `exec` shell process ને `gh` થી બદલી નાખે છે. છેલ્લો command agent નું login છાપે છે. dsh-superagent setup પણ login આ જ રીતે વાંચે છે.

## 2.4 Install, machine configuration, start (live lab)

**[Source, docs/006 "Install"]** નવા machine પર, એક જ વાર:

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

⚠️ ચોથો command profile બનાવે છે. Profile પહેલેથી હોય તો તે તેને **બદલી નાખે છે અને `cordis.patch.yml` delete કરે છે**. Upgrade માટે ક્યારેય ન વાપરો.

**Machine configuration:** `examples/profile.cordis.patch.yml` ને `~/.dsh/profiles/superagent/cordis.patch.yml` માં copy કરો. `stateDir` absolute path હોવો જોઈએ:

```yaml
- id: webserver
  config: { host: 127.0.0.1, port: 3082 }
- id: dsh-superagent
  config:
    stateDir: /home/me/.dsh/state/superagent
```

`registerHttp` loopback સિવાયના host પર ચાલવાની ના પાડે છે ("Orchestrator management requires a loopback Web server", [`http.ts#L231`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L231)). એટલે `host: 127.0.0.1` જરૂરી છે.

**Start / status / stop:**

```bash
scripts/dsh-superagent start
```

```bash
scripts/dsh-superagent status
```

```bash
scripts/dsh-superagent stop
```

| Exit code | અર્થ | Restart થી ઠીક થાય? |
| --- | --- | --- |
| 0 | સામાન્ય રીતે ચાલે છે | — |
| 1 | ચાલતું નથી / બે વાર ચાલે છે / જવાબ આપતું નથી / runtime error | હા, કદાચ |
| 2 | ચાલે છે, પણ કોઈ part (Source, `sync:<id>`) error report કરે છે | ના |
| 3 | ચાલે છે, પણ setup ની રાહ જુએ છે | ના |

`status` script `GET /orchestrator/api/state` વાંચે છે ([`http.ts#L105-L110`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L105-L110)). `stop` graceful shutdown માગે છે અને Executors માટે 5 minutes સુધી રાહ જુએ છે.

## 2.5 Offline lab: repository build અને tests

DSH કે GitHub credentials વગર, આ પુસ્તકના બધા offline exercises આ રીતે ચાલે છે:

```bash
git clone https://github.com/deepseek-ai/dsh-superagent-prototype.git && cd dsh-superagent-prototype
```

```bash
git checkout 8c32a9dc5d72c033816c6a8110b37f40cf94fba4 && pnpm install --frozen-lockfile
```

```bash
pnpm check
```

```bash
cp ../DSHSuperAgentBook/examples/*.spec.ts tests/ && pnpm vitest run tests/running-example.spec.ts tests/demo-source.spec.ts
```

**[Test ચલાવ્યો]** છેલ્લો command: `Test Files 2 passed (2)`, `Tests 2 passed (2)`. ઉપરાંત `tsc --noEmit` આ બે નવી files સાથે પણ exit 0 આપે છે.

**Offline lab નું રહસ્ય:** `tests/fixtures/host.ts` (299 lines) DSH host ની નકલ (simulation) છે. `tests/runtime.spec.ts` આખી application ને આ simulated host પર tools અને HTTP વડે ચલાવે છે. એટલે DSH વગર પણ મોટા ભાગનું behavior test થઈ શકે છે.

## 2.6 Settings (live lab, setup પછી)

`docs/006` ના Management API નો ઉપયોગ કરીને settings આ ક્રમમાં save કરો: `source:github` → (`source:feishu`) → `policy` → `executor` → prompts. દરેક request માં `x-orchestrator-request: 1` header જોઈએ. Host `127.0.0.1:<port>` અથવા `localhost:<port>` હોવો જોઈએ ([`sameOrigin`, `http.ts#L75-L79`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/http.ts#L75-L79)).

Running example માટે policy block (shortened):

```json
{ "rules": [], "sources": { "github": { "allowed": [{ "id": "alice" }] } } }
```

Prepare command (docs/006 ઉદાહરણ, `widgets` માટે):

```sh
git -C /home/me/src/widgets fetch --no-tags "https://github.com/$DSH_SUPERAGENT_GITHUB_REPOSITORY.git" "${DSH_SUPERAGENT_GITHUB_PR_HEAD:-HEAD}:refs/dsh-superagent/$DSH_SUPERAGENT_TICKET" &&
git -C /home/me/src/widgets worktree add -b "agent/$DSH_SUPERAGENT_NAME" "$DSH_SUPERAGENT_DIR" "refs/dsh-superagent/$DSH_SUPERAGENT_TICKET"
```

**સમજૂતી:** પહેલો `git fetch` source ref (PR હોય તો તેનો head, નહીં તો `HEAD`) ને Ticket માટેના local ref માં લાવે છે. બીજો `git worktree add` તે ref પરથી `agent/<short name>` branch સાથે Ticket ની directory માં નવું checkout બનાવે છે. Running example માં short name `readme-setup-97bdef320703` હતું, એટલે branch `agent/readme-setup-97bdef320703` થશે. PR binding માટે આ જ નામ મહત્વનું છે ([પ્રકરણ 6](06-tickets-assignments.md)).

## 2.7 Live lab: "Try it"

Allowed account (alice) થી Issue ખોલો: `@widgets-agent READMEમાં setup instructions સુધારો અને જરૂરી checks ચલાવો.` એક polling interval (default 60 s) માં overview પર Ticket દેખાવો જોઈએ.

⚠️ **[Source, docs/006]** Issue body **edit** કરીને mention ઉમેરશો તો તે વંચાશે નહીં. `readNotified` ફક્ત cursor પછી **ખોલાયેલી** Issue નું body લે છે ([`github.ts#L352-L356`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/sources/github.ts#L352-L356)). તેના બદલે નવો comment કરો.

**[ધારણા]** Live lab અમે ચલાવી શક્યા નથી, કારણ કે DSH, model provider અને agent account આ environment માં નથી ([Verification report](../appendices/F-verification-report.md)).

## 2.8 Shutdown અને upgrade

Upgrade: કોઈ Executor turn ની વચ્ચે ન હોય તેની રાહ જુઓ → `orchestrator.sqlite` નો backup લો → `git pull && pnpm install && pnpm build` → `scripts/dsh-superagent restart`. Newer schema વાળો database જૂનું version ખોલી શકતું નથી ([`store.ts#L66`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/src/app/store.ts#L66)). એટલે rollback માટે backup જ એકમાત્ર રસ્તો છે.

## 2.9 Debugging exercise: setup problems

| લક્ષણ | કારણ | સુધારો |
| --- | --- | --- |
| `status` exit 3, `The agent GitHub CLI is not set.` | GitHub card પર `cli` ખાલી છે | wrapper નો absolute path મૂકો |
| `@… cannot push to …` | Agent account પાસે write access નથી | repository invitation સ્વીકારો |
| `… was not written by dsh-superagent` | `worker-bin` માં કોઈ બીજાની file છે | તે file ખસેડો |
| Mention પછી કંઈ થતું નથી | Allowed list ખાલી છે, Source off છે, processing paused છે, અથવા mention edit થી ઉમેરાયું છે | panel માં Source અને Policy જુઓ |

વધુ: `docs/006` Troubleshooting table, અને [પ્રકરણ 11](11-debugging.md).

## Mastery પ્રશ્નો

1. Agent માટે GitHub App કેમ ન ચાલે?
2. Agent નો profile operator ના પોતાના DSH profile થી અલગ કેમ રાખવો જોઈએ? (`docs/006` "What runs")
3. `status` exit 2 અને exit 3 વચ્ચે hourly check ની પ્રતિક્રિયા કેમ અલગ છે?
4. Prepare command માં `DSH_SUPERAGENT_GITHUB_PR_HEAD` ખાલી હોય ત્યારે શું થાય?

ઉકેલો: [પરિશિષ્ટ E § પ્રકરણ 2](../appendices/E-solutions.md#પ્રકરણ-2)

[← પ્રકરણ 1](01-domain-model.md) · [આગળ: પ્રકરણ 3 →](03-startup.md)
