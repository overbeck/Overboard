import { useState } from 'react';
import { GitFork, Lock, Star, ExternalLink } from 'lucide-react';
import { repos } from '../data/repos';

const statusColors: Record<string, string> = {
  active: 'text-emerald-400 border-emerald-900/40',
  'in-development': 'text-amber-400 border-amber-900/40',
  maintained: 'text-blue-400 border-blue-900/40',
  archived: 'text-[#555] border-[#2a2a2a]',
};

const statusLabels: Record<string, string> = {
  active: 'Active',
  'in-development': 'In Dev',
  maintained: 'Maintained',
  archived: 'Archived',
};

export default function Repos() {
  const [filter, setFilter] = useState<string>('All');
  const statuses = ['All', 'active', 'in-development', 'maintained', 'archived'];

  const filtered = filter === 'All' ? repos : repos.filter((r) => r.status === filter);

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Repos</h2>
          <p className="text-[#555] text-sm mt-0.5">{filtered.length} of {repos.length} repositories</p>
        </div>
        <a href="https://github.com/overbeck" target="_blank" rel="noopener noreferrer"
          className="btn-ghost text-xs flex items-center gap-1.5">
          <GitFork size={13} /> github.com/overbeck
        </a>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              filter === s ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
            }`}>
            {s === 'All' ? 'All' : statusLabels[s]}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map((repo) => (
          <div key={repo.id} className="card p-4 hover:border-[#333] transition-colors group">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <GitFork size={13} className="text-[#444] flex-shrink-0" />
                  <span className="font-medium text-[#f0f0f0] text-sm">{repo.name}</span>
                  {repo.isPrivate && <Lock size={10} className="text-[#444]" />}
                  <span className={`tag text-[10px] ${statusColors[repo.status]}`}>{statusLabels[repo.status]}</span>
                </div>
                <p className="text-[#666] text-xs leading-relaxed ml-[21px]">{repo.description}</p>
                <div className="flex items-center gap-4 mt-2 ml-[21px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                    <span className="text-[10px] text-[#555]">{repo.language}</span>
                  </div>
                  {repo.stars > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-[#444]" />
                      <span className="text-[10px] text-[#555]">{repo.stars}</span>
                    </div>
                  )}
                  <span className="text-[10px] text-[#333] font-mono">{repo.lastUpdated}</span>
                </div>
              </div>
              <a href={`https://github.com/overbeck/${repo.id}`} target="_blank" rel="noopener noreferrer"
                className="text-[#333] hover:text-[#888] transition-colors ml-4 mt-0.5 opacity-0 group-hover:opacity-100">
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
