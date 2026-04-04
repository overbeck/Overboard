import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { parts, partCategories, suppliers } from '../data/parts';

const stockColors: Record<string, string> = {
  'in-stock': 'text-emerald-400 border-emerald-900/40',
  'low': 'text-amber-400 border-amber-900/40',
  'out-of-stock': 'text-red-400 border-red-900/40',
  'on-order': 'text-blue-400 border-blue-900/40',
};

const stockLabels: Record<string, string> = {
  'in-stock': 'In Stock',
  'low': 'Low',
  'out-of-stock': 'Out',
  'on-order': 'On Order',
};

export default function Parts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [supplier, setSupplier] = useState('All');

  const filtered = parts.filter((p) => {
    const matchSearch = !search || [p.name, p.manufacturer, p.value, p.partNumber, p.notes ?? '']
      .some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'All' || p.category === category;
    const matchSup = supplier === 'All' || p.supplier === supplier;
    return matchSearch && matchCat && matchSup;
  });

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Parts Library</h2>
          <p className="text-[#555] text-sm mt-0.5">{filtered.length} of {parts.length} parts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            placeholder="Search parts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111] border border-[#222] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#ccc] placeholder-[#444] focus:outline-none focus:border-[#333] w-56"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {partCategories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                category === cat ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
              }`}>
              {cat}
            </button>
          ))}
        </div>
        <select value={supplier} onChange={(e) => setSupplier(e.target.value)}
          className="bg-[#111] border border-[#222] rounded-md px-2.5 py-1.5 text-xs text-[#888] focus:outline-none focus:border-[#333]">
          {['All', ...suppliers].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1e1e1e]">
                {['Part', 'Value / Description', 'Manufacturer', 'Supplier', 'Part No.', 'Category', 'Stock', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[#444] font-mono uppercase text-[10px] tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((part) => (
                <tr key={part.id} className="border-b border-[#111] hover:bg-[#111] transition-colors group">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#f0f0f0]">{part.name}</div>
                    {part.notes && <div className="text-[#444] text-[10px] mt-0.5 max-w-[200px] truncate">{part.notes}</div>}
                  </td>
                  <td className="px-4 py-3 text-[#888] max-w-[180px]"><span className="line-clamp-2">{part.value}</span></td>
                  <td className="px-4 py-3 text-[#666]">{part.manufacturer}</td>
                  <td className="px-4 py-3 text-[#666]">{part.supplier}</td>
                  <td className="px-4 py-3 font-mono text-[#555] text-[10px]">{part.partNumber}</td>
                  <td className="px-4 py-3">
                    <span className="tag text-[#555] border-[#2a2a2a] text-[10px]">{part.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag text-[10px] ${stockColors[part.stock]}`}>{stockLabels[part.stock]}</span>
                  </td>
                  <td className="px-4 py-3">
                    {part.link && (
                      <a href={part.link} target="_blank" rel="noopener noreferrer"
                        className="text-[#444] hover:text-[#888] transition-colors">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
