import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckSquare, Square, Lock, Unlock, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import type { StrategyData, StrategyPhase } from '../types';
import { defaultStrategy } from '../data/strategy';
import { fetchStrategy, saveStrategy, getToken, setToken } from '../services/github';

const phaseColors: Record<string, { border: string; bg: string; badge: string; num: string }> = {
  active: {
    border: 'border-emerald-900/50',
    bg: 'bg-emerald-950/20',
    badge: 'text-emerald-400 border-emerald-900/40 bg-emerald-950/30',
    num: 'text-emerald-400',
  },
  upcoming: {
    border: 'border-[#1e1e1e]',
    bg: 'bg-[#0d0d0d]',
    badge: 'text-[#555] border-[#2a2a2a] bg-[#111]',
    num: 'text-[#444]',
  },
  complete: {
    border: 'border-blue-900/40',
    bg: 'bg-blue-950/10',
    badge: 'text-blue-400 border-blue-900/40 bg-blue-950/30',
    num: 'text-blue-400',
  },
};

const systemNames: Record<string, string> = {
  'silver-dolphin': 'Silver Dolphin',
  'pink-elephant': 'Pink Elephant',
  'purple-jellyfish': 'Purple Jellyfish',
};

const systemColors: Record<string, string> = {
  'silver-dolphin': 'bg-slate-400',
  'pink-elephant': 'bg-pink-400',
  'purple-jellyfish': 'bg-purple-400',
};

function phaseProgress(phase: StrategyPhase): { done: number; total: number; pct: number } {
  const done = phase.goals.filter((g) => g.done).length;
  const total = phase.goals.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function totalProgress(data: StrategyData): { done: number; total: number; pct: number } {
  const allGoals = data.phases.flatMap((p) => p.goals);
  const done = allGoals.filter((g) => g.done).length;
  const total = allGoals.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export default function Strategy() {
  const [data, setData] = useState<StrategyData>(defaultStrategy);
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [token, setTokenState] = useState(getToken);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenDraft, setTokenDraft] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchError('');
    fetchStrategy(token)
      .then(({ data: d, sha: s }) => {
        setData(d);
        setSha(s);
      })
      .catch(() => {
        setFetchError('Could not fetch from GitHub — showing local data. Add a token to enable editing.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const persist = useCallback(
    async (updated: StrategyData, currentSha: string) => {
      if (!token) return;
      setSaving(true);
      setSaveError('');
      try {
        const newSha = await saveStrategy(updated, currentSha, token);
        setSha(newSha);
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 2000);
      } catch {
        setSaveError('Save failed — check your token has contents:write permission.');
      } finally {
        setSaving(false);
      }
    },
    [token]
  );

  function toggleGoal(phaseId: string, goalId: string) {
    const updated: StrategyData = {
      ...data,
      lastUpdated: new Date().toISOString().slice(0, 10),
      phases: data.phases.map((p) =>
        p.id !== phaseId
          ? p
          : { ...p, goals: p.goals.map((g) => (g.id !== goalId ? g : { ...g, done: !g.done })) }
      ),
    };
    setData(updated);
    persist(updated, sha);
  }

  function toggleAction(actionId: string) {
    const updated: StrategyData = {
      ...data,
      lastUpdated: new Date().toISOString().slice(0, 10),
      immediateActions: data.immediateActions.map((a) =>
        a.id !== actionId ? a : { ...a, done: !a.done }
      ),
    };
    setData(updated);
    persist(updated, sha);
  }

  function saveToken() {
    const t = tokenDraft.trim();
    setToken(t);
    setTokenState(t);
    setTokenDraft('');
    setShowTokenInput(false);
  }

  const prog = totalProgress(data);
  const activePhase = data.phases.find((p) => p.status === 'active');
  const canEdit = !!token && !fetchError;

  return (
    <div className="p-6 space-y-6 max-w-[1100px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Business Strategy</h2>
          <p className="text-[#555] text-sm mt-0.5">
            {prog.done} of {prog.total} goals complete · {prog.pct}%
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <Loader2 size={13} className="text-[#555] animate-spin" />}
          {savedFlash && <span className="text-xs text-emerald-400 font-mono">Saved</span>}
          <button
            onClick={() => {
              setShowTokenInput((v) => !v);
              setTokenDraft('');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs transition-colors ${
              token
                ? 'border-emerald-900/40 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40'
                : 'border-[#222] text-[#555] bg-[#111] hover:border-[#333] hover:text-[#888]'
            }`}
            title={token ? 'GitHub token set — click to change' : 'Add GitHub token to enable editing'}
          >
            {token ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{token ? 'Token set' : 'Add token'}</span>
          </button>
        </div>
      </div>

      {/* Token input */}
      {showTokenInput && (
        <div className="card p-4 border-[#2a2a2a]">
          <p className="text-xs text-[#888] mb-3">
            Enter a GitHub Personal Access Token with <span className="font-mono text-[#aaa]">contents:write</span> permission on <span className="font-mono text-[#aaa]">overbeck/overboard</span>. Stored in your browser only — never committed.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="ghp_..."
              value={tokenDraft}
              onChange={(e) => setTokenDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveToken()}
              className="flex-1 bg-[#111] border border-[#222] rounded-md px-3 py-1.5 text-xs text-[#ccc] placeholder-[#333] focus:outline-none focus:border-[#333] font-mono"
            />
            <button
              onClick={saveToken}
              className="px-3 py-1.5 rounded-md bg-emerald-900/40 border border-emerald-900/50 text-emerald-400 text-xs hover:bg-emerald-900/60 transition-colors"
            >
              Save
            </button>
            {token && (
              <button
                onClick={() => { setToken(''); setTokenState(''); setShowTokenInput(false); }}
                className="px-3 py-1.5 rounded-md bg-[#111] border border-[#222] text-[#555] text-xs hover:text-red-400 hover:border-red-900/40 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}

      {/* Fetch error */}
      {fetchError && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg border border-amber-900/40 bg-amber-950/20">
          <AlertCircle size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-300/80">{fetchError}</p>
        </div>
      )}

      {/* Save error */}
      {saveError && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg border border-red-900/40 bg-red-950/20">
          <AlertCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-300/80">{saveError}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-[#555] py-8 justify-center">
          <Loader2 size={14} className="animate-spin" />
          <span>Loading from GitHub…</span>
        </div>
      ) : (
        <>
          {/* Immediate Actions */}
          <div className="card p-5 border-amber-900/40 bg-amber-950/10">
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} className="text-amber-400" />
              <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest">Immediate Actions — This Week</h3>
            </div>
            <div className="space-y-2.5">
              {data.immediateActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => canEdit && toggleAction(action.id)}
                  disabled={!canEdit}
                  className={`w-full flex items-start gap-3 text-left group transition-opacity ${!canEdit ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {action.done
                    ? <CheckSquare size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    : <Square size={14} className="text-amber-700 mt-0.5 flex-shrink-0 group-hover:text-amber-500 transition-colors" />
                  }
                  <span className={`text-sm leading-relaxed transition-colors ${action.done ? 'text-[#555] line-through' : 'text-[#ddd]'}`}>
                    {action.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current phase callout */}
          {activePhase && (
            <div className="text-xs font-mono text-[#555] uppercase tracking-widest">
              Currently in Phase {activePhase.number}: {activePhase.title} · {activePhase.timeframe}
            </div>
          )}

          {/* Phases */}
          <div className="space-y-4">
            {data.phases.map((phase) => {
              const c = phaseColors[phase.status];
              const { done, total, pct } = phaseProgress(phase);
              return (
                <div key={phase.id} className={`card p-5 ${c.bg} ${c.border}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <span className={`font-mono text-2xl font-bold leading-none mt-0.5 ${c.num}`}>
                        {phase.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-[#f0f0f0]">{phase.title}</h3>
                        <p className="text-xs text-[#666] mt-0.5">{phase.subtitle}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className={`tag text-[10px] ${c.badge}`}>
                            {phase.status === 'active' ? 'Active' : phase.status === 'complete' ? 'Complete' : 'Upcoming'}
                          </span>
                          <span className="tag text-[#444] border-[#222] text-[10px] font-mono">{phase.timeframe}</span>
                          {phase.linkedSystems.map((sysId) => (
                            <Link
                              key={sysId}
                              to={`/systems/${sysId}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 tag text-[#555] border-[#2a2a2a] text-[10px] hover:text-[#888] hover:border-[#333] transition-colors"
                            >
                              <span className={`w-1 h-1 rounded-full ${systemColors[sysId] ?? 'bg-[#555]'}`} />
                              {systemNames[sysId] ?? sysId}
                              <ExternalLink size={8} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-xs font-mono text-[#555]">{done}/{total}</span>
                      <div className="w-20 h-1 bg-[#1a1a1a] rounded-full mt-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${phase.status === 'complete' ? 'bg-blue-500' : phase.status === 'active' ? 'bg-emerald-500' : 'bg-[#2a2a2a]'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 ml-9">
                    {phase.goals.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => canEdit && toggleGoal(phase.id, goal.id)}
                        disabled={!canEdit}
                        className={`w-full flex items-start gap-2.5 text-left group transition-opacity ${!canEdit ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {goal.done
                          ? <CheckSquare size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          : <Square size={13} className={`mt-0.5 flex-shrink-0 transition-colors ${canEdit ? 'text-[#333] group-hover:text-[#666]' : 'text-[#2a2a2a]'}`} />
                        }
                        <span className={`text-xs leading-relaxed transition-colors ${goal.done ? 'text-[#444] line-through' : 'text-[#aaa]'}`}>
                          {goal.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]">
            <span className="text-[10px] text-[#333] font-mono">
              Last updated {data.lastUpdated} · {data.updatedBy}
            </span>
            {!canEdit && (
              <span className="text-[10px] text-[#444] flex items-center gap-1">
                <Lock size={9} />
                Read-only — add a token to edit
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
