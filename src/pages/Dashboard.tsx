import { Link } from 'react-router-dom';
import { GitCommit, Upload, FileText, Package, Wrench, ArrowRight, Cpu, FileCode2, Box, BookOpen, Target, CheckSquare } from 'lucide-react';
import { systems } from '../data/systems';
import { parts } from '../data/parts';
import { schematics } from '../data/schematics';
import { repos } from '../data/repos';
import { activity } from '../data/activity';
import { stepFiles } from '../data/stepfiles';
import { defaultStrategy } from '../data/strategy';

const systemAccents: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  pink: { bg: 'bg-pink-950/30', border: 'border-pink-900/40', dot: 'bg-pink-400', text: 'text-pink-400' },
  purple: { bg: 'bg-purple-950/30', border: 'border-purple-900/40', dot: 'bg-purple-400', text: 'text-purple-400' },
  silver: { bg: 'bg-slate-900/40', border: 'border-slate-700/40', dot: 'bg-slate-400', text: 'text-slate-400' },
};

const statusLabel: Record<string, string> = {
  active: 'Active',
  'in-development': 'In Dev',
  maintained: 'Maintained',
  archived: 'Archived',
};

const activityIcon: Record<string, React.ReactNode> = {
  commit: <GitCommit size={13} className="text-[#888]" />,
  upload: <Upload size={13} className="text-[#888]" />,
  note: <FileText size={13} className="text-[#888]" />,
  part: <Package size={13} className="text-[#888]" />,
  build: <Wrench size={13} className="text-[#888]" />,
};

const systemDotColor: Record<string, string> = {
  'pink-elephant': 'bg-pink-400',
  'purple-jellyfish': 'bg-purple-400',
  'silver-dolphin': 'bg-slate-400',
};

export default function Dashboard() {
  const inStockParts = parts.filter((p) => p.stock === 'in-stock').length;
  const lowParts = parts.filter((p) => p.stock === 'low').length;
  const onOrderParts = parts.filter((p) => p.stock === 'on-order').length;
  const activeRepos = repos.filter((r) => r.status === 'active').length;

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div className="border border-[#1e1e1e] rounded-xl bg-[#0d0d0d] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/20 via-purple-950/10 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="text-[#555] text-xs font-mono uppercase tracking-widest mb-2">Overbeck Music Ltd</div>
          <h2 className="text-2xl font-semibold text-[#f0f0f0] mb-1">Overboard</h2>
          <p className="text-[#666] text-sm max-w-xl mb-5">
            Master engineering dashboard for music performance systems. Hardware, firmware, schematics, CAD, and knowledge unified.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Systems', value: systems.length, icon: <Cpu size={12} />, to: '/systems' },
              { label: 'Schematics', value: schematics.length, icon: <FileCode2 size={12} />, to: '/schematics' },
              { label: 'Parts', value: parts.length, icon: <Package size={12} />, to: '/parts' },
              { label: 'Step Files', value: stepFiles.length, icon: <Box size={12} />, to: '/step-files' },
              { label: 'Repos', value: repos.length, icon: <GitCommit size={12} />, to: '/repos' },
            ].map(({ label, value, icon, to }) => (
              <Link key={to} to={to}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111] border border-[#222] hover:border-[#333] transition-colors text-xs text-[#888] hover:text-[#f0f0f0]">
                {icon}
                <span className="font-mono text-[#f0f0f0]">{value}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest">Systems</h3>
            <Link to="/systems" className="text-xs text-[#555] hover:text-[#f0f0f0] flex items-center gap-1 transition-colors">
              All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid gap-3">
            {systems.map((system) => {
              const accent = systemAccents[system.accent as keyof typeof systemAccents];
              return (
                <Link key={system.id} to={"/systems/" + system.id}
                  className={"card p-4 hover:border-[#333] transition-all group " + accent.bg + " " + accent.border}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={"w-2 h-2 rounded-full flex-shrink-0 " + accent.dot} />
                      <span className="font-medium text-[#f0f0f0] text-sm">{system.name}</span>
                      <span className={"tag " + accent.text + " border-current/20 bg-current/5 text-[10px]"}>{statusLabel[system.status]}</span>
                    </div>
                    <ArrowRight size={13} className="text-[#333] group-hover:text-[#888] transition-colors mt-0.5" />
                  </div>
                  <p className="text-[#666] text-xs leading-relaxed mb-3 line-clamp-2">{system.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {system.techStack.slice(0, 5).map((tech) => (
                      <span key={tech} className="tag text-[#555] border-[#2a2a2a] font-mono text-[10px]">{tech}</span>
                    ))}
                    {system.techStack.length > 5 && (
                      <span className="tag text-[#444] border-[#222] text-[10px]">+{system.techStack.length - 5}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest mb-3">Recent Activity</h3>
            <div className="card divide-y divide-[#1a1a1a]">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3">
                  <div className="mt-0.5 flex-shrink-0">{activityIcon[item.type]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#ccc] leading-relaxed line-clamp-2">{item.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.system && <span className={"w-1.5 h-1.5 rounded-full " + (systemDotColor[item.system] ?? 'bg-[#555]')} />}
                      <span className="text-[10px] text-[#444] font-mono">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest">Parts Status</h3>
              <Link to="/parts" className="text-xs text-[#555] hover:text-[#f0f0f0] flex items-center gap-1 transition-colors">
                View all <ArrowRight size={11} />
              </Link>
            </div>
            <div className="card p-4 space-y-3">
              {[
                { label: 'In Stock', value: inStockParts, color: 'bg-emerald-500' },
                { label: 'Low Stock', value: lowParts, color: 'bg-amber-500' },
                { label: 'On Order', value: onOrderParts, color: 'bg-blue-500' },
                { label: 'Out of Stock', value: parts.filter((p) => p.stock === 'out-of-stock').length, color: 'bg-red-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={"w-2 h-2 rounded-full " + color} />
                    <span className="text-xs text-[#888]">{label}</span>
                  </div>
                  <span className="text-xs font-mono text-[#f0f0f0]">{value}</span>
                </div>
              ))}
              <div className="border-t border-[#1e1e1e] pt-2 flex items-center justify-between">
                <span className="text-xs text-[#555]">Total parts</span>
                <span className="text-xs font-mono text-[#f0f0f0]">{parts.length}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest">Strategy</h3>
              <Link to="/strategy" className="text-xs text-[#555] hover:text-[#f0f0f0] flex items-center gap-1 transition-colors">
                View <ArrowRight size={11} />
              </Link>
            </div>
            {(() => {
              const activePhase = defaultStrategy.phases.find((p) => p.status === 'active');
              const allGoals = defaultStrategy.phases.flatMap((p) => p.goals);
              const doneGoals = allGoals.filter((g) => g.done).length;
              const pct = Math.round((doneGoals / allGoals.length) * 100);
              const nextAction = defaultStrategy.immediateActions.find((a) => !a.done);
              return (
                <div className="card p-4 space-y-3 border-emerald-900/30 bg-emerald-950/10">
                  {activePhase && (
                    <div className="flex items-center gap-2">
                      <Target size={12} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-xs text-[#ccc]">
                        Phase {activePhase.number}: <span className="text-emerald-400">{activePhase.title}</span>
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#555]">Overall progress</span>
                      <span className="text-[10px] font-mono text-[#888]">{doneGoals}/{allGoals.length}</span>
                    </div>
                    <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  {nextAction && (
                    <div className="flex items-start gap-2">
                      <CheckSquare size={11} className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[10px] text-[#666] leading-relaxed line-clamp-2">{nextAction.text}</span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          <div>
            <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Knowledge', icon: <BookOpen size={14} />, to: '/knowledge', desc: '10 docs' },
                { label: 'Repos', icon: <GitCommit size={14} />, to: '/repos', desc: activeRepos + ' active' },
                { label: 'Schematics', icon: <FileCode2 size={14} />, to: '/schematics', desc: schematics.length + ' files' },
                { label: 'Step Files', icon: <Box size={14} />, to: '/step-files', desc: stepFiles.length + ' files' },
              ].map(({ label, icon, to, desc }) => (
                <Link key={to} to={to} className="card p-3 hover:border-[#333] transition-all group">
                  <div className="text-[#555] group-hover:text-[#888] mb-1.5 transition-colors">{icon}</div>
                  <div className="text-xs font-medium text-[#ccc]">{label}</div>
                  <div className="text-[10px] text-[#444] font-mono">{desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
