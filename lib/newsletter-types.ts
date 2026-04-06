// ─────────────────────────────────────────────────────────────────────────
// Newsletter types for the O4AA SE Enablement series
// ─────────────────────────────────────────────────────────────────────────

// Rich block types inspired by learning site patterns
export interface TabItem {
  label: string;
  content: string[];  // paragraphs (supports >> !! ?? TT prefixes)
}

export interface ConceptCard {
  label: string;
  text: string;
}

export interface TimelineItem {
  label: string;
  title: string;
  description: string;
}

export interface AccordionItem {
  title: string;
  content: string[];  // paragraphs
}

export interface LabeledCallout {
  label: string;
  labelColor?: 'blue' | 'amber' | 'emerald' | 'rose';  // defaults to blue
  text: string;
}

export interface NewsletterSection {
  heading: string;
  paragraphs: string[];   // supports >> !! ?? TT prefixes from ContentCard
  image?: string;         // optional inline image path relative to /public
  imageAlt?: string;
  imageCaption?: string;
  imageBanner?: boolean;  // crop to banner height (200px) with object-fit cover
  // Rich block types (render after paragraphs, before image)
  tabs?: TabItem[];
  conceptGrid?: ConceptCard[];
  timeline?: TimelineItem[];
  accordion?: AccordionItem[];
  labeledCallouts?: LabeledCallout[];
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
  date: string;              // e.g. "April 2, 2026"
  readTimeMinutes: number;
  heroImageAlt: string;
  tags: string[];
  tldr: string;              // 2-3 sentence summary at top
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
