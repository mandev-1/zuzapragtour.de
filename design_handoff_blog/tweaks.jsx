const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#6B1F2A",
  "background": "#F5EFE4",
  "fontPair": "italiana-libre",
  "measure": 660,
  "dropCap": true,
  "imageBleed": "wide"
}/*EDITMODE-END*/;

const FONT_PAIRS = {
  "cormorant-eb": {
    label: "Cormorant + EB Garamond",
    display: "'Cormorant Garamond', serif",
    body: "'EB Garamond', Georgia, serif"
  },
  "playfair-lora": {
    label: "Playfair + Lora",
    display: "'Playfair Display', serif",
    body: "'Lora', Georgia, serif"
  },
  "italiana-libre": {
    label: "Italiana + Libre Caslon",
    display: "'Italiana', serif",
    body: "'Libre Caslon Text', Georgia, serif"
  },
  "didone": {
    label: "Didone (DM Serif + Crimson)",
    display: "'DM Serif Display', serif",
    body: "'Crimson Pro', Georgia, serif"
  }
};

function loadFont(family) {
  const id = 'font-' + family.replace(/\s+/g, '-');
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:ital,wght@0,400;0,500;0,600;1,400&display=swap`;
  document.head.appendChild(link);
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--burgundy', tweaks.accentColor);
    root.style.setProperty('--ivory', tweaks.background);
    root.style.setProperty('--measure', tweaks.measure + 'px');

    const pair = FONT_PAIRS[tweaks.fontPair] || FONT_PAIRS["cormorant-eb"];
    if (tweaks.fontPair === "playfair-lora") { loadFont("Playfair Display"); loadFont("Lora"); }
    if (tweaks.fontPair === "italiana-libre") { loadFont("Italiana"); loadFont("Libre Caslon Text"); }
    if (tweaks.fontPair === "didone") { loadFont("DM Serif Display"); loadFont("Crimson Pro"); }
    root.style.setProperty('--serif-display', pair.display);
    root.style.setProperty('--serif-body', pair.body);

    // Drop cap toggle
    const dcStyle = document.getElementById('dc-style') || document.createElement('style');
    dcStyle.id = 'dc-style';
    dcStyle.textContent = tweaks.dropCap
      ? ''
      : '.article > p:first-of-type::first-letter { font-size: inherit !important; float: none !important; color: inherit !important; margin: 0 !important; line-height: inherit !important; }';
    if (!dcStyle.parentNode) document.head.appendChild(dcStyle);

    // Image bleed
    document.querySelectorAll('.figure').forEach(f => {
      f.classList.remove('wide','full');
      if (tweaks.imageBleed !== 'contained') f.classList.add(tweaks.imageBleed);
    });
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Farbe">
        <TweakColor label="Akzent" value={tweaks.accentColor}
          onChange={v => setTweak('accentColor', v)} />
        <TweakRadio label="Hintergrund" value={tweaks.background}
          onChange={v => setTweak('background', v)}
          options={[
            { value: '#F5EFE4', label: 'Elfenbein' },
            { value: '#EDE4D3', label: 'Pergament' },
            { value: '#FAF6EC', label: 'Hell' },
            { value: '#E8DFCC', label: 'Antik' },
          ]} />
      </TweakSection>

      <TweakSection title="Typografie">
        <TweakSelect label="Schriftpaarung" value={tweaks.fontPair}
          onChange={v => setTweak('fontPair', v)}
          options={Object.entries(FONT_PAIRS).map(([k,v]) => ({ value: k, label: v.label }))} />
      </TweakSection>

      <TweakSection title="Layout">
        <TweakSlider label="Spaltenbreite" min={520} max={820} step={20}
          value={tweaks.measure} onChange={v => setTweak('measure', v)} suffix="px" />
        <TweakRadio label="Bilder" value={tweaks.imageBleed}
          onChange={v => setTweak('imageBleed', v)}
          options={[
            { value: 'contained', label: 'Spalte' },
            { value: 'wide', label: 'Breit' },
            { value: 'full', label: 'Voll' },
          ]} />
        <TweakToggle label="Initiale (Drop Cap)" value={tweaks.dropCap}
          onChange={v => setTweak('dropCap', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaksRoot')).render(<App />);
