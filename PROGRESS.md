# PROGRESS

## Pinned source
- Repository: deepseek-ai/dsh-superagent-prototype @ 8c32a9dc5d72c033816c6a8110b37f40cf94fba4 (2026-10-31)
- Inspection date: 2026-11-05 · Linux · Node v22.23.4 · pnpm 11.7.0 · git 2.43.0 · tmux 3.4 · Python 3.13 · gh 2.89.0 · DSH not installed

## Completed chapters
- [x] README / linked TOC
- [x] 00 Foundation · 00A Super-agent article mapping (article text supplied by the user, machine translation of the X article)
- [x] 01 Domain model · 02 Setup & operation · 03 Startup
- [x] 04 Sources & intake · 05 Policy & evaluation · 06 Tickets & Assignments · 07 Worker execution
- [x] 08 Store, Effects & Outbox · 09 Tools, prompts & skills · 10 Panel
- [x] 11 Debugging · 12 Customization · 13 Advanced engineering · 14 Final project
- [x] Appendices A coverage map · B symbol index · C glossary · D rubric · E solutions · F verification report

## Inspected sources
See appendices/A-coverage-map.md (depth per file group). Fully walked through: src/index.ts, src/core/{model,ports,part,engine,intake,evals,tickets,assignments,replies,stage}.ts,
src/policy.ts, src/app/{runtime,passes,effects,store,outbox,http}.ts, src/executor/dsh.ts, src/sources/{github,github-trigger,github-pull,registry,kind}.ts,
src/app/tools/{main,executor}.ts, cordis.patch.yml, docs/000–008.

## Verification results
See appendices/F-verification-report.md. Summary: first `pnpm check` green (1197/1197); later runs show one upstream flaky test
(feishu consumer stdout/stderr race), fixed by a one-word test change (5/5). All book examples pass on the pinned commit; all patches
together pass `pnpm check` (61 files, 1199 tests, build).

## Unresolved issues
- Live lab (DSH + GitHub + model) not run: chapters 2 and 14-B are documentation-based and labelled [ધારણા].
- Windows/WSL2 not verified.
- Low-depth areas: feishu-read/image, github-read CI snapshots, most client pages, migration internals, service script internals.

## Exact next task
Run the live lab (chapter 14 part B) on a machine with DSH 0.2.1-rc.3, a model provider and a test GitHub organization;
replace [ધારણા] labels in chapters 2 and 14 with observed results; then deepen chapter 4 (Feishu read/image) and chapter 10 (other pages).
