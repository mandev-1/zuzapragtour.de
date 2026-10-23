import React from 'react';
import { getAbResults, type AbCounts, type AbResults, type AbVariantCounts } from '../../lib/api';

/**
 * AbTestPanel — results of the homepage A/B test (public site:
 * src/config/abTest.ts). Since PHASE_START the mobile variants differ in their
 * main call to action: A leads to the enquiry form (sticky "Anfrage senden"
 * bar), B to WhatsApp (hero, tour cards, sticky bar). Desktop shows the same
 * page in both variants and serves as a control: its numbers should stay close.
 */

const CSS = `
.zab{font-family:var(--font-sans);color:var(--ink);max-width:1000px;padding:1.4rem 0 4rem;display:flex;flex-direction:column;gap:1.6rem}
.zab *{box-sizing:border-box}
.zab h3{font-family:var(--font-title);font-size:1.12rem;margin:0 0 .2rem;font-weight:var(--weight-title);letter-spacing:-.025em}
.zab p.sub{font-size:12.5px;color:var(--ink-mute);margin:0 0 .9rem;line-height:1.5}
.zab-card{border:1px solid var(--rule);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow-xs);padding:1.1rem 1.2rem}
.zab table{width:100%;border-collapse:collapse;font-size:13px}
.zab th,.zab td{text-align:right;padding:.5rem .6rem;border-bottom:1px solid var(--rule-soft);font-variant-numeric:tabular-nums}
.zab th:first-child,.zab td:first-child{text-align:left}
.zab th{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-mute)}
.zab tr.key td{font-weight:700;color:var(--ink);background:rgba(198,147,167,.06)}
.zab .up{color:#168568}.zab .down{color:var(--burgundy)}
.zab-verdict{display:flex;gap:.8rem;align-items:flex-start;border-radius:var(--radius-md);padding:.8rem .95rem;font-size:13px;line-height:1.5;background:rgba(198,147,167,.08)}
.zab-verdict.win{background:rgba(22,133,104,.1)}
.zab-verdict.lose{background:rgba(107,36,61,.08)}
.zab-verdict .material-symbols-outlined{font-size:20px;color:var(--brass-deep)}
.zab-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.zab-btn{display:inline-flex;align-items:center;gap:.35rem;border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.45rem .75rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-soft);cursor:pointer}
.zab-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.zab-btn .material-symbols-outlined{font-size:15px}
.zab-err{border:1px solid rgba(107,36,61,.3);background:rgba(107,36,61,.05);border-radius:var(--radius-md);padding:.8rem 1rem;font-size:13px;color:var(--burgundy)}
.zab-note{font-size:12px;color:var(--ink-mute);line-height:1.55}
.zab-seg{display:inline-flex;border:1px solid var(--rule);border-radius:var(--radius-md);overflow:hidden}
.zab-seg button{border:0;background:#fff;padding:.45rem .75rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-soft);cursor:pointer}
.zab-seg button+button{border-left:1px solid var(--rule)}
.zab-seg button[aria-pressed=true]{background:var(--ink);color:#fff}
.zab-legend{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:.8rem}
.zab-legend div{border:1px solid var(--rule-soft);border-radius:var(--radius-md);padding:.7rem .85rem;font-size:12.5px;line-height:1.5;color:var(--ink-soft)}
.zab-legend b{display:block;color:var(--ink);font-size:13px;margin-bottom:.15rem}
.zab-note code{font-family:ui-monospace,monospace;background:var(--stone-100);padding:0 .3rem;border-radius:3px}
`;

/**
 * The day the mobile variants got different main CTAs (A: form, B: WhatsApp),
 * as the first full UTC day after the deploy on 14 Oct 2026 evening.
 */
const PHASE_START = '2026-10-15';
const LABEL_A = 'A · formulář';
const LABEL_B = 'B · WhatsApp';

const ROWS: { key: keyof AbCounts; label: string }[] = [
  { key: 'visitor', label: 'Návštěvníci (unikátní)' },
  { key: 'view', label: 'Zobrazení úvodní stránky' },
  { key: 'form', label: 'Klik na poptávkový formulář' },
  { key: 'whatsapp', label: 'Klik na WhatsApp' },
  { key: 'call', label: 'Klik na telefon' },
  { key: 'email', label: 'Klik na e-mail' },
  { key: 'tour', label: 'Otevřena stránka prohlídky' },
  { key: 'enquiry', label: 'Odeslaná poptávka (formulář)' },
];

/**
 * Taps on any way to get in touch: form, WhatsApp, phone, e-mail. The same
 * step for both variants (A's main button opens the form, B's opens
 * WhatsApp); whether a WhatsApp message was then really sent is not
 * measurable, a sent form is (row "Odeslaná poptávka").
 */
const contactsOf = (c: AbCounts = {}) => (c.form || 0) + (c.whatsapp || 0) + (c.call || 0) + (c.email || 0);

/** Sum of the per-day counts from `from` on (inclusive). */
function sumDays(days: Record<string, AbVariantCounts>, from: string | null): AbVariantCounts {
  const out: AbVariantCounts = {};
  for (const [day, byVariant] of Object.entries(days)) {
    if (from && day < from) continue;
    for (const v of ['a', 'b'] as const) {
      for (const d of ['m', 'd'] as const) {
        const src = byVariant[v]?.[d];
        if (!src) continue;
        const dst = ((out[v] ??= {})[d] ??= {});
        for (const [k, n] of Object.entries(src) as [keyof AbCounts, number][]) dst[k] = (dst[k] || 0) + n;
      }
    }
  }
  return out;
}
const pct = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')} %`;
const MIN_VISITORS = 100;
const MIN_CONTACTS = 20;

/** Two-sided p-value of a normal z score (Abramowitz–Stegun erf approximation). */
function pValue(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf = 1 - (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) * Math.exp(-x * x);
  return 1 - erf;
}

/**
 * Contacts per visitor, compared as Poisson rates (one visitor can tap
 * WhatsApp twice, so it is not a strict proportion). Good enough to tell a
 * clear winner from noise; not a substitute for patience.
 */
function verdict(a: AbCounts = {}, b: AbCounts = {}) {
  const na = a.visitor || 0;
  const nb = b.visitor || 0;
  const ca = contactsOf(a);
  const cb = contactsOf(b);
  if (na < MIN_VISITORS || nb < MIN_VISITORS || ca + cb < MIN_CONTACTS) {
    return {
      tone: 'wait' as const,
      text: `Zatím málo dat na závěr: potřeba je aspoň ${MIN_VISITORS} návštěvníků z mobilu v každé variantě a ${MIN_CONTACTS} kliků na kontakt celkem (teď A ${na} / B ${nb} návštěvníků, ${ca + cb} kliků).`,
    };
  }
  const ra = ca / na;
  const rb = cb / nb;
  const se = Math.sqrt(ca / (na * na) + cb / (nb * nb));
  const p = se > 0 ? pValue((rb - ra) / se) : 1;
  const lift = ra > 0 ? (rb - ra) / ra : 0;
  const liftTxt = `${lift >= 0 ? '+' : ''}${Math.round(lift * 100)} %`;
  if (p < 0.05) {
    return rb > ra
      ? { tone: 'win' as const, text: `B (WhatsApp) přináší víc kliků na kontakt: ${pct(rb)} místo ${pct(ra)} na návštěvníka (${liftTxt}). Rozdíl je statisticky průkazný (p = ${p.toFixed(3).replace('.', ',')}). Ověřte ale, jestli z kliků na WhatsApp opravdu chodí zprávy.` }
      : { tone: 'lose' as const, text: `A (formulář) přináší víc kliků na kontakt: ${pct(ra)} místo ${pct(rb)} na návštěvníka (B ${liftTxt}). Rozdíl je statisticky průkazný (p = ${p.toFixed(3).replace('.', ',')}).` };
  }
  return {
    tone: 'wait' as const,
    text: `Zatím žádný jasný rozdíl: A ${pct(ra)}, B ${pct(rb)} kliků na kontakt na návštěvníka (B ${liftTxt}, p = ${p.toFixed(2).replace('.', ',')}). Nechat test běžet dál.`,
  };
}

function Delta({ a, b }: { a: number; b: number }) {
  if (!a && !b) return <span>–</span>;
  if (!a) return <span className="up">nové</span>;
  const d = (b - a) / a;
  return <span className={d >= 0 ? 'up' : 'down'}>{`${d >= 0 ? '+' : ''}${Math.round(d * 100)} %`}</span>;
}

function CountsTable({ a = {}, b = {} }: { a?: AbCounts; b?: AbCounts }) {
  const ca = contactsOf(a);
  const cb = contactsOf(b);
  const ra = a.visitor ? ca / a.visitor : 0;
  const rb = b.visitor ? cb / b.visitor : 0;
  return (
    <table>
      <thead>
        <tr><th>Ukazatel</th><th>{LABEL_A}</th><th>{LABEL_B}</th><th>B proti A</th></tr>
      </thead>
      <tbody>
        {ROWS.map((r) => (
          <tr key={r.key}>
            <td>{r.label}</td>
            <td>{a[r.key] || 0}</td>
            <td>{b[r.key] || 0}</td>
            <td><Delta a={a[r.key] || 0} b={b[r.key] || 0} /></td>
          </tr>
        ))}
        <tr className="key">
          <td>Kliky na kontakt celkem</td><td>{ca}</td><td>{cb}</td><td><Delta a={ca} b={cb} /></td>
        </tr>
        <tr className="key">
          <td>Kliky na kontakt na návštěvníka</td><td>{pct(ra)}</td><td>{pct(rb)}</td><td><Delta a={ra} b={rb} /></td>
        </tr>
      </tbody>
    </table>
  );
}

export function AbTestPanel() {
  const [data, setData] = React.useState<AbResults | null>(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [range, setRange] = React.useState<'phase' | 'all'>('phase');

  const load = React.useCallback(() => {
    setLoading(true);
    setError('');
    getAbResults()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  React.useEffect(load, [load]);

  const totals = data ? sumDays(data.days, range === 'phase' ? PHASE_START : null) : {};
  const mobileA = totals.a?.m;
  const mobileB = totals.b?.m;
  const v = verdict(mobileA, mobileB);
  const recentDays = data ? Object.keys(data.days).sort().reverse().slice(0, 14) : [];
  const czDay = (day: string) => day.split('-').reverse().map(Number).join('. ');

  return (
    <div className="zab">
      <style>{CSS}</style>

      <div className="zab-row">
        <div>
          <h3>Úvodní stránka na mobilu: formulář (A) proti WhatsAppu (B)</h3>
          <p className="sub">
            Každý návštěvník úvodní stránky náhodně uvidí A, nebo B, a u té varianty zůstane. Varianty se liší jen na mobilu (pod 900 px).
            {data ? ` Stav ${new Date(data.generatedAt).toLocaleString('cs-CZ')}.` : ''}
          </p>
        </div>
        <div className="zab-row">
          <div className="zab-seg" role="group" aria-label="Období">
            <button type="button" aria-pressed={range === 'phase'} onClick={() => setRange('phase')}>Od {czDay(PHASE_START)}</button>
            <button type="button" aria-pressed={range === 'all'} onClick={() => setRange('all')}>
              Celé období{data?.firstDay ? ` (od ${czDay(data.firstDay)})` : ''}
            </button>
          </div>
          <button type="button" className="zab-btn" onClick={load} disabled={loading}>
            <span className="material-symbols-outlined">refresh</span>{loading ? 'Načítá se …' : 'Obnovit'}
          </button>
        </div>
      </div>

      <div className="zab-legend">
        <div><b>{LABEL_A}</b>Dosavadní úvodní stránka. Hlavní tlačítka „Anfrage senden“ (nahoře, na konci a v liště dole) vedou na poptávkový formulář. WhatsApp jen v menu a patičce.</div>
        <div><b>{LABEL_B}</b>Nová mobilní stránka. Hlavní tlačítko „Per WhatsApp anfragen“ nahoře, u každé prohlídky a v liště dole.</div>
      </div>
      {range === 'all' && (
        <div className="zab-verdict">
          <span className="material-symbols-outlined">info</span>
          <div>Celé období míchá dvě verze testu: do {czDay('2026-10-14')} neměla varianta A lištu s formulářem. Na rozhodnutí použijte „Od {czDay(PHASE_START)}“.</div>
        </div>
      )}

      {error && <div className="zab-err">{error}</div>}

      {data && (
        <>
          <div className={`zab-verdict ${v.tone}`}>
            <span className="material-symbols-outlined">{v.tone === 'win' ? 'trending_up' : v.tone === 'lose' ? 'trending_down' : 'hourglass_top'}</span>
            <div>{v.text}</div>
          </div>

          <div className="zab-card">
            <h3>Mobil</h3>
            <p className="sub">Tady se test rozhoduje. Klik na kontakt = formulář, WhatsApp, telefon nebo e-mail, i na dalších stránkách během návštěvy. Klik na WhatsApp neznamená odeslanou zprávu; skutečné poptávky z formuláře ukazuje řádek „Odeslaná poptávka“.</p>
            <CountsTable a={mobileA} b={mobileB} />
          </div>

          <div className="zab-card">
            <h3>Počítač (kontrola)</h3>
            <p className="sub">Na počítači vidí A i B stejnou stránku. Velké rozdíly tady znamenají náhodu nebo chybu měření.</p>
            <CountsTable a={totals.a?.d} b={totals.b?.d} />
          </div>

          {recentDays.length > 0 && (
            <div className="zab-card">
              <h3>Posledních 14 dní (mobil)</h3>
              <table>
                <thead>
                  <tr><th>Den</th><th>Návštěvníci A</th><th>Návštěvníci B</th><th>Kliky na kontakt A</th><th>Kliky na kontakt B</th><th>Poptávky A</th><th>Poptávky B</th></tr>
                </thead>
                <tbody>
                  {recentDays.map((day) => {
                    const a = data.days[day].a?.m;
                    const b = data.days[day].b?.m;
                    return (
                      <tr key={day} style={day < PHASE_START ? { opacity: 0.5 } : undefined}>
                        <td>{czDay(day)}</td><td>{a?.visitor || 0}</td><td>{b?.visitor || 0}</td><td>{contactsOf(a)}</td><td>{contactsOf(b)}</td><td>{a?.enquiry || 0}</td><td>{b?.enquiry || 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <p className="zab-note">
        Počítá se anonymně: jen den, varianta, typ zařízení a událost, žádné IP adresy ani identifikátory. Vlastní kontrolní návštěvy otevírejte přes{' '}
        <code>zuzapragtour.de/?ab=a</code> nebo <code>?ab=b</code>; ty se nepočítají (<code>?ab=off</code> režim náhledu ukončí).
        Na průkazný výsledek je obvykle potřeba několik týdnů.
      </p>
    </div>
  );
}

export default AbTestPanel;
