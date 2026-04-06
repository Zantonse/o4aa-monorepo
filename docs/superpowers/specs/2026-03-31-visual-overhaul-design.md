# Visual Overhaul — Design Spec

**Date:** 2026-03-31
**Feature:** Full visual redesign of the O4AA Discovery app + reusable architecture diagrams + custom icon/illustration set
**Approach:** Experience Redesign (Approach B from brainstorm)

---

## Problem

The discovery app is functional but visually flat — text-heavy cards with no visual differentiation, no custom assets, no data visualization, and no reusable diagrams SEs can use in demos or customer decks. It looks like a data tool, not a product.

## Solution

Four workstreams that transform the app from a data reference into an interactive intelligence platform:

1. **New landing page** — mission-control entry point replacing the current Question Bank homepage
2. **Insights page redesign** — industry-colored detail views, horizontal bar charts, visual deal timeline
3. **Architecture diagrams page** — new `/diagrams` route with 4 interactive diagrams
4. **Custom asset generation** — 20 Gemini-generated icons and illustrations via `/nano-banana-art`

---

## Section 1: New Landing Page

### Route: `/` (replaces current Question Bank homepage)

**Title:** "AI Agent Discovery Toolkit"
**Subtitle:** "Pain points, stakeholders, discovery questions, and talk tracks — grounded in 306 real customer conversations across 9 industries."

### Layout

#### Hero Section
- Page title and subtitle centered
- Industry + Use Case dropdown selector (same pattern as current Insights page)
- "Go" button navigates directly to Insights cheat sheet for the selected archetype
- Subtitle references transcript count as credibility anchor

#### Feature Cards (3-column grid)
- **Question Bank** — "CoTM framework questions by use case. Copy-ready for call prep." Links to `/questions` (renamed from `/`)
- **Call Wizard** — "AI-generated discovery plan tailored to your account context." Links to `/wizard`
- **Customer Intelligence** — "Archetype briefs from 743 Gong transcripts. Pre-call prep in seconds." Links to `/insights`
- Each card has a custom `/nano-banana-art` icon (48x48px), title, description, and arrow link

#### Diagrams Row (4-column grid)
- Four smaller tiles linking to each diagram on `/diagrams`
- Agent Gateway, Before/After, Cross-App Access, Archetype Landscape
- Each tile shows diagram name and one-line description

### Design Decisions
- Dark navy (#00297A) header replaces the current white header for visual hierarchy
- Question Bank moves from `/` to `/questions` — landing page becomes the hub
- No hero background image — clean gradient (indigo-50 to slate-50) keeps it fast and professional
- Feature card icons are `/nano-banana-art` generated, not emoji or Lucide

### Navigation Changes
- Current: `Question Bank | Call Wizard | Insights`
- New: `Questions | Wizard | Insights | Diagrams` (all accessible from landing page cards too)

---

## Section 2: Insights Page Redesign

### Entry Point
Keep the current dropdown selector pattern (Industry + Use Case + Confidence badge + View toggle). Polish with:
- `/nano-banana-art` industry icons (24x24) next to each dropdown option
- Industry-specific color accent on the confidence badge

### Archetype Detail View — Industry-Colored Headers
When an archetype is selected, the detail view header takes on the industry's color family:
- Technology: indigo gradient (#312e81 to #4338ca)
- Financial Services: navy gradient (#1e3a5f to #1e40af)
- Healthcare: green gradient (#166534 to #16a34a)
- Manufacturing: amber gradient (#92400e to #d97706)
- Retail: rose gradient (#9f1239 to #e11d48)
- Insurance: violet gradient (#5b21b6 to #7c3aed)
- Media: fuchsia gradient (#86198f to #c026d3)
- Professional Services: teal gradient (#115e59 to #0d9488)
- Other: slate gradient (#334155 to #64748b)

Header shows: back arrow, "Industry x Use Case" title, transcript count, confidence level, Cheat Sheet / Full Detail toggle.

### Profile Strip
The 5-field archetype profile (Company Size, AI Maturity, Trigger Event, Buying Motion, Budget Holder) renders as a colored banner below the header. Always visible, never collapsed. Background matches industry color at low opacity.

### Horizontal Bar Charts
Pain points, goals, and other frequency-ranked data render as visual horizontal bar charts instead of plain text lists:
- Bar fill uses industry color gradient
- Percentage label right-aligned
- Items sorted by frequency descending
- Expand/collapse for items beyond top 3

### Stakeholder Role Badges
Colored circle badges with 2-letter abbreviations:
- Decision-maker (DM): red
- Champion (CH): green
- Evaluator (EV): blue
- Influencer (IN): amber

Each stakeholder row shows: badge, role name, influence level, frequency percentage, "what they care about" tags.

### Visual Deal Timeline
Replaces the text-only deal progression card:
- Horizontal pipeline with numbered stage circles connected by gradient lines
- Each stage shows: name, typical duration
- Below the timeline: two-column grid with Common Blockers (red) and Accelerators (green)

### Cheat Sheet View
Keep the current 3x3 compact grid. Add:
- Industry color on cell headers
- "Detail" arrow links now navigate to Full Detail with that section pre-expanded (existing behavior, keep it)

---

## Section 3: Architecture Diagrams Page

### Route: `/diagrams`

New page added to navigation. Four interactive reference diagrams for demos and customer conversations.

### Gallery View (entry)
2x2 card grid. Each card shows:
- Diagram name and one-line description
- Badge indicating type: "Interactive", "Side-by-side", "Animated", "Data-driven"
- Preview thumbnail of the diagram (compact version)
- Click to expand into full interactive view

### Diagram 1: Agent Gateway (7-Layer Architecture)
- Vertical stack of 7 layers, navy-to-blue gradient (darkest at top)
- Layer labels: Traffic Interception, Protocol Mediation, Authentication, Identity Resolution, Authorization (FGA/Policy), Credential Translation, Observability & Audit
- **Interaction:** Click any layer to expand a detail panel showing what it does, which Okta products power it, and relevant API endpoints
- **Source:** ProServ PDF architecture docs (already in o4aa-knowledge)

### Diagram 2: Before/After Identity Flows
- Side-by-side comparison with red (before) and green (after) color coding
- **Before:** Employee → personal OAuth → AI Agent (no identity) → hardcoded key → Corporate Systems. Labels: "No audit trail", "No revocation"
- **After:** Employee → delegated scope → Registered Agent (Okta ID) → scoped token → Corporate Systems. Labels: "Full audit", "Kill switch", "Offboard sync"
- **Interaction:** Click any "before" pain point to highlight the corresponding "after" solution

### Diagram 3: Cross-App Access Token Flow
- Horizontal flow: User → Agent (App A) → Okta Token Exchange → Scoped Token → App B (API call)
- Each node is a box with label and sub-label
- **Interaction:** Animated sequential highlighting on load. Hover any node to see OAuth grant type, token scope, and RFC reference (RFC 8693)

### Diagram 4: Archetype Landscape
- Treemap visualization sized by transcript count per industry
- Color-coded by industry using the same palette as the Insights page
- Click any block to navigate to that industry's Insights detail view
- Shows industry name and transcript count in each block

### Generation Plan
- Diagram structure and interactivity: built as React components via `/frontend-design`
- Diagram visual assets (header illustrations, decorative elements): generated via `/nano-banana-art`
- Technical accuracy: sourced from ProServ PDFs and o4aa-knowledge content files

---

## Section 4: Custom Asset Generation

### Tool: `/nano-banana-art` for all assets

### Style Direction
- Flat geometric line-art, minimal fills
- Single-weight stroke (2px), clean corners
- Professional — no cartoon, no 3D, no skeuomorphic
- Okta brand navy (#00297A) as primary color
- Secondary: Blue #3B82F6, Slate #64748B, Green #16A34A
- Transparent backgrounds where possible (use green-screen + rembg for raster)
- Inspired by Stripe/Linear icon aesthetic

### Asset Inventory (20 total)

#### Feature Icons (3 assets, 48x48px)
| Icon | Description | Used In |
|------|-------------|---------|
| Question Bank | Crosshair/target reticle — precision discovery | Landing page card |
| Call Wizard | Wand with spark lines — AI generation | Landing page card |
| Customer Intelligence | Neural network / connected nodes — pattern recognition | Landing page card |

#### Industry Icons (9 assets, 24x24px)
| Icon | Description | Used In |
|------|-------------|---------|
| Healthcare | Cross/shield — medical + security | Insights dropdown, archetype header |
| Financial Services | Building columns — institution | Insights dropdown, archetype header |
| Technology | Circuit/chip — tech infrastructure | Insights dropdown, archetype header |
| Retail | Shopping bag — commerce | Insights dropdown, archetype header |
| Manufacturing | Gear/cog — industrial | Insights dropdown, archetype header |
| Insurance | Umbrella — protection/risk | Insights dropdown, archetype header |
| Media | Play button — media/content | Insights dropdown, archetype header |
| Professional Services | Briefcase — professional | Insights dropdown, archetype header |
| Other | Globe — general/mixed | Insights dropdown, archetype header |

#### Diagram Header Illustrations (4 assets, 400x200px)
| Illustration | Description | Used In |
|-------------|-------------|---------|
| Agent Gateway | Layered horizontal bars with shield motif, navy-to-blue gradient | /diagrams gallery card |
| Before/After | Split composition — left fractured/chaotic (red), right ordered/connected (green) | /diagrams gallery card |
| Cross-App Access | Connected nodes with flowing data lines, blue accent | /diagrams gallery card |
| Archetype Landscape | Abstract grid/mosaic of colored blocks — data density as visual texture | /diagrams gallery card |

#### Landing Page Hero (1 asset, 1200x400px)
Abstract identity network background. Connected nodes representing agents, users, and systems with a central navy hub. Low-opacity (used at 15% over CSS gradient). Geometric, not organic.

#### Nav Icons (3 assets, 16x16px)
Simplified versions of the 3 feature icons for the navigation bar. Single-color (slate-500 inactive, navy active).

### File Structure
```
public/
  icons/
    feature-question-bank.png
    feature-call-wizard.png
    feature-intelligence.png
    industry-healthcare.png
    industry-financial-services.png
    industry-technology.png
    industry-retail.png
    industry-manufacturing.png
    industry-insurance.png
    industry-media.png
    industry-professional-services.png
    industry-other.png
    nav-questions.png
    nav-wizard.png
    nav-insights.png
  illustrations/
    diagram-agent-gateway.png
    diagram-before-after.png
    diagram-cross-app-access.png
    diagram-archetype-landscape.png
    hero-identity-network.png
```

---

## Route Changes Summary

| Current | New | Notes |
|---------|-----|-------|
| `/` (Question Bank) | `/` (Landing Page) | New mission-control hub |
| — | `/questions` | Question Bank moves here |
| `/wizard` | `/wizard` | No change |
| `/insights` | `/insights` | Visual upgrade, same route |
| — | `/diagrams` | New page |

---

## Implementation Order

1. **Asset generation** — Generate all 20 `/nano-banana-art` assets first (icons, illustrations, hero)
2. **Landing page** — New `/` route with feature cards, hero, diagram tiles. Move Question Bank to `/questions`
3. **Insights redesign** — Industry-colored headers, bar charts, stakeholder badges, deal timeline
4. **Diagrams page** — `/diagrams` route with 4 interactive diagrams via `/architecture-diagram` + `/frontend-design`
5. **Polish pass** — Micro-animations, transitions, responsive layout verification

---

## Out of Scope

- Slide/deck export from the app (can be added later as incremental feature)
- Dark mode styling (toggle exists but no dark: classes in any component)
- Heat map entry view for Insights (dropdowns are sufficient)
- Real-time data refresh when new transcripts arrive
- Mobile-first optimization (desktop-first, responsive as secondary concern)

---

## Success Criteria

1. An SE opening the app sees a clear, branded landing page that explains what each tool does — no confusion about where to start
2. The Insights detail view feels industry-specific — color, icons, and data visualization create visual context switching between Technology and Healthcare archetypes
3. The 4 architecture diagrams are interactive and screenshot-ready — SEs can right-click save or screen-share during calls
4. All visual assets are custom-generated (no emoji, no stock icons) and follow a consistent Okta-branded style
5. The app still builds and deploys to Vercel with zero performance regression on initial page load
