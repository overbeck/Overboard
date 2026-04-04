import { useState } from 'react';
import { Box, Download, FolderOpen } from 'lucide-react';
import { stepFiles, stepFormats } from '../data/stepfiles';

const formatColors: Record<string, string> = {
  STEP: 'text-blue-400 border-blue-900/40',
  STL: 'text-emerald-400 border-emerald-900/40',
  DXF: 'text-amber-400 border-amber-900/40',
  F3D: 'text-pink-400 border-pink-900/40',
  SVG: 'text-purple-400 border-purple-900/40',
};

const systemLabels: Record<string, string> = {
  'pink-elephant': 'Pink Elephant',
  'purple-jellyfish': 'Purple Jellyfish',
  'silver-dolphin': 'Silver Dolphin',
};

const systemColors: Record<string, string> = {
  'pink-elephant': 'text-pink-400',
  'purple-jellyfish': 'text-purple-400',
  'silver-dolphin': 'text-slate-400',
};

export default function StepFiles() {
  const [filterFormat, setFilterFormat] = useState('All');
  const [filterSystem, setFilterSystem] = useState('All');

  const systemIds = ['All', 'pink-elephant', 'purple-jellyfish', 'silver-dolphin'];

  const filtered = stepFiles.filter((f) => {
    const matchFmt = filterFormat === 'All' || f.format === filterFormat;
    const matchSys = filterSystem === 'All' || f.system === filterSystem;
    return matchFmt && matchSys;
  });

  // Group by folder
  const grouped = filtered.reduce((acc, file) => {
    if (!acc[file.folder]) acc[file.folder] = [];
    acc[file.folder].push(file);
    return acc;
  }, {} as Record<string, typeof filtered>);

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Step Files</h2>
          <p className="text-[#555] text-sm mt-0.5">{filtered.length} of {stepFiles.length} files — 3D models, PCB outlines, prints</p>
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
        <div className="flex gap-1.5">
          {stepFormats.map((fmt) => (
            <button key={fmt} onClick={() => setFilterFormat(fmt)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                filterFormat === fmt ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
              }`}>
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {Object.entries(grouped).map(([folder, files]) => (
          <div key={folder} className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#444]">
              <FolderOpen size={12} />
              <span className="font-mono">{folder}/</span>
            </div>
            <div className="card divide-y divide-[#111]">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#111] transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <Box size={13} className="text-[#444] flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm text-[#ccc] font-mono">{file.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-medium ${systemColors[file.system] ?? 'text-[#555]'}`}>
                          {systemLabels[file.system] ?? file.system}
                        </span>
                        <span className="text-[10px] text-[#333]">·</span>
                        <span className="text-[10px] text-[#444] font-mono">{file.size}</span>
                        <span className="text-[10px] text-[#333]">·</span>
                        <span className="text-[10px] text-[#444] font-mono">{file.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className={`tag text-[10px] ${formatColors[file.format] ?? 'text-[#555] border-[#2a2a2a]'}`}>{file.format}</span>
                    <button className="text-[#333] hover:text-[#888] transition-colors opacity-0 group-hover:opacity-100">
                      <Download size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
