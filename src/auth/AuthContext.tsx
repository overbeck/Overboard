import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { users, SALT, type User } from './users';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

async function hashCredentials(email: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email + password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const SESSION_KEY = 'overboard_session';

function restoreSession(): User | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { email } = JSON.parse(raw) as { email: string };
    return users.find((u) => u.email === email) ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(restoreSession);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const hash = await hashCredentials(email.toLowerCase().trim(), password);
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.passwordHash === hash
    );
    if (match) {
      setUser(match);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: match.email }));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
