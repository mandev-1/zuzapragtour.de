import React from 'react';

/**
 * PlannedModule — placeholder for Control Center modules that are on the plan
 * but not built (marked PLÁN in the sidebar). States plainly what exists today;
 * no sample numbers.
 */

export const PLANNED: Record<string, { title: string; text: string; pills: string[]; today: string; will: string[] }> = {
  bookings: {
    title: 'Každá rezervace na svém místě.',
    text: 'Kalendář termínů, dostupnost a stav potvrzení na jednom místě. Modul je v plánu, zatím neexistuje.',
    pills: ['Kalendář prohlídek', 'Dostupnost', 'Stav potvrzení'],
    today: 'Poptávky dnes chodí e-mailem a přes formulář /book (Netlify Forms). Termíny se domlouvají v e-mailu.',
    will: ['Termíny prohlídek v kalendáři', 'Stav: poptáno → potvrzeno → proběhlo', 'Po prohlídce připomenout hodnocení'],
  },
  clients: {
    title: 'Poznej svoje hosty.',
    text: 'Historie komunikace, prohlídek a hodnocení u každého hosta. Modul je v plánu a zatím není napojený na žádnou databázi.',
    pills: ['Profily hostů', 'Poznámky', 'Historie prohlídek'],
    today: 'Kontakty a historie jsou dnes v e-mailové schránce. Statistika webu je anonymní a lidi nespojuje se jmény.',
    will: ['Host s e-mailem, jazykem a poznámkou', 'Prohlídky a hodnocení u každého hosta', 'Propojení s budoucími rezervacemi'],
  },
  settings: {
    title: 'Připojení a nastavení na jednom místě.',
    text: 'Stav napojených služeb, přístup a vzhled Control Center. Modul je v plánu.',
    pills: ['Připojené služby', 'Přístup', 'Datové zdroje'],
    today: 'Nastavuje se v proměnných prostředí admin webu na Netlify: heslo, GitHub, klíč statistiky, Google Places, Anthropic.',
    will: ['Přehled, které služby jsou napojené', 'Upozornění, když napojení selže', 'Změna hesla bez Netlify'],
  },
};

const CSS = `
.zpm{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,1fr);gap:16px;font-family:var(--font-sans)}
.zpm *{box-sizing:border-box}
.zpm-hero{min-height:274px;background:linear-gradient(115deg,#fff,#F6F8FB);padding:33px;border:1px solid #E7EBF0;border-radius:21px}
.zpm-eb{display:flex;align-items:center;gap:9px;text-transform:uppercase;letter-spacing:1.65px;font-size:10px;font-weight:800;color:#68809D;margin-bottom:12px}
.zpm-eb i{width:6px;height:6px;border-radius:50%;background:#D7141A}
.zpm-hero h2{font-size:29px;letter-spacing:-1.1px;max-width:520px;line-height:1.16;margin:0 0 12px;font-weight:790}
.zpm-hero p{color:#7F818D;max-width:520px;line-height:1.8;font-size:12.5px;margin:0}
.zpm-pills{display:flex;flex-wrap:wrap;gap:7px;margin:18px 0}
.zpm-pills span{background:#E5EDF6;color:#395F8E;border-radius:9px;padding:8px 10px;font-size:10.5px;font-weight:700}
.zpm-info{background:#fff;border:1px solid #ECEEF2;border-radius:21px;box-shadow:var(--shadow-card);padding:28px}
.zpm-info h3{font-size:14px;margin:0 0 10px;font-weight:800}
.zpm-info p{font-size:12px;color:#8C909C;line-height:1.7;margin:0 0 18px}
.zpm-info ul{list-style:none;margin:0;padding:0}
.zpm-info li{display:flex;gap:10px;align-items:center;padding:12px 0;border-top:1px solid #EFF0F4;font-size:12px;font-weight:650;color:#454954}
.zpm-info li .material-symbols-outlined{font-size:16px;color:#A87833;background:#FFF4E6;border-radius:8px;padding:4px}
@media(max-width:740px){.zpm{grid-template-columns:1fr}}
@media(max-width:510px){.zpm-hero{padding:23px}.zpm-hero h2{font-size:24px}.zpm-info{padding:22px}}
`;

export function PlannedModule({ id, onBack }: { id: string; onBack: () => void }) {
  const x = PLANNED[id] || PLANNED.settings;
  return (
    <div className="zpm">
      <style>{CSS}</style>
      <section className="zpm-hero">
        <div className="zpm-eb"><i /> Připravovaný modul</div>
        <h2>{x.title}</h2>
        <p>{x.text}</p>
        <div className="zpm-pills">{x.pills.map((p) => <span key={p}>{p}</span>)}</div>
        <button type="button" className="zcc-btn primary" onClick={onBack}><span className="material-symbols-outlined">arrow_back</span>Zpět na přehled</button>
      </section>
      <section className="zpm-info">
        <h3>Jak je to dnes</h3>
        <p>{x.today}</p>
        <h3>Co bude modul umět</h3>
        <ul>{x.will.map((w) => <li key={w}><span className="material-symbols-outlined">schedule</span>{w}</li>)}</ul>
      </section>
    </div>
  );
}

export default PlannedModule;
