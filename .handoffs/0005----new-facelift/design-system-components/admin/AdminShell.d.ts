import * as React from 'react';

export interface AdminNavItem { key: string; label: string; icon: string; }

export interface AdminShellUser { name: string; initials: string; role?: string; }

export interface AdminShellProps {
  brand?: React.ReactNode;
  nav?: AdminNavItem[];
  active?: string;
  onNavigate?: (key: string) => void;
  navLabel?: string;
  /** Back-link text in the top bar; renders an arrow button when set. */
  breadcrumb?: React.ReactNode;
  onBreadcrumb?: () => void;
  /** Page title. A string is rendered as HTML (allows <em>); a node is rendered as-is. */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned action controls in the top bar. */
  actions?: React.ReactNode;
  user?: AdminShellUser;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CMS chrome: dark ink sidebar (brand · nav · user) + sticky top bar with
 * breadcrumb, title and an actions slot, wrapping a scrollable body.
 */
export function AdminShell(props: AdminShellProps): JSX.Element;
export default AdminShell;
