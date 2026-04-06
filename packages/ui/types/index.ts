// ─────────────────────────────────────────────────────────────────────────
// @o4aa/ui — Unified type definitions
// Canonical types from o4aa-knowledge + newsletter system
// ─────────────────────────────────────────────────────────────────────────

// Rich block types (shared across knowledge hub + newsletters)
export interface ContentTabItem {
  label: string;
  content: string[];
}
export interface ContentConceptCard {
  label: string;
  text: string;
}
export interface ContentTimelineItem {
  label: string;
  title: string;
  description: string;
}
export interface ContentAccordionItem {
  title: string;
  content: string[];
}
export interface ContentLabeledCallout {
  label: string;
  labelColor?: 'blue' | 'amber' | 'emerald' | 'rose';
  text: string;
}

export interface PhaseGridItem {
  phase: string;
  title: string;
  icon: string;
  accent: string;
  summary: string;
  products: string[];
}

export interface ContentCardData {
  heading: string;
  paragraphs: string[];
  image?: string;
  tabs?: ContentTabItem[];
  conceptGrid?: ContentConceptCard[];
  timeline?: ContentTimelineItem[];
  accordion?: ContentAccordionItem[];
  labeledCallouts?: ContentLabeledCallout[];
  phaseGrid?: PhaseGridItem[];
  mermaidDiagrams?: { title: string; code: string; caption?: string }[];
}

export interface SectionContent {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  hasDiagram: boolean;
  diagramPrompt: string;
  cards: ContentCardData[];
}

export interface NavSection {
  slug: string;
  label: string;
  icon: string;
  iconImage?: string;
  isNew?: boolean;
}

export interface NavGroup {
  groupLabel: string;
  items: NavSection[];
}

// ─────────────────────────────────────────────────────────────────────────
// Newsletter types
// ─────────────────────────────────────────────────────────────────────────

export interface NewsletterSection {
  heading: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageBanner?: boolean;
  tabs?: ContentTabItem[];
  conceptGrid?: ContentConceptCard[];
  timeline?: ContentTimelineItem[];
  accordion?: ContentAccordionItem[];
  labeledCallouts?: ContentLabeledCallout[];
}

export interface PullQuote {
  text: string;
  attribution?: string;
}

export interface KeyTakeaway {
  label: string;
  text: string;
}

export interface NewsletterIssue {
  slug: string;
  issueNumber: number;
  title: string;
  subtitle: string;
  date: string;
  readTimeMinutes: number;
  heroImageAlt: string;
  tags: string[];
  tldr: string;
  sections: NewsletterSection[];
  pullQuotes: PullQuote[];
  keyTakeaways: KeyTakeaway[];
  nextIssueTeaser: {
    title: string;
    description: string;
  };
}

export interface NewsletterSeriesMeta {
  seriesTitle: string;
  totalIssues: number;
  issues: {
    number: number;
    slug: string;
    title: string;
    published: boolean;
  }[];
}

// Newsletter aliases (backward compatibility — newsletter files use short names)
export type TabItem = ContentTabItem;
export type ConceptCard = ContentConceptCard;
export type TimelineItem = ContentTimelineItem;
export type AccordionItem = ContentAccordionItem;
export type LabeledCallout = ContentLabeledCallout;

// Newsletter series constant
export const NEWSLETTER_SERIES: NewsletterSeriesMeta = {
  seriesTitle: 'The O4AA Field Guide',
  totalIssues: 8,
  issues: [
    { number: 1, slug: 'newsletter-01', title: 'The Identity Crisis Nobody Saw Coming', published: true },
    { number: 2, slug: 'newsletter-02', title: 'Anatomy of an Agent Identity', published: true },
    { number: 3, slug: 'newsletter-03', title: 'MCP: The Protocol That Changed Everything', published: true },
    { number: 4, slug: 'newsletter-04', title: 'The O4AA Product Map', published: true },
    { number: 5, slug: 'newsletter-05', title: 'Auth Flows for the Agentic Era', published: true },
    { number: 6, slug: 'newsletter-06', title: 'Discovery That Actually Works', published: true },
    { number: 7, slug: 'newsletter-07', title: 'The Competitive Landscape', published: true },
    { number: 8, slug: 'newsletter-08', title: 'Putting It All Together: Your First O4AA Deal', published: true },
  ],
};
