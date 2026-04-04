import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { systems } from '../data/systems';

const systemAccents = {
  pink: { bg: 'bg-pink-950/30', border: 'border-pink-900/40', dot: 'bg-pink-400', text: 'text-pink-400', glow: 'shadow-pink-900/20' },
  purple: { bg: 'bg-purple-950/30', border: 'border-purple-900/40', dot: 'bg-purple-400', text: 'text-purple-400', glow: 'shadow-purple-900/20' },
  silver: { bg: 'bg-slate-900/40', border: 'border-slate-700/40', dot: 'bg-slate-400', text: 'text-slate-400', glow: 'shadow-slate-900/20' },
};

const statusLabel: Record<string, string> = {
  active: 'Active',
  'in-development': 'In Development',
  maintained: 'Maintained',
  archived: 'Archived',
};

export default function Systems() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Systems</h2>
          <p className="text-[#555] text-sm mt-0.5">{systems.length} performance systems</p>
        </div>
      </div>

      <div className="grid gap-4">
        {systems.map((system) => {
          const accent = systemAccents[system.accent as keyof typeof systemAccents];
          return (
            <Link key={system.id} to={`/systems/${system.id}`}
              className={`card p-5 hover:border-[#333] transition-all group ${accent.bg} ${accent.border}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${accent.dot}`} />
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-[#f0f0f0]">{system.name}</span>
                      <span className={`tag ${accent.text} border-current/20 bg-current/5 text-[10px]`}>{statusLabel[system.status]}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight size={15} className="text-[#333] group-hover:text-[#888] transition-colors mt-0.5" />
              </div>
              <p className="text-[#666] text-sm leading-relaxed mb-4">{system.description}</p>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {system.techStack.map((tech) => (
                    <span key={tech} className="tag text-[#555] border-[#2a2a2a] font-mono text-[10px]">{tech}</span>
                  ))}
                </div>
                <div className="text-right flex-shrink-0 space-y-0.5">
                  <div className="text-[10px] text-[#444] font-mono">{system.bom.length} BOM items</div>
                  <div className="text-[10px] text-[#444] font-mono">{system.schematics.length} schematics</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
