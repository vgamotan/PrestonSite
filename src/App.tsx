/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetailPage from './components/PropertyDetailPage';
import ComplianceTool from './components/ComplianceTool';
import YieldCalculator from './components/YieldCalculator';
import { Property } from './types';
import { ShieldCheck, HardHat, Sparkles, Building, Landmark, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'compliance' | 'calculator'>('directory');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleSetActiveTab = (tab: 'directory' | 'compliance' | 'calculator') => {
    setActiveTab(tab);
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-haccp-teal/30 selection:text-primary">
      {/* Dynamic Header */}
      <Header activeTab={activeTab} setActiveTab={handleSetActiveTab} />

      {/* Dynamic Hero Banner - Hidden on dedicated property pages */}
      {!selectedProperty && (
        <section className="bg-[#0A2540] text-white py-12 md:py-16 border-b border-slate-800 relative overflow-hidden">
          {/* Subtle grid pattern background to convey specialized cleanroom planning layout */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2f4e_1px,transparent_1px),linear-gradient(to_bottom,#0f2f4e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-45 pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-haccp-teal/15 text-haccp-teal border border-haccp-teal/30 text-[10px] font-bold uppercase tracking-widest mb-3">
                <Sparkles className="h-3 w-3 shrink-0" />
                Singapore Grade-A Food Industry Portal
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                {activeTab === 'directory' && 'High-Spec SFA Food Manufacturing Spaces'}
                {activeTab === 'compliance' && 'SFA Cleanroom Compliance Auditing'}
                {activeTab === 'calculator' && 'Commercial Acquisition & Stamp Duty Tool'}
              </h1>
              
              <p className="text-sm md:text-base text-slate-300 mt-3 leading-relaxed max-w-xl">
                {activeTab === 'directory' && 'Explore SFA/HACCP certified central kitchens, sub-zero cold room terminals, and food processing facilities with deep technical constraints.'}
                {activeTab === 'compliance' && 'Audit process blueprints against strict SFA guidelines. Test physical floor separation, ventilation, drainage, and sink sensor specifications.'}
                {activeTab === 'calculator' && 'Amortize loans, calculate accurate Singapore Buyer’s Stamp Duty (BSD) marginal bands, and compute true Net Rental Yields instantly.'}
              </p>
            </div>

            {/* Quick-links badge visual box */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-md max-w-xs w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Facility Class Support
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-haccp-teal" />
                  SFA Approved Central Kitchens
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-haccp-teal" />
                  Sub-Zero Cold Room Warehouses
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-haccp-teal" />
                  HACCP Meat & Butchery Plants
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area with transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProperty ? `${activeTab}-detail-${selectedProperty.id}` : activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {activeTab === 'directory' && (
              selectedProperty ? (
                <PropertyDetailPage
                  property={selectedProperty}
                  onBack={() => setSelectedProperty(null)}
                />
              ) : (
                <PropertyGrid onSelectProperty={(property) => setSelectedProperty(property)} />
              )
            )}
            
            {activeTab === 'compliance' && (
              <ComplianceTool />
            )}
            
            {activeTab === 'calculator' && (
              <YieldCalculator />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Regulatory Notice Banner / Sticky Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-haccp-teal" />
            <span>© 2026 foodpropertyadvisory.sg. All specs subject to IRAS tax codes and SFA approval indices.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">SFA Hygiene Directives</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">IRAS Stamp Duty Act</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">B2 Zoning Rules</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

