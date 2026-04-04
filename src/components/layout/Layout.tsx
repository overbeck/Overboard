import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/systems': 'Systems',
  '/schematics': 'Schematics',
  '/step-files': 'Step Files',
  '/parts': 'Parts Library',
  '/media': 'Media',
  '/knowledge': 'Knowledge Base',
  '/repos': 'Repos',
};

export default function Layout() {
  const location = useLocation();
  const isSystemDetail = location.pathname.startsWith('/systems/') && location.pathname !== '/systems';
  const title = isSystemDetail ? 'System Detail' : (pageTitles[location.pathname] ?? 'Overboard');

  return (
    <div className="flex h-screen overflow-hidden bg-[#080808]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 h-12 border-b border-[#1e1e1e] flex items-center justify-between px-6 bg-[#0a0a0a]">
          <h1 className="text-sm font-medium text-[#f0f0f0]">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-[#333333] text-xs font-mono">overbeck</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f472b6] to-[#a78bfa] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">O</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
