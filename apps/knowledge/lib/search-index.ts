import { CONTENT_MAP } from './content';
import { SLUG_MAP } from './sections';

export interface SearchResult {
  slug: string;
  sectionTitle: string;
  cardHeading: string;
  matchText: string;       // the paragraph or text that matched
  matchContext: string;     // ~120 chars around the match for preview
  navLabel: string;
}

interface IndexEntry {
  slug: string;
  sectionTitle: string;
  cardHeading: string;
  text: string;            // full searchable text (lowercase)
  originalText: string;    // original casing for display
  navLabel: string;
}

let _index: IndexEntry[] | null = null;

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const [slug, section] of Object.entries(CONTENT_MAP)) {
    const navItem = SLUG_MAP[slug];
    const navLabel = navItem?.label ?? section.title;

    // Index description
    entries.push({
      slug,
      sectionTitle: section.title,
      cardHeading: '(Section Overview)',
      text: section.description.toLowerCase(),
      originalText: section.description,
      navLabel,
    });

    // Index each card
    for (const card of section.cards) {
      // Paragraphs
      for (const para of card.paragraphs) {
        entries.push({
          slug,
          sectionTitle: section.title,
          cardHeading: card.heading,
          text: para.toLowerCase(),
          originalText: para,
          navLabel,
        });
      }

      // Concept grid
      if (card.conceptGrid) {
        for (const item of card.conceptGrid) {
          entries.push({
            slug,
            sectionTitle: section.title,
            cardHeading: card.heading,
            text: `${item.label} ${item.text}`.toLowerCase(),
            originalText: `${item.label}: ${item.text}`,
            navLabel,
          });
        }
      }

      // Labeled callouts
      if (card.labeledCallouts) {
        for (const item of card.labeledCallouts) {
          entries.push({
            slug,
            sectionTitle: section.title,
            cardHeading: card.heading,
            text: `${item.label} ${item.text}`.toLowerCase(),
            originalText: `${item.label}: ${item.text}`,
            navLabel,
          });
        }
      }

      // Tabs
      if (card.tabs) {
        for (const tab of card.tabs) {
          for (const line of tab.content) {
            entries.push({
              slug,
              sectionTitle: section.title,
              cardHeading: card.heading,
              text: `${tab.label} ${line}`.toLowerCase(),
              originalText: line,
              navLabel,
            });
          }
        }
      }

      // Accordion
      if (card.accordion) {
        for (const item of card.accordion) {
          for (const line of item.content) {
            entries.push({
              slug,
              sectionTitle: section.title,
              cardHeading: card.heading,
              text: `${item.title} ${line}`.toLowerCase(),
              originalText: line,
              navLabel,
            });
          }
        }
      }

      // Timeline
      if (card.timeline) {
        for (const item of card.timeline) {
          entries.push({
            slug,
            sectionTitle: section.title,
            cardHeading: card.heading,
            text: `${item.title} ${item.description}`.toLowerCase(),
            originalText: `${item.title}: ${item.description}`,
            navLabel,
          });
        }
      }
    }
  }

  return entries;
}

function getIndex(): IndexEntry[] {
  if (!_index) {
    _index = buildIndex();
  }
  return _index;
}

function extractContext(text: string, query: string, radius: number = 60): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, radius * 2);

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  let context = text.slice(start, end);
  if (start > 0) context = '...' + context;
  if (end < text.length) context = context + '...';
  return context;
}

// Strip content prefixes (!! ?? >> TT) for cleaner display
function stripPrefix(text: string): string {
  return text.replace(/^(!!|>>|\?\?|TT)\s+/, '');
}

export function search(query: string, limit: number = 20): SearchResult[] {
  if (!query || query.length < 2) return [];

  const index = getIndex();
  const q = query.toLowerCase();
  const seen = new Set<string>(); // dedupe by slug+heading
  const results: SearchResult[] = [];

  for (const entry of index) {
    if (results.length >= limit) break;
    if (!entry.text.includes(q)) continue;

    // Dedupe: max 2 results per section+card combination
    const key = `${entry.slug}::${entry.cardHeading}`;
    const count = [...seen].filter(s => s === key).length;
    if (count >= 2) continue;
    seen.add(key);

    results.push({
      slug: entry.slug,
      sectionTitle: entry.sectionTitle,
      cardHeading: entry.cardHeading,
      matchText: stripPrefix(entry.originalText),
      matchContext: stripPrefix(extractContext(entry.originalText, query)),
      navLabel: entry.navLabel,
    });
  }

  return results;
}
