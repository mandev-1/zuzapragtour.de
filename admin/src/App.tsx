import React from 'react';
import { AdminSuite } from './components/admin/AdminSuite';
import { LoginGate } from './components/LoginGate';
import { checkSession, logout, listArticles, saveArticle, deleteArticle } from './lib/api';

/**
 * App — auth flow + the journal admin.
 *  null  → checking session (splash)
 *  false → show LoginGate
 *  true  → show AdminSuite (dashboard + bilingual block editor)
 */
export default function App() {
  const [authed, setAuthed] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    checkSession().then(setAuthed);
  }, []);

  const handleLogout = async () => {
    await logout();
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', background: 'var(--canvas)', fontFamily: 'var(--font-sans)', color: 'var(--ink-mute)', fontSize: 13 }}>
        Lädt…
      </div>
    );
  }

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;

  return <AdminSuite onLogout={handleLogout} load={listArticles} save={saveArticle} remove={deleteArticle} />;
}
