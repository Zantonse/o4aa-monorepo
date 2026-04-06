import { notFound } from 'next/navigation';
import { CONTENT_MAP } from '@/lib/content/index';
import { NEWSLETTER_MAP } from '@/lib/content/newsletters/index';
import SectionPage from '@/components/SectionPage';
import NewsletterPage from '@/components/NewsletterPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SectionRoute({ params }: Props) {
  const { slug } = await params;

  // Check newsletters first
  const newsletter = NEWSLETTER_MAP[slug];
  if (newsletter) {
    return <NewsletterPage issue={newsletter} />;
  }

  // Fall back to standard content
  const content = CONTENT_MAP[slug];
  if (!content) notFound();
  return <SectionPage content={content} />;
}

export function generateStaticParams() {
  const contentSlugs = Object.keys(CONTENT_MAP).map(slug => ({ slug }));
  const newsletterSlugs = Object.keys(NEWSLETTER_MAP).map(slug => ({ slug }));
  return [...contentSlugs, ...newsletterSlugs];
}
