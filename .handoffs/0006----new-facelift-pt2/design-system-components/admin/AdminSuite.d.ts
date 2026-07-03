import * as React from 'react';

export interface AdminArticle {
  slug: string;
  category: string;
  status: 'published' | 'draft' | 'scheduled';
  date: string;
  readTime: string;
  /** Title HTML (may contain <em> for the burgundy-italic word). */
  title: string;
  titlePlain: string;
  cardBlurb?: string;
  hero?: string;
  heroCap?: string;
  standfirst?: string;
  related?: string[];
  /** Ordered content blocks ({ t:'p'|'h2'|'quote'|'callout'|'image'|'costTable'|'map'|'ornament', … }). */
  blocks?: any[];
}

export interface AdminSuiteProps {
  /** Article set to manage. Defaults to the real seeded journal. */
  articles?: AdminArticle[];
  /** URL prefix for hero/thumbnail images. @default '../../assets/images/' */
  imageBase?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Full article admin & editor for the journal — dashboard + block editor +
 * map builder inside the AdminShell chrome. Holds all state; the single
 * mount the `templates/article-admin` template renders.
 */
export function AdminSuite(props: AdminSuiteProps): JSX.Element;
export default AdminSuite;
