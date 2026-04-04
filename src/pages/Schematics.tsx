import { useState } from 'react';
import { FileCode2, Download } from 'lucide-react';
import { schematics } from '../data/schematics';

const typeColors: Record<string, string> = {
  power: 'text-amber-400 border-amber-900/40',
  signal: 'text-emerald-400 border-emerald-900/40',
  cv: 'text-blue-400 border-blue-900/40',
  digital: 'text-cyan-400 border-cyan-900/40',
  analog: 'text-orange-400 border-orange-900/40',
  ble: 'text-violet-400 border-violet-900/40',
  full: 'text-[#888] border-[#333]',
};

const systemColors: Record<string, string> = {
  'pink-elephant': 'text-pink-400 border-pink-900/40',
  'purple-jellyfish': 'text-purple-400 border-purple-900/40',
  'silver-dolphin': 'text-slate-400 border-slate-700/40',
};

const systemLabels: Record<string, string> = {
  'pink-elephant': 'Pink Elephant',
  'purple-jellyfish': 'Purple Jellyfish',
  'silver-dolphin': 'Silver Dolphin',
};

export default function Schematics() {
  const [filterSystem, setFilterSystem] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'power', 'signal', 'cv', 'digital', 'analog', 'ble', 'full'];
  const systemIds = ['All', 'pink-elephant', 'purple-jellyfish', 'silver-dolphin'];

  const filtered = schematics.filter((s) => {
    const matchSys = filterSystem === 'All' || s.system === filterSystem;
    const matchType = filterType === 'All' || s.type === filterType;
    return matchSys && matchType;
  });

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Schematics</h2>
          <p className="text-[#555] text-sm mt-0.5">{filtered.length} of {schematics.length} files</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-1.5 flex-wrap">
          {systemIds.map((s) => (
            <button key={s} onClick={() => setFilterSystem(s)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                filterSystem === s ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
              }`}>
              {s === 'All' ? 'All Systems' : systemLabels[s]}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-[#222]" />
        <div className="flex gap-1.5 flex-wrap">
          {types.map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                filterType === t ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        {filtered.map((sch) => (
          <div key={sch.id} className="card px-4 py-3 flex items-center justify-between hover:border-[#333] transition-colors group">
            <div className="flex items-center gap-3 min-w-0">
              <FileCode2 size={14} className="text-[#444] flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-sm text-[#ccc] truncate">{sch.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`tag text-[10px] ${systemColors[sch.system] ?? 'text-[#555] border-[#2a2a2a]'}`}>
                    {systemLabels[sch.system] ?? sch.system}
                  </span>
                  <span className={`tag text-[10px] ${typeColors[sch.type] ?? 'text-[#555] border-[#2a2a2a]'}`}>{sch.type}</span>
                  <span className="tag text-[10px] text-[#555] border-[#2a2a2a] font-mono">{sch.fileType}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
              <div className="text-right">
                <div className="text-[10px] text-[#444] font-mono">{sch.version}</div>
                <div className="text-[10px] text-[#333] font-mono">{sch.lastUpdated}</div>
              </div>
              <button className="text-[#333] hover:text-[#888] transition-colors opacity-0 group-hover:opacity-100">
                <Download size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
