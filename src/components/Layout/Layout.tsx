import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
