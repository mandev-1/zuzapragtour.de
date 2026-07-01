import * as React from 'react';
import { AdminArticle } from './AdminSuite';

export interface ArticleEditorProps {
  /** The article being edited (controlled). */
  doc: AdminArticle;
  /** Called with the next document on every edit. */
  onChange: (doc: AdminArticle) => void;
  imageBase?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Block-based article editor: editorial canvas (category, hero, title,
 * standfirst, reorderable blocks) + metadata sidebar, an insert palette, and
 * the MapBuilder in a modal. Fully controlled via `doc` + `onChange`.
 */
export function ArticleEditor(props: ArticleEditorProps): JSX.Element;
export default ArticleEditor;
