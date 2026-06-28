import React from 'react';

interface CostRow {
  label: string;
  amount: string;
}

interface CostTableProps {
  title?: string;
  rows: CostRow[];
  total?: CostRow;
  footnote?: string;
}

/**
 * Editorial pricing/cost breakdown. Paper bg, ink top + bottom rules,
 * dotted row separators, total row with burgundy 24px figure and an
 * optional italic footnote.
 */
const CostTable: React.FC<CostTableProps> = ({ title, rows, total, footnote }) => {
  return (
    <div className="my-[2.5em] border-y border-ink bg-paper p-8">
      {title && (
        <div className="mb-5 font-sans text-[11px] uppercase tracking-[0.24em] text-ink-mute">
          {title}
        </div>
      )}
      <div role="table">
        {rows.map((row, i) => (
          <div
            key={i}
            role="row"
            className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-dotted border-rule py-3 font-body text-[17px] text-ink-soft"
          >
            <span role="cell">{row.label}</span>
            <span
              role="cell"
              className="font-display text-[20px] font-medium tabular-nums text-ink"
            >
              {row.amount}
            </span>
          </div>
        ))}
        {total && (
          <div
            role="row"
            className="mt-1.5 grid grid-cols-[1fr_auto] items-baseline gap-6 border-t border-ink pt-[18px] font-body text-[17px] font-semibold text-ink"
          >
            <span role="cell">{total.label}</span>
            <span
              role="cell"
              className="font-display text-[24px] font-medium tabular-nums text-burgundy"
            >
              {total.amount}
            </span>
          </div>
        )}
      </div>
      {footnote && (
        <p className="mt-4 font-body text-[14px] italic text-ink-mute">{footnote}</p>
      )}
    </div>
  );
};

export default CostTable;
