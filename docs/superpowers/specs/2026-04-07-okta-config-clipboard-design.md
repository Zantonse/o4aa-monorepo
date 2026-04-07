# Okta Config Clipboard — Chrome Extension Design

**Date:** 2026-04-07
**Status:** Approved
**Target:** Chrome extension (Manifest V3) for the O4AA demo app

---

## Problem

Setting up the O4AA demo requires copying 13 config values from 3 different Okta admin console pages into the demo app's settings form. This is the most error-prone part of every demo — SEs mistype Client IDs, forget to copy the full JWK, mix up the JAG Issuer with the Resource Endpoint, or fat-finger the auth server ID in a URL. A 2-minute config step regularly takes 10+ minutes and sometimes fails entirely.

## Solution

A Chrome side panel extension that:
1. Detects which Okta admin page you're on
2. Auto-extracts values it can reliably read (Client ID, Server ID, org URL)
3. Derives 6 URL fields from the org hostname + auth server ID
4. Provides manual "Capture Selection" for values that need user interaction (Secret, JWK, Key ID)
5. Copies a complete `DemoConfig` JSON object to clipboard with one click

A companion "Paste JSON" button in the demo app's ConfigForm completes the loop.

---

## Architecture

### Extension Components

| Component | File | Role |
|-----------|------|------|
| Side Panel | `sidepanel.html` + `sidepanel.ts` | Main UI — 13-field checklist grouped in 4 sections. Always visible alongside Okta admin console. |
| Popup | `popup.html` + `popup.ts` | Compact view — circular progress ring, "Copy JSON" button, "Open Panel" link. |
| Content Script | `content.ts` | Runs on `*.okta.com` admin pages. Detects page type, auto-extracts values, responds to capture requests. |
| Service Worker | `background.ts` | Message relay between content script and side panel. Manages `chrome.storage.session`. Opens side panel on icon click. |

### Manifest V3 Permissions

```json
{
  "manifest_version": 3,
  "name": "O4AA Config Clipboard",
  "version": "1.0.0",
  "description": "Extract Okta config values for the O4AA JAG demo",
  "permissions": [
    "activeTab",
    "sidePanel",
    "storage",
    "clipboardWrite"
  ],
  "host_permissions": [
    "https://*.okta.com/*",
    "https://*.oktapreview.com/*"
  ],
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["https://*.okta.com/*", "https://*.oktapreview.com/*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

---

## Page Detection & Auto-Extraction

The content script detects the Okta admin page type by URL pattern and extracts available values.

### URL Patterns

| Page Type | URL Pattern | Fields Extractable |
|-----------|------------|-------------------|
| OIDC App (General tab) | `/admin/app/oidc_client/instance/*/settings/general` | `clientId` from DOM |
| OIDC App (any tab) | `/admin/app/oidc_client/instance/*` | `clientId` from DOM |
| Workload Principal | `/admin/people/workload/*` | `agentClientId` from URL or page |
| Custom Auth Server | `/admin/oauth2/as/*` | Auth server ID from URL |

### Derivation Logic

Once the extension knows the Okta org hostname and the Custom Auth Server ID, it computes 8 fields:

```typescript
function deriveFields(hostname: string, authServerId: string): Partial<DemoConfig> {
  return {
    oktaIssuer:            `https://${hostname}`,
    redirectUri:           'https://o4aa-demo.vercel.app/api/auth/callback',
    jagIssuer:             `https://${hostname}/oauth2`,
    jagAudience:           `https://${hostname}/oauth2/v1/token`,
    jagTargetAudience:     `https://${hostname}/oauth2/${authServerId}`,
    jagScope:              'ai_agent',
    resourceAudience:      `https://${hostname}/oauth2/${authServerId}/v1/token`,
    resourceTokenEndpoint: `https://${hostname}/oauth2/${authServerId}/v1/token`,
  };
}
```

### Manual Capture Fields

These fields cannot be reliably auto-extracted:

| Field | Why Manual |
|-------|-----------|
| `clientSecret` | Hidden behind "Edit" button, masked in DOM |
| `agentPrivateKeyJwk` | Downloaded as a file, not in the DOM |
| `agentKeyId` | May require expanding a credentials section |
| `jagScope` | Defaults to `ai_agent` — manual only if non-default |

The side panel provides a "Capture Selection" button. The SE highlights text on the page, clicks Capture, and picks which field to assign it to from a dropdown.

Implementation: side panel sends a message to the content script, content script reads `window.getSelection().toString()`, returns it to the side panel.

---

## Side Panel UI

Width: 320px (Chrome side panel default).

### Layout

```
┌──────────────────────────────────┐
│  O4AA Config             [8/13] │
│  Clipboard                       │
├──────────────────────────────────┤
│                                  │
│  ▼ OIDC Client            3/4   │
│  ┌────────────────────────────┐  │
│  │ ✓ Client ID    0oaABC...  │  │
│  │ ✗ Client Secret [Capture] │  │
│  │ ✓ Okta Issuer  dev-12...  │  │
│  │ ✓ Redirect URI (auto)     │  │
│  └────────────────────────────┘  │
│                                  │
│  ▼ AI Agent               0/3   │
│  ┌────────────────────────────┐  │
│  │ ✗ Agent Client ID [Capt]  │  │
│  │ ✗ Private Key JWK [Capt]  │  │
│  │ ✗ Agent Key ID    [Capt]  │  │
│  └────────────────────────────┘  │
│                                  │
│  ▶ JAG Token Exchange     4/4   │
│  (collapsed — all derived)       │
│                                  │
│  ▶ Resource Server        2/2   │
│  (collapsed — all derived)       │
│                                  │
├──────────────────────────────────┤
│  [  Copy Config JSON  ]         │
│  [  Clear All  ]                │
│  Ready to copy (8/13 fields)    │
└──────────────────────────────────┘
```

### Field States

| State | Indicator | Source |
|-------|-----------|--------|
| Auto-extracted | Green circle + check | Content script detected it |
| Derived | Blue circle + check | Computed from other values |
| Manually captured | Amber circle + check | User used Capture Selection |
| Pending | Gray circle + X | Not yet collected |
| Editable | Click any value to edit inline | All collected values |

### Interaction Details

- **Sections** collapse/expand on click. Sections with all fields collected default to collapsed.
- **Capture Selection flow:** User highlights text on Okta page → clicks `[Capture]` next to the target field → content script reads selection → value populates → field turns amber check.
- **Copy Config JSON:** Builds a `DemoConfig` object, writes to clipboard as formatted JSON. If fields are missing, the button is still enabled but the JSON includes empty strings for missing fields and shows a warning toast.
- **Clear All:** Resets `chrome.storage.session` and all fields.

### Styling

Inline CSS using the same OKLCH design tokens as the demo app. No Tailwind build step — a small hand-written stylesheet.

```css
:root {
  --color-primary: oklch(0.35 0.16 260);
  --color-success: oklch(0.38 0.12 160);
  --color-warn:    oklch(0.40 0.12 55);
  --color-text:    oklch(0.13 0.02 260);
  --color-muted:   oklch(0.58 0.02 260);
  --color-border:  oklch(0.90 0.01 260);
  --color-surface: oklch(1.0 0 0);
  --color-canvas:  oklch(0.975 0.004 260);
  --radius:        0.5rem;
  --font:          -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## Popup UI

Compact popup (240px wide) for quick access without opening the side panel.

```
┌──────────────────────┐
│   ┌───┐              │
│   │8  │  O4AA Config │
│   │/13│  Clipboard   │
│   └───┘              │
│                      │
│  Missing:            │
│  • Client Secret     │
│  • Agent Client ID   │
│  • Private Key JWK   │
│  • Agent Key ID      │
│  • JAG Scope         │
│                      │
│  [ Copy JSON ]       │
│  [ Open Panel ]      │
└──────────────────────┘
```

- Circular progress ring (SVG) showing collected / total
- List of missing fields (if any)
- "Copy JSON" button — same behavior as side panel
- "Open Panel" — calls `chrome.sidePanel.open()`

---

## Data Flow

```
[Okta Admin Page]
    │
    ├─ Content script detects page type on load + URL changes (SPA navigation)
    │  Uses MutationObserver for SPA route changes within Okta admin
    │
    ├─ Auto-extracts: { type: 'VALUES_DETECTED', values: { clientId: '0oa...' } }
    │
    ▼
[Service Worker (background.ts)]
    │
    ├─ Receives message from content script
    ├─ Merges new values into chrome.storage.session (non-destructive merge)
    ├─ Runs derivation logic if hostname + authServerId are both known
    ├─ Sends update notification to side panel + popup
    │
    ▼
[Side Panel / Popup]
    │
    ├─ On open: reads chrome.storage.session, renders current state
    ├─ Listens for runtime messages to update in real-time
    │
    ├─ "Capture Selection" flow:
    │   Side panel → background → content script (getSelection)
    │   Content script → background → side panel (selected text)
    │
    ├─ "Copy JSON":
    │   Reads all values from storage.session
    │   Builds DemoConfig JSON object
    │   navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    │
    └─ "Clear All":
        chrome.storage.session.clear()
        Reset UI
```

---

## Demo App Change: Paste Config JSON

One addition to `apps/demo/components/ConfigForm.tsx`:

A "Paste Config" button above the form that:
1. Reads clipboard via `navigator.clipboard.readText()`
2. Parses as JSON
3. Validates against `DemoConfig` keys
4. Fills all matching fields
5. Shows success/error feedback

This completes the extension → demo app workflow:
1. SE navigates Okta admin console tabs with extension open
2. Extension auto-collects 8-9 values, SE captures 3-4 manually
3. SE clicks "Copy JSON" in extension
4. SE switches to demo app `/settings`, clicks "Paste Config"
5. All 13 fields populated. Click "Save." Done.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Language | TypeScript |
| Build | esbuild (4-line build script, no bundler config) |
| UI framework | None — vanilla DOM. The UI is ~15 elements. |
| Styling | Inline CSS with OKLCH variables |
| State | `chrome.storage.session` |
| Target | Chrome 114+ (Side Panel API) |

### Project Structure

```
apps/config-clipboard/
├── manifest.json
├── background.ts
├── content.ts
├── sidepanel.html
├── sidepanel.ts
├── sidepanel.css
├── popup.html
├── popup.ts
├── popup.css
├── lib/
│   ├── config-types.ts      # DemoConfig interface (shared with demo app)
│   ├── page-detectors.ts    # URL pattern matching + DOM extraction
│   ├── derivation.ts        # Compute derived fields from hostname + server ID
│   └── messages.ts          # Message type definitions
├── icons/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── build.ts                  # esbuild build script
├── package.json
└── tsconfig.json
```

---

## Scope Boundaries

### In Scope
- Chrome Manifest V3 side panel + popup extension
- Content script for `*.okta.com` and `*.oktapreview.com`
- Auto-extraction of Client ID, Agent Client ID, Auth Server ID, org hostname
- Derivation of 6 URL-pattern fields from hostname + server ID
- Manual "Capture Selection" for Secret, JWK, Key ID, Scope
- Copy full `DemoConfig` JSON to clipboard
- Session-only persistence (`chrome.storage.session`)
- "Paste Config" button added to demo app's ConfigForm
- Sideloaded installation (not published to Chrome Web Store)

### Out of Scope
- Firefox / Safari support
- Auto-filling the demo form directly (just clipboard)
- Chrome Web Store publishing
- Auth server scope discovery
- Storing multiple configs (one session at a time)
- Any network requests (extension is purely local DOM reading + clipboard)
