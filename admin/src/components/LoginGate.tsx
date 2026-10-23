import React from 'react';
import { login } from '../lib/api';

const CSS = `
.zlg{position:fixed;inset:0;display:grid;place-items:center;padding:1.5rem;font-family:var(--font-sans);color:var(--ink);overflow:auto}
.zlg__bg{position:fixed;inset:0;z-index:0}
.zlg__bg img{width:100%;height:100%;object-fit:cover}
.zlg__bg::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(11,46,89,.86),rgba(16,18,26,.92))}
.zlg__card{position:relative;z-index:1;width:100%;max-width:430px;background:#fff;border:1px solid var(--rule);border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);padding:clamp(1.75rem,5vw,2.6rem)}
.zlg__brand{display:flex;align-items:center;gap:11px;margin:0 0 1.6rem}
.zlg__mark{width:37px;height:37px;border-radius:12px;background:linear-gradient(145deg,#F2676C 0%,#D7141A 55%,#A50E13 100%);display:grid;place-items:center;color:#fff;font-size:25px;font-weight:800;letter-spacing:-.12em;box-shadow:0 5px 22px #D7141A40}
.zlg__mark span{transform:translate(-2px,-1px)}
.zlg__bname{display:block;font-size:17px;font-weight:800;letter-spacing:-.7px;line-height:1.05;color:var(--ink)}
.zlg__bname i{font-style:normal;color:#D7141A}
.zlg__bsub{display:block;margin-top:5px;font-size:9px;letter-spacing:2px;color:#A2A6B0;font-weight:700}
.zlg__eyebrow{display:flex;align-items:center;gap:9px;font-size:10px;font-weight:800;letter-spacing:1.65px;text-transform:uppercase;color:#68809D}
.zlg__eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:#D7141A}
.zlg__title{font-family:var(--font-title);font-size:clamp(2rem,5vw,2.6rem);line-height:1.06;color:var(--ink);margin:.7rem 0 .5rem;font-weight:var(--weight-title);letter-spacing:-.04em}
.zlg__title em{font-style:normal;color:var(--accent)}
.zlg__sub{font-family:var(--font-sans);font-size:1rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.6rem}
.zlg__field{margin-bottom:1rem}
.zlg__field label{display:block;font-size:11px;font-weight:500;letter-spacing:.04em;color:var(--ink-mute);margin-bottom:.4rem}
.zlg__field input{width:100%;box-sizing:border-box;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.8rem 1rem;font-family:var(--font-sans);font-size:.98rem;color:var(--ink);outline:none;transition:border-color var(--dur-fast) var(--ease-out)}
.zlg__field input:focus{border-color:var(--ink)}
.zlg__row{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin:.2rem 0 1.4rem;font-size:12px;color:var(--ink-mute)}
.zlg__row label{display:inline-flex;align-items:center;gap:.5rem;cursor:pointer}
.zlg__row a{color:var(--burgundy);text-decoration:none}
.zlg__row a:hover{text-decoration:underline}
.zlg__btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;width:100%;border:0;border-radius:var(--radius-md);background:var(--burgundy);color:var(--ivory);font-family:var(--font-sans);font-size:.95rem;font-weight:600;letter-spacing:.02em;padding:.95rem 1.4rem;cursor:pointer;box-shadow:var(--shadow-cta);transition:background var(--dur-base) var(--ease-out)}
.zlg__btn:hover{background:var(--burgundy-deep)}
.zlg__btn:disabled{opacity:.6;cursor:default}
.zlg__btn .material-symbols-outlined{font-size:18px}
.zlg__err{margin:0 0 1rem;font-size:13px;color:var(--error,#C2414F);background:rgba(59,122,200,.07);border-radius:var(--radius-md);padding:.6rem .9rem}
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
    else setError(r.error || 'Přihlášení se nepovedlo.');
  };

  return (
    <div className="zlg">
      <style>{CSS}</style>
      <div className="zlg__bg">
        <img src="/assets/images/night-prague.jpg" alt="" aria-hidden />
      </div>
      <form className="zlg__card" onSubmit={submit}>
        <div className="zlg__brand"><span className="zlg__mark"><span>z</span></span><span><span className="zlg__bname">zuza<i>.</i>control</span><span className="zlg__bsub">PRAGUE TOURS</span></span></div>
        <div className="zlg__eyebrow">Control Center · interní sekce</div>
        <h1 className="zlg__title">Vítej <em>zpět</em>.</h1>
        <p className="zlg__sub">Přihlas se a měj web, poptávky i obsah pod kontrolou.</p>

        {error && <p className="zlg__err">{error}</p>}

        <div className="zlg__field">
          <label htmlFor="zlg-email">E-Mail</label>
          <input id="zlg-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="zuzanamanova@email.cz" />
        </div>
        <div className="zlg__field">
          <label htmlFor="zlg-pass">Heslo</label>
          <input id="zlg-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div className="zlg__row">
          <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Pamatovat si přihlášení</label>
          <a href="mailto:martin.man1@hotmail.com?subject=Obnova%20hesla%20Control%20Center">Zapomenuté heslo?</a>
        </div>
        <button className="zlg__btn" type="submit" disabled={busy}>
          {busy ? 'Přihlašuji…' : 'Přihlásit se'} <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <div className="zlg__foot">
          <span className="material-symbols-outlined">lock</span> Chráněná sekce · jen pro správu webu
        </div>
      </form>
    </div>
  );
}

export default LoginGate;
