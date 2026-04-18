import { useState, type FormEvent } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError('Incorrect email or password.');
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#94a3b8] flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div>
            <div className="text-[#f0f0f0] font-semibold text-base leading-tight">Overboard</div>
            <div className="text-[#555] text-[11px] font-mono leading-tight">Overbeck Music Ltd</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#555] font-mono uppercase tracking-widest">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#333] focus:outline-none focus:border-[#333] transition-colors"
              placeholder="you@overbeckmusic.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#555] font-mono uppercase tracking-widest">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#111] border border-[#222] rounded-md px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#333] focus:outline-none focus:border-[#333] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertCircle size={12} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-2 mt-2"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-[#333] text-[11px] font-mono mt-6">
          Access restricted to Overbeck Music Ltd
        </p>
      </div>
    </div>
  );
}
