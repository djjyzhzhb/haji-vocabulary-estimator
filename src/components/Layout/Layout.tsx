import React, { useState } from 'react';
import { Menu, BarChart3 } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Desktop sidebar: visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile top bar + overlay sidebar */}
      <div className="lg:hidden flex flex-col flex-1 overflow-hidden">
        {/* Mobile top header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="打开菜单"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-semibold text-slate-800 truncate">词汇估算系统</h1>
          </div>
        </header>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-40 transition-opacity"
              onClick={() => setMobileOpen(false)}
            />
            {/* Sidebar slides in from left */}
            <div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
              <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
            </div>
          </>
        )}

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Desktop main content */}
      <main className="hidden lg:block flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
