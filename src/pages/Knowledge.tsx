import { useState } from 'react';
import { BookOpen, Search, Tag } from 'lucide-react';
import { knowledgeDocs, knowledgeCategories } from '../data/knowledge';

const categoryColors: Record<string, string> = {
  Firmware: 'text-cyan-400 border-cyan-900/40',
  Power: 'text-amber-400 border-amber-900/40',
  'Digital Audio': 'text-blue-400 border-blue-900/40',
  Sensors: 'text-emerald-400 border-emerald-900/40',
  'Music Theory': 'text-pink-400 border-pink-900/40',
  Protocols: 'text-violet-400 border-violet-900/40',
  Analog: 'text-orange-400 border-orange-900/40',
  EDA: 'text-slate-400 border-slate-700/40',
};

export default function Knowledge() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = knowledgeDocs.filter((doc) => {
    const matchSearch = !search || [doc.title, doc.preview, ...doc.tags]
      .some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'All' || doc.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Knowledge Base</h2>
          <p className="text-[#555] text-sm mt-0.5">{filtered.length} of {knowledgeDocs.length} documents</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            placeholder="Search knowledge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111] border border-[#222] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#ccc] placeholder-[#444] focus:outline-none focus:border-[#333] w-56"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {knowledgeCategories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                category === cat ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((doc) => (
          <div key={doc.id} className="card p-4 hover:border-[#333] transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-2.5">
                <BookOpen size={14} className="text-[#444] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-[#f0f0f0] group-hover:text-white transition-colors">{doc.title}</h4>
                  <span className={`tag text-[10px] mt-1 ${categoryColors[doc.category] ?? 'text-[#555] border-[#2a2a2a]'}`}>{doc.category}</span>
                </div>
              </div>
              <span className="text-[10px] text-[#333] font-mono flex-shrink-0 ml-4">{doc.lastUpdated}</span>
            </div>
            <p className="text-[#666] text-xs leading-relaxed ml-6 mb-3">{doc.preview}</p>
            <div className="flex items-center gap-1.5 ml-6 flex-wrap">
              <Tag size={10} className="text-[#333]" />
              {doc.tags.map((tag) => (
                <span key={tag} className="tag text-[#444] border-[#222] text-[10px] font-mono">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
