import React, { useState } from 'react';
import { ShieldAlert, Landmark, ClipboardCheck, Building2, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'directory' | 'compliance' | 'calculator';
  setActiveTab: (tab: 'directory' | 'compliance' | 'calculator') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'directory', label: 'Property Directory', icon: Building2 },
    { id: 'compliance', label: 'SFA Compliance Assessment', icon: ClipboardCheck },
    { id: 'calculator', label: 'ROI & Rent Calculator', icon: Landmark },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('directory')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
              <ShieldAlert className="h-6 w-6 text-haccp-teal stroke-[1.5]" />
            </div>
            <div>
              <span className="font-display text-[15px] sm:text-lg font-bold tracking-tight text-primary uppercase">
                foodpropertyadvisory.sg
              </span>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#00A699] font-medium leading-none">
                SFA Food Industrial Resource • SG
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-haccp-teal' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-primary hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-haccp-teal' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
