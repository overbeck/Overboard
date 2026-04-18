import type { StrategyData } from '../types';

const REPO = 'overbeck/overboard';
const FILE_PATH = 'strategy.json';
const API_BASE = 'https://api.github.com';

export function getToken(): string {
  return localStorage.getItem('overboard_gh_token') ?? '';
}

export function setToken(token: string): void {
  if (token) {
    localStorage.setItem('overboard_gh_token', token);
  } else {
    localStorage.removeItem('overboard_gh_token');
  }
}

export async function fetchStrategy(token: string): Promise<{ data: StrategyData; sha: string }> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/repos/${REPO}/contents/${FILE_PATH}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);

  const json = await res.json();
  const content = JSON.parse(atob(json.content.replace(/\n/g, ''))) as StrategyData;
  return { data: content, sha: json.sha };
}

export async function saveStrategy(
  data: StrategyData,
  sha: string,
  token: string
): Promise<string> {
  if (!token) throw new Error('No GitHub token set');

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

  const res = await fetch(`${API_BASE}/repos/${REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'chore: update strategy',
      content: encoded,
      sha,
    }),
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const json = await res.json();
  return json.content.sha as string;
}
