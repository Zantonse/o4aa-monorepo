// Rich block types (shared with newsletter system)
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
  phase: string;        // e.g., "01"
  title: string;        // e.g., "Discover"
  icon: string;         // lucide icon name
  accent: string;       // OKLCH color string
  summary: string;      // one-line summary
  products: string[];   // product names
}

export interface ContentCardData {
  heading: string;
  paragraphs: string[]; // array of plain-text paragraphs — rendered as <p> tags
  image?: string;       // optional image path relative to /public (e.g., 'diagrams/competitive-entra.png')
  // Rich block types (render after paragraphs, before image)
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
  icon: string;           // emoji fallback when PNG icon is missing
  hasDiagram: boolean;
  diagramPrompt: string;  // prompt sent to Gemini for diagram generation
  cards: ContentCardData[];
}

export interface NavSection {
  slug: string;
  label: string;
  icon: string;         // emoji fallback
  iconImage?: string;   // path to custom icon in /public/icons/
  isNew?: boolean;
}

export interface NavGroup {
  groupLabel: string;
  items: NavSection[];
}
