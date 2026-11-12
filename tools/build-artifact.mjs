#!/usr/bin/env node
// Book tool: render the whole book (README, chapters, appendices, labs README) into one
// colourful HTML page for publishing as an Artifact.
// Usage: node tools/build-artifact.mjs <path to marked.esm.js> <output.html>
// Cross-file Markdown links become in-page anchors; links to other repo files
// (labs/, evidence/, tools/) point at the repository on GitHub.
// Styling hooks added on top of plain Markdown:
//   - blockquotes that open with 📦 / 🍽️ / ⚠️ / 💡 become coloured callouts;
//   - "##" headings that open with a chapter-structure emoji (🎬 🎯 🗺️ 🧪 🔮 🩺 ✅ 🧠) get an icon chip,
//     and the 🎬 story and ✅ recap sections are wrapped in tinted panels;
//   - paragraphs that open with a scene-step emoji (🎬 event, ❓ question, 💻 in code, 🔬 expert view)
//     get a coloured edge; the 🔬 paragraph becomes a tinted panel;
//   - a cover with the thali diagram and chapter cards is generated from META below.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, normalize, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const [markedPath, outPath] = process.argv.slice(2)
if (!markedPath || !outPath) { console.error('usage: build-artifact.mjs <marked.esm.js> <out.html>'); process.exit(2) }
const { Marked } = await import(pathToFileURL(resolve(markedPath)).href)
const ROOT = resolve(import.meta.dirname, '..')
const REPO_URL = 'https://github.com/vrajkher/DSHSuperAgentBook'
const REPO = REPO_URL + '/blob/main/'

// [file, view id, sidebar title, eyebrow, chip label, tone]
const VIEWS = [
  ['README.md', 'top', 'આ પુસ્તક વિશે', 'શરૂઆત', 'આ', 'ink'],
  ['book/overview-samagra-naksho.md', 'overview', 'સમગ્ર નકશો', 'પહેલાં વાંચો', 'ન', 'sky'],
  ['book/00-paayo.md', 'ch0', 'પાયો', 'Level 0 · દિવસ 1', '૦', 'leaf'],
  ['book/00a-lekh-ane-prototype.md', 'ch0a', 'લેખ અને prototype', 'Level 0 · દિવસ 1', '૦અ', 'leaf'],
  ['book/01-domain-model.md', 'ch1', 'Domain model', 'Level 1 · દિવસ 2', '૧', 'leaf'],
  ['book/02-setup-operation.md', 'ch2', 'Setup અને operation', 'Level 2 · દિવસ 3', '૨', 'leaf'],
  ['book/03-startup.md', 'ch3', 'Startup', 'Level 3 · દિવસ 4', '૩', 'haldi'],
  ['book/04-sources-intake.md', 'ch4', 'Sources અને intake', 'Level 4 · દિવસ 5', '૪', 'haldi'],
  ['book/05-policy-eval.md', 'ch5', 'Policy અને evaluation', 'Level 5 · દિવસ 6', '૫', 'haldi'],
  ['book/06-tickets-assignments.md', 'ch6', 'Tickets અને assignments', 'Level 6 · દિવસ 7', '૬', 'haldi'],
  ['book/07-worker-execution.md', 'ch7', 'Worker execution', 'Level 7 · દિવસ 8', '૭', 'kesar'],
  ['book/08-store-effects-outbox.md', 'ch8', 'Store, effects, outbox', 'Level 8 · દિવસ 9', '૮', 'kesar'],
  ['book/09-tools-prompts-skills.md', 'ch9', 'Tools, prompts, skills', 'Level 9 · દિવસ 10', '૯', 'kesar'],
  ['book/10-panel.md', 'ch10', 'Panel', 'Level 10 · દિવસ 11', '૧૦', 'kesar'],
  ['book/11-debugging.md', 'ch11', 'Debugging', 'Level 11 · દિવસ 12', '૧૧', 'chili'],
  ['book/12-customization.md', 'ch12', 'Customization', 'Level 12 · દિવસ 13', '૧૨', 'chili'],
  ['book/13-advanced-engineering.md', 'ch13', 'Advanced engineering', 'Level 13 · દિવસ 14', '૧૩', 'chili'],
  ['book/14-antim-project.md', 'ch14', 'અંતિમ project', 'Level 14 · દિવસ 15', '૧૪', 'chili'],
  ['book/15-aagal-no-rasto.md', 'ch15', 'આગળનો રસ્તો', 'ઉપસંહાર · સૂચિત', '૧૫', 'sky'],
  ['appendix/A-source-index.md', 'appendix-a', 'Source index', 'પરિશિષ્ટ A', 'A', 'ink'],
  ['appendix/B-command-reference.md', 'appendix-b', 'Command reference', 'પરિશિષ્ટ B', 'B', 'ink'],
  ['appendix/C-glossary.md', 'appendix-c', 'શબ્દકોશ', 'પરિશિષ્ટ C', 'C', 'ink'],
  ['appendix/D-lab-solutions.md', 'appendix-d', 'Labs ના ઉકેલ', 'પરિશિષ્ટ D', 'D', 'ink'],
  ['appendix/E-mastery-rubric.md', 'appendix-e', 'Mastery rubric', 'પરિશિષ્ટ E', 'E', 'ink'],
  ['appendix/F-coverage-map.md', 'appendix-f', 'Coverage map', 'પરિશિષ્ટ F', 'F', 'ink'],
  ['appendix/G-verification-log.md', 'appendix-g', 'Verification log', 'પરિશિષ્ટ G', 'G', 'ink'],
  ['appendix/H-status.md', 'appendix-h', 'સ્થિતિ', 'પરિશિષ્ટ H', 'H', 'ink'],
  ['labs/README.md', 'labs', 'Labs', 'જાતે ચલાવો', 'L', 'ink'],
]

// Cover cards: the question each chapter answers, and its place on the difficulty climb.
const CARDS = [
  ['ch0', 'દિવસ 1', 'આ prototype શું છે, અને તે ચાલે છે?', 'શરૂઆત'],
  ['ch0a', 'દિવસ 1', 'લેખનો કયો વિચાર code માં ક્યાં છે?', 'શરૂઆત'],
  ['ch1', 'દિવસ 2', 'ચિઠ્ઠી, પાનું, પરવાનો, જોબ-કાર્ડ: કોણ શું છે?', 'શરૂઆત'],
  ['ch2', 'દિવસ 3', 'ડેસ્ક કેવી રીતે ગોઠવાય અને ચાલુ રહે?', 'શરૂઆત'],
  ['ch3', 'દિવસ 4', 'સવારે ઘર કયા ક્રમમાં ખૂલે?', 'મધ્યમ'],
  ['ch4', 'દિવસ 5', 'ચિઠ્ઠી ડેસ્ક સુધી કેવી રીતે પહોંચે, બે વાર કેમ નહીં?', 'મધ્યમ'],
  ['ch5', 'દિવસ 6', 'કોણ કામ માગી શકે, અને કોણ નક્કી કરે?', 'મધ્યમ'],
  ['ch6', 'દિવસ 7', 'ઓર્ડર રદ, ફરી, કે પૂરો ક્યારે થાય?', 'મધ્યમ'],
  ['ch7', 'દિવસ 8', 'ટુકડી કેવી રીતે શરૂ થાય, અને લાઈટ જાય તો?', 'ઊંડું'],
  ['ch8', 'દિવસ 9', 'કશું ખોવાય નહીં અને બે વાર ન જાય: કેવી રીતે?', 'ઊંડું'],
  ['ch9', 'દિવસ 10', 'Model ના હાથમાં કયાં ઓજાર, અને કોની સૂચના?', 'ઊંડું'],
  ['ch10', 'દિવસ 11', 'એક click ચૂલા સુધી કેવી રીતે પહોંચે?', 'ઊંડું'],
  ['ch11', 'દિવસ 12', 'તૂટે ત્યારે પહેલાં ક્યાં જોવું?', 'Advanced'],
  ['ch12', 'દિવસ 13', 'કયો ફેરફાર કયા માળનો છે?', 'Advanced'],
  ['ch13', 'દિવસ 14', 'ઘર આવું જ કેમ બંધાયું?', 'Advanced'],
  ['ch14', 'દિવસ 15', 'હું આખું જાતે સાબિત કરી શકું?', 'Advanced'],
  ['ch15', 'પછી', 'થાળીથી આગળ: હિસાબ, સહી, ઘણા વિભાગ?', 'સૂચિત'],
]

// Katoris around the thali: [Gujarati name, super-agent part, chapter, tone]
const KATORIS = [
  ['સવિતાબેન', 'main Session', 'ch9', 'haldi'],
  ['ગોવિંદકાકા', 'gate', 'ch5', 'chili'],
  ['છોટુ', 'Source', 'ch4', 'leaf'],
  ['જશુભાઈ', 'Executor', 'ch7', 'kesar'],
  ['પાકો ચોપડો', 'Store', 'ch8', 'ink'],
  ['ખીંટી', 'Effects', 'ch8', 'sky'],
  ['પાટિયું', 'panel', 'ch10', 'haldi'],
]

const SECTION_ICONS = { '🎬': 'haldi', '🎯': 'ink', '🗺️': 'sky', '🧪': 'leaf', '🔮': 'kesar', '🩺': 'chili', '✅': 'ink', '🧠': 'kesar' }
const STEPS = [['🎬', 'story'], ['❓', 'ask'], ['💻', 'code'], ['🔬', 'expert']]
const CALLOUTS = [['📦', 'term'], ['🍽️', 'dish'], ['⚠️', 'warn'], ['💡', 'tip'], ['🧭', 'tip'], ['📝', 'tip']]

const meta = new Map(VIEWS.map(([file, view, title, eyebrow, chip, tone]) => [view, { file, view, title, eyebrow, chip, tone }]))
const viewOf = new Map(VIEWS.map(([file, id]) => [file, id]))
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const anchorId = (view, a) => `${view}-${a.replace(/[^A-Za-z0-9-]/g, '-')}`

function rewriteHref(href, file, view) {
  if (/^(https?:|mailto:)/.test(href)) return { href, external: true }
  const [path, anchor] = href.split('#')
  if (!path) return { href: '#' + (anchor ? anchorId(view, anchor) : view) }
  const target = normalize(relative(ROOT, join(ROOT, dirname(file), path))).replace(/\\/g, '/')
  const tv = viewOf.get(target)
  if (tv) return { href: '#' + (anchor ? anchorId(tv, anchor) : tv) }
  return { href: REPO + target + (anchor ? '#' + anchor : ''), external: true }
}

function calloutType(html) {
  const text = html.replace(/^\s*(<[^>]+>\s*)*/, '')
  for (const [mark, type] of CALLOUTS) if (text.startsWith(mark)) return type
  if (/^\s*<p>\s*<strong>(Level|Verification|Data notice|આ વિભાગ)/.test(html)) return 'level'
  return null
}

function styleBlockquotes(html) {
  return html.replace(/<blockquote>([^]*?)<\/blockquote>/g, (_m, inner) => {
    const first = calloutType(inner)
    let seen = false
    const body = inner.replace(/<p>([^]*?)<\/p>/g, (pm, pin) => {
      const type = calloutType('<p>' + pin)
      if (!seen) { seen = true; return pm }
      return type && type !== first && type !== 'level' ? `<p class="co-inner co-${type}">${pin}</p>` : pm
    })
    return first ? `<blockquote class="co co-${first}">${body}</blockquote>` : `<blockquote>${body}</blockquote>`
  })
}

function styleSteps(html) {
  return html.replace(/<p>(🎬|❓|💻|🔬)/g, (_m, mark) => `<p class="step step-${STEPS.find(([k]) => k === mark)[1]}">${mark}`)
}

function wrapSegments(html) {
  return html.split(/(?=<h3 )/).map(seg => {
    const m = seg.match(/^<h3 [^>]*data-seg="(story|recap)"/)
    if (!m) return seg
    // keep a trailing anchor (e.g. the next section's saral-samaj) outside the panel
    const tail = seg.match(/(<span class="anchor"[^>]*><\/span>\s*)$/)
    const inner = tail ? seg.slice(0, -tail[1].length) : seg
    return `<div class="seg seg-${m[1]}">\n${inner}</div>\n${tail ? tail[1] : ''}`
  }).join('')
}

const sections = []
const toc = []
for (const [file, view] of VIEWS) {
  const v = meta.get(view)
  let h = 0
  const heads = []
  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        let text = this.parser.parseInline(tokens)
        const id = `${view}-h${++h}`
        if (depth === 1) {
          const title = view === 'top' ? 'આ પુસ્તક વિશે' : text
          return `<h2 class="chapter-title" id="${id}"><span class="chapter-head"><span class="num">${esc(v.chip)}</span><span class="eyebrow">${esc(v.eyebrow)}</span></span>${title}</h2>\n`
        }
        if (depth === 2) heads.push({ id, text: text.replace(/<[^>]+>/g, '') }) // already HTML-escaped by marked
        const level = Math.min(depth + 1, 6)
        if (depth === 2) {
          const icon = Object.keys(SECTION_ICONS).find(k => text.startsWith(k))
          if (icon) {
            const seg = icon === '🎬' ? ' data-seg="story"' : icon === '✅' ? ' data-seg="recap"' : ''
            text = `<span class="hi">${icon}</span><span>${text.slice(icon.length).trim()}</span>`
            return `<h3 id="${id}" class="t-${SECTION_ICONS[icon]}"${seg}>${text}</h3>\n`
          }
        }
        return `<h${level} id="${id}">${text}</h${level}>\n`
      },
      link({ href, title: t, tokens }) {
        const r = rewriteHref(href, file, view)
        const inner = this.parser.parseInline(tokens)
        return `<a href="${esc(r.href)}"${t ? ` title="${esc(t)}"` : ''}${r.external ? ' rel="noopener"' : ''}>${inner}</a>`
      },
      code({ text, lang }) {
        if (lang === 'mermaid') return `<pre class="mermaid">${esc(text)}</pre>\n`
        const label = lang || 'text'
        const copy = /^(bash|sh|shell)$/.test(label) ? '<button type="button" class="copy">copy</button>' : ''
        return `<div class="code"><div class="code-bar"><span class="dots"><i></i><i></i><i></i></span><span>${esc(label)}</span>${copy}</div><pre><code data-lang="${esc(label)}">${esc(text)}</code></pre></div>\n`
      },
    },
  })
  let md = readFileSync(join(ROOT, file), 'utf8')
  md = md.replace(/<!-- citations:begin[^]*?<!-- citations:end -->/, m => m.replace(/<!--[^]*?-->/g, ''))
  let html = await marked.parse(md)
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
  html = html.replace(/<a id="([^"]+)"><\/a>/g, (_m, a) => `<span class="anchor" id="${anchorId(view, a)}"></span>`)
  html = styleBlockquotes(html)
  html = styleSteps(html)
  html = wrapSegments(html)
  sections.push(`<section class="part t-${v.tone}" id="${view}" aria-labelledby="${view}-h1">\n${html}</section>`)
  toc.push({ ...v, heads })
}

const navItem = t => `<li><a href="#${t.view}" data-view="${t.view}" class="t-${t.tone}"><span class="num">${esc(t.chip)}</span><span class="nav-text"><span class="nav-eyebrow">${esc(t.eyebrow)}</span><span class="nav-title">${esc(t.title)}</span></span></a>${
  t.heads.length && (t.view.startsWith('ch') || t.view === 'overview') ? `<ol class="sub">${t.heads.map(x => `<li><a href="#${x.id}">${x.text}</a></li>`).join('')}</ol>` : ''}</li>`
const groups = [
  ['પ્રકરણો', toc.filter(t => t.view === 'top' || t.view === 'overview' || t.view.startsWith('ch'))],
  ['પરિશિષ્ટ', toc.filter(t => t.view.startsWith('appendix') || t.view === 'citations' || t.view === 'labs')],
]
const nav = groups.map(([label, items]) => `<p class="nav-group">${label}</p><ol class="nav-list">${items.map(navItem).join('')}</ol>`).join('')

const katoris = KATORIS.map(([gu, en, ch, tone], i) =>
  `<a class="katori t-${tone}" style="--a: ${(360 / KATORIS.length * i).toFixed(2)}deg" href="#${ch}" aria-label="${esc(gu)} = ${esc(en)} (${esc(meta.get(ch).title)})"><b>${esc(gu)}</b><span>${esc(en)}</span></a>`).join('\n      ')
const cards = CARDS.map(([view, day, q, level]) => {
  const v = meta.get(view)
  return `<li><a class="card t-${v.tone}" href="#${view}"><span class="card-top"><span class="num">${esc(v.chip)}</span><span class="card-day">${esc(day)}</span></span><span class="card-title">${esc(v.title)}</span><span class="card-q">${esc(q)}</span><span class="card-level">${esc(level)}</span></a></li>`
}).join('\n    ')
const cover = `<header class="cover" aria-labelledby="cover-title">
  <div>
    <p class="cover-eyebrow">ગુજરાતી પુસ્તક · dsh-superagent-prototype · pinned 8c32a9d</p>
    <h1 id="cover-title">Super Agent: શરૂઆતથી <em>Advanced Developer</em> સુધી</h1>
    <p class="cover-lede">એક થાળી ભોજનાલયના ઓર્ડર-ડેસ્કની વાર્તામાં એક autonomous agent system ખોલો: source વાંચીને, tests ચલાવીને, તોડીને અને સુધારીને. DSH, model key કે GitHub account વગર.</p>
    <ul class="chips">
      <li class="t-leaf">15 દિવસ</li><li class="t-haldi">17 પ્રકરણ</li><li class="t-kesar">95 દૃશ્યો</li><li class="t-sky">254 pinned સંદર્ભ</li>
    </ul>
    <div class="cta">
      <a class="btn primary" href="#overview">સમગ્ર નકશાથી શરૂ કરો →</a>
      <a class="btn" href="#ch0">પ્રકરણ 0</a>
      <a class="btn" href="${REPO_URL}" rel="noopener">GitHub</a>
    </div>
  </div>
  <div class="thali-wrap">
    <div class="thali" role="group" aria-label="થાળી: દરેક વાટકી super agent નો એક ભાગ">
      <div class="thali-center">ઓર્ડર-ડેસ્ક<small>super agent</small></div>
      ${katoris}
    </div>
    <p class="thali-caption">દરેક વાટકી system નો એક ભાગ. વાટકી પર click કરો.</p>
  </div>
</header>
<section class="path" aria-labelledby="path-title">
  <h2 id="path-title">15 દિવસ, 17 પગથિયાં</h2>
  <p>દરેક પ્રકરણ એક સવાલનો જવાબ આપે છે. રંગ મુશ્કેલી બતાવે છે: લીલો શરૂઆત, હળદર મધ્યમ, કેસર ઊંડું, મરચું advanced.</p>
  <ol class="cards">
    ${cards}
  </ol>
</section>`

const template = readFileSync(join(ROOT, 'tools', 'artifact-template.html'), 'utf8')
const out = template.replace('<!--NAV-->', nav).replace('<!--COVER-->', cover).replace('<!--BODY-->', sections.join('\n'))
writeFileSync(outPath, out)
console.log(`build-artifact: ${sections.length} parts, ${(out.length / 1024).toFixed(0)} KB -> ${outPath}`)
