import type { NewsletterIssue } from '../../newsletter-types';
import { issue01 } from './issue-01';
import { issue02 } from './issue-02';
import { issue03 } from './issue-03';
import { issue04 } from './issue-04';
import { issue05 } from './issue-05';
import { issue06 } from './issue-06';
import { issue07 } from './issue-07';
import { issue08 } from './issue-08';

export const NEWSLETTER_MAP: Record<string, NewsletterIssue> = {
  'newsletter-01': issue01,
  'newsletter-02': issue02,
  'newsletter-03': issue03,
  'newsletter-04': issue04,
  'newsletter-05': issue05,
  'newsletter-06': issue06,
  'newsletter-07': issue07,
  'newsletter-08': issue08,
};
