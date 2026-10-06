import React from 'react';
import { getAbResults, type AbCounts, type AbResults } from '../../lib/api';

/**
 * AbTestPanel — results of the homepage A/B test (public site:
 * src/config/abTest.ts). A = previous homepage, B = new mobile homepage
 * (< 900 px). Desktop shows the same page in both variants and serves as a
 * control: its numbers should stay close.
 */

const CSS = `
.zab{font-family:var(--font-sans);color:var(--ink);max-width:1000px;padding:1.4rem 0 4rem;display:flex;flex-direction:column;gap:1.6rem}
.zab *{box-sizing:border-box}
.zab h3{font-family:var(--font-display);font-size:1.3rem;font-weight:400;margin:0 0 .2rem}
.zab p.sub{font-size:12.5px;color:var(--ink-mute);margin:0 0 .9rem;line-height:1.5}
.zab-card{border:1px solid var(--rule);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow-xs);padding:1.1rem 1.2rem}
.zab table{width:100%;border-collapse:collapse;font-size:13px}
.zab th,.zab td{text-align:right;padding:.5rem .6rem;border-bottom:1px solid var(--rule-soft);font-variant-numeric:tabular-nums}
.zab th:first-child,.zab td:first-child{text-align:left}
.zab th{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-mute)}
.zab tr.key td{font-weight:700;color:var(--ink);background:rgba(168,134,84,.06)}
.zab .up{color:#3F6B4A}.zab .down{color:var(--burgundy)}
.zab-verdict{display:flex;gap:.8rem;align-items:flex-start;border-radius:var(--radius-md);padding:.8rem .95rem;font-size:13px;line-height:1.5;background:rgba(168,134,84,.08)}
.zab-verdict.win{background:rgba(63,107,74,.1)}
.zab-verdict.lose{background:rgba(107,31,42,.08)}
.zab-verdict .material-symbols-outlined{font-size:20px;color:var(--brass-deep)}
.zab-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.zab-btn{display:inline-flex;align-items:center;gap:.35rem;border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.45rem .75rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-soft);cursor:pointer}
.zab-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.zab-btn .material-symbols-outlined{font-size:15px}
.zab-err{border:1px solid rgba(107,31,42,.3);background:rgba(107,31,42,.05);border-radius:var(--radius-md);padding:.8rem 1rem;font-size:13px;color:var(--burgundy)}
.zab-note{font-size:12px;color:var(--ink-mute);line-height:1.55}
.zab-note code{font-family:ui-monospace,monospace;background:var(--stone-100);padding:0 .3rem;border-radius:3px}
`;

const ROWS: { key: keyof AbCounts; label: string }[] = [
  { key: 'visitor', label: 'Besucher (eindeutig)' },
  { key: 'view', label: 'Aufrufe der Startseite' },
  { key: 'whatsapp', label: 'WhatsApp geöffnet' },
  { key: 'call', label: 'Anruf getippt' },
  { key: 'email', label: 'E-Mail getippt' },
  { key: 'enquiry', label: 'Anfrageformular gesendet' },
  { key: 'form', label: 'Anfrageseite geöffnet' },
  { key: 'tour', label: 'Tourseite geöffnet' },
];

/** WhatsApp, phone, e-mail and sent forms: the ways a guest actually gets in touch. */
const contactsOf = (c: AbCounts = {}) => (c.whatsapp || 0) + (c.call || 0) + (c.email || 0) + (c.enquiry || 0);
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
      text: `Noch zu wenige Daten für eine Aussage: mindestens ${MIN_VISITORS} mobile Besucher je Variante und ${MIN_CONTACTS} Kontakte insgesamt (aktuell A ${na} / B ${nb} Besucher, ${ca + cb} Kontakte).`,
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
      ? { tone: 'win' as const, text: `B (neue Seite) bringt mehr Kontakte: ${pct(rb)} statt ${pct(ra)} je Besucher (${liftTxt}). Der Unterschied ist statistisch belastbar (p = ${p.toFixed(3)}).` }
      : { tone: 'lose' as const, text: `A (bisherige Seite) bringt mehr Kontakte: ${pct(ra)} statt ${pct(rb)} je Besucher (B ${liftTxt}). Der Unterschied ist statistisch belastbar (p = ${p.toFixed(3)}).` };
  }
  return {
    tone: 'wait' as const,
    text: `Noch kein eindeutiger Unterschied: A ${pct(ra)}, B ${pct(rb)} Kontakte je Besucher (B ${liftTxt}, p = ${p.toFixed(2)}). Weiterlaufen lassen.`,
  };
}

function Delta({ a, b }: { a: number; b: number }) {
  if (!a && !b) return <span>–</span>;
  if (!a) return <span className="up">neu</span>;
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
        <tr><th>Kennzahl</th><th>A · bisher</th><th>B · neu</th><th>B gegenüber A</th></tr>
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
          <td>Kontakte gesamt</td><td>{ca}</td><td>{cb}</td><td><Delta a={ca} b={cb} /></td>
        </tr>
        <tr className="key">
          <td>Kontakte je Besucher</td><td>{pct(ra)}</td><td>{pct(rb)}</td><td><Delta a={ra} b={rb} /></td>
        </tr>
      </tbody>
    </table>
  );
}

export function AbTestPanel() {
  const [data, setData] = React.useState<AbResults | null>(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    setError('');
    getAbResults()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  React.useEffect(load, [load]);

  const mobileA = data?.totals.a?.m;
  const mobileB = data?.totals.b?.m;
  const v = verdict(mobileA, mobileB);
  const recentDays = data ? Object.keys(data.days).sort().reverse().slice(0, 14) : [];

  return (
    <div className="zab">
      <style>{CSS}</style>

      <div className="zab-row">
        <div>
          <h3>Startseite: bisher (A) gegen neu (B)</h3>
          <p className="sub">
            Jede/r Besucher/in der Startseite sieht zufällig A oder B und bleibt dabei. B unterscheidet sich nur auf dem Handy (unter 900 px).
            {data?.firstDay ? ` Daten seit ${data.firstDay}, Stand ${new Date(data.generatedAt).toLocaleString('de-DE')}.` : ''}
          </p>
        </div>
        <button type="button" className="zab-btn" onClick={load} disabled={loading}>
          <span className="material-symbols-outlined">refresh</span>{loading ? 'Lädt…' : 'Aktualisieren'}
        </button>
      </div>

      {error && <div className="zab-err">{error}</div>}

      {data && (
        <>
          <div className={`zab-verdict ${v.tone}`}>
            <span className="material-symbols-outlined">{v.tone === 'win' ? 'trending_up' : v.tone === 'lose' ? 'trending_down' : 'hourglass_top'}</span>
            <div>{v.text}</div>
          </div>

          <div className="zab-card">
            <h3>Handy</h3>
            <p className="sub">Hier entscheidet sich der Test. Kontakte = WhatsApp, Anruf, E-Mail und gesendete Formulare, auch auf späteren Seiten.</p>
            <CountsTable a={mobileA} b={mobileB} />
          </div>

          <div className="zab-card">
            <h3>Desktop (Kontrolle)</h3>
            <p className="sub">Auf dem Desktop sehen A und B dieselbe Seite. Große Unterschiede hier deuten auf Zufall oder einen Messfehler hin.</p>
            <CountsTable a={data.totals.a?.d} b={data.totals.b?.d} />
          </div>

          {recentDays.length > 0 && (
            <div className="zab-card">
              <h3>Letzte 14 Tage (Handy)</h3>
              <table>
                <thead>
                  <tr><th>Tag</th><th>Besucher A</th><th>Besucher B</th><th>Kontakte A</th><th>Kontakte B</th></tr>
                </thead>
                <tbody>
                  {recentDays.map((day) => {
                    const a = data.days[day].a?.m;
                    const b = data.days[day].b?.m;
                    return (
                      <tr key={day}>
                        <td>{day}</td><td>{a?.visitor || 0}</td><td>{b?.visitor || 0}</td><td>{contactsOf(a)}</td><td>{contactsOf(b)}</td>
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
        Gezählt wird anonym: nur Tag, Variante, Gerätetyp und Ereignis, keine IP-Adressen oder Kennungen. Eigene Kontrollbesuche mit{' '}
        <code>zuzapragtour.de/?ab=a</code> oder <code>?ab=b</code> öffnen; sie werden nicht mitgezählt (<code>?ab=off</code> beendet den Vorschau-Modus).
        Für eine belastbare Aussage braucht es meist einige Wochen.
      </p>
    </div>
  );
}

export default AbTestPanel;
