import { useState } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const EMAIL_KEY = 'mlf_email_for_signin';

type Tab = 'google' | 'password' | 'link';

export function LoginPage() {
  const [tab, setTab] = useState<Tab>('google');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const reset = () => { setError(''); setLinkSent(false); };

  const handleGoogle = async () => {
    reset();
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      setError('Kunne ikke logge inn med Google. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    setLoading(true);
    try {
      if (mode === 'register') {
        if (!name.trim()) { setError('Skriv inn navnet ditt.'); return; }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') setError('Feil epost eller passord.');
      else if (code === 'auth/email-already-in-use') setError('Eposten er allerede i bruk.');
      else if (code === 'auth/weak-password') setError('Passordet må være minst 6 tegn.');
      else if (code === 'auth/invalid-email') setError('Ugyldig epostadresse.');
      else setError('Noe gikk galt. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    setLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      });
      window.localStorage.setItem(EMAIL_KEY, email);
      setLinkSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/invalid-email') setError('Ugyldig epostadresse.');
      else setError('Kunne ikke sende lenke. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'google', label: 'Google', emoji: '🔵' },
    { id: 'link', label: 'Magisk lenke', emoji: '✨' },
    { id: 'password', label: 'Passord', emoji: '🔑' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-bounce-in">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🧮</div>
          <h1 className="text-3xl font-black text-gray-800">MatteMester</h1>
          <p className="text-gray-500 mt-1">Bli god i matte mens du har det gøy!</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); reset(); }}
              className={`flex-1 py-2 px-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Google */}
        {tab === 'google' && (
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-2xl px-4 py-4 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-98 transition-all disabled:opacity-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Fortsett med Google
          </button>
        )}

        {/* Magic link */}
        {tab === 'link' && (
          linkSent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-xl font-black text-gray-800 mb-2">Sjekk eposten din!</h2>
              <p className="text-gray-500 text-sm mb-4">
                Vi sendte en innloggingslenke til <span className="font-semibold text-indigo-600">{email}</span>. Klikk lenken for å logge inn.
              </p>
              <button
                onClick={() => { setLinkSent(false); setEmail(''); }}
                className="text-indigo-500 text-sm hover:underline"
              >
                Bruk en annen epost
              </button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-3">
              <p className="text-gray-500 text-sm text-center mb-4">
                Vi sender deg en lenke — ingen passord nødvendig! ✨
              </p>
              <input
                type="email"
                placeholder="Epostadresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 transition-colors"
                required
                autoFocus
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-90 active:scale-98 transition-all disabled:opacity-50"
              >
                {loading ? '...' : '✨ Send innloggingslenke'}
              </button>
            </form>
          )
        )}

        {/* Email + password */}
        {tab === 'password' && (
          <form onSubmit={handleEmailPassword} className="space-y-3">
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 transition-colors"
                maxLength={30}
              />
            )}
            <input
              type="email"
              placeholder="Epost"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 transition-colors"
              required
              minLength={6}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-90 active:scale-98 transition-all disabled:opacity-50"
            >
              {loading ? '...' : mode === 'login' ? 'Logg inn' : 'Opprett konto'}
            </button>
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); reset(); }}
              className="w-full text-center text-indigo-500 text-sm hover:underline"
            >
              {mode === 'login' ? 'Har du ikke konto? Registrer deg' : 'Har du allerede konto? Logg inn'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export { EMAIL_KEY };
