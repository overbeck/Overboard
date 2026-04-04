import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { mediaItems, mediaCategories } from '../data/media';

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

export default function Media() {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? mediaItems : mediaItems.filter((m) => m.category === category);

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0]">Media</h2>
          <p className="text-[#555] text-sm mt-0.5">{filtered.length} of {mediaItems.length} items</p>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {mediaCategories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              category === cat ? 'bg-[#222] text-[#f0f0f0] border border-[#333]' : 'text-[#555] hover:text-[#888] border border-transparent'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((item) => (
          <div key={item.id} className="card overflow-hidden group cursor-pointer hover:border-[#333] transition-all">
            {/* Placeholder image area */}
            <div className={`aspect-square ${item.placeholder} flex items-center justify-center relative`}>
              <ImageIcon size={24} className="text-[#333] group-hover:text-[#444] transition-colors" />
              <div className="absolute top-2 right-2">
                <span className="tag text-[10px] text-[#555] border-[#222] bg-[#080808]/80">{item.type}</span>
              </div>
            </div>
            <div className="p-2.5">
              <div className="text-xs text-[#ccc] truncate mb-0.5">{item.name}</div>
              <div className="flex items-center justify-between">
                {item.system ? (
                  <span className={`text-[10px] font-medium ${systemColors[item.system]}`}>{systemLabels[item.system]}</span>
                ) : (
                  <span className="text-[10px] text-[#555]">{item.category}</span>
                )}
                <span className="text-[10px] text-[#333] font-mono">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
