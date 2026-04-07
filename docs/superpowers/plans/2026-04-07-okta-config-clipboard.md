# Okta Config Clipboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chrome side panel extension that extracts Okta admin console config values and copies them as JSON for the O4AA demo app.

**Architecture:** Manifest V3 Chrome extension with side panel (main UI), popup (quick copy), content script (DOM extraction on *.okta.com), and service worker (message relay + session storage). Companion "Paste Config" button in the demo app's ConfigForm.

**Tech Stack:** TypeScript, esbuild, Chrome Extensions API (Side Panel, Storage Session, Content Scripts), vanilla DOM.

---

## File Map

### New files (extension)

| File | Responsibility |
|------|---------------|
| `apps/config-clipboard/package.json` | Package metadata + build script |
| `apps/config-clipboard/tsconfig.json` | TypeScript config |
| `apps/config-clipboard/build.ts` | esbuild build script — compiles TS + copies static assets to dist/ |
| `apps/config-clipboard/manifest.json` | Manifest V3 config |
| `apps/config-clipboard/lib/config-types.ts` | `DemoConfig` interface + field definitions + `CONFIG_KEYS` |
| `apps/config-clipboard/lib/messages.ts` | Message type definitions for chrome.runtime |
| `apps/config-clipboard/lib/derivation.ts` | Derive 8 URL fields from hostname + auth server ID |
| `apps/config-clipboard/lib/page-detectors.ts` | URL pattern matching + DOM extraction per page type |
| `apps/config-clipboard/lib/storage.ts` | Read/write/clear chrome.storage.session wrapper |
| `apps/config-clipboard/background.ts` | Service worker — message relay, derivation trigger, storage merge |
| `apps/config-clipboard/content.ts` | Content script — page detection, extraction, selection capture |
| `apps/config-clipboard/sidepanel.html` | Side panel HTML shell |
| `apps/config-clipboard/sidepanel.css` | Side panel styles (OKLCH tokens) |
| `apps/config-clipboard/sidepanel.ts` | Side panel logic — render fields, capture, copy JSON |
| `apps/config-clipboard/popup.html` | Popup HTML shell |
| `apps/config-clipboard/popup.css` | Popup styles |
| `apps/config-clipboard/popup.ts` | Popup logic — progress ring, copy JSON, open panel |
| `apps/config-clipboard/icons/` | Extension icons (16, 48, 128px) |

### Modified files (demo app)

| File | Change |
|------|--------|
| `apps/demo/components/ConfigForm.tsx` | Add "Paste Config" button that reads clipboard JSON and fills all fields |

---

## Task 1: Project Scaffolding + Build

**Files:**
- Create: `apps/config-clipboard/package.json`
- Create: `apps/config-clipboard/tsconfig.json`
- Create: `apps/config-clipboard/build.ts`
- Create: `apps/config-clipboard/manifest.json`
- Create: `apps/config-clipboard/icons/` (placeholder PNGs)

- [ ] Create package.json with esbuild + @types/chrome + tsx as devDependencies. Scripts: `build` runs `tsx build.ts`, `watch` runs `tsx build.ts --watch`.
- [ ] Create tsconfig.json targeting ES2022 with strict mode, bundler moduleResolution, DOM lib.
- [ ] Create build.ts — uses esbuild to bundle 4 entry points (background, content, sidepanel, popup) to dist/, copies static files (manifest, HTML, CSS, icons) to dist/.
- [ ] Create manifest.json — Manifest V3 with permissions: activeTab, sidePanel, storage. Host permissions: `*.okta.com`, `*.oktapreview.com`. Content script matches same hosts, runs at document_idle. Background service worker with type: module.
- [ ] Generate placeholder icon PNGs (16, 48, 128px solid navy squares).
- [ ] Create minimal stub .ts files for each entry point so esbuild can compile.
- [ ] Run `pnpm install` then `pnpm build`, verify dist/ output contains all expected files.
- [ ] Commit: `feat(config-clipboard): scaffold Chrome extension project`

---

## Task 2: Shared Types + Derivation Logic

**Files:**
- Create: `apps/config-clipboard/lib/config-types.ts`
- Create: `apps/config-clipboard/lib/messages.ts`
- Create: `apps/config-clipboard/lib/derivation.ts`
- Create: `apps/config-clipboard/lib/storage.ts`

- [ ] Create config-types.ts — `DemoConfig` interface (mirrors demo app's), `ConfigKey` type, `CONFIG_KEYS` array, `FieldSource` type (`auto | derived | manual | pending`), `FieldState` interface (`{ value, source }`), `ConfigState` type, `EMPTY_STATE` constant, `ConfigGroup` interface + `CONFIG_GROUPS` array matching the 4 groups.
- [ ] Create messages.ts — typed discriminated union for all chrome.runtime messages: `VALUES_DETECTED`, `CAPTURE_SELECTION_REQUEST`, `CAPTURE_SELECTION_RESPONSE`, `STATE_UPDATED`, `CLEAR_STATE`.
- [ ] Create derivation.ts — `deriveFields(hostname, authServerId)` returns 8 computed URL fields. `extractHostname(url)` pulls hostname from Okta URL. `extractAuthServerId(url)` uses regex to find `aus...` ID from admin URL path.
- [ ] Create storage.ts — wrappers around chrome.storage.session: `getState()`, `mergeValues(values, source)`, `setField(key, value, source)`, `clearState()`, `getHostname()`, `setHostname()`, `getAuthServerId()`, `setAuthServerId()`, `countFilled(state)`, `buildDemoConfig(state)`.
- [ ] Run `npx tsc --noEmit` — verify zero type errors.
- [ ] Commit: `feat(config-clipboard): add shared types, derivation, storage, messages`

---

## Task 3: Page Detectors + Content Script

**Files:**
- Create: `apps/config-clipboard/lib/page-detectors.ts`
- Replace: `apps/config-clipboard/content.ts`

- [ ] Create page-detectors.ts — `detectPageType(url)` returns `oidc-app | workload-principal | auth-server | unknown`. `extractFromPage(pageType)` reads DOM for Client ID (data-se attribute or regex for `0oa...` pattern) and Agent Client ID (URL path `wlp_...` pattern or DOM content match).
- [ ] Write content.ts — on page load, runs `scan()` which: extracts hostname, extracts auth server ID from URL, detects page type, extracts DOM values, sends all via `chrome.runtime.sendMessage`. Installs MutationObserver on `document.body` to re-scan on SPA navigation (Okta admin is a SPA — URL changes without full page reload). Listens for `CAPTURE_SELECTION_REQUEST` messages and responds with `window.getSelection().toString()`.
- [ ] Build and verify `dist/content.js` bundles correctly.
- [ ] Commit: `feat(config-clipboard): add page detection + content script`

---

## Task 4: Service Worker (Background Script)

**Files:**
- Replace: `apps/config-clipboard/background.ts`

- [ ] Write background.ts — listens for messages from content script and side panel. On `VALUES_DETECTED`: stores hostname/authServerId, merges values into session storage, runs derivation if both hostname and authServerId are known, broadcasts `STATE_UPDATED`. On `CAPTURE_SELECTION_REQUEST`: forwards to active tab's content script, relays response back. On `CLEAR_STATE`: clears session storage, broadcasts `STATE_UPDATED`. Sets `sidePanel.setPanelBehavior({ openPanelOnActionClick: false })` so the popup still works.
- [ ] Build and verify.
- [ ] Commit: `feat(config-clipboard): add service worker with derivation + message relay`

---

## Task 5: Side Panel UI

**Files:**
- Create: `apps/config-clipboard/sidepanel.html`
- Create: `apps/config-clipboard/sidepanel.css`
- Replace: `apps/config-clipboard/sidepanel.ts`

- [ ] Create sidepanel.html — minimal shell with header (title + counter), main area (`#groups`), capture bar (dropdown + capture button), footer (Copy JSON + Clear All + status text).
- [ ] Create sidepanel.css — OKLCH token variables matching demo app palette. Styles for: header (primary bg, sticky), group sections (collapsible, border, rounded), field rows (indicator circle + label + mono value), capture bar (amber bg), footer (sticky bottom, primary button + secondary button), toast notification.
- [ ] Write sidepanel.ts — `render(state)` builds the full UI from ConfigState using safe DOM methods (createElement, textContent — no innerHTML with user data). Each field row has: colored indicator (green=auto, blue=derived, amber=manual, gray=pending), label, truncated value (click to edit inline via input element). Groups auto-collapse when all fields filled. Capture bar shows dropdown of empty fields. Copy button writes `JSON.stringify(buildDemoConfig(state), null, 2)` to clipboard. Listens for `STATE_UPDATED` messages to re-render.
- [ ] Build and verify.
- [ ] Commit: `feat(config-clipboard): add side panel UI with field checklist`

---

## Task 6: Popup UI

**Files:**
- Create: `apps/config-clipboard/popup.html`
- Create: `apps/config-clipboard/popup.css`
- Replace: `apps/config-clipboard/popup.ts`

- [ ] Create popup.html — 240px wide. SVG progress ring (circle with stroke-dashoffset animation), title, missing fields list, Copy JSON button, Open Panel link.
- [ ] Create popup.css — minimal styles, same OKLCH tokens.
- [ ] Write popup.ts — reads state on open, calculates stroke-dashoffset from filled/total ratio, lists missing field labels using textContent (not innerHTML), Copy JSON writes to clipboard with "Copied!" feedback, Open Panel calls `chrome.sidePanel.open()` then `window.close()`.
- [ ] Build and verify.
- [ ] Commit: `feat(config-clipboard): add popup with progress ring + copy button`

---

## Task 7: Final Build + Load Test

- [ ] Update build.ts to copy all static files (manifest, HTML, CSS, icons) to dist/.
- [ ] Full build: `pnpm build`, verify dist/ has all 10+ files.
- [ ] Load in Chrome: `chrome://extensions` → Developer mode → Load unpacked → `dist/`.
- [ ] Verify: extension appears, popup opens with 0/13, side panel opens.
- [ ] Commit: `feat(config-clipboard): finalize build with static asset copy`

---

## Task 8: Demo App — Paste Config Button

**Files:**
- Modify: `apps/demo/components/ConfigForm.tsx`

- [ ] Add `pasteError` and `pasteSuccess` state variables.
- [ ] Add `handlePaste()` function: reads clipboard via `navigator.clipboard.readText()`, parses JSON, validates it has `clientId`, merges all matching keys into config state, shows success/error feedback.
- [ ] Add "Paste Config JSON" button above the form (before CONFIG_FIELDS.map) with a separator border. Show success banner (green) or error banner (red) after paste attempt.
- [ ] Build demo app: `pnpm --filter o4aa-demo build` — verify clean build.
- [ ] Commit: `feat(demo): add Paste Config JSON button to settings form`

---

## Task 9: End-to-End Manual Test

- [ ] Build extension (`pnpm build` in config-clipboard).
- [ ] Load in Chrome, navigate to Okta admin OIDC app page. Verify Client ID auto-populates in side panel.
- [ ] Navigate to Custom Auth Server page. Verify JAG + Resource fields auto-derive (6 fields turn blue).
- [ ] Highlight Client Secret on page, use Capture Selection. Verify field turns amber.
- [ ] Click "Copy Config JSON" in side panel.
- [ ] Open demo app `/settings`, click "Paste Config JSON". Verify all fields populate.
- [ ] Test popup: verify progress ring, missing list, copy button.
- [ ] Test "Clear All" — verify all fields reset.
- [ ] Final commit: `feat(config-clipboard): complete Chrome extension for O4AA demo config`
