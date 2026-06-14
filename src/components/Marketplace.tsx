import React, { useState } from 'react';
import { MarketplaceItem } from '../types';
import { Search, Star, Layers, Code, Play, Check, DownloadCloud, ShoppingBag } from 'lucide-react';

interface MarketplaceProps {
  items: MarketplaceItem[];
  onInstall: (itemId: string) => void;
}

export default function Marketplace({ items, onInstall }: MarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'templates' | 'agents' | 'components' | 'workflows'>('all');

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'templates', label: 'Templates' },
    { id: 'agents', label: 'Premium Agents' },
    { id: 'components', label: 'Visual Elements' },
    { id: 'workflows', label: 'Pipelines' }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-300 select-none">
      {/* Top action header bar */}
      <div className="p-4 border-b border-[#262626] bg-[#0a0a0a] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="w-4 h-4 text-[#6366f1]" />
          <div>
            <h2 className="text-sm font-semibold text-white font-mono">Component and Template Ecosystem</h2>
            <p className="text-[10px] text-gray-400">Expand agent capabilities with precompiled visual decks, webhook workflows, and flutter extensions.</p>
          </div>
        </div>

        {/* Categories navigation filter */}
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-md shadow-indigo-600/10'
                  : 'bg-[#171717] border-[#262626] text-gray-400 hover:text-white hover:border-[#262626]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main grids listing */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
        <div className="max-w-md bg-[#0a0a0a] border border-[#262626] rounded-xl px-3.5 py-2 flex items-center gap-2 mb-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search templates, widgets, premium routing scripts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-gray-100 outline-none w-full font-sans"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-[#0a0a0a] border border-[#262626] hover:border-[#6366f1]/40 rounded-2xl p-4 flex flex-col justify-between shadow-md transition-all hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs select-none">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex items-center gap-1 bg-[#171717] px-2 py-0.5 rounded-md font-mono text-[10px] font-bold text-amber-400 border border-[#262626]">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-white font-mono leading-tight mb-1.5 tracking-tight">{item.name}</h3>
                <span className="text-[9px] font-mono uppercase bg-[#171717] text-gray-400 px-2 py-0.5 rounded border border-[#262626] tracking-wider">
                  by {item.author}
                </span>

                <p className="text-[10px] text-gray-400 leading-relaxed mt-3.5 line-clamp-3">{item.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-500 uppercase">Installs</span>
                  <span className="text-gray-300 font-bold">{item.installs}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-200">{item.price}</span>
                  {item.installed ? (
                    <button
                      className="px-3.5 py-1.5 bg-[#171717] text-emerald-400 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-500/15 cursor-not-allowed"
                      disabled
                    >
                      <Check className="w-3.5 h-3.5" />
                      Acquired
                    </button>
                  ) : (
                    <button
                      onClick={() => onInstall(item.id)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-95 text-white shadow-lg rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      Install
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center text-xs text-gray-500 font-mono italic">
              No matching extensions found. We publish automated community widgets frequently.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
