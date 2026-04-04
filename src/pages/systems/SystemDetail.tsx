import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileCode2, Package } from 'lucide-react';
import { getSystemById } from '../../data/systems';
import { schematics } from '../../data/schematics';

const systemAccents = {
  pink: { dot: 'bg-pink-400', text: 'text-pink-400', border: 'border-pink-900/40', bg: 'bg-pink-950/20' },
  purple: { dot: 'bg-purple-400', text: 'text-purple-400', border: 'border-purple-900/40', bg: 'bg-purple-950/20' },
  silver: { dot: 'bg-slate-400', text: 'text-slate-400', border: 'border-slate-700/40', bg: 'bg-slate-900/20' },
};

const schematicTypeColors: Record<string, string> = {
  power: 'text-amber-400 border-amber-900/40',
  signal: 'text-emerald-400 border-emerald-900/40',
  cv: 'text-blue-400 border-blue-900/40',
  digital: 'text-cyan-400 border-cyan-900/40',
  analog: 'text-orange-400 border-orange-900/40',
  ble: 'text-violet-400 border-violet-900/40',
  full: 'text-[#888] border-[#333]',
};

export default function SystemDetail() {
  const { id } = useParams<{ id: string }>();
  const system = getSystemById(id ?? '');

  if (!system) {
    return (
      <div className="p-6">
        <Link to="/systems" className="btn-ghost text-sm mb-4 inline-flex"><ArrowLeft size={14} /> Back</Link>
        <p className="text-[#666]">System not found.</p>
      </div>
    );
  }

  const accent = systemAccents[system.accent as keyof typeof systemAccents];
  const systemSchematics = schematics.filter((s) => s.system === system.id);

  return (
    <div className="p-6 space-y-6 max-w-[1200px]">
      <div className="flex items-center gap-3">
        <Link to="/systems" className="btn-ghost text-xs flex items-center gap-1"><ArrowLeft size={13} /> Systems</Link>
        <span className="text-[#333]">/</span>
        <span className="text-[#888] text-xs">{system.name}</span>
      </div>

      <div className={"card p-6 " + accent.bg + " " + accent.border}>
        <div className="flex items-start gap-3 mb-3">
          <span className={"w-3 h-3 rounded-full flex-shrink-0 mt-1 " + accent.dot} />
          <div>
            <h2 className="text-xl font-semibold text-[#f0f0f0] mb-1">{system.name}</h2>
            <p className="text-[#777] text-sm leading-relaxed max-w-2xl">{system.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {system.techStack.map((tech) => (
            <span key={tech} className="tag text-[#555] border-[#2a2a2a] font-mono text-[10px]">{tech}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest">Specifications</h3>
          <div className="card divide-y divide-[#1e1e1e]">
            {system.specs.map((spec) => (
              <div key={spec.label} className="flex items-start justify-between px-4 py-3 gap-4">
                <span className="text-xs text-[#555] flex-shrink-0 w-28">{spec.label}</span>
                <span className="text-xs text-[#ccc] font-mono text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest">Schematics</h3>
            <Link to="/schematics" className="text-xs text-[#555] hover:text-[#f0f0f0] transition-colors flex items-center gap-1">
              <FileCode2 size={11} /> All
            </Link>
          </div>
          <div className="card divide-y divide-[#1e1e1e]">
            {systemSchematics.length === 0 && (
              <div className="px-4 py-3 text-xs text-[#444]">No schematics yet.</div>
            )}
            {systemSchematics.map((sch) => (
              <div key={sch.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-xs text-[#ccc] mb-0.5">{sch.name}</div>
                  <div className="flex items-center gap-2">
                    <span className={"tag text-[10px] " + (schematicTypeColors[sch.type] ?? 'text-[#555] border-[#2a2a2a]')}>{sch.type}</span>
                    <span className="text-[10px] text-[#444] font-mono">{sch.fileType}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#444] font-mono">{sch.version}</div>
                  <div className="text-[10px] text-[#333] font-mono">{sch.lastUpdated}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono text-[#555] uppercase tracking-widest">Bill of Materials</h3>
          <Link to="/parts" className="text-xs text-[#555] hover:text-[#f0f0f0] transition-colors flex items-center gap-1">
            <Package size={11} /> Parts library
          </Link>
        </div>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1e1e1e]">
                  {['Ref', 'Component', 'Value / Part No.', 'Manufacturer', 'Qty'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-[#444] font-mono uppercase text-[10px] tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {system.bom.map((item, i) => (
                  <tr key={i} className="border-b border-[#111] hover:bg-[#111] transition-colors">
                    <td className="px-4 py-2.5 font-mono text-pink-400 text-[10px]">{item.ref}</td>
                    <td className="px-4 py-2.5 text-[#ccc]">{item.component}</td>
                    <td className="px-4 py-2.5 font-mono text-[#888]">{item.value}</td>
                    <td className="px-4 py-2.5 text-[#666]">{item.manufacturer}</td>
                    <td className="px-4 py-2.5 font-mono text-[#f0f0f0] text-center">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
