import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Cpu, FileCode2, Package, Image,
  BookOpen, GitFork, Box, ChevronRight
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/systems', label: 'Systems', icon: Cpu },
  { to: '/schematics', label: 'Schematics', icon: FileCode2 },
  { to: '/step-files', label: 'Step Files', icon: Box },
  { to: '/parts', label: 'Parts', icon: Package },
  { to: '/media', label: 'Media', icon: Image },
  { to: '/knowledge', label: 'Knowledge', icon: BookOpen },
  { to: '/repos', label: 'Repos', icon: GitFork },
];

const systemLinks = [
  { id: 'pink-elephant', label: 'Pink Elephant', color: '#f472b6' },
  { id: 'purple-jellyfish', label: 'Purple Jellyfish', color: '#a78bfa' },
  { id: 'silver-dolphin', label: 'Silver Dolphin', color: '#94a3b8' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-[#0c0c0c] border-r border-[#1e1e1e] h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#94a3b8] flex items-center justify-center">
            <span className="text-white font-bold text-xs">O</span>
          </div>
          <div>
            <div className="text-[#f0f0f0] font-semibold text-sm leading-tight">Overboard</div>
            <div className="text-[#555555] text-[10px] leading-tight font-mono">Overbeck Music Ltd</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, exact }) => {
          const isActive = exact
            ? location.pathname === to
            : location.pathname.startsWith(to) && to !== '/';
          const isDashboardActive = to === '/' && location.pathname === '/';
          const active = isActive || isDashboardActive;

          return (
            <NavLink
              key={to}
              to={to}
              className={`sidebar-link ${active ? 'active' : ''}`}
            >
              <Icon size={15} className={active ? 'text-[#f0f0f0]' : 'text-[#555555]'} />
              <span className={active ? 'text-[#f0f0f0]' : ''}>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Systems quick links */}
      <div className="px-4 pb-3 border-t border-[#1e1e1e] pt-3">
        <div className="text-[#444444] text-[10px] font-mono uppercase tracking-widest mb-2">Systems</div>
        <div className="space-y-1">
          {systemLinks.map(({ id, label, color }) => (
            <NavLink
              key={id}
              to={`/systems/${id}`}
              className="flex items-center gap-2 py-1 px-1 rounded text-xs text-[#666666] hover:text-[#f0f0f0] transition-colors group"
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="truncate">{label}</span>
              <ChevronRight size={10} className="ml-auto opacity-0 group-hover:opacity-50" />
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#1e1e1e]">
        <div className="text-[#333333] text-[10px] font-mono">v0.1.0 — 2026</div>
      </div>
    </aside>
  );
}
