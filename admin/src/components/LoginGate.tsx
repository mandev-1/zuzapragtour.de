import React from 'react';
import { login } from '../lib/api';

const CSS = `
.zlg{position:fixed;inset:0;display:grid;place-items:center;padding:1.5rem;font-family:var(--font-sans);color:var(--ink);overflow:auto}
.zlg__bg{position:fixed;inset:0;z-index:0}
.zlg__bg img{width:100%;height:100%;object-fit:cover}
.zlg__bg::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(79,22,32,.86),rgba(20,16,12,.92))}
.zlg__card{position:relative;z-index:1;width:100%;max-width:430px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);padding:clamp(1.75rem,5vw,2.6rem)}
.zlg__brand{font-family:var(--font-display);font-size:1.2rem;color:var(--ink);margin:0 0 1.5rem}
.zlg__brand b{font-weight:400;color:var(--brass)}
.zlg__eyebrow{font-size:10px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--brass-deep)}
.zlg__title{font-family:var(--font-display);font-size:clamp(2rem,5vw,2.6rem);font-weight:400;line-height:1.06;letter-spacing:-.015em;color:var(--ink);margin:.7rem 0 .5rem}
.zlg__title em{font-family:var(--font-italic);font-style:italic;color:var(--burgundy)}
.zlg__sub{font-family:var(--font-body);font-size:1rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.6rem}
.zlg__field{margin-bottom:1rem}
.zlg__field label{display:block;font-size:11px;font-weight:500;letter-spacing:.04em;color:var(--ink-mute);margin-bottom:.4rem}
.zlg__field input{width:100%;box-sizing:border-box;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.8rem 1rem;font-family:var(--font-body);font-size:.98rem;color:var(--ink);outline:none;transition:border-color var(--dur-fast) var(--ease-out)}
.zlg__field input:focus{border-color:var(--ink)}
.zlg__row{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin:.2rem 0 1.4rem;font-size:12px;color:var(--ink-mute)}
.zlg__row label{display:inline-flex;align-items:center;gap:.5rem;cursor:pointer}
.zlg__row a{color:var(--burgundy);text-decoration:none}
.zlg__row a:hover{text-decoration:underline}
.zlg__btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;width:100%;border:0;border-radius:var(--radius-md);background:var(--burgundy);color:var(--ivory);font-family:var(--font-sans);font-size:.95rem;font-weight:600;letter-spacing:.02em;padding:.95rem 1.4rem;cursor:pointer;box-shadow:var(--shadow-cta);transition:background var(--dur-base) var(--ease-out)}
.zlg__btn:hover{background:var(--burgundy-deep)}
.zlg__btn:disabled{opacity:.6;cursor:default}
.zlg__btn .material-symbols-outlined{font-size:18px}
.zlg__err{margin:0 0 1rem;font-size:13px;color:var(--error,#BA1A1A);background:rgba(186,26,26,.07);border-radius:var(--radius-md);padding:.6rem .9rem}
.zlg__foot{display:inline-flex;align-items:center;gap:.4rem;margin-top:1.3rem;font-size:11px;color:var(--ink-mute)}
.zlg__foot .material-symbols-outlined{font-size:15px}
`;

/**
 * LoginGate — the redaction login. The password is verified server-side by the
 * Netlify `login` function (env ADMIN_PASSWORD); on success an HTTP-only session
 * cookie is set and `onSuccess` reveals the AdminSuite.
 */
export function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const r = await login(password);
    setBusy(false);
    if (r.ok) onSuccess();
    else setError(r.error || 'Anmeldung fehlgeschlagen.');
  };

  return (
    <div className="zlg">
      <style>{CSS}</style>
      <div className="zlg__bg">
        <img src="/assets/images/night-prague.jpg" alt="" aria-hidden />
      </div>
      <form className="zlg__card" onSubmit={submit}>
        <div className="zlg__brand">Zuza <b>&amp;</b> Pragtour</div>
        <div className="zlg__eyebrow">Redaktion · Interner Bereich</div>
        <h1 className="zlg__title">Journal-<em>Verwaltung</em></h1>
        <p className="zlg__sub">Bitte melden Sie sich an, um Artikel zu verwalten.</p>

        {error && <p className="zlg__err">{error}</p>}

        <div className="zlg__field">
          <label htmlFor="zlg-email">E-Mail</label>
          <input id="zlg-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="zuzanamanova@email.cz" />
        </div>
        <div className="zlg__field">
          <label htmlFor="zlg-pass">Passwort</label>
          <input id="zlg-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div className="zlg__row">
          <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Angemeldet bleiben</label>
          <a href="mailto:martin.man1@hotmail.com?subject=Passwort%20zur%C3%BCcksetzen">Passwort vergessen?</a>
        </div>
        <button className="zlg__btn" type="submit" disabled={busy}>
          {busy ? 'Anmelden…' : 'Anmelden'} <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <div className="zlg__foot">
          <span className="material-symbols-outlined">lock</span> Geschützter Bereich · nur für die Redaktion
        </div>
      </form>
    </div>
  );
}

export default LoginGate;
