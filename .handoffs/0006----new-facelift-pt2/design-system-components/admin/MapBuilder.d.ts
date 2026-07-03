import * as React from 'react';

export interface MapPoint {
  /** [latitude, longitude]. */
  coord: [number, number];
  label?: string;
  note?: string;
}

export interface MapData {
  mode?: 'illustrated' | 'embed';
  /** Draw a dashed walking route through the stops in order. */
  route?: boolean;
  /** Show the numbered stop list under the map. */
  list?: boolean;
  caption?: string;
  embedUrl?: string;
  points?: MapPoint[];
}

export interface MapBuilderProps {
  data?: MapData;
  /** Show the builder controls (stop list, toggles, mode, caption). @default false */
  editable?: boolean;
  onChange?: (next: MapData) => void;
  /** Map height in px. @default 360 (editable) / 300 (preview) */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The journal's map block: a stylised, illustrated Prague map plotting tour
 * stops from real [lat,lng] coordinates (optional dashed route) or an embed
 * placeholder. `editable` adds the full stop-list builder.
 */
export function MapBuilder(props: MapBuilderProps): JSX.Element;
export default MapBuilder;
