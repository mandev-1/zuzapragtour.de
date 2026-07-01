import * as React from 'react';
import { AdminArticle } from './AdminSuite';

export interface ArticleTableProps {
  articles?: AdminArticle[];
  query?: string;
  onQuery?: (q: string) => void;
  /** Active status filter. @default 'all' */
  filter?: 'all' | 'published' | 'draft' | 'scheduled';
  onFilter?: (f: string) => void;
  onEdit?: (slug: string) => void;
  onDelete?: (slug: string) => void;
  onDuplicate?: (slug: string) => void;
  imageBase?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Journal dashboard / curation table: status filter pills with counts,
 * search, and article rows (thumbnail, title, status, date, actions).
 */
export function ArticleTable(props: ArticleTableProps): JSX.Element;
export default ArticleTable;
